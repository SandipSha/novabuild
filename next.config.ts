import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next-gen formats served automatically based on browser support
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
