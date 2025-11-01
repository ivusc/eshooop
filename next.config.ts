import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if needed, but 'https' is recommended
        hostname: '**', // This wildcard allows all hostnames
      },
    ],
  },
};

export default nextConfig;
