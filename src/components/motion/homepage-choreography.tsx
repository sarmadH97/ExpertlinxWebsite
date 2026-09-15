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
          gsap.set("[data-hero-line]", { yPercent: 100 });
          gsap.set("[data-hero-line='three']", { scaleX: .88, transformOrigin: "left center" });

          gsap.timeline({ defaults: { ease: "expo.out" } })
            .to("[data-hero-line='one']", { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0)", duration: .85 }, .04)
            .to("[data-hero-line='two']", { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0)", duration: .85 }, .12)
            .to("[data-hero-line='three']", { yPercent: 0, scaleX: 1, opacity: 1, clipPath: "inset(0% 0 0)", duration: .95 }, .2)
            .to("[data-hero-detail]", { y: 0, opacity: 1, stagger: .045, duration: .6, ease: "power3.out" }, .36);

          const hero = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "+=130%",
              pin: true,
              scrub: .6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 2,
            },
          });

          hero
            .fromTo("[data-hero-line='one']", { xPercent: 0, opacity: 1 }, { xPercent: -8, opacity: .32, duration: .62, immediateRender: false }, 0)
            .fromTo("[data-hero-line='two']", { xPercent: 0, opacity: 1 }, { xPercent: 9, opacity: .26, duration: .62, immediateRender: false }, .04)
            .fromTo("[data-hero-line='three']", { xPercent: 0, scale: 1, scaleX: 1, opacity: 1 }, { xPercent: -4, scale: 1.045, opacity: .32, duration: .62, immediateRender: false }, .08)
            .to(".hero-grid", { opacity: .32, scale: 1.035, duration: .7 }, 0)
            .to("[data-hero-path]", { strokeDashoffset: 0, duration: .65, ease: "none" }, 0)
            .to(".hero-bottom", { y: -22, opacity: .15, duration: .42 }, .16)
            .fromTo("[data-hero-intro-late]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .28 }, .3)
            .to(".hero-composition", { yPercent: -5, duration: .45 }, .48);

          gsap.utils.toArray<HTMLElement>("[data-case-study]").forEach((panel) => {
            const visual = panel.querySelector("[data-case-visual]");
            const copy = panel.querySelectorAll("[data-case-reveal]");
            gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: panel,
                start: "top 88%",
                end: "bottom 28%",
                scrub: .55,
                invalidateOnRefresh: true,
              },
            })
              .fromTo(visual, { scale: .9, clipPath: "inset(7% 8% round 24px)" }, { scale: 1, clipPath: "inset(0% 0% round 0px)", duration: .58, ease: "power1.inOut" }, 0)
              .fromTo(copy, { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: .025, duration: .3 }, .18);
          });

          gsap.fromTo(".case-intro", { clipPath: "inset(10% 3% 0% round 44px)" }, {
            clipPath: "inset(0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: "#selected-work", start: "top bottom", end: "top 35%", scrub: .5 },
          });
        });

        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
          gsap.fromTo("[data-hero-line]", { yPercent: 55, opacity: 0 }, { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0)", stagger: .065, duration: .7, ease: "power3.out" });
          gsap.fromTo("[data-hero-detail]", { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: .035, duration: .48, delay: .22 });
          gsap.utils.toArray<HTMLElement>("[data-case-study]").forEach((panel) => {
            gsap.fromTo(panel.querySelectorAll("[data-case-reveal]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: .03, duration: .45, scrollTrigger: { trigger: panel, start: "top 82%", toggleActions: "play none none reverse" } });
          });
        });

        mm.add("(max-width: 767px), (max-height: 699px)", () => {
          gsap.fromTo("[data-hero-line]", { y: 22, opacity: 0 }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0)", stagger: .055, duration: .58, ease: "power3.out" });
          gsap.fromTo("[data-hero-detail]", { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: .03, duration: .4, delay: .18 });
          gsap.utils.toArray<HTMLElement>("[data-case-study]").forEach((panel) => {
            gsap.fromTo(panel.querySelectorAll("[data-case-reveal]"), { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: .025, duration: .38, scrollTrigger: { trigger: panel, start: "top 86%", toggleActions: "play none none reverse" } });
          });
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
