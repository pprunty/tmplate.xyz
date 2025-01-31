// app/_layout/bottom-bar.tsx
'use client';

import React, { useMemo, memo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "./routes";

const BottomBar = memo(function BottomBar({ showLabels = false }: { showLabels?: boolean }) {
  const pathname = usePathname();

  const bottomBarRoutes = useMemo(() => 
    routes.filter((r) => r.showInLayouts?.includes("bottom-bar")),
  [/* Add dependencies if routes are dynamic */]);

  return (
    <nav className="block md:hidden fixed py-4 bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-primary-background-light/80 dark:bg-primary-background-dark/80 border-t dark:border-[#333] border-[#EAEAEA]">
      <ul className="flex justify-around">
        {bottomBarRoutes.map(({ href, label, icon: Icon }) => (
          <BarItem 
            key={href}
            href={href}
            label={label}
            Icon={Icon}
            isActive={pathname.startsWith(href)}
            showLabels={showLabels}
          />
        ))}
      </ul>
    </nav>
  );
});

// Define a type for the BarItem props
interface BarItemProps {
  href: string;
  label: string;
  Icon?: React.ComponentType<{ className?: string; size?: number } & React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  showLabels: boolean;
}

const BarItem = memo(({ href, label, Icon, isActive, showLabels }: BarItemProps) => (
  <li className="flex-1">
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex flex-col items-center justify-center w-full h-full px-2 ${
        isActive
          ? "text-contrast-light dark:text-contrast-dark"
          : "text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
      } ${showLabels ? "" : "py-2"}`} // Adjusted padding
    >
      {Icon && (
        <Icon
          className={`w-6 h-6 ${
            isActive ? "scale-110" : "scale-100"
          } transition-transform duration-500 ease-in-out`}
        />
      )}
      {showLabels && (
        <span className="text-[11px] leading-tight text-center mt-1">
          {label}
        </span>
      )}
    </Link>
  </li>
));

BottomBar.displayName = "BottomBar";
BarItem.displayName = "BarItem";

export default BottomBar;