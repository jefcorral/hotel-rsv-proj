"use client"

import { useEffect, useState } from "react"

export function HoldTimer({ minutes = 20 }: { minutes?: number }) {
  const [remaining, setRemaining] = useState(minutes * 60)

  useEffect(() => {
    const id = setInterval(
      () => setRemaining((s) => Math.max(0, s - 1)),
      1000
    )
    return () => clearInterval(id)
  }, [])

  const mm = Math.floor(remaining / 60)
  const ss = remaining % 60

  return (
    <span className="font-mono font-semibold text-primary">
      {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
    </span>
  )
}
