import { cookies } from 'next/headers';

export async function getUser(): Promise<null | { email: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  return { email: 'test@test.com' };
}
