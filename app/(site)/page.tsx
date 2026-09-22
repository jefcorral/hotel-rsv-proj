import Image from "next/image"
import Link from "next/link"
import { Sparkles, Waves, UtensilsCrossed } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Villa Aurelia | Boutique Luxury Sanctuary",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099941?auto=format&fit=crop&w=1600&q=80"
          alt="Villa Aurelia exterior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-on-surface/40 to-on-surface/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/20" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 text-center md:px-10 lg:px-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-surface backdrop-blur-md">
            A Sanctuary of Timeless Beauty
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-heading text-5xl leading-[1.1] tracking-tight text-surface md:text-6xl lg:text-[5.75rem]">
            Villa Aurelia
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light leading-relaxed text-surface-variant drop-shadow md:text-xl">
            Where Tuscan travertine meets sun-drenched terraced hills and slow
            Mediterranean living.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rooms"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-8 text-sm font-semibold uppercase tracking-wider"
              )}
            >
              Explore The Suites
            </Link>
            <Link
              href="/estate"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-surface-container-lowest/50 bg-surface-container-lowest/30 px-8 text-sm font-semibold uppercase tracking-wider text-surface backdrop-blur-md hover:bg-surface-container-lowest/50 hover:text-surface"
              )}
            >
              Estate Story
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section id="estate" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              The Estate
            </span>
            <h2 className="mt-3 font-heading text-3xl text-on-surface md:text-4xl">
              Artisanal Escape on the Amalfi Coast
            </h2>
            <p className="mt-6 text-base leading-relaxed text-on-surface-variant">
              Villa Aurelia is a boutique sanctuary sculpted into the cliffs of
              timeless tranquility. Every corner celebrates hand-plastered walls,
              travertine stone, and the warm light of the Mediterranean.
            </p>
            <Link
              href="/location"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-high hover:text-on-surface"
              )}
            >
              Discover the Location
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
              alt="Villa Aurelia interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured amenities */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Estate Experiences
          </span>
          <h2 className="mt-3 font-heading text-3xl text-on-surface md:text-4xl">
            Curated comforts for a perfect stay
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Cliffside Infinity Pool",
              description:
                "Heated seawater pool suspended over the coastline with private cabanas and sunset cocktails.",
              icon: Waves,
              image:
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Travertine Thermal Spa",
              description:
                "Roman stone tepidarium, steam grottos, and bespoke citrus botanical therapies.",
              icon: Sparkles,
              image:
                "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Ristorante Belvedere",
              description:
                "Farm-to-table Campanian gastronomy paired with vintage coastal cellars.",
              icon: UtensilsCrossed,
              image:
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            },
          ].map((amenity) => (
            <div
              key={amenity.title}
              className="group overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <amenity.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-heading text-xl text-on-surface">
                  {amenity.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/amenities"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-high hover:text-on-surface"
            )}
          >
            View All Amenities
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-20">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-low px-8 py-16 text-center md:px-16 md:py-24">
          <div className="relative z-10">
            <h2 className="font-heading text-3xl text-on-surface md:text-4xl">
              Begin your stay on the Amalfi Coast
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-on-surface-variant">
              Reserve your suite, arrange a private transfer, and let our
              concierge craft your perfect coastal escape.
            </p>
            <Link
              href="/rooms"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-12 px-8 text-sm font-semibold uppercase tracking-wider"
              )}
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
