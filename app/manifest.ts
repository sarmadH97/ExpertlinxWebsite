import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ExpertLinx",
    short_name: "ExpertLinx",
    description:
      "Microsoft, cloud, AI, data and software—designed to work together.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef2f7",
    theme_color: "#eef2f7",
  };
}

