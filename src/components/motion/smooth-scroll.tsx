"use client";

import { useEffect } from "react";
import { useMotionPreference } from "./motion-preferences";
import { DESKTOP_SCENE_QUERY } from "@/lib/motion";

export function SmoothScroll() {
  const { enabled } = useMotionPreference();
  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let cleanup = () => {};
    // Native touch scrolling remains in charge on mobile.
    void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add(DESKTOP_SCENE_QUERY, () => {
          const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: false });
          const update = (time: number) => lenis.raf(time * 1000);
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(update);
          return () => {
            gsap.ticker.remove(update);
            lenis.off("scroll", ScrollTrigger.update);
            lenis.destroy();
          };
        });
        cleanup = () => media.revert();
      },
    );
    return () => { disposed = true; cleanup(); };
  }, [enabled]);
  return null;
}
