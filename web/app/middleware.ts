import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Check if token exists

  // Allow access to workspace pages without a token
  if (!token && !request.nextUrl.pathname.startsWith('/auth') && !request.nextUrl.pathname.startsWith('/workspace')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'], // Applies to all pages except static and _next paths
};
