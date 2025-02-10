import '../globals.css';
import { themeEffect } from '@/app/_components/theme-effect';
import { doge } from '../doge';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import ClientComponents from '../client';
import config from '../config'; // config with SEO, productionUrl, analytics, etc.
import { Analytics } from '../analytics';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from './header';
import Sidebar from './sidebar'; // Import your new Sidebar
import Footer from '../footer'; // Import your new Sidebar

const { seo: SEO, productionUrl: PRODUCTION_URL, analytics } = config;
const SITE_URL = PRODUCTION_URL;

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: 'transparent',
};

// Metadata configuration
export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: [...SEO.keywords],
  manifest:
    process.env.NODE_ENV === 'production'
      ? '/manifest.prod.json'
      : '/manifest.json',
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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
    icon: [{ url: '/icons/192x192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/icons/180x180.png', sizes: '180x180' }],
  },
  metadataBase: new URL(SITE_URL),
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
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

      <body className={`${inter.className} antialiased bg-pattern bg-repeat`}>
        {/* 1) Full-height container, no scrolling */}
        <div className="h-screen w-full overflow-hidden md:flex">
          {/* 2) Sticky or fixed sidebar */}
          <Sidebar />

          {/* 3) Main content scrolls */}
          <div className="flex-1 flex flex-col overflow-auto">
            <Header />
            <main className="p-14 pt-3 md:pt-6 flex-1">
              <div className="bg-white dark:bg-[#111] rounded-lg p-6 shadow-sm border border-gray-200 dark:border-[#252525]">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </div>

        <ClientComponents />
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaMeasurementId}`}
        />
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
  );
}
