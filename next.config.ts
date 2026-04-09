import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* === Image optimization config === */
  images: {
    // Serve modern formats — Next will auto pick best per browser
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year (immutable; Next handles invalidation via URL hash)
    minimumCacheTTL: 31536000,
    // Sizes Next pre-generates for srcSet
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* === Long cache headers for static assets in /public === */
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
