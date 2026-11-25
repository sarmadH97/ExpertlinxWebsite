import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://expertlinx.com";
const TITLE = "ExpertLinx · Azure, Microsoft 365 & Dynamics 365 Partner";
const DESCRIPTION =
  "One senior team for Azure infrastructure, Microsoft 365 tenant setup and Dynamics 365 / Business Central. Book a free architecture review.";
const SHARE_IMAGE = "/legacy/assets/expertlinx-home-share.jpg";

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
        url: SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: "ExpertLinx. From Azure to custom apps—one partner, zero hand-offs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE],
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
        <link rel="stylesheet" href="/legacy/styles.css?v=20261125-home-nav-orbit" />
      </head>
      <body>{children}</body>
    </html>
  );
}
