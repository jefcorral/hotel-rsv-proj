import { prisma } from "@/lib/prisma"
import { isMockMode, mockHotel, mockRoomTypes } from "@/lib/mock"

export type SearchAvailabilityInput = {
  checkIn?: string
  checkOut?: string
  guests?: string
}

export type RoomSearchResult = {
  id: string
  slug: string
  name: string
  description: string | null
  bedType: string
  maxGuests: number
  roomSize: number | null
  basePrice: number
  extraGuestFee: number
  amenities: string[]
  photos: string[]
  availableCount: number
  totalNights: number
  totalPrice: number
  pricePerNight: number
}

export type DayAvailability = {
  date: string
  availableCount: number
  price: number
  isBlocked: boolean
}

function toDateInputValue(date: Date) {
  return date.toISOString().split("T")[0]
}

function parseDateInput(value?: string) {
  if (!value) return null
  const date = new Date(value + "T00:00:00.000Z")
  if (Number.isNaN(date.getTime())) return null
  date.setUTCHours(0, 0, 0, 0)
  return date
}

export function getDefaultSearchDates() {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const checkIn = new Date(today)
  checkIn.setUTCDate(today.getUTCDate() + 14)
  const checkOut = new Date(checkIn)
  checkOut.setUTCDate(checkIn.getUTCDate() + 3)
  return {
    checkIn: toDateInputValue(checkIn),
    checkOut: toDateInputValue(checkOut),
    guests: "2",
  }
}

export function validateSearchParams(input: SearchAvailabilityInput): {
  checkIn: Date
  checkOut: Date
  guests: number
} {
  const defaults = getDefaultSearchDates()
  const checkIn = parseDateInput(input.checkIn) ?? parseDateInput(defaults.checkIn)!
  const checkOut = parseDateInput(input.checkOut) ?? parseDateInput(defaults.checkOut)!
  const guests = Math.max(1, parseInt(input.guests ?? defaults.guests, 10) || 1)

  if (checkOut <= checkIn) {
    checkOut.setUTCDate(checkIn.getUTCDate() + 1)
  }

  return { checkIn, checkOut, guests }
}

function decimalToNumber(value: unknown) {
  if (typeof value === "number") return value
  if (value && typeof value === "object" && "toNumber" in value) {
    return (value as { toNumber: () => number }).toNumber()
  }
  return Number(value)
}

export async function searchRoomAvailability(
  input: SearchAvailabilityInput
): Promise<{
  hotel: { id: string; name: string; currency: string } | null
  results: RoomSearchResult[]
  checkIn: Date
  checkOut: Date
  guests: number
}> {
  const { checkIn, checkOut, guests } = validateSearchParams(input)

  if (isMockMode) {
    const totalNights = Math.max(
      1,
      Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)
    )
    const results: RoomSearchResult[] = mockRoomTypes
      .filter((r) => r.maxGuests >= guests)
      .map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        description: r.description,
        bedType: r.bedType,
        maxGuests: r.maxGuests,
        roomSize: r.roomSize,
        basePrice: r.basePrice,
        extraGuestFee: r.extraGuestFee,
        amenities: r.amenities,
        photos: r.photos,
        availableCount: 4,
        totalNights,
        totalPrice: r.basePrice * totalNights,
        pricePerNight: r.basePrice,
      }))
    return { hotel: mockHotel, results, checkIn, checkOut, guests }
  }

  const hotel = await prisma.hotel.findFirst({ where: { slug: "villa-aurelia" } })
  if (!hotel) return { hotel: null, results: [], checkIn, checkOut, guests }

  const roomTypes = await prisma.roomType.findMany({
    where: { hotelId: hotel.id, isActive: true, maxGuests: { gte: guests } },
    orderBy: { basePrice: "asc" },
  })

  const dateRange: Date[] = []
  for (let d = new Date(checkIn); d < checkOut; d.setUTCDate(d.getUTCDate() + 1)) {
    dateRange.push(new Date(d))
  }

  const results: RoomSearchResult[] = []

  for (const roomType of roomTypes) {
    const availability = await prisma.availability.findMany({
      where: {
        roomTypeId: roomType.id,
        date: { in: dateRange },
      },
      orderBy: { date: "asc" },
    })

    if (availability.length !== dateRange.length) continue
    if (availability.some((a) => a.isBlocked || a.availableCount <= 0)) continue

    const availableCount = Math.min(...availability.map((a) => a.availableCount))
    const totalNights = dateRange.length
    const nightlyPrices = availability.map((a) =>
      decimalToNumber(a.priceOverride ?? roomType.basePrice)
    )
    const baseTotal = nightlyPrices.reduce((sum, price) => sum + price, 0)
    const extraGuests = Math.max(0, guests - roomType.maxGuests)
    const extraGuestTotal = extraGuests * decimalToNumber(roomType.extraGuestFee) * totalNights
    const totalPrice = baseTotal + extraGuestTotal
    const pricePerNight = totalNights > 0 ? totalPrice / totalNights : 0

    results.push({
      id: roomType.id,
      slug: roomType.slug,
      name: roomType.name,
      description: roomType.description,
      bedType: roomType.bedType,
      maxGuests: roomType.maxGuests,
      roomSize: roomType.roomSize,
      basePrice: decimalToNumber(roomType.basePrice),
      extraGuestFee: decimalToNumber(roomType.extraGuestFee),
      amenities: roomType.amenities,
      photos: roomType.photos,
      availableCount,
      totalNights,
      totalPrice,
      pricePerNight,
    })
  }

  return { hotel, results, checkIn, checkOut, guests }
}

export async function getRoomTypeBySlug(slug: string) {
  if (isMockMode) {
    return mockRoomTypes.find((r) => r.slug === slug) ?? null
  }

  const roomType = await prisma.roomType.findFirst({
    where: { slug, isActive: true },
    include: {
      hotel: true,
      rooms: { where: { status: "available" } },
    },
  })
  if (!roomType) return null

  return {
    ...roomType,
    basePrice: decimalToNumber(roomType.basePrice),
    extraGuestFee: decimalToNumber(roomType.extraGuestFee),
    hotel: {
      ...roomType.hotel,
      taxRate: decimalToNumber(roomType.hotel.taxRate),
    },
  }
}

export async function getAvailabilityCalendar(
  roomTypeId: string,
  startDate: Date,
  days: number
) {
  const dates: Date[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate)
    d.setUTCDate(startDate.getUTCDate() + i)
    dates.push(d)
  }

  if (isMockMode) {
    const roomType = mockRoomTypes.find((r) => r.id === roomTypeId)
    return dates.map((date) => ({
      date: date.toISOString().split("T")[0],
      availableCount: 4,
      price: roomType?.basePrice ?? 0,
      isBlocked: false,
    }))
  }

  const availability = await prisma.availability.findMany({
    where: { roomTypeId, date: { in: dates } },
    orderBy: { date: "asc" },
  })

  return dates.map((date) => {
    const record = availability.find(
      (a) => a.date.toISOString().split("T")[0] === date.toISOString().split("T")[0]
    )
    return {
      date: date.toISOString().split("T")[0],
      availableCount: record?.availableCount ?? 0,
      price: decimalToNumber(record?.priceOverride ?? 0),
      isBlocked: record?.isBlocked ?? false,
    } as DayAvailability
  })
}
