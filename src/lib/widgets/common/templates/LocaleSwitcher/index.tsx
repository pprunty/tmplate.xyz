'use client';

import React, { useTransition } from 'react';
import { Locale } from '@/config/locale';
import { setUserLocale } from '@/services/locale';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [locale, setLocale] = React.useState<Locale>('en'); // Default to English

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value as Locale;
    setLocale(newLocale);
    startTransition(() => {
      setUserLocale(newLocale);
    });
  }

  return (
    <div className="inline-block relative">
      <select
        value={locale}
        onChange={handleChange}
        disabled={isPending}
        className={`block appearance-none w-full bg-gray-200 border border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-black px-4 py-2 pr-8 rounded-md transition ${
          isPending ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="jp">日本語</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        ▼
      </div>
    </div>
  );
}
