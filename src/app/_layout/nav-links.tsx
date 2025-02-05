'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from '../routes';

// Define the props for the NavLinks component
interface NavLinksProps {
  routes: Route[];
  activeStyle?: 'background' | 'underline'; // Prop to toggle active style
}

export default function NavLinks({
  routes,
  activeStyle = 'background',
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className="flex space-x-2 py-2">
      {routes.map(({ href, label }) => {
        const isActive = pathname === href;

        // Determine active class based on the activeStyle prop
        const activeClasses =
          activeStyle === 'background'
            ? 'bg-highlight-light dark:bg-highlight-dark text-contrast-dark dark:text-contrast-light'
            : 'underline text-highlight-light dark:text-highlight-dark';

        const mobileClasses = isActive
          ? `${activeClasses} text-xs font-light`
          : 'bg-secondary-background-light dark:bg-secondary-background-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-active-light dark:hover:bg-primary-active-dark text-xs font-light';

        return (
          <li key={href}>
            <Link
              href={href}
              className={`px-3 py-2 rounded-full transition-colors duration-300 ${
                activeStyle === 'underline' && isActive ? 'rounded-none' : ''
              } ${mobileClasses}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
