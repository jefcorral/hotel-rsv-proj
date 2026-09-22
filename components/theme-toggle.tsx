"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex size-8 items-center justify-center rounded-full bg-primary text-on-primary"
      >
        <span className="material-symbols-outlined text-[18px]">light_mode</span>
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex size-8 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-container"
    >
      <span className="material-symbols-outlined text-[18px]">
        {isDark ? "dark_mode" : "light_mode"}
      </span>
    </button>
  )
}
