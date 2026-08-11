import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/view')) {
    const userEnv = process.env.ADMIN_USER;
    const passEnv = process.env.ADMIN_PASSWORD;

    if (!userEnv || userEnv.trim() === '' || !passEnv || passEnv.trim() === '') {
      return new NextResponse('Internal Server Error', {
        status: 500,
      });
    }

    const expectedUser = userEnv.trim();
    const expectedPassword = passEnv.trim();

    // Next.js (ja standardi Fetch API Headers) tallentaa otsakkeet aina pienellä alkukirjaimella.
    const basicAuth = req.headers.get('authorization');

    // Auth scheme is case-insensitive; tolerate extra spaces.
    if (basicAuth && /^basic\s+/i.test(basicAuth)) {
      const authValue = basicAuth.replace(/^basic\s+/i, '').trim();
      
      try {
        const binary = atob(authValue);
        const decoded = new TextDecoder().decode(Uint8Array.from(binary, c => c.charCodeAt(0)));
        const index = decoded.indexOf(':');
        
        if (index !== -1) {
          const user = decoded.slice(0, index);
          const pwd = decoded.slice(index + 1);

          if (user === expectedUser && pwd === expectedPassword) {
            return NextResponse.next();
          }
        }
      } catch (e) {
        console.error('Basic Auth decode error:', e);
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/view', '/view/:path*'],
};
