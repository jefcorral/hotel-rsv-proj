import Link from "next/link"

import { authenticate } from "../actions"

export const metadata = {
  title: "Villa Aurelia | Sign In",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

type PageProps = {
  searchParams: Promise<{
    error?: string
    registered?: string
    email?: string
    callbackUrl?: string
  }>
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <div className="bg-surface room-generated-theme">
      <main className="w-full pt-20 bg-background flex-1 flex flex-col items-center justify-center"><div className="flex flex-col w-full">
          <div className="relative w-full py-12 md:py-16 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-primary-fixed/25 via-secondary-fixed/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-24 right-1/4 w-[400px] h-[400px] bg-surface-container-high/60 rounded-full blur-2xl pointer-events-none -z-10" />
            <div className="w-full max-w-[540px] bg-surface-container-lowest shadow-xl rounded-xl p-8 sm:p-12 relative">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-5 shadow-sm">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L28.2 15.8H40.6L30.6 23.1L34.4 34.9L24 27.6L13.6 34.9L17.4 23.1L7.4 15.8H19.8L24 4Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M24 8V40M12 24C12 30.6274 17.3726 36 24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
                    <circle cx={24} cy={24} fill="#8a3b24" r={3} />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Private Guest Portal</span>
                </div>
                <h1 className="font-headline-md text-headline-md text-on-surface mb-2.5">Welcome Back to Villa Aurelia</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                  Sign in to access your guest atelier, upcoming stays, and bespoke concierge services.
                </p>
              </div>
              {params.registered && (
                <div className="mb-5 rounded-lg bg-secondary-fixed/40 px-4 py-3 font-body-sm text-body-sm text-on-surface">
                  Your guest account was created. Please sign in to continue.
                </div>
              )}
              {params.error === "credentials" && (
                <div className="mb-5 rounded-lg bg-error-container/60 border border-primary/30 px-4 py-3 font-body-sm text-body-sm text-on-surface">
                  Invalid email or password. Please try again.
                </div>
              )}
              <form action={authenticate} className="flex flex-col gap-5">
                <input type="hidden" name="callbackUrl" value={params.callbackUrl ?? "/account"} />
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant flex items-center justify-between" htmlFor="email">
                    <span>Email Address</span>
                    <span className="font-label-sm text-label-sm text-outline capitalize tracking-normal">Registered Guest</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-outline text-[20px] pointer-events-none">mail</span>
                    <input className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/60 pl-11 pr-4 py-3.5 rounded-lg text-body-md font-body-md outline-none bg-surface-container-lowest transition-all shadow-sm focus:bg-surface-container-lowest focus:shadow-md focus:ring-2 focus:ring-primary-container/20" id="email" name="email" placeholder="eleanor@vane-holdings.co.uk" required type="email" defaultValue={params.email ?? ""} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant" htmlFor="password">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-outline text-[20px] pointer-events-none">lock</span>
                    <input className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/60 pl-11 pr-12 py-3.5 rounded-lg text-body-md font-body-md outline-none transition-all shadow-sm focus:bg-surface-container-lowest focus:shadow-md focus:ring-2 focus:ring-primary-container/20" id="password" name="password" placeholder="••••••••••••" required type="password" />
                    <button aria-label="Toggle password visibility" className="absolute right-3.5 p-1 rounded text-outline hover:text-on-surface transition-colors flex items-center justify-center" id="toggle-pwd-btn" type="button">
                      <span className="material-symbols-outlined text-[20px]" id="toggle-pwd-icon">visibility</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                    <div className="relative flex items-center justify-center">
                      <input className="peer sr-only" id="remember-device" type="checkbox" />
                      <div className="w-4 h-4 rounded bg-surface-container-high peer-checked:bg-primary transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px] text-on-primary scale-0 peer-checked:scale-100 transition-transform font-bold">check</span>
                      </div>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      Remember this device
                    </span>
                  </label>
                  <a className="font-label-md text-label-md text-primary-container hover:text-primary underline decoration-primary-container/40 underline-offset-4 transition-colors" data-path="forgot-password" href="#">
                    Forgot password?
                  </a>
                </div>
                <button className="group relative w-full mt-2 bg-primary-container hover:bg-primary text-on-primary py-3.5 px-6 rounded-lg font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]" type="submit">
                  <span>Sign In to Guest Atelier</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-secondary-fixed opacity-60" />
                </button>
              </form>
              <div className="relative my-7 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full bg-surface-container-high h-[1px]" />
                </div>
                <span className="relative px-4 bg-surface-container-lowest font-label-sm text-label-sm text-outline uppercase tracking-widest">
                  or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <button className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm text-on-surface font-label-md text-label-md tracking-wider" type="button">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path d="M12 5c1.55 0 2.94.54 4.04 1.43l3.02-3.02C17.24 1.7 14.81 1 12 1 7.37 1 3.42 3.66 1.5 7.5l3.65 2.83C6.01 7.42 8.76 5 12 5z" fill="#EA4335" />
                    <path d="M23.5 12.28c0-.82-.07-1.61-.21-2.28H12v4.56h6.46c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.86c2.16-1.99 3.73-4.92 3.73-8.72z" fill="#4285F4" />
                    <path d="M5.15 14.67C4.9 13.91 4.76 13.1 4.76 12.26s.14-1.65.39-2.41L1.5 7.02C.54 8.93 0 11.04 0 12.26c0 1.22.54 3.33 1.5 5.24l3.65-2.83z" fill="#FBBC05" />
                    <path d="M12 23.5c3.24 0 5.96-1.07 7.95-2.91l-3.69-2.86c-1.08.72-2.46 1.15-4.26 1.15-3.24 0-5.99-2.42-6.85-5.33L1.5 16.38C3.42 20.22 7.37 23.5 12 23.5z" fill="#34A853" />
                  </svg>
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm text-on-surface font-label-md text-label-md tracking-wider" type="button">
                  <svg className="w-4 h-4 shrink-0 fill-current text-on-surface" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.69-7.85-11.97-14.42-6.04-9.35-10.87-19.78-14.49-31.3-3.62-11.52-5.43-22.38-5.43-32.58 0-14.18 3.58-26.04 10.74-35.58 7.16-9.54 16.08-14.38 26.76-14.52 4.9 0 10.37 1.34 16.42 4.02 6.05 2.68 9.92 4.08 11.61 4.2 2.01-.2 5.92-1.63 11.73-4.31 5.81-2.68 11.1-3.9 15.86-3.66 12.07.67 21.68 5.17 28.84 13.5-10.72 6.47-15.96 15.4-15.72 26.8.24 8.94 3.65 16.42 10.22 22.44 6.57 6.02 14.36 9.4 23.36 10.14-2.13 6.47-4.63 12.78-7.51 18.94zM119.22 33.72c0-7.38 2.63-14.19 7.89-20.44 5.26-6.25 11.75-10.28 19.46-12.09.22 1.45.34 2.8.34 4.03 0 7.37-2.73 14.28-8.19 20.73-5.46 6.45-12.07 10.34-19.83 11.67-.11-1.12-.17-2.42-.17-3.9z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
              <div className="mt-8 pt-6 border-t-0 flex flex-col items-center text-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  New to Villa Aurelia?
                </p>
                <Link className="mt-1 font-label-md text-label-md uppercase tracking-wider text-primary hover:text-primary-container transition-colors inline-flex items-center gap-1" href="/register">
                  <span>Join the Sovereign Circle / Register</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </Link>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">256-Bit TLS Bank-Grade Encryption</span>
              </div>
              <span className="hidden sm:inline text-outline-variant">•</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Official Villa Aurelia Guest Portal</span>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
