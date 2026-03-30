import { login } from '@/lib/api/auth';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const loginData = await login(data);
  if (!loginData) return NextResponse.json({ error: 'Failed to login' });

  const cookieStore = await cookies();

  const setCookies = await loginData.headers['set-cookie'];
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
    return NextResponse.json(loginData.data);
  }
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
