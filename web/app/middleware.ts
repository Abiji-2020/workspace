import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname, url } = request.nextUrl;

  // If no token and the path is not /auth or /workspace, redirect to /auth
  if (!token && !pathname.startsWith('/auth') && !pathname.startsWith('/workspace')) {
    const redirectUrl = new URL('/auth', url);  // Construct the full URL for redirect
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
