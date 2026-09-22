import Link from "next/link"
import { Menu, User } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "The Estate", href: "/#estate" },
  { label: "Suites & Villas", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/location" },
]

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-outline-variant bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10 lg:px-20">
        <Link href="/" className="flex flex-col">
          <span className="font-heading text-xl font-medium leading-none tracking-tight text-on-surface">
            Villa Aurelia
          </span>
          <span className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-outline">
            Costiera · Amalfi
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:text-on-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-variant sm:inline">
            EUR · EN
          </span>
          <Link
            href="/book"
            className={cn(
              buttonVariants({ size: "default" }),
              "hidden h-9 px-5 text-xs font-semibold uppercase tracking-wider md:inline-flex"
            )}
          >
            Book Your Stay
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-full border-outline-variant"
            aria-label="Account"
          >
            <User className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 xl:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
