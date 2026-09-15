"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPreference } from "@/components/motion/motion-preferences";

export function CapabilityScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreference();

  useEffect(() => {
    if (!enabled || !root.current) return;
    const element = root.current;
    let disposed = false;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px) and (min-height: 700px)", () => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-capability]", element);
          const layers = gsap.utils.toArray<SVGGElement>("[data-system]", element);
          const links = gsap.utils.toArray<HTMLAnchorElement>("[data-capability-link]", element);
          const readout = element.querySelector("[data-system-readout]");
          let active = -1;

          element.classList.add("is-enhanced");
          gsap.set(panels.slice(1), { autoAlpha: 0, y: 26, clipPath: "inset(6% 0 6%)" });
          gsap.set(layers.slice(1), { autoAlpha: 0, scale: .88, transformOrigin: "50% 50%" });
          gsap.set("[data-draw-path]", { strokeDasharray: 1, strokeDashoffset: 1 });

          const setActive = (index: number) => {
            if (active === index) return;
            active = index;
            panels.forEach((panel, i) => {
              panel.inert = i !== index;
              panel.setAttribute("aria-hidden", String(i !== index));
            });
            links.forEach((link, i) => i === index ? link.setAttribute("aria-current", "step") : link.removeAttribute("aria-current"));
            element.dataset.active = String(index);
            if (readout) readout.textContent = ["MICROSOFT", "CLOUD", "AI + AUTOMATION", "CUSTOM SOFTWARE"][index];
          };

          const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: element,
              start: "top top",
              end: () => "+=" + window.innerHeight * 3.65,
              pin: true,
              scrub: .55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
            onUpdate() {
              const time = this.time();
              setActive(time < .82 ? 0 : time < 1.64 ? 1 : time < 2.46 ? 2 : 3);
            },
          });

          timeline.to(layers[0].querySelectorAll("[data-draw-path]"), { strokeDashoffset: 0, duration: .3, ease: "none" }, 0);

          panels.slice(1).forEach((panel, i) => {
            const at = .58 + i * .82;
            const nextLayer = layers[i + 1];
            timeline
              .to(panels[i], { autoAlpha: 0, y: -20, clipPath: "inset(6% 0 6%)", duration: .22 }, at)
              .to(layers[i], { autoAlpha: 0, scale: 1.06, rotation: i % 2 ? 2 : -2, duration: .27 }, at)
              .fromTo(panel, { autoAlpha: 0, y: 26, clipPath: "inset(6% 0 6%)" }, { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0%)", duration: .3 }, at + .05)
              .to(nextLayer, { autoAlpha: 1, scale: 1, rotation: 0, duration: .34 }, at + .03);
            const paths = nextLayer.querySelectorAll("[data-draw-path]");
            if (paths.length) timeline.to(paths, { strokeDashoffset: 0, duration: .3, stagger: .018, ease: "none" }, at + .06);
          });

          timeline.to({}, { duration: .38 });
          setActive(0);

          return () => {
            element.classList.remove("is-enhanced");
            delete element.dataset.active;
            panels.forEach((panel) => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
            links.forEach((link) => link.removeAttribute("aria-current"));
          };
        });

        mm.add("(max-width: 1023px), (max-height: 699px)", () => {
          gsap.utils.toArray<HTMLElement>(".capability-panel", element).forEach((panel) => {
            gsap.fromTo(panel, { y: 18, opacity: 0 }, {
              y: 0, opacity: 1, duration: .48, ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 90%", toggleActions: "play none none reverse" },
            });
          });
        });

        cleanup = () => mm.revert();
      }, element);
      const previous = cleanup;
      cleanup = () => { previous(); ctx.revert(); };
      ScrollTrigger.refresh();
    });

    return () => { disposed = true; cleanup(); };
  }, [enabled]);

  return <div ref={root} className="capability-scene">{children}</div>;
}
