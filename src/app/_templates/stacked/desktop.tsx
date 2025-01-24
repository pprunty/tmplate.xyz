// app/_templates/stacked/desktop.tsx
"use client";

import React from "react";
import Header from "./header";
// If you have a shared footer somewhere:
import Footer from "@/app/_layout/footer"; // or wherever your Footer is

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-16 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
