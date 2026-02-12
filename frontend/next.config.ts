import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/v1/:path*"
            : "/api/v1/:path*", // In production, vercel.json handles routing, or we point to separate backend
      },
    ];
  },
};

export default nextConfig;
