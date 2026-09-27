import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { auth } from "@/auth"
import { getMockBooking, isMockMode } from "@/lib/mock"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

import { ModifyBookingForm } from "./modify-form"

export const metadata = {
  title: "Villa Aurelia | Modify Reservation",
}

function fmt(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

function iso(date: Date) {
  return date.toISOString().split("T")[0]
}

const errors: Record<string, string> = {
  dates: "Please select a valid check-in and check-out date.",
  capacity: "The selected party size exceeds the suite's maximum occupancy.",
  unavailable: "Those dates are no longer available for this residence. Please choose alternative dates.",
}

export default async function ModifyBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const { id } = await params
  const { error } = await searchParams

  let booking
  if (isMockMode) {
    booking = getMockBooking(id)
  } else {
    booking = await prisma.booking.findUnique({
      where: { id },
      include: { roomType: true },
    })
    const owns =
      booking &&
      (booking.userId === session.user.id ||
        (session.user.email && booking.guestEmail === session.user.email))
    if (!owns) booking = null
  }
  if (!booking) notFound()

  const nights = Math.max(
    1,
    Math.round((booking.checkOut.getTime() - booking.checkIn.getTime()) / 86400000)
  )

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="max-w-[820px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
          <div className="bg-surface-bright rounded-xl shadow-[0_24px_64px_-12px_rgba(43,30,26,0.28)] overflow-hidden flex flex-col">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary-container" />

            <div className="px-space-md md:px-space-lg pt-space-lg pb-space-sm bg-surface-container-lowest">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                  Concierge Desk Modification
                </span>
                <span className="text-outline-variant font-light">·</span>
                <span className="font-label-sm text-label-sm tracking-wider text-outline uppercase font-medium">
                  Ref #{booking.id.slice(0, 10).toUpperCase()}
                </span>
              </div>
              <h1 className="font-headline-md text-headline-md text-primary font-serif mt-1">
                Modify Residency Dates
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {booking.roomType.name} · Currently {fmt(booking.checkIn)} – {fmt(booking.checkOut)} ({nights} night{nights !== 1 && "s"})
              </p>
            </div>

            <div className="px-space-md md:px-space-lg py-space-md flex flex-col gap-space-md">
              {error && errors[error] && (
                <div className="bg-error-container text-on-error-container px-space-md py-space-sm rounded-lg font-body-sm text-body-sm">
                  {errors[error]}
                </div>
              )}

              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Current Folio</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Rate adjustments are recalculated from live nightly pricing for your new dates.
                    </p>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary font-serif">
                    {formatCurrency(Number(booking.totalPrice), booking.currency)}
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <ModifyBookingForm
                  bookingId={booking.id}
                  checkIn={iso(booking.checkIn)}
                  checkOut={iso(booking.checkOut)}
                  guests={booking.guestCount}
                  maxGuests={booking.roomType.maxGuests}
                />
              </div>

              <div className="flex items-center justify-between gap-space-sm">
                <Link
                  href="/account"
                  className="px-space-lg py-space-sm rounded-lg bg-transparent hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors"
                >
                  Back to Atelier
                </Link>
                <Link
                  href={`/account/bookings/${booking.id}/cancel`}
                  className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary underline decoration-outline-variant underline-offset-4"
                >
                  Or cancel this reservation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
