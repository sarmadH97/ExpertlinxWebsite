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
          gsap.set("[data-hero-line=\"three\"]", { scaleX: .84, transformOrigin: "left center" });

          gsap.timeline({ defaults: { ease: "expo.out" } })
            .addLabel("headline-in", 0)
            .to("[data-hero-line='one']", { clipPath: "inset(0% 0 0)", yPercent: 0, opacity: 1, duration: 1.05 }, .08)
            .to("[data-hero-line='two']", { clipPath: "inset(0% 0 0)", yPercent: 0, opacity: 1, duration: 1.05 }, .18)
            .to("[data-hero-line='three']", { clipPath: "inset(0% 0 0)", yPercent: 0, scaleX: 1, letterSpacing: "-.065em", opacity: 1, duration: 1.2 }, .28)
            .to("[data-hero-detail]", { y: 0, opacity: 1, stagger: .06, duration: .75, ease: "power3.out" }, .58)
            .addLabel("hero-ready", 1.5);

          const heroClock = { progress: 0 };
          const hero = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "+=250%",
              pin: true,
              scrub: 1.15,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 2,
            },
          });
          hero
            .addLabel("read", 0)
            .to(heroClock, { progress: 1, duration: .72, ease: "none" }, 0)
            .addLabel("transition", .72)
            .to(".hero-grid", { opacity: .35, scale: 1.055, duration: .72 }, .72)
            .fromTo("[data-hero-line='one']", { xPercent: 0, scale: 1, opacity: 1 }, { xPercent: -16, scale: 1.09, opacity: .2, duration: .7, immediateRender: false }, .72)
            .fromTo("[data-hero-line='two']", { xPercent: 0, scale: 1, opacity: 1 }, { xPercent: 17, scale: 1.08, opacity: .16, duration: .7, immediateRender: false }, .76)
            .fromTo("[data-hero-line='three']", { xPercent: 0, scale: 1, scaleX: 1, opacity: 1 }, { xPercent: -8, scale: 1.1, opacity: .18, duration: .7, immediateRender: false }, .8)
            .to("[data-hero-path]", { strokeDashoffset: 0, duration: .72, ease: "none" }, .72)
            .fromTo("[data-hero-intro-late]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .3 }, 1.08)
            .addLabel("handoff", 1.5)
            .to(heroClock, { progress: 2, duration: .35, ease: "none" }, 1.5);

          gsap.utils.toArray<HTMLElement>("[data-case-study]").forEach((panel) => {
            const visual = panel.querySelector("[data-case-visual]");
            const copy = panel.querySelectorAll("[data-case-reveal]");
            const caseClock = { progress: 0 };
            gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: panel,
                start: "top 92%",
                end: "bottom 18%",
                scrub: .85,
                invalidateOnRefresh: true,
              },
            })
              .addLabel("approach", 0)
              .fromTo(visual, { scale: .78, clipPath: "inset(10% 12% round 22px)" }, { scale: 1, clipPath: "inset(0% 0% round 0px)", duration: .5, ease: "power1.inOut" }, 0)
              .addLabel("content", .42)
              .fromTo(copy, { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: .035, duration: .28 }, .42)
              .addLabel("read", .72)
              .to(caseClock, { progress: 1, duration: .72, ease: "none" }, .72)
              .addLabel("leave", 1.44)
              .to(caseClock, { progress: 2, duration: .2, ease: "none" }, 1.44);
          });

          gsap.fromTo(".case-intro", { "--work-rise": "0%" }, {
            "--work-rise": "100%",
            ease: "none",
            scrollTrigger: { trigger: "#selected-work", start: "top bottom", end: "top 22%", scrub: .8 },
          });
        });

        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
          gsap.fromTo("[data-hero-line]", { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0)", stagger: .09, duration: .85, ease: "power3.out" });
          gsap.fromTo("[data-hero-detail]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: .04, duration: .6, delay: .3 });
          gsap.utils.toArray<HTMLElement>("[data-case-study]").forEach((panel) => {
            gsap.fromTo(panel.querySelectorAll("[data-case-reveal]"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: .04, duration: .55, scrollTrigger: { trigger: panel, start: "top 78%", toggleActions: "play none none reverse" } });
          });
        });

        mm.add("(max-width: 767px), (max-height: 699px)", () => {
          gsap.fromTo("[data-hero-line]", { y: 28, opacity: 0 }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0)", stagger: .08, duration: .72, ease: "power3.out" });
          gsap.fromTo("[data-hero-detail]", { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: .04, duration: .52, delay: .24 });
          gsap.utils.toArray<HTMLElement>("[data-case-study]").forEach((panel) => {
            gsap.fromTo(panel.querySelectorAll("[data-case-reveal]"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: .03, duration: .45, scrollTrigger: { trigger: panel, start: "top 84%", toggleActions: "play none none reverse" } });
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
