import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/view')) {
    const userEnv = process.env.ADMIN_USER;
    const passEnv = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;

    // Estetään pääsy välittömästi, jos muuttujia ei ole asetettu kunnolla.
    // Ei käytetä mitään fallback-arvoja tai tyhjiä merkkijonoja.
    if (!userEnv || userEnv.trim() === '') {
      return new NextResponse('Server configuration error: ADMIN_USER is not set in environment variables.', {
        status: 500,
      });
    }

    if (!passEnv || passEnv.trim() === '') {
      return new NextResponse('Server configuration error: ADMIN_PASSWORD is not set in environment variables.', {
        status: 500,
      });
    }

    const expectedUser = userEnv.trim();
    const expectedPassword = passEnv.trim();

    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      
      try {
        const decoded = atob(authValue);
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
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/view/:path*'],
};
