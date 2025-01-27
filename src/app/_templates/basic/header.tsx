"use client";

import React, { useState } from "react";
import Link from "next/link";
import { routes } from "../../routes";
import type { Route } from "../../routes";
import { Menu } from "lucide-react";

// Shared CTA
import CTA, { CTAOption } from "@/app/_layout/cta";

// If you have a logo
import Logo from "@/app/_layout/logo";

// Filter routes specifically for "basic" layout
const basicLayoutRoutes = routes.filter((route) =>
  route.showInLayouts?.includes("basic")
);

export default function Header() {
  // Simple local state for mobile dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The CTA items we want to display in the basic layout
  // Hard-coded here for clarity; you can customize
    const ctaOptions: CTAOption[] = ["auth"];

  return (
    <header
      className="
        sticky top-0
        z-10
        h-16
        border-b border-gray-200 dark:border-[#252525]
        bg-white dark:bg-[#111]
        bg-opacity-70
        backdrop-blur-lg
      "
    >
      <div className="flex items-center justify-between h-full px-4 relative">
        {/* Left side: Logo + desktop nav */}
        <div className="flex items-center gap-4">
          <Logo />
          {/* Desktop nav: hidden on mobile */}
          <nav className="hidden md:flex gap-4">
            {basicLayoutRoutes.map(({ href, label }: Route) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side: CTA + hamburger for mobile */}
        <div className="flex items-center space-x-3">
          <CTA options={ctaOptions} />
          {/* Mobile hamburger icon (hidden on md+) */}
          <button
            type="button"
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <nav
            className="
              absolute top-full right-4
              mt-2 w-48
              bg-white dark:bg-[#111]
              border border-gray-200 dark:border-[#252525]
              rounded-md shadow-md
              p-2
              md:hidden
            "
          >
            <ul className="flex flex-col space-y-1">
              {basicLayoutRoutes.map(({ href, label }: Route) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      block px-3 py-2 text-sm
                      font-medium text-gray-700 dark:text-gray-300
                      hover:bg-gray-100 dark:hover:bg-neutral-800
                      rounded
                    "
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
