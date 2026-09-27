"use server"

import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { isMockMode } from "@/lib/mock"
import { prisma } from "@/lib/prisma"

function datesBetween(checkIn: Date, checkOut: Date): Date[] {
  const range: Date[] = []
  for (let d = new Date(checkIn); d < checkOut; d.setUTCDate(d.getUTCDate() + 1)) {
    range.push(new Date(d))
  }
  return range
}

function str(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

async function ownedBooking(bookingId: string) {
  const session = await auth()
  if (!session?.user) return null

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { roomType: true },
  })
  if (!booking) return null

  const owns =
    booking.userId === session.user.id ||
    (session.user.email && booking.guestEmail === session.user.email)
  return owns ? booking : null
}

export async function cancelBooking(formData: FormData) {
  const bookingId = str(formData, "bookingId")
  const reason = str(formData, "reason")
  const notes = str(formData, "notes")

  if (isMockMode) {
    redirect(`/account?notice=mock-cancel`)
  }

  const booking = await ownedBooking(bookingId)
  if (!booking) redirect("/account")

  if (booking.status === "cancelled" || booking.status === "checked_out") {
    redirect("/account")
  }

  await prisma.$transaction(async (tx) => {
    const nights = datesBetween(booking.checkIn, booking.checkOut)
    await tx.availability.updateMany({
      where: { roomTypeId: booking.roomTypeId, date: { in: nights } },
      data: { availableCount: { increment: 1 } },
    })

    await tx.booking.update({
      where: { id: booking.id },
      data: {
        status: "cancelled",
        cancellationReason: [reason, notes].filter(Boolean).join(" — ") || null,
      },
    })

    await tx.payment.updateMany({
      where: { bookingId: booking.id, status: "succeeded" },
      data: { status: "refunded" },
    })
  })

  redirect("/account?notice=cancelled")
}

export async function modifyBookingDates(formData: FormData) {
  const bookingId = str(formData, "bookingId")
  const checkInStr = str(formData, "checkIn")
  const checkOutStr = str(formData, "checkOut")
  const guests = parseInt(str(formData, "guests"), 10) || 1

  const backUrl = `/account/bookings/${bookingId}/modify`

  if (isMockMode) {
    redirect(`/account?notice=mock-modify`)
  }

  const booking = await ownedBooking(bookingId)
  if (!booking) redirect("/account")

  if (booking.status !== "confirmed" && booking.status !== "pending") {
    redirect("/account")
  }

  const checkIn = new Date(checkInStr + "T00:00:00.000Z")
  const checkOut = new Date(checkOutStr + "T00:00:00.000Z")
  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime()) || checkOut <= checkIn) {
    redirect(`${backUrl}?error=dates`)
  }
  if (guests > booking.roomType.maxGuests) {
    redirect(`${backUrl}?error=capacity`)
  }

  const newNights = datesBetween(checkIn, checkOut)
  const oldNights = datesBetween(booking.checkIn, booking.checkOut)
  const oldSet = new Set(oldNights.map((d) => d.getTime()))
  const added = newNights.filter((d) => !oldSet.has(d.getTime()))

  const updated = await prisma.$transaction(async (tx) => {
    if (added.length > 0) {
      const availability = await tx.availability.findMany({
        where: { roomTypeId: booking.roomTypeId, date: { in: added } },
      })
      const available =
        availability.length === added.length &&
        availability.every((a) => !a.isBlocked && a.availableCount > 0)
      if (!available) return null

      await tx.availability.updateMany({
        where: { roomTypeId: booking.roomTypeId, date: { in: added } },
        data: { availableCount: { decrement: 1 } },
      })
    }

    const released = oldNights.filter(
      (d) => !new Set(newNights.map((n) => n.getTime())).has(d.getTime())
    )
    if (released.length > 0) {
      await tx.availability.updateMany({
        where: { roomTypeId: booking.roomTypeId, date: { in: released } },
        data: { availableCount: { increment: 1 } },
      })
    }

    const newAvailability = await tx.availability.findMany({
      where: { roomTypeId: booking.roomTypeId, date: { in: newNights } },
    })
    const totalPrice = newAvailability.reduce(
      (sum, a) => sum + Number(a.priceOverride ?? booking.roomType.basePrice),
      0
    )

    return tx.booking.update({
      where: { id: booking.id },
      data: { checkIn, checkOut, guestCount: guests, totalPrice },
    })
  })

  if (!updated) {
    redirect(`${backUrl}?error=unavailable`)
  }

  redirect("/account?notice=modified")
}
