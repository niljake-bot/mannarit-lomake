import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/view')) {
    // Varmistetaan ensin, että ympäristömuuttujat on ylipäätään asetettu
    const expectedUser = (process.env.ADMIN_USER || 'admin').trim();
    const expectedPassword = (process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET || '').trim();

    // Jos salasanaa ei ole konfiguroitu, estetään pääsy kokonaan tietoturvasyistä
    if (!expectedPassword) {
      return new NextResponse('Server configuration error: ADMIN_PASSWORD is not set.', {
        status: 500,
      });
    }

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
