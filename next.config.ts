import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Allow placeholder external images during development.
    // Revisit before production to restrict to your own CDN/domain.
    unoptimized: process.env.NODE_ENV === "development",
  },
}

export default nextConfig
