'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRoutesForLayout } from '@/utils/routeUtils';
import { useTranslations } from 'next-intl';
import Logo from '@/layout/components/Logo';
import SearchBar from '@/layout/components/SearchBar'; // Adjust the import path as needed
import CTA from '@/layout/components/CTA'; // Adjust the import path as needed
import Footer from '@/layout/components/Footer';
import { LAYOUT } from '@/config';

interface SidebarMenuProps {
  children: React.ReactNode;
  layout: string; // Pass the current layout
  userRole?: string; // Optionally pass the user role
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ children, layout, userRole }) => {
  const pathname = usePathname();
  const t = useTranslations('Layout');
  const desktopCtaOptions = LAYOUT.desktop?.header?.cta?.options || [];

  // Get filtered routes for the current layout and role
  const sidebarRoutes = getRoutesForLayout(layout, userRole);

  // Find the current route based on the pathname
  const currentRoute = sidebarRoutes.find((route) => route.href === pathname);
  const pageTitle = currentRoute ? t(currentRoute.translationKey) : 'Page';

  return (
    <div className="hidden sm:flex h-screen">
      <aside className="flex flex-col w-[15%] min-w-52 max-w-64 border-r border-gray-200 dark:border-[#252525] bg-white dark:bg-[#111] text-gray-900 dark:text-white">
        <div className=" flex items-center px-3 py-3">
          <Logo />
        </div>
        <nav className="flex-1 overflow-auto pt-4">
          <ul className="space-y-1 px-2">
            {sidebarRoutes.map(({ href, translationKey, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    <span>{t(translationKey)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-black overflow-hidden">
        <header className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-[#252525] bg-white dark:bg-[#111] bg-opacity-70 backdrop-blur-lg">
          <SearchBar variation="full" />
        <CTA options={desktopCtaOptions} />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white dark:bg-[#111] rounded-md p-6 shadow-sm border border-gray-200 dark:border-[#252525]">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {pageTitle}
            </h1>
            {children}
          </div>
        <Footer/>
        </main>
      </div>
    </div>
  );
};

export default SidebarMenu;
