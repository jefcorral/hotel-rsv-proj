import Image from "next/image"
import Link from "next/link"

const villaLinks = [
  { label: "The Estate Grounds", href: "/" },
  { label: "Suites & Private Villas", href: "/rooms" },
  { label: "Roman Bath Spa", href: "/amenities" },
  { label: "Ristorante Belvedere", href: "/amenities" },
  { label: "Private Yacht Charters", href: "/gallery" },
  { label: "The Tuscan & Coastal Journal", href: "/reviews" },
]

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low pb-space-lg pt-space-xl text-on-surface">
      <div className="mx-auto max-w-[1440px] px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="mb-space-xl grid grid-cols-1 gap-gutter-desktop md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="flex flex-col items-start lg:col-span-4">
            <div className="mb-space-sm flex items-center gap-space-sm">
              <Image
                alt="Villa Aurelia Emblem"
                className="h-9 w-auto object-contain"
                height={36}
                src="https://lh3.googleusercontent.com/aida/AEtjO1Vi2lAoMem20cyNeyKeM6mJ7UvUSnx2YEHyjbPR_Gg3UXqA75pmd-Evzh-Jf0bGee1Co7okz0BJX2h8xkGWmK2GSZEi01I26V8y8IcroaLZ7PF4BySN0oHluRTSt1g6Uq0HOUCjkNJTjNCkmOF5kWwxYtUr5O0OIktIm_4FrYHfqBQ0TnSeiHLxuIhHokCK7KlIvGCCP5UoXJBhLWojd_xIv_JomPX6mu_R1g257OjP8EfJVSdBsreYATI"
                width={120}
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
                Villa Aurelia
              </span>
            </div>
            <p className="mb-space-md max-w-sm font-body-md text-body-md text-on-surface-variant">
              An artisanal Mediterranean sanctuary perched above the azure
              cliffs of Positano. Serene architecture, heritage olive groves,
              and discreet concierge hospitality.
            </p>
            <div className="flex items-center gap-space-sm text-tertiary">
              <span className="material-symbols-outlined text-[20px]">
                verified
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Leading Hotels of the World • Condé Nast Gold List 2024
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col lg:col-span-3">
            <h3 className="mb-space-sm font-label-lg text-label-lg uppercase tracking-widest text-primary">
              Concierge & Location
            </h3>
            <p className="mb-space-xs font-body-md text-body-md text-on-surface-variant">
              Via Panoramica 48, 84017 Positano (SA)
              <br />
              Amalfi Coast, Campania, Italy
            </p>
            <p className="mb-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <span className="font-semibold text-on-surface">Direct:</span>{" "}
              +39 089 875 110
              <br />
              <span className="font-semibold text-on-surface">Concierge:</span>{" "}
              concierge@villaaurelia.it
            </p>
            <div className="mt-space-sm flex items-center gap-space-xs text-on-surface-variant">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[18px]">
                  hotel_class
                </span>
              ))}
              <span className="ml-1 font-label-sm text-label-sm uppercase">
                5-Star Luxury Relais
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col lg:col-span-2">
            <h3 className="mb-space-sm font-label-lg text-label-lg uppercase tracking-widest text-primary">
              The Villa
            </h3>
            <ul className="space-y-space-xs font-body-md text-body-md text-on-surface-variant">
              {villaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col lg:col-span-3">
            <h3 className="mb-space-sm font-label-lg text-label-lg uppercase tracking-widest text-primary">
              Private Gazette
            </h3>
            <p className="mb-space-sm font-body-sm text-body-sm text-on-surface-variant">
              Receive seasonal private offers, seasonal culinary debuts, and
              coastal monographs.
            </p>
            <form className="flex flex-col gap-2">
              <input
                className="w-full rounded border-0 bg-surface-container-lowest px-3 py-2 font-body-sm text-body-sm text-on-surface shadow-[0_1px_4px_rgba(43,30,26,0.06)] placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Your email address"
                type="email"
              />
              <button
                className="mt-1 rounded bg-primary px-4 py-2.5 text-center font-label-md text-label-md uppercase text-on-primary transition-colors hover:bg-primary-container"
                type="button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-space-sm border-t border-outline-variant/30 pt-space-md font-label-sm text-label-sm uppercase text-on-surface-variant md:flex-row">
          <p>
            © {new Date().getFullYear()} Villa Aurelia S.r.l. Positano, Amalfi
            Coast. All rights reserved.
          </p>
          <div className="flex items-center gap-space-md">
            <Link href="#" className="hover:text-on-surface">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-on-surface">
              Cookie Preferences
            </Link>
            <Link href="#" className="hover:text-on-surface">
              Guest Charter
            </Link>
            <span>CIN: IT065100A1</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
