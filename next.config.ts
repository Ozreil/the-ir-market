import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["local.theirmarkets.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "theirmarkets.com",
      },
      {
        protocol: "http",
        hostname: "local.theirmarkets.com",
        port: "9090",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
