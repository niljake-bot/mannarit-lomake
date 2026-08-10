import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (url.pathname.startsWith('/view')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const expectedUser = process.env.ADMIN_USER || 'admin';
      // Fallback to ADMIN_SECRET if ADMIN_PASSWORD is not set for backwards compatibility
      const expectedPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;

      if (expectedPassword && user === expectedUser && pwd === expectedPassword) {
        return NextResponse.next();
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/view/:path*'],
};
