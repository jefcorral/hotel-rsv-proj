import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

import { RoomSearchBar } from "@/components/room-search-bar"
import { searchRoomAvailability } from "@/lib/search"
import { formatCurrency } from "@/lib/utils"

type PageProps = {
  searchParams: Promise<{
    checkIn?: string
    checkOut?: string
    guests?: string
  }>
}

export default async function RoomsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { hotel, results, checkIn, checkOut, guests } =
    await searchRoomAvailability(params)

  const checkInStr = checkIn.toISOString().split("T")[0]
  const checkOutStr = checkOut.toISOString().split("T")[0]

  return (
    <main className="w-full bg-surface pt-20">
      {/* Top Context Editorial Header */}
      <section className="relative w-full bg-surface-container-low px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="max-w-2xl">
            <div className="flex items-center gap-space-xs mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span className="font-label-sm text-label-sm uppercase text-outline tracking-[0.2em]">
                Sanctuary Portfolio
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
              Select Your Private Sanctuary
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Each residence at Villa Aurelia is sculpted from local calcarenite
              stone, draped in unbleached Belgian linen, and angled to frame the
              golden Amalfi dawn.
            </p>
          </div>
          <div className="flex items-center gap-space-md bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase text-outline">
                Available Now
              </span>
              <span className="font-headline-sm text-headline-sm text-primary">
                {results.length}{" "}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                  residence{results.length !== 1 && "s"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Search Bar */}
      <section className="sticky top-20 z-40 w-full px-margin md:px-margin-tablet lg:px-margin-desktop -mt-4 mb-space-lg">
        <div className="max-w-[1440px] mx-auto">
          <Suspense
            fallback={
              <div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-sm md:p-space-md animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-3 h-20 rounded bg-surface-container-low" />
                  <div className="lg:col-span-3 h-20 rounded bg-surface-container-low" />
                  <div className="lg:col-span-3 h-20 rounded bg-surface-container-low" />
                  <div className="lg:col-span-3 h-20 rounded bg-[#8A3B24]" />
                </div>
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
        </div>
      </section>

      {/* Results */}
      <section className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop mb-space-xl">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg">
          {results.length === 0 ? (
            <div className="rounded-xl bg-surface-container-low p-12 text-center">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4 block">
                event_busy
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                No availability for your selection
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                Try adjusting your dates or reducing the number of guests to
                find available accommodations.
              </p>
            </div>
          ) : (
            results.map((room) => (
              <article
                key={room.id}
                className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group"
              >
                <div className="lg:col-span-5 relative overflow-hidden min-h-[340px] lg:min-h-full">
                  <Image
                    src={
                      room.photos[0] ?? "/images/villa-aurelia-emblem.png"
                    }
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      {room.bedType}
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-7 p-space-md lg:p-space-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-[0.18em] text-primary font-semibold">
                          Residence
                        </span>
                        <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                          {room.name}
                        </h2>
                      </div>
                    </div>
                    <div className="mt-space-sm flex flex-wrap items-center gap-y-1 gap-x-space-sm font-label-sm text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          bed
                        </span>{" "}
                        {room.bedType}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          person
                        </span>{" "}
                        Max {room.maxGuests} Guests
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          square_foot
                        </span>{" "}
                        {room.roomSize ? `${room.roomSize} m²` : "—"}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm line-clamp-2">
                      {room.description}
                    </p>
                    <div className="mt-space-md grid grid-cols-2 sm:grid-cols-4 gap-2 pt-space-sm border-t border-surface-container-highest/60">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 text-on-surface-variant"
                        >
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            check_circle
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-highest/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline-md text-headline-md text-primary font-bold">
                          {formatCurrency(
                            room.pricePerNight,
                            hotel?.currency ?? "EUR"
                          )}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          / night
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">
                        {formatCurrency(
                          room.totalPrice,
                          hotel?.currency ?? "EUR"
                        )}{" "}
                        total for {room.totalNights} night
                        {room.totalNights !== 1 && "s"}
                      </p>
                    </div>
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <Link
                        href={`/rooms/${room.slug}?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`}
                        className="flex-1 sm:flex-initial bg-[#6C2510] hover:bg-[#8A3B24] text-white font-label-lg text-label-lg uppercase px-6 py-3 rounded transition-colors shadow-sm text-center"
                      >
                        Select Residence
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
