"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../logo";
import { routes } from "./routes";

export default function Sidebar() {
  const pathname = usePathname();

  return (
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
          {routes.map(({ href, label, icon: Icon }) => {
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
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}