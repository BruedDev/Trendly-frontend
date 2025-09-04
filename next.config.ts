import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@use "variables" as *; @use "mixins" as *; @use "functions" as *; @use "baseClass" as *; @use "fontFamily" as *;`,
    outputStyle: 'compressed',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      {
        source: '/:path((?!api/|auth/).*)',
        destination: '/client/:path*',
      },
    ];
  },
};

export default nextConfig;
