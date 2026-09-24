export const isMockMode = !process.env.DATABASE_URL

export const mockHotel = {
  id: "mock-hotel",
  name: "Villa Aurelia",
  slug: "villa-aurelia",
  currency: "EUR",
  taxRate: 10,
}

export type MockRoomType = {
  id: string
  slug: string
  name: string
  description: string
  bedType: string
  maxGuests: number
  roomSize: number
  basePrice: number
  extraGuestFee: number
  amenities: string[]
  photos: string[]
  isActive: true
  hotelId: string
  hotel: typeof mockHotel
  rooms: { status: string }[]
}

export const mockRoomTypes: MockRoomType[] = [
  {
    id: "mock-cortile",
    slug: "cortile-terrace-room",
    name: "Cortile Terrace Room",
    description:
      "A serene retreat overlooking the inner courtyard with a private terrace, hand-plastered walls, and travertine accents.",
    bedType: "King",
    maxGuests: 2,
    roomSize: 32,
    basePrice: 380,
    extraGuestFee: 75,
    amenities: [
      "King bed",
      "Private terrace",
      "Courtyard view",
      "Rain shower",
      "Smart TV",
      "Mini bar",
      "Air conditioning",
    ],
    photos: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    isActive: true,
    hotelId: mockHotel.id,
    hotel: mockHotel,
    rooms: [{ status: "available" }],
  },
  {
    id: "mock-coastal",
    slug: "coastal-suite",
    name: "Coastal Suite",
    description:
      "Spacious suite with panoramic Mediterranean views, separate living area, and a deep soaking tub.",
    bedType: "King",
    maxGuests: 3,
    roomSize: 55,
    basePrice: 620,
    extraGuestFee: 90,
    amenities: [
      "King bed",
      "Ocean view",
      "Separate living area",
      "Deep soaking tub",
      "Rain shower",
      "Smart TV",
      "Mini bar",
      "Air conditioning",
    ],
    photos: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    ],
    isActive: true,
    hotelId: mockHotel.id,
    hotel: mockHotel,
    rooms: [{ status: "available" }],
  },
  {
    id: "mock-garden",
    slug: "family-garden-villa",
    name: "Family Garden Villa",
    description:
      "A private garden villa perfect for families, with two bedrooms, a kitchenette, and direct pool access.",
    bedType: "King + Twin",
    maxGuests: 4,
    roomSize: 78,
    basePrice: 850,
    extraGuestFee: 100,
    amenities: [
      "Two bedrooms",
      "Kitchenette",
      "Private garden",
      "Pool access",
      "Rain shower",
      "Smart TV",
      "Mini bar",
      "Air conditioning",
    ],
    photos: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1200&q=80",
    ],
    isActive: true,
    hotelId: mockHotel.id,
    hotel: mockHotel,
    rooms: [{ status: "available" }],
  },
]

export type MockBooking = {
  id: string
  guestName: string
  guestEmail: string
  guestPhone: string | null
  guestCount: number
  checkIn: Date
  checkOut: Date
  totalPrice: number
  currency: string
  status: string
  createdAt: Date
  specialRequests: string | null
  estimatedArrival: string | null
  roomType: MockRoomType
  hotel: typeof mockHotel
  payments: { status: string }[]
}

export function buildMockBooking(params: {
  roomType?: string
  checkIn?: string
  checkOut?: string
  guests?: string
  name?: string
  email?: string
  phone?: string
  paid?: string
}): MockBooking | null {
  const roomType = mockRoomTypes.find((r) => r.slug === params.roomType)
  if (!roomType) return null

  const checkIn = params.checkIn
    ? new Date(params.checkIn + "T00:00:00.000Z")
    : new Date()
  const checkOut = params.checkOut
    ? new Date(params.checkOut + "T00:00:00.000Z")
    : new Date(Date.now() + 3 * 86400000)
  const nights = Math.max(
    1,
    Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)
  )

  return {
    id: "MOCK-DEMO",
    guestName: params.name || "Demo Guest",
    guestEmail: params.email || "guest@example.com",
    guestPhone: params.phone || null,
    guestCount: Math.max(1, parseInt(params.guests ?? "2", 10) || 2),
    checkIn,
    checkOut,
    totalPrice: roomType.basePrice * nights,
    currency: mockHotel.currency,
    status: "confirmed",
    createdAt: new Date(),
    specialRequests: null,
    estimatedArrival: null,
    roomType,
    hotel: mockHotel,
    payments: params.paid === "1" ? [{ status: "succeeded" }] : [],
  }
}
