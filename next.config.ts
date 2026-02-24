import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Performance: Compress responses ────────────────────────────────────────
  compress: true,

  // ── Image Optimization ─────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── Security & Caching Headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // SEO: tell search engines this is the canonical origin
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*\\.(?:ico|png|jpg|jpeg|gif|webp|avif|svg))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Redirects (www → non-www canonical) ────────────────────────────────────
  async redirects() {
    return [
      // Example: redirect www to non-www for canonical signals
      // Uncomment when deployed:
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "www.tedxaceec.com" }],
      //   destination: "https://tedxaceec.com/:path*",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
