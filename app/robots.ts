import type { MetadataRoute } from "next";

const BASE = "https://www.cbrs.org.np";

/** Allow crawling everything except the gated admin panel. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
