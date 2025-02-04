"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import CTA, { type CTAOption } from "@/app/_layout/cta"

export default function AdminHeader() {
  const pathname = usePathname()
  const ctaOptions: CTAOption[] = ["auth"]

  const tabs = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "User Management" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/settings", label: "Settings" },
  ]

  return (
    <header
      className={`
        sticky top-0 z-50
        backdrop-blur-lg
        bg-primary-background-light/85 dark:bg-primary-background-dark/85
        border-b border-[#EAEAEA] dark:border-[#333]
        text-white dark:text-[#888]
      `}
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo + CTA */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <CTA options={ctaOptions} />
          </div>
        </div>
      </div>

      {/* Tabs / Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(({ href, label }) => {
            const isActive = pathname === href

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group relative overflow-hidden
                  whitespace-nowrap py-4 px-3
                  font-medium text-sm
                  border-b-2
                  transition-colors duration-300
                  ${
                    isActive
                      ? // Active tab: bottom border, special text color
                        "border-highlight-light dark:border-highlight-dark text-contrast-dark dark:text-contrast-light"
                      : // Inactive tab: no border, normal text
                        "border-transparent text-primary-text-light dark:text-primary-text-dark"
                  }
                `}
              >
                {/* Animated background for hover (inactive tabs) */}
                {!isActive && (
                  <span
                    className="
                      absolute inset-0
                      transform origin-left scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300
                      bg-primary-active-light dark:bg-primary-active-dark
                      rounded-md
                      z-0
                    "
                  />
                )}

                {/* Label text on top */}
                <span className="relative z-10">{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
