import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value;
  const type = request.cookies.get('type')?.value;

  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  if (!sessionId) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/admin') && type !== 'admin') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/seller') && type !== 'seller') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'], // proteger essas rotas
};
