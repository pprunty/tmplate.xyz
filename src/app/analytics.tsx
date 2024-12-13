'use client';

import Script from 'next/script';
import { GA_MEASUREMENT_ID, VERCEL_ANALYTICS } from '@/config';
import { Analytics } from '@vercel/analytics/next';

export default function AnalyticsWrapper() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      {/* Vercel Analytics */}
      {VERCEL_ANALYTICS && <Analytics />}
    </>
  );
}
