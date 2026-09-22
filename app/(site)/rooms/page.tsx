import Link from "next/link"
import { Suspense } from "react"

import { RoomSearchBar } from "@/components/room-search-bar"
import { searchRoomAvailability } from "@/lib/search"

export const metadata = {
  title: "Villa Aurelia | Room Availability",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

type PageProps = {
  searchParams: Promise<{
    checkIn?: string
    checkOut?: string
    guests?: string
  }>
}

export default async function RoomListingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { hotel, results, checkIn, checkOut, guests } =
    await searchRoomAvailability(params)

  const checkInStr = checkIn.toISOString().split("T")[0]
  const checkOutStr = checkOut.toISOString().split("T")[0]

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Top Context Editorial Header & Atmosphere Strip */}
          <section className="relative w-full bg-surface-container-low px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="max-w-2xl">
                <div className="flex items-center gap-space-xs mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                  <span className="font-label-sm text-label-sm uppercase text-outline tracking-[0.2em]">Sanctuary Portfolio • Autumn 2025</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
                  Select Your Private Sanctuary
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Each residence at Villa Aurelia is sculpted from local calcarenite stone, draped in unbleached Belgian linen, and angled to frame the golden Amalfi dawn.
                </p>
              </div>
              {/* Live Estate Status Telemetry */}
              <div className="flex items-center gap-space-md bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-outline">Estate Climate</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">22°C <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">· Mild Sun</span></span>
                </div>
                <div className="w-px h-8 bg-surface-container-highest" />
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-outline">Total Sanctuaries</span>
                  <span className="font-headline-sm text-headline-sm text-primary">14 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">only</span></span>
                </div>
              </div>
            </div>
          </section>
          {/* Sticky Search & Date Selector Bar */}
          <section className="sticky top-20 z-40 w-full px-margin md:px-margin-tablet lg:px-margin-desktop -mt-4 mb-space-lg">
            <div className="max-w-[1440px] mx-auto">
              <div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-sm md:p-space-md">
                <Suspense
                  fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center animate-pulse">
                      <div className="lg:col-span-3 h-20 rounded bg-surface-container-low" />
                      <div className="lg:col-span-3 h-20 rounded bg-surface-container-low" />
                      <div className="lg:col-span-3 h-20 rounded bg-surface-container-low" />
                      <div className="lg:col-span-3 h-20 rounded bg-primary" />
                    </div>
                  }
                >
                  <RoomSearchBar
                    checkIn={checkInStr}
                    checkOut={checkOutStr}
                    guests={guests}
                    currency={hotel?.currency ?? "EUR"}
                    roomCount={results.length}
                  />
                </Suspense>
                {/* Direct Perks Sub-Bar */}
                <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-space-md text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
                    <span className="font-label-sm text-label-sm text-on-surface">Best Direct Rate Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-secondary">event_available</span>
                    <span className="font-label-sm text-label-sm">Free Cancellation Up To 14 Days Prior</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-secondary">hot_tub</span>
                    <span className="font-label-sm text-label-sm">Complimentary Roman Thermal Spa Access Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-secondary">local_bar</span>
                    <span className="font-label-sm text-label-sm">Welcome Riserva Chianti Classico</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Filter & Sorting Controls Header */}
          <section className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop mb-space-md">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-space-md">
              {/* Primary Category Tabs */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                <div className="flex items-center gap-2 overflow-x-auto pb-1" id="categoryTabs">
                  <button className="px-4 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-all bg-primary text-on-primary shrink-0 shadow-sm" data-category="all">
                    All Sanctuaries (7)
                  </button>
                  <button className="px-4 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant shrink-0" data-category="classic">
                    Standard &amp; Classic (1)
                  </button>
                  <button className="px-4 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant shrink-0" data-category="deluxe">
                    Deluxe Terraces (2)
                  </button>
                  <button className="px-4 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant shrink-0" data-category="suites">
                    Signature Suites (3)
                  </button>
                  <button className="px-4 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-all bg-surface-container-low hover:bg-surface-container text-on-surface-variant shrink-0" data-category="family">
                    Private Villas &amp; Family (1)
                  </button>
                </div>
                {/* Sorting Selector */}
                <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
                  <span className="font-label-sm text-label-sm uppercase text-outline">Sort by:</span>
                  <div className="relative inline-block">
                    <select className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase py-2 pl-3.5 pr-8 rounded cursor-pointer focus:outline-none">
                      <option>Curated Recommendation</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Living Area: Largest First</option>
                    </select>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">expand_more</span>
                  </div>
                </div>
              </div>
              {/* Quick Characteristic Chips & Rate Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-surface-container-low/50 p-space-sm rounded-lg">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant mr-1">Filter Amenities:</span>
                  <button className="px-3 py-1 bg-surface-container-lowest hover:bg-surface text-on-surface rounded font-label-sm text-label-sm uppercase transition-colors shadow-xs flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">pool</span> Private Plunge
                  </button>
                  <button className="px-3 py-1 bg-surface-container-lowest hover:bg-surface text-on-surface rounded font-label-sm text-label-sm uppercase transition-colors shadow-xs flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">landscape</span> Valley &amp; Sea View
                  </button>
                  <button className="px-3 py-1 bg-surface-container-lowest hover:bg-surface text-on-surface rounded font-label-sm text-label-sm uppercase transition-colors shadow-xs flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">balcony</span> Private Loggia
                  </button>
                  <button className="px-3 py-1 bg-surface-container-lowest hover:bg-surface text-on-surface rounded font-label-sm text-label-sm uppercase transition-colors shadow-xs flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">bed</span> King Bed
                  </button>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="font-label-sm text-label-sm">Prices reflect 6 nights (18–24 Oct) · Artisanal Breakfast &amp; VAT Included</span>
                </div>
              </div>
            </div>
          </section>
          {/* Editorial Suite Listings Grid */}
          <section className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop mb-space-xl">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg">
              {/* CARD 1: Deluxe Olive Grove Chamber */}
              <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
                {/* Gallery / Image Area */}
                <div className="lg:col-span-5 relative overflow-hidden min-h-[340px] lg:min-h-full">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Warm sunlit boutique Mediterranean bedroom with arched limestone doorway overlooking ancient silver olive groves. Soft unbleached linen bedspread, handcrafted terracotta side tables, and gentle morning sunlight spilling across smooth stone floors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1HUE7lvBzsgxjWDdn3XgFnXHraF9IpOS_9VtIixKPNXUSwLNIA_8_R5MSiutxi61gOBwmwTAd23w-OZFkv8xjL4mOlBQruT-WlC8rStg5ftzo1-FsZH0n46mTHVWwOXaV2U263uwzd8BWouYXM7cosnX-ajM0QZpCcUJvrh-gQQ0h6hogEd_qZ4y9uDuT-YVvlbpBD9TJjs26ObfhEVMuXFczx425nhqVqaCl2zo" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">Garden Level</span>
                    <span className="bg-secondary/90 backdrop-blur-md text-on-secondary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">Popular with Couples</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                    <span className="font-label-sm text-label-sm tracking-wider uppercase">Chamber 04 · East Wing</span>
                    <div className="flex items-center gap-1 bg-on-surface/40 backdrop-blur-sm px-2 py-1 rounded text-surface">
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                      <span className="font-label-sm text-label-sm">1 / 8</span>
                    </div>
                  </div>
                </div>
                {/* Specifications & Content */}
                <div className="lg:col-span-7 p-space-md lg:p-space-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-[0.18em] text-primary font-semibold">Deluxe Category</span>
                        <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Deluxe Olive Grove Chamber</h2>
                      </div>
                      <button aria-label="Save to wishlist" className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </button>
                    </div>
                    {/* Architectural Meta Strings */}
                    <div className="mt-space-sm flex flex-wrap items-center gap-y-1 gap-x-space-sm font-label-sm text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">bed</span> King Bed</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">person</span> Max 2 Guests</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">square_foot</span> 55 m² (590 sq ft)</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">yard</span> Private Garden Loggia</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm line-clamp-2">
                      Immerse yourself in quiet stillness flanked by fragrant myrtle bushes and century-old olive trees. Hand-cut stone flooring extends outward to a shaded loggia with artisanal woven sunloungers.
                    </p>
                    {/* Amenities Badges */}
                    <div className="mt-space-md grid grid-cols-2 sm:grid-cols-4 gap-2 pt-space-sm border-t border-surface-container-highest/60">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">bathtub</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Rainfall Shower</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">spa</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Thermal Spa Pass</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">wine_bar</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Sommelier Minibar</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">wifi</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Optic Wi-Fi</span>
                      </div>
                    </div>
                  </div>
                  {/* Price & Selection Footing */}
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-highest/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline-md text-headline-md text-primary font-bold">€680</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">
                        €4,080 total for 6 nights <span className="text-outline font-normal">· Taxes included</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <button className="font-label-md text-label-md uppercase text-primary hover:text-primary-container transition-colors underline underline-offset-4 py-2" type="button">
                        Floorplan &amp; 3D
                      </button>
                      <Link href={`/rooms/cortile-terrace-room?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="flex-1 sm:flex-initial bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase px-6 py-3 rounded transition-colors shadow-sm text-center">
                        Select Chamber
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
              {/* CARD 2: The Travertine Terrace Deluxe */}
              <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
                {/* Gallery / Image Area */}
                <div className="lg:col-span-5 relative overflow-hidden min-h-[340px] lg:min-h-full">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="A sun-drenched private Italian travertine stone terrace with plush linen daybeds overlooking dramatic limestone cliffs and the turquoise Mediterranean sea. Handcrafted clay pots with vibrant bougainvillea frame the wide cinematic vista under clear coastal light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW_dGgt7RGmZS9NZjOJ2L9sBz-HtoKCnwT3IAY44QQCUCLQn4syjMkyzOo5ehrnXsy2buOE5YC_tMDpxS6ehqRTp8UFv2Q6DI8MKz6R7nTzAjyUZ06ABkfW--H8BzKthFCqUKwShIzqq8bo1v3xalvhGA8WJ9d-Jh_XW8nEYntZ4nig7ORJwcvv0yt2_PheujaT_CrYf5Pjxo4_nfuhsQMAT7I-om8rdFJmgysrRk" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">Panoramic View</span>
                    <span className="bg-secondary/90 backdrop-blur-md text-on-secondary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">Private Loggia</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                    <span className="font-label-sm text-label-sm tracking-wider uppercase">Chamber 08 · Cliffside Loggia</span>
                    <div className="flex items-center gap-1 bg-on-surface/40 backdrop-blur-sm px-2 py-1 rounded text-surface">
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                      <span className="font-label-sm text-label-sm">1 / 12</span>
                    </div>
                  </div>
                </div>
                {/* Specifications & Content */}
                <div className="lg:col-span-7 p-space-md lg:p-space-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-[0.18em] text-primary font-semibold">Deluxe Category</span>
                        <h2 className="font-headline-md text-headline-md text-on-surface mt-1">The Travertine Terrace Deluxe</h2>
                      </div>
                      <button aria-label="Save to wishlist" className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </button>
                    </div>
                    {/* Architectural Meta Strings */}
                    <div className="mt-space-sm flex flex-wrap items-center gap-y-1 gap-x-space-sm font-label-sm text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">bed</span> King or Twin</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">person</span> Max 2 Guests</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">square_foot</span> 75 m² (805 sq ft)</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">hot_tub</span> Sunken Marble Tub</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm line-clamp-2">
                      Crafted from monolithic Tuscan travertine, featuring double arched portals opening to an elevated 30 m² sun terrace. Features an artisan carved marble soaking bath illuminated by sunset shafts.
                    </p>
                    {/* Amenities Badges */}
                    <div className="mt-space-md grid grid-cols-2 sm:grid-cols-4 gap-2 pt-space-sm border-t border-surface-container-highest/60">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">balcony</span>
                        <span className="font-body-sm text-body-sm text-on-surface">30m² Sun Loggia</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">shower</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Hydrotherapy</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">concierge</span>
                        <span className="font-body-sm text-body-sm text-on-surface">24h Concierge</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">wine_bar</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Chianti Riserva</span>
                      </div>
                    </div>
                  </div>
                  {/* Price & Selection Footing */}
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-highest/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline-md text-headline-md text-primary font-bold">€920</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">
                        €5,520 total for 6 nights <span className="text-outline font-normal">· Gourmet breakfast included</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <button className="font-label-md text-label-md uppercase text-primary hover:text-primary-container transition-colors underline underline-offset-4 py-2" type="button">
                        Floorplan &amp; 3D
                      </button>
                      <Link href={`/rooms/coastal-suite?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="flex-1 sm:flex-initial bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase px-6 py-3 rounded transition-colors shadow-sm text-center">
                        Select Chamber
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
              {/* CARD 3: Belvedere Grand Master Suite (FLAGSHIP) */}
              <article className="bg-surface-container-lowest rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group ring-1 ring-primary/20">
                {/* Gallery / Image Area */}
                <div className="lg:col-span-5 relative overflow-hidden min-h-[380px] lg:min-h-full">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Grand luxury master suite in an Italian coastal estate with ancient vaulted barrel ceilings, freestanding hand-hammered copper bathtub positioned before a floor-to-ceiling arched window looking out to the Mediterranean horizon. Warm architectural lighting, walnut herringbone flooring, and an open hearth fireplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpYadlCCA5C64eL6mlgHaRMNmsEaQAhG9nXkbokLXSze8-kL9_TLqF6vb1OlDWZJ-Eht2j-IySM34oIofOOI7ygc3sQRgYgVpdWOoYUuv3WY0tVFuVEig2G4YsS_I3BuPq9-8C0RDAVrWP8uovETk8wCr6OcWQ4IUfQG8m0gg6SKB64dWwIZBmwMrTARUpIHCpynYUH6JkcpOb3Um5E3iwLP1jHcbQzrxcAO-E6Rs" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-primary text-on-primary font-label-sm text-label-sm uppercase px-3 py-1 rounded shadow-sm">Estate Crown Jewel</span>
                    <span className="bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">Private Plunge</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                    <span className="font-label-sm text-label-sm tracking-wider uppercase">Suite 12 · Belvedere Penthouse</span>
                    <div className="flex items-center gap-1 bg-on-surface/40 backdrop-blur-sm px-2 py-1 rounded text-surface">
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                      <span className="font-label-sm text-label-sm">1 / 18</span>
                    </div>
                  </div>
                </div>
                {/* Specifications & Content */}
                <div className="lg:col-span-7 p-space-md lg:p-space-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm uppercase tracking-[0.18em] text-primary font-bold">Signature Suite</span>
                          <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">Dedicated Butler</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Belvedere Grand Master Suite</h2>
                      </div>
                      <button aria-label="Save to wishlist" className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </button>
                    </div>
                    {/* Architectural Meta Strings */}
                    <div className="mt-space-sm flex flex-wrap items-center gap-y-1 gap-x-space-sm font-label-sm text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">bed</span> Super King Bed</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">person</span> Max 3 Guests</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">square_foot</span> 135 m² (1,450 sq ft)</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">deck</span> Dual Terraces + Plunge Pool</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
                      Occupying the entire apex of the historic villa. Enjoy 360-degree panoramic horizons over Positano bay, an outdoor heated Roman plunge pool carved into cliff rock, private wood-burning fireplace, and chauffeured Mercedes S-Class transfers.
                    </p>
                    {/* Curated Perks Grid */}
                    <div className="mt-space-md grid grid-cols-2 sm:grid-cols-4 gap-2 pt-space-sm border-t border-surface-container-highest/60">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-primary">pool</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Heated Plunge</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-primary">room_service</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Private Butler</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-primary">fireplace</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Stone Hearth</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-primary">airport_shuttle</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">VIP Transfer</span>
                      </div>
                    </div>
                  </div>
                  {/* Price & Selection Footing */}
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-highest/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline-md text-headline-md text-primary font-bold">€1,650</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">
                        €9,900 total for 6 nights <span className="text-outline font-normal">· In-suite breakfast &amp; full bar</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <button className="font-label-md text-label-md uppercase text-primary hover:text-primary-container transition-colors underline underline-offset-4 py-2" type="button">
                        Floorplan &amp; 3D
                      </button>
                      <Link href={`/rooms/family-garden-villa?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="flex-1 sm:flex-initial bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase px-8 py-3.5 rounded transition-colors shadow-md text-center">
                        Select Suite
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
              {/* CARD 4: Sanctuary Family Villa */}
              <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
                {/* Gallery / Image Area */}
                <div className="lg:col-span-5 relative overflow-hidden min-h-[340px] lg:min-h-full">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Two interconnected Mediterranean stone villa wings arranged around a private sunlit central courtyard with an outdoor dining pergola shaded by lemon trees, private infinity lap pool, and view of cypress hills under clear late afternoon sky." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWvT-pSb4T-mlYaJeseW3pYYCXw8u9hlxPzpIXSWOIhE0n9XpvfhTsuMRA9-7ZXMx4AYs_GE47A9aE-ut-Vqs8coqxL9NQrpwche9ERhM71YRcJCjIVR_PXrUtB06htVrkYMrdLxSwpONz-1HLayf2TGxJ7B3lJibyFUirWUq0gT-ozDAnnvr52Osb3EQDt8VZmpLqXplAVbii8ln2YmITtHCsIOo-6pGkoJqAVpg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">Exclusive Villa</span>
                    <span className="bg-secondary/90 backdrop-blur-md text-on-secondary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">Up to 5 Guests</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                    <span className="font-label-sm text-label-sm tracking-wider uppercase">Residence Villa · West Orchard</span>
                    <div className="flex items-center gap-1 bg-on-surface/40 backdrop-blur-sm px-2 py-1 rounded text-surface">
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                      <span className="font-label-sm text-label-sm">1 / 15</span>
                    </div>
                  </div>
                </div>
                {/* Specifications & Content */}
                <div className="lg:col-span-7 p-space-md lg:p-space-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-[0.18em] text-primary font-semibold">Private Villa Estate</span>
                        <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Sanctuary Family Villa</h2>
                      </div>
                      <button aria-label="Save to wishlist" className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </button>
                    </div>
                    {/* Architectural Meta Strings */}
                    <div className="mt-space-sm flex flex-wrap items-center gap-y-1 gap-x-space-sm font-label-sm text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">bed</span> 2 Kings + Daybed</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">family_restroom</span> Max 5 Guests</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">square_foot</span> 210 m² (2,260 sq ft)</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">pool</span> Private Lap Pool</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm line-clamp-2">
                      A secluded freestanding two-bedroom estate sanctuary with individual entrances, central courtyard pergola, artisanal kitchen, and private infinity dip pool surrounded by citrus and rosemary groves.
                    </p>
                    {/* Amenities Badges */}
                    <div className="mt-space-md grid grid-cols-2 sm:grid-cols-4 gap-2 pt-space-sm border-t border-surface-container-highest/60">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">outdoor_grill</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Private Chef Option</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">bathtub</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Dual Travertine Baths</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">local_laundry_service</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Valet Laundry</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-secondary">directions_car</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Covered Parking</span>
                      </div>
                    </div>
                  </div>
                  {/* Price & Selection Footing */}
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-highest/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline-md text-headline-md text-primary font-bold">€2,400</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">
                        €14,400 total for 6 nights <span className="text-outline font-normal">· Private chef breakfast</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <button className="font-label-md text-label-md uppercase text-primary hover:text-primary-container transition-colors underline underline-offset-4 py-2" type="button">
                        Floorplan &amp; 3D
                      </button>
                      <Link href={`/rooms/family-garden-villa?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="flex-1 sm:flex-initial bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase px-6 py-3 rounded transition-colors shadow-sm text-center">
                        Select Villa
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
          {/* Dignified "No Availability / Alternate Dates" Interactive Showcase State */}
          <section className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop mb-space-xl">
            <div className="max-w-[1440px] mx-auto">
              <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl relative overflow-hidden">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                  {/* Architectural Arch Icon Badge */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-space-sm text-primary">
                    <svg className="w-8 h-8 stroke-current fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M4 21V10a8 8 0 0 1 16 0v11" />
                      <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                      <circle cx={12} cy={7} r={1} />
                    </svg>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary font-semibold">Curated Availability Notice</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mt-2">
                    Looking for Alternative Dates or Categories?
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-xl">
                    Villa Aurelia intentionally maintains an intimate capacity of only 14 secluded residences. If your preferred category is unavailable on selected dates, our head concierge can coordinate adjacent chambers or unlock private waitlist holdings.
                  </p>
                  {/* Alternative Dates Preview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm w-full mt-space-md text-left">
                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between shadow-xs">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase text-outline">Alternative Autumn Window</span>
                        <p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">26 Oct – 31 Oct 2025</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Belvedere &amp; Terrace Suites Open</p>
                      </div>
                      <button className="font-label-sm text-label-sm uppercase text-primary font-semibold hover:underline" type="button">Check Window</button>
                    </div>
                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between shadow-xs">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase text-outline">Alternative Dual Chamber Arrangement</span>
                        <p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">2 Adjacent Deluxe Loggias</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Accommodates 4 guests privately</p>
                      </div>
                      <button className="font-label-sm text-label-sm uppercase text-primary font-semibold hover:underline" type="button">Review Option</button>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-space-sm mt-space-md">
                    <button className="bg-surface-container-lowest hover:bg-surface text-on-surface font-label-md text-label-md uppercase px-6 py-3 rounded transition-colors shadow-sm" type="button">
                      Browse Full Seasonal Calendar
                    </button>
                    <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase px-6 py-3 rounded transition-colors shadow-sm flex items-center gap-2" type="button">
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                      <span>Inquire with Head Concierge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Reassurance, Estate Charter & Direct Booking Perks Strip */}
          <section className="w-full bg-surface-container-low px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg mb-space-xl">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                <div className="flex items-start gap-space-sm">
                  <div className="w-12 h-12 rounded bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">No Hidden Resort Levies</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      All displayed rates encompass full artisanal estate breakfast, high-speed fiber connectivity, thermal bath circuit admissions, and regional sales tax.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm">
                  <div className="w-12 h-12 rounded bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">spa</span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">Tailored Wellness Concierge</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Every stay grants complimentary access to our caldarium and frigidarium marble pools, heated by regenerative geothermal energy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm">
                  <div className="w-12 h-12 rounded bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">published_with_changes</span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">Flexible Autumn Cancellation</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Direct bookings enjoy 100% deposit reimbursement up to 14 days prior to arrival. Effortless date rescheduling valid across 12 months.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Client-side Category Filter Script */}
        </div></main>

    </div>
  )
}
