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
          gsap.set(panels.slice(1), { autoAlpha: 0, y: 34, clipPath: "inset(8% 0 8%)" });
          gsap.set(layers.slice(1), { autoAlpha: 0, scale: .82, transformOrigin: "50% 50%" });
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

          const stateAt = [0, 1, 2, 3];
          const transitionAt = [.76, 1.76, 2.76];
          const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: element,
              start: "top top",
              end: () => `+=${window.innerHeight * 7.2}`,
              pin: true,
              scrub: .95,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
            onUpdate() {
              const time = this.time();
              const index = time < 1.0 ? 0 : time < 2.0 ? 1 : time < 3.0 ? 2 : 3;
              setActive(index);
            },
          });

          timeline
            .addLabel("microsoft", stateAt[0])
            .to(layers[0].querySelectorAll("[data-draw-path]"), { strokeDashoffset: 0, duration: .24, ease: "none" }, 0);

          panels.slice(1).forEach((panel, i) => {
            const at = transitionAt[i];
            const nextLayer = layers[i + 1];
            timeline
              .addLabel(["cloud", "ai", "software"][i], stateAt[i + 1])
              .to(panels[i], { autoAlpha: 0, y: -26, clipPath: "inset(8% 0 8%)", duration: .2 }, at)
              .to(layers[i], { autoAlpha: 0, scale: 1.08, rotation: i % 2 ? 3 : -3, duration: .22 }, at)
              .fromTo(panel, { autoAlpha: 0, y: 34, clipPath: "inset(8% 0 8%)" }, { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0%)", duration: .24 }, at + .05)
              .to(nextLayer, { autoAlpha: 1, scale: 1, rotation: 0, duration: .28 }, at + .03);
            const paths = nextLayer.querySelectorAll("[data-draw-path]");
            if (paths.length) timeline.to(paths, { strokeDashoffset: 0, duration: .24, stagger: .025, ease: "none" }, at + .05);
          });

          const clock = { progress: 0 };
          timeline.to(clock, { progress: 1, duration: .95, ease: "none" }, 3.05);
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
            gsap.fromTo(panel, { y: 22, opacity: 0 }, {
              y: 0,
              opacity: 1,
              duration: .58,
              ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 88%", toggleActions: "play none none reverse" },
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
