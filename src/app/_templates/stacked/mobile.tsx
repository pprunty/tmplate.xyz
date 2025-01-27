// app/_templates/stacked/mobile.tsx
"use client";

import React from "react";
import Header from "./header";
import Footer from "@/app/_layout/footer";
import BottomBar from "@/app/_layout/bottom-bar"; // Import BottomBar

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="relative min-h-screen pb-[56px]">
      {/* Sticky header */}
      <Header />

      {/* Main content */}
      <main className="pt-16 p-4">{children}</main>

      {/* Footer */}
      <Footer />

      {/* BottomBar component for mobile */}
      <BottomBar />
    </div>
  );
}
