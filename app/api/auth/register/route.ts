import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json(); // Діла нічого з ним не робив, але потрібно їх далі відправити або зберегти в бд
  const cookieStore = await cookies();

  const token = 'secret-token';
  cookieStore.set('token', token, {
    httpOnly: true,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
