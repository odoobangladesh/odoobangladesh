import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "odoocdn.com", pathname: "/**" },
      { protocol: "https", hostname: "www.odoo.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
