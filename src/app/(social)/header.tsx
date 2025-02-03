"use client"

import { useState, useEffect } from "react"
import CTA from "@/app/_layout/cta"
import Logo from "../logo"
import clsx from "clsx"

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsAtTop(currentScrollY <= 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerClasses = clsx(
    "sticky top-0 left-0 w-full z-[50]",
    "flex items-center justify-center",
    "sm:fixed",
    "backdrop-blur-xl",
    "bg-primary-background-light/70 dark:bg-[#171717]/70",
    "border-b dark:border-[#333] border-[#EAEAEA]",
    "sm:border-0",
    "transition-all duration-500 ease-out", // Smoother timing function
    "py-2 sm:py-4",
  )

  const logoContainerClasses = clsx(
    "transition-all duration-500 ease-out", // Increased duration and smoother timing
    "transform origin-top",
    "overflow-hidden",
    "will-change-transform, will-change-opacity, will-change-max-height", // Optimize performance
    {
      "max-h-[100px] opacity-100 mb-2": isAtTop,
      "max-h-0 opacity-0 mb-0": !isAtTop,
    },
  )

  return (
    <header className={headerClasses}>
      <div className="relative w-full flex flex-col">
        {/* Center Home on Desktop */}
        <div className="hidden sm:flex w-full justify-center">
          <h3 className="text-md font-semibold dark:text-white">Home</h3>
        </div>

        {/* Logo + CTA on Mobile (Hidden on md+) */}
        <div className="sm:hidden px-2 flex flex-col items-center w-full">
          <div className={logoContainerClasses}>
            <Logo className="" /> {/* Centered logo */}
          </div>
          <div className="w-full">
            <CTA options={["auth"]} /> {/* Full-width CTA */}
          </div>
        </div>
      </div>
    </header>
  )
}