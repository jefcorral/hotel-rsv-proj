import { Star } from "lucide-react"
import { getHotel, fallbackReviews } from "@/lib/data"

export const metadata = {
  title: "Guest Reviews | Villa Aurelia",
  description:
    "Read what guests say about their stay at Villa Aurelia on the Amalfi Coast.",
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-secondary text-secondary"
              : "fill-none text-outline-variant"
          }`}
        />
      ))}
    </div>
  )
}

export default async function ReviewsPage() {
  const hotel = await getHotel()
  const reviews = hotel?.reviews?.length
    ? hotel.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment ?? "",
        createdAt: review.createdAt,
        user: { name: review.user?.name ?? "Guest" },
      }))
    : fallbackReviews

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 md:px-10 md:pt-20 lg:px-20">
        <span className="inline-flex items-center gap-2 rounded bg-surface-container-high px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Guest Stories
        </span>
        <h1 className="mt-4 font-heading text-3xl tracking-tight text-on-surface md:text-5xl">
          Words from the <span className="italic font-normal">coast.</span>
        </h1>
      </section>

      {/* Rating summary */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 md:px-10 lg:px-20">
        <div className="grid gap-8 rounded-xl bg-surface-container-lowest p-8 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-center">
            <p className="font-heading text-6xl text-on-surface">
              {averageRating.toFixed(1)}
            </p>
            <StarRating rating={Math.round(averageRating)} />
            <p className="mt-2 text-sm text-on-surface-variant">
              Based on {reviews.length} guest reviews
            </p>
          </div>
          {[
            { label: "Cleanliness", score: 5.0 },
            { label: "Service", score: 4.9 },
            { label: "Location", score: 5.0 },
            { label: "Comfort", score: 4.8 },
            { label: "Value", score: 4.7 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface">
                  {item.label}
                </span>
                <span className="text-sm text-on-surface-variant">
                  {item.score.toFixed(1)}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-surface-container-high">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-xl bg-surface-container-lowest p-6 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-on-surface-variant">
                “{review.comment}”
              </p>
              <div className="mt-6 border-t border-outline-variant pt-4">
                <p className="text-sm font-semibold text-on-surface">
                  {review.user.name}
                </p>
                <p className="text-xs text-outline">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
