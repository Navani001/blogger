import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
