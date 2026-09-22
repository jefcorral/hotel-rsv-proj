import Link from "next/link"

export const metadata = {
  title: "Guest Reviews | Villa Aurelia",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

export default function ReviewsPage() {
  return (
    <div className="bg-surface">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Top Ambient Glow & Title Hero */}
          <section className="relative w-full overflow-hidden bg-surface pt-12 pb-16">
            <div className="pointer-events-none absolute -top-24 right-0 w-[550px] h-[550px] rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full bg-secondary/10 blur-3xl" />
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop relative z-10">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-secondary/10 text-secondary mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-on-secondary-container">Patron Chronicles • Positano</span>
                </div>
                <h1 className="font-display text-headline-lg md:text-display text-on-surface tracking-tight leading-tight mb-5">
                  Words from Our Esteemed Guests
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Reflections of unhurried elegance, sensory intimacy, and coastal stillness etched high above the Tyrrhenian azure. Here, our patrons chronicle the memories forged within our cliffside walls.
                </p>
              </div>
              {/* Executive Rating Breakdown Bento Card */}
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-6 md:p-10 lg:p-12 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  {/* Column 1: Overall Score & Global Honors (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-lg bg-surface-container-low shadow-sm">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Executive Appraisal</span>
                      <div className="flex items-baseline gap-3 mt-3">
                        <span className="font-display text-display text-on-surface leading-none">4.96</span>
                        <span className="font-headline-sm text-headline-sm text-on-surface-variant">/ 5.0</span>
                      </div>
                      {/* Stars */}
                      <div className="flex items-center gap-1 mt-3 text-secondary">
                        <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        <span className="ml-2 font-label-md text-label-md text-on-surface font-semibold">Flawless</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        Derived from 342 authentic stays logged by our Majordomo Registry.
                      </p>
                    </div>
                    <div className="mt-8 pt-6 space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded bg-surface-container-lowest shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[20px]">workspace_premium</span>
                        <span className="font-label-sm text-label-sm text-on-surface leading-snug">
                          Condé Nast Traveler Readers' Choice 2024 · #1 Amalfi Sanctuary
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                        <span>100% Verified Stays via Atelier Concierge Desk</span>
                      </div>
                    </div>
                  </div>
                  {/* Column 2: Category Rating Progress Meters (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col justify-between py-2">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Dimensions of Luxury</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-6">Service Audits</h3>
                    </div>
                    <div className="space-y-4">
                      {/* Cleanliness */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="text-on-surface font-medium">Cleanliness &amp; Linen Sanity</span>
                          <span className="font-semibold text-primary">5.0 / 5.0</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container rounded-full transition-all duration-1000" style={{width: '100%'}} />
                        </div>
                      </div>
                      {/* Service & Majordomo */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="text-on-surface font-medium">Service &amp; Majordomo Care</span>
                          <span className="font-semibold text-primary">5.0 / 5.0</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container rounded-full transition-all duration-1000" style={{width: '100%'}} />
                        </div>
                      </div>
                      {/* Location & Sea Panorama */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="text-on-surface font-medium">Location &amp; Sea Panorama</span>
                          <span className="font-semibold text-primary">4.9 / 5.0</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container rounded-full transition-all duration-1000" style={{width: '98%'}} />
                        </div>
                      </div>
                      {/* Comfort & Sleep Sanctuary */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="text-on-surface font-medium">Comfort &amp; Sleep Sanctuary</span>
                          <span className="font-semibold text-primary">4.9 / 5.0</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container rounded-full transition-all duration-1000" style={{width: '98%'}} />
                        </div>
                      </div>
                      {/* Value & Unhurried Luxury */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                          <span className="text-on-surface font-medium">Value &amp; Unhurried Luxury</span>
                          <span className="font-semibold text-primary">4.9 / 5.0</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container rounded-full transition-all duration-1000" style={{width: '98%'}} />
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                      <span>Third-party audited bi-annually</span>
                      <span className="font-medium text-secondary">Amalfi Hospitality Guild</span>
                    </div>
                  </div>
                  {/* Column 3: Submit Invitation (4 cols) */}
                  <div className="lg:col-span-4 rounded-lg bg-surface-container-high p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                    <div className="pointer-events-none absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-primary-container/10 blur-2xl" />
                    <div>
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Share Your Villa Experience</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                        Were you a recent patron at Villa Aurelia? We warmly invite you to chronicle your moments and guide discerning future travelers.
                      </p>
                    </div>
                    <div className="mt-6 space-y-3">
                      <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase py-3.5 px-6 rounded transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                        <span>Write a Patron Review</span>
                        <span className="material-symbols-outlined text-[18px]">north_east</span>
                      </button>
                      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                        <span>Reservation code required (e.g. VA-8921)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Filter, Search & Sorting Controls Bar */}
              <div className="w-full bg-surface-container-low rounded-lg p-4 md:p-5 shadow-sm mb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Search input */}
                  <div className="md:col-span-4 relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                    <input className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-4 py-2.5 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search reviews by suite, amenity, or keyword..." type="text" />
                  </div>
                  {/* Suite Category Select */}
                  <div className="md:col-span-3">
                    <select className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3.5 py-2.5 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer appearance-none bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]">
                      <option value="all">All Suites &amp; Residences</option>
                      <option value="belvedere">The Belvedere Grand Master Suite</option>
                      <option value="cliffside">Cliffside Promontory Villa</option>
                      <option value="lemon">Lemon Grove Deluxe Terrace</option>
                      <option value="olive">Olive Grove Arched Chamber</option>
                      <option value="buyout">Private Estate Buyout</option>
                    </select>
                  </div>
                  {/* Guest Category Select */}
                  <div className="md:col-span-3">
                    <select className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3.5 py-2.5 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                      <option value="all">All Travel Companionships</option>
                      <option value="couples">Couples &amp; Honeymoons</option>
                      <option value="solo">Solo Literary &amp; Spa Retreats</option>
                      <option value="family">Family Gathering</option>
                      <option value="buyout">Private Celebration Buyouts</option>
                    </select>
                  </div>
                  {/* Sorting Dropdown */}
                  <div className="md:col-span-2">
                    <select className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3.5 py-2.5 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                      <option value="recent">Sort: Most Recent</option>
                      <option value="highest">Sort: Highest Rated</option>
                      <option value="stay">Sort: Longest Stay</option>
                    </select>
                  </div>
                </div>
                {/* Active Filter Chips / Indicators */}
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="text-outline uppercase tracking-wider">Active Filters:</span>
                  <span className="px-2.5 py-1 bg-surface-container-highest rounded text-on-surface flex items-center gap-1.5">
                    Season: 2024–2025
                    <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-primary">close</span>
                  </span>
                  <span className="px-2.5 py-1 bg-surface-container-highest rounded text-on-surface flex items-center gap-1.5">
                    Verified Stays Only
                    <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-primary">close</span>
                  </span>
                  <button className="text-primary hover:underline ml-auto font-semibold">Reset Filters</button>
                </div>
              </div>
              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {/* Card 1: Lord Julian & Lady Camilla Sterling */}
                <article className="bg-surface-container-lowest rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Header: Guest Meta & Rating */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center shadow-inner shrink-0">
                          JS
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                            Lord Julian &amp; Lady Camilla Sterling
                          </h4>
                          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                            <span>London, United Kingdom</span>
                            <span>•</span>
                            <span className="text-primary font-semibold">Verified Atelier Stay • 5 Nights</span>
                          </div>
                        </div>
                      </div>
                      {/* Rating & Date */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center text-secondary justify-end">
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline mt-1 block">September 2024</span>
                      </div>
                    </div>
                    {/* Suite Identification Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm mb-4">
                      <span className="material-symbols-outlined text-[15px]">villa</span>
                      <span>The Belvedere Grand Master Suite</span>
                    </div>
                    {/* Review Title & Paragraph */}
                    <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      “An ethereal sanctuary beyond all worldly expectations.”
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                      From the private Riva boat tender transfer from Capri to the candlelit terrace dining at Ristorante Belvedere, Villa Aurelia redefines Mediterranean hospitality. Our majordomo Marco anticipated every unspoken desire — drawing eucalyptus baths after our hike down the Path of the Gods and arranging a vintage Alfa Romeo day trip to Ravello. The sunrise over the Amalfi cliffside from the bedroom veranda will remain etched in our hearts forever.
                    </p>
                    {/* Image Mosaic Thumbnail */}
                    <div className="w-full h-44 rounded-lg overflow-hidden mb-6 shadow-sm">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Sun-drenched private marble terrace of a luxury suite in Positano with panoramic views of the turquoise Mediterranean Sea and distant cliffside villages bathed in golden morning light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf_FkYBkAKrrKtzpJ8fCY1ZxElW42Dy346SsX7QD2N9e_b-k4vZUXvRiBbH03iCy2zwwUvBslFt4tbUtZ2ziNgyWJC7uHju0ZNVekkxKF8Bl17hDeJegir4DQHfj3GbtmiTxu1pQ259D3kejUJ_OhRTFuUsnaaPZeE_Fm4008UP31h88yZdn0VlT94GjHfPmXMQ5EVhh3x-bqft1pxNdTh8ahom98eCSYUmbtP4O0DSf3Xn-lHDIg_" />
                    </div>
                  </div>
                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Private Infinity Pool</span>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Butler Service</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      <span>Helpful (38)</span>
                    </button>
                  </div>
                </article>
                {/* Card 2: Dr. Alistair & Elena Vance */}
                <article className="bg-surface-container-lowest rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-secondary text-on-secondary font-headline-sm text-headline-sm flex items-center justify-center shadow-inner shrink-0">
                          AV
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                            Dr. Alistair &amp; Elena Vance
                          </h4>
                          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                            <span>Geneva, Switzerland</span>
                            <span>•</span>
                            <span className="text-primary font-semibold">Verified Stay • 7 Nights</span>
                          </div>
                        </div>
                      </div>
                      {/* Rating & Date */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center text-secondary justify-end">
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline mt-1 block">August 2024</span>
                      </div>
                    </div>
                    {/* Suite Identification Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm mb-4">
                      <span className="material-symbols-outlined text-[15px]">villa</span>
                      <span>Cliffside Promontory Villa</span>
                    </div>
                    {/* Review Title & Paragraph */}
                    <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      “A masterpiece of travertine stone, silence, and discreet service.”
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                      In an Amalfi coast bustling with tourist fervor, Villa Aurelia exists as an untouchable haven of peace. The subterranean Roman tepidarium is pure architectural poetry, and the morning breakfasts featuring citrus freshly harvested from the villa's orchards were divine. The complete absence of noise except for the gentle tide 220 meters below made this the most restful week of our lives.
                    </p>
                    {/* Image Mosaic Thumbnail */}
                    <div className="w-full h-44 rounded-lg overflow-hidden mb-6 shadow-sm">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Ancient style Roman spa tepidarium with warm travertine stone walls, serene emerald thermal water pools, and flickering candlelight in arched stone alcoves." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvrRyO9xw3VSWyRoj34HjHYXVlGgkH9n_J2ZYMpfRb55WM72TgEdZqwuVXUYQgydcRvDEpCY4igeyh0SPCCLyTHSMLmi4PxtNwSvcKW3PDrDjRPxgsqpPK1oe7m-9HWFm3hp7_8UJEc6Ha1SQaTenqHY9aLWhlgUNz3BJm_BWBd35BKO72FKlNOKJPHe0bimBi1A3LoT-3uGcWzjRnY9TjJ5n2POGB-5j-OiYEsaqOulyV27V4Rv2B" />
                    </div>
                  </div>
                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Thermal Grotto</span>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Heli Transfer</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      <span>Helpful (29)</span>
                    </button>
                  </div>
                </article>
                {/* Card 3: Sofia Chen-Montague */}
                <article className="bg-surface-container-lowest rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-tertiary-container text-on-tertiary font-headline-sm text-headline-sm flex items-center justify-center shadow-inner shrink-0">
                          SC
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                            Sofia Chen-Montague
                          </h4>
                          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                            <span>San Francisco, USA</span>
                            <span>•</span>
                            <span className="text-primary font-semibold">Verified Stay • 4 Nights</span>
                          </div>
                        </div>
                      </div>
                      {/* Rating & Date */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center text-secondary justify-end">
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline mt-1 block">July 2024</span>
                      </div>
                    </div>
                    {/* Suite Identification Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm mb-4">
                      <span className="material-symbols-outlined text-[15px]">villa</span>
                      <span>Lemon Grove Deluxe Terrace</span>
                    </div>
                    {/* Review Title & Paragraph */}
                    <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      “Unmatched culinary heights and flawless sunset aperitivos.”
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                      Chef Giancarlo and the sommelier team crafted memories we will talk about for decades. The private wine tasting in the volcanic stone cellar paired with rare Campanian vintages was a masterclass. Dining outdoors under the fairy-lit olive boughs with the sparkling Positano lights in the distance felt like a scene from an Italian dream.
                    </p>
                    {/* Image Mosaic Thumbnail */}
                    <div className="w-full h-44 rounded-lg overflow-hidden mb-6 shadow-sm">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Atmospheric candlelit dining table set under lush Mediterranean olive branches and lemon trees at twilight, overlooking the illuminated cliffs of Positano." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTiTPe3FExw4an7LB0-fALXzoPgRgvWphMnNBGyRuiZU7iTQ9uVfpF9mZuCqRfnhTs8l1rTlP-GZjypqZZMxoOgrwRoZXpN3slcKU8Egt8XlLu8anFH6S9PaDLSVitFtBpzd4mTtbl8WXbi6n56L8QPkTBxP3JOQUofqhZFVzxZAA4N1258Vq0VjbYsut7B54CLhhNuP5TgUNP19HP9u7qhP3VO8z2Gz6XC5A2k65pRvkvwxC9n1ZN" />
                    </div>
                  </div>
                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Michelin Gastronomy</span>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Wine Cellar</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      <span>Helpful (24)</span>
                    </button>
                  </div>
                </article>
                {/* Card 4: Marcus & Vivienne Dubois */}
                <article className="bg-surface-container-lowest rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center shadow-inner shrink-0">
                          MD
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                            Marcus &amp; Vivienne Dubois
                          </h4>
                          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                            <span>Paris, France</span>
                            <span>•</span>
                            <span className="text-primary font-semibold">Verified Stay • 6 Nights</span>
                          </div>
                        </div>
                      </div>
                      {/* Rating & Date */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center text-secondary justify-end">
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline mt-1 block">June 2024</span>
                      </div>
                    </div>
                    {/* Suite Identification Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm mb-4">
                      <span className="material-symbols-outlined text-[15px]">villa</span>
                      <span>The Belvedere Grand Master Suite</span>
                    </div>
                    {/* Review Title & Paragraph */}
                    <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      “The finest cliffside infinity pool in the Mediterranean.”
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                      The heated seawater infinity pool feels as though it spills straight into the sky. Lounging on the terracotta daybeds with bespoke chilled linen spritzes and house-made limoncello granita is pure bliss. The staff knows your name before you arrive, yet maintains the most graceful discretion imaginable.
                    </p>
                    {/* Image Mosaic Thumbnail */}
                    <div className="w-full h-44 rounded-lg overflow-hidden mb-6 shadow-sm">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Stunning cliffside infinity pool overlooking the cobalt Mediterranean Sea at sunset, with warm terracotta loungers, linen canopies, and soft evening ambient light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-123FvbCF2WCR-swAlHZMtp3Shve0RZilPSYnj6_AD1DrRIy2l9G-bqLF5p1CKTGscMT8fNrZEehCenAD17o657hDSmHAydNlKorapjP9RoACBZRPy0tPX57_X57ma5_QYoo0LwT-uMSiRRv_-yAoqM1erhEJJevWyJT7XHBYqPy2J-VOXV5lk9wrpOXmtf3hiAP3zOWfi0Y6jHsVwQTOHj5vd3WOBpgFTdYct6IyDMtmhwgctHnp" />
                    </div>
                  </div>
                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Infinity Solarium</span>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Sunset Cocktails</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      <span>Helpful (19)</span>
                    </button>
                  </div>
                </article>
                {/* Card 5: David & Rachel Thorne */}
                <article className="bg-surface-container-lowest rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm flex items-center justify-center shadow-inner shrink-0">
                          DT
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                            David &amp; Rachel Thorne
                          </h4>
                          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                            <span>New York, USA</span>
                            <span>•</span>
                            <span className="text-primary font-semibold">Verified Stay • 3 Nights</span>
                          </div>
                        </div>
                      </div>
                      {/* Rating & Date */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center text-secondary justify-end">
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 0'}}>star_half</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline mt-1 block">May 2024</span>
                      </div>
                    </div>
                    {/* Suite Identification Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm mb-4">
                      <span className="material-symbols-outlined text-[15px]">villa</span>
                      <span>Olive Grove Arched Chamber</span>
                    </div>
                    {/* Review Title & Paragraph */}
                    <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      “Pure bliss, exceptional attention to architectural detail.”
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                      The craftsmanship throughout the property — from the hand-carved limestone basins to Rivolta Carmignani linens — is peerless. Getting up the private cliffside road requires reliance on the hotel's Maybach or golf cart service, but the isolation is precisely what makes it sublime. We cannot wait to return for our tenth anniversary.
                    </p>
                    {/* Image Mosaic Thumbnail */}
                    <div className="w-full h-44 rounded-lg overflow-hidden mb-6 shadow-sm">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="High-end bedroom suite with vaulted Italian plaster ceilings, hand-carved stone bath basin, fine linen bed dressing, and french doors opening to olive gardens." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsnX-v-li4-I8JzamJeoW-I2JEnriHStuCotLK3ZyXOzDrChUALK7OmhyaIcWhm4rm4mClYtMpmSgfPx9eP8FKomLznwhKxNcuf7S5rX8QImvDlRJb1GReLBA-Ezhw8zLQbEQsTjCWJ-OVSo09ozu9xEKmB6R8PqrJ_hmJhpKYmJ1xnwn6gy3CrD60JjDuOIrZ60xKTl3YFRr3Ub0DbgoT2VRG_G3o5vF8Hv1vAqq5QEbMB3AUKBVX" />
                    </div>
                  </div>
                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Artisanal Craft</span>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Valet &amp; Shuttle</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      <span>Helpful (15)</span>
                    </button>
                  </div>
                </article>
                {/* Card 6: Countess Beatrice Farnese */}
                <article className="bg-surface-container-lowest rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm flex items-center justify-center shadow-inner shrink-0">
                          BF
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                            Countess Beatrice Farnese
                          </h4>
                          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                            <span>Milan, Italy</span>
                            <span>•</span>
                            <span className="text-primary font-semibold">Verified Stay • Estate Buyout</span>
                          </div>
                        </div>
                      </div>
                      {/* Rating & Date */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center text-secondary justify-end">
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline mt-1 block">September 2024</span>
                      </div>
                    </div>
                    {/* Suite Identification Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm mb-4">
                      <span className="material-symbols-outlined text-[15px]">castle</span>
                      <span>Full Estate Buyout (18 Suites)</span>
                    </div>
                    {/* Review Title & Paragraph */}
                    <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      “A magical setting for our family's celebration.”
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                      Hosting our private family gathering across all 18 suites was handled with imperial precision. The estate staff orchestrated private orchestral performances on the promontory belvedere and a fireworks celebration over the water with absolute grace. Truly in a category of its own.
                    </p>
                    {/* Image Mosaic Thumbnail */}
                    <div className="w-full h-44 rounded-lg overflow-hidden mb-6 shadow-sm">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Aerial evening view of an exclusive Mediterranean cliffside Italian villa lit with warm architectural illumination, private dining tables, and fireworks over the calm sea." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiH1cMBqAx5ZqGjugy4cP09uMRYVWMmjujTyFHQ1rcIwCTbjvvhCa5CCTRW8ZX8s7ufDPRHfLqKqzSFgpd-R00Aygvpg7gXQf7MmGhzqbztNyzfV-U7WcXaV749YRxCwyeKSjkh_Q3yIa5ZwBIsTDycS3wvHu8vPfwDYNjn9kGsYvZ0Ecs1sl0oFEMwFzpkNHcll56brkknknyvCUyLYbt9m1jbZnrIYOG8PpKAQpv9388c70EcJzf" />
                    </div>
                  </div>
                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Private Buyout</span>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Promontory Gala</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      <span>Helpful (42)</span>
                    </button>
                  </div>
                </article>
              </div>
              {/* Pagination & Load More Controls */}
              <div className="flex flex-col items-center justify-center space-y-5 mb-20">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Showing 6 of 342 Verified Patron Testimonials
                </span>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="w-10 h-10 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center shadow-sm">1</button>
                  <button className="w-10 h-10 rounded bg-surface-container-low text-on-surface hover:bg-surface-container font-label-sm text-label-sm transition-colors flex items-center justify-center">2</button>
                  <button className="w-10 h-10 rounded bg-surface-container-low text-on-surface hover:bg-surface-container font-label-sm text-label-sm transition-colors flex items-center justify-center">3</button>
                  <span className="px-2 text-outline font-label-sm text-label-sm">...</span>
                  <button className="w-10 h-10 rounded bg-surface-container-low text-on-surface hover:bg-surface-container font-label-sm text-label-sm transition-colors flex items-center justify-center">58</button>
                  <button className="w-10 h-10 rounded bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
                <button className="mt-2 bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-md text-label-md uppercase px-8 py-3 rounded transition-colors shadow-sm">
                  Load More Chronicles
                </button>
              </div>
              {/* The Villa Aurelia Patron Guarantee Callout */}
              <div className="w-full rounded-xl bg-surface-container-high p-8 md:p-12 mb-20 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>The Villa Aurelia Patron Promise</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      Unfiltered Authenticity &amp; Inviolable Privacy
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
                      Every chronicle published within our ledger corresponds to a confirmed folio ledger entry. We never alter guest reflections, retaining the authentic voices of those who honor our threshold. Should you have specific inquiries regarding private suite suitability or tailored dietary requirements, our Head Concierge remains at your permanent disposal.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                    <a className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase py-3.5 px-6 rounded text-center transition-colors shadow-sm" href="#">
                      Direct Concierge Inquiry
                    </a>
                    <a className="bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase py-3.5 px-6 rounded text-center transition-colors shadow-sm" href="#">
                      Explore Available Suites
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Patron Review Modal (Hidden by Default) */}
          <div className="hidden fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-sm p-4 overflow-y-auto" id="reviewModal">
            <div className="bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl p-6 md:p-10 relative">
              <button className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
              <div className="mb-6">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Guest Ledger Entry</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-1">Chronicle Your Stay</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Please provide your reservation details to verify your submission with our atelier desk.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Reservation Code *</label>
                    <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="e.g. VA-8921" required type="text" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Primary Guest Full Name *</label>
                    <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="e.g. Eleanor Vance" required type="text" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Suite Experienced *</label>
                    <select className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-sm">
                      <option>The Belvedere Grand Master Suite</option>
                      <option>Cliffside Promontory Villa</option>
                      <option>Lemon Grove Deluxe Terrace</option>
                      <option>Olive Grove Arched Chamber</option>
                      <option>Entire Estate Buyout</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Overall Rating *</label>
                    <select className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-sm">
                      <option>5.0 — Unforgettable Excellence</option>
                      <option>4.0 — Exceptional</option>
                      <option>3.0 — Pleasant</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Headline of Your Experience *</label>
                  <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="A brief distillation of your stay..." required type="text" />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Reflections &amp; Observations *</label>
                  <textarea className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Describe the ambiance, majordomo service, dining experiences, or peaceful vistas..." required rows={4} defaultValue={""} />
                </div>
                <div className="pt-2">
                  <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase py-3.5 rounded transition-colors shadow-md" type="submit">
                    Transmit to Majordomo Registry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div></main>

    </div>
  )
}
