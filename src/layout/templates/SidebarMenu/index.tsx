'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarMenuRoutes } from '@/config/routes';
import { useTranslations } from 'next-intl';
import Logo from '@/layout/components/Logo';

interface SidebarMenuProps {
  children: React.ReactNode;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => {
  const pathname = usePathname();
  const t = useTranslations('Layout'); // Ensure your translations are set up correctly

  // Find the current route based on the pathname
  const currentRoute = sidebarMenuRoutes.find(route => route.href === pathname);
  const pageTitle = currentRoute ? t(currentRoute.translationKey) : 'Page';

  return (
    <div className="hidden sm:flex h-screen">
      <aside className="flex flex-col w-52 border-r border-gray-200 dark:border-[#252525] bg-white dark:bg-[#111] text-gray-900 dark:text-white ">
        <div className="p-4 border-gray-200 dark:border-[#252525] flex items-center">
          <Logo/>
        </div>
        <nav className="flex-1 overflow-auto pt-4">
          <ul className="space-y-1 px-2">
            {sidebarMenuRoutes.map(({ href, translationKey, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive ? 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'}
                    `}
                  >
                    <Icon size={16} />
                    <span>{t(translationKey)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-black overflow-hidden">
                <header className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-[#252525] bg-white dark:bg-[#111] bg-opacity-70 backdrop-blur-lg">
                some content here
                </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white dark:bg-[#111] rounded-md p-6 shadow-sm border border-gray-200 dark:border-[#252525]">
                                      <h1 className="text-2xl font-semibold mb-0 dark:text-white">
                                        {pageTitle}
                                      </h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SidebarMenu;
