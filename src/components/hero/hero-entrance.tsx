"use client";

import { useEffect, type ReactNode } from "react";
import { stagger, useAnimate } from "motion/react";
import { useMotionPreference } from "@/components/motion/motion-preferences";
import { ENTRANCE_EASE } from "@/lib/motion";

export function HeroEntrance({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate();
  const { enabled } = useMotionPreference();
  useEffect(() => {
    if (!enabled) return;
    const lines = animate("[data-hero-line]", { y: ["105%", "0%"], opacity: [0, 1] }, { duration: 1.1, delay: stagger(0.11), ease: ENTRANCE_EASE });
    const details = animate("[data-hero-detail]", { y: [18, 0], opacity: [0, 1] }, { duration: 0.8, delay: stagger(0.08, { startDelay: 0.4 }), ease: ENTRANCE_EASE });
    const bird = animate("[data-hero-bird]", { x: [100, 0], y: [45, 0], rotate: [-14, 0], opacity: [0, 1] }, { duration: 1.6, delay: 0.2, ease: ENTRANCE_EASE });
    return () => { lines.stop(); details.stop(); bird.stop(); };
  }, [animate, enabled]);

  // Content is visible in server HTML; enhancement never gates readability.
  return <div ref={scope} className="hero-composition">{children}</div>;
}
