"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/_layout/logo";
import Footer from "@/app/_layout/footer";
import Header from "./header";
import { routes } from "@/app/routes";
// import type { Route } from "@/app/routes";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  // Placeholder for user roles in your app
  const userRoles = ["admin"];

  const pathname = usePathname();

  // Only show items that belong in the "SidebarMenu" layout
  const sidebarRoutes = routes.filter((route) => {
    const isSidebarRoute = route.showInLayouts?.includes("admin");
    const userHasAccess =
      !route.role || route.role.some((role) => userRoles.includes(role));
    return isSidebarRoute && userHasAccess;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className="
          sticky top-0
          flex flex-col
          w-[10%] min-w-52 max-w-64
          border-r border-gray-200 dark:border-[#252525]
          bg-white dark:bg-[#111]
          text-gray-900 dark:text-white
          h-screen
        "
      >
        <div className="flex items-center px-3 py-3">
          <Logo />
        </div>
        <nav className="flex-1 overflow-auto pt-4">
          <ul className="space-y-1 px-2">
            {sidebarRoutes.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {Icon && <Icon className={"w-4 h-4"} />}
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 bg-gray-50 dark:bg-black">
        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-auto">
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

          <Footer />
        </main>
      </div>
    </div>
  );
}
