import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
