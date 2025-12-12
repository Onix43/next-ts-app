import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === 'test@test.com' && password === '123456') {
    const token = jwt.sign({ email }, 'SECRET', { expiresIn: '7d' });

    const res = NextResponse.json({ success: true });

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
    });
    return res;
  }
  return NextResponse.json(
    {
      error: 'Invalid login',
    },
    { status: 401 }
  );
}
