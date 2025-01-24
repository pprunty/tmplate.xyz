'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const JsonLdScript = dynamic(() => import('./json-ld'), { ssr: false });

export default function ClientComponents() {
  return (
     <>
          <Suspense fallback={null}>
          <JsonLdScript />
          </Suspense>
        </>
  );
}
