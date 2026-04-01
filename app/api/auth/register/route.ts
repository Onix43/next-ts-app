import { users } from '@/app/store';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !email.includes('@') || !password) {
    return NextResponse.json(
      { error: 'Invalid register params' },
      { status: 400 }
    );
  }

  const isExists = users.some(user => user.email === email);
  if (isExists)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const id = uuidv4();
  users.push({ id, email, password });
  return NextResponse.json({ success: true });
}
