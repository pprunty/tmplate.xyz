// app/_templates/stacked/mobile.tsx
"use client";

import React from "react";
import Header from "./header";
import Footer from "@/app/_layout/footer";
import BottomBar from "@/app/_layout/bottom-bar"; // Import the modularized BottomBar component

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="relative min-h-screen pb-[56px]">
      {/* Sticky header at the top */}
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />

      {/* Bottom navigation bar */}
      <BottomBar />
    </div>
  );
}
