import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output: "export",
};

export default nextConfig;
