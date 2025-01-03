'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getRoutesForLayout } from '@/utils/routeUtils';
import Header from '@/layout/components/Header';
import Footer from '@/layout/components/Footer';

interface BottomNavBarProps {
  children: React.ReactNode;
  layout: string; // Pass the layout as a prop
  userRole?: string; // Optionally pass the user role
  variation?: 'blur' | 'linear-opacity'; // Add variation prop
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  children,
  layout,
  userRole,
  variation = 'blur', // Default to "blur"
}) => {
  const pathname = usePathname();
  const t = useTranslations('Layout');

  // Get filtered routes for the current layout and role
  const bottomBarRoutes = getRoutesForLayout(layout, userRole);

  // Header height for mobile devices
  const mobileHeaderHeight = '7em'; // 56px (h-14 in Tailwind)

  return (
    <div className="relative min-h-screen pb-[56px]">
      <Header />
      {/* Add a dynamic margin-top for main */}
      <main
        className="relative z-0"
        style={{
          marginTop: mobileHeaderHeight, // Dynamically apply margin-top
        }}
      >
        {children}
      </main>
      <Footer />

      <nav
        className={`block md:hidden fixed bottom-0 left-0 right-0 z-50 ${
          variation === 'blur'
            ? 'border-t border-primary-border-light dark:border-primary-border-dark backdrop-blur-sm'
            : '' // No border for linear-opacity
        }`}
        style={
          variation === 'linear-opacity'
            ? {
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))', // Linear opacity effect
              }
            : undefined
        }
      >
        <ul className="flex justify-around">
          {bottomBarRoutes.map(({ href, translationKey, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={`flex flex-col items-center py-2 transition-colors duration-300 ease-in-out ${
                    isActive
                      ? 'text-contrast-light dark:text-contrast-dark'
                      : 'text-secondary-text-light dark:text-secondary-text-dark'
                  }`}
                >
                  {Icon && (
                    <Icon
                      size={24}
                      className={`transform transition-transform duration-500 ease-in-out ${
                        isActive ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  )}
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
