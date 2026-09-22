import { MapPin, Phone, Mail, Clock, Bus, Car } from "lucide-react"
import { getHotel, fallbackHotel } from "@/lib/data"

export const metadata = {
  title: "Location & Contact | Villa Aurelia",
  description:
    "Find Villa Aurelia on the Amalfi Coast. Directions, contact details, and nearby attractions.",
}

export default async function LocationPage() {
  const hotel = await getHotel()
  const name = hotel?.name ?? fallbackHotel.name
  const address = hotel?.address ?? fallbackHotel.address
  const city = hotel?.city ?? fallbackHotel.city
  const country = hotel?.country ?? fallbackHotel.country

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 md:px-10 md:pt-20 lg:px-20">
        <span className="inline-flex items-center gap-2 rounded bg-surface-container-high px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Find Us
        </span>
        <h1 className="mt-4 font-heading text-3xl tracking-tight text-on-surface md:text-5xl">
          Where the coast <span className="italic font-normal">unfolds.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant">
          Perched above the Gulf of Salerno, Villa Aurelia is a short drive from
          Amalfi, Ravello, and Positano — reachable by coastal road, private
          transfer, or boat.
        </p>
      </section>

      {/* Two column layout */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Map placeholder */}
          <div className="overflow-hidden rounded-xl bg-surface-container-low">
            <div className="relative aspect-[4/3] bg-surface-container-high">
              <div className="absolute inset-0 flex items-center justify-center bg-surface-variant">
                <div className="text-center">
                  <MapPin className="mx-auto size-12 text-primary" />
                  <p className="mt-4 font-heading text-xl text-on-surface">
                    {name}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {address}, {city}, {country}
                  </p>
                  <p className="mt-6 text-xs text-outline">
                    Interactive map integration to be wired here.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-outline-variant border-t border-outline-variant">
              <div className="p-6 text-center">
                <p className="font-heading text-2xl text-on-surface">35 km</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-outline">
                  Naples Airport
                </p>
              </div>
              <div className="p-6 text-center">
                <p className="font-heading text-2xl text-on-surface">12 km</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-outline">
                  Positano
                </p>
              </div>
            </div>
          </div>

          {/* Contact & directions */}
          <div className="flex flex-col gap-8">
            <div className="rounded-xl bg-surface-container-lowest p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-on-surface">
                Contact the Estate
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                Our concierge team is available around the clock to arrange
                transfers, excursions, dining reservations, and anything else
                that would make your stay exceptional.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      Address
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      {address}
                      <br />
                      {city}, {country}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      Phone
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      +39 089 123 4567
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      Email
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      concierge@villaaurelia.it
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      Front Desk Hours
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      24 hours, 7 days a week
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-surface-container-lowest p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-on-surface">
                Getting Here
              </h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-4">
                  <Car className="mt-0.5 size-5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    <strong className="text-on-surface">By car:</strong> 75
                    minutes from Naples International Airport via the A3
                    motorway. Private parking is complimentary for guests.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <Bus className="mt-0.5 size-5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    <strong className="text-on-surface">By transfer:</strong>{" "}
                    We arrange private Mercedes transfers from Naples, Rome, and
                    Salerno. Contact us before arrival.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby attractions */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-20">
        <h2 className="font-heading text-2xl text-on-surface md:text-3xl">
          Nearby Experiences
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Amalfi Cathedral", distance: "10 min drive" },
            { name: "Ravello Gardens", distance: "25 min drive" },
            { name: "Positano Village", distance: "20 min drive" },
            { name: "Path of the Gods", distance: "35 min hike" },
          ].map((attraction) => (
            <div
              key={attraction.name}
              className="rounded-xl border border-outline-variant bg-surface-container-low p-6"
            >
              <p className="font-heading text-lg text-on-surface">
                {attraction.name}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {attraction.distance}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
