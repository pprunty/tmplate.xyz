"use client";

import React from "react";
import Link from "next/link";
import { routes } from "../../routes";
import type { Route } from "../../routes";

// Shared CTA
import CTA, { CTAOption } from "@/app/_layout/cta";
import Logo from "@/app/_layout/logo";

const adminRoutes = routes.filter((route) =>
  route.showInLayouts?.includes("SidebarMenu")
);

export default function AdminHeader() {
    const ctaOptions: CTAOption[] = ["auth", "shopping_cart"];

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
      <div className="flex items-center justify-between h-full px-4">

        {/* Show Logo only on mobile (< md) */}
        <div className="flex md:hidden">
          <Logo />
        </div>

        {/* Desktop nav links (hidden on mobile) */}
        <nav className="hidden md:flex gap-4">
          {adminRoutes.map(({ href, label }: Route) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* The CTA on the right (shown on all device sizes) */}
        <CTA options={ctaOptions} />
      </div>
    </header>
  );
}
