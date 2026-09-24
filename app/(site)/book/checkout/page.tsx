import Link from "next/link"
import { notFound } from "next/navigation"

import { HoldTimer } from "@/components/hold-timer"
import { buildMockBooking } from "@/lib/mock"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { processMockPayment } from "./actions"

export const metadata = {
  title: "Villa Aurelia | Checkout",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

type PageProps = {
  searchParams: Promise<{
    ref?: string
    error?: string
    roomType?: string
    checkIn?: string
    checkOut?: string
    guests?: string
    name?: string
    email?: string
    phone?: string
  }>
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { ref, error } = params
  if (!ref) notFound()

  const booking =
    ref === "mock"
      ? buildMockBooking(params)
      : await prisma.booking.findUnique({
          where: { id: ref },
          include: { roomType: true, hotel: true },
        })
  if (!booking) notFound()

  const currency = booking.currency || booking.hotel.currency
  const nights = Math.max(
    1,
    Math.round(
      (booking.checkOut.getTime() - booking.checkIn.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  )
  const totalPrice = Number(booking.totalPrice)
  const nightlyPrice = totalPrice / nights
  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
  const cancelDeadline = new Date(
    booking.checkIn.getTime() - 14 * 86400000
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Subtle Trust Banner / Countdown Stripe */}
          <div className="w-full bg-surface-container-low text-on-surface-variant">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xs flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>lock</span>
                <span className="tracking-widest uppercase font-semibold text-on-surface">256-Bit SSL Encrypted &amp; PCI-DSS Level 1 Certified Checkout</span>
                <span className="hidden md:inline text-outline-variant">•</span>
                <span className="hidden md:inline tracking-wider">Direct Villa Aurelia Sanctuary Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                <span className="tracking-widest uppercase text-on-surface font-medium">Session Reserved: <HoldTimer minutes={15} /> min</span>
              </div>
            </div>
          </div>
          {/* Stepper Navigation */}
          <section className="w-full bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
                  <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">Official Direct Booking Channel</span>
                </div>
                {/* Horizontal Steps */}
                <ol className="flex items-center gap-2 md:gap-space-md">
                  <li className="flex items-center gap-2 opacity-80 cursor-pointer">
                    <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center justify-center font-bold">✓</span>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface hidden sm:inline">1. Select Suite</span>
                  </li>
                  <span className="text-outline-variant text-xs">──</span>
                  <li className="flex items-center gap-2 opacity-80 cursor-pointer">
                    <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center justify-center font-bold">✓</span>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface hidden sm:inline">2. Guest Details</span>
                  </li>
                  <span className="text-outline-variant text-xs">──</span>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold shadow-sm">3</span>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">3. Secure Payment</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>
          {/* Main Checkout Interface: 2-Column Desktop Grid */}
          <section className="w-full bg-surface-container-lowest py-space-lg md:py-space-xl">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
                {/* LEFT COLUMN (7 Cols): Guest Verification & Stripe-Grade Form */}
                <div className="lg:col-span-7 flex flex-col gap-space-lg">
                  {/* Section Title & Reassurance Tag */}
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">Final Step • Sovereign Tranquility</span>
                    <h1 className="font-headline-md text-headline-md text-on-surface">Secure Guarantee &amp; Final Payment</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">Review your booking verification details and enter your preferred payment method below to finalize your retreat reservation.</p>
                  </div>
                  {/* Verified Guest Summary Card */}
                  <div className="bg-surface rounded p-space-md shadow-sm">
                    <div className="flex items-center justify-between pb-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                        <h2 className="font-headline-sm text-headline-sm text-on-surface text-base">Booking &amp; Guest Summary</h2>
                        <span className="bg-secondary-fixed-dim/30 text-secondary font-label-sm text-label-sm uppercase px-2 py-0.5 rounded">Verified</span>
                      </div>
                      <a className="font-label-sm text-label-sm uppercase tracking-widest text-primary hover:text-primary-container transition-colors flex items-center gap-1" href="#">
                        <span className="material-symbols-outlined text-[15px]">edit</span> Edit Details
                      </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs font-body-sm text-body-sm">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-0.5">Primary Guest</span>
                        <span className="font-medium text-on-surface">{booking.guestName}</span>
                        <span className="text-on-surface-variant truncate">{booking.guestEmail}</span>
                        <span className="text-on-surface-variant">{booking.guestPhone}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-0.5">Party &amp; Arrival Logistic</span>
                        <span className="font-medium text-on-surface">{booking.guestCount} Guest{booking.guestCount !== 1 && "s"} • Leisure Sanctuary</span>
                        <span className="text-on-surface-variant">Naples Capodichino (NAP) Private Transfer</span>
                        <span className="text-on-surface-variant">Estimated check-in: 15:00 CEST</span>
                      </div>
                    </div>
                    <div className="mt-space-sm pt-space-xs bg-surface-container-low p-3 rounded flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-[20px]">villa</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-semibold">{booking.roomType.name}</span>
                      </div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">{fmtDate(booking.checkIn)} – {fmtDate(booking.checkOut)} ({nights} Nights)</span>
                    </div>
                  </div>
                  {/* Payment Options Container (Stripe Elements Aesthetic) */}
                  <div className="bg-surface rounded p-space-md md:p-space-lg shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Payment Method</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">All financial interactions are shielded under European Banking 3DS2 standards.</p>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-80">
                        <span className="material-symbols-outlined text-secondary text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>verified</span>
                      </div>
                    </div>
                    {/* Express Pay Banner */}
                    <div className="flex flex-col gap-2">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Instant Express Checkout</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button className="w-full h-12 bg-on-background hover:bg-black text-white font-label-lg text-label-lg rounded flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-sm" type="button">
                          <svg className="h-5 w-auto fill-current" viewBox="0 0 170 82">
                            <path d="M45.5 35.8c-.2-9.1 7.4-13.6 7.7-13.8-4.2-6.2-10.8-7-13.1-7.1-5.6-.6-11 3.3-13.8 3.3-2.9 0-7.3-3.2-11.9-3.1-6.1.1-11.8 3.6-14.9 9.1-6.4 11-1.6 27.3 4.5 36.1 3 4.3 6.6 9.2 11.3 9 4.5-.2 6.2-2.9 11.7-2.9 5.4 0 6.9 2.9 11.7 2.8 4.8-.1 7.9-4.4 10.9-8.7 3.4-5 4.8-9.8 4.9-10.1-.1-.1-9.4-3.6-9.5-14.6zM37.3 11.2c2.5-3 4.1-7.2 3.7-11.2-3.6.1-7.9 2.4-10.4 5.3-2.2 2.6-4.2 6.8-3.7 10.9 4 .3 8-2 10.4-5z" />
                            <path d="M72.2 74.4V22.2h12.5c8.3 0 14.7 2.3 18.9 6.8 4.1 4.5 6.2 10.3 6.2 17.6 0 7.3-2.1 13.2-6.2 17.6-4.2 4.4-10.6 6.7-19.2 6.7H72.2zm7.6-7.2h5.5c6.3 0 10.8-1.5 13.5-4.6 2.7-3.1 4-7.4 4-13 0-5.7-1.3-10.1-4-13.1-2.7-3.1-7.1-4.6-13.3-4.6h-5.7v35.3zM128 74.4V42.3c0-3.6-1-6.4-2.9-8.3s-4.6-2.9-8.1-2.9c-2.4 0-4.5.5-6.4 1.6-1.9 1.1-3.4 2.6-4.4 4.5v37.2h-7.6V31.5h7.3v5.6c1.6-1.9 3.5-3.4 5.8-4.4 2.3-1.1 4.8-1.6 7.5-1.6 5.3 0 9.4 1.5 12.3 4.6 2.9 3.1 4.3 7.3 4.3 12.8v25.9H128zM140.6 74.4V31.5h7.6v42.9h-7.6zm3.8-47.5c-1.4 0-2.6-.5-3.6-1.5s-1.5-2.2-1.5-3.6c0-1.4.5-2.6 1.5-3.6s2.2-1.5 3.6-1.5c1.4 0 2.6.5 3.6 1.5s1.5 2.2 1.5 3.6c0 1.4-.5 2.6-1.5 3.6s-2.2 1.5-3.6 1.5z" />
                          </svg>
                          <span>Pay</span>
                        </button>
                        <button className="w-full h-12 bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-lg text-label-lg rounded flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-sm" type="button">
                          <span className="font-bold text-base tracking-tight"><span className="text-primary">G</span> Pay</span>
                        </button>
                      </div>
                    </div>
                    {/* Sleek Horizontal Divider */}
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow h-px bg-outline-variant/40" />
                      <span className="flex-shrink mx-4 font-label-sm text-label-sm uppercase tracking-widest text-outline">Or guarantee with bespoke card</span>
                      <div className="flex-grow h-px bg-outline-variant/40" />
                    </div>
                    {/* Card Elements Form */}
                    {error === "invalid" && (
                      <div className="mb-space-md rounded bg-error-container/60 border border-primary/30 px-4 py-3 font-body-sm text-body-sm text-on-surface">
                        Please check your card details — number (13–19 digits), expiry (MM/YY), and cardholder name are required.
                      </div>
                    )}
                    <form action={processMockPayment} className="space-y-space-md" id="payment-element-form">
                      <input type="hidden" name="bookingId" value={booking.id} />
                      <input type="hidden" name="roomType" value={booking.roomType.slug} />
                      <input type="hidden" name="checkIn" value={booking.checkIn.toISOString().split("T")[0]} />
                      <input type="hidden" name="checkOut" value={booking.checkOut.toISOString().split("T")[0]} />
                      <input type="hidden" name="guests" value={booking.guestCount} />
                      <input type="hidden" name="guestName" value={booking.guestName} />
                      <input type="hidden" name="guestEmail" value={booking.guestEmail} />
                      <input type="hidden" name="guestPhone" value={booking.guestPhone ?? ""} />
                      {/* Card Number with Live Brand Icons */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold" htmlFor="card-number">Card Number</label>
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-sm text-[10px] tracking-widest bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant font-bold">VISA</span>
                            <span className="font-label-sm text-[10px] tracking-widest bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant font-bold">MC</span>
                            <span className="font-label-sm text-[10px] tracking-widest bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant font-bold">AMEX</span>
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <input name="cardNumber" className="w-full h-12 pl-11 pr-12 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono tracking-wider" id="card-number" maxLength={19} placeholder="4532 •••• •••• 8921" type="text" />
                          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">credit_card</span>
                          <span className="material-symbols-outlined absolute right-3.5 text-secondary text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                        </div>
                      </div>
                      {/* Expiry & CVC Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold" htmlFor="card-expiry">Expiration Date</label>
                          <div className="relative flex items-center">
                            <input name="cardExpiry" className="w-full h-12 pl-11 pr-4 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono" id="card-expiry" maxLength={5} placeholder="MM / YY" type="text" />
                            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">calendar_today</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold" htmlFor="card-cvc">CVC / Security Code</label>
                            <span className="material-symbols-outlined text-outline-variant text-[16px] cursor-help" title="3 digits on back of Visa/Mastercard or 4 digits on front of Amex">help</span>
                          </div>
                          <div className="relative flex items-center">
                            <input name="cardCvc" className="w-full h-12 pl-11 pr-4 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono tracking-widest" id="card-cvc" maxLength={4} placeholder="•••" type="password" />
                            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">lock_clock</span>
                          </div>
                        </div>
                      </div>
                      {/* Cardholder Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold" htmlFor="card-name">Cardholder Full Name</label>
                        <div className="relative flex items-center">
                          <input name="cardName" className="w-full h-12 pl-11 pr-4 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary" id="card-name" type="text" />
                          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">badge</span>
                        </div>
                      </div>
                      {/* Country & Billing Postal Code */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold" htmlFor="card-country">Country or Region</label>
                          <select name="cardCountry" className="w-full h-12 px-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary" id="card-country">
                            <option>United Kingdom (GB)</option>
                            <option>Italy (IT)</option>
                            <option>United States (US)</option>
                            <option>Switzerland (CH)</option>
                            <option>France (FR)</option>
                            <option>Germany (DE)</option>
                            <option>Monaco (MC)</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold" htmlFor="card-postal">Billing Postal Code</label>
                          <input name="cardPostal" className="w-full h-12 px-4 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono" id="card-postal" type="text" />
                        </div>
                      </div>
                      {/* Checkbox: Incidental Pre-Auth / Stored Credentials */}
                      <div className="pt-2 flex items-start gap-3">
                        <input name="saveCard" defaultChecked className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" id="save-card-toggle" type="checkbox" />
                        <label className="font-body-sm text-body-sm text-on-surface cursor-pointer select-none" htmlFor="save-card-toggle">
                          Authorize Villa Aurelia to securely vault this payment token for incidental services, bespoke private yacht provisions, and Michelin tasting room dining charges during your stay.
                        </label>
                      </div>
                      {/* 3D Secure / Compliance Badge Ribbon */}
                      <div className="pt-space-xs flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low p-3 rounded text-on-surface-variant font-label-sm text-label-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[18px]">gpp_good</span>
                          <span>Mastercard Identity Check &amp; Visa Secure Activated</span>
                        </div>
                        <span className="tracking-widest uppercase font-semibold text-outline text-[10px]">Stripe Powered • ISO 27001</span>
                      </div>
                    </form>
                  </div>
                  {/* Direct Concierge Notice */}
                  <div className="flex items-center gap-space-sm bg-surface-container-high/60 p-space-md rounded">
                    <span className="material-symbols-outlined text-primary text-[28px] shrink-0">support_agent</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Dedicated Pre-Arrival Butler</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Upon reservation clearance, your lead concierge, Matteo Rossi, will immediately reach out to verify pillow preferences, dietary requests, and yacht transfer rendezvous.</p>
                    </div>
                  </div>
                </div>
                {/* RIGHT COLUMN (5 Cols): Sticky Folio & Final Investment Breakdown */}
                <div className="lg:col-span-5 sticky top-28 flex flex-col gap-space-md">
                  {/* Folio Summary Card */}
                  <div className="bg-surface rounded p-space-md md:p-space-lg shadow-md flex flex-col">
                    <div className="flex items-center justify-between pb-space-xs">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Private Folio</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Curated Stay Summary</h3>
                      </div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider bg-surface-container px-2.5 py-1 rounded text-primary font-bold">{nights} Nights</span>
                    </div>
                    {/* Suite Visual Thumbnail Card */}
                    <div className="mt-space-sm flex gap-space-sm items-center bg-surface-container-low p-2 rounded">
                      <img className="w-20 h-20 object-cover rounded shadow-sm shrink-0" alt={booking.roomType.name} src={booking.roomType.photos[0] ?? "/images/villa-aurelia-emblem.png"} />
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Villa Aurelia Residence</span>
                        <span className="font-headline-sm text-base text-on-surface truncate">{booking.roomType.name}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">{booking.roomType.roomSize ? `${booking.roomType.roomSize} m² • ` : ""}{booking.roomType.bedType}</span>
                      </div>
                    </div>
                    {/* Date & Occupancy Micro Bar */}
                    <div className="grid grid-cols-2 gap-2 mt-space-sm pt-space-xs text-on-surface">
                      <div className="bg-surface-container p-2.5 rounded flex flex-col">
                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Check-In</span>
                        <span className="font-label-md text-label-md font-semibold text-on-surface">{fmtDate(booking.checkIn)}</span>
                        <span className="font-body-sm text-xs text-on-surface-variant">From 15:00 CEST</span>
                      </div>
                      <div className="bg-surface-container p-2.5 rounded flex flex-col">
                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Check-Out</span>
                        <span className="font-label-md text-label-md font-semibold text-on-surface">{fmtDate(booking.checkOut)}</span>
                        <span className="font-body-sm text-xs text-on-surface-variant">Until 12:00 CEST</span>
                      </div>
                    </div>
                    {/* Itemized Financial Breakdown */}
                    <div className="mt-space-md space-y-space-xs font-body-sm text-body-sm pt-space-xs">
                      <div className="flex items-center justify-between text-on-surface">
                        <span>Nightly Sanctuary Rate ({formatCurrency(nightlyPrice, currency)} × {nights})</span>
                        <span className="font-mono font-medium">{formatCurrency(totalPrice, currency)}</span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span>Artisanal Champagne Daily Breakfast</span>
                        <span className="font-mono font-semibold text-secondary">Included ({formatCurrency(0, currency)})</span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span>Naples Capodichino S-Class Limousine</span>
                        <span className="font-mono font-semibold text-secondary">Included ({formatCurrency(0, currency)})</span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span>Roman Thermal Baths Circuit Access</span>
                        <span className="font-mono font-semibold text-secondary">Included ({formatCurrency(0, currency)})</span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span>Italian Hospitality VAT &amp; Local Levy</span>
                        <span className="font-mono font-semibold text-secondary">Included</span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span>Resort &amp; Private Estate Service Fee</span>
                        <span className="line-through text-outline font-mono">€450.00</span>
                        <span className="font-mono font-semibold text-secondary">Waived</span>
                      </div>
                      {/* Grand Total Row */}
                      <div className="pt-space-sm mt-space-sm bg-surface-container-high/40 p-3 rounded flex items-baseline justify-between">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline block">Total Investment</span>
                          <span className="font-label-sm text-[11px] text-on-surface-variant">Taxes, luxury levies &amp; concierge gratuity included</span>
                        </div>
                        <div className="text-right">
                          <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">{formatCurrency(totalPrice, currency)}</span>
                          <span className="font-label-sm text-[11px] text-outline block">EUR (Euro)</span>
                        </div>
                      </div>
                    </div>
                    {/* Big Primary CTA Button */}
                    <div className="mt-space-md flex flex-col gap-2">
                      <button form="payment-element-form" className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider py-4 px-6 rounded shadow-md transition-all flex items-center justify-center gap-2 group active:scale-[0.99]" id="submit-booking-btn" type="submit">
                        <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>lock</span>
                        <span>Complete Payment • {formatCurrency(totalPrice, currency)}</span>
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                      <p className="font-body-sm text-[12px] text-center text-on-surface-variant leading-relaxed">
                        By pressing complete payment, your card will be secured. Immediate voucher and concierge dossier dispatched to <strong className="text-on-surface">{booking.guestEmail}</strong>.
                      </p>
                    </div>
                    {/* Serenity Cancellation Policy Box (Soft Mineral/Sage Assurance) */}
                    <div className="mt-space-md bg-secondary-fixed/20 p-space-sm rounded flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-secondary">
                        <span className="material-symbols-outlined text-[20px]">spa</span>
                        <h4 className="font-label-md text-label-md uppercase tracking-wider font-bold">Serenity Cancellation Guarantee</h4>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                        Full <strong>100% refund</strong> for cancellations made up to 14 days prior to arrival (until {cancelDeadline}, 23:59 CEST). Unconditional date changes permitted without penalty up to 7 days before check-in.
                      </p>
                    </div>
                    {/* Trust Badges Row */}
                    <div className="mt-space-md pt-space-xs grid grid-cols-2 gap-2 text-on-surface-variant font-label-sm text-[11px]">
                      <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded">
                        <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                        <span>PCI-DSS Validated</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded">
                        <span className="material-symbols-outlined text-secondary text-[16px]">security</span>
                        <span>Norton Secured 256-Bit</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded">
                        <span className="material-symbols-outlined text-secondary text-[16px]">hotel</span>
                        <span>Official Direct Rate</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded">
                        <span className="material-symbols-outlined text-secondary text-[16px]">headset_mic</span>
                        <span>24/7 Estate Support</span>
                      </div>
                    </div>
                    {/* Concierge Direct Helpline */}
                    <div className="mt-space-sm pt-space-xs text-center font-body-sm text-xs text-on-surface-variant">
                      Immediate reservation assistance: <a className="text-primary font-semibold hover:underline" href="tel:+39089875110">+39 089 875 110</a> (Matteo Rossi)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Guest Assurance Banner Strip */}
          <section className="w-full bg-surface-container-low py-space-md">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md text-center md:text-left">
                <div className="flex items-center gap-space-sm justify-center md:justify-start">
                  <span className="material-symbols-outlined text-primary text-[32px]">shield_person</span>
                  <div>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block">Total Privacy Sanctuary</span>
                    <span className="font-body-sm text-xs text-on-surface-variant">Discreet guest protocols honored under Italian NDAs</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm justify-center md:justify-start">
                  <span className="material-symbols-outlined text-primary text-[32px]">flight_land</span>
                  <div>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block">Chauffeured Arrival</span>
                    <span className="font-body-sm text-xs text-on-surface-variant">Mercedes S-Class with cold towels and prosecco</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm justify-center md:justify-start">
                  <span className="material-symbols-outlined text-primary text-[32px]">stars</span>
                  <div>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block">Leading Relais Standard</span>
                    <span className="font-body-sm text-xs text-on-surface-variant">Condé Nast Gold List 2024 &amp; Michelin Guide Key</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Client-side Script */}
        </div></main>

    </div>
  )
}
