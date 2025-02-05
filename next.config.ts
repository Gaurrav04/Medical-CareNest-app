import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "fb63r4sbul.ufs.sh", 
      },
    ],
  },
};

export default nextConfig;
