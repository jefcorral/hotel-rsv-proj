"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { DatePicker } from "@/components/date-picker"

type RoomSearchBarProps = {
  checkIn: string
  checkOut: string
  guests: number
  currency: string
  roomCount: number
}

export function RoomSearchBar({
  checkIn: initialCheckIn,
  checkOut: initialCheckOut,
  guests: initialGuests,
  currency,
  roomCount,
}: RoomSearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [checkIn, setCheckIn] = useState(initialCheckIn)
  const [checkOut, setCheckOut] = useState(initialCheckOut)
  const [guests, setGuests] = useState(initialGuests)

  function updateSearch(newCheckIn: string, newCheckOut: string, newGuests: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("checkIn", newCheckIn)
    params.set("checkOut", newCheckOut)
    params.set("guests", String(newGuests))
    router.push(`/rooms?${params.toString()}`)
  }

  function handleCheckIn(value: string) {
    let nextCheckOut = checkOut
    if (value >= nextCheckOut) {
      const nextDay = new Date(value + "T00:00:00.000Z")
      nextDay.setUTCDate(nextDay.getUTCDate() + 1)
      nextCheckOut = nextDay.toISOString().split("T")[0]
      setCheckOut(nextCheckOut)
    }
    setCheckIn(value)
    updateSearch(value, nextCheckOut, guests)
  }

  function handleCheckOut(value: string) {
    setCheckOut(value)
    updateSearch(checkIn, value, guests)
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-sm md:p-space-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        <div className="lg:col-span-3 bg-surface-container-low/70 rounded p-space-sm hover:bg-surface-container-low transition-colors cursor-pointer group">
          <DatePicker
            label="Arrival Date"
            value={checkIn}
            onChange={handleCheckIn}
            icon={
              <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
                calendar_today
              </span>
            }
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />
        </div>
        <div className="lg:col-span-3 bg-surface-container-low/70 rounded p-space-sm hover:bg-surface-container-low transition-colors cursor-pointer group">
          <DatePicker
            label="Departure Date"
            value={checkOut}
            onChange={handleCheckOut}
            icon={
              <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
                event_upcoming
              </span>
            }
            disabled={(date) =>
              date <= new Date(checkIn + "T00:00:00.000Z")
            }
          />
        </div>
        <div className="lg:col-span-3 bg-surface-container-low/70 rounded p-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
              Occupancy
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary">
              group
            </span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <input
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value, 10) || 1)
                setGuests(value)
                updateSearch(checkIn, checkOut, value)
              }}
              className="w-full bg-transparent font-headline-sm text-headline-sm text-on-surface focus:outline-none"
            />
          </div>
        </div>
        <div className="lg:col-span-3 flex h-full">
          <button
            type="button"
            onClick={() => updateSearch(checkIn, checkOut, guests)}
            className="w-full h-full min-h-[58px] bg-[#8A3B24] hover:bg-[#6C2510] text-white font-label-lg text-label-lg uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span>Update Search</span>
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-y-2 gap-x-space-md text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">
            verified_user
          </span>
          <span className="font-label-sm text-label-sm text-on-surface">
            Best Direct Rate Guarantee
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
          <span className="font-label-sm text-label-sm">
            {roomCount} residence{roomCount !== 1 && "s"} available
          </span>
        </div>
      </div>
    </div>
  )
}
