'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Locale, defaultLocale } from '@/config/locale';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const localeCookie = await cookies();
  return localeCookie.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, locale, { httpOnly: true, path: '/' });
  return response;
}
