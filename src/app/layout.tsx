import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { MotionPreferences } from "@/components/motion/motion-preferences";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "ExpertLinx — Technology that moves business forward",
  description: site.description,
  metadataBase: new URL("https://expertlinx.com"),
  openGraph: { title: "ExpertLinx — Technology that moves business forward", description: site.description, type: "website" },
};
export const viewport: Viewport = { themeColor: "#080d13" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionPreferences><a href="#main-content" className="skip-link">Skip to content</a><SmoothScroll /><Navbar />{children}</MotionPreferences></body></html>;
}
