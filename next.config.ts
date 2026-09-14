import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Opt-in for environments that cannot create child-process pipes (Windows sandbox).
  experimental: process.env.NEXT_BUILD_WORKER_THREADS === "1"
    ? { workerThreads: true, useTypeScriptCli: false }
    : {},
};

export default nextConfig;
