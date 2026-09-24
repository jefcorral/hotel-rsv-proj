import Link from "next/link"
import { redirect } from "next/navigation"

import { HoldTimer } from "@/components/hold-timer"
import { createBooking } from "./actions"
import { getRoomTypeBySlug, validateSearchParams } from "@/lib/search"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Villa Aurelia | Guest Booking",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

type PageProps = {
  searchParams: Promise<{
    roomType?: string
    checkIn?: string
    checkOut?: string
    guests?: string
    error?: string
  }>
}

const ERROR_MESSAGES: Record<string, string> = {
  missing: "Please complete all required guest fields.",
  capacity: "The selected party size exceeds this sanctuary's capacity.",
  dates: "The selected dates are not valid. Please review your stay.",
  unavailable:
    "This sanctuary was just reserved by another guest. Please select different dates or another residence.",
}

export default async function GuestBookingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const roomTypeSlug = params.roomType
  if (!roomTypeSlug) redirect("/rooms")

  const roomType = await getRoomTypeBySlug(roomTypeSlug)
  if (!roomType) redirect("/rooms")

  const { checkIn, checkOut, guests } = validateSearchParams(params)
  const checkInStr = checkIn.toISOString().split("T")[0]
  const checkOutStr = checkOut.toISOString().split("T")[0]
  const nights = Math.max(
    1,
    Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    )
  )
  const nightlyPrice = roomType.basePrice
  const totalPrice = nightlyPrice * nights
  const currency = roomType.hotel.currency
  const error = params.error ? ERROR_MESSAGES[params.error] : null

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Progress Stepper & Notification Bar */}
          <section className="w-full bg-surface-container-low py-space-sm">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Breadcrumb Stepper */}
                <nav aria-label="Reservation Progress" className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
                  <div className="flex items-center gap-2 text-on-surface-variant shrink-0">
                    <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider line-through decoration-outline">1. Select Sanctuary</span>
                  </div>
                  <span className="text-outline-variant/60">/</span>
                  <div className="flex items-center gap-2 text-primary shrink-0 font-semibold">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm">
                      2
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">2. Guest Details</span>
                  </div>
                  <span className="text-outline-variant/60">/</span>
                  <div className="flex items-center gap-2 text-outline shrink-0">
                    <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-label-sm text-label-sm text-outline">
                      3
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">3. Guarantee</span>
                  </div>
                </nav>
                {/* Timer / Hold Notice */}
                <div className="inline-flex items-center gap-2 bg-surface-container-highest/80 px-3.5 py-1.5 rounded text-on-surface-variant text-body-sm shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[18px] animate-pulse">hourglass_top</span>
                  <span className="font-label-sm text-label-sm uppercase text-on-surface">Chamber held for:</span>
                  <HoldTimer />
                  <span className="hidden sm:inline text-outline text-label-sm">— Direct Rate Guaranteed</span>
                </div>
              </div>
            </div>
          </section>
          {/* Main Content Container */}
          <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg lg:py-space-xl">
            {error && (
              <div className="mb-space-md rounded-lg bg-error-container/60 border border-primary/30 px-5 py-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">error</span>
                <div>
                  <span className="font-label-md text-label-md uppercase font-semibold text-on-surface block">
                    We could not secure this sanctuary
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {error}
                  </span>
                </div>
              </div>
            )}
            {/* Editorial Page Header */}
            {/* Two-Column Asymmetric Grid (7 Col / 5 Col) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-desktop items-start">
              {/* LEFT COLUMN: Forms & Sanctuary Card (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                {/* Sanctuary Reservation Summary Card */}
                <div className="bg-surface-container-lowest rounded-lg p-6 lg:p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Room Image Preview */}
                    <div className="w-full sm:w-48 h-40 rounded shrink-0 overflow-hidden relative group">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={roomType.name} src={roomType.photos[0] ?? "/images/villa-aurelia-emblem.png"} />
                      <span className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm text-primary font-label-sm text-label-sm uppercase px-2 py-0.5 rounded shadow-sm">
                        {roomType.bedType}
                      </span>
                    </div>
                    {/* Suite Meta Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm uppercase text-secondary font-semibold">
                          <span className="material-symbols-outlined text-[16px]">stars</span>
                          Villa Aurelia Residence
                        </span>
                        <Link className="font-label-sm text-label-sm uppercase tracking-wider text-primary hover:underline" href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`}>
                          Change Suite
                        </Link>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                        {roomType.name}
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                        {roomType.roomSize ? `${roomType.roomSize} m²` : ""} {roomType.roomSize ? "•" : ""} {roomType.bedType} • Up to {roomType.maxGuests} Guests
                      </p>
                      {/* Stay Pill Specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-3 bg-surface-container-low rounded p-3 text-body-sm">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase block text-outline">Check-In</span>
                          <span className="font-semibold text-on-surface">{fmtDate(checkIn)}</span>
                          <span className="block text-outline text-[11px]">From 15:00</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm uppercase block text-outline">Check-Out</span>
                          <span className="font-semibold text-on-surface">{fmtDate(checkOut)}</span>
                          <span className="block text-outline text-[11px]">Until 12:00</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm uppercase block text-outline">Duration &amp; Party</span>
                          <span className="font-semibold text-on-surface">{nights} Night{nights !== 1 && "s"}</span>
                          <span className="block text-outline text-[11px]">{guests} Guest{guests !== 1 && "s"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Included Privileges Tags */}
                  <div className="pt-4 flex flex-wrap gap-2 items-center bg-surface-container-lowest">
                    <span className="font-label-sm text-label-sm uppercase text-outline mr-1">Complimentary:</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-tertiary rounded text-label-sm font-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">local_cafe</span> Artisanal Champagne Breakfast
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-tertiary rounded text-label-sm font-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">directions_car</span> Naples S-Class Chauffeur
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-tertiary rounded text-label-sm font-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">spa</span> Subterranean Spa Pass
                    </span>
                  </div>
                </div>
                {/* Form Section: Primary Guest Information */}
                <form id="guest-booking" action={createBooking} className="bg-surface-container-lowest rounded-lg p-6 lg:p-8 shadow-sm flex flex-col gap-6">
                  <input type="hidden" name="roomType" value={roomType.slug} />
                  <input type="hidden" name="checkIn" value={checkInStr} />
                  <input type="hidden" name="checkOut" value={checkOutStr} />
                  <input type="hidden" name="guests" value={guests} />
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        1. Primary Guest Details
                      </h3>
                      <span className="font-label-sm text-label-sm text-outline uppercase">* Mandatory fields</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Kindly ensure all details correspond precisely with your official travel passport for Italian hospitality registration.
                    </p>
                  </div>
                  {/* Grid of Guest Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {/* Salutation Title */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="salutation">
                        Title / Honorific *
                      </label>
                      <div className="relative">
                        <select name="title" className="w-full h-12 px-3 bg-surface-container-low text-on-surface rounded text-body-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer pr-8" id="salutation">
                          <option value="mr">Mr.</option>
                          <option value="mrs">Mrs.</option>
                          <option value="ms">Ms.</option>
                          <option value="dr">Dr.</option>
                          <option value="prof">Prof.</option>
                          <option value="lord">Lord / Lady</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">expand_more</span>
                      </div>
                    </div>
                    {/* First Name */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="first-name">
                        First Name *
                      </label>
                      <input name="firstName" className="w-full h-12 px-4 bg-surface-container-low text-on-surface rounded text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" id="first-name" placeholder="e.g. Eleanor" required type="text" />
                    </div>
                    {/* Last Name */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="last-name">
                        Last Name *
                      </label>
                      <input name="lastName" className="w-full h-12 px-4 bg-surface-container-low text-on-surface rounded text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" id="last-name" placeholder="e.g. Vance" required type="text" />
                    </div>
                    {/* Email Address */}
                    <div className="md:col-span-3 flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="email">
                        Email Address *
                      </label>
                      <input name="email" className="w-full h-12 px-4 bg-surface-container-low text-on-surface rounded text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" id="email" placeholder="name@domain.com" required type="email" />
                      <span className="text-[11px] text-outline">Digital confirmation and bespoke itinerary delivered here</span>
                    </div>
                    {/* Phone Number */}
                    <div className="md:col-span-3 flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="phone">
                        Mobile Phone *
                      </label>
                      <div className="flex gap-2">
                        <select name="phoneCode" className="w-24 h-12 px-2 bg-surface-container-low text-on-surface rounded text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm shrink-0">
                          <option value={+44}>+44 (UK)</option>
                          <option value={+39}>+39 (IT)</option>
                          <option value={+1}>+1 (US)</option>
                          <option value={+33}>+33 (FR)</option>
                          <option value={+41}>+41 (CH)</option>
                          <option value={+971}>+971 (AE)</option>
                        </select>
                        <input name="phone" className="flex-1 h-12 px-4 bg-surface-container-low text-on-surface rounded text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" id="phone" placeholder="Phone number" required type="tel" />
                      </div>
                      <span className="text-[11px] text-outline">For seamless private chauffeur coordination on arrival</span>
                    </div>
                    {/* Country of Residence */}
                    <div className="md:col-span-6 flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="residence">
                        Country / Region of Residence *
                      </label>
                      <div className="relative">
                        <select name="residence" className="w-full h-12 px-4 bg-surface-container-low text-on-surface rounded text-body-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer pr-10" id="residence">
                          <option value="GB">United Kingdom (Great Britain)</option>
                          <option value="IT">Italy</option>
                          <option value="US">United States</option>
                          <option value="CH">Switzerland</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="AE">United Arab Emirates</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">expand_more</span>
                      </div>
                    </div>
                  </div>
                  {/* Stay Preferences & Logistics */}
                  <div className="pt-4">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                      Arrival Logistics &amp; Concierge Notes
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                      We personalize your chamber scents, ambient music, and arrival collation in advance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Estimated Arrival Time */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="arrival-time">
                          Estimated Arrival Window
                        </label>
                        <div className="relative">
                          <select name="arrivalTime" className="w-full h-12 px-4 bg-surface-container-low text-on-surface rounded text-body-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-sm pr-10" id="arrival-time">
                            <option value="early">Early Arrival: 12:00 – 14:00 (Sanctuary lounge access)</option>
                            <option value="standard">Standard Check-in: 15:00 – 18:00</option>
                            <option value="evening">Evening Arrival: 18:00 – 21:00</option>
                            <option value="late">Late Arrival: Post 21:00 (Night Butler notified)</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">schedule</span>
                        </div>
                      </div>
                      {/* Arrival Transportation Mode */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="arrival-mode">
                          Arrival Transfer Arrangement
                        </label>
                        <div className="relative">
                          <select name="arrivalMode" className="w-full h-12 px-4 bg-surface-container-low text-on-surface rounded text-body-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-sm pr-10" id="arrival-mode">
                            <option value="chauffeured-nap">Complimentary S-Class from Naples (NAP)</option>
                            <option value="chauffeured-rom">Private Transfer from Rome (FCO / Ciampino)</option>
                            <option value="helicopter">Helicopter Charter (Ravello / Sorrento Pad)</option>
                            <option value="sea-shuttle">Private Riva Yacht Sea Transfer</option>
                            <option value="self-drive">Self-Drive / Valet Parking Needed</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">flight_land</span>
                        </div>
                      </div>
                    </div>
                    {/* Dietary / Special Requests */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase text-on-surface-variant" htmlFor="special-requests">
                        Dietary Preferences, Celebrations &amp; Tailored Wishes
                      </label>
                      <textarea name="specialRequests" className="w-full p-4 bg-surface-container-low text-on-surface rounded text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none" id="special-requests" placeholder="E.g., Celebrating 10th wedding anniversary; gluten-free pastries; preference for high-terrace sunset seating at Ristorante Belvedere..." rows={3} />
                    </div>
                  </div>
                  {/* Additional Guest Accordion / Optional */}
                  <div className="pt-2">
                    <details className="group bg-surface-container-low rounded p-4">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="font-label-md text-label-md uppercase text-on-surface font-semibold flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">person_add</span>
                          Add Second Guest Details (Optional)
                        </span>
                        <span className="material-symbols-outlined text-outline transition-transform group-open:rotate-180">expand_more</span>
                      </summary>
                      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="secondGuestFirst" className="w-full h-11 px-3 bg-surface-container-lowest text-on-surface rounded text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Second Guest First Name" type="text" />
                        <input name="secondGuestLast" className="w-full h-11 px-3 bg-surface-container-lowest text-on-surface rounded text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Second Guest Last Name" type="text" />
                      </div>
                    </details>
                  </div>
                  {/* SMS Notification Agreement */}
                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <input name="smsOptIn" defaultChecked className="mt-1 w-4 h-4 rounded text-primary accent-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Receive real-time WhatsApp &amp; SMS notifications from your dedicated Villa Aurelia Majordomo regarding airport greeting and tailored dining reservations.
                    </span>
                  </label>
                </form>
                {/* Visual Sanctuary Grounds Breakout Banner */}
                <div className="w-full rounded-lg overflow-hidden bg-surface-container-low p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                  <div className="w-full md:w-1/3 h-36 rounded overflow-hidden relative">
                    <img className="w-full h-full object-cover" data-alt="Sunlit Mediterranean stone veranda overlooking deep turquoise Tyrrhenian waters with terracotta planters filled with blooming bougainvillea and comfortable linen loungers under olive trees" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU8_S_ui7GhXkvthVvhRGvlyQZD872SDWlTwHhc1JR1XZWJUiONCmbXbY7HQ6YU3j7m4Hk3ad3B2JWHI1J977T-H4coozDQy5MXn1RRqWBovrzBiUDLBkg800r5dAooj-FIPgvJOS3P9nMofkN49x7zuKQdeGVymK89TgrWayYGv_TrqqfcLlKsof7OP39DNjDaUYSwhGPUidsz0QJdofdjyiGgpsg0ucqA8hOZPeRNDlcb7bAcSvO" />
                  </div>
                  <div className="w-full md:w-2/3">
                    <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">Sanctuary Guarantee</span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-2">The Belvedere Penthouse Advantage</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Includes guaranteed daily priority seating on the sea-facing loggia, unpacked luggage valet service, and bespoke evening aperitivo served upon your private terrace at twilight.
                    </p>
                  </div>
                </div>
              </div>
              {/* RIGHT COLUMN: Sticky Investment Summary & Payment Guarantee (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
                {/* Investment Breakdown Card */}
                <div className="bg-surface-container-lowest rounded-lg p-6 lg:p-8 shadow-md">
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Curated Stay</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Reservation Investment</h3>
                    </div>
                    <span className="font-label-md text-label-md uppercase bg-surface-container text-tertiary px-2.5 py-1 rounded font-semibold">
                      EUR (€)
                    </span>
                  </div>
                  {/* Price Line Items */}
                  <div className="space-y-3 pt-2 text-body-sm">
                    <div className="flex items-center justify-between text-on-surface">
                      <span>{roomType.name} ({nights} Night{nights !== 1 && "s"} × {formatCurrency(nightlyPrice, currency)})</span>
                      <span className="font-semibold">{formatCurrency(totalPrice, currency)}</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Artisanal Champagne Daily Breakfast</span>
                      <span className="text-primary font-semibold uppercase text-label-sm">Included</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Naples (NAP) Airport S-Class Transfer</span>
                      <span className="text-primary font-semibold uppercase text-label-sm">Included</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Roman Subterranean Thermal Circuit</span>
                      <span className="text-primary font-semibold uppercase text-label-sm">Included</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface">
                      <span>Italian Hospitality VAT &amp; City Relais Fee</span>
                      <span className="font-semibold">Included</span>
                    </div>
                  </div>
                  {/* Subtle Divider Accent */}
                  <div className="h-0.5 w-full bg-surface-container-high my-5 relative">
                    <div className="h-0.5 w-16 bg-primary absolute left-0 top-0" />
                  </div>
                  {/* Grand Total Section */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Total Investment</span>
                      <span className="text-xs text-on-surface-variant">All regional taxes, VAT &amp; service included</span>
                    </div>
                    <div className="text-right">
                      <div className="font-headline-md text-headline-md text-primary font-semibold leading-none">
                        {formatCurrency(totalPrice, currency)}
                      </div>
                    </div>
                  </div>
                  {/* Zero Deposit Notice Box */}
                  <div className="bg-surface-container-low rounded p-3.5 mb-6 flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">credit_card_clock</span>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-on-surface font-semibold block">
                        No Payment Deducted Today
                      </span>
                      <span className="text-[12px] text-on-surface-variant block mt-0.5 leading-snug">
                        Your card is held solely as a reservation guarantee. Full balance settles conveniently during checkout at the Villa.
                      </span>
                    </div>
                  </div>
                  {/* Guarantee Payment Selector */}
                  <div className="space-y-4">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface block font-semibold">
                      Select Guarantee Method
                    </label>
                    {/* Card Radio Tile */}
                    <label className="flex items-start gap-3 p-3.5 rounded bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 text-primary accent-primary" name="payment_mode" type="radio" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md uppercase font-semibold text-on-surface">Credit / Debit Card Hold</span>
                          <div className="flex gap-1.5 opacity-80">
                            <span className="px-1.5 py-0.5 bg-surface rounded text-[10px] font-bold text-on-surface">VISA</span>
                            <span className="px-1.5 py-0.5 bg-surface rounded text-[10px] font-bold text-on-surface">MC</span>
                            <span className="px-1.5 py-0.5 bg-surface rounded text-[10px] font-bold text-on-surface">AMEX</span>
                          </div>
                        </div>
                        <p className="text-[12px] text-on-surface-variant mt-1">Instant confirmation. Zero booking fees.</p>
                      </div>
                    </label>
                    {/* Card Entry Mock Fields */}
                    <div className="space-y-3 pt-1">
                      <input className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface rounded text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Card Number (•••• •••• •••• ••••)" type="text" />
                      <div className="grid grid-cols-2 gap-3">
                        <input className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface rounded text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="MM / YY" type="text" />
                        <input className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface rounded text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="CVV / CVC" type="password" />
                      </div>
                      <input className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface rounded text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Cardholder Name as shown on card" type="text" />
                    </div>
                    {/* Apple Pay / Alternative Tile */}
                    <label className="flex items-start gap-3 p-3.5 rounded bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                      <input className="mt-1 text-primary accent-primary" name="payment_mode" type="radio" />
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <span className="font-label-md text-label-md uppercase font-semibold text-on-surface block">Digital Wallet (Apple Pay / GPay)</span>
                          <span className="text-[12px] text-on-surface-variant">Authenticate with biometric device guarantee</span>
                        </div>
                        <span className="material-symbols-outlined text-outline">fingerprint</span>
                      </div>
                    </label>
                    {/* Primary Submission CTA Button */}
                    <button form="guest-booking" className="w-full mt-4 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider py-4 px-6 rounded transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer" type="submit">
                      <span>Confirm &amp; Secure Sanctuary</span>
                      <span className="font-mono text-sm opacity-90">({formatCurrency(totalPrice, currency)})</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    {/* Legal Microcopy */}
                    <p className="text-center text-[11px] text-outline leading-tight pt-1">
                      By selecting "Confirm &amp; Secure Sanctuary", you accept Villa Aurelia's
                      <a className="underline hover:text-primary" href="#">Guest Terms</a>,
                      <a className="underline hover:text-primary" href="#">Serenity Cancellation Policy</a>,
                      and Italian hospitality lodging covenants.
                    </p>
                  </div>
                </div>
                {/* Trust Signals Accordion / Badges Card */}
                <div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </span>
                    <div>
                      <h5 className="font-label-md text-label-md uppercase font-semibold text-on-surface">Flexible Serenity Cancellation</h5>
                      <p className="text-body-sm text-body-sm text-on-surface-variant">Full refund guaranteed if canceled up to 14 days prior to arrival ({new Date(checkIn.getTime() - 14 * 86400000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}). Seamless date alterations accommodated without penalty.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                    </span>
                    <div>
                      <h5 className="font-label-md text-label-md uppercase font-semibold text-on-surface">Swiss-Grade 256-Bit SSL Encryption</h5>
                      <p className="text-body-sm text-body-sm text-on-surface-variant">PCI-DSS Level 1 compliant infrastructure. Payment tokens are encrypted and handled strictly by sovereign European banking partners.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    </span>
                    <div>
                      <h5 className="font-label-md text-label-md uppercase font-semibold text-on-surface">24/7 Dedicated Estate Concierge</h5>
                      <p className="text-body-sm text-body-sm text-on-surface-variant">
                        Questions before finalizing? Contact Head Concierge Matteo directly: <br />
                        <span className="font-semibold text-on-surface">+39 089 875 110</span> • <span className="text-primary underline">concierge@villaaurelia.it</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Assurance Bottom Bar Strip */}
            <div className="mt-space-xl pt-space-lg border-t-0 bg-surface-container-low rounded-lg p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <span className="material-symbols-outlined text-primary text-[28px]">price_check</span>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase block text-on-surface font-semibold">Best Direct Guarantee</span>
                    <span className="text-body-sm text-on-surface-variant">Bottled vintage Franciacorta on arrival</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <span className="material-symbols-outlined text-primary text-[28px]">room_service</span>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase block text-on-surface font-semibold">Dedicated Butler</span>
                    <span className="text-body-sm text-on-surface-variant">Continuous bespoke Majordomo service</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <span className="material-symbols-outlined text-primary text-[28px]">key</span>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase block text-on-surface font-semibold">Flexible Check-In</span>
                    <span className="text-body-sm text-on-surface-variant">Personalized reception &amp; welcome suite</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <span className="material-symbols-outlined text-primary text-[28px]">security</span>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase block text-on-surface font-semibold">Secure Sanctuary</span>
                    <span className="text-body-sm text-on-surface-variant">Private gated access on Positano cliffs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Interactive Countdown Micro-script */}
        </div></main>

    </div>
  )
}
