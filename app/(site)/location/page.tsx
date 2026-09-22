import Link from "next/link"

export const metadata = {
  title: "Location & Contact | Villa Aurelia",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

export default function LocationPage() {
  return (
    <div className="bg-surface">
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
          {/* Editorial Hero Section */}
          <section className="relative w-full overflow-hidden bg-surface-container-low py-space-xl">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-space-xs text-primary mb-space-sm">
                    <span className="material-symbols-outlined text-[18px]">explore</span>
                    <span className="font-label-sm text-label-sm tracking-[0.25em] uppercase text-primary font-semibold">The Estate &amp; Concierge Atelier • Positano</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm tracking-tight">
                    Finding Sanctuary on the Amalfi Coast
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    Perched above the azure waters of Positano, Villa Aurelia awaits. Connect with our Majordomo team for private helicopter transfers, custom arrival itineraries, or general inquiries.
                  </p>
                </div>
                {/* Quick Status & Coordinates Pill */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md p-space-md bg-surface-container-lowest shadow-sm rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase text-on-surface font-bold tracking-wider">Concierge Active</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Local Time: CEST (UTC+2)</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-surface-variant hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Coordinates</span>
                    <span className="font-body-sm text-body-sm font-semibold text-primary">40.6281° N, 14.4850° E</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Main Content: Asymmetrical Two-Column Dossier Grid */}
          <section className="w-full py-space-xl bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
                {/* LEFT COLUMN: Location, Interactive Map & Itinerary Gateways (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col gap-space-lg">
                  {/* Styled Map Showcase Container */}
                  <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-high shadow-md">
                    <div className="w-full h-[400px] md:h-[460px] bg-cover bg-center relative" data-location="Positano, Amalfi Coast, Italy" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ub3XWrv9h2OI3106FTBNE2kiSkuv5XRkAvEk_g2PWKRIzIhXzfOuchsU_msxutLXOSmXBxOfkWAMpn5fCnJmFD0R8vFWB6BYiXo-gQhObbMCr4DuWGxP3JrSUwAurszHtP1y7cgNlyQA1dAvIB_DWk7cdDaTVkFDDrRxpGebusRkF60pmT-03Q_UWCY3QRKqbgnokv5fQM5hAoX0ay20iD3hPfTAcwFmDq3veNg4BbsmGTTXT9QY")'}}>
                      {/* Scrim Overlay for warm boutique tone */}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 via-transparent to-transparent" />
                      {/* Custom Interactive Crest Pin Marker Floating on Clifftop */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
                        <div className="bg-primary text-on-primary px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 transform transition-transform duration-300 group-hover:scale-105">
                          <span className="material-symbols-outlined text-[18px] text-secondary-fixed">villa</span>
                          <div className="flex flex-col text-left leading-none">
                            <span className="font-label-sm text-label-sm tracking-wider uppercase text-secondary-fixed">Villa Aurelia</span>
                            <span className="text-[10px] tracking-widest text-on-primary/90 font-label-sm uppercase">Clifftop Promontory</span>
                          </div>
                        </div>
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary" />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-pulse mt-0.5" />
                      </div>
                      {/* Map Overlay Action Bar */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                          <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-variant text-on-surface font-label-sm text-label-sm uppercase transition-colors" href="https://maps.google.com" rel="noopener noreferrer" target="_blank">
                            <span className="material-symbols-outlined text-[16px] text-primary">map</span>
                            Google Maps
                          </a>
                          <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-variant text-on-surface font-label-sm text-label-sm uppercase transition-colors" href="https://maps.apple.com" rel="noopener noreferrer" target="_blank">
                            <span className="material-symbols-outlined text-[16px] text-primary">navigation</span>
                            Apple Maps
                          </a>
                        </div>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm uppercase transition-colors" type="button">
                          <span className="material-symbols-outlined text-[16px]">file_download</span>
                          Chauffeur Directions (PDF)
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Address & Coordinate Strip Card */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                    <div className="flex items-start gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-[22px]">location_on</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Sanctuary Address</span>
                        <p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Via Panoramica 48</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">84017 Positano (SA), Amalfi Coast, Campania, Italy</p>
                      </div>
                    </div>
                    <button className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase transition-all duration-200" id="copyAddressBtn">
                      <span className="material-symbols-outlined text-[18px]" id="copyIcon">content_copy</span>
                      <span id="copyText">Copy Address</span>
                    </button>
                  </div>
                  {/* Transit, Gateways & Airport Arrival Distances */}
                  <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary font-semibold">Private Arrival &amp; Logistics</span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-1">Arrival Gateways</h2>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">Private Helipad On-Site</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-xs">
                      {/* Gateway 1 */}
                      <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Naples Int. Airport (NAP)</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">flight</span>
                          </div>
                          <p className="font-headline-sm text-headline-sm text-primary mb-1">62 km</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Approx. 1 hr 20 min via private chauffeur or 20 min helicopter transfer direct to our promontory helipad.</p>
                        </div>
                        <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary">
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                          <span className="font-label-sm text-label-sm uppercase font-semibold">Chauffeur Meet &amp; Greet</span>
                        </div>
                      </div>
                      {/* Gateway 2 */}
                      <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Rome Fiumicino (FCO)</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">flight_takeoff</span>
                          </div>
                          <p className="font-headline-sm text-headline-sm text-primary mb-1">285 km</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Approx. 3 hr 30 min via estate private Mercedes-Maybach transfer with chilled Pellegrino &amp; regional amenities.</p>
                        </div>
                        <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary">
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                          <span className="font-label-sm text-label-sm uppercase font-semibold">Long-Range Fleet Service</span>
                        </div>
                      </div>
                      {/* Gateway 3 */}
                      <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Salerno Stazione Centrale</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">train</span>
                          </div>
                          <p className="font-headline-sm text-headline-sm text-primary mb-1">39 km</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">High-Speed Frecciarossa hub (approx. 55 min scenic coastal transfer). Direct platform luggage porterage provided.</p>
                        </div>
                        <div className="mt-4 pt-3 flex items-center gap-1.5 text-outline">
                          <span className="material-symbols-outlined text-[16px]">luggage</span>
                          <span className="font-label-sm text-label-sm uppercase">Direct Platform Porterage</span>
                        </div>
                      </div>
                      {/* Gateway 4 */}
                      <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Positano Port &amp; Marina</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">directions_boat</span>
                          </div>
                          <p className="font-headline-sm text-headline-sm text-primary mb-1">1.2 km</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Complimentary vintage golf cart buggy or private Riva Aquarama tender escort to the estate pier.</p>
                        </div>
                        <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary">
                          <span className="material-symbols-outlined text-[16px]">anchor</span>
                          <span className="font-label-sm text-label-sm uppercase font-semibold">Private Mooring Buoy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Nearby Curated Coastal Highlights */}
                  <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-space-md">
                      <div>
                        <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary font-semibold">Coastal Geographic Orientation</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Excursions &amp; Nearby Splendors</h3>
                      </div>
                      <span className="font-label-sm text-label-sm uppercase text-outline">Curated Itinerary Distances</span>
                    </div>
                    <div className="divide-y-0 space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]">qr_code_2</span>
                          <div>
                            <span className="font-body-md text-body-md text-on-surface font-medium">Spiaggia Grande &amp; Positano Village</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Artisanal boutiques, linen tailors, and seaside dining</p>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold whitespace-nowrap">8 min walk / 3 min buggy</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]">landscape</span>
                          <div>
                            <span className="font-body-md text-body-md text-on-surface font-medium">Path of the Gods (Sentiero degli Dei)</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Iconic clifftop trailhead with guided private naturalist</p>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold whitespace-nowrap">12 min drive</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]">sailing</span>
                          <div>
                            <span className="font-body-md text-body-md text-on-surface font-medium">Isle of Capri &amp; Faraglioni</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Direct departure from estate dock via private 48ft Riva Yacht</p>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold whitespace-nowrap">25 min by sea</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]">castle</span>
                          <div>
                            <span className="font-body-md text-body-md text-on-surface font-medium">Ravello, Villa Cimbrone &amp; Rufolo</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Infinite terrace gardens and orchestral music festival</p>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold whitespace-nowrap">40 min drive</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
                          <div>
                            <span className="font-body-md text-body-md text-on-surface font-medium">Pompeii Archaeological Sanctuary</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Exclusive after-hours VIP access arranged by concierge</p>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold whitespace-nowrap">45 min drive</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* RIGHT COLUMN: Bespoke Inquiry Form & Majordomo Atelier (5 Cols) */}
                <div className="lg:col-span-5">
                  <div className="sticky top-28 bg-surface-container-lowest p-space-lg rounded-xl shadow-xl">
                    {/* Atelier Form Header */}
                    <div className="mb-space-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Priority Atelier</span>
                        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm uppercase text-secondary bg-secondary-fixed/30 px-2 py-0.5 rounded">
                          <span className="material-symbols-outlined text-[14px]">bolt</span>
                          2-Hr Reply Guarantee
                        </span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                        Send an Inquiry to the Majordomo Desk
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Our head concierge team replies directly to every custom request, bespoke charter itinerary, or private suite arrangement.
                      </p>
                    </div>
                    {/* The Form */}
                    <form className="space-y-space-md" id="conciergeForm">
                      {/* Guest Full Name */}
                      <div>
                        <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1" htmlFor="fullName">
                          Full Name &amp; Honorific
                        </label>
                        <input className="w-full px-4 py-3 bg-surface-container-low text-on-surface rounded border-0 placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8a3b24] transition-all text-body-md font-body-md" id="fullName" name="fullName" placeholder="e.g. Lord Julian Sterling / Contessa Elena" required type="text" />
                      </div>
                      {/* Email Address */}
                      <div>
                        <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1" htmlFor="emailAddress">
                          Private Email Address
                        </label>
                        <input className="w-full px-4 py-3 bg-surface-container-low text-on-surface rounded border-0 placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8a3b24] transition-all text-body-md font-body-md" id="emailAddress" name="emailAddress" placeholder="sterling@patroncircle.com" required type="email" />
                      </div>
                      {/* Phone & Country Dial Selector */}
                      <div>
                        <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1" htmlFor="phoneNumber">
                          Direct Telephone / WhatsApp
                        </label>
                        <div className="flex gap-2">
                          <select className="px-3 py-3 bg-surface-container-low text-on-surface rounded border-0 focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8a3b24] font-label-md text-label-md">
                            <option value={+39}>+39 (IT)</option>
                            <option value={+1}>+1 (US/CA)</option>
                            <option selected value={+44}>+44 (UK)</option>
                            <option value={+33}>+33 (FR)</option>
                            <option value={+49}>+49 (DE)</option>
                            <option value={+971}>+971 (UAE)</option>
                            <option value={+41}>+41 (CH)</option>
                          </select>
                          <input className="flex-1 px-4 py-3 bg-surface-container-low text-on-surface rounded border-0 placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8a3b24] transition-all text-body-md font-body-md" id="phoneNumber" name="phoneNumber" placeholder="7911 123456" type="tel" />
                        </div>
                      </div>
                      {/* Nature of Inquiry Selector */}
                      <div>
                        <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-2">
                          Nature of Inquiry
                        </label>
                        <div className="grid grid-cols-2 gap-2" id="inquiryTypeGroup">
                          <label className="relative flex items-center justify-center p-2.5 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-center">
                            <input defaultChecked className="peer sr-only" name="inquiryType" type="radio" defaultValue="Room Reservation" />
                            <span className="font-label-sm text-label-sm uppercase text-on-surface peer-checked:text-on-primary peer-checked:font-bold">Room Reservation</span>
                            <span className="absolute inset-0 rounded bg-primary -z-10 opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </label>
                          <label className="relative flex items-center justify-center p-2.5 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-center">
                            <input className="peer sr-only" name="inquiryType" type="radio" defaultValue="Private Villa Buyout" />
                            <span className="font-label-sm text-label-sm uppercase text-on-surface peer-checked:text-on-primary peer-checked:font-bold">Estate Buyout</span>
                            <span className="absolute inset-0 rounded bg-primary -z-10 opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </label>
                          <label className="relative flex items-center justify-center p-2.5 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-center">
                            <input className="peer sr-only" name="inquiryType" type="radio" defaultValue="Helicopter Transfer" />
                            <span className="font-label-sm text-label-sm uppercase text-on-surface peer-checked:text-on-primary peer-checked:font-bold">Heli &amp; Transfers</span>
                            <span className="absolute inset-0 rounded bg-primary -z-10 opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </label>
                          <label className="relative flex items-center justify-center p-2.5 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-center">
                            <input className="peer sr-only" name="inquiryType" type="radio" defaultValue="Gastronomy & Events" />
                            <span className="font-label-sm text-label-sm uppercase text-on-surface peer-checked:text-on-primary peer-checked:font-bold">Private Events</span>
                            <span className="absolute inset-0 rounded bg-primary -z-10 opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </label>
                        </div>
                      </div>
                      {/* Travel Dates & Party Size */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1" htmlFor="travelDates">
                            Preferred Dates
                          </label>
                          <input className="w-full px-3 py-2.5 bg-surface-container-low text-on-surface rounded border-0 placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8a3b24]" id="travelDates" placeholder="e.g. Sept 12 - Sept 18" type="text" />
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1" htmlFor="partySize">
                            Guests (Adults/Kids)
                          </label>
                          <input className="w-full px-3 py-2.5 bg-surface-container-low text-on-surface rounded border-0 placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8a3b24]" id="partySize" placeholder="2 Guests" type="text" />
                        </div>
                      </div>
                      {/* Message / Bespoke Requirements Area */}
                      <div>
                        <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1" htmlFor="guestMessage">
                          Bespoke Notes &amp; Dietary Requirements
                        </label>
                        <textarea className="w-full px-4 py-3 bg-surface-container-low text-on-surface rounded border-0 placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8a3b24] transition-all text-body-sm font-body-sm resize-none" id="guestMessage" placeholder="Describe your arrival logistics, yacht charter interests, suite preferences, or anniversary details..." rows={3} defaultValue={""} />
                      </div>
                      {/* Consent Checkbox */}
                      <div className="flex items-start gap-2.5">
                        <input className="mt-1 h-4 w-4 rounded accent-primary border-outline text-primary focus:ring-0" id="consentCheckbox" required type="checkbox" />
                        <label className="font-body-sm text-body-sm text-on-surface-variant leading-tight cursor-pointer" htmlFor="consentCheckbox">
                          I consent to receiving discrete arrival communication via WhatsApp and verified private email.
                        </label>
                      </div>
                      {/* CTA Submit Button */}
                      <button className="w-full py-3.5 px-6 rounded bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2" type="submit">
                        <span>Send Inquiry &amp; Contact Concierge</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                      {/* Confidentiality & Security Pledge */}
                      <div className="pt-2 flex items-center justify-center gap-2 text-outline">
                        <span className="material-symbols-outlined text-[16px]">lock</span>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider">Discreet &amp; Confidential • 256-Bit Encrypted Atelier</span>
                      </div>
                    </form>
                    {/* Success Confirmation State (Hidden by default) */}
                    <div className="hidden mt-4 p-4 rounded-lg bg-surface-container-high border-0 shadow-sm flex items-start gap-3" id="formSuccessToast">
                      <span className="material-symbols-outlined text-secondary text-[24px]">task_alt</span>
                      <div>
                        <p className="font-label-md text-label-md uppercase text-on-surface font-bold">Dossier Dispatched</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Your arrival inquiry has reached our Positano Majordomo. Expect personal response within two hours.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Photographic Sanctuary Interlude (Reflecting Mediterranean Architecture) */}
          <section className="w-full bg-surface-container-low py-space-xl">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-center">
                <div className="md:col-span-5 flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-primary font-semibold mb-2">Arrival by Land, Air, or Sea</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm leading-tight">
                    Hand-Carved Stone, Sea Terraces &amp; Unhurried Luxury
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Positioned along the quiet panoramic promontory of Positano, Villa Aurelia commands uninterrupted views across the Gulf of Salerno. Our grounds blend century-old olive groves, artisanal limestone arches, and secluded poolside cabanas carved into coastal cliff rock.
                  </p>
                  <div className="flex items-center gap-space-lg">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary font-medium">18</span>
                      <span className="font-label-sm text-label-sm uppercase text-outline">Private Suites &amp; Villas</span>
                    </div>
                    <div className="w-px h-10 bg-outline-variant/40" />
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary font-medium">350m</span>
                      <span className="font-label-sm text-label-sm uppercase text-outline">Clifftop Elevation</span>
                    </div>
                    <div className="w-px h-10 bg-outline-variant/40" />
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary font-medium">100%</span>
                      <span className="font-label-sm text-label-sm uppercase text-outline">Sea-Facing Terraces</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="relative rounded-xl overflow-hidden shadow-xl group">
                    <img className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Luxurious Mediterranean villa estate in Positano Italy at golden hour sunset with artisanal stone arches hand-plastered walls terracotta tile roof turquoise infinity swimming pool sun loungers bougainvillea flowers olive trees and panoramic views of the Amalfi coast sea" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtHEYJl-FA6devrOetpoZkr_OFR2T46nNbfPLOvXtrz25OdnON42yCK_lMU8kLpv3epl1JmdTr1BsVdbTUFfYGZx4I3tlJD4vgja7usn3E3OznOsaerROHV57UV5tk1ExqrBMz25Rzre-6RLHSDAAmv-Vjur60vO8halmoxPvNCGEW3ZEmOTuAtp9ImE_-iAdyMLMfVwYrWmN-JbPEQKKYanF_oDxppWNkF-iOidxX07wYBMDyTwVk" />
                    <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/85 backdrop-blur-md p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold">The Promontory Belvedere</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Private guest arrival gate and sunset pergola</p>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[22px]">photo_camera</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Direct Contact Channels Row (4 Cards Grid) */}
          <section className="w-full py-space-xl bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="text-center max-w-2xl mx-auto mb-space-lg">
                <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-primary font-semibold">Immediate Dispatch</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Direct Contact Channels</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Should your arrival be immediate or your schedule require urgent adjustment, our front desk and majordomos remain on duty at all times.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
                {/* Card 1: Phone & Direct Line */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Concierge Direct</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-2 font-medium">+39 089 875 110</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Toll-free US/UK priority lines available. Instant connection to our Head Majordomo on duty.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <a className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md uppercase transition-colors" href="tel:+39089875110">
                      <span>Call Concierge Now</span>
                      <span className="material-symbols-outlined text-[16px]">call_made</span>
                    </a>
                  </div>
                </div>
                {/* Card 2: Email & Dossiers */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Estate Concierge Desk</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-2 font-medium truncate" title="concierge@villaaurelia.it">concierge@villaaurelia.it</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      For suites, buyout dossiers, editorial press requests, and bespoke sailing charters.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <a className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md uppercase transition-colors" href="mailto:concierge@villaaurelia.it">
                      <span>Send Direct Email</span>
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                    </a>
                  </div>
                </div>
                {/* Card 3: WhatsApp Concierge */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-[24px]">chat</span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Instant WhatsApp Dispatch</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-2 font-medium">+39 340 918 2741</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Live 24/7 guest assistance, marina transfers, and in-transit luggage dispatch updates.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <a className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md uppercase transition-colors" href="https://wa.me/393409182741" rel="noopener noreferrer" target="_blank">
                      <span>Chat on WhatsApp</span>
                      <span className="material-symbols-outlined text-[16px]">forum</span>
                    </a>
                  </div>
                </div>
                {/* Card 4: Front Desk & Concierge Hours */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-[24px]">nest_clock_farsight_analog</span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Reception &amp; Atelier Hours</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-2 font-medium">24 Hours / 7 Days</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Check-in from 15:00 • Check-out until 12:00. Private discrete in-suite check-in anytime on request.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <button className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md uppercase transition-colors" type="button">
                      <span>View Arrival Guide</span>
                      <span className="material-symbols-outlined text-[16px]">info</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Interactive Client-side Script */}
        </div></main>

    </div>
  )
}
