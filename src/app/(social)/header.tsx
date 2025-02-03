"use client"

import { useState, useEffect } from "react"
import CTA from "@/app/_layout/cta"
import Logo from "../logo"

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

  return (
    <header
      className={`
        sticky
        top-0
        left-0
        w-full
        z-[50]
        flex
        items-center
        justify-center
        sm:fixed
        backdrop-blur-xl
        bg-primary-background-light/70 dark:bg-[#171717]/70
        border-b dark:border-[#333] border-[#EAEAEA]
        sm:border-0
        transition-all duration-500 ease-in-out sm:transition-none
        ${isAtTop ? "pt-2 pb-3" : "py-2"} sm:py-4
      `}
    >
      <div className="relative w-full flex flex-col">
        {/* Center Home on Desktop */}
        <div className="hidden sm:flex w-full justify-center">
          <h3 className="text-md font-semibold dark:text-white">Home</h3>
        </div>

        {/* Logo + CTA on Mobile (Hidden on md+) */}
        <div className="sm:hidden px-2 flex flex-col items-center w-full">
          <div
            className={`
              transition-all duration-500 ease-in-out
              transform origin-top
              ${isAtTop ? "scale-y-100 opacity-100 mb-2" : "scale-y-0 opacity-0 mb-0"}
              overflow-hidden
            `}
            style={{
              maxHeight: isAtTop ? "100px" : "0",
              transitionProperty: "transform, opacity, max-height, margin",
            }}
          >
            <Logo className="" /> {/* Centered logo */}
          </div>
          <div className="w-full transition-all duration-500 ease-in-out">
            <CTA options={["auth"]} /> {/* Full-width CTA */}
          </div>
        </div>
      </div>
    </header>
  )
}

