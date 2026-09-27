import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { auth } from "@/auth"
import { cancelBooking } from "@/app/(site)/account/actions"
import { getMockBooking, isMockMode } from "@/lib/mock"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Villa Aurelia | Cancel Reservation",
}

function fmt(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

export default async function CancelBookingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const { id } = await params

  let booking
  if (isMockMode) {
    booking = getMockBooking(id)
  } else {
    booking = await prisma.booking.findUnique({
      where: { id },
      include: { roomType: true, payments: true },
    })
    const owns =
      booking &&
      (booking.userId === session.user.id ||
        (session.user.email && booking.guestEmail === session.user.email))
    if (!owns) booking = null
  }
  if (!booking) notFound()

  const total = Number(booking.totalPrice)
  const nights = Math.max(
    1,
    Math.round((booking.checkOut.getTime() - booking.checkIn.getTime()) / 86400000)
  )
  const daysUntilArrival = Math.ceil(
    (booking.checkIn.getTime() - Date.now()) / 86400000
  )
  const fullRefund = daysUntilArrival >= 14
  const refundAmount = fullRefund ? total : Math.round(total * 0.5 * 100) / 100
  const fee = fullRefund ? 0 : total - refundAmount
  const paid = booking.payments.some((p) => p.status === "succeeded")
  const alreadyCancelled = booking.status === "cancelled"

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="max-w-[900px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
          {/* Modal-style card */}
          <div className="bg-surface-bright rounded-xl shadow-[0_24px_64px_-12px_rgba(43,30,26,0.28)] overflow-hidden flex flex-col">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary-container" />

            {/* Header */}
            <div className="px-space-md md:px-space-lg pt-space-lg pb-space-sm flex items-start justify-between bg-surface-container-lowest">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                    Concierge Desk Cancellation
                  </span>
                  <span className="text-outline-variant font-light">·</span>
                  <span className="font-label-sm text-label-sm tracking-wider text-outline uppercase font-medium">
                    Ref #{booking.id.slice(0, 10).toUpperCase()}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-primary font-serif">
                  Cancel Reservation
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {booking.roomType.name} · {fmt(booking.checkIn)} – {fmt(booking.checkOut)} · {nights} night{nights !== 1 && "s"}
                </p>
              </div>
              <Link
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
                href="/account"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </Link>
            </div>

            {/* Empathetic note */}
            <div className="px-space-md md:px-space-lg py-space-sm bg-surface-container-low">
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We sincerely regret that your travel plans to Positano have changed. Please review the cancellation terms and verified refund calculation below before confirming.
                </p>
              </div>
            </div>

            <form action={cancelBooking} className="px-space-md md:px-space-lg py-space-md flex flex-col gap-space-md">
              <input type="hidden" name="bookingId" value={booking.id} />

              {/* Reschedule banner */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md relative z-10">
                  <div className="flex items-start gap-space-sm max-w-lg">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-secondary text-[22px]">swap_horiz</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                        Considering Rescheduling Instead?
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        You may modify dates free of charge — your suite hold and settlement carry over to the new residency.
                      </p>
                    </div>
                  </div>
                  <Link
                    className="whitespace-nowrap px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-highest text-primary font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors shadow-sm self-start md:self-center"
                    href={`/account/bookings/${booking.id}/modify`}
                  >
                    Reschedule Dates Instead
                  </Link>
                </div>
              </div>

              {/* Policy & refund calculation */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs pb-space-xs">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Policy Applied</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Flexible Luxury Guarantee</h3>
                  </div>
                  <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-full w-fit">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-medium">
                      {daysUntilArrival > 0 ? `${daysUntilArrival} Days Prior to Arrival` : "Arrival Passed"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant">
                    <span>Original Total {paid ? "Paid" : "Quoted"}</span>
                    <span className="font-medium text-on-surface">{formatCurrency(total, booking.currency)}</span>
                  </div>
                  <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      Cancellation Administration Fee
                      <span className="material-symbols-outlined text-[16px] text-outline" title="Full refund applies 14+ days before arrival">help_outline</span>
                    </span>
                    <span className={`font-semibold ${fullRefund ? "text-secondary" : "text-on-surface"}`}>
                      {fullRefund ? `${formatCurrency(0, booking.currency)} (Full refund eligible)` : formatCurrency(fee, booking.currency)}
                    </span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mt-space-xs">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">Estimated Net Refund</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {paid ? "Credited to your original payment method (3–5 business days)" : "No payment collected — no refund required"}
                      </span>
                    </div>
                    <div className="font-headline-lg text-headline-lg font-serif text-primary">
                      {formatCurrency(paid ? refundAmount : 0, booking.currency)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold" htmlFor="reason">
                    Primary Reason for Cancellation <span className="text-primary">*</span>
                  </label>
                  <div className="relative mt-1">
                    <select
                      className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg px-space-md py-space-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
                      id="reason"
                      name="reason"
                      required
                    >
                      <option value="Change of travel schedule / flight disruption">Change of travel schedule / flight disruption</option>
                      <option value="Medical / Personal emergency">Medical / Personal emergency</option>
                      <option value="Unforeseen business conflict">Unforeseen business conflict</option>
                      <option value="Prefer alternative destination / revised route">Prefer alternative destination / revised route</option>
                      <option value="Other bespoke circumstances">Other bespoke circumstances</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">expand_more</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-space-xs">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold" htmlFor="notes">
                      Additional Notes for your Majordomo
                    </label>
                    <span className="font-label-sm text-label-sm text-outline">Optional · Confidential</span>
                  </div>
                  <textarea
                    className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm rounded-lg p-space-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all resize-none"
                    id="notes"
                    name="notes"
                    placeholder="Let your concierge know if we can hold specific dates or assist with private transport rebooking..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Acknowledgement */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-start gap-space-sm">
                <input
                  className="mt-1 w-5 h-5 rounded cursor-pointer accent-primary shrink-0"
                  id="acknowledge"
                  required
                  type="checkbox"
                />
                <label className="font-body-sm text-body-sm text-on-surface select-none cursor-pointer leading-relaxed" htmlFor="acknowledge">
                  I understand that confirming cancellation immediately releases the exclusive reservation hold on <strong className="text-primary font-serif">{booking.roomType.name}</strong> and cannot be reversed once finalized.
                </label>
              </div>

              <div className="flex items-center justify-center gap-space-xs py-1 text-center">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                  Discreet Concierge Handling · Automated Cancellation Folio Dispatched
                </span>
              </div>

              {/* Action footer */}
              <div className="py-space-md flex flex-col-reverse sm:flex-row items-center justify-between gap-space-sm">
                <Link
                  className="w-full sm:w-auto px-space-lg py-space-sm rounded-lg bg-transparent hover:bg-surface-container text-on-surface font-label-lg text-label-lg uppercase tracking-wider font-semibold transition-colors text-center"
                  href="/account"
                >
                  Keep My Reservation
                </Link>
                <button
                  className="w-full sm:w-auto px-space-lg py-space-sm rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-space-xs disabled:opacity-40"
                  disabled={alreadyCancelled}
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                  <span>
                    {alreadyCancelled
                      ? "Reservation Already Cancelled"
                      : `Confirm Cancellation${paid ? ` & Process Refund (${formatCurrency(refundAmount, booking.currency)})` : ""}`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
