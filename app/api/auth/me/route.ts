import { users } from '@/app/store';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token');
  if (!token)
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );

  const user = users[0];
  return NextResponse.json({ success: true, user: user.email });
}
