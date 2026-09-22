import Link from "next/link"
import { notFound } from "next/navigation"

import { getRoomTypeBySlug, validateSearchParams } from "@/lib/search"
import { formatCurrency } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const roomType = await getRoomTypeBySlug(slug)
  return {
    title: roomType ? `Villa Aurelia | ${roomType.name}` : "Villa Aurelia",
    description:
      "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
  }
}

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    checkIn?: string
    checkOut?: string
    guests?: string
  }>
}

export default async function RoomDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const roomType = await getRoomTypeBySlug(slug)
  if (!roomType) notFound()

  const query = await searchParams
  const { checkIn, checkOut, guests } = validateSearchParams(query)
  const checkInStr = checkIn.toISOString().split("T")[0]
  const checkOutStr = checkOut.toISOString().split("T")[0]
  const nights = Math.max(
    1,
    Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    )
  )
  const nightlyPrice = roomType.basePrice
  const totalPrice = nightlyPrice * nights

  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Top Utility & Breadcrumb Bar */}
          <section className="w-full bg-surface border-b border-outline-variant/30 py-space-xs">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-wrap items-center justify-between gap-y-2 text-on-surface-variant">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-outline">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="text-outline-variant">/</span>
                <Link href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="hover:text-primary transition-colors">Suites &amp; Sanctuaries</Link>
                <span className="text-outline-variant">/</span>
                <span className="text-outline">Signature Penthouses</span>
                <span className="text-outline-variant">/</span>
                <span className="text-on-surface font-semibold">{roomType.name}</span>
              </nav>
              <div className="flex items-center gap-space-md font-label-sm text-label-sm uppercase tracking-widest text-tertiary">
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors group" type="button">
                  <span className="material-symbols-outlined text-[17px] text-outline group-hover:text-primary transition-colors">share</span>
                  <span>Share Suite</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors group" type="button">
                  <span className="material-symbols-outlined text-[17px] text-outline group-hover:text-primary transition-colors">bookmark</span>
                  <span>Save to Wishlist</span>
                </button>
                <button className="flex items-center gap-1.5 text-primary hover:text-primary-container font-semibold transition-colors" type="button">
                  <span className="material-symbols-outlined text-[17px]">view_in_ar</span>
                  <span>Virtual 3D Walkthrough</span>
                </button>
              </div>
            </div>
          </section>
          {/* Editorial Image Gallery Showcase */}
          <section className="w-full pt-space-md pb-space-lg bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-xs rounded-xl overflow-hidden bg-surface-container-low p-1.5 shadow-[0_16px_36px_-8px_rgba(43,30,26,0.07)]">
                {/* Feature Master Bedroom Image (Left 7 Cols) */}
                <div className="lg:col-span-7 relative group overflow-hidden rounded-lg min-h-[380px] lg:min-h-[560px]">
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" alt="Luxurious Italian Mediterranean master suite bedroom with vaulted stone arches, unbleached linen canopy emperor bed, warm travertine flooring, soft amber morning light streaming through French doors revealing Positano coastal cliffs and the sapphire Tyrrhenian sea, artisanal terracotta urns and refined minimalism in warm terracotta and sandy hues." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqIiFmG52Jj37n20c_i5C_Pcl0vBWgc7QwoUXbnGPEIInWf1LupuFHDVAxzqDLsdUh76cvTXYmgogkF0aHg0aB4nKN0I7cipIAwNm8u2DlEqPUQhysBF_CN0eDv0JOSeMi9gvX9SpsbekiYSDOZ4VjmMKd8xnKRpf6Bbt-q-SSDytjGZUsId9Glph1TDsa3wvyK3yfgjEdmTAczK4vKypPw9yA86i0hfLfQhakrrRv0zO_6jp6UgSb" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-surface/90 text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded backdrop-blur-md">Primary Chamber</span>
                    <p className="font-headline-sm text-headline-sm mt-1 text-white/95">Panoramic Master Loggia</p>
                  </div>
                </div>
                {/* 2x2 Image Grid (Right 5 Cols) */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-space-xs">
                  {/* Bathtub */}
                  <div className="relative group overflow-hidden rounded-lg h-[180px] lg:h-[275px]">
                    <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt="A freestanding hand-hammered antique copper soaking bathtub placed next to an arched panoramic window overlooking dramatic Amalfi limestone cliffs and blue sea, styled with fragrant wild lavender, natural sponges, and honeystone travertine details." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc0F4tTg3UeFNt7se9hX53b2jR_EWdm_CHhhRnguAGE0zY2LVSoREDVJis2WsJlMJaD5N4q0-2v23zSxoSP6hCn_McIl7Ybnyyr6zfW1BCi3sWi9wCAlgWS6GRpPSedq_kt6gzawXW_8o5T3wqe-E0_22p8DkV0iVLLKi774cW22tTgn-ljZ4fQi0_5xW8rbB8BWW-nQDKDXO2VLx37z3bM43AzMAEtHuVq9vmsN_JH8bv6Ecx8Lem" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 font-label-sm text-label-sm text-white/90">Hammered Copper Bath</span>
                  </div>
                  {/* Private Plunge Pool */}
                  <div className="relative group overflow-hidden rounded-lg h-[180px] lg:h-[275px]">
                    <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt="Private cliffside heated plunge pool carved into natural stone on a spacious sandstone terrace with weathered timber pergola, plush ivory sun loungers, and potted mature bougainvillea against the sunset glow." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-j8MLbQbCv0p-Yf0e17InLpLAELjFVdVhou-fQXylNFipzH21BujecMk3uUPJxNtemEFT4XEwzKZbwa_IRoXJzZV-gaAGhIuCW7IechPoDrucgfTgqMxCLtGrrjDjkKAxxEBHp68hPGN7WOcXh3mj_LuRdMPpG4CixtkMsQS-WPhlTUxUoiC6vyM54oGTVq7JOsdZWngVJ9OBv5qFVddFI6e8ZYnFPKBcYuulaEjVGhPUFUoywN3O" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 font-label-sm text-label-sm text-white/90">Cliffside Plunge Pool</span>
                  </div>
                  {/* Fireplace Living Salon */}
                  <div className="relative group overflow-hidden rounded-lg h-[180px] lg:h-[275px]">
                    <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt="Elegant warm living room salon with an open travertine hearth fireplace, deep linen sofas in oat and wheat tones, curated contemporary Italian ceramic sculptures, open timber beams, and soft warm lamplight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Nq9gO3iJkGOkc0JoK0RmaUtXQ3_7zVB5WEK9JAvHH3G7ch4bnKdgAzMkE3T85ci0U_44EUrugP8153Co83LzbKWFnaoXeF-RKm4pINaU-bsBUgxf0ixKN21fT1TRDkERAr6NCiGlZiuhrVIGDdHLkRXpF8tlujDDDx-jEvoTcaaHhTcfPkauG0ZJ0sIKGGj1yNL0lB6FAMOmFzqKAtyKiiL8R01bWRkSuUb66VU8bi0CCLXGZz4I" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 font-label-sm text-label-sm text-white/90">Travertine Hearth Salon</span>
                  </div>
                  {/* Breakfast Terrace */}
                  <div className="relative group overflow-hidden rounded-lg h-[180px] lg:h-[275px]">
                    <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt="Artisanal Mediterranean breakfast setup on an outdoor stone terrace overlooking the Positano bay: handmade ceramic plates, freshly baked focaccia, ripe figs, espresso in porcelain cups, and champagne chilling in an antique stone cooler." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHqbk3Qf5fsNKahGt40eZobdFIl6uRYowIlahwrV4eM1kiiuZLF0jbxrYabwroSPM5IcQfCRL7AfWbeQuRlNHWulxVScEf1PvTW4NGFdFDNbq2U1o4YVm2dFdM1uDJH0wOKjHYn3l8RfLaFz8BNQy73rPAI1CaAJzsq7kxvy5Lg4qIlahtXGBlgXU6FrzXV-rbdBW9pd7UbizQP2p8hY9deHwHyltMZW9-aidgIJEJc77yCo02Or-w" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 font-label-sm text-label-sm text-white/90">Artisanal Sun Pergola</span>
                  </div>
                </div>
                {/* Floating Gallery Trigger Button */}
                <button className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-surface/90 hover:bg-surface text-on-surface hover:text-primary font-label-sm text-label-sm uppercase tracking-wider px-3.5 py-2.5 rounded shadow-md backdrop-blur-md transition-all duration-300" type="button">
                  <span className="material-symbols-outlined text-[18px]">photo_library</span>
                  <span>View All 18 Photographs &amp; Floorplan</span>
                </button>
              </div>
            </div>
          </section>
          {/* Main Narrative & Reservation Hub */}
          <section className="w-full py-space-lg bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
                {/* LEFT COLUMN: Suite Narrative, Specs, Curated Amenities, Floorplan (approx 68% width) */}
                <div className="lg:col-span-8 flex flex-col space-y-space-xl">
                  {/* Header & Editorial Intro */}
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-space-xs">
                      <span className="bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 rounded">
                        Signature Suite
                      </span>
                      <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 rounded">
                        Top Floor Penthouse
                      </span>
                      <span className="bg-secondary-fixed/50 text-on-secondary-container font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 rounded">
                        Dedicated Butler 24/7
                      </span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1 mb-space-xs">
                      {roomType.name}
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      {roomType.description}
                    </p>
                  </div>
                  {/* Key Specifications Strip */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-md bg-surface-container-low rounded-xl shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">group</span>
                      <div>
                        <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">Occupancy</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">Up to {roomType.maxGuests} Guests</span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant">{roomType.maxGuests <= 2 ? "Ideal for couples" : "Family friendly"}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">bed</span>
                      <div>
                        <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">Bed Configuration</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">{roomType.bedType}</span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant">Premium bedding</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">straighten</span>
                      <div>
                        <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">Living Area</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">{roomType.roomSize ? `${roomType.roomSize} m²` : "—"}</span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant">Interior living space</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">panorama</span>
                      <div>
                        <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">Orientation</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">Mediterranean View</span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant">Coastal exposure</span>
                      </div>
                    </div>
                  </div>
                  {/* Extended Storytelling Passage */}
                  <div className="prose max-w-none text-on-surface-variant space-y-space-sm font-body-md text-body-md leading-relaxed">
                    <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      An Elevated Haven of Natural Stone, Fire &amp; Water
                    </h2>
                    <p>
                      Hand-hewn calcarenite blocks from local Campanian quarries form the thermal backbone of the Belvedere Suite, keeping the living quarters naturally cool beneath the afternoon sun and warm during starlit Mediterranean nights. The grand central salon transitions seamlessly onto a private cantilevered stone loggia, framed by sculpted Tuscan terracotta planters and wild rosemary shrubs.
                    </p>
                    <p>
                      Mornings unfold unhurriedly with bespoke breakfast courses prepared directly upon your shaded dining pergola by your assigned estate butler. Soak in the open-air plunge pool heated to 34°C with saline minerals, or retreat to the freestanding hammered copper tub inside the bathroom pavilion, perfectly oriented towards the sun descending into the sea at Li Galli archipelago.
                    </p>
                  </div>
                  {/* Curated Amenities Grid */}
                  <div className="flex flex-col space-y-space-md">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Artisanal Details</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-1">
                        Curated Amenities &amp; In-Suite Privileges
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {/* Wellness & Bath */}
                      <div className="bg-surface-container-low p-space-md rounded-xl space-y-3 shadow-sm">
                        <div className="flex items-center gap-2.5 text-primary">
                          <span className="material-symbols-outlined text-[24px]">bathtub</span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">Wellness &amp; Bathing</h3>
                        </div>
                        <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Freestanding artisan hammered copper soaking tub</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Dual walk-in rainfall showers in honed Roman travertine</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Bespoke Acqua di Parma Colonia signature apothecary set</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Fluffy Egyptian organic cotton robes &amp; hand-stitched slippers</span>
                          </li>
                        </ul>
                      </div>
                      {/* Terrace & Outdoors */}
                      <div className="bg-surface-container-low p-space-md rounded-xl space-y-3 shadow-sm">
                        <div className="flex items-center gap-2.5 text-primary">
                          <span className="material-symbols-outlined text-[24px]">deck</span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">Terrace &amp; Outdoors</h3>
                        </div>
                        <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Private 45 m² cliffside heated travertine plunge pool</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Wisteria-covered dining pergola with handcrafted teak table</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Two oversized double sun-loungers with panoramic telescope</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Century-old olive trees in terracotta amphora planters</span>
                          </li>
                        </ul>
                      </div>
                      {/* Service & Gastronomy */}
                      <div className="bg-surface-container-low p-space-md rounded-xl space-y-3 shadow-sm">
                        <div className="flex items-center gap-2.5 text-primary">
                          <span className="material-symbols-outlined text-[24px]">room_service</span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">Service &amp; Epicurean</h3>
                        </div>
                        <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>24/7 dedicated private butler for packing, dining, and logistics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Climate-controlled in-suite cellar with 24 rare Campania vintages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Daily artisanal à la carte breakfast served wherever you desire</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Complimentary roundtrip Mercedes-Benz S-Class Naples airport transfer</span>
                          </li>
                        </ul>
                      </div>
                      {/* Acoustics & Technology */}
                      <div className="bg-surface-container-low p-space-md rounded-xl space-y-3 shadow-sm">
                        <div className="flex items-center gap-2.5 text-primary">
                          <span className="material-symbols-outlined text-[24px]">speaker</span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">Acoustics &amp; Comfort</h3>
                        </div>
                        <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Bang &amp; Olufsen spatial sound multi-zone acoustic system</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Marshall vintage vinyl turntable with curated Mediterranean jazz LPs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Concealed smart sub-floor heating and radiant cooling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check</span>
                            <span>Dedicated high-speed fiber connection with discrete access points</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Architectural Floorplan Section */}
                  <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-sm shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Architectural Layout</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Suite Schematic &amp; Living Flow</h3>
                      </div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Scale 1:100 • Level 4 Penthouse</span>
                    </div>
                    {/* Floorplan SVG Graphic Representation */}
                    <div className="w-full bg-surface-container-lowest rounded-lg p-6 flex flex-col items-center justify-center">
                      <svg className="w-full h-auto max-h-[360px] text-tertiary/80 font-sans" fill="none" viewBox="0 0 760 380">
                        {/* Outer boundary */}
                        <rect className="text-outline-variant" height={340} rx={8} stroke="currentColor" strokeDasharray="6 4" strokeWidth={2} width={720} x={20} y={20} />
                        {/* Main Master Bedroom */}
                        <rect className="text-outline" fill="#fcf9f3" height={300} rx={4} stroke="currentColor" strokeWidth="1.5" width={300} x={40} y={40} />
                        <text className="font-semibold text-[13px] fill-current text-on-surface" x={60} y={75}>1. MASTER BEDROOM (52 m²)</text>
                        <text className="text-[11px] fill-current text-on-surface-variant" x={60} y={95}>Emperor Super King Linen Bed</text>
                        {/* Bed representation */}
                        <rect fill="#f0eee8" height={130} rx={6} stroke="#8a3b24" strokeWidth="1.5" width={120} x={130} y={130} />
                        <text className="text-[11px] font-semibold fill-current text-primary" x={156} y={200}>EMPEROR BED</text>
                        <circle cx={90} cy={180} r={14} stroke="#dbc1ba" strokeWidth="1.5" />
                        <circle cx={290} cy={180} r={14} stroke="#dbc1ba" strokeWidth="1.5" />
                        {/* Bath Pavilion */}
                        <rect className="text-outline" fill="#fcf9f3" height={300} rx={4} stroke="currentColor" strokeWidth="1.5" width={180} x={350} y={40} />
                        <text className="font-semibold text-[13px] fill-current text-on-surface" x={365} y={75}>2. BATH SALON (38 m²)</text>
                        <text className="text-[11px] fill-current text-on-surface-variant" x={365} y={95}>Dual Rain Shower</text>
                        {/* Tub representation */}
                        <ellipse cx={440} cy={190} fill="#ffe0d7" rx={35} ry={60} stroke="#8a3b24" strokeWidth="1.5" />
                        <text className="text-[10px] font-semibold fill-current text-primary" x={414} y={194}>COPPER TUB</text>
                        {/* Private Terrace & Plunge Pool */}
                        <rect className="text-outline" fill="#f6f3ed" height={300} rx={4} stroke="currentColor" strokeWidth="1.5" width={180} x={540} y={40} />
                        <text className="font-semibold text-[13px] fill-current text-on-surface" x={555} y={75}>3. SUN LOGGIA (45 m²)</text>
                        <text className="text-[11px] fill-current text-on-surface-variant" x={555} y={95}>Panoramic Sea Cliff View</text>
                        {/* Plunge pool */}
                        <rect fill="#e0f2fe" height={150} rx={10} stroke="#251a00" strokeWidth="1.5" width={130} x={565} y={140} />
                        <text className="text-[11px] font-bold fill-current text-sky-800" x={585} y={215}>HEATED POOL</text>
                        <text className="text-[9px] fill-current text-sky-700" x={600} y={235}>Depth: 1.25m</text>
                        {/* Architectural compass rose */}
                        <circle cx={700} cy={65} r={16} stroke="#dbc1ba" strokeWidth={1} />
                        <line stroke="#8a3b24" strokeWidth="1.5" x1={700} x2={700} y1={52} y2={78} />
                        <line stroke="#8a3b24" strokeWidth="1.5" x1={687} x2={713} y1={65} y2={65} />
                        <text className="text-[9px] font-bold fill-current text-primary" x={696} y={48}>N</text>
                      </svg>
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-2">
                      <span>Total Footprint: 180 m² (1,937 sq ft total living domain)</span>
                      <span className="text-primary font-semibold cursor-pointer hover:underline">Download High-Res Architectural PDF (2.4MB)</span>
                    </div>
                  </div>
                  {/* Cancellation Policy & Tranquility Guarantee Card */}
                  <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-sm shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Flexible Serenity Guarantee</h3>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Risk-Free Reservation Guarantee</span>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      We understand travel to the Amalfi Coast requires thoughtful coordination. Reservations for {roomType.name} may be canceled with a <strong>100% full refund up to 14 days prior to arrival</strong>. Alternatively, transfer your reservation dates unconditionally up to 12 months with no penalty.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-label-sm text-label-sm text-on-surface">
                      <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-2 rounded">
                        <span className="material-symbols-outlined text-primary text-[18px]">credit_card_off</span>
                        <span>Zero Hidden Resort Levies</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-2 rounded">
                        <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                        <span>Direct Best Rate Promise</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-2 rounded">
                        <span className="material-symbols-outlined text-primary text-[18px]">concierge</span>
                        <span>Private Valet &amp; Welcome Gift</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* RIGHT COLUMN: Sticky Booking Widget (approx 32% width) */}
                <div className="lg:col-span-4 sticky top-24">
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_16px_36px_-8px_rgba(43,30,26,0.08),0_4px_12px_-2px_rgba(43,30,26,0.03)] flex flex-col space-y-space-md">
                    {/* Rate and Review Header */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">From</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-headline-md text-headline-md text-primary font-bold">{formatCurrency(nightlyPrice, roomType.hotel.currency)}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-secondary-fixed/40 px-2.5 py-1 rounded">
                        <span className="material-symbols-outlined text-on-secondary-container text-[16px]">star</span>
                        <span className="font-label-md text-label-md font-bold text-on-secondary-container">4.98</span>
                        <span className="font-label-sm text-label-sm text-on-secondary-container/80">(42)</span>
                      </div>
                    </div>
                    {/* Date & Guest Selector Interactive Card */}
                    <div className="bg-surface-container-low rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                          <div>
                            <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">Selected Stay</span>
                            <span className="font-body-sm text-body-sm font-semibold text-on-surface">{checkIn.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — {checkOut.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          </div>
                        </div>
                        <button className="font-label-sm text-label-sm text-primary hover:underline uppercase" type="button">Edit</button>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                          <div>
                            <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">Guests</span>
                            <span className="font-body-sm text-body-sm font-semibold text-on-surface">{guests} Guest{guests !== 1 && "s"} (Suite Max {roomType.maxGuests})</span>
                          </div>
                        </div>
                        <span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded">{nights} Night{nights !== 1 && "s"}</span>
                      </div>
                    </div>
                    {/* Detailed Cost Breakdown */}
                    <div className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant pt-1">
                      <div className="flex justify-between items-center">
                        <span>{formatCurrency(nightlyPrice, roomType.hotel.currency)} × {nights} night{nights !== 1 && "s"}</span>
                        <span className="font-semibold text-on-surface">{formatCurrency(totalPrice, roomType.hotel.currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Artisanal Breakfast</span>
                        <span className="text-on-surface-variant font-medium">Included</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Thermal Spa Pass</span>
                        <span className="text-on-surface-variant font-medium">Included</span>
                      </div>
                      <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-baseline">
                        <div>
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold block">Total Investment</span>
                          <span className="font-label-sm text-label-sm text-outline">All-inclusive of regional taxes</span>
                        </div>
                        <span className="font-headline-md text-headline-md font-bold text-primary">{formatCurrency(totalPrice, roomType.hotel.currency)}</span>
                      </div>
                    </div>
                    {/* Primary Booking Action Button */}
                    <Link href={`/book?roomType=${roomType.slug}&checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group text-center">
                      <span>Reserve {roomType.name}</span>
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                    {/* Secondary Actions & Inquiries */}
                    <div className="flex flex-col gap-2 pt-1">
                      <button className="w-full bg-surface hover:bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase py-2.5 rounded transition-colors flex items-center justify-center gap-1.5" type="button">
                        <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                        <span>Hold Suite For 24 Hours (No Deposit)</span>
                      </button>
                      <button className="w-full text-center text-outline hover:text-primary font-label-sm text-label-sm uppercase transition-colors py-1" type="button">
                        Inquire With Head Concierge Direct
                      </button>
                    </div>
                    {/* Trust Bar & Security */}
                    <div className="pt-space-xs border-t border-outline-variant/20 flex flex-col gap-1.5 text-outline font-label-sm text-label-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                        <span>Guaranteed 256-Bit SSL Encrypted Booking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">wine_bar</span>
                        <span>Complimentary Welcome Riserva Chianti Classico</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* "You May Also Like" - Alternative Curated Sanctuaries */}
          <section className="w-full py-space-xl bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Alternative Sanctuaries</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                    Explore Other Curated Residences
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
                    Handcrafted architectural spaces tuned to your cadence, each featuring bespoke artisanal furnishings and sweeping cliffside panoramas.
                  </p>
                </div>
                <Link href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="flex items-center gap-1 font-label-md text-label-md uppercase text-primary hover:text-primary-container font-semibold transition-colors">
                  <span>View All Suites</span>
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </Link>
              </div>
              {/* 3 Preview Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {/* Sanctuary 1 */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Elegant Mediterranean hotel room with private travertine terrace overlooking Positano coastline, ivory linen drapery, warm natural wood console, and warm afternoon sea breeze." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu2bkZdujUAzjUelCgfarFGKxx2WMVDe4MvD7BtfAapi-8DHjKvPO93cOMDMnb8_fwtrIZwGMKi-N4_xsMlBR3Vdc1sdFmwdc2BysqW-n-ReRuNWdiQ_Zj_IGaTTGJh1HimyMODBlNwg83Wbc5niqmXsXkNDHlff5R5lxa4_YZG9OwlLNyYt1ny-XCsiARxc3RfG2smy9mNRt97p0XZa0fToV91A47k7Gg38Pz2oj3Dcn6URCtE-F8" />
                    <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded">
                      Sea Terrace
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-sm">
                    <div>
                      <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">
                        <span>75 m²</span>
                        <span>•</span>
                        <span>King or Twin</span>
                        <span>•</span>
                        <span>Max 2 Guests</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        The Travertine Terrace Deluxe
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        Sweeping sun deck clad in local honed travertine with open-air sensory shower and unobstructed Positano ocean vistas.
                      </p>
                    </div>
                    <div className="pt-space-xs border-t border-outline-variant/30 flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase block">From</span>
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">€920</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                      </div>
                      <Link href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm uppercase px-3 py-2 rounded transition-colors text-center">
                        View Sanctuary
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Sanctuary 2 */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Warm and intimate boutique hotel chamber with private secluded garden loggia surrounded by ancient olive trees, artisanal terracotta tiled floor, and soft ambient twilight lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2JAB4dRebPz3BNfaLoch9w_mDndjnUcIkYxQJO_g8X160DHXwidJuwz9Fp-zfF85HlNcs63jNxpHsixXMyTTnjixaEFVf4U5IoocPQRvJM0aQorTM0ekjKivO13u0JQwWubeG5eeXrZRV3VQBshL8VVl0EeOTgC3YXzIoW3z10NV_1bzA_7shYLN103VAHG3cTe5nEkjJVBN6Vmel-PzKIvtoTMiKOAUsKd3qbvjiJ_WxXtlkmH0C" />
                    <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded">
                      Garden Loggia
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-sm">
                    <div>
                      <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">
                        <span>55 m²</span>
                        <span>•</span>
                        <span>King Bed</span>
                        <span>•</span>
                        <span>Max 2 Guests</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Deluxe Olive Grove Chamber
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        Quiet contemplation immersed in centuries-old olive orchards, featuring private garden hammock and artisanal stone soaking tub.
                      </p>
                    </div>
                    <div className="pt-space-xs border-t border-outline-variant/30 flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase block">From</span>
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">€680</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                      </div>
                      <Link href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm uppercase px-3 py-2 rounded transition-colors text-center">
                        View Sanctuary
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Sanctuary 3 */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Ultra-luxury multi-level private estate villa with private freshwater lap pool, panoramic sun deck with umbrella shade, sprawling limestone arches, and expansive family lounge at sunset." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzdGSX0B_-JJ2h2ZPrCHsY1rlVBivgsyxFN6SCG0O0H8hG8m7lWax9jN7cc0lxtxCaQTQhcL2xDWGRhFgrOehvKROfskiNG8so6_wC6Ve-4yXYQfMD6Ltgo1tiw3KSEGSQwVbhy4Akgo4C420VkD1Fp5LVSFkcoJB-34vhL7EuhwXbjb2XT0jHMgnbUXCEQOi8eCPnPbFVpcI2p9tWuq2lbO4-u8FsIHpf3OKaBiU7-M2fJp6j-qGK" />
                    <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded">
                      Standalone Villa
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-sm">
                    <div>
                      <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">
                        <span>210 m²</span>
                        <span>•</span>
                        <span>2 King Suites</span>
                        <span>•</span>
                        <span>Max 5 Guests</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Sanctuary Family Villa
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        A secluded autonomous residence with 12m private pool, dedicated private chef dining terrace, and dual master suites.
                      </p>
                    </div>
                    <div className="pt-space-xs border-t border-outline-variant/30 flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase block">From</span>
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">€2,400</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ night</span>
                      </div>
                      <Link href={`/rooms?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${guests}`} className="bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm uppercase px-3 py-2 rounded transition-colors text-center">
                        View Sanctuary
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div></main>

    </div>
  )
}
