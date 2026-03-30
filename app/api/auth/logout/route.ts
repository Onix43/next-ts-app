import { logout } from '@/lib/api/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  const res = await logout();
  return NextResponse.json({ message: 'logged out successfully!' });
}
