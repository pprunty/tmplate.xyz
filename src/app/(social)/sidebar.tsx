'use client';

import React, { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '../logo'; // <-- adjust import
import { routes } from './routes'; // <-- or wherever your routes live
import { ThemeSwitcher } from '@/app/_components/theme-switcher';

const Sidebar = memo(function Sidebar() {
  const pathname = usePathname();

  // Filter only the routes that should appear in the sidebar
  const sidebarRoutes = useMemo(() => {
    return routes.filter((r) => r.showInLayouts?.includes('sidebar'));
  }, []);

  return (
    <nav
      className="
        hidden md:flex       /* Show only on md+ screens */
        flex-col
        items-center
        h-screen
        w-20
        fixed
        top-0
        left-0
        z-50
        bg-primary-background-light/50 dark:bg-primary-background-dark/50 text-white  /* Example background color */
        py-4
      "
    >
      {/* Top: Logo section */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Middle: main nav icons (centered vertically).
         Using flex-1 ensures this section “stretches” in the middle. */}
      <div className="flex flex-col flex-1 justify-center items-center space-y-6">
        {sidebarRoutes.map(({ href, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`
                px-5 py-3 rounded-xl
                transition-colors duration-300
                ${isActive ? 'bg-gray-800 dark:bg-[#191919]' : 'hover:bg-gray-800 hover:dark:bg-[#191919]'}
              `}
            >
              {Icon && <Icon className="w-6 h-6" />}
            </Link>
          );
        })}
      </div>

      {/* Bottom: placeholder for settings or logout, etc. */}
      <div>
        <ThemeSwitcher vertical />
      </div>
    </nav>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
