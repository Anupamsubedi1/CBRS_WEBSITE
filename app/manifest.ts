import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

/** PWA / installability manifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.fullName}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#005daa",
    icons: [
      { src: "/pwa-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/pwa-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
