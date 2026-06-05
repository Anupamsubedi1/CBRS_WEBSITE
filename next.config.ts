import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Cloudinary (admin-managed media) and Unsplash (stock fallbacks).
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
