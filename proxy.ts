import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (token) {
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/register'],
};
