"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Footer from "@/app/_layout/footer";
import Header from "./header";
import { routes } from "@/app/routes";
import type { Route } from "@/app/routes";

// Optional: If you have user roles
const userRoles = ["admin"];

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter the routes for a “mobile-friendly” menu
  const mobileRoutes = routes.filter((route) => {
    const isMobileRoute = route.showInLayouts?.includes("MobileMenu");
    const userHasAccess =
      !route.role || route.role.some((role) => userRoles.includes(role));
    return isMobileRoute && userHasAccess;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black">
      {/* Header with a "hamburger" to show/hide the mobile menu */}
      <div className="sticky top-0 z-10">
        <Header />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 border-b border-gray-200 dark:border-[#252525] w-full
                     text-left text-sm font-medium dark:text-white
                     bg-white dark:bg-[#111]"
        >
          {isMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <nav className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#252525]">
          <ul className="flex flex-col space-y-1 px-4 py-2">
            {mobileRoutes.map(({ href, label, icon: Icon }: Route) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      flex items-center gap-3 px-2 py-2 text-sm font-medium
                      rounded-md transition-colors
                      ${
                        isActive
                          ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      }
                    `}
                  >
                    {Icon && <Icon size={16} />}
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 overflow-auto">
        <div
          className="
            bg-white dark:bg-[#111]
            rounded-md p-6
            shadow-sm
            border border-gray-200 dark:border-[#252525]
          "
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
