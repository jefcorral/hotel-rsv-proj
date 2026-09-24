import Link from "next/link"
import { redirect } from "next/navigation"

import { auth, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { isMockMode, mockRoomTypes } from "@/lib/mock"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Villa Aurelia | Guest Atelier",
}

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const bookings: Awaited<ReturnType<typeof prisma.booking.findMany<{ include: { roomType: true } }>>> = isMockMode
    ? []
    : await prisma.booking.findMany({
        where: {
          OR: [
            { userId: session.user.id },
            ...(session.user.email ? [{ guestEmail: session.user.email }] : []),
          ],
        },
        include: { roomType: true },
        orderBy: { checkIn: "asc" },
      })

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20">
        <section className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-space-lg">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold">
                Guest Atelier
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Welcome, {session.user.name}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {session.user.email}
              </p>
            </div>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <button
                type="submit"
                className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase px-5 py-2.5 rounded transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>

          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">
            Your Reservations
          </h2>
          {bookings.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm text-center">
              <span className="material-symbols-outlined text-[40px] text-outline">hotel</span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                No reservations yet. Discover our sanctuaries and reserve your stay.
              </p>
              <Link
                href="/rooms"
                className="inline-block mt-4 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase px-6 py-3 rounded transition-colors"
              >
                Explore Residences
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <span className="font-label-sm text-label-sm uppercase text-outline block">
                      {b.id.slice(0, 10).toUpperCase()}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      {b.roomType.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {b.checkIn.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
                      {" – "}
                      {b.checkOut.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
                      {" • "}
                      {b.guestCount} guest{b.guestCount !== 1 && "s"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-label-sm text-label-sm uppercase px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed">
                      {b.status}
                    </span>
                    <p className="font-headline-sm text-headline-sm text-primary mt-1">
                      {formatCurrency(Number(b.totalPrice), b.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
