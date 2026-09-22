"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  className,
  align = "start",
}: {
  checkIn: string
  checkOut: string
  onChange: (range: { checkIn: string; checkOut: string }) => void
  className?: string
  align?: "start" | "center" | "end"
}) {
  const [open, setOpen] = React.useState(false)

  const from = new Date(checkIn + "T00:00:00.000Z")
  const to = new Date(checkOut + "T00:00:00.000Z")

  const [range, setRange] = React.useState<DateRange | undefined>({
    from,
    to,
  })

  React.useEffect(() => {
    setRange({ from, to })
  }, [checkIn, checkOut])

  function handleSelect(selected: DateRange | undefined) {
    setRange(selected)
    if (selected?.from && selected?.to) {
      onChange({
        checkIn: selected.from.toISOString().split("T")[0],
        checkOut: selected.to.toISOString().split("T")[0],
      })
      setOpen(false)
    }
  }

  const displayFrom = range?.from
    ? format(range.from, "MMM d")
    : "Check in"
  const displayTo = range?.to ? format(range.to, "MMM d") : "Check out"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 text-left",
            className
          )}
        >
          <CalendarIcon className="size-4 text-primary" />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
              Dates
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              {displayFrom} - {displayTo}
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          numberOfMonths={1}
          disabled={{ before: new Date() }}
          className="bg-surface-container-lowest"
        />
      </PopoverContent>
    </Popover>
  )
}
