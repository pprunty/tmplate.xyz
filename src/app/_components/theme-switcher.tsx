"use client"

import { useEffect, useLayoutEffect, useState, useCallback } from "react"
import { Monitor, Sun, Moon } from "lucide-react"
import { themeEffect } from "./theme-effect"

export function ThemeSwitcher() {
  const [preference, setPreference] = useState<undefined | null | string>(undefined)

  useLayoutEffect(() => {
    setPreference(localStorage.getItem("theme"))
    themeEffect() // Initialize theme effect
  }, [])

  const onStorageChange = useCallback((event: StorageEvent) => {
    if (event.key === "theme") setPreference(event.newValue)
  }, [])

  useEffect(() => {
    themeEffect() // Re-run theme effect when preference changes
  }, [preference])

  useEffect(() => {
    window.addEventListener("storage", onStorageChange)
    return () => window.removeEventListener("storage", onStorageChange)
  }, [onStorageChange])

  return (
    <div className="inline-flex items-center bg-primary-background-light dark:bg-primary-background-dark rounded-full border border-primary-border-light dark:border-primary-border-dark">
      {/* Buttons remain unchanged */}
      <button
        aria-label="System theme"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          preference === null
            ? "bg-primary-active-light dark:bg-primary-active-dark text-primary-text-light dark:text-primary-text-dark border border-primary-border-light dark:border-primary-border-dark"
            : "text-secondary-text-light dark:text-secondary-text-dark hover:text-primary-text-light dark:hover:text-primary-text-dark hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark"
        }`}
        onClick={() => {
          localStorage.removeItem("theme")
          setPreference(null)
        }}
      >
        <Monitor className="sm:h-3.5 sm:w-3.5 h-4 w-4" />
      </button>

      <button
        aria-label="Light theme"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          preference === "light"
            ? "bg-primary-active-light dark:bg-primary-active-dark text-primary-text-light dark:text-primary-text-dark border border-primary-border-light dark:border-primary-border-dark"
            : "text-secondary-text-light dark:text-secondary-text-dark hover:text-primary-text-light dark:hover:text-primary-text-dark hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark"
        }`}
        onClick={() => {
          localStorage.setItem("theme", "light")
          setPreference("light")
        }}
      >
        <Sun className="sm:h-3.5 sm:w-3.5 h-4 w-4" />
      </button>

      <button
        aria-label="Dark theme"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          preference === "dark"
            ? "bg-primary-active-light dark:bg-primary-active-dark text-primary-text-light dark:text-primary-text-dark border border-primary-border-light dark:border-primary-border-dark"
            : "text-secondary-text-light dark:text-secondary-text-dark hover:text-primary-text-light dark:hover:text-primary-text-dark hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark"
        }`}
        onClick={() => {
          localStorage.setItem("theme", "dark")
          setPreference("dark")
        }}
      >
        <Moon className="sm:h-3.5 sm:w-3.5 h-4 w-4" />
      </button>
    </div>
  )
}

export default ThemeSwitcher