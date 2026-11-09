import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://expertlinx.com";
const TITLE = "ExpertLinx — Technology that works together";
const DESCRIPTION =
  "ExpertLinx connects Microsoft platforms, cloud, AI, data and custom software into clear, dependable business systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | ExpertLinx",
  },
  description: DESCRIPTION,
  applicationName: "ExpertLinx",
  authors: [{ name: "ExpertLinx", url: SITE_URL }],
  creator: "ExpertLinx",
  publisher: "ExpertLinx",
  category: "Technology consulting",
  keywords: [
    "Microsoft consulting",
    "Dynamics 365",
    "Microsoft 365",
    "Power Platform",
    "Azure consulting",
    "AI automation",
    "data engineering",
    "custom software development",
    "technology consulting",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ExpertLinx",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/legacy/assets/expertlinx-landscape.png",
        alt: "A calm landscape representing connected ExpertLinx technology systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/legacy/assets/expertlinx-landscape.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eef2f7",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/legacy/assets/expertlinx-landscape.png" as="image" />
        <link rel="stylesheet" href="/legacy/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

