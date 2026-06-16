import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Cloudinary (admin-managed media) and Unsplash (stock fallbacks).
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    serverActions: {
      // Admin editors post image files through Server Actions; the default 1 MB
      // body cap is too small for photo uploads (a single phone photo exceeds it).
      // Raised so a batch of photos can be saved in one request.
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
