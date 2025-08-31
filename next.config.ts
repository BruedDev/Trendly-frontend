import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@use "variables" as *; @use "mixins" as *; @use "functions" as *; @use "baseClass" as *; @use "fontFamily" as *;`,
    outputStyle: 'compressed',
  },

  images: {
    domains: ['cdn.sanity.io'],
  },

  async rewrites() {
    return [
      // Proxy API requests to backend (giữ nguyên)
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      // ĐIỀU CHỈNH Ở ĐÂY:
      // Chỉ rewrite những path KHÔNG phải là /api hoặc /auth
      {
        source: '/:path((?!api/|auth/).*)',
        destination: '/client/:path*',
      },
    ];
  },
};

export default nextConfig;
