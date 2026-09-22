import Image from "next/image"
import Link from "next/link"

import { BookingSearch } from "@/components/booking-search"
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
  const search = await searchRoomAvailability(params)
  const hotel = search.hotel
  const results = search.results
  const checkIn = search.checkIn
  const checkOut = search.checkOut
  const guests = search.guests

  const checkInStr = checkIn.toISOString().split("T")[0]
  const checkOutStr = checkOut.toISOString().split("T")[0]

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20">
      <section className="mx-auto max-w-[1440px] px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="mb-10">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-2">
            Suites & Villas
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
            Find Your Sanctuary
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Select your dates and guests to discover available residences at
            Villa Aurelia.
          </p>
        </div>

        <div className="mb-12 rounded-xl bg-surface-container-lowest p-space-md lg:p-space-lg shadow-[0_20px_48px_-12px_rgba(43,30,26,0.14)]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BookingSearch />
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="font-body-md text-body-md text-on-surface-variant">
            <span className="text-on-surface font-semibold">
              {results.length} residence{results.length !== 1 && "s"}
            </span>{" "}
            available from{" "}
            <span className="text-on-surface font-semibold">
              {checkIn.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>{" "}
            to{" "}
            <span className="text-on-surface font-semibold">
              {checkOut.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>{" "}
            for{" "}
            <span className="text-on-surface font-semibold">
              {guests} guest{guests !== 1 && "s"}
            </span>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="rounded-xl bg-surface-container-low p-12 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4 block">
              event_busy
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              No availability for your selection
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
              Try adjusting your dates or reducing the number of guests to find
              available accommodations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            {results.map((room) => (
              <div
                key={room.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={room.photos[0] ?? "/images/villa-aurelia-emblem.png"}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-space-lg">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider">
                      {room.bedType}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      {room.roomSize ? `${room.roomSize} m²` : "—"}
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    {room.name}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded bg-surface-container px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-outline-variant pt-4">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-outline block">
                        {room.totalNights} night{room.totalNights !== 1 && "s"}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        {formatCurrency(room.totalPrice, hotel?.currency ?? "EUR")}
                      </span>
                    </div>
                    <Link
                      href={`/rooms/${room.slug}?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`}
                      className="rounded bg-primary px-space-md py-2.5 font-label-md text-label-md uppercase text-on-primary transition-colors hover:bg-primary-container"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
