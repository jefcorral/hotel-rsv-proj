"use client"

import * as React from "react"

import { modifyBookingDates } from "@/app/(site)/account/actions"
import { DatePicker } from "@/components/date-picker"

export function ModifyBookingForm({
  bookingId,
  checkIn,
  checkOut,
  guests,
  maxGuests,
}: {
  bookingId: string
  checkIn: string
  checkOut: string
  guests: number
  maxGuests: number
}) {
  const [newCheckIn, setNewCheckIn] = React.useState(checkIn)
  const [newCheckOut, setNewCheckOut] = React.useState(checkOut)
  const [newGuests, setNewGuests] = React.useState(guests)

  function handleCheckIn(value: string) {
    setNewCheckIn(value)
    const inDate = new Date(value + "T00:00:00.000Z")
    const outDate = new Date(newCheckOut + "T00:00:00.000Z")
    if (outDate <= inDate) {
      const next = new Date(inDate)
      next.setUTCDate(next.getUTCDate() + 1)
      setNewCheckOut(next.toISOString().split("T")[0])
    }
  }

  return (
    <form action={modifyBookingDates} className="flex flex-col gap-space-md">
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="checkIn" value={newCheckIn} />
      <input type="hidden" name="checkOut" value={newCheckOut} />
      <input type="hidden" name="guests" value={newGuests} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        <div className="bg-surface-container-low rounded-lg px-space-md py-space-sm">
          <DatePicker
            label="New Check-In"
            value={newCheckIn}
            onChange={handleCheckIn}
            disabled={(d) => d.getTime() < new Date().setHours(0, 0, 0, 0)}
          />
        </div>
        <div className="bg-surface-container-low rounded-lg px-space-md py-space-sm">
          <DatePicker
            label="New Check-Out"
            value={newCheckOut}
            onChange={setNewCheckOut}
            disabled={(d) => d <= new Date(newCheckIn + "T00:00:00.000Z")}
          />
        </div>
      </div>

      <div className="bg-surface-container-low rounded-lg px-space-md py-space-sm flex items-center justify-between gap-space-sm">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
            Patrons
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Up to {maxGuests}
          </span>
        </div>
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => setNewGuests(Math.max(1, newGuests - 1))}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <span className="font-body-md text-body-md font-semibold text-on-surface w-6 text-center">
            {newGuests}
          </span>
          <button
            type="button"
            onClick={() => setNewGuests(Math.min(maxGuests, newGuests + 1))}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider py-space-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-space-xs"
      >
        <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
        Confirm New Dates
      </button>
    </form>
  )
}
