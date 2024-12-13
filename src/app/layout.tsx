import "./globals.css";
import type { Metadata } from "next";
import Layout from '@/layout';
import { Suspense } from 'react';
import { themeEffect } from '@/modules/common/templates/ThemeSwitcher/theme-effect';
import { SEO, PRODUCTION_URL, SITE_URL } from '@/config';
import { Inter } from 'next/font/google';
import type { Viewport } from 'next';
import { doge } from './doge';
import { SessionProvider } from "next-auth/react";
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: 'transparent',
};

// Define metadata
export const metadata: Metadata = {
  title: `${SEO.title}`,
  description: `${SEO.description}`,
  keywords: [
    ...SEO.keywords // Spread the existing keywords array
  ],
  manifest:
    process.env.NODE_ENV === 'production'
      ? '/manifest.prod.json'
      : '/manifest.json',
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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
    icon: [{ url: '/icons/192x192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/icons/180x180.png', sizes: '180x180' }],
  },
  metadataBase: new URL(SITE_URL),
};

const inter = Inter({
  subsets: ['latin'], // Only include necessary subsets
  weight: ['300', '400', '500', '600', '700'], // Specify required font weights
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: SEO.title,
    description: `${SEO.description}`,
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
                <Layout type="SidebarMenu" mobile="BottomBar">
                {children}
                </Layout>
              </Suspense>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
