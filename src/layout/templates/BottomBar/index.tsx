'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { bottomBarRoutes } from '@/config/routes';
import Header from '@/layout/components/Header';
import Footer from '@/layout/components/Footer';

interface BottomNavBarProps {
  children: React.ReactNode;
  showFooter?: boolean; // Add showFooter as an optional prop
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ children, showFooter = false }) => {
  const pathname = usePathname();
  const t = useTranslations('Layout');

  return (
    <div className="relative min-h-screen pb-[56px]">
      <Header />
      <main className="relative z-0">{children}</main>
      {showFooter && <Footer />}

      <nav className="block md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 dark:border-[#333] bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-55 backdrop-blur-sm text-black dark:text-gray-300">
        <ul className="flex justify-around">
          {bottomBarRoutes.map(({ href, translationKey, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={`flex flex-col items-center py-2 transition-colors duration-300 ease-in-out ${
                    isActive
                      ? 'text-black dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <Icon
                    size={24}
                    className={`transform transition-transform transition-colors duration-500 ease-in-out ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <span className="text-[11px] pt-1">{t(translationKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNavBar;
