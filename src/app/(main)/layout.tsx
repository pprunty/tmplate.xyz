// src/app/(basic)/layout.tsx

import '../globals.css';
import { themeEffect } from '@/app/_components/theme-effect';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import ClientComponents from '../client';
import { Analytics } from '../analytics';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from './header';
import { doge } from '../doge';
import Footer from '../footer'; // Import your new Sidebar

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: 'transparent',
};

export const metadata: Metadata = {
  /* same as your example */
};

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
        <link rel="icon" href="/icons/32x32.png" sizes="any" />
      </head>
      <body className="">
        <Header scrollResponsive mobileResponsive />
        {/*
          Add top padding (or margin) to the main container.
          Adjust "pt-16" (4rem) as needed to match your header's height.
        */}
        <main className="mx-auto max-w-screen-xl pt-16">
          <div className="min-h-screen p-6">{children}</div>
        </main>
        <Footer />
        <ClientComponents />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
