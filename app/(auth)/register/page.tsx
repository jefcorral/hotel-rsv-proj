import Link from "next/link"

import { registerUser } from "../actions"

export const metadata = {
  title: "Villa Aurelia | Create Account",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

const ERROR_MESSAGES: Record<string, string> = {
  missing: "Please complete all required fields.",
  weak: "Password must be at least 8 characters and include a number and a symbol.",
  mismatch: "Passwords must correspond precisely.",
  exists: "An account already exists for this email address.",
}

type PageProps = {
  searchParams: Promise<{ error?: string }>
}

export default async function RegisterPage({ searchParams }: PageProps) {
  const { error } = await searchParams
  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-background flex-1 flex flex-col items-center justify-center"><div className="flex flex-col w-full items-center justify-center py-10 px-4 sm:px-6 relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="w-[620px] h-[620px] rounded-full bg-primary-container/5 blur-3xl -translate-y-12" />
            <div className="w-[480px] h-[480px] rounded-full bg-secondary-container/10 blur-2xl translate-x-32 translate-y-36" />
          </div>
          <div className="relative w-full max-w-xl z-10 flex flex-col items-center">
            <div className="w-full bg-surface-container-lowest shadow-[0_24px_48px_-12px_rgba(43,30,26,0.08),0_4px_16px_-4px_rgba(43,30,26,0.03)] rounded-xl p-8 sm:p-12 transition-all">
              <div className="text-center space-y-3 mb-8">
                <div className="inline-flex items-center justify-center gap-2 mb-1">
                  <span className="w-8 h-[1px] bg-outline-variant" />
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">The Guest Circle</span>
                  <span className="w-8 h-[1px] bg-outline-variant" />
                </div>
                <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Create Your Guest Account</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Join the Villa Aurelia guest circle to unlock private suites, curate bespoke itineraries, and receive exclusive patron privileges.
                </p>
              </div>
              {error && ERROR_MESSAGES[error] && (
                <div className="mb-6 rounded-lg bg-error-container/60 border border-primary/30 px-4 py-3 font-body-sm text-body-sm text-on-surface">
                  {ERROR_MESSAGES[error]}
                </div>
              )}
              <form action={registerUser} className="space-y-6">
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface" htmlFor="fullName">
                    Full Name
                  </label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md px-4 py-3.5 rounded-lg outline-none transition-all placeholder:text-outline-variant focus:shadow-[0_0_0_2px_#8a3b24]" name="fullName" id="fullName" placeholder="Lady Eleanor Vane-Tempest" required type="text" />
                    <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">badge</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md px-4 py-3.5 rounded-lg outline-none transition-all placeholder:text-outline-variant focus:shadow-[0_0_0_2px_#8a3b24]" name="email" id="email" placeholder="eleanor@vane-holdings.co.uk" required type="email" />
                    <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">mail</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface" htmlFor="phone">
                      Mobile Phone
                    </label>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/80 normal-case">For WhatsApp &amp; Arrival Concierge</span>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="relative w-36 shrink-0">
                      <select name="countryCode" className="w-full appearance-none bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md px-3.5 py-3.5 rounded-lg outline-none transition-all cursor-pointer focus:shadow-[0_0_0_2px_#8a3b24]" id="countryCode">
                        <option value={+39}>+39 (IT)</option>
                        <option value={+44}>+44 (UK)</option>
                        <option value={+1}>+1 (US)</option>
                        <option value={+33}>+33 (FR)</option>
                        <option value={+41}>+41 (CH)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">expand_more</span>
                    </div>
                    <div className="relative flex-1">
                      <input className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md px-4 py-3.5 rounded-lg outline-none transition-all placeholder:text-outline-variant focus:shadow-[0_0_0_2px_#8a3b24]" name="phone" id="phone" placeholder="7911 123456" required type="tel" />
                      <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">smartphone</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface" htmlFor="password">
                    Create Master Password
                  </label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md px-4 py-3.5 rounded-lg outline-none transition-all placeholder:text-outline-variant focus:shadow-[0_0_0_2px_#8a3b24]" name="password" id="password" placeholder="••••••••••••" required type="password" />
                    <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" type="button">
                      <span className="material-symbols-outlined text-[20px]" id="pw-icon">visibility</span>
                    </button>
                  </div>
                  <div className="pt-1.5 space-y-1.5">
                    <div className="flex gap-1.5 h-1.5 w-full">
                      <div className="h-full flex-1 rounded-full bg-surface-variant transition-colors duration-300" id="bar-1" />
                      <div className="h-full flex-1 rounded-full bg-surface-variant transition-colors duration-300" id="bar-2" />
                      <div className="h-full flex-1 rounded-full bg-surface-variant transition-colors duration-300" id="bar-3" />
                      <div className="h-full flex-1 rounded-full bg-surface-variant transition-colors duration-300" id="bar-4" />
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span className="font-label-sm text-label-sm tracking-wide" id="strength-label">Enter minimum 8 characters</span>
                      <span className="font-label-sm text-label-sm">Requires number &amp; symbol</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md px-4 py-3.5 rounded-lg outline-none transition-all placeholder:text-outline-variant focus:shadow-[0_0_0_2px_#8a3b24]" name="confirmPassword" id="confirmPassword" placeholder="••••••••••••" required type="password" />
                    <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline-variant text-[20px] transition-colors" id="match-indicator">check_circle</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-primary hidden" id="match-text">Passwords must correspond precisely.</p>
                </div>
                <div className="pt-2">
                  <label className="flex items-start gap-3 select-none cursor-pointer group">
                    <input className="sr-only peer" name="termsConsent" id="termsConsent" required type="checkbox" />
                    <div className="w-5 h-5 mt-0.5 rounded shrink-0 bg-surface-container-high peer-checked:bg-primary flex items-center justify-center transition-all peer-focus:shadow-[0_0_0_2px_#8a3b24]">
                      <span className="material-symbols-outlined text-[16px] text-on-primary scale-0 peer-checked:scale-100 transition-transform">check</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                      I agree to the <a className="text-primary hover:underline font-medium" data-path="terms-of-service" href="#">Terms of Service</a> and acknowledge the <a className="text-primary hover:underline font-medium" data-path="privacy-policy" href="#">Privacy Policy</a>. I also consent to receive pre-arrival itinerary notices from the Majordomo desk.
                    </span>
                  </label>
                </div>
                <button className="w-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer" type="submit">
                  <span>Create Guest Account</span>
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
              </form>
              <div className="mt-8 pt-6 text-center">
                <Link className="inline-flex items-center gap-1.5 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="/login">
                  <span>Already hold a Villa Aurelia account?</span>
                  <span className="text-primary font-bold">Sign in to your Atelier</span>
                </Link>
              </div>
            </div>
            <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-3.5 rounded-lg flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Best Rate Direct</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[0.75rem] leading-tight">Guaranteed privileges</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-3.5 rounded-lg flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">wine_bar</span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Welcome Franciacorta</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[0.75rem] leading-tight">Chilled in-suite on arrival</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-3.5 rounded-lg flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">upgrade</span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Priority Upgrades</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[0.75rem] leading-tight">Subject to availability</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-[0.6875rem]">
                Your privacy is sacred. We never share guest dossiers with third parties.
              </p>
            </div>
          </div>
        </div></main>

    </div>
  )
}
