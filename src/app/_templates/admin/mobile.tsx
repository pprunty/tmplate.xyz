// app/_templates/admin/mobile.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../../routes";
import { Sheet, SheetTrigger, SheetContent } from "@/app/_components/sheet";
import Logo from "@/app/_layout/logo";
import { MenuIcon } from "lucide-react";
import CTA, { CTAOption } from "@/app/_layout/cta";
import Footer from "@/app/_layout/footer";

export default function MobileAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaOptions: CTAOption[] = ["auth", "shopping_cart"];

  const adminRoutes = routes.filter((route) =>
    route.showInLayouts?.includes("admin")
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#252525]">
        <div className="flex items-center justify-between h-16 px-4">
          <SheetTrigger onClick={() => setMenuOpen(true)}>
            <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </SheetTrigger>

          <Sheet isOpen={menuOpen} onClose={() => setMenuOpen(false)} side="left">
            <SheetContent>
              <div className="flex flex-col h-full">
                <div className="px-4 py-6 border-b border-gray-200 dark:border-[#252525]">
                  <Logo />
                </div>
                <nav className="flex-1 overflow-y-auto pt-4">
                  <ul className="space-y-2 px-2">
                    {adminRoutes.map(({ href, label, icon: Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
                            pathname === href
                              ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          {Icon && <Icon className="w-5 h-5" />}
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1 flex justify-center md:hidden">
            <Logo />
          </div>

          <CTA options={ctaOptions} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-black min-h-screen">
        <div className="bg-white dark:bg-[#111] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-[#252525]">
          {children}
        </div>
      <Footer/>
      </main>

    </div>
  );
}