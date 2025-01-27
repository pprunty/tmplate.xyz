"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "@/app/routes";

export default function BottomBar() {
  const pathname = usePathname();

  // Memoize bottom bar routes
  const bottomBarRoutes = useMemo(() => {
    return routes.filter((r) => r.showInLayouts?.includes("stacked"));
  }, []);

  return (
    <nav
      className="block md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-primary-border-light dark:border-primary-border-dark backdrop-blur-sm bg-primary-background-light/90 dark:bg-primary-background-dark/90"
    >
      <ul className="flex justify-around">
        {bottomBarRoutes.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center py-2 transition-colors duration-300 ease-in-out ${
                  isActive
                    ? "text-contrast-light dark:text-contrast-dark"
                    : "text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-6 h-6 mb-1 transform transition-transform duration-500 ease-in-out ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />
                )}
                <span className="text-[11px] pt-1">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
