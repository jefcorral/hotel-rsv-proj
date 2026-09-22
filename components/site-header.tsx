import Link from "next/link"

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
          <img
            alt="Villa Aurelia Emblem"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Vi2lAoMem20cyNeyKeM6mJ7UvUSnx2YEHyjbPR_Gg3UXqA75pmd-Evzh-Jf0bGee1Co7okz0BJX2h8xkGWmK2GSZEi01I26V8y8IcroaLZ7PF4BySN0oHluRTSt1g6Uq0HOUCjkNJTjNCkmOF5kWwxYtUr5O0OIktIm_4FrYHfqBQ0TnSeiHLxuIhHokCK7KlIvGCCP5UoXJBhLWojd_xIv_JomPX6mu_R1g257OjP8EfJVSdBsreYATI"
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
            className="hidden items-center justify-center rounded bg-primary-container px-space-md py-2.5 font-label-lg text-label-lg uppercase text-on-primary shadow-sm transition-colors hover:bg-primary md:inline-flex"
          >
            Book Your Stay
          </Link>
          <div className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary">
            <span className="material-symbols-outlined text-[18px] text-on-primary">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
