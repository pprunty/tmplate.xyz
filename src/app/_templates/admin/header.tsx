// app/_templates/admin/header.tsx (updated)
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../../routes";
import CTA, { CTAOption } from "@/app/_layout/cta";
import Logo from "@/app/_layout/logo";

export default function AdminHeader() {
  const pathname = usePathname();
  const ctaOptions: CTAOption[] = ["auth"];

  // Filter routes for admin layout
  const adminRoutes = routes.filter((route) =>
    route.showInLayouts?.includes("admin")
  );

  return (
    <header
      className="
        sticky top-0
        z-50
        h-16
        border-b border-gray-200 dark:border-[#252525]
        bg-white dark:bg-[#111]
        bg-opacity-80
        backdrop-blur-lg
      "
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo visible on mobile */}
        <div className="md:hidden">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {adminRoutes.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white ${
                pathname === href
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          <CTA options={ctaOptions} />
        </div>
      </div>
    </header>
  );
}