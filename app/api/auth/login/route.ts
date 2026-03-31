import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const cookieStore = await cookies();

  if (email !== 'test@test.com' || password !== '123456') {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  const token = 'secret-token';
  cookieStore.set('token', token, {
    httpOnly: true,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
