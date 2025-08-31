import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Lấy user token
  const userToken = req.cookies.get('accessToken')?.value;

  // Cho phép truy cập trang login khi chưa đăng nhập
  if (pathname.startsWith('/auth/login')) {
    // Nếu đã có token, chuyển hướng về home
    if (userToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // Cho phép truy cập trang register khi chưa đăng nhập
  if (pathname.startsWith('/auth/register')) {
    // Nếu đã có token, chuyển hướng về home
    if (userToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // Bảo vệ tất cả các route khác
  if (!userToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Bảo vệ tất cả routes trừ static files và API
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};