import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
    // Allow placeholder external images during development.
    // Revisit before production to restrict to your own CDN/domain.
    unoptimized: process.env.NODE_ENV === "development",
  },
}

export default nextConfig
