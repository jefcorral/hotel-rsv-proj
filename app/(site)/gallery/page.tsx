"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const categories = ["All", "Exterior", "Rooms", "Dining", "Pool & Spa", "Experiences"]

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099941?auto=format&fit=crop&w=1600&q=80",
    alt: "Villa Aurelia exterior at golden hour",
    category: "Exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
    alt: "Elegant lobby with travertine details",
    category: "Exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    alt: "Terrace room with garden view",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
    alt: "Coastal suite living area",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    alt: "Cliffside infinity pool at sunset",
    category: "Pool & Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    alt: "Ristorante Belvedere terrace",
    category: "Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1600&q=80",
    alt: "Family garden villa kitchenette",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    alt: "Thermal spa treatment room",
    category: "Pool & Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    alt: "Private dining experience",
    category: "Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    alt: "Amalfi coast boat excursion",
    category: "Experiences",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    alt: "Sunrise yoga on the terrace",
    category: "Experiences",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
    alt: "Hotel facade from the gardens",
    category: "Exterior",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goPrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(
      lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1
    )
  }

  const goNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(
      lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="mx-auto max-w-[1440px] px-5 pb-8 pt-12 md:px-10 md:pt-20 lg:px-20">
        <span className="inline-flex items-center gap-2 rounded bg-surface-container-high px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Visual Journey
        </span>
        <h1 className="mt-4 font-heading text-3xl tracking-tight text-on-surface md:text-5xl">
          Villa Aurelia in <span className="italic font-normal">frames.</span>
        </h1>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1440px] px-5 pb-10 md:px-10 lg:px-20">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === category
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-20">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filteredImages.map((image, index) => (
            <button
              key={image.src}
              onClick={() => openLightbox(index)}
              className="group mb-5 block w-full overflow-hidden rounded-xl bg-surface-container-low"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="px-4 py-3 text-left text-sm text-on-surface-variant">
                {image.alt}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/90 p-4 md:p-8">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 rounded-full bg-surface/10 p-2 text-surface backdrop-blur-sm transition-colors hover:bg-surface/20"
            aria-label="Close lightbox"
          >
            <X className="size-6" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-surface/10 p-2 text-surface backdrop-blur-sm transition-colors hover:bg-surface/20 md:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-surface/10 p-2 text-surface backdrop-blur-sm transition-colors hover:bg-surface/20 md:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>

          <div className="relative max-h-[80vh] w-full max-w-5xl">
            <Image
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              width={1600}
              height={1000}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <p className="mt-4 text-center text-sm text-surface-variant">
              {filteredImages[lightboxIndex].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
