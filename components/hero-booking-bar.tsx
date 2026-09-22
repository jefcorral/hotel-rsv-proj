"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import { DatePicker } from "@/components/date-picker"
import { getDefaultSearchDates } from "@/lib/search"

function HeroBookingBarInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaults = getDefaultSearchDates()

  const [checkIn, setCheckIn] = useState(
    searchParams.get("checkIn") ?? defaults.checkIn
  )
  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") ?? defaults.checkOut
  )
  const [guests, setGuests] = useState(
    searchParams.get("guests") ?? defaults.guests
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("checkIn", checkIn)
    params.set("checkOut", checkOut)
    params.set("guests", guests)
    router.push(`/rooms?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm lg:gap-space-md items-center">
      <div className="lg:col-span-3 flex flex-col bg-surface-container-low/70 hover:bg-surface-container-low rounded p-space-sm cursor-pointer transition-colors">
        <DatePicker
          label="Check-In Date"
          value={checkIn}
          icon={<span className="material-symbols-outlined text-[15px] text-primary">calendar_today</span>}
          onChange={(value) => {
            setCheckIn(value)
            if (value >= checkOut) {
              const nextDay = new Date(value + "T00:00:00.000Z")
              nextDay.setUTCDate(nextDay.getUTCDate() + 1)
              setCheckOut(nextDay.toISOString().split("T")[0])
            }
          }}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>

      <div className="lg:col-span-3 flex flex-col bg-surface-container-low/70 hover:bg-surface-container-low rounded p-space-sm cursor-pointer transition-colors">
        <DatePicker
          label="Check-Out Date"
          value={checkOut}
          icon={<span className="material-symbols-outlined text-[15px] text-primary">calendar_month</span>}
          onChange={(value) => setCheckOut(value)}
          disabled={(date) => date <= new Date(checkIn + "T00:00:00.000Z")}
        />
      </div>

      <div className="lg:col-span-3 flex flex-col bg-surface-container-low/70 hover:bg-surface-container-low rounded p-space-sm cursor-pointer transition-colors">
        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-primary">person</span>
          Guests &amp; Suites
        </span>
        <input
          type="number"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="mt-1 w-full bg-transparent font-headline-sm text-headline-sm text-on-surface focus:outline-none"
        />
      </div>

      <div className="lg:col-span-3 flex flex-col h-full justify-end">
        <button
          type="submit"
          className="w-full h-full min-h-[58px] bg-primary hover:bg-primary-container text-on-primary rounded font-label-lg text-label-lg uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <span>Check Availability</span>
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </form>
  )
}

export function HeroBookingBar() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm lg:gap-space-md items-center opacity-60">
          <div className="lg:col-span-3 h-20 rounded bg-surface-container-low/70" />
          <div className="lg:col-span-3 h-20 rounded bg-surface-container-low/70" />
          <div className="lg:col-span-3 h-20 rounded bg-surface-container-low/70" />
          <div className="lg:col-span-3 h-20 rounded bg-primary" />
        </div>
      }
    >
      <HeroBookingBarInner />
    </Suspense>
  )
}
