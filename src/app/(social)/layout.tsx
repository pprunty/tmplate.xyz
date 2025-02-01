import "../globals.css";
import { themeEffect } from "@/app/_components/theme-effect";
import { doge } from "../doge";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import ClientComponents from "../client";
import config from "../config"; // config with SEO, productionUrl, analytics, etc.
import { Analytics } from "../analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import BottomBar from './bottom-bar';
import Sidebar from "./sidebar";
import Header from "./header"; // <-- Import your new header
import CTA from "@/app/_layout/cta";
import { Suspense } from 'react';

const { seo: SEO, productionUrl: PRODUCTION_URL, analytics } = config;
const SITE_URL = PRODUCTION_URL;

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "transparent",
};

// Metadata configuration
export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: [...SEO.keywords],
  manifest:
    process.env.NODE_ENV === "production"
      ? "/manifest.prod.json"
      : "/manifest.json",
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SITE_URL,
    siteName: PRODUCTION_URL,
    images: [
      {
        url: `${SITE_URL}/icon.webp`,
        alt: SEO.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: SEO.socials.twitter,
    creator: SEO.socials.twitter,
    images: [
      {
        url: `${SITE_URL}/icon.webp`,
        alt: SEO.title,
      },
    ],
  },
  icons: {
    icon: [{ url: "/icons/192x192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/180x180.png", sizes: "180x180" }],
  },
  metadataBase: new URL(SITE_URL),
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

      <body className="max-w-2xl m-auto sm:px-8">
        {/* Desktop Sidebar */}
        <div className="">
        <Sidebar />

          <div className="hidden sm:block fixed top-4 right-4 z-[55]">
            <CTA options={["auth"]} />
          </div>

          <Header />

          {/* Main content area with fixed background and scrollable interior */}
            <main
              className="
              relative min-h-screen
                relative z-0
                dark:bg-[#171717]
                border-0
                border-[#262626]
                sm:border
                sm:rounded-t-3xl
                p-6
              "
            >
              {children}
        {/* Mobile Bottom Bar */}
        <Suspense fallback={null}>
            <BottomBar />
        </Suspense>
            </main>

        </div>

        {/* Global client components and scripts */}
        <ClientComponents />
        <Analytics />
        <SpeedInsights />

        <script async src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaMeasurementId}`} />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analytics.gaMeasurementId}');
            `,
          }}
        />
      </body>
    </html>
  )
}