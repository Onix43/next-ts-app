import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const notes = [
  { id: '1', title: 'First note', likes: 0 },
  { id: '2', title: 'Second note', likes: 5 },
];

export async function GET() {
  const token = (await cookies()).get('token');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return Response.json(notes);
}
