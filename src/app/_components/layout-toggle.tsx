"use client"; // Mark this as a Client Component

import { useState } from "react";
import config from "@/app/config";
// or wherever your config is located (adjust the import as needed)

export default function LayoutToggle() {
  const [currentLayout, setCurrentLayout] = useState(config.layout);

  function toggleLayout() {
    setCurrentLayout((prev) => (prev === "admin" ? "basic" : "admin"));
  }

  return (
    <div>
      <button
        onClick={toggleLayout}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Switch Layout
      </button>
      <p className="mt-2">Current layout: {currentLayout}</p>
    </div>
  );
}
