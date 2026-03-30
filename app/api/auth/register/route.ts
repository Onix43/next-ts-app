import { register } from '@/lib/api/auth';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const userData = await req.json();
  const registred = await register(userData);

  if (!registred) return NextResponse.json({ error: 'Failed to register' });

  const cookieStore = await cookies();

  const setCookies = await registred.headers['set-cookie'];
  if (setCookies) {
    const cookieArr = Array.isArray(setCookies) ? setCookies : [setCookies];
    for (const cookieStr of cookieArr) {
      const parsed = parse(cookieStr);

      const options = {
        expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
        path: parsed.Path,
        maxAge: Number(parsed['Max-Age']),
      };
      if (parsed.accessToken)
        cookieStore.set('accessToken', parsed.accessToken, options);
      if (parsed.refreshToken)
        cookieStore.set('refreshToken', parsed.refreshToken, options);
    }
    return NextResponse.json(registred.data);
  }
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
