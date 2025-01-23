// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Extract user-agent
  const userAgent = request.headers.get('user-agent') || '';

  // 2. Check if it's "mobile" (very simplistic regex)
  const isMobile = /mobile/i.test(userAgent);

  // 3. Set a request header or cookie so your pages can read it
  //    We'll set a custom header "x-mobile-device" here
  const response = NextResponse.next();
  response.headers.set('x-mobile-device', isMobile ? 'true' : 'false');

  return response;
}
