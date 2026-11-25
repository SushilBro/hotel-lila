import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Images are compressed in the browser first; this is headroom for files
      // that can't be compressed. Stays under Vercel's 4.5MB request limit.
      bodySizeLimit: "4mb"
    }
  }
};
export default nextConfig;
