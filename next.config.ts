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
      {
        source: '/:path*',
        destination: '/client/:path*',
      },
    ];
  },
};

export default nextConfig;
