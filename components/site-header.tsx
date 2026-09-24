import Image from "next/image"
import Link from "next/link"

import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { label: "The Estate", href: "/#estate" },
  { label: "Suites & Villas", href: "/rooms" },
  { label: "Wellness & Spa", href: "/amenities#wellness" },
  { label: "Gastronomy", href: "/amenities#dining" },
  { label: "Experiences", href: "/gallery" },
  { label: "Journal", href: "/reviews" },
]

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-surface/85 shadow-[0_1px_8px_rgba(43,30,26,0.05)] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex items-center gap-space-sm">
          <Image
            alt="Villa Aurelia Emblem"
            className="h-8 w-auto object-contain"
            height={32}
            src="/images/villa-aurelia-emblem.png"
            width={120}
          />
          <Link className="flex flex-col text-left" href="/">
            <span className="font-headline-sm text-headline-sm leading-none tracking-tight text-on-surface">
              Villa Aurelia
            </span>
            <span className="font-label-sm text-label-sm mt-0.5 uppercase tracking-[0.2em] text-outline">
              Costiera • Amalfi
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-space-md xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label-md text-label-md py-2 uppercase text-on-surface-variant transition-colors hover:text-on-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm">
          <div className="hidden items-center gap-1 px-space-xs py-1 text-on-surface-variant sm:flex">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
              EUR • EN
            </span>
          </div>
          <Link
            href="/rooms"
            className="hidden items-center justify-center rounded bg-primary px-space-md py-2.5 font-label-lg text-label-lg uppercase text-on-primary shadow-sm transition-colors hover:bg-primary-container md:inline-flex"
          >
            Book Your Stay
          </Link>
          <Link
            href="/account"
            aria-label="Guest account"
            className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[18px] text-on-primary">
              person
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
