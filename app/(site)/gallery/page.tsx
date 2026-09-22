import Link from "next/link"

export const metadata = {
  title: "Photo Gallery | Villa Aurelia",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

export default function GalleryPage() {
  return (
    <div className="bg-surface">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Introductory Monograph Header */}
          <section className="w-full pt-space-xl pb-space-lg px-margin md:px-margin-tablet lg:px-margin-desktop max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b-0 pb-space-md">
              <div className="max-w-2xl">
                <div className="flex items-center gap-space-xs mb-space-xs text-secondary">
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.25em]">Visual Monograph • Positano</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
                  A Sanctuary Captured in Light
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm font-light leading-relaxed">
                  Sun-washed travertine, maritime morning mist, and the slow tempo of the Amalfi coast. Explore the architectural archive and curated plate collection of Villa Aurelia.
                </p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-space-md pt-2">
                <div className="text-right">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Archive Index</span>
                  <span className="font-headline-sm text-headline-sm text-primary">12 Curated Plates</span>
                </div>
                <div className="h-8 w-px bg-surface-variant hidden sm:block" />
                <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded">
                  <button className="p-1.5 rounded bg-surface-container-lowest text-primary shadow-sm hover:text-primary transition-colors" id="viewGrid" title="Grid View">
                    <span className="material-symbols-outlined text-[20px] block">grid_view</span>
                  </button>
                  <button className="p-1.5 rounded text-outline hover:text-on-surface transition-colors" id="viewEditorial" title="Editorial Asymmetry">
                    <span className="material-symbols-outlined text-[20px] block">view_quilt</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Category Filter Bar */}
            <div className="mt-space-lg flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-2" id="filterContainer">
                <button className="filter-btn px-space-md py-2 rounded-full font-label-md text-label-md uppercase tracking-wider bg-primary text-on-primary transition-all duration-300" data-filter="all">
                  All (34)
                </button>
                <button className="filter-btn px-space-md py-2 rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all duration-300" data-filter="exterior">
                  Exterior &amp; Grounds (8)
                </button>
                <button className="filter-btn px-space-md py-2 rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all duration-300" data-filter="suites">
                  Rooms &amp; Suites (10)
                </button>
                <button className="filter-btn px-space-md py-2 rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all duration-300" data-filter="dining">
                  Dining &amp; Cellar (6)
                </button>
                <button className="filter-btn px-space-md py-2 rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all duration-300" data-filter="spa">
                  Pool &amp; Spa (6)
                </button>
                <button className="filter-btn px-space-md py-2 rounded-full font-label-md text-label-md uppercase tracking-wider bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all duration-300" data-filter="events">
                  Private Events (4)
                </button>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest whitespace-nowrap">Sort: Curated Sequence</span>
              </div>
            </div>
          </section>
          {/* Editorial Photo Gallery Masonry */}
          <section className="w-full pb-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start" id="galleryGrid">
              {/* Plate 01: Hero Cliffside Heated Infinity Solarium (Pool & Spa) - Span 12 or 8 */}
              <div className="gallery-item md:col-span-12 lg:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="spa">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-dim">
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Magnificent cliffside infinity pool at Villa Aurelia in Positano Amalfi Coast overlooking turquoise Tyrrhenian sea, sunbathers on terracotta lounge chairs, limestone terrace, warm afternoon sunlight, panoramic coastal cliffs and yachts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs18hmaqW9ayAJW9zknybiDLPKubpr7Dza3-hSgA7qPgO7rZib07mX2hI22TtzPtVp7S6N40-LXWW4sVyrDyIXk2y0pGNYu8aQtjZXY039kHs-paY_J5g70guEbBr1236MQLzsXHbQjHvOOJwDPtLph4poNKadAU989dMXPAZKLt5h1MeD78QL3dp6xvEcOY0QubnhN9lml1r9ebGRjkTkYSpLGJyzBIgkRANjUidLX-NTm1xRRhN7" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 01 • Pool &amp; Solarium
                    </span>
                  </div>
                  {/* Bottom Meta Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div className="max-w-xl">
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Architectural Feature</span>
                      <h2 className="font-headline-md text-headline-md text-on-primary font-normal leading-snug">The Cliffside Heated Infinity Solarium</h2>
                      <p className="font-body-sm text-body-sm text-surface-variant line-clamp-2 mt-1 font-light">
                        Suspended 220 meters above the Tyrrhenian Sea, carved from volcanic tufa stone and flanked by wild rosemary and terracotta amphorae.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 02: Travertine Courtyard & Estate Terraces (Exterior & Grounds) - Span 4 */}
              <div className="gallery-item md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="exterior">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-dim">
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Luxury boutique Italian villa hotel exterior with carved stone arches, Mediterranean gardens, stone courtyard terraces, blooming bougainvillea, manicured olive trees under warm golden sunset glow, guests relaxing quietly" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwCH9KWb0qCSVD16H5g7nXr_iAVdFHtIkXLOAUjmEcU8qCFjWdbOszOZaxqR73o4YhRR0qc0974FiBwFYjui-sczdWc8UAqOi57Oxw_c2K5qrPGdPnlCVXTgJhoy4hqtOJh14-KDPcH56EQd1PNanH3945hVvw2DaBYh3TSLHxPmogrwsj9gaDR760WrTaZjf7lmZVbvXzJVV8GW_D54MJ8hHfyb-a5UIs6lq-Cv6tu0Kwmwk6ncuT" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 02 • Grounds
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Estate Grounds</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">Travertine Courtyard &amp; Upper Terraces</h3>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 font-light">Late golden hour illumination across hand-hewn arches.</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 03: Master Suite Bedroom (Rooms & Suites) - Span 7 */}
              <div className="gallery-item md:col-span-6 lg:col-span-7 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="suites">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-dim">
                  <img alt="Master suite bedroom at luxury boutique Amalfi coast hotel Villa Aurelia, panoramic ocean terrace view, king size bed with crisp white Italian linen, warm travertine stone accents, terracotta planters, soft morning Mediterranean light" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYdoEpW05uXsT6rnUk6DuULGB-kCmzuwOazR8Se37RwOOnwjif4hoghMcozfuBGqNy4uguf-02FqJnbUKmTjfCFLH_jpufVfdB0yjs-6_gsfxutQLxIPm3KLDAR1XrqKwVa2AfrxXUBHWn3DFOZoBgsV3uv6iKLW5YoPcijfABhxdCpFYyzBqhGLTnWdQJkXvR3kYR0RLd6N34VFyjbptufFhIShD6Yqi7DrF0Gisnb1pa5dVnVfxl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 03 • Private Suites
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div className="max-w-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Suites &amp; Villas</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">The Belvedere Master Suite at Dawn</h3>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 font-light">Custom oak joinery, Rivolta Carmignani linen, and uninterrupted sea horizons.</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 04: Holistic Roman Spa & Bath (Pool & Spa) - Span 5 */}
              <div className="gallery-item md:col-span-6 lg:col-span-5 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="spa">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-dim">
                  <img alt="Luxury holistic boutique hotel spa and wellness sanctuary, warm stone carved Roman bath, steam, eucalyptus, travertine interior with ambient candlelight, serene atmosphere" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1WXWinS5yNjlFBdaODN04Jh2psPESmzsuFbIeT0TvcPrwpZgeQhAehYe_R2NV7ejvaH5ohVh4fWZhxQst6WB0pb70fDZhNFFbCzBt7usx3Vb85JbUdTMVf0Vlfza_DqeFMtZz8YJpESk05YBZhfkU--hb-AzYUtQws-TKWKDqiEbTSF9mPL7yiZ6JEIR1xmhXGKq0q9P_nw8VGU5m-7-OWlkC-eeiXEdHw9hDcN-jBc22Z9-20e94kyv7E" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 04 • Roman Spa
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Wellness Sanctuary</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">Roman Tepidarium &amp; Thermal Grotto</h3>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 font-light">Subterranean mineral baths carved into the Positano bedrock.</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 05: Gastronomy Ristorante Belvedere (Dining & Cellar) - Span 6 */}
              <div className="gallery-item md:col-span-6 lg:col-span-6 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="dining">
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-surface-dim">
                  <img alt="Fine dining Michelin star hotel terrace restaurant and bar overlooking Italian coast, gourmet Mediterranean dish with wine glass, warm romantic sunset golden hour lighting" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1V1L59SbiUYo4NFl-Uo3nngHsqiNoIbJgQM4jyqriNvhNb04pS1bAE1BEdoSIAdE5jazMngH-QCsfMxZ5fJKgs5YyoLm9qQbnBLwqszWM--_DcCsSZ1f5bwy8k8ZYyH66VEwmA9uvAQz_aH4pbxQNSAQavThlStJ44XuOCgMgycf6TjRXTNCKEh5MQFfiw7Tfn7eMmrNWjJj_bDMMewPv4_piNwpNbrmwKqE2letgyUVYOhqK1wSkFK9Lg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 05 • Gastronomy
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Culinary Heritage</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">Ristorante Belvedere Twilight Gastronomy</h3>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 font-light">Campanian line-caught red mullet, Amalfi citrus oil, paired with vintage Fiano.</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 06: Private Clifftop Gala & Banquet (Private Events) - Span 6 */}
              <div className="gallery-item md:col-span-6 lg:col-span-6 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="events">
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-surface-dim">
                  <img alt="Romantic candlelit twilight wedding event reception on private clifftop terrace at Italian villa hotel overlooking Positano coastline, long linen dining table decorated with olive branches and lemons, festive glowing fairy lights" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkS8JIggZzSego26khzyX89_bz1HgsY2ciMWYMyjHSpIiDw8ROSO2kmhTnArSW61e9HCvzoPhJZPUg4rqcyiMVnJbjHSPde19HqF9loxkd-bLLILiRIu9G9wbZjXH8B2y2V18RHn87kkEzvvXnJ0J8mMaPKEDOQnb_26jmKTRr4hj6udP89bFBP_CA1PHSL7mttcrSQSnd01Q-t27-R09Sm9zpbKrGVadPt5FpeNaDAheTDOZgl3ch" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 06 • Private Receptions
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Bespoke Celebrations</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">Private Clifftop Gala &amp; Botanical Banquet</h3>
                      <p className="font-body-sm text-body-sm text-surface-variant mt-1 font-light">Under century olive canopies lit by hand-dipped beeswax candles.</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 07: Wellness Fitness Studio with Arched Windows (Spa & Amenities) - Span 4 */}
              <div className="gallery-item md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="spa">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-dim">
                  <img alt="High-end boutique hotel fitness wellness center studio, wooden floors, Technogym equipment, panoramic arched glass windows overlooking Italian gardens" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1VKkmaIFgVCAw89beJHwkyy1FsFP6LX7ov8Phj0g0jnctUkOSP3MN4i4Mj5AGoVlCuU68Qpl0kvmB79uVncJ98Q31gMcCRla4CDeNqVcvwodyh3Nnl1bhOwJXs8uGQ-KyoBsCtWUOOC6-f1PTzKa2LJy3zEtNfOMBUdTShDPEhIQ7UD4G2QbvcVBFdg1lWTwji_uv1VlH1CtKv0vuMXb6G2mJqxEef90GyPWlYQ6q6OWEc0ZRtbcJEpkg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 07 • Movement
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">The Movement Studio</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">Technogym Garden Pavilion</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 08: The Sommelier's Volcanic Vault (Dining & Cellar) - Span 4 */}
              <div className="gallery-item md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="dining">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-dim">
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Intimate candlelit wine cellar grotto carved in cliffside limestone at boutique Italian luxury hotel, oak wine barrels, dusty vintage Italian wine bottles, tasting sommelier table with crystal glasses, romantic warm amber light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuHORUGWaubKCAHXUkwKFYi5fy7Xt95U5rEVNKqMYgFQAswyTvyhAcpZhhdVDNeTmY9sH7hyhEt2cWKNlgGVodasdOzaRrblHDatozHxGFKBDgapbFkMUP-3PvW7s5BsTnZT-HfkLMJWJsEaEIAfAuIABIOqOtODYZHXIBRkhtIF1OQGMWgGtN8BBBn99zeh1eAMn4gmdAw98pV8xEAQrqY2c90oLpVP7BFrn7Uol4tVk_VIuuA9C_" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 08 • Enoteca
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Sommelier Cellar</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">Volcanic Stone Wine Vault</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plate 09: The Sfumato Cliff Terrace (Exterior & Grounds) - Span 4 */}
              <div className="gallery-item md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-lg bg-surface-container shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl" data-category="exterior">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-dim">
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Perched Mediterranean stone balcony with iron railings looking over Positano colorful coastal village cascading down steep cliffs to deep cobalt blue sea, flowering jasmine, soft afternoon sun, luxury Italian hotel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9eZEYbhR5RV1VfrHYROoSB0RvI82BbrxKYPRFTClwwU2Ahol2DrTL3CgUYDgMTwyx5nl7Pv3bJDYKVNpNs7WQzraMJOiutoGZCJnJG4Z1V7-1EQ5f-cg3TcsnMO5SwAm_dQYZtEpKGByle3F8SqZumOFOHxeqfrPIdL4stPZcv_Yh3jvbNqIDbowCmfRlGLmS0GUaaGOCzAUZ5VEw3TqQ61G1sTPRHi7mE-j5JcL-L20jXUm_-iSP" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded">
                      Plate 09 • Grounds
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed opacity-90 block mb-1">Vista Point</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary font-normal leading-snug">Positano Panorama Balcony</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Editorial Monograph Note Card */}
            <div className="mt-space-xl bg-surface-container-low rounded-lg p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
              <div className="max-w-xl">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-2">Curator's Statement</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Light As Architecture</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Every plate in this collection was documented with natural sunlight across seasonal solstices. We invite you to experience the spatial tranquility of our estate in person.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-space-sm shrink-0">
                <button className="px-space-md py-3 rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-variant transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Download Press Monograph (.PDF)
                </button>
                <button className="px-space-md py-3 rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm">
                  Inquire For Editorial Usage
                </button>
              </div>
            </div>
          </section>
          {/* Interactive Lightbox Modal Overlay */}
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md hidden flex-col justify-between p-4 md:p-6 transition-all duration-300" id="lightboxModal">
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-on-primary w-full max-w-7xl mx-auto z-10">
              <div className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary-fixed" id="lbIndex">Plate 01 of 09</span>
                <span className="text-surface-variant/40">•</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider bg-surface/10 px-2.5 py-1 rounded text-surface-variant" id="lbCategory">Pool &amp; Solarium</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-surface-variant hover:text-on-primary transition-colors flex items-center gap-1 font-label-sm text-label-sm uppercase">
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-surface/10 hover:bg-surface/25 flex items-center justify-center text-on-primary transition-all" title="Close Lightbox">
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>
            </div>
            {/* Center Lightbox Stage with Navigation Arrows */}
            <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-4 overflow-hidden">
              {/* Left Prev Button */}
              <button className="absolute left-2 md:left-4 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-primary text-on-primary backdrop-blur-sm flex items-center justify-center transition-all group" title="Previous Plate">
                <span className="material-symbols-outlined text-[24px] group-hover:-translate-x-0.5 transition-transform">west</span>
              </button>
              {/* Center Media Container */}
              <div className="max-w-full max-h-[72vh] flex items-center justify-center p-2">
                <img className="max-h-[68vh] max-w-full object-contain rounded shadow-2xl transition-all duration-300" data-alt="Expanded view of Villa Aurelia heated infinity pool cliffside in Positano" id="lbImage" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoiw73ip7nUUXaIG76tVtq8qL4xgRDan6omyQWmo88uiV1jdNxEnF1WrX0COAbuLJ38SogCf91I-4fAtKDUgT-5c7auS8ut7E4--ZEMdFz0nVznGNLXNIXxwRNBVt8Wp4GTVCUAXL7u3ie4be79Gbs72PgQu0v3XUiGtbSi8JkqaIohE88bL1ntAy03Q7W71Zt55CT4CvqHe0IV2SqUZXO9xcoA8vpHw2WPF8LhsIgcbLMae87uauO" />
              </div>
              {/* Right Next Button */}
              <button className="absolute right-2 md:right-4 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-primary text-on-primary backdrop-blur-sm flex items-center justify-center transition-all group" title="Next Plate">
                <span className="material-symbols-outlined text-[24px] group-hover:translate-x-0.5 transition-transform">east</span>
              </button>
            </div>
            {/* Bottom Lightbox Caption Bar */}
            <div className="w-full max-w-7xl mx-auto bg-surface/5 backdrop-blur-md rounded-lg p-space-sm md:p-space-md text-on-primary flex flex-col md:flex-row md:items-center justify-between gap-space-sm z-10">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-primary font-normal" id="lbTitle">The Cliffside Heated Infinity Solarium</h4>
                <p className="font-body-sm text-body-sm text-surface-variant/90 max-w-2xl mt-0.5 font-light" id="lbCaption">
                  Heated seawater at 28°C suspended above the Tyrrhenian Sea, flanked by hand-turned terracotta amphorae and century-old olive trees.
                </p>
              </div>
              <div className="flex items-center gap-space-md text-surface-variant font-label-sm text-label-sm uppercase">
                <span className="opacity-80">Photo: Majordomo Archives, Positano</span>
                <button className="text-secondary-fixed hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">high_res</span>
                  <span>Hi-Res Plate</span>
                </button>
              </div>
            </div>
          </div>
          {/* Bespoke Concierge Floating Booking Bar (Sticky Travertine Pill) */}
          <div className="fixed bottom-6 left-0 right-0 z-40 px-margin flex justify-center pointer-events-none">
            <div className="pointer-events-auto bg-surface/95 backdrop-blur-xl border-0 shadow-[0_16px_36px_-8px_rgba(43,30,26,0.18),0_4px_12px_-2px_rgba(43,30,26,0.08)] rounded-full px-space-md py-2.5 max-w-4xl w-full flex flex-col sm:flex-row items-center justify-between gap-3 transition-transform hover:-translate-y-0.5">
              {/* Date & Guest Selector Glance */}
              <div className="flex items-center gap-space-sm text-on-surface">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider leading-none">Selected Itinerary</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium leading-tight">Oct 2025 • 2 Guests • Direct Luxury Rate</span>
                </div>
              </div>
              {/* Quick Concierge Direct Phone Hint */}
              <div className="hidden lg:flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase">
                <span className="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
                <a className="hover:text-primary transition-colors" href="tel:+39089875110">Concierge: +39 089 875 110</a>
              </div>
              {/* Call to Action Trigger */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a className="w-full sm:w-auto px- space-md py-2.5 px-5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm" href="#">
                  <span>Reserve Suite — From €680</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
          {/* Inline Micro-Interactions Script */}
        </div></main>

    </div>
  )
}
