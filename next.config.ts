import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    
    config.resolve.fallback = { fs: false };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/material/Button': '@mui/material/Button/Button.js'
    };

    return config;
  }

};

export default nextConfig;
