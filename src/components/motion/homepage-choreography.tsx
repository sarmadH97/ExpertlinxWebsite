"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPreference } from "@/components/motion/motion-preferences";

export function HomepageChoreography({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreference();

  useEffect(() => {
    if (!enabled || !root.current) return;
    let disposed = false;
    let teardown = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px) and (min-height: 700px)", () => {
          gsap.set("[data-hero-line]", { yPercent: 105 });
          gsap.set("[data-hero-line=\"three\"]", { scaleX: .78, transformOrigin: "left center" });
          gsap.timeline({ defaults: { ease: "expo.out" } })
            .to("[data-hero-line='one']", { clipPath: "inset(0% 0 0)", yPercent: 0, opacity: 1, duration: 1.05 }, .08)
            .to("[data-hero-line='two']", { clipPath: "inset(0% 0 0)", yPercent: 0, opacity: 1, duration: 1.05 }, .18)
            .to("[data-hero-line='three']", { clipPath: "inset(0% 0 0)", yPercent: 0, scaleX: 1, letterSpacing: "-.065em", opacity: 1, duration: 1.2 }, .28)
            .to("[data-hero-detail]", { y: 0, opacity: 1, stagger: .06, duration: .75, ease: "power3.out" }, .55);

          gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "+=180%", pin: true, scrub: 1.1, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 2 } })
            .to(".hero-grid", { opacity: .2, scale: 1.1, duration: 1 }, 0)
            .to("[data-hero-line='one']", { xPercent: -22, scale: 1.16, opacity: .15, duration: 1 }, 0)
            .to("[data-hero-line='two']", { xPercent: 24, scale: 1.13, opacity: .1, duration: 1 }, .06)
            .to("[data-hero-line='three']", { xPercent: -12, scale: 1.2, opacity: .12, duration: 1 }, .12)
            .to("[data-hero-path]", { strokeDashoffset: 0, duration: 1.15, ease: "none" }, 0)
            .fromTo("[data-hero-intro-late]", { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: .25 }, .75);

          gsap.utils.toArray<HTMLElement>("[data-case-study]").forEach((panel) => {
            gsap.fromTo(panel.querySelector("[data-case-visual]"), { scale: .72, clipPath: "inset(12% 16% round 24px)" }, {
              scale: 1, clipPath: "inset(0% 0% round 0px)", ease: "none",
              scrollTrigger: { trigger: panel, start: "top bottom", end: "center center", scrub: .8 },
            });
            gsap.from(panel.querySelectorAll("[data-case-reveal]"), { yPercent: 110, opacity: 0, stagger: .08, duration: .8, ease: "power3.out", scrollTrigger: { trigger: panel, start: "top 58%", once: true } });
          });
        });
        mm.add("(max-width: 1023px), (max-height: 699px)", () => {
          gsap.fromTo("[data-hero-line]", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0)", stagger: .1, duration: .9, ease: "power3.out" });
          gsap.fromTo("[data-hero-detail]", { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: .05, duration: .65, delay: .35 });
        });
        teardown = () => mm.revert();
      }, root);
      const previous = teardown;
      teardown = () => { previous(); ctx.revert(); };
      ScrollTrigger.refresh();
    });
    return () => { disposed = true; teardown(); };
  }, [enabled]);

  return <div ref={root} className="homepage-stage">{children}</div>;
}
