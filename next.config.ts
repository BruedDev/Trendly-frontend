import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@use "variables" as *; @use "mixins" as *; @use "functions" as *;`,
    outputStyle: 'compressed',
  },

  async rewrites() {
    return [
      // Redirect root path to client
      {
        source: '/',
        destination: '/client',
      },
      // Giữ nguyên /admin/sanity cho Sanity Studio
      {
        source: '/admin/sanity',
        destination: '/admin/sanity',
      },
      // Redirect /admin (dashboard) sang /client nếu cần ẩn
      {
        source: '/admin',
        destination: '/client',
      },
      // Redirect mọi path khác sang client, ngoại trừ các static và Sanity
      {
        source: '/((?!api|_next|favicon.ico|admin/sanity).*)',
        destination: '/client/$1',
      },
    ];
  },

  async redirects() {
    return [
      // Redirect /admin sang /admin/login nếu chưa đăng nhập (sẽ xử lý trong middleware)
      {
        source: '/admin',
        destination: '/admin/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
