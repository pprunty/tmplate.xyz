import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/services/locale';

// Define a recursive interface to handle nested translation objects
interface TranslationMessages {
  [key: string]: string | TranslationMessages;
}

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  let messages: TranslationMessages;

  try {
    // Dynamically import locale-specific messages
    messages = (await import(`./translations/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading locale messages for ${locale}:`, error);

    // Fallback to English messages if specific locale messages are not found
    messages = (await import('./translations/en.json')).default;
  }

  return {
    locale,
    messages,
  };
});
