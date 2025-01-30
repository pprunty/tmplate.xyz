// app/_templates/stacked/mobile.tsx
"use client";

import React from "react";
import Header from "./header";
import Footer from "@/app/_layout/footer";
import BottomBar from "@/app/_layout/bottom-bar";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-24 px-4">
        {children}
      </main>
      <BottomBar />
      <Footer />
    </div>
  );
}