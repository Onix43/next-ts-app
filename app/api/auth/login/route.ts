import { users } from '@/app/store';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  //  --------- validation ----------
  if (!email || !email.includes('@') || !password) {
    return NextResponse.json(
      { error: 'Invalid login params' },
      { status: 400 }
    );
  }
  const user = users.find(user => user.email === email);
  if (!user)
    return NextResponse.json(
      { message: 'User with this email doesn`t exists' },
      { status: 404 }
    );
  if (user.password !== password)
    return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
  // ---------------------------------------------

  const token = 'super-secret';
  const cookieStore = cookies();

  (await cookieStore).set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
  });

  return NextResponse.json({ sucess: true, userEmail: user.email });
}
