"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/app/_layout/logo";
import CTA, { CTAOption } from "@/app/_layout/cta";
import { routes } from "../../routes";

export default function Header() {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isTopRowVisible, setIsTopRowVisible] = useState(true);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // 2) Filter routes for "stacked" layout
const stackedRoutes = routes.filter((route) =>
  route.showInLayouts?.includes("stacked")
);

    const ctaOptions: CTAOption[] = ["auth", "shopping_cart"];

  // Center active link logic
  useEffect(() => {
    const activeItem = carouselRef.current?.querySelector(
      `a[href="${pathname}"]`
    );
    if (activeItem && carouselRef.current) {
      const carouselRect = carouselRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const offset =
        itemRect.left -
        carouselRect.left -
        carouselRect.width / 2 +
        itemRect.width / 2;

      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  // Handle scroll: show/hide the top row
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isScrollingDown) {
      setIsTopRowVisible(false);
    } else {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = setTimeout(() => setIsTopRowVisible(true), 300);
    }
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    };
  }, [isScrollingDown]);

  // Recursive rendering for nested routes (for demonstration)
  const renderRoutes = (routesToRender: typeof routes, isMobile = false) => (
    <ul className={isMobile ? "flex space-x-2 py-2" : "flex space-x-2"}>
      {routesToRender.map(({ href, label, children }) => {
        const isActive = pathname === href;
        const desktopClasses = isActive
          ? "text-white font-semibold text-sm"
          : "text-gray-300 hover:text-white font-medium text-sm";
        const mobileClasses = isActive
          ? "bg-slate-600 text-white text-xs font-light"
          : "bg-slate-700 text-white hover:bg-slate-600 text-xs font-light";

        return (
          <li key={href} className={isMobile ? "" : "relative group ml-6"}>
            <Link
              href={href}
              className={`px-3 py-2 rounded-full transition-colors duration-300 ${
                isMobile ? mobileClasses : desktopClasses
              }`}
            >
              {label}
            </Link>

            {/* Dropdown for children (desktop only) */}
            {!isMobile && children && children.length > 0 && (
              <ul className="absolute left-0 top-full mt-2 bg-gray-800 shadow-md rounded-md hidden group-hover:block">
                {children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-[#333] bg-slate-900 text-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Top row (collapses on scroll) */}
        <div
          className={`overflow-hidden backdrop-blur-sm bg-slate-900/90 transition-all duration-300 ${
            isTopRowVisible ? "h-12 opacity-100" : "h-0 opacity-0"
          } px-2 sm:h-16 md:opacity-100 md:transition-none`}
        >
          <div className="flex items-center justify-between h-12 sm:h-16">
            {/* Left: Logo + desktop routes */}
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold">
                <Logo className="h-8 w-auto sm:h-12" />
              </div>
              <div className="hidden md:flex items-center space-x-2">
                {renderRoutes(stackedRoutes)}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <CTA options={ctaOptions} />
            </div>
            <div className="flex md:hidden">
              <CTA options={ctaOptions} />
            </div>
          </div>
        </div>

        {/* Mobile nav (scrollable horizontally) */}
        <div className="md:hidden py-2 bg-slate-900/70 backdrop-blur-sm">
          <div
            ref={carouselRef}
            className="overflow-x-auto px-1 whitespace-nowrap scrollbar-hide"
          >
            {renderRoutes(stackedRoutes, true)}
          </div>
        </div>
      </div>
    </nav>
  );
}
