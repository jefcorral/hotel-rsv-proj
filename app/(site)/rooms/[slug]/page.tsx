import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

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

  const nights = Math.max(
    1,
    Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    )
  )
  const nightlyPrice = roomType.basePrice
  const totalPrice = nightlyPrice * nights

  const images = roomType.photos.length
    ? roomType.photos.slice(0, 5)
    : ["/images/villa-aurelia-emblem.png"]

  return (
    <main className="w-full bg-surface pt-20">
      {/* Breadcrumb */}
      <section className="w-full bg-surface border-b border-outline-variant/30 py-space-xs">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-wrap items-center justify-between gap-y-2 text-on-surface-variant">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-outline"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link
              href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`}
              className="hover:text-primary transition-colors"
            >
              Suites &amp; Sanctuaries
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">{roomType.name}</span>
          </nav>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full pt-space-md pb-space-lg bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-xs rounded-xl overflow-hidden bg-surface-container-low p-1.5 shadow-[0_16px_36px_-8px_rgba(43,30,26,0.07)]">
            <div className="lg:col-span-7 relative group overflow-hidden rounded-lg min-h-[380px] lg:min-h-[560px]">
              <Image
                src={images[0]}
                alt={roomType.name}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-surface/90 text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded backdrop-blur-md">
                  Primary Chamber
                </span>
                <p className="font-headline-sm text-headline-sm mt-1 text-white/95">
                  {roomType.name}
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-space-xs">
              {images.slice(1, 5).map((src, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg h-[180px] lg:h-[275px]"
                >
                  <Image
                    src={src}
                    alt={`${roomType.name} view ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-space-lg bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            {/* Left Column */}
            <div className="lg:col-span-8 flex flex-col space-y-space-xl">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-space-xs">
                  <span className="bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 rounded">
                    {roomType.bedType}
                  </span>
                  <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 rounded">
                    {roomType.roomSize ? `${roomType.roomSize} m²` : "Residence"}
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1 mb-space-xs">
                  {roomType.name}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {roomType.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-md bg-surface-container-low rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">
                    group
                  </span>
                  <div>
                    <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      Occupancy
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      Up to {roomType.maxGuests} guests
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">
                    bed
                  </span>
                  <div>
                    <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      Bed
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      {roomType.bedType}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">
                    square_foot
                  </span>
                  <div>
                    <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      Living Area
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      {roomType.roomSize ? `${roomType.roomSize} m²` : "—"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">
                    landscape
                  </span>
                  <div>
                    <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      View
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      Mediterranean
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
                  Curated Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {roomType.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[24px] text-secondary">
                        check_circle
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
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
                    const isSelected =
                      day.date >= checkInStr && day.date < checkOutStr
                    const isAvailable =
                      !day.isBlocked && day.availableCount > 0
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
                        <div className="font-label-md text-label-md">
                          {date.getUTCDate()}
                        </div>
                        <div className="font-label-sm text-label-sm">
                          {isAvailable
                            ? formatCurrency(price, roomType.hotel.currency)
                            : "—"}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Reservation Hub */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-xl bg-surface-container-lowest p-space-lg shadow-[0_20px_48px_-12px_rgba(43,30,26,0.14)]">
                <div className="flex items-baseline justify-between mb-space-sm">
                  <div>
                    <span className="font-headline-md text-headline-md text-primary font-bold">
                      {formatCurrency(nightlyPrice, roomType.hotel.currency)}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {" "}
                      / night
                    </span>
                  </div>
                </div>

                <div className="p-space-md bg-surface-container-low rounded-xl mb-space-md">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <span className="block font-label-sm text-label-sm uppercase text-outline">
                        Check-In
                      </span>
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        {checkIn.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="block font-label-sm text-label-sm uppercase text-outline">
                        Check-Out
                      </span>
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        {checkOut.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-outline-variant/30 text-center">
                    <span className="font-label-sm text-label-sm uppercase text-outline">
                      Guests
                    </span>
                    <span className="ml-2 font-body-md text-body-md text-on-surface font-semibold">
                      {guests}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-space-md">
                  <div className="flex justify-between font-body-md text-body-md text-on-surface">
                    <span>
                      {formatCurrency(nightlyPrice, roomType.hotel.currency)} x{" "}
                      {nights} night{nights !== 1 && "s"}
                    </span>
                    <span>
                      {formatCurrency(totalPrice, roomType.hotel.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Taxes & fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between font-headline-sm text-headline-sm text-on-surface pt-2 border-t border-outline-variant/30">
                    <span>Total</span>
                    <span>
                      {formatCurrency(totalPrice, roomType.hotel.currency)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/book?roomType=${roomType.slug}&checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`}
                  className="block w-full rounded bg-primary px-4 py-3 text-center font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-colors hover:bg-primary-container"
                >
                  Reserve This Residence
                </Link>

                <div className="mt-space-md">
                  <Suspense
                    fallback={
                      <div className="animate-pulse space-y-2">
                        <div className="h-12 rounded bg-surface-container-low" />
                        <div className="h-12 rounded bg-surface-container-low" />
                        <div className="h-12 rounded bg-primary" />
                      </div>
                    }
                  >
                    <BookingSearch />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
