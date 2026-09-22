"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import { DatePicker } from "@/components/date-picker"
import { getDefaultSearchDates } from "@/lib/search"

function BookingSearchInner({
  formId,
  wrapperClassName = "grid grid-cols-1 gap-4",
  buttonLabel = "Check Availability",
  buttonClassName = "w-full rounded bg-primary px-4 py-2 font-label-lg text-label-lg uppercase tracking-wider text-on-primary shadow-md transition-colors hover:bg-primary-container",
  showButton = true,
}: {
  formId?: string
  wrapperClassName?: string
  buttonLabel?: string
  buttonClassName?: string
  showButton?: boolean
}) {
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
    <form id={formId} onSubmit={handleSubmit} className={wrapperClassName}>
      <DatePicker
        label="Check-In"
        value={checkIn}
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

      <DatePicker
        label="Check-Out"
        value={checkOut}
        onChange={(value) => setCheckOut(value)}
        disabled={(date) => date <= new Date(checkIn + "T00:00:00.000Z")}
      />

      <div className="flex flex-col gap-1">
        <label
          htmlFor="guests"
          className="font-label-sm text-label-sm uppercase text-outline tracking-wider flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">
            person
          </span>
          Guests
        </label>
        <input
          id="guests"
          type="number"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full rounded bg-surface-container-low px-2 py-1.5 font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {showButton && (
        <button type="submit" className={buttonClassName}>
          {buttonLabel}
        </button>
      )}
    </form>
  )
}

export function BookingSearch(props: React.ComponentProps<typeof BookingSearchInner>) {
  return (
    <Suspense
      fallback={
        <div className={props.wrapperClassName ?? "grid grid-cols-1 gap-4 animate-pulse"}>
          <div className="h-14 rounded bg-surface-container-low" />
          <div className="h-14 rounded bg-surface-container-low" />
          <div className="h-14 rounded bg-surface-container-low" />
          {props.showButton !== false && (
            <div className="h-14 rounded bg-primary" />
          )}
        </div>
      }
    >
      <BookingSearchInner {...props} />
    </Suspense>
  )
}
