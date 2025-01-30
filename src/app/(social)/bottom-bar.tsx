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
    <nav className="fixed sm:hidden py-2 bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-primary-background-light/50 dark:bg-primary-background-dark/50">
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
      className={`flex flex-col items-center transition-colors duration-300 ease-in-out ${
        isActive
          ? "text-contrast-light dark:text-contrast-dark"
          : "text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
      } ${showLabels ? "py-0" : "pt-2"}`}
    >
      {Icon && (
        <Icon
          className={`w-6 h-6 mb-1 transform transition-transform duration-500 ease-in-out ${
            isActive ? "scale-110" : "scale-100"
          }`}
        />
      )}
      {showLabels && <span className="text-[11px]">{label}</span>}
    </Link>
  </li>
));

BottomBar.displayName = "BottomBar";
BarItem.displayName = "BarItem";


export default BottomBar;