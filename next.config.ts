import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopack: {
      // Ensure Turbopack uses this directory as the root in monorepo-ish layouts
      root: __dirname,
    },
    // Allow dev access from LAN IPs shown in your logs
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.7:3000"],
  },
};

export default nextConfig;
