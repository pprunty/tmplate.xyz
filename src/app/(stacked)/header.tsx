"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { routes } from "./routes"
import Logo from "../logo"
import CTA, { type CTAOption } from "@/app/_layout/cta"

export default function Header() {
  const pathname = usePathname()
  const [isTopRowVisible, setIsTopRowVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const stackedRoutes = routes.filter((route) => route.showInLayouts?.includes("stacked"))

  const ctaOptions: CTAOption[] = ["auth"]

  useEffect(() => {
    const activeItem = carouselRef.current?.querySelector(`a[href="${pathname}"]`)
    if (activeItem && carouselRef.current) {
      const carouselRect = carouselRef.current.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()
      const offset = itemRect.left - carouselRect.left - carouselRect.width / 2 + itemRect.width / 2

      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + offset,
        behavior: "smooth",
      })
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsTopRowVisible(currentScrollY <= lastScrollY || currentScrollY <= 0)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const renderRoutes = (routesToRender: typeof routes) => (
    <ul className="flex space-x-2 pb-3 sm:pb-3 pt-2 sm:pt-2">
      {routesToRender.map(({ href, label, children }) => {
        const isActive = pathname === href

        const linkClasses = clsx(
          "px-3 py-2 rounded-full transition-colors duration-300 text-xs font-light",
          isActive
            ? "bg-highlight-light dark:bg-highlight-dark text-contrast-dark dark:text-contrast-light"
            : "bg-secondary-background-light dark:bg-secondary-background-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-active-light dark:hover:bg-primary-active-dark",
        )

        return (
          <li key={href} className="relative group">
            <Link href={href} className={linkClasses}>
              {label}
            </Link>
            {children && children.length > 0 && (
              <ul className="absolute left-0 top-full mt-2 bg-primary-background-light dark:bg-primary-background-dark shadow-md rounded-md hidden group-hover:block">
                {children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block px-4 py-2 text-sm sm:text-md hover:bg-secondary-active-light dark:hover:bg-secondary-active-dark"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav className="backdrop-blur-lg bg-primary-background-light/85 dark:bg-primary-background-dark/85 text-white dark:text-[#888] fixed top-0 left-0 w-full z-50 border-b dark:border-[#333] border-[#EAEAEA]">
      <div className="max-w-screen-3xl sm:mx-auto">
        {/* Top row (visible when scrolling up or at the top) */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isTopRowVisible ? "max-h-14 sm:max-h-12 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex items-center justify-between h-14 sm:h-12 sm:px-4 px-0.5 pt-5 pb-2">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Logo className="h-8 w-auto sm:h-10" />
            </div>

            {/* Right: CTA */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <CTA options={ctaOptions} />
            </div>
          </div>
        </div>

        {/* Nav links (desktop and mobile) */}
        <div
          ref={carouselRef}
          className={clsx(
            "overflow-x-auto sm:px-4 px-0.5 whitespace-nowrap scrollbar-hide transition-all duration-300 ease-in-out"
          )}
        >
          {renderRoutes(stackedRoutes)}
        </div>
      </div>
    </nav>
  )
}

