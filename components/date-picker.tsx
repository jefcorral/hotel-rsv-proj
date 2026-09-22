"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DatePicker({
  value,
  onChange,
  label,
  icon,
  className,
  align = "start",
  disabled,
}: {
  value: string
  onChange: (value: string) => void
  label: string
  icon?: React.ReactNode
  className?: string
  align?: "start" | "center" | "end"
  disabled?: (date: Date) => boolean
}) {
  const [open, setOpen] = React.useState(false)
  const date = new Date(value + "T00:00:00.000Z")

  function handleSelect(selected: Date | undefined) {
    if (selected) {
      onChange(selected.toISOString().split("T")[0])
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 text-left",
            className
          )}
        >
          {icon ?? <CalendarIcon className="size-4 text-primary" />}
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
              {label}
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              {value ? format(date, "MMM d, yyyy") : "Select date"}
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          numberOfMonths={1}
          className="bg-surface-container-lowest"
        />
      </PopoverContent>
    </Popover>
  )
}
