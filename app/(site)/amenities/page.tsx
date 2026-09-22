import Image from "next/image"
import { getHotel, fallbackHotel } from "@/lib/data"
import {
  Wifi,
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Car,
  Bus,
  Dog,
  Headset,
  Coffee,
  Sparkles,
  Tv,
  Wind,
} from "lucide-react"

const amenityMeta: Record<
  string,
  { icon: React.ElementType; image: string }
> = {
  "Swimming Pool": {
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
  },
  "Spa & Wellness": {
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  },
  "Restaurant & Bar": {
    icon: UtensilsCrossed,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  "Fitness Center": {
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
  "Free Parking": {
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1590674899505-1c5c5c0d6196?auto=format&fit=crop&w=1200&q=80",
  },
  "Airport Shuttle": {
    icon: Bus,
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=1200&q=80",
  },
  "Pet Friendly": {
    icon: Dog,
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
  },
  "Room Service": {
    icon: Coffee,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  },
  Concierge: {
    icon: Headset,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099941?auto=format&fit=crop&w=1200&q=80",
  },
  "Free Wi-Fi": {
    icon: Wifi,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
  },
  default: {
    icon: Wind,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099941?auto=format&fit=crop&w=1200&q=80",
  },
}

export const metadata = {
  title: "Amenities & Facilities | Villa Aurelia",
  description:
    "Discover the world-class amenities and facilities at Villa Aurelia, from cliffside pools to Michelin-recognized dining.",
}

export default async function AmenitiesPage() {
  const hotel = await getHotel()
  const amenities = hotel?.amenities ?? fallbackHotel.amenities

  return (
    <div className="bg-surface">
      {/* Hero intro */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 md:px-10 md:pt-20 lg:px-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded bg-surface-container-high px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Estate Experiences & Comforts
            </span>
            <h1 className="mt-4 font-heading text-3xl tracking-tight text-on-surface md:text-5xl">
              Everything you need for a{" "}
              <span className="italic font-normal">perfect stay.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant">
              From sun-drenched cliffside infinity baths to sommelier tastings
              and silent wellness sanctuaries, immerse in the understated
              luxuries of Villa Aurelia.
            </p>
          </div>

          <div className="flex items-center gap-6 self-start rounded-xl bg-surface-container-low px-6 py-4 shadow-sm lg:self-end">
            <div className="flex flex-col">
              <span className="font-heading text-2xl text-primary">10</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-outline">
                Sanctuaries
              </span>
            </div>
            <div className="h-8 w-px bg-surface-variant" />
            <div className="flex flex-col">
              <span className="font-heading text-2xl text-primary">24h</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-outline">
                Concierge
              </span>
            </div>
            <div className="h-8 w-px bg-surface-variant" />
            <div className="flex flex-col">
              <span className="font-heading text-2xl text-secondary">100%</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-outline">
                Estate Fiber
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          {amenities.map((amenity, index) => {
            const meta = amenityMeta[amenity] ?? amenityMeta.default
            const Icon = meta.icon
            const isFeatured = index === 0
            const isWide = index < 3

            return (
              <div
                key={amenity}
                className={`group overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:shadow-md ${
                  isFeatured
                    ? "lg:col-span-12"
                    : isWide
                      ? "lg:col-span-6"
                      : "lg:col-span-4"
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    isFeatured ? "h-64 md:h-96 lg:h-[420px]" : "h-56"
                  }`}
                >
                  <Image
                    src={meta.image}
                    alt={amenity}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded bg-surface-container-lowest/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm shadow-sm">
                      <Icon className="size-4" />
                      {amenity}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-on-surface md:text-2xl">
                    {amenity}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    Experience the finest {amenity.toLowerCase()} on the Amalfi
                    Coast, curated with the quiet elegance and attentive service
                    that define Villa Aurelia.
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
