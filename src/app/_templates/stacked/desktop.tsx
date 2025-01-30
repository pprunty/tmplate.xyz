// app/_templates/stacked/desktop.tsx
"use client";

import React from "react";
import Header from "./header";
import Footer from "@/app/_layout/footer";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}