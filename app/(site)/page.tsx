import Link from "next/link"

export const metadata = {
  title: "Villa Aurelia | Boutique Luxury Sanctuary",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

export default function HomePage() {
  return (
    <div className="bg-surface">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Immersive Hero Section Bleeding Under App Header */}
          <section className="relative w-full -mt-20 pt-24 pb-28 md:pb-36 min-h-[92vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Soft Vignette Scrim */}
            <div className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-100 hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjgfw8FSMfpGbQJEJbyo2jwEs-W4VoiFvtQwTvkXApvMstBEyjXlmENYlTL2e_DR7iiIERXm93hVp_YfJzz7Id5EIq1KmGO3JcUDQIyregr7d0Pr-Xosj0Cb0scG2Sb6aBBeDoVOXjYAC1-xRRCdFCaUwhbE2NhC0z51H9Y0bVXNHc8hvlqnLXJiZxTeD9Trk-aOe31WjmNMZVEMmMs52OVwtIW_g6Yvd7cOdV_pej4poXN3ayyhjM")'}} />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface via-on-surface/40 to-on-surface/60" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/30 via-transparent to-primary/20" />
            {/* Editorial Hero Typography */}
            <div className="relative z-20 max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop w-full text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface-bright mb-space-md">
                <span className="material-symbols-outlined text-[14px] text-secondary-fixed">arrow_back_ios_new</span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-surface">A Sanctuary of Timeless Beauty</span>
              </div>
              <h1 className="font-display text-display md:text-[5.75rem] text-surface text-balance drop-shadow-sm mb-space-sm max-w-4xl tracking-tight">
                Villa Aurelia
              </h1>
              <p className="font-body-lg text-body-lg text-surface-variant max-w-2xl font-light text-balance leading-relaxed mb-space-xl drop-shadow">
                Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living. An artisanal escape sculpted into the cliffs of timeless tranquility.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-space-md">
                <a className="px-space-lg py-3.5 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider rounded transition-all shadow-xl hover:shadow-2xl flex items-center gap-space-xs group" href="#suites">
                  <span>Explore The Suites</span>
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
                <a className="px-space-lg py-3.5 bg-surface-container-lowest/30 hover:bg-surface-container-lowest/50 text-white backdrop-blur-md font-label-lg text-label-lg uppercase tracking-wider rounded transition-all flex items-center gap-space-xs" href="#estate-essence">
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  <span>Estate Story</span>
                </a>
              </div>
            </div>
          </section>
          {/* Luxury Floating Booking Bar Overlapping Hero Base */}
          <div className="relative z-30 max-w-[1360px] mx-auto -mt-16 md:-mt-20 px-margin md:px-margin-tablet lg:px-margin-desktop w-full">
            <div className="bg-surface-container-lowest/95 backdrop-blur-xl rounded-xl p-space-md lg:p-space-lg shadow-[0_20px_48px_-12px_rgba(43,30,26,0.14)]">
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm lg:gap-space-md items-center">
                {/* Check In */}
                <div className="lg:col-span-3 flex flex-col bg-surface-container-low/70 hover:bg-surface-container-low rounded p-space-sm cursor-pointer transition-colors">
                  <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">calendar_today</span> Check-In Date
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface">18 Oct</span>
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase">Sat · 2025</span>
                  </div>
                </div>
                {/* Check Out */}
                <div className="lg:col-span-3 flex flex-col bg-surface-container-low/70 hover:bg-surface-container-low rounded p-space-sm cursor-pointer transition-colors">
                  <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">calendar_month</span> Check-Out Date
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface">24 Oct</span>
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase">Fri · 6 Nights</span>
                  </div>
                </div>
                {/* Guests & Rooms */}
                <div className="lg:col-span-3 flex flex-col bg-surface-container-low/70 hover:bg-surface-container-low rounded p-space-sm cursor-pointer transition-colors">
                  <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">person</span> Guests &amp; Suites
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface">2 Guests</span>
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase">1 Master Villa</span>
                  </div>
                </div>
                {/* CTA Availability Button */}
                <div className="lg:col-span-3 flex flex-col h-full justify-end">
                  <button className="w-full h-full min-h-[58px] bg-primary hover:bg-primary-container text-on-primary rounded font-label-lg text-label-lg uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 group" type="button">
                    <span>Check Availability</span>
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </button>
                </div>
              </form>
              {/* Subtext / Code Access Bar */}
              <div className="mt-space-sm pt-space-xs flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant">
                <div className="flex items-center gap-space-md">
                  <button className="font-label-sm text-label-sm uppercase tracking-wider text-primary hover:text-on-surface flex items-center gap-1" type="button">
                    <span className="material-symbols-outlined text-[14px]">loyalty</span> Have a Club Aurelia or Promo Code?
                  </button>
                  <span className="hidden sm:inline text-outline-variant">•</span>
                  <span className="font-label-sm text-label-sm uppercase text-outline hidden sm:inline">Best Rate Guaranteed Direct</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  <span className="font-label-sm text-label-sm uppercase">Complimentary Airport Limousine Transfer on 5+ Nights</span>
                </div>
              </div>
            </div>
          </div>
          {/* 'Why Stay With Us' / Highlights Section */}
          <section className="w-full py-space-xl max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop" id="estate-essence">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
              <div className="max-w-xl">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-2">The Aurelia Essence</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">A Crafted Haven for the Senses</h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Rooted in centuries-old hillside traditions, our estate balances architectural restraint with heartfelt, tailored Italian luxury.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {/* 01. Roman Spa */}
              <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[24px]">hot_tub</span>
                    </div>
                    <span className="font-display text-headline-sm text-outline-variant">01</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Subterranean Thermal Spa</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Carved Roman-inspired thermal baths, olive-oil ritual therapy, and panoramic vitality hydrotherapy pools bathed in soft candlelight.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                    View Treatments <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                </div>
              </div>
              {/* 02. Farm-to-Table */}
              <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <span className="material-symbols-outlined text-[24px]">restaurant</span>
                    </div>
                    <span className="font-display text-headline-sm text-outline-variant">02</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Farm-to-Table Gastronomy</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Michelin-starred dining by Chef Matteo Moretti, harvesting directly from our 30-acre heirloom organic orchards and biodynamic gardens.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                    Discover Menus <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                </div>
              </div>
              {/* 03. Location */}
              <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                      <span className="material-symbols-outlined text-[24px]">landscape</span>
                    </div>
                    <span className="font-display text-headline-sm text-outline-variant">03</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Privileged Hillside Location</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Perched serenely over the Val d'Orcia valley, 20 minutes from Montalcino, nestled securely within centuries-old cypress groves.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                    The Territory <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                </div>
              </div>
              {/* 04. Bespoke Concierge */}
              <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[24px]">key</span>
                    </div>
                    <span className="font-display text-headline-sm text-outline-variant">04</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Tailored Bespoke Concierge</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Private vintage Alfa Romeo excursions, sunrise hot-air balloon floats, and sommelier cellar tastings reserved exclusively for guests.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                    Curated Journeys <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* Architectural Showcase Strip */}
          <section className="w-full bg-surface-container-low py-space-xl">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              <div className="lg:col-span-5 flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary mb-2">Heritage Restored</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-md leading-tight">
                  Where Travertine Stone Tells Historic Tales
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                  Crafted from hand-chiseled local limestone and framed with terracotta vaulted loggias, Villa Aurelia honors 16th-century Italian masonry while infusing contemporary airiness, curated art, and effortless comforts.
                </p>
                <div className="grid grid-cols-2 gap-space-md pt-space-xs mb-space-md">
                  <div className="bg-surface p-space-sm rounded">
                    <span className="font-headline-md text-headline-md text-primary block">14</span>
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Private Sanctuaries</span>
                  </div>
                  <div className="bg-surface p-space-sm rounded">
                    <span className="font-headline-md text-headline-md text-primary block">30 Ha</span>
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Estate Olive Groves</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 relative">
                <div className="overflow-hidden rounded-xl shadow-xl aspect-[16/10]">
                  <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" data-alt="Warm sunlight shining through classic arched stone loggias of an ancient Italian villa with comfortable linen sofas, potted terracotta olive trees, and views over Tuscan rolling green hills." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7jPQ_2Bcm53PquOcY5psxqYQ6y2RYRnPGRvtHIK9wIHSSJX0DA7h1bVdqcrJ1scg9ZjqCztzCFllv3dCwuSKT_w-Ka2H3IO5g0X3wjOMeQyJcyF2WVj3U-NnEXub43Dl6S8o0cPNtnwqpIhqQeWJ_y6MN06L_P08e8bxnFjgPItJfsMSVOAMvu1-eFtNj-iqBeqkC4WV1UuGJX4rEuTYrYOGVQdnpj3bEU2hNay80VCNADVabL6eH" />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-surface-container-lowest p-space-md rounded-lg shadow-lg">
                  <span className="material-symbols-outlined text-[32px] text-primary">eco</span>
                  <div>
                    <div className="font-label-md text-label-md uppercase text-on-surface font-semibold">100% Regenerative</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Solar-powered and estate-sourced water</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Suites & Sanctuary Grid */}
          <section className="w-full py-space-xl max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop" id="suites">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-2">Sanctuary &amp; Suites</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Curated Living Spaces</h2>
              </div>
              <a className="font-label-lg text-label-lg uppercase text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors" href="#">
                <span>View All 14 Residences</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              {/* Suite 1 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Luxurious boutique hotel bedroom with natural linen draped king size bed, exposed rough limestone wall, vintage brass accents, and French arched doors leading to a private sunlit stone patio with pool." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnuWt8Vz02HTiVuHU0Z2YgdEdtRieKtSxcd0taO4zMRsntoHlwnmBIczwa2EYpe84jhDqbkFeFS8DcWKmBhXGqhW36ffL7LGgpOpkOVCr4YpY3HeZ-EA-E4dW55CarMh6gq4qAAAg2eNGrgP_NAh6-EHpcArvtGToY5zckq_2cMCBqiexAGVdMCx6AODv7Yro0jVaBEljhN-bjofg_NFLu5U8PSehoKGhrirVRD2Qm1-xL2ort8Bbx" />
                  <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                    Garden Level
                  </div>
                </div>
                <div className="p-space-lg flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider">Suite 04</span>
                      <span className="font-label-sm text-label-sm text-outline">85 m² · 915 sq ft</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">The Olive Grove Suite</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                      Secluded within private stone courtyard gardens, offering a shaded pergola, handcrafted travertine bathroom, and heated immersion tub.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-space-md">
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Private Plunge Pool</span>
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Travertine Terrace</span>
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">King Feather Bed</span>
                    </div>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-outline block">Starting from</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">€820 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ night</span></span>
                    </div>
                    <button className="px-space-md py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded font-label-md text-label-md uppercase tracking-wider transition-colors" type="button">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
              {/* Suite 2 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="High-end Mediterranean villa terrace with panoramic view of cypress trees and hills at golden hour, private turquoise infinity plunge pool, white daybeds, and wrought iron railings." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuOmd2-a4bGshFvzsMVtREMvaEbcE5z83b4Fnmgdu9lGJiGV-kd8fE4HQ5avbGVkL0SBIiYSlyQOcKCA0ZHXNdau5410nV9D_tDOY4MjjHIFwzQs153FTEYcQGIc233CVdr6xY_7ICY9ZyDWidaU_ooT-wzlsVYFhmRURNYMcROxAkUWjHPxvJ-4hD7XOLlpzkARvVCQVJVruHUv_Ab6mBGYTZI0QJEGmPmY55vDGdrHZcAxcrfi6" />
                  <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                    High Terrazzo
                  </div>
                </div>
                <div className="p-space-lg flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider">Villa 08</span>
                      <span className="font-label-sm text-label-sm text-outline">120 m² · 1,290 sq ft</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">The Travertine Terrace Villa</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                      Elevated vantage point with uninterrupted western sunset vistas, separate fireside living quarters, and private heated infinity dip pool.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-space-md">
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Panoramic Horizon View</span>
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Stone Hearth</span>
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Private Butler</span>
                    </div>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-outline block">Starting from</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">€1,240 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ night</span></span>
                    </div>
                    <button className="px-space-md py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded font-label-md text-label-md uppercase tracking-wider transition-colors" type="button">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
              {/* Suite 3 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Grand presidential master bedroom suite in Italian palazzo with vaulted wooden beamed ceiling, freestanding marble bathtub overlooking open valley, warm ambient lighting and soft linen textiles." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0gOhC8rPOrTxcFPY-xEZSBYZSYm5XQp02TPEHu2iiIm-dr5cB2fwz0_SiaAa7LqH5nzZ33JnrmPbMnawS0gImqQqXAydBq5jNi-ZkO9An7FbRSmjJc5FFcF8gnrIe6vUz5Kop2_NxTcYX3JW7U8FUt8n39v-opKwwT4zCt1GSHY1mjZBHXB8s80ecavYHeCd5sl5U0mRz0bSBAiKg-zC17SQUoEOS3pN4VxzpvO5GEjcrMWVJZ_Vg" />
                  <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                    Top Floor Penthouse
                  </div>
                </div>
                <div className="p-space-lg flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider">Master Residence</span>
                      <span className="font-label-sm text-label-sm text-outline">190 m² · 2,045 sq ft</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">The Belvedere Master Residence</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                      Our signature sanctuary spanning the entire upper east pavilion with 360-degree estate views, dual bathrooms, and curated vintage wine vault.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-space-md">
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Exclusive Wine Cellar</span>
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Dual Balconies</span>
                      <span className="bg-surface-container px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Chauffeur Included</span>
                    </div>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-outline block">Starting from</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">€2,100 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ night</span></span>
                    </div>
                    <button className="px-space-md py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded font-label-md text-label-md uppercase tracking-wider transition-colors" type="button">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Photo Gallery Grid / Scenes of Serenity */}
          <section className="w-full py-space-xl bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="text-center max-w-2xl mx-auto mb-space-xl">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-2">Scenes of Serenity</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">Glimpses into the Estate</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Immerse yourself in gentle mornings, quiet stone cloisters, and amber dusk over the cypress alleys.
                </p>
              </div>
              {/* Asymmetrical Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter auto-rows-[240px]">
                {/* Gallery Item 1 (Span 2 col, 2 row) */}
                <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Aerial view of a shimmering turquoise stone swimming pool surrounded by aged olive trees, lavender bushes, and elegant guests relaxing on cream sunbeds at an Italian boutique resort." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjmK0s6ZCZsY_ixFy8W1UHoQn_yGSodwlniO13D5irawUrt077O-Vj7_OAyJfhC3eztgrZrUBmo6D4_EoSsjqCiM1DeDXU2_zMbkCnHA1OUNUS_ctFkrh-Ke65jvZoHCV_qPwUVBliFJum9Of7vBcy1NC3RPVi_oUHpQWaDef8MYkiAO5TiUn47aekqajKAz5lglG-x4fJERs4O0OjNWuBAaX96lQI1Tf_rxH-KNK3oPzFuXsFNkGF" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-space-md">
                    <span className="text-surface font-label-md text-label-md uppercase tracking-wider">The Central Travertine Pool at Midday</span>
                  </div>
                </div>
                {/* Gallery Item 2 */}
                <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Artfully plated Mediterranean fine dining dish with fresh edible flowers, estate olive oil droplets, and delicate hand-made pasta under warm ambient candlelight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcd-iMmBFJ4EvQ3WEKsXLp7DbwiufkW4SaY0xsvDl8BK_4yB8aDViqJnhiMzbNSyZNq5ksTd8LmSYQH_-joPLt5PUsxAWFsmfItaGHvs0Gw4AqBFRctSt2kMsxRPYd482I1v1ZZE_JKP6KCYCrbd2MV9duNzmHA4l4JZhxIlbk_xKaqRAAzH2KtYIiwA85L8EQm3YeTWfBh6LdBf71bMQYxyTjhzJSF4R7jr5WbC23TnAX88b8x-aZ" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-space-md">
                    <span className="text-surface font-label-md text-label-md uppercase tracking-wider">Ristorante Belvedere Degustation</span>
                  </div>
                </div>
                {/* Gallery Item 3 */}
                <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Close up architectural detail of ancient stone arches with flowering deep pink bougainvillea draping over warm sandstone and iron lanterns in Tuscany." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8loW19ChAZZRDe0stLmAdH14jpOBtD2xOEDcWam4y9SygHnqBsGONII5kOQBsaIDt9AGWEd9ZBmBtC73eldPUGlEAgO1BJPPqi6Yjcxtqt63PsO6e43u4l74KbbXU2XOMLX_excGTAGstEW17vo-Tekkchd4Baw447kGD_romDbKvGbUNr8AwPbyVtNlG6NZCPlAP04nKOYgpz3xLA6oXTbF2mVEGfd6aDdCU5coWWWLGLWhZgrm7" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-space-md">
                    <span className="text-surface font-label-md text-label-md uppercase tracking-wider">Court of Bougainvillea</span>
                  </div>
                </div>
                {/* Gallery Item 4 */}
                <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Intimate candlelit subterranean thermal spa bath with steam rising gently from warm natural mineral waters, surrounded by rough vaulted stone ceilings." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP59uAHdnU-Wo60j9ch3BRkhbPtK3jwd8YqhQkTKgt-KILenIKPbHoIjiQgnnFYRG4aACo9_AQ1x6ZbdNhgr8IHlwY6AKE71GeOhkwyX6A9iLZvxwVaz7bCzMIMJL47dx3jjyVTTDwvdEbqce7Q2cIbicvcwEYDSDKFBng6Y9cVivvRkixL00WSMRoduPrCZbukTk5x3EtAHQ_SMWLX0ZTotgkkKEogbi5r7ub0WlurlzDBRvmWfpp" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-space-md">
                    <span className="text-surface font-label-md text-label-md uppercase tracking-wider">The Roman Thermal Grotto</span>
                  </div>
                </div>
                {/* Gallery Item 5 */}
                <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Classic vintage cream Alfa Romeo convertible parked along a picturesque gravel lane lined with tall green cypress trees overlooking golden Tuscan hills." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD29O4JZsyAlX9dIjkYg3kyw8G1vZ0gFCWAbXRsjIiJGFL-8VgkHq6T87dbIAE8EqMVxifTFDH7NdWeqv_VY2YjSYjcpyluAuxOzlKRVHsKnYxWX3Q1yavM3CUxC3JEVmsMZMT65UP79vj185Vy39iG_dg1wPAfAJG686UuSemjDoP7UcsrQ7qSRk2UURgHZbtMMLub72rTkLcYnBpbPBT0YyJuKsGhxB2Dg3dt998AKFiyzZtPGvUe" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-space-md">
                    <span className="text-surface font-label-md text-label-md uppercase tracking-wider">Alfa Romeo Countryside Trails</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Guest Reflections & Testimonials Section */}
          <section className="w-full py-space-xl max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
              <div>
                <div className="flex items-center gap-space-xs text-secondary mb-2">
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold ml-1">4.98 / 5.00</span>
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-2">Guest Reflections</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Voices of Tranquility</h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Independent feedback compiled from over 340 discerning international travelers and verified private stays.
              </p>
            </div>
            {/* Review Cards Carousel / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Review 1 */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-secondary mb-space-md">
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-surface italic leading-snug mb-space-md">
                    “Villa Aurelia redefines Mediterranean stillness. Waking to the gentle chime of distant bells across the cypress valley is something our family will cherish forever.”
                  </p>
                </div>
                <div className="pt-space-md">
                  <div className="font-label-lg text-label-lg text-on-surface">Eleanor Vance-Croft</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Stayed Sept 2024 · London, UK</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm uppercase">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Verified Guest
                  </div>
                </div>
              </div>
              {/* Review 2 */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-secondary mb-space-md">
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-surface italic leading-snug mb-space-md">
                    “The gastronomy by Chef Matteo is worth the journey alone. Every ingredient arrived warm from the estate garden, executed with sublime Michelin precision.”
                  </p>
                </div>
                <div className="pt-space-md">
                  <div className="font-label-lg text-label-lg text-on-surface">Marc &amp; Sylvie Dubois</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Stayed Aug 2024 · Geneva, Switzerland</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm uppercase">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Condé Nast Traveler Member
                  </div>
                </div>
              </div>
              {/* Review 3 */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-secondary mb-space-md">
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-surface italic leading-snug mb-space-md">
                    “The Roman baths carved into the subterranean bedrock provide pure magic after a day exploring Montalcino vineyards. Concierge service is discreet and unmatched.”
                  </p>
                </div>
                <div className="pt-space-md">
                  <div className="font-label-lg text-label-lg text-on-surface">Julian Thorne</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Stayed July 2024 · New York, USA</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm uppercase">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Private Residence Guest
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Location & Arrival Map Teaser */}
          <section className="w-full bg-surface-container-low py-space-xl">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              <div className="lg:col-span-5 flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary mb-2">Location &amp; Access</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-md">
                  Perched Between Sky and Vineyards
                </h2>
                <div className="space-y-space-sm font-body-md text-body-md text-on-surface-variant mb-space-md">
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-1">flight</span>
                    <span>Florence Peretola Airport: 75 min via private estate limousine</span>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-1">directions_car</span>
                    <span>Siena &amp; Montalcino: 20-30 min picturesque scenic drive</span>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-1">helicopter</span>
                    <span>Private on-site certified helipad available upon reservation</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <a className="px-space-md py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded font-label-md text-label-md uppercase tracking-wider transition-colors inline-flex items-center gap-2" href="#">
                    <span>Arrange Arrival</span>
                    <span className="material-symbols-outlined text-[16px]">navigation</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="w-full h-80 lg:h-96 rounded-xl shadow-lg bg-cover bg-center relative overflow-hidden" data-location="Val d'Orcia, Tuscany, Italy" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgBqOnz15i9Z591Xngxqq2eS-kd1xyUWkAjP57JD8XpZyWqlWZJjPYAAOYnqmuSuc_PaFXtLelC8qdyAEplLb-PyypuBEfKlhNvht0IoSto4qeGhBle9fGsnwp7XY0gg8S9o13SIXpJE62fvTFltShLN5f9Z6DjUPMXxKoMBLz5LEYhGSjlrNo4NbP-PQfA-z3lfoMCdgVG6tngarFdt3CJ3DxNRNVK7cKToQkJqsvssApR5zRz1xI")'}}>
                  <div className="absolute inset-0 bg-on-surface/10 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-space-xs rounded shadow-md">
                    <span className="font-label-sm text-label-sm uppercase text-primary font-bold block">Villa Aurelia Grounds</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Val d'Orcia, Tuscany, Italy</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Final Call to Action */}
          <section className="w-full py-space-xl bg-surface text-center">
            <div className="max-w-3xl mx-auto px-margin md:px-margin-tablet">
              <span className="material-symbols-outlined text-[40px] text-primary mb-space-xs">spa</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
                Begin Your Mediterranean Journey
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-lg">
                Allow our concierge team to craft an intimate escape attuned to your personal cadence. Reserve directly for priority suite allocation and vintage cellar tasting privileges.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-space-sm">
                <a className="px-space-xl py-3.5 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider rounded transition-all shadow-md" href="#suites">
                  Check Available Dates
                </a>
                <a className="px-space-lg py-3.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2" href="tel:+39089875110">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Contact Concierge</span>
                </a>
              </div>
            </div>
          </section>
        </div></main>

    </div>
  )
}
