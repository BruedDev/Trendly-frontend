import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@use "variables" as *; @use "mixins" as *; @use "functions" as *; @use "font_family" as *;`,
    outputStyle: 'compressed',
  },

  images: {
    domains: ['cdn.sanity.io'], // 👈 thêm dòng này
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/client/:path*',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
