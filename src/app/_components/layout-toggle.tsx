'use client'; // Mark this as a Client Component

import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import config from '@/app/config';

export default function LayoutToggle() {
  const [currentLayout, setCurrentLayout] = useState(config.layout);
  const [loading, setLoading] = useState(false);

  function toggleLayout() {
    setLoading(true);
    // Simulate an async operation (e.g., loading navigation data)
    setTimeout(() => {
      setCurrentLayout((prev) => (prev === 'admin' ? 'basic' : 'admin'));
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative inline-block">
        <button
          onClick={toggleLayout}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Switch Layout
        </button>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded">
            <ClipLoader size={20} color="#ffffff" />
          </div>
        )}
      </div>
      <p className="mt-2">Current layout: {currentLayout}</p>
    </div>
  );
}
