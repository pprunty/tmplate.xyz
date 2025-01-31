"use client"

import { useMemo, memo } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { routes } from "./routes"
import type { FC } from "react"

interface BottomBarProps {
  showLabels?: boolean
}

interface BarItemProps {
  href: string
  label: string
  Icon: FC
  isActive: boolean
  showLabels: boolean
}

const BarItem: FC<BarItemProps> = memo(({ href, label, Icon, isActive, showLabels }) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex flex-col items-center gap-1 ${isActive ? "text-primary-text dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
      >
        <Icon className="w-6 h-6" />
        {showLabels && <span className="text-xs">{label}</span>}
      </Link>
    </li>
  )
})

// BottomBar Component (Memoized)
const BottomBar: FC<BottomBarProps> = memo(function BottomBar({ showLabels = false }) {
  const pathname = usePathname()

  const bottomBarRoutes = useMemo(() => routes.filter((r) => r.showInLayouts?.includes("bottom-bar")), [])

  return (
    <nav className="fixed sm:hidden py-4 bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-primary-background-light/90 dark:bg-[#171717]/90">
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
  )
})

// Add display name for ESLint
BottomBar.displayName = "BottomBar"

export default BottomBar

