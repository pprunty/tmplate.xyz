import "../globals.css";
import { themeEffect } from "@/app/_components/theme-effect";
import { doge } from "../doge";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import ClientComponents from "../client";
import config from "../config"; // config with SEO, productionUrl, analytics, etc.
import { Analytics } from "../analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from './header';
import BottomBar from './bottom-bar';

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

// Layout component
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

      <body className={`${inter.className} antialiased dark:text-gray-100`}>
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
         <Header />
         {children}
         <BottomBar/>
        </main>
        <ClientComponents />
        <Analytics />
        <SpeedInsights />

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
