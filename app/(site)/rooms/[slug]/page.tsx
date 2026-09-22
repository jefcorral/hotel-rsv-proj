import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BookingSearch } from "@/components/booking-search"
import { getAvailabilityCalendar, getRoomTypeBySlug, validateSearchParams } from "@/lib/search"
import { formatCurrency } from "@/lib/utils"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    checkIn?: string
    checkOut?: string
    guests?: string
  }>
}

export default async function RoomDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const roomType = await getRoomTypeBySlug(slug)
  if (!roomType) notFound()

  const query = await searchParams
  const { checkIn, checkOut, guests } = validateSearchParams(query)

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const calendarStart = new Date(today)
  const calendar = await getAvailabilityCalendar(roomType.id, calendarStart, 60)

  const checkInStr = checkIn.toISOString().split("T")[0]
  const checkOutStr = checkOut.toISOString().split("T")[0]

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20">
      <section className="mx-auto max-w-[1440px] px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="mb-6">
          <Link
            href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`}
            className="font-label-md text-label-md uppercase text-primary hover:text-on-surface inline-flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to all residences
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-2 mb-space-xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[16/12]">
            <Image
              src={roomType.photos[0] ?? "/images/villa-aurelia-emblem.png"}
              alt={roomType.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-2">
              {roomType.bedType}
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-md">
              {roomType.name}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
              {roomType.description}
            </p>

            <div className="mb-space-md grid grid-cols-2 gap-space-md">
              <div className="rounded bg-surface-container-low p-space-sm">
                <span className="font-headline-md text-headline-md text-primary block">
                  {roomType.maxGuests}
                </span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Max Guests
                </span>
              </div>
              <div className="rounded bg-surface-container-low p-space-sm">
                <span className="font-headline-md text-headline-md text-primary block">
                  {roomType.roomSize ? `${roomType.roomSize} m²` : "—"}
                </span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Living Space
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-space-md">
              {roomType.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded bg-surface-container px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="rounded bg-surface-container-low p-space-md">
              <span className="font-label-sm text-label-sm uppercase text-outline block">
                Starting from
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                {formatCurrency(roomType.basePrice, roomType.hotel.currency)} / night
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-3 mb-space-xl">
          <div className="lg:col-span-2">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
              Availability Calendar
            </h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="font-label-sm text-label-sm uppercase text-outline py-2"
                >
                  {day}
                </div>
              ))}
              {calendar.map((day) => {
                const date = new Date(day.date + "T00:00:00.000Z")
                const isSelected = day.date >= checkInStr && day.date < checkOutStr
                const isAvailable = !day.isBlocked && day.availableCount > 0
                const price = day.price > 0 ? day.price : roomType.basePrice

                return (
                  <div
                    key={day.date}
                    className={`
                      rounded-lg p-2 transition-colors
                      ${isSelected ? "bg-primary text-on-primary" : "bg-surface-container-lowest"}
                      ${!isSelected && isAvailable ? "hover:bg-surface-container" : ""}
                      ${!isAvailable && !isSelected ? "opacity-50" : ""}
                    `}
                  >
                    <div className="font-label-md text-label-md">{date.getUTCDate()}</div>
                    <div className="font-label-sm text-label-sm">
                      {isAvailable ? formatCurrency(price, roomType.hotel.currency) : "—"}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-xl bg-surface-container-lowest p-space-lg shadow-[0_20px_48px_-12px_rgba(43,30,26,0.14)]">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">
                Check Availability
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <BookingSearch />
              </div>
              <Link
                href={`/book?roomType=${roomType.slug}&checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`}
                className="mt-4 block w-full rounded bg-primary px-4 py-3 text-center font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-colors hover:bg-primary-container"
              >
                Reserve This Residence
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
