"use client";

import React from "react";
import Header from "./header";
import Footer from "@/app/_layout/footer"; // Reuse your existing footer

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Header />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <div
          className="
            rounded-md p-6
            shadow-sm
            border border-gray-200 dark:border-[#252525]
          "
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
