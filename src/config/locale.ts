/* Define Application Locales */
export type Locale = (typeof locales)[number];
export const locales = ['en', 'de', 'zh', 'ko'] as const;
export const defaultLocale: Locale = 'en';

