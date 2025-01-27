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
  }, [routes]);

  return (
    <nav className="block md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm bg-slate-900/90 border-t border-gray-700">
      <ul className="flex justify-around">
        {bottomBarRoutes.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center py-2 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-6 h-6 mb-1 ${
                      isActive ? "scale-110" : "scale-100"
                    } transition-transform`}
                  />
                )}
                <span className="text-xs">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
