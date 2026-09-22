import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:px-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg text-on-surface">Villa Aurelia</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Boutique Luxury Sanctuary on the Amalfi Coast. Where Tuscan
              travertine meets sun-drenched Mediterranean living.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-on-surface">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link href="#estate" className="hover:text-on-surface">
                  The Estate
                </Link>
              </li>
              <li>
                <Link href="#suites" className="hover:text-on-surface">
                  Suites & Villas
                </Link>
              </li>
              <li>
                <Link href="#wellness" className="hover:text-on-surface">
                  Wellness & Spa
                </Link>
              </li>
              <li>
                <Link href="#gastronomy" className="hover:text-on-surface">
                  Gastronomy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-on-surface">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Via della Costiera, 42<br />Amalfi, Italy</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>+39 089 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>concierge@villaaurelia.it</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-on-surface">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-on-surface-variant">
              Receive seasonal offers and stories from the coast.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-outline-variant pt-8 text-xs text-on-surface-variant md:flex-row">
          <p>© {new Date().getFullYear()} Villa Aurelia. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-on-surface">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-on-surface">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
