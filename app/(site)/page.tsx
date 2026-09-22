import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-20">
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
    </div>
  )
}
