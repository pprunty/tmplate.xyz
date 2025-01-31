"use client";

import { useMemo, memo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "./routes";
import type { FC } from "react";

// Define prop types
interface BarItemProps {
  href: string;
  label: string;
  Icon?: React.ComponentType<{ className?: string; size?: number } & React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  showLabels: boolean;
}

// BarItem Component (Memoized)
const BarItem: FC<BarItemProps> = memo(({ href, label, Icon, isActive, showLabels }) => {
  return (
    <Link href={href} className="flex flex-col items-center">
      {Icon && <Icon className={`h-6 w-6 my-2 ${isActive ? "text-primary-text" : "text-gray-400 dark:text-gray-600"}`} />}
      {showLabels && (
        <span className={`mt-1 text-xs ${isActive ? "text-primary-text" : "text-gray-400 dark:text-gray-600"}`}>
          {label}
        </span>
      )}
    </Link>
  );
});

// Add display name for ESLint
BarItem.displayName = "BarItem";

interface BottomBarProps {
  showLabels?: boolean;
}

// BottomBar Component (Memoized)
const BottomBar: FC<BottomBarProps> = memo(function BottomBar({ showLabels = false }) {
  const pathname = usePathname();

  const bottomBarRoutes = useMemo(
    () => routes.filter((r) => r.showInLayouts?.includes("bottom-bar")),
    [],
  );

  return (
    <nav className="block md:hidden fixed py-4 bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-primary-background-light/90 dark:bg-[#171717]/90">
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

// Add display name for ESLint
BottomBar.displayName = "BottomBar";

export default BottomBar;
