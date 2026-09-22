import Link from "next/link"

export const metadata = {
  title: "Amenities & Facilities | Villa Aurelia",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

export default function AmenitiesPage() {
  return (
    <div className="bg-surface">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Sub-Hero Editorial Intro */}
          <section className="relative w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-space-lg md:pt-space-xl pb-space-lg">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-[0.22em] mb-space-sm bg-surface-container-high px-3 py-1.5 rounded">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  <span>Estate Experiences &amp; Comforts</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight mb-space-sm">
                  Everything you need for a <span className="italic font-normal">perfect stay.</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  From sun-drenched cliffside infinity baths to sommelier tastings and silent wellness sanctuaries, immerse in the understated luxuries of Villa Aurelia.
                </p>
              </div>
              {/* Quick Metrics Counter Group */}
              <div className="flex items-center gap-space-md lg:gap-space-lg bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-sm self-start lg:self-end">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary">10</span>
                  <span className="font-label-sm text-label-sm uppercase text-outline">Sanctuaries</span>
                </div>
                <div className="w-px h-8 bg-surface-variant" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary">24h</span>
                  <span className="font-label-sm text-label-sm uppercase text-outline">Concierge</span>
                </div>
                <div className="w-px h-8 bg-surface-variant" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-secondary">100%</span>
                  <span className="font-label-sm text-label-sm uppercase text-outline">Estate Fiber</span>
                </div>
              </div>
            </div>
            {/* Filter Navigation Pills */}
            <div className="mt-space-lg flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="amenity-filters">
              <button className="filter-pill bg-primary text-on-primary font-label-md text-label-md uppercase px-5 py-2.5 rounded transition-all shadow-sm shrink-0" data-filter="all">
                All Amenities
              </button>
              <button className="filter-pill bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md uppercase px-5 py-2.5 rounded transition-all shrink-0" data-filter="wellness">
                Wellness &amp; Spa
              </button>
              <button className="filter-pill bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md uppercase px-5 py-2.5 rounded transition-all shrink-0" data-filter="dining">
                Culinary &amp; Dining
              </button>
              <button className="filter-pill bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md uppercase px-5 py-2.5 rounded transition-all shrink-0" data-filter="estate">
                Estate Services
              </button>
              <button className="filter-pill bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md uppercase px-5 py-2.5 rounded transition-all shrink-0" data-filter="connectivity">
                Connectivity &amp; Business
              </button>
            </div>
          </section>
          {/* Bento Grid Showcase */}
          <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pb-space-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-desktop items-stretch" id="amenities-container">
              {/* 1. Swimming Pool (Featured Wide Bento: 12 Cols) */}
              <div className="amenity-card lg:col-span-12 group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 flex flex-col lg:flex-row" data-category="wellness estate">
                <div className="lg:w-7/12 relative overflow-hidden min-h-[320px] md:min-h-[420px]">
                  <img alt="Cliffside Infinity Solarium & Pool" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEtArWSfCOY0atuY0bMiUDFkFvmwvINXgoJ1k5u5WGOIFWpWYqAICT-U7y5gmQSgm2d9S06vKDNCaMTZpJ5xmlLba-FGgsqcH7NmwRBUrQ9E6uxR7V4VfjNFXmS5HQsOZseylIlglvzjuMxb63n_7eUygBQvICVT8HcFnsaSRWpyN9G3T4zfrHb7X-ZMzKeBOIzROTPhtu-7oCvyX0AyJn6WNyRfImri-ZwRLTDhY1PlNqmt4VqlvY" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm uppercase px-3 py-1 rounded shadow-sm">
                      Panoramic Cliffside
                    </span>
                    <span className="bg-primary text-on-primary font-label-sm text-label-sm uppercase px-3 py-1 rounded shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">pool</span> Featured
                    </span>
                  </div>
                </div>
                <div className="lg:w-5/12 p-space-md md:p-space-lg flex flex-col justify-between bg-surface-container-lowest">
                  <div>
                    <div className="flex items-center gap-2 text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">
                      <span className="material-symbols-outlined text-primary text-[20px]">waves</span>
                      <span>Sanctuary No. 01 • Cliff Edge</span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Cliffside Infinity Solarium &amp; Pool</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                      Heated seawater infinity pool suspended over the Amalfi coastline, lined with terracotta daybeds, dedicated pool attendants, and refreshing citrus spritzes.
                    </p>
                    <div className="bg-surface-container-low p-space-sm rounded-lg space-y-2 mb-space-md">
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface">
                        <span className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md uppercase">
                          <span className="material-symbols-outlined text-secondary text-[18px]">water_lux</span> Water Temp
                        </span>
                        <span className="font-semibold">28°C Constant Heated Seawater</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface">
                        <span className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md uppercase">
                          <span className="material-symbols-outlined text-secondary text-[18px]">deck</span> Loungers
                        </span>
                        <span className="font-semibold">Complimentary Bespoke Terry Bedding</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-sm bg-surface-container-low/60 -mx-space-md -mb-space-md md:-mx-space-lg md:-mb-space-lg p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                      <span>Daily: 07:30 – 19:30 · Sunset Cocktails: 18:00 – 21:00</span>
                    </div>
                    <a className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-md text-label-md uppercase transition-colors" data-path="reservation" href="#">
                      Cabana Inquiry <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* 2. Spa & Wellness (Prominent 7 Cols) */}
              <div className="amenity-card lg:col-span-7 group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 flex flex-col" data-category="wellness">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img alt="The Travertine Thermal Spa & Baths" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtHUoDDnWvufsm4bcw18rtHo84h3oiBAP0v8Ils3_jm36_BXO-UNnm30fjpi_MHkNf1uds5uxTHqgLQAPd_TKWcd9V7u8CHlCnsBOU4heY1J-TOOHadDCKRCeHY1UcDtHJ1khx3pd2p21UjjVfMe_CSMjSecewPfdbj3zL6zupEZjHUubJE452mrHVzGXLFWz-ZUpPj1Lpe3OoRjZEJ7nPGMk0tXm2ST3nS_ewaXUXOtYCuskk1nsm" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm uppercase px-3 py-1 rounded shadow-sm">
                      Holistic Sanctuary
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded">Roman Tepidarium</span>
                    <span className="font-label-sm text-label-sm">Citrus botanical cures</span>
                  </div>
                </div>
                <div className="p-space-md md:p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">
                      <span className="material-symbols-outlined text-primary text-[20px]">spa</span>
                      <span>Sanctuary No. 02</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">The Travertine Thermal Spa &amp; Baths</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                      Carved Roman stone tepidarium, eucalyptus steam grottos, and bespoke olive oil and citrus botanical therapies curated by estate herbalists.
                    </p>
                  </div>
                  <div className="pt-space-sm bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                      <span>Daily: 09:00 – 20:30 (Private Twilight Bookings Available)</span>
                    </div>
                    <a className="text-primary hover:text-primary-container font-label-md text-label-md uppercase flex items-center" data-path="wellness-and-spa" href="#">
                      Spa Menu <span className="material-symbols-outlined text-[16px] ml-0.5">chevron_right</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* 3. Restaurant & Bar (Prominent 5 Cols) */}
              <div className="amenity-card lg:col-span-5 group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 flex flex-col" data-category="dining">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img alt="Ristorante Belvedere & Terrace Bar" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjMOM3Xue2g_oYioQVSs_ezRvWvFBUrfAAwtR67VuvRcCNuNbWXy9yItuqg5qtsffOnuL7jYdpd3XNvxD0O2917L8mS02iujKlv96W_sK4L7xVn74KAPypMSKCulIu5AybZwnXkuJDKFf5pY9SQZUceCOt533Pn7Ac434PR3iGtExaQeWQX_UW7JQ44agNzHJlBLzFYUDBaN8li42toSrMgB-gp-csJpxj_WyjUTgn5sovI1tHy0Yo" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-3 py-1 rounded shadow-sm">
                      Michelin Recognized
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-on-primary font-label-sm text-label-sm uppercase tracking-widest bg-tertiary/70 backdrop-blur-md px-2.5 py-1 rounded">
                    Campania Wine Cellar
                  </div>
                </div>
                <div className="p-space-md md:p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">
                      <span className="material-symbols-outlined text-primary text-[20px]">restaurant</span>
                      <span>Sanctuary No. 03</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Ristorante Belvedere &amp; Terrace Bar</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                      Farm-to-table coastal Campanian gastronomy overseen by Chef Giancarlo, paired with vintage Campania cellars overlooking the Gulf.
                    </p>
                  </div>
                  <div className="pt-space-sm bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1 text-on-surface-variant font-label-sm text-label-sm">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                      <span>Breakfast: 07:00 – 11:00 · Lunch: 12:30 – 15:30</span>
                    </div>
                    <div className="pl-5 text-outline">Dinner: 19:30 – 23:00</div>
                  </div>
                </div>
              </div>
              {/* 4. Fitness Center (6 Cols) */}
              <div className="amenity-card lg:col-span-6 group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 flex flex-col" data-category="wellness">
                <div className="relative h-60 overflow-hidden">
                  <img alt="Arched Garden Wellness Studio" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBchpT7qCkdAOUlSigKJ6e6yJsiEii4tjRG39V6sfOYBiHJ_FE11II_hgBOyHn-c8bnp0Kf-VFI2_4ADiCX81OlTpFhU_hCMV5BTTGH4ygczvVIDTFGNib5hU40JR9WgX9aD88IYCSkjgZXcpn4RKFGvYI9epiECdARJ4XS9Me6T0a_WV8N2Oa_ng5VQ-QJoLEmH-vwuMPo6YvVdEzsiGoCjw_aRU_8ZraLuIUvmsrlAszLQBKVT466" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm uppercase px-3 py-1 rounded shadow-sm">
                      Garden Panorama
                    </span>
                  </div>
                </div>
                <div className="p-space-md md:p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">
                      <span className="material-symbols-outlined text-primary text-[20px]">fitness_center</span>
                      <span>Sanctuary No. 04</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Arched Garden Wellness Studio</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                      Artisan wooden fitness pavilion fitted with custom Technogym Artis series, Reformer Pilates, and private sunrise yoga sessions amid the lemon groves.
                    </p>
                  </div>
                  <div className="pt-space-sm bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="material-symbols-outlined text-[16px] text-primary">key</span>
                      24/7 Keycard Access · Personal Instruction: 07:00 – 18:00
                    </span>
                  </div>
                </div>
              </div>
              {/* 5. High-Speed Fiber Wi-Fi (Card 6 Cols) */}
              <div className="amenity-card lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between relative overflow-hidden" data-category="connectivity">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[28px]">wifi</span>
                    </div>
                    <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase px-3 py-1 rounded">
                      Complimentary • Entire Estate
                    </span>
                  </div>
                  <div className="text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">Infrastructure</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Complimentary Ultra-Speed Wi-Fi</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Enterprise-grade 1 Gbps symmetric fiber throughout the entire estate, including secluded garden cabanas and private boat mooring.
                  </p>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg grid grid-cols-2 gap-2 text-center">
                  <div className="p-2">
                    <div className="font-headline-sm text-headline-sm text-primary leading-none">1 Gbps</div>
                    <div className="font-label-sm text-label-sm uppercase text-outline mt-1">Symmetric Speed</div>
                  </div>
                  <div className="p-2">
                    <div className="font-headline-sm text-headline-sm text-secondary leading-none">100%</div>
                    <div className="font-label-sm text-label-sm uppercase text-outline mt-1">Grounds Coverage</div>
                  </div>
                </div>
              </div>
              {/* 6. Private Airport & Chauffeur Shuttle (4 Cols) */}
              <div className="amenity-card lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between" data-category="estate">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                    <span className="material-symbols-outlined text-[28px]">directions_car</span>
                  </div>
                  <div className="text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">Transfers &amp; Voyages</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Mercedes-Maybach &amp; Riva Shuttle</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Seamless transfers connecting Naples International (NAP), Rome Fiumicino, and private Riva speed-launch coastal tenders to Capri.
                  </p>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  <span>24/7 On-Demand Concierge Dispatch</span>
                </div>
              </div>
              {/* 7. Valet & Private Secure Parking (4 Cols) */}
              <div className="amenity-card lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between" data-category="estate">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                    <span className="material-symbols-outlined text-[28px]">local_parking</span>
                  </div>
                  <div className="text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">Secure Facilities</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Private Valet &amp; Secure Underground Garage</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Complimentary covered parking with automated valet retrieval, 22kW EV fast charging stations, and estate wash service.
                  </p>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">ev_station</span>
                  <span>24-Hour Attended Valet · 22kW EV Fast Charge</span>
                </div>
              </div>
              {/* 8. Pet-Friendly Hospitality (4 Cols) */}
              <div className="amenity-card lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between" data-category="estate">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[28px]">pets</span>
                    </div>
                    <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Welcome Amenities
                    </span>
                  </div>
                  <div className="text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">Gentle Companions</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Bespoke Canine &amp; Pet Concierge</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Custom organic orthopaedic bedding, gourmet in-suite pet culinary menu, coastal walking guides, and vetted sitting services.
                  </p>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">award_star</span>
                  <span>Organic Treats &amp; Custom Bowls Ready in Suite</span>
                </div>
              </div>
              {/* 9. Private Business Atelier & Boardroom (6 Cols) */}
              <div className="amenity-card lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between" data-category="connectivity">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                    <span className="material-symbols-outlined text-[28px]">menu_book</span>
                  </div>
                  <div className="text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">Executive Quietude</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">The Lemon Grove Library &amp; Atelier</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Private soundproof executive salon with 4K teleconferencing, high-resolution printing, vintage fountain pens, and discreet butler service.
                  </p>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                    <span>08:00 – 22:00 (Private Buyouts Available)</span>
                  </div>
                  <span className="text-primary font-semibold">Accommodates up to 14 Guests</span>
                </div>
              </div>
              {/* 10. 24-Hour In-Suite Dining (6 Cols) */}
              <div className="amenity-card lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between" data-category="dining estate">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                    <span className="material-symbols-outlined text-[28px]">room_service</span>
                  </div>
                  <div className="text-outline mb-space-xs font-label-sm text-label-sm uppercase tracking-widest">Discreet Service</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">24-Hour In-Suite Private Dining</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Full à la carte estate menu served in the privacy of your sea-view terrace, with sommelier pairings and midnight silver-tray offerings.
                  </p>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                    <span>Available 24 Hours Daily</span>
                  </div>
                  <span className="text-secondary font-semibold">Direct Butler Call via iPad</span>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Facility Features Ribbon */}
          <section className="w-full bg-surface-container-low py-space-xl">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="text-center max-w-2xl mx-auto mb-space-lg">
                <span className="text-primary font-label-sm text-label-sm uppercase tracking-[0.2em]">Signature Standards</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1">The Villa Aurelia Standard of Ease</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-sm">
                    <span className="material-symbols-outlined text-[24px]">verified_user</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Uncompromising Privacy</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Private gated promontory with dedicated perimeter security and private cliff landings.</p>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-space-sm">
                    <span className="material-symbols-outlined text-[24px]">eco</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Artisanal &amp; Sustainable</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Estate olive oil pressing, solar heating for thermal baths, and zero single-use materials.</p>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-space-sm">
                    <span className="material-symbols-outlined text-[24px]">concierge</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Dedicated Host Butler</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Every suite is assigned an attentive personal concierge to arrange private departures and bespoke excursions.</p>
                </div>
              </div>
            </div>
          </section>
          {/* Concierge Direct Inquiry & Private Buyout Section */}
          <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
            <div className="relative bg-gradient-to-br from-primary-container to-primary text-on-primary rounded-xl overflow-hidden shadow-md p-space-md md:p-space-xl">
              {/* Decorative Travertine Aura SVG */}
              <svg className="absolute right-0 top-0 w-96 h-96 opacity-10 pointer-events-none" fill="currentColor" viewBox="0 0 100 100">
                <circle cx={80} cy={20} r={40} />
                <circle cx={90} cy={50} r={30} />
              </svg>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                <div className="lg:col-span-7">
                  <span className="bg-surface-container-lowest/20 text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-3 py-1 rounded inline-block mb-space-sm">
                    Tailored Estate Experiences
                  </span>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary leading-tight mb-space-xs">
                    Need a custom arrangement or private facility buyout?
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-primary/90 max-w-xl mb-space-md leading-relaxed">
                    Our head concierge coordinates exclusive terrace solarium buyouts, secluded cliffside candlelight dining, private helicopter charters, and wellness retreats tailored to your exact itinerary.
                  </p>
                  <div className="flex flex-wrap items-center gap-space-md text-on-primary">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                      <span className="font-body-md text-body-md font-semibold">+39 089 875 110</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-on-primary/40 hidden sm:block" />
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                      <a className="font-body-md text-body-md underline hover:text-primary-fixed transition-colors" href="https://wa.me/39089875110" rel="noopener noreferrer" target="_blank">
                        WhatsApp Concierge Desk
                      </a>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch">
                  <a className="bg-surface text-primary hover:bg-surface-bright font-label-lg text-label-lg uppercase px-space-md py-4 rounded text-center transition-all shadow-md font-semibold" data-path="reservation" href="#">
                    Reserve Suite with Amenities
                  </a>
                  <button className="bg-transparent hover:bg-on-primary/10 text-on-primary font-label-lg text-label-lg uppercase px-space-md py-3.5 rounded text-center transition-colors" type="button">
                    Inquire for Private Buyout
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Concierge Direct Modal (Client-side Interaction) */}
          <div className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm" id="concierge-modal">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl p-space-lg shadow-xl relative animate-in fade-in duration-200">
              <button className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1" type="button">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
              <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest mb-1">
                <span className="material-symbols-outlined text-[18px]">support_agent</span> Direct Liaison
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Concierge Buyout Inquiry</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Please specify your dates and preferred facility (Infinity Pool Solarium, Belvedere Restaurant, or Lemon Grove Atelier). Our head concierge will respond within two hours.
              </p>
              <form className="space-y-3">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-outline mb-1">Full Name</label>
                  <input className="w-full px-3 py-2 text-body-md font-body-md bg-surface-container-low text-on-surface rounded focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Lord / Lady / Dr. / Mr. / Ms." required type="text" />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-outline mb-1">Email or Phone</label>
                  <input className="w-full px-3 py-2 text-body-md font-body-md bg-surface-container-low text-on-surface rounded focus:outline-none focus:ring-1 focus:ring-primary" placeholder="contact@domain.com or WhatsApp number" required type="text" />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-outline mb-1">Facility or Arrangement Requested</label>
                  <select className="w-full px-3 py-2 text-body-md font-body-md bg-surface-container-low text-on-surface rounded focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Entire Estate Solarium &amp; Pool Buyout</option>
                    <option>Private Twilight Roman Bath Spa Experience</option>
                    <option>Ristorante Belvedere Sunset Terrace Buyout</option>
                    <option>The Lemon Grove Library &amp; Atelier Boardroom</option>
                    <option>Private Riva Yacht Tender Charter to Capri</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-outline mb-1">Notes &amp; Target Dates</label>
                  <textarea className="w-full px-3 py-2 text-body-md font-body-md bg-surface-container-low text-on-surface rounded focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Preferred dates, guest count, and any bespoke catering desires..." rows={3} defaultValue={""} />
                </div>
                <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase py-3 rounded transition-colors mt-2" type="submit">
                  Dispatch Inquiry to Head Concierge
                </button>
              </form>
            </div>
          </div>
          {/* Client-side Bento Filter Logic */}
        </div></main>

    </div>
  )
}
