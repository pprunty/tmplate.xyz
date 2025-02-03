// src/app/(basic)/layout.tsx

import "../globals.css";
import { themeEffect } from "@/app/_components/theme-effect";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import ClientComponents from "../client";
import { Analytics } from "../analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "./header";
import { doge } from "../doge";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "transparent",
};

export const metadata: Metadata = { /* same as your example */ };

export default function BasicLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
        <link rel="icon" href="/icons/32x32.png" sizes="any" />
      </head>
      <body className="">
        <Header />
        
        <main className="m-auto sm:px-6 pt-16 sm:pt-20"> {/* Add padding for fixed header */}
          <div className="sm:min-h-[calc(100vh-4rem)] p-6">
            {children}
          </div>
        </main>

        <ClientComponents />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}