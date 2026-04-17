import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, createAdminSessionValue, getAdminCookieOptions, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { headers } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const sessionValue = createAdminSessionValue();
    const cookieOptions = getAdminCookieOptions();

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, sessionValue, cookieOptions);

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

