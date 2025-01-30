"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const LAYOUT_STORAGE_KEY = "selectedLayout";

const layoutOptions = [
  { label: "Basic", value: "/" },
  { label: "Admin", value: "/admin" },
  { label: "Social", value: "/social" },
  { label: "Stacked", value: "/stacked" },
];

export default function LayoutToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLayout, setSelectedLayout] = useState<string>("/");

  // Load persisted layout from localStorage on first render
  useEffect(() => {
    const savedLayout = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (savedLayout && layoutOptions.some(option => option.value === savedLayout)) {
      setSelectedLayout(savedLayout);
      if (pathname !== savedLayout) {
        router.replace(savedLayout); // Prevent adding to history stack
      }
    }
  }, []);

  // Sync state with the current route
  useEffect(() => {
    const currentLayout = layoutOptions.find(option => pathname.startsWith(option.value));
    setSelectedLayout(currentLayout ? currentLayout.value : "/");
  }, [pathname]);

  // Handle selection changes
  const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLayout = event.target.value;
    setSelectedLayout(newLayout);
    localStorage.setItem(LAYOUT_STORAGE_KEY, newLayout);
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
