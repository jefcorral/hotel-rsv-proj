import Link from "next/link"
import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Villa Aurelia | Booking Confirmation",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

type PageProps = {
  searchParams: Promise<{ ref?: string }>
}

export default async function BookingConfirmationPage({ searchParams }: PageProps) {
  const { ref } = await searchParams
  if (!ref) notFound()

  const booking = await prisma.booking.findUnique({
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
          {/* CELEBRATION & RESERVATION CONFIRMATION HEADER */}
          <section className="relative overflow-hidden bg-surface-container-low py-space-xl">
            {/* Subtle architectural sun wash glow */}
            <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop relative z-10">
              {/* Seal & Status Header */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                {/* Bespoke Crafted Seal Badge */}
                <div className="relative mb-6 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[34px]" style={{fontVariationSettings: '"FILL" 1'}}>hotel_class</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold mb-2">Sanctuary Reservation Confirmed</span>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Your Reservation is Confirmed</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  We are enchanted to welcome you to Villa Aurelia, {booking.guestName}. A digital confirmation voucher and bespoke arrival dossier have been dispatched to <span className="text-on-surface font-medium">{booking.guestEmail}</span>.
                </p>
                {/* Reference Summary Bar */}
                <div className="mt-8 w-full bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px]">bookmark</span>
                    <div className="text-left">
                      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">Booking Reference</span>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-on-surface tracking-wide" id="refCode">{booking.id.slice(0, 10).toUpperCase()}</span>
                        <button className="text-outline hover:text-primary transition-colors p-1" title="Copy Code">
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-surface-container-high hidden md:block" />
                  <div className="text-left">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">Reservation Status</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="font-label-sm text-label-sm font-semibold uppercase">Confirmed &amp; Guaranteed</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-surface-container-high hidden md:block" />
                  <div className="text-left">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">Booked On</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">{booking.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <div className="h-8 w-px bg-surface-container-high hidden md:block" />
                  <div className="text-left">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">Guest Access PIN</span>
                    <span className="font-label-lg text-label-lg tracking-widest text-on-surface font-bold bg-surface-container px-2.5 py-1 rounded">4920</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* QUICK ACTION BUTTONS BAR */}
          <section className="bg-surface py-4 shadow-sm relative z-20">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Download PDF */}
                  <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase px-5 py-2.5 rounded transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Download PDF Voucher</span>
                  </button>
                  {/* Add to Calendar */}
                  <div className="relative group">
                    <button className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg uppercase px-4 py-2.5 rounded transition-colors">
                      <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                      <span>Add to Calendar</span>
                      <span className="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                    <div className="absolute left-0 mt-1 w-48 bg-surface-container-lowest rounded-md shadow-lg py-2 hidden group-hover:block group-focus-within:block z-30">
                      <a className="block px-4 py-2 text-body-sm font-body-sm text-on-surface hover:bg-surface-container-low transition-colors" href="#">Apple Calendar (.ics)</a>
                      <a className="block px-4 py-2 text-body-sm font-body-sm text-on-surface hover:bg-surface-container-low transition-colors" href="#">Google Calendar</a>
                      <a className="block px-4 py-2 text-body-sm font-body-sm text-on-surface hover:bg-surface-container-low transition-colors" href="#">Microsoft Outlook</a>
                    </div>
                  </div>
                  {/* Manage Booking */}
                  <button className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg uppercase px-4 py-2.5 rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                    <span>Manage Reservation</span>
                  </button>
                </div>
                <div className="flex items-center gap-2.5">
                  {/* Direct Concierge Chat / Call */}
                  <a className="inline-flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase px-3.5 py-2.5 rounded transition-colors shadow-sm" href="tel:+39089875110">
                    <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
                    <span>+39 089 875 110</span>
                  </a>
                  <a className="inline-flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase px-3 py-2.5 rounded transition-colors shadow-sm" href="https://wa.me/39089875110" target="_blank">
                    <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                    <span>WhatsApp Concierge</span>
                  </a>
                  <button className="p-2.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface rounded transition-colors shadow-sm" title="Print Folio">
                    <span className="material-symbols-outlined text-[20px]">print</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* MAIN RESERVATION FOLIO (EDITORIAL 2-COLUMN DOSSIER) */}
          <section className="py-space-xl bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
                {/* LEFT COLUMN: SANCTUARY & PARTY DOSSIER (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-space-lg">
                  {/* Master Suite Card */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Reserved Accommodation</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary px-2 py-0.5 rounded bg-secondary-fixed/50">Primary Master Suite</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-container">
                        <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={booking.roomType.name} src={booking.roomType.photos[0] ?? "/images/villa-aurelia-emblem.png"} />
                        <span className="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-1 rounded text-on-surface font-label-sm text-label-sm uppercase">{booking.roomType.bedType}</span>
                      </div>
                      <div className="md:col-span-7 flex flex-col">
                        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{booking.roomType.name}</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                          {booking.roomType.description}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 font-label-sm text-label-sm text-outline uppercase font-semibold">
                          <span className="flex items-center gap-1 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span> {booking.roomType.roomSize ? `${booking.roomType.roomSize} m²` : "Residence"}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-secondary">bed</span> {booking.roomType.bedType}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-secondary">group</span> Max {booking.roomType.maxGuests} Guests</span>
                        </div>
                      </div>
                    </div>
                    {/* Dates & Schedule Banner */}
                    <div className="mt-8 pt-6 bg-surface-container-low rounded-lg p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Check-in</span>
                        <span className="font-body-lg text-body-lg font-semibold text-on-surface block">{fmtDate(booking.checkIn)}</span>
                        <span className="font-label-sm text-label-sm text-primary font-medium">From 15:00 CEST</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Check-out</span>
                        <span className="font-body-lg text-body-lg font-semibold text-on-surface block">{fmtDate(booking.checkOut)}</span>
                        <span className="font-label-sm text-label-sm text-outline font-medium">Until 12:00 CEST</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Stay Length</span>
                        <span className="font-body-lg text-body-lg font-semibold text-on-surface block">{nights} Enchanted Night{nights !== 1 && "s"}</span>
                        <span className="font-label-sm text-label-sm text-secondary font-medium">Autumn Season Privilege</span>
                      </div>
                    </div>
                    {/* Guest Party Metadata */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[20px]">person</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm uppercase text-outline block">Registered Guest</span>
                          <span className="font-body-md text-body-md font-semibold text-on-surface">{booking.guestName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-label-sm text-label-sm uppercase text-outline block">Party Composition</span>
                        <span className="font-body-md text-body-md font-medium text-on-surface">{booking.guestCount} Guest{booking.guestCount !== 1 && "s"} • Leisure Sanctuary Retreat</span>
                      </div>
                    </div>
                  </div>
                  {/* Included Heritage Privileges */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-sm">
                    <h3 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">award_star</span>
                      Complimentary Master Suite Privileges
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low">
                        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">bakery_dining</span>
                        <div>
                          <span className="font-body-md text-body-md font-medium text-on-surface block">Artisanal Champagne Daily Breakfast</span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Served upon your private sea-cliff loggia or inside Ristorante Belvedere.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low">
                        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">directions_car</span>
                        <div>
                          <span className="font-body-md text-body-md font-medium text-on-surface block">Capodichino S-Class Transfer</span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Private airport reception and round-trip scenic limousine chauffeur.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low">
                        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">spa</span>
                        <div>
                          <span className="font-body-md text-body-md font-medium text-on-surface block">Subterranean Roman Spa Circuit</span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Unlimited Caldarium, Tepidarium, and thermal mineral pools access.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low">
                        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">wine_bar</span>
                        <div>
                          <span className="font-body-md text-body-md font-medium text-on-surface block">Welcome Cellar Riserva</span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Vintage Chianti Classico Gran Selezione upon arrival in-suite.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* RIGHT COLUMN: FINANCIAL FOLIO & CONCIERGE ASSIGNMENT (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-space-lg">
                  {/* Financial Settlement Voucher */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-label-lg text-label-lg uppercase tracking-widest text-primary">Financial Summary</h3>
                      <span className="font-label-sm text-label-sm uppercase bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-semibold">Guaranteed</span>
                    </div>
                    <div className="py-4 border-b border-surface-container-high">
                      <span className="font-label-sm text-label-sm uppercase text-outline block">Reservation Total</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-headline-lg text-headline-lg text-on-surface">{formatCurrency(Number(booking.totalPrice), currency)}</span>
                        <span className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">{currency}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        Balance settled at the Villa • All local VAT included
                      </p>
                    </div>
                    {/* Ledger Breakdown */}
                    <div className="py-4 space-y-3 font-body-sm text-body-sm">
                      <div className="flex justify-between items-center text-on-surface-variant">
                        <span>{booking.roomType.name} ({nights} night{nights !== 1 && "s"})</span>
                        <span className="text-on-surface font-medium">{formatCurrency(Number(booking.totalPrice), currency)}</span>
                      </div>
                      <div className="flex justify-between items-center text-on-surface-variant">
                        <span>Italian Hospitality VAT (10%)</span>
                        <span className="text-on-surface font-medium">Included</span>
                      </div>
                      <div className="flex justify-between items-center text-on-surface-variant">
                        <span>Coastal Municipal City Surcharge</span>
                        <span className="text-secondary font-medium">Waived</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-surface-container-high bg-surface-container-low -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 rounded-b-xl">
                      <div className="flex items-center justify-between mb-3 text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">credit_card</span>
                          <span className="font-body-sm text-body-sm font-medium">Card Guarantee Hold</span>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase text-outline">No charge today</span>
                      </div>
                      <a className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase rounded transition-colors shadow-sm" href="#">
                        <span className="material-symbols-outlined text-[18px] text-primary">receipt_long</span>
                        Download Official VAT Tax Invoice
                      </a>
                    </div>
                  </div>
                  {/* Dedicated Estate Majordomo / Butler Card */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline block mb-3">Your Personal Majordomo</span>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container shrink-0">
                        <img className="w-full h-full object-cover" alt="Portrait of Matteo Rossi, distinguished Italian lead butler of Villa Aurelia wearing immaculate bespoke Mediterranean tailored linen blazer, smiling welcomingly against natural Positano stone background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC80hXFpqvG4RJIAyi3fydj7N1STlkid_Iur42XXFri1EuSUO6k5qXROR9GUVy2gIkvfIx-VzDpo-ZTJ2juS8rs23zx5wPghXGwXULaQ7egGnus3gbg-2EtVfU_Icc9G-OFK7-2oMcj7o9o8WJAKoHr8pzIduymgo-RKwMSMrf-1uDcSogPVHJa5czhr_fR6FInB0yNIZ4EE_Qq6S0WJdwX6BbFNbNQeUDXbwdqAbzM42cZLqv4jjwP" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Matteo Rossi</h4>
                        <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold block mt-0.5">Lead Estate Butler &amp; Head Concierge</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Guild of Professional English Butlers Certified</span>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 italic leading-relaxed">
                      "It will be my distinct honor to oversee every detail of your residence at Villa Aurelia. Should you wish to curate your pillow textures or request preferred vintage wines prior to arrival, I remain at your immediate service."
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <a className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-surface-container-low hover:bg-surface-container text-on-surface rounded text-center transition-colors" href="tel:+39089875110">
                        <span className="material-symbols-outlined text-[16px] text-primary">phone</span>
                        <span className="font-label-sm text-label-sm uppercase font-semibold">Direct Call</span>
                      </a>
                      <a className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-surface-container-low hover:bg-surface-container text-on-surface rounded text-center transition-colors" href="mailto:matteo.rossi@villaaurelia.it">
                        <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                        <span className="font-label-sm text-label-sm uppercase font-semibold">Message Butler</span>
                      </a>
                    </div>
                  </div>
                  {/* Digital Key & QR Quick-Entry */}
                  <div className="bg-surface-container-low rounded-xl p-5 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold block">Express Check-in</span>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium">Digital Key Ready for Apple Wallet</p>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Tap device on suite door handle upon arrival.</span>
                    </div>
                    <div className="w-16 h-16 bg-surface-container-lowest p-1.5 rounded flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[36px] text-on-surface">qr_code_2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* PREPARE FOR YOUR STAY (EDITORIAL 4-CARD GUIDANCE) */}
          <section className="py-space-xl bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">Curated Pre-Arrival Dossier</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Preparing For Your Residency</h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  Everything designed for effortless repose before stepping onto our fragrant lemon-scented cliffs.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {/* Card 1: Arrival Logistics */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-md">
                  <div className="h-48 relative overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Chauffeur driven Mercedes S-Class limousine navigating the breathtaking scenic coastal roads of Amalfi Coast overlooking the dramatic blue sea and cliffs, cinematic warm golden sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCySOa798Q6U_1DJ_UhJs0jlxU1F89btQpnmbF7zxugPTSlKkxLuea7Ez979JfkNLrhAZGU7q-hiFciI9B0bb_ZpkkjuY8PCatwBxsYjVCQ_FyyNIpOgLSa5ZhrHFnP8BmOJUkyTnPqgVpwXOkqTUpRWZpMcssPUxMAF-W2426dAjprmf9dWEaLgiVYOgwr_GYRMMaj58qiMmtU-iZJgBiGPpCX34SiiI5typ2xSpXJNTj-8Oe5YZNZ" />
                    <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur px-2.5 py-1 rounded font-label-sm text-label-sm uppercase text-primary font-bold">Logistics</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Arrival &amp; Chauffeur</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">
                      Check-in begins at 15:00 CEST. Early arrivals enjoy luggage valet and welcome Franciacorta on the private loggia while flight timings are actively tracked.
                    </p>
                    <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Chauffeur Ready</span>
                      <span className="material-symbols-outlined text-[18px] text-primary">arrow_forward</span>
                    </div>
                  </div>
                </div>
                {/* Card 2: Estate Amenities */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-md">
                  <div className="h-48 relative overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Luxury subterranean Roman Bath Spa with serene warm illuminated natural water, hand-carved stone arches, soft candlelit atmosphere and calming minimalist aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe6J6BV7LoaxH1c085ISRQFN4hAQgTuUMAzK3IBbClrfOiI9uKDZbcjlhWWigxNI4Lynq1VTkL8N5Ig_ZuefCw2o0am-icFDCECfI-Jb3tlgEAG8I_bOR75TxcJunI6k58SQGr9tjiCL9PRySfApcIKzB0Ur-wTqftiQHPG0iaIjPMChpYyAXI8S0_1Xe8n6lqA2Wv2zWiA-iTaZNEr7KR_R51Mt4ZiAFQgPsHWMSEJSokIrKWm6FY" />
                    <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur px-2.5 py-1 rounded font-label-sm text-label-sm uppercase text-primary font-bold">Wellness</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Plunge &amp; Roman Spa</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">
                      Your plunge pool will be pre-calibrated to 34°C. Select your artisanal linen scents and preferred bedtime herbal tisanes via your personal butler profile.
                    </p>
                    <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Customize Scent &amp; Bedding</span>
                      <span className="material-symbols-outlined text-[18px] text-primary">arrow_forward</span>
                    </div>
                  </div>
                </div>
                {/* Card 3: Positano Navigation & Helipad */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-md">
                  <div className="h-48 relative overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Aerial view of Positano coastal cliff roads leading to a secluded private luxury estate with Mediterranean terracotta roofs, olive groves, and yacht moorings in crystal clear azure bay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3_LlnLb1I1Z6M92mrFTyol8JhdSXQZLGo2f4Tj5SNb4BC3PCrRgC7kcloVVEhkSaFlaC3dky-i0NFN0JWCcE8KPWrmfuSLLo2Jj9TgsYIY8g9UJ23_A1G_-vb4__4Mfw3fKjxMnoBxb-Uemx0X59SgXhYnlEFbKd2e9G3-1IpNbGYPcP6KqkmpSv5I7lpznJkOUNYWguQurYUeUoCJz5x5-WGTqZW750UIw-5ZF8gPOz597h-zc2M" />
                    <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur px-2.5 py-1 rounded font-label-sm text-label-sm uppercase text-primary font-bold">Navigation</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Navigation &amp; Helipad</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">
                      Perched at Via Panoramica 48. Private helipad coordinates (40°37'44"N 14°29'08"E) and private coastal yacht tender tenders on call around the clock.
                    </p>
                    <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Access Coordinates</span>
                      <span className="material-symbols-outlined text-[18px] text-primary">arrow_forward</span>
                    </div>
                  </div>
                </div>
                {/* Card 4: Culinary & Excursions */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-md">
                  <div className="h-48 relative overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Fine dining cliffside terrace table setting overlooking the sun setting behind the Mediterranean sea, handmade ceramic plates, delicate wine glasses, fresh Amalfi lemons, romantic candlelight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4C5xm3HW_OIGVZr-aFZJcKjMIw_NflbMMpjMDKGCAGfbRRI3i0dNv-hvzT7C22rozvFaE8RPpEic8fOmPvewDfw7NCxvkCG-J7lKIhBg-ldY-S1QncBgJ83Cp_DtqJ3tawIhD2_fCb1Zb56WZ7Iizky63hspr9V0HQtzys4kWdVYct-4uiRliXghxetyoJgCDuYV_L1ZsWIlUj0Tmn7W414OZJtzd66Qe_GY5_12Mcgo26aRDUGFY" />
                    <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur px-2.5 py-1 rounded font-label-sm text-label-sm uppercase text-primary font-bold">Gastronomy</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Dining &amp; Yachting</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">
                      Priority seating privileges at Michelin-starred Ristorante Belvedere and private wooden Riva boat sunset excursions around Li Galli archipelago.
                    </p>
                    <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                      <a className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" href="#">Reserve Tables</a>
                      <span className="material-symbols-outlined text-[18px] text-primary">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* SERENITY GUARANTEE & CANCELLATION PEACE OF MIND */}
          <section className="py-space-xl bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-2 text-secondary mb-3">
                      <span className="material-symbols-outlined text-[20px]">shield</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">Serenity &amp; Flexibility Assurance</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                      Peace of Mind Sanctuary Guarantee
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                      Your reservation features our Signature Flexible Privilege. You may modify dates or receive a full 100% refund up to 14 days prior to check-in (before <strong className="text-on-surface">Saturday, 04 October 2025, 23:59 CEST</strong>).
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-on-surface-variant font-body-sm text-body-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                        <span>Fully Bonded &amp; Insured Booking</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
                        <span>PCI-DSS Level 1 Secure Vault</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[18px]">support_agent</span>
                        <span>24/7 Dedicated Guest Desk</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                    <div className="p-5 rounded-xl bg-surface-container-low w-full text-left">
                      <span className="font-label-sm text-label-sm uppercase text-outline block mb-1">Emergency Concierge Hotline</span>
                      <a className="font-headline-sm text-headline-sm text-primary font-serif block hover:underline" href="tel:+39089875110">+39 089 875 110</a>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">Available 24/7 for urgent voyage logistics.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div></main>

    </div>
  )
}
