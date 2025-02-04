"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const layoutOptions = [
  { label: "Basic", value: "/" },
  { label: "Admin", value: "/admin" },
  { label: "Social", value: "/social" },
  { label: "Stacked", value: "/stacked" },
];

function LayoutToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  useEffect(() => {
    // Pick the option with the longest matching value
    const currentLayout = layoutOptions.reduce<{ label: string; value: string } | null>(
      (matched, option) => {
        if (
          pathname.startsWith(option.value) &&
          option.value.length > (matched?.value.length || 0)
        ) {
          return option;
        }
        return matched;
      },
      null
    );
    setSelectedLayout(currentLayout ? currentLayout.value : "/");
  }, [pathname]);

  // Until the layout is determined, render nothing
  if (selectedLayout === null) {
    return null;
  }

  const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLayout = event.target.value;
    setSelectedLayout(newLayout);
    router.push(newLayout);
  };

  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="layout-selector" className="text-gray-800 dark:text-gray-200">
        Select Layout:
      </label>
      <select
        id="layout-selector"
        value={selectedLayout}
        onChange={handleLayoutChange}
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {layoutOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function LayoutToggleWrapper() {
  // Prevent rendering until after mount to avoid mismatches during hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <LayoutToggle />;
}
