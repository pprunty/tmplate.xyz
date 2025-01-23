'use client';

import React from 'react';

interface NarrowProps {
  children: React.ReactNode;
}

/**
 * A narrow layout wrapper that constrains content to a max width
 * and centers it on the screen. Useful for blog posts, documentation pages,
 * or any content that benefits from a narrower reading width.
 */
export default function Narrow({ children }: NarrowProps) {
  return (
    <div className="max-w-2xl m-auto p-6 pt-3 md:pt-6 min-h-screen">
      {children}
    </div>
  );
}
