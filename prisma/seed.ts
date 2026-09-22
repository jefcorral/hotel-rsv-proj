import { PrismaClient, UserRole, RoomStatus } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clean existing seeded data in development
  await prisma.review.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.room.deleteMany()
  await prisma.roomType.deleteMany()
  await prisma.hotel.deleteMany()
  await prisma.user.deleteMany()

  // Seed hotel
  const hotel = await prisma.hotel.create({
    data: {
      name: "Villa Aurelia",
      slug: "villa-aurelia",
      tagline: "Boutique Luxury Sanctuary",
      description:
        "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living. An artisanal escape sculpted into the cliffs of timeless tranquility.",
      address: "Via della Costiera, 42",
      city: "Amalfi",
      country: "Italy",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      currency: "EUR",
      taxRate: 10,
      amenities: [
        "Free Wi-Fi",
        "Swimming Pool",
        "Spa & Wellness",
        "Restaurant & Bar",
        "Fitness Center",
        "Free Parking",
        "Airport Shuttle",
        "Pet Friendly",
        "Room Service",
        "Concierge",
      ],
      photos: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099941?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
      ],
      policies: {
        cancellation: {
          freeUntilDays: 7,
          penaltyPercent: 50,
          noRefundWithinDays: 2,
        },
        pets: "Pets are welcome in select rooms. Please contact the hotel in advance.",
        children: "Children of all ages are welcome. Extra beds available on request.",
      },
    },
  })

  // Seed admin user
  await prisma.user.create({
    data: {
      email: "admin@villa-aurelia.com",
      name: "Hotel Admin",
      role: UserRole.super_admin,
      password: null, // To be set via auth provider
    },
  })

  // Seed room types
  const roomTypes = await Promise.all([
    prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: "Cortile Terrace Room",
        slug: "cortile-terrace-room",
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
      },
    }),
    prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: "Coastal Suite",
        slug: "coastal-suite",
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
      },
    }),
    prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: "Family Garden Villa",
        slug: "family-garden-villa",
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
      },
    }),
  ])

  // Seed physical rooms and availability
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (const roomType of roomTypes) {
    const roomCount = roomType.maxGuests === 2 ? 4 : roomType.maxGuests === 3 ? 3 : 2

    for (let i = 1; i <= roomCount; i++) {
      await prisma.room.create({
        data: {
          roomTypeId: roomType.id,
          roomNumber: `${roomType.slug.slice(0, 3).toUpperCase()}-${100 + i}`,
          floor: i <= 2 ? "1" : "2",
          status: RoomStatus.available,
        },
      })
    }

    // Seed availability for the next 180 days
    for (let d = 0; d < 180; d++) {
      const date = new Date(today)
      date.setDate(today.getDate() + d)

      await prisma.availability.create({
        data: {
          roomTypeId: roomType.id,
          date,
          availableCount: roomCount,
          priceOverride: null,
          isBlocked: false,
        },
      })
    }
  }

  console.log(`Seeded hotel: ${hotel.name}`)
  console.log(`Seeded ${roomTypes.length} room types`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
