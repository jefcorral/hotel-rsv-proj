import { prisma } from "@/lib/prisma"

export type HotelWithDetails = Awaited<ReturnType<typeof getHotel>>

export async function getHotel() {
  try {
    return await prisma.hotel.findFirst({
      where: { slug: "villa-aurelia" },
      include: {
        roomTypes: {
          where: { isActive: true },
          orderBy: { basePrice: "asc" },
        },
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    })
  } catch {
    return null
  }
}

export const fallbackHotel = {
  name: "Villa Aurelia",
  slug: "villa-aurelia",
  tagline: "Boutique Luxury Sanctuary",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
  address: "Via della Costiera, 42",
  city: "Amalfi",
  country: "Italy",
  checkInTime: "15:00",
  checkOutTime: "11:00",
  currency: "EUR",
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
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1600&q=80",
  ],
}

export const fallbackReviews = [
  {
    id: "1",
    rating: 5,
    comment:
      "An unforgettable escape. The terraced suites, the cliffside pool, and the quiet attention to detail made this the most restorative holiday we've ever taken.",
    createdAt: new Date("2026-08-15"),
    user: { name: "Eleanor R." },
  },
  {
    id: "2",
    rating: 5,
    comment:
      "Every meal at Ristorante Belvedere felt like a celebration of the coast. The concierge arranged a private boat tour that was the highlight of our trip.",
    createdAt: new Date("2026-07-22"),
    user: { name: "Marco & Lena" },
  },
  {
    id: "3",
    rating: 4,
    comment:
      "Beautiful property with warm, attentive service. The spa treatments are exceptional. We only wished we had booked a longer stay.",
    createdAt: new Date("2026-06-10"),
    user: { name: "Sophie T." },
  },
]
