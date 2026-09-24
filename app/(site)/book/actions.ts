"use server"

import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { validateSearchParams } from "@/lib/search"

function str(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

export async function createBooking(formData: FormData) {
  const roomTypeSlug = str(formData, "roomType")
  const { checkIn, checkOut, guests } = validateSearchParams({
    checkIn: str(formData, "checkIn"),
    checkOut: str(formData, "checkOut"),
    guests: str(formData, "guests"),
  })

  const title = str(formData, "title")
  const firstName = str(formData, "firstName")
  const lastName = str(formData, "lastName")
  const email = str(formData, "email").toLowerCase()
  const phoneCode = str(formData, "phoneCode")
  const phone = str(formData, "phone")
  const arrivalTime = str(formData, "arrivalTime")
  const arrivalMode = str(formData, "arrivalMode")
  const specialRequests = str(formData, "specialRequests")
  const secondGuestFirst = str(formData, "secondGuestFirst")
  const secondGuestLast = str(formData, "secondGuestLast")

  const backUrl = `/book?roomType=${roomTypeSlug}&checkIn=${str(formData, "checkIn")}&checkOut=${str(formData, "checkOut")}&guests=${guests}`

  if (!firstName || !lastName || !email || !roomTypeSlug) {
    redirect(`${backUrl}&error=missing`)
  }

  const roomType = await prisma.roomType.findFirst({
    where: { slug: roomTypeSlug, isActive: true },
    include: { hotel: true },
  })
  if (!roomType || guests > roomType.maxGuests) {
    redirect(`${backUrl}&error=capacity`)
  }

  const nights = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (nights < 1) {
    redirect(`${backUrl}&error=dates`)
  }

  const dateRange: Date[] = []
  for (let d = new Date(checkIn); d < checkOut; d.setUTCDate(d.getUTCDate() + 1)) {
    dateRange.push(new Date(d))
  }

  const notes: string[] = []
  if (secondGuestFirst || secondGuestLast) {
    notes.push(`Second guest: ${[secondGuestFirst, secondGuestLast].filter(Boolean).join(" ")}`)
  }
  if (arrivalMode) notes.push(`Arrival transfer: ${arrivalMode}`)
  if (str(formData, "smsOptIn") === "on") notes.push("WhatsApp/SMS notifications opted in")
  const fullNotes = [specialRequests, ...notes].filter(Boolean).join("\n\n")

  const booking = await prisma.$transaction(async (tx) => {
    const availability = await tx.availability.findMany({
      where: { roomTypeId: roomType.id, date: { in: dateRange } },
    })

    const available =
      availability.length === dateRange.length &&
      availability.every((a) => !a.isBlocked && a.availableCount > 0)
    if (!available) return null

    await tx.availability.updateMany({
      where: { roomTypeId: roomType.id, date: { in: dateRange } },
      data: { availableCount: { decrement: 1 } },
    })

    const nightlyPrices = availability.map((a) =>
      Number(a.priceOverride ?? roomType.basePrice)
    )
    const totalPrice = nightlyPrices.reduce((sum, p) => sum + p, 0)

    return tx.booking.create({
      data: {
        hotelId: roomType.hotelId,
        roomTypeId: roomType.id,
        checkIn,
        checkOut,
        guestCount: guests,
        guestName: [title, firstName, lastName].filter(Boolean).join(" "),
        guestEmail: email,
        guestPhone: phone ? `${phoneCode} ${phone}`.trim() : null,
        specialRequests: fullNotes || null,
        estimatedArrival: arrivalTime || null,
        status: "confirmed",
        totalPrice,
        currency: roomType.hotel.currency,
      },
    })
  })

  if (!booking) {
    redirect(`${backUrl}&error=unavailable`)
  }

  redirect(`/book/confirmation?ref=${booking.id}`)
}
