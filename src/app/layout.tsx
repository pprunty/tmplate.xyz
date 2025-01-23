// app/layout.tsx (a server component)
import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Layout from "@/lib/layout";
import { Suspense } from "react";
import { themeEffect } from "@/lib/widgets/common/templates/ThemeSwitcher/theme-effect";
import { SEO, PRODUCTION_URL, SITE_URL, LAYOUT } from "@/config";
import { Inter } from "next/font/google";
import type { Viewport } from "next";
import { doge } from "./doge";
import { SessionProvider } from "next-auth/react";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

// You can keep your "viewport" and "metadata" exports the same:
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "transparent",
};

export const metadata: Metadata = {
  title: `${SEO.title}`,
  description: `${SEO.description}`,
  keywords: [...SEO.keywords],
  manifest:
    process.env.NODE_ENV === "production"
      ? "/manifest.prod.json"
      : "/manifest.json",
  openGraph: {
    title: `${SEO.title}`,
    description: `${SEO.description}`,
    url: SITE_URL,
    siteName: PRODUCTION_URL,
    images: [
      {
        url: `${SITE_URL}/icon.webp`,
        alt: `${SEO.title}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: `${SEO.socials.twitter}`,
    creator: `${SEO.socials.twitter}`,
    images: [
      {
        url: `${SITE_URL}/icon.webp`,
        alt: `${SEO.title}`,
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
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// This is still an async server component, so we can fetch translations or do other async tasks
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  // ─────────────────────────────────────────────────────────────────────────────
  // 1) Detect if the user is on mobile based on "user-agent" from headers()
  // ─────────────────────────────────────────────────────────────────────────────
  const h = await headers();
  const userAgent =  h.get("user-agent") || "";
  const isMobile = /mobile/i.test(userAgent);

  // Build your JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Website",
    name: SEO.title,
    description: SEO.description,
    url: SITE_URL,
    sameAs: [
      SEO.socials.twitter,
      SEO.socials.strava,
      SEO.socials.github,
      SEO.socials.reddit,
      SEO.socials.linkedin,
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <link rel="icon" href="/icons/32x32.png" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased dark:text-gray-100`}>
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Suspense fallback={null}>
              {/* 2) Pass isMobile into your Layout so it can decide which layout to use */}
              <Layout
                desktop={LAYOUT.desktop.type}
                mobile={LAYOUT.mobile.type}
                userRole="admin"
                isMobile={isMobile}
              >
                {children}
              </Layout>
            </Suspense>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
