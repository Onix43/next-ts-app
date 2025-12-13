import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // pathname які будемо пропускати далі...
  const token = req.cookies.get('token')?.value;

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, 'SECRET');
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/login', '/register'],
};

// task 1 + 2export const config = {
//   matcher: ['/dashboard', '/login', '/register'],
// };

// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get('token')?.value;

//   if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   try {
//     const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

//     if (decoded.exp < Date.now()) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     return NextResponse.next();
//   } catch {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }

// export const config = {
//   matcher: ['/dashboard', '/login', '/register'],
// };  export const config = {
//   matcher: ['/dashboard', '/login', '/register'],
// };
// const token = Buffer.from(
//   JSON.stringify({
//     email: 'test@test.com',
//     exp: Date.now() + 1000 * 360,
//   })
// ).toString('base64');
