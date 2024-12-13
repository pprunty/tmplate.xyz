// ClientOnlyAnalytics.tsx
'use client';

import dynamic from 'next/dynamic';

const AnalyticsWrapper = dynamic(() => import('@/app/analytics'), { ssr: false });

export default function ClientOnlyAnalytics() {
  return <AnalyticsWrapper />;
}
