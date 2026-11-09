import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://expertlinx.com",
      lastModified: new Date("2026-11-09"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

