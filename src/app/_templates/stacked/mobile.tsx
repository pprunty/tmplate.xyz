// app/_templates/stacked/mobile.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "@/app/routes";

import Header from "./header";
import Footer from "@/app/_layout/footer";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname();

  // If you don't have that function, just use a subset of routes manually:
  const bottomBarRoutes = routes.filter(r => r.showInLayouts?.includes('stacked'));

  return (
    <div className="relative min-h-screen pb-[56px]">
      {/* The same sticky/fixed header up top */}
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />

      {/* Bottom bar nav for mobile */}
      <nav className="block md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm bg-slate-900/90 border-t border-gray-700">
        <ul className="flex justify-around">
          {bottomBarRoutes.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
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
    </div>
  );
}
