import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use project directory as root (avoids multiple-lockfile warning)
  turbopack: process.env.NODE_ENV === "development" ? { root: __dirname } : undefined,
};

export default nextConfig;
