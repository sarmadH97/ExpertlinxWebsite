import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://expertlinx.com/sitemap.xml",
    host: "https://expertlinx.com",
  };
}

