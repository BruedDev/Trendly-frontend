import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Không chặn Sanity và trang login
  if (pathname.startsWith('/admin/sanity') || pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Chặn các route bắt đầu bằng /admin
  if (pathname.startsWith('/admin')) {
    const isLoggedIn = req.cookies.get('admin_token')?.value; // ví dụ check token
    if (!isLoggedIn) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Áp dụng cho các route admin
export const config = {
  matcher: ['/admin/:path*'],
};
