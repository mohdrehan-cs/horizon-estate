import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/login", "/saved", "/compare"],
    },
    sitemap: "https://horizonestates.in/sitemap.xml",
  };
}
