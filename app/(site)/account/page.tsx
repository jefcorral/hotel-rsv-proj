import Link from "next/link"
import { redirect } from "next/navigation"

import { auth, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { isMockMode, mockBookingsForUser } from "@/lib/mock"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Villa Aurelia | Guest Atelier",
}

type DashboardBooking = {
  id: string
  checkIn: Date
  checkOut: Date
  guestCount: number
  guestName: string
  status: string
  totalPrice: number | { toString(): string }
  currency: string
  specialRequests: string | null
  roomType: {
    name: string
    slug: string
    bedType: string
    roomSize: number | null
    photos: string[]
    description: string | null
  }
  payments: { status: string }[]
}

function fmt(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

function nightsBetween(checkIn: Date, checkOut: Date) {
  return Math.max(
    1,
    Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)
  )
}

function initials(name?: string | null) {
  if (!name) return "VA"
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function firstName(name?: string | null) {
  return name?.split(" ")[0] || "Guest"
}

function daysUntil(date: Date) {
  return Math.ceil((date.getTime() - Date.now()) / 86400000)
}

const notices: Record<string, string> = {
  cancelled: "Your reservation has been cancelled and the suite hold released.",
  modified: "Your residency dates have been updated.",
  "mock-cancel": "Demo mode — cancellation is not persisted on this preview deployment.",
  "mock-modify": "Demo mode — date changes are not persisted on this preview deployment.",
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const { notice } = await searchParams

  const bookings: DashboardBooking[] = isMockMode
    ? mockBookingsForUser(session.user.email)
    : await prisma.booking.findMany({
        where: {
          OR: [
            { userId: session.user.id },
            ...(session.user.email ? [{ guestEmail: session.user.email }] : []),
          ],
        },
        include: { roomType: true, payments: true },
        orderBy: { checkIn: "asc" },
      })

  const now = new Date()
  const upcoming = bookings.filter(
    (b) =>
      (b.status === "confirmed" || b.status === "pending") &&
      b.checkOut.getTime() >= now.getTime()
  )
  const past = bookings.filter(
    (b) => b.status === "checked_out" || (b.status !== "cancelled" && b.checkOut.getTime() < now.getTime())
  )
  const cancelled = bookings.filter((b) => b.status === "cancelled")

  const nextStay = upcoming[0]
  const furtherStays = upcoming.slice(1)

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
          {notice && notices[notice] && (
            <div className="mb-space-md bg-secondary-fixed/40 text-on-secondary-container px-space-md py-space-sm rounded-lg font-label-md text-label-md uppercase tracking-wider">
              {notices[notice]}
            </div>
          )}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg lg:gap-space-xl items-start">
            {/* Inner Refined Sidebar Panel */}
            <aside className="xl:col-span-4 flex flex-col gap-space-md">
              {/* Guest Profile Prestige Card */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_16px_36px_-8px_rgba(43,30,26,0.06),0_4px_12px_-2px_rgba(43,30,26,0.02)] relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none" />
                <div className="flex items-start justify-between mb-space-md">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-headline-sm text-headline-sm ring-4 ring-surface-container-low shadow-sm">
                      {initials(session.user.name)}
                    </div>
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm"
                      title="Verified Patron"
                    >
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs bg-secondary-fixed/40 px-space-sm py-space-xs rounded-lg">
                    <span className="material-symbols-outlined text-secondary text-[15px]">diamond</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-secondary-container">
                      Estate Patron
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mb-space-md">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    {session.user.name}
                  </h2>
                  <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mt-space-xs">
                    {session.user.email}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low p-space-sm rounded-lg mb-space-md">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Residencies</span>
                    <span className="font-body-md text-body-md font-semibold text-primary">
                      {upcoming.length} Upcoming
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Past Stays</span>
                    <span className="font-body-md text-body-md font-semibold text-secondary">
                      {past.length} Memoirs
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <form
                    action={async () => {
                      "use server"
                      await signOut({ redirectTo: "/" })
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full flex items-center justify-between px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-left group"
                    >
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-primary text-[20px]">logout</span>
                        <span className="font-label-md text-label-md">Conclude Session</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-[18px]">
                        chevron_right
                      </span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Atelier Dashboard Sub-Navigation Menu */}
              <nav className="bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_16px_36px_-8px_rgba(43,30,26,0.04)] flex flex-col gap-space-xs">
                <a
                  className="flex items-center justify-between px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary shadow-sm"
                  href="#stays"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">hotel_class</span>
                    <span className="font-label-md text-label-md tracking-wider">My Residencies</span>
                  </div>
                  <span className="bg-on-primary/20 text-on-primary font-label-sm text-label-sm px-space-xs py-0.5 rounded-full">
                    {upcoming.length} Active
                  </span>
                </a>
                <a
                  className="flex items-center justify-between px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                  href="#memoirs"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    <span className="font-label-md text-label-md">Residency Memoirs</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">arrow_forward</span>
                </a>
                <Link
                  className="flex items-center justify-between px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                  href="/location"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    <span className="font-label-md text-label-md">Hotel &amp; Majordomo Desk</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">arrow_forward</span>
                </Link>
              </nav>

              {/* Bespoke Majordomo On-Call Widget */}
              <div className="bg-surface-container-high p-space-lg rounded-xl relative overflow-hidden shadow-[0_16px_36px_-8px_rgba(43,30,26,0.05)]">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Estate Concierge 24/7
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Positano HQ</span>
                </div>
                <div className="flex items-center gap-space-md my-space-md">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-md">
                    <span className="material-symbols-outlined text-[26px]">support_agent</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">Matteo Rossi</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Head Majordomo &amp; Sommelier</span>
                    <span className="font-label-sm text-label-sm text-secondary mt-0.5">Response Time &lt; 3 mins</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  “{firstName(session.user.name)}, our desk is at your disposal for transfers, dining, and any bespoke arrangement before your arrival.”
                </p>
                <div className="flex flex-col sm:flex-row gap-space-xs">
                  <a
                    className="flex-1 inline-flex items-center justify-center gap-space-xs bg-primary text-on-primary px-space-md py-space-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm font-label-sm text-label-sm uppercase tracking-wider"
                    href="tel:+39089875000"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Direct Call
                  </a>
                  <Link
                    className="flex-1 inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors px-space-md py-space-sm rounded-lg shadow-sm font-label-sm text-label-sm uppercase tracking-wider"
                    href="/location"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Contact Desk
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content Stage */}
            <div className="xl:col-span-8 flex flex-col gap-space-xl">
              {/* Editorial Header Banner */}
              <section className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-[0_16px_36px_-8px_rgba(43,30,26,0.05)] relative overflow-hidden flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
                <div className="flex flex-col gap-space-xs max-w-xl">
                  <div className="flex items-center gap-space-xs mb-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Residency Atelier</span>
                    <span className="text-on-surface-variant opacity-40">/</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Villa Aurelia</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
                    Welcome back, <span className="italic font-display text-primary">{firstName(session.user.name)}</span>
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                    Manage your upcoming residencies, bespoke itineraries, and past memoirs nestled along the private cliffs of Positano.
                  </p>
                </div>
                <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl self-start md:self-auto shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Positano Cliffside</span>
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">22°C · Golden Hour Sunny</span>
                  </div>
                </div>
              </section>

              {/* Section 1: Upcoming Stay Hero Card */}
              <section className="flex flex-col gap-space-md" id="stays">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-space-sm">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Residency</h2>
                    <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wider">
                      ({upcoming.length} {upcoming.length === 1 ? "Confirmed" : "Stays"})
                    </span>
                  </div>
                  {nextStay && (
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                      Booking Ref: <strong className="text-on-surface font-mono">{nextStay.id.slice(0, 10).toUpperCase()}</strong>
                    </span>
                  )}
                </div>

                {nextStay ? (
                  <div className="bg-surface-container-lowest rounded-xl shadow-[0_16px_36px_-8px_rgba(43,30,26,0.08),0_4px_12px_-2px_rgba(43,30,26,0.03)] overflow-hidden">
                    {/* Visual Backdrop Banner */}
                    <div className="relative w-full h-80 lg:h-96 overflow-hidden">
                      {nextStay.roomType.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={nextStay.roomType.name}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                          src={nextStay.roomType.photos[0]}
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-container" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute top-space-md left-space-md flex flex-wrap items-center gap-space-xs">
                        <span className="px-space-sm py-space-xs rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold shadow-sm">
                          {nextStay.payments.some((p) => p.status === "succeeded")
                            ? "Confirmed & Settled"
                            : "Confirmed · Awaiting Payment"}
                        </span>
                        <span className="px-space-sm py-space-xs rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-widest font-semibold shadow-sm">
                          Arriving in {daysUntil(nextStay.checkIn)} days
                        </span>
                      </div>
                      <div className="absolute bottom-space-lg left-space-lg right-space-lg text-white">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed mb-space-xs block font-semibold">
                          {nextStay.roomType.roomSize ? `${nextStay.roomType.roomSize} m² · ` : ""}{nextStay.roomType.bedType} Suite
                        </span>
                        <h3 className="font-headline-lg text-headline-lg text-white tracking-tight leading-none mb-space-xs">
                          {nextStay.roomType.name}
                        </h3>
                        <p className="font-body-md text-body-md text-surface-container-high/90 max-w-xl line-clamp-2">
                          {nextStay.roomType.description}
                        </p>
                      </div>
                    </div>

                    {/* Stay Specific Details Grid */}
                    <div className="p-space-lg lg:p-space-xl flex flex-col gap-space-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md py-space-sm bg-surface-container-low p-space-md rounded-xl">
                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-primary text-[24px]">calendar_today</span>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Dates &amp; Duration</span>
                            <span className="font-body-md text-body-md font-semibold text-on-surface">
                              {fmt(nextStay.checkIn)} – {fmt(nextStay.checkOut)}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {nightsBetween(nextStay.checkIn, nextStay.checkOut)} Nights
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-primary text-[24px]">group</span>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Party &amp; Quarters</span>
                            <span className="font-body-md text-body-md font-semibold text-on-surface">
                              {nextStay.guestCount} Guest{nextStay.guestCount !== 1 && "s"} · {nextStay.roomType.bedType}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">{nextStay.roomType.name}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Folio Settlement</span>
                            <span className="font-body-md text-body-md font-semibold text-primary">
                              {formatCurrency(Number(nextStay.totalPrice), nextStay.currency)}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {nextStay.payments.some((p) => p.status === "succeeded")
                                ? "Fully Settled"
                                : "Settlement Pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {nextStay.specialRequests && (
                        <div className="p-space-md bg-secondary-fixed/20 rounded-xl flex items-center justify-between gap-space-md">
                          <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-secondary text-[24px]">room_service</span>
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md font-semibold text-on-surface">Pre-Arrival Preferences Registered</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">{nextStay.specialRequests}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Prominent Primary Actions */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md pt-space-xs">
                        <div className="flex flex-wrap items-center gap-space-sm">
                          <Link
                            href={`/book/confirmation?ref=${nextStay.id}`}
                            className="bg-primary text-on-primary px-space-lg py-space-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-space-xs"
                          >
                            <span className="material-symbols-outlined text-[18px]">menu_book</span>
                            View Details &amp; Itinerary
                          </Link>
                          <Link
                            href={`/account/bookings/${nextStay.id}/modify`}
                            className="bg-surface-container-high text-on-surface px-space-lg py-space-sm rounded-lg hover:bg-surface-container-highest transition-colors font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-space-xs"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
                            Modify Stay
                          </Link>
                        </div>
                        <div className="flex items-center justify-end sm:justify-start gap-space-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <Link
                            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant underline-offset-4"
                            href={`/account/bookings/${nextStay.id}/cancel`}
                          >
                            Cancel Reservation
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-[40px] text-outline">hotel</span>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                      No upcoming residencies. Discover our sanctuaries and reserve your stay.
                    </p>
                    <Link
                      href="/rooms"
                      className="inline-block mt-4 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase px-6 py-3 rounded transition-colors"
                    >
                      Explore Residences
                    </Link>
                  </div>
                )}

                {/* Further upcoming stays as compact cards */}
                {furtherStays.map((b) => (
                  <div
                    key={b.id}
                    className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-outline block">
                        Ref {b.id.slice(0, 10).toUpperCase()}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{b.roomType.name}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {fmt(b.checkIn)} – {fmt(b.checkOut)} • {b.guestCount} guest{b.guestCount !== 1 && "s"}
                      </p>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <Link
                        href={`/account/bookings/${b.id}/modify`}
                        className="font-label-sm text-label-sm uppercase text-primary hover:underline"
                      >
                        Modify
                      </Link>
                      <Link
                        href={`/account/bookings/${b.id}/cancel`}
                        className="font-label-sm text-label-sm uppercase text-on-surface-variant hover:text-primary"
                      >
                        Cancel
                      </Link>
                      <span className="font-headline-sm text-headline-sm text-primary">
                        {formatCurrency(Number(b.totalPrice), b.currency)}
                      </span>
                    </div>
                  </div>
                ))}
              </section>

              {/* Section 2: Booking History (Memoirs & Past Stays) */}
              <section className="flex flex-col gap-space-md" id="memoirs">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-space-sm">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Residency Memoirs</h2>
                    <span className="font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">
                      ({past.length} Completed{cancelled.length > 0 ? ` · ${cancelled.length} Cancelled` : ""})
                    </span>
                  </div>
                </div>
                {past.length + cancelled.length === 0 ? (
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Your past residencies will appear here after your first stay.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {[...past, ...cancelled].map((b) => (
                      <div
                        key={b.id}
                        className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_16px_36px_-8px_rgba(43,30,26,0.04)] flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col gap-space-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                              {fmt(b.checkIn)} – {fmt(b.checkOut)}
                            </span>
                            <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase">
                              {nightsBetween(b.checkIn, b.checkOut)} Nights
                            </span>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                            {b.roomType.name}
                          </h3>
                          <div className="flex items-center gap-space-sm">
                            <span className={`inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold ${b.status === "cancelled" ? "text-outline" : "text-secondary"}`}>
                              <span className="material-symbols-outlined text-[16px]">
                                {b.status === "cancelled" ? "cancel" : "hotel_class"}
                              </span>
                              {b.status === "cancelled" ? "Cancelled" : "Completed Residency"}
                            </span>
                            <span className="text-on-surface-variant opacity-40">·</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Ref: {b.id.slice(0, 10).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="pt-space-sm flex flex-col gap-space-sm">
                          <div className="flex items-center justify-between py-space-xs bg-surface-container-low px-space-sm rounded-lg">
                            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Settled Total</span>
                            <span className="font-body-md text-body-md font-semibold text-on-surface">
                              {formatCurrency(Number(b.totalPrice), b.currency)}
                            </span>
                          </div>
                          <div className="flex items-center gap-space-xs">
                            <Link
                              href={`/rooms/${b.roomType.slug}`}
                              className="flex-1 bg-primary text-on-primary py-space-xs rounded-lg hover:bg-primary-container transition-colors font-label-sm text-label-sm uppercase tracking-wider text-center"
                            >
                              Book Again
                            </Link>
                            <Link
                              href={`/book/confirmation?ref=${b.id}`}
                              className="px-space-md bg-surface-container text-on-surface py-space-xs rounded-lg hover:bg-surface-container-high transition-colors font-label-sm text-label-sm uppercase tracking-wider text-center"
                            >
                              View Folio
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Section 3: Sanctuary Exploration */}
              <section className="bg-surface-container-high rounded-xl p-space-lg lg:p-space-xl relative overflow-hidden shadow-[0_16px_36px_-8px_rgba(43,30,26,0.04)]">
                <div className="max-w-2xl flex flex-col gap-space-sm relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-space-xs">
                    <span className="material-symbols-outlined text-[26px]">villa</span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Sanctuary Curator</span>
                    <span className="text-on-surface-variant opacity-40">·</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Plan Your Next Voyage</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Seeking a New Secluded Retreat?
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    When you are ready to retreat along the Amalfi cliffs, our master chambers, private clifftop pavilions, and historic limonaia villas await your arrival.
                  </p>
                  <div className="my-space-sm p-space-md bg-surface-container-lowest/80 backdrop-blur-md rounded-lg flex items-center gap-space-md shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[28px]">wine_bar</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">Direct Patron Courtesy Privileges</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Vintage Franciacorta reserve in-suite upon arrival and complimentary private airport limousine transfer.</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                    <Link
                      className="bg-primary text-on-primary px-space-lg py-space-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm font-label-lg text-label-lg uppercase tracking-wider inline-flex items-center gap-space-xs"
                      href="/rooms"
                    >
                      <span>Explore Suites &amp; Check Availability</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
                <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none select-none">
                  <span className="font-display text-[280px] text-primary leading-none">VA</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
