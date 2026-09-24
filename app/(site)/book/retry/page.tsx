import Link from "next/link"
import { notFound } from "next/navigation"

import { buildMockBooking } from "@/lib/mock"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Villa Aurelia | Payment Failed",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

type PageProps = {
  searchParams: Promise<{
    ref?: string
    reason?: string
    roomType?: string
    checkIn?: string
    checkOut?: string
    guests?: string
    name?: string
    email?: string
    phone?: string
  }>
}

export default async function RetryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { ref } = params
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
  const totalPrice = Number(booking.totalPrice)
  const nights = Math.max(
    1,
    Math.round(
      (booking.checkOut.getTime() - booking.checkIn.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  )
  const retryUrl =
    booking.id === "MOCK-DEMO"
      ? `/book/checkout?${new URLSearchParams({
          ref: "mock",
          roomType: booking.roomType.slug,
          checkIn: booking.checkIn.toISOString().split("T")[0],
          checkOut: booking.checkOut.toISOString().split("T")[0],
          guests: String(booking.guestCount),
          name: booking.guestName,
          email: booking.guestEmail,
          phone: booking.guestPhone ?? "",
        }).toString()}`
      : `/book/checkout?ref=${booking.id}`

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Top Stepper / Reservation Milestones */}
          <section className="w-full bg-surface-container-low/70 py-space-sm">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <nav aria-label="Booking Progress" className="w-full overflow-x-auto">
                <ol className="flex items-center justify-between min-w-[620px] max-w-4xl mx-auto gap-3 py-1">
                  {/* Step 1: Done */}
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">1. Suite Selection</span>
                  </li>
                  <div className="flex-1 h-[1px] bg-outline-variant/50 max-w-[50px]" />
                  {/* Step 2: Done */}
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">2. Guest Details</span>
                  </li>
                  <div className="flex-1 h-[1px] bg-primary-container max-w-[50px]" />
                  {/* Step 3: Current / Attention */}
                  <li className="flex items-center gap-2.5 bg-surface px-3 py-1.5 rounded shadow-sm">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm">
                      3
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Payment &amp; Guarantee</span>
                      <span className="font-label-sm text-[0.625rem] text-secondary">Attention Needed</span>
                    </div>
                  </li>
                  <div className="flex-1 h-[1px] bg-outline-variant/30 max-w-[50px]" />
                  {/* Step 4: Upcoming */}
                  <li className="flex items-center gap-2 opacity-50">
                    <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">
                      4
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Confirmed</span>
                  </li>
                </ol>
              </nav>
            </div>
          </section>
          {/* Reassuring Hold Status Banner */}
          <section className="w-full bg-surface-container py-3 shadow-[inset_0_-1px_0_rgba(219,193,186,0.25)]">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface">
                  Suite Secured Under Temporary Hold
                </span>
                <span className="hidden md:inline-block text-outline">•</span>
                <span className="hidden md:inline font-body-sm text-body-sm text-on-surface-variant">
                  Reference: <span className="font-medium text-on-surface">#{booking.id.slice(0, 10).toUpperCase()}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 mx-auto sm:mx-0 bg-surface px-3 py-1 rounded shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Held for:</span>
                <span className="font-label-lg text-label-lg text-primary font-bold tracking-widest" id="hold-timer">14:59</span>
              </div>
            </div>
          </section>
          {/* Main Content Stage */}
          <section className="w-full py-space-lg lg:py-space-xl">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              {/* Dignified & Calming Announcement Header */}
              <div className="max-w-3xl mb-space-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded mb-space-xs">
                  <span className="material-symbols-outlined text-[17px] text-secondary">shield_lock</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Discreet &amp; Safe Checkout</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                  We couldn’t process your payment
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Please rest assured: your reservation for <span className="text-on-surface font-medium">The Belvedere Grand Master Suite</span> has been temporarily preserved. No cancellation has occurred, and your selected dates remain exclusively reserved for you.
                </p>
              </div>
              {/* Graceful Error Notice / Bank Reason Banner */}
              <div className="bg-surface-container-low p-space-md lg:p-space-lg rounded-xl mb-space-lg shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
                  <div className="lg:col-span-1 flex justify-start lg:justify-center">
                    <div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center text-on-secondary-container">
                      <span className="material-symbols-outlined text-[28px]">credit_card_off</span>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Authorization Declined by Card Issuer
                      </h2>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant font-mono">
                        SEC_402_DECLINED
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm">
                      Your financial institution reported: <em className="text-on-surface">“Verification threshold not fulfilled or luxury international limit applied.”</em> No funds were deducted from your account.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-surface-variant font-body-sm text-body-sm pt-2">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">verified_user</span>
                        <span>Check your banking app for a 3D Secure / OTP push prompt.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">travel_explore</span>
                        <span>Enable high-value international transactions for Italy.</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 bg-surface p-space-sm rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-secondary">
                      <span className="material-symbols-outlined text-[19px]">lock</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Zero Risk Guarantee</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
                      Your room dates are protected while you resolve this step or select an alternative payment method.
                    </p>
                    <a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container font-semibold uppercase tracking-wider" href="tel:+39089875110">
                      <span>Direct line to Front Desk</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* Two-Column Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
                {/* Left Column: Payment Actions & Resolution Methods (7 Cols) */}
                <div className="lg:col-span-7 space-y-space-md">
                  {/* Primary Direct Retry Card */}
                  <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-sm">
                    <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Attempted Method</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 mt-0.5">
                          <span>Visa ending in 4242</span>
                          <span className="material-symbols-outlined text-[18px] text-outline">credit_card</span>
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 bg-surface-container-high rounded text-on-surface-variant font-label-sm text-label-sm uppercase">
                        Exp 08/28
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      If you have approved the security alert within your banking application or confirmed authorization with your issuer, you may re-submit this transaction immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Link href={retryUrl} className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase px-6 py-3.5 rounded transition-all shadow flex items-center justify-center gap-2" id="retry-btn">
                        <span className="material-symbols-outlined text-[19px]">refresh</span>
                        <span>Retry Payment ({formatCurrency(totalPrice, currency)})</span>
                      </Link>
                      <Link href={retryUrl} className="bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg uppercase px-5 py-3.5 rounded transition-colors text-center" id="switch-tab-btn">
                        Use Another Method
                      </Link>
                    </div>
                  </div>
                  {/* Alternative Payment Selector & Seamless Form */}
                  <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-space-md">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Alternative Payment Methods
                      </h3>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Instant Clearance</span>
                    </div>
                    {/* Tabs / Option Switchers */}
                    <div className="grid grid-cols-3 gap-2 p-1 bg-surface-container-low rounded-lg mb-space-md" role="tablist">
                      <button className="py-2.5 px-3 rounded text-center font-label-sm text-label-sm uppercase tracking-wider bg-surface text-primary shadow-sm font-semibold transition-all" id="tab-card" type="button">
                        New Card
                      </button>
                      <button className="py-2.5 px-3 rounded text-center font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" id="tab-apple" type="button">
                        Apple Pay
                      </button>
                      <button className="py-2.5 px-3 rounded text-center font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" id="tab-concierge" type="button">
                        Wire &amp; Concierge
                      </button>
                    </div>
                    {/* Panel 1: Card Form */}
                    <div className="space-y-4" id="panel-card">
                      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1">
                        <span className="uppercase tracking-wider">Accepted: Visa, Mastercard, American Express</span>
                        <div className="flex items-center gap-1 text-outline">
                          <span className="material-symbols-outlined text-[16px]">lock</span>
                          <span>TLS 1.3 256-Bit</span>
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase text-on-surface mb-1.5">Cardholder Full Name</label>
                        <input className="w-full px-3.5 py-2.5 text-body-md bg-surface text-on-surface rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="As it appears on card" type="text" defaultValue="Lady Alexandra Sterling" />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase text-on-surface mb-1.5">Card Number</label>
                        <div className="relative">
                          <input className="w-full px-3.5 py-2.5 pr-10 text-body-md font-mono bg-surface text-on-surface rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="•••• •••• •••• ••••" type="text" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">credit_card</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase text-on-surface mb-1.5">Expiration Date</label>
                          <input className="w-full px-3.5 py-2.5 text-body-md font-mono bg-surface text-on-surface rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="MM / YY" type="text" />
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase text-on-surface mb-1.5 flex items-center justify-between">
                            <span>Security Code</span>
                            <span className="text-[10px] text-outline normal-case font-normal">3 or 4 digits</span>
                          </label>
                          <div className="relative">
                            <input className="w-full px-3.5 py-2.5 pr-9 text-body-md font-mono bg-surface text-on-surface rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all" maxLength={4} placeholder="CVC" type="password" />
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">help</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Link href={retryUrl} className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase py-3.5 rounded transition-all shadow flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[19px]">lock</span>
                          <span>Authorize &amp; Guarantee Reservation ({formatCurrency(totalPrice, currency)})</span>
                        </Link>
                      </div>
                    </div>
                    {/* Panel 2: Apple Pay (hidden default) */}
                    <div className="hidden space-y-4 py-2" id="panel-apple">
                      <div className="bg-surface p-space-md rounded-lg text-center">
                        <div className="w-12 h-12 bg-inverse-surface text-inverse-on-surface rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="material-symbols-outlined text-[24px]">contactless</span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">One-Touch Device Express</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto mb-space-md">
                          Authorize payment using Face ID or Touch ID through Apple Pay. Direct tokenized authorization with your bank.
                        </p>
                        <button className="bg-inverse-surface hover:bg-on-surface text-inverse-on-surface font-label-lg text-label-lg uppercase px-8 py-3.5 rounded inline-flex items-center gap-2 shadow-sm transition-colors" type="button">
                          <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                          <span>Pay with Apple Pay</span>
                        </button>
                      </div>
                    </div>
                    {/* Panel 3: Wire & Concierge Guarantee (hidden default) */}
                    <div className="hidden space-y-4 py-1" id="panel-concierge">
                      <div className="bg-surface-container-low p-space-md rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-secondary text-[26px]">account_balance</span>
                          <div>
                            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Wire Transfer &amp; Telephone Hold</h4>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
                              We gladly accommodate SEPA, SWIFT, and private bank transfers for high-value suites. Our concierge desk can extend your reservation hold for 48 hours while your bank processes the transfer.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <a className="bg-surface px-4 py-2 rounded shadow-sm text-on-surface font-label-md text-label-md uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-surface-container transition-colors" href="tel:+39089875110">
                                <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                                <span>Call +39 089 875 110</span>
                              </a>
                              <a className="bg-surface px-4 py-2 rounded shadow-sm text-on-surface font-label-md text-label-md uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-surface-container transition-colors" href="https://wa.me/393409182741" rel="noopener" target="_blank">
                                <span className="material-symbols-outlined text-[16px] text-secondary">chat</span>
                                <span>WhatsApp Majordomo</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Footer actions / Release Hold */}
                    <div className="pt-space-md mt-space-md border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
                      <button className="font-label-sm text-label-sm uppercase tracking-wider text-outline hover:text-error transition-colors flex items-center gap-1" type="button">
                        <span className="material-symbols-outlined text-[16px]">close</span>
                        <span>Release Suite Hold &amp; Cancel</span>
                      </button>
                      <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>Villa Aurelia PCI-DSS Tier 1 Certified</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Booking Summary Recap (5 Cols) */}
                <div className="lg:col-span-5 space-y-space-md">
                  {/* Suite Reservation Card */}
                  <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                    {/* Thumbnail Image */}
                    <div className="relative w-full h-52 overflow-hidden bg-surface-container">
                      <img alt={booking.roomType.name} className="w-full h-full object-cover" src={booking.roomType.photos[0] ?? "/images/villa-aurelia-emblem.png"} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-on-primary">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">Villa Aurelia Sanctuary</span>
                          <p className="font-headline-sm text-headline-sm text-on-primary font-serif leading-tight">{booking.roomType.name}</p>
                        </div>
                        <span className="px-2 py-1 bg-surface/90 text-on-surface font-label-sm text-label-sm uppercase rounded backdrop-blur-sm">
                          {booking.roomType.roomSize ? `${booking.roomType.roomSize} m²` : booking.roomType.bedType}
                        </span>
                      </div>
                    </div>
                    {/* Summary Details */}
                    <div className="p-space-md space-y-space-sm">
                      <div className="flex items-start justify-between py-2 border-b border-outline-variant/20">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[19px] text-primary">calendar_today</span>
                          <div>
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Stay Period</span>
                            <span className="font-body-md text-body-md text-on-surface font-medium">{booking.checkIn.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })} – {booking.checkOut.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm px-2 py-1 bg-surface-container-low rounded text-on-surface">{nights} Nights</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-outline-variant/20">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[19px] text-primary">group</span>
                          <div>
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Guests</span>
                            <span className="font-body-md text-body-md text-on-surface font-medium">{booking.guestCount} Guest{booking.guestCount !== 1 && "s"} ({booking.roomType.bedType})</span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline-variant text-right">Ocean Terrace Included</span>
                      </div>
                      {/* Detailed Price Breakdown */}
                      <div className="pt-2 space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                        <div className="flex items-center justify-between">
                          <span>{booking.roomType.name} Tariff ({nights} night{nights !== 1 && "s"})</span>
                          <span className="font-medium text-on-surface">{formatCurrency(totalPrice, currency)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Positano Municipal Tourist Surcharge</span>
                          <span className="font-medium text-on-surface">Included</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Italian VAT / IVA (10%)</span>
                          <span className="font-medium text-secondary">Included</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Valet, Welcome Champagne &amp; Daily Breakfast</span>
                          <span className="font-medium text-secondary">Complimentary</span>
                        </div>
                        <div className="pt-3 border-t border-outline-variant/30 flex items-baseline justify-between">
                          <div>
                            <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block">Total Due</span>
                            <span className="font-label-sm text-label-sm text-outline">All relevant taxes incorporated</span>
                          </div>
                          <span className="font-headline-md text-headline-md text-primary font-bold">{formatCurrency(totalPrice, currency)}</span>
                        </div>
                      </div>
                      {/* Reassuring Terms Tag */}
                      <div className="bg-surface-container-low p-3 rounded-lg flex items-start gap-2.5 text-on-surface-variant font-body-sm text-body-sm mt-3">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">history_toggle_off</span>
                        <p>
                          <strong className="text-on-surface">Bespoke Flexibility:</strong> Free cancellation permitted until {new Date(booking.checkIn.getTime() - 14 * 86400000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} (14 days prior to check-in).
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Immediate Personal Concierge Box */}
                  <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[22px]">room_service</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Immediate Assistance</span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Marco Santoro • Head Majordomo</h4>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      “We understand financial firewalls frequently flag coastal high-tier transactions. I am standing by at the master desk to finalize your stay or take a private guarantee by phone.”
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-label-sm text-label-sm uppercase">
                      <a className="flex items-center justify-center gap-1.5 py-2.5 bg-surface hover:bg-surface-container text-on-surface rounded shadow-sm transition-colors" href="tel:+39089875110">
                        <span className="material-symbols-outlined text-[17px] text-primary">call</span>
                        <span>+39 089 875 110</span>
                      </a>
                      <a className="flex items-center justify-center gap-1.5 py-2.5 bg-surface hover:bg-surface-container text-on-surface rounded shadow-sm transition-colors" href="https://wa.me/393409182741" rel="noopener" target="_blank">
                        <span className="material-symbols-outlined text-[17px] text-secondary">chat</span>
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>
                  {/* Hospitality Accreditations */}
                  <div className="flex items-center justify-between px-3 py-2 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                    <span>The Leading Hotels of the World</span>
                    <span>•</span>
                    <span>Virtuoso Preferred</span>
                    <span>•</span>
                    <span>Amalfi Relais</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Logic for Countdown & Tab Switching */}
        </div></main>

    </div>
  )
}
