"use client";

import { useMemo, memo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "./routes";
import type { FC } from "react";
import clsx from "clsx"; // Import clsx for conditional classes

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
      className={clsx(
        "flex flex-col items-center justify-center w-full h-full px-2",
        isActive
          ? "text-contrast-light dark:text-contrast-dark"
          : "text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark",
        showLabels ? "py-2" : "py-2"
      )}
    >
      {/* Wrap both the icon and label in a container to animate together */}
      <div
        className={clsx(
          "flex flex-col items-center",
          isActive ? "animate-scalePulse" : "scale-100"
        )}
      >
        {Icon && (
          <Icon className="w-6 h-6" />
        )}
        {showLabels && (
          <span className="text-[11px] pb-1 pt-2 leading-tight text-center">
            {label}
          </span>
        )}
      </div>
    </Link>
  </li>
));

BarItem.displayName = "BarItem";

interface BottomBarProps {
  showLabels?: boolean;
}

const BottomBar: FC<BottomBarProps> = memo(function BottomBar({ showLabels = false }) {
  const pathname = usePathname();

  const bottomBarRoutes = useMemo(
    () => routes.filter((r) => r.showInLayouts?.includes("bottom-bar")),
    []
  );

  return (
    <nav
      style={{ transform: "translate3d(0, 0, 0)" }}
      className="block md:hidden fixed py-4 bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-primary-background-light/90 dark:bg-[#171717]/90"
    >
      <ul className="flex justify-around">
        {bottomBarRoutes.map(({ href, label, icon: Icon }) => (
          <BarItem
            key={href}
            href={href}
            label={label}
            Icon={Icon}
            isActive={pathname === href}
            showLabels={showLabels}
          />
        ))}
      </ul>
    </nav>
  );
});

BottomBar.displayName = "BottomBar";

export default BottomBar;
