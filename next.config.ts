import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

  /* === 301 redirects for merged/renamed routes === */
  async redirects() {
    return [
      {
        // /gia-xoai-hom-nay đã merge vào /xoai-tu-quy#gia (section bảng giá)
        source: "/gia-xoai-hom-nay",
        destination: "/xoai-tu-quy#gia",
        permanent: true,
      },
    ];
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

export default withNextIntl(nextConfig);
