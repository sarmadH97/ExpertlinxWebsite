"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPreference } from "@/components/motion/motion-preferences";
import { DESKTOP_SCENE_QUERY } from "@/lib/motion";

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
      const media = gsap.matchMedia();
      media.add(DESKTOP_SCENE_QUERY, () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-capability]", element);
        const links = gsap.utils.toArray<HTMLAnchorElement>("[data-capability-link]", element);
        const bird = element.querySelector("[data-scene-bird]");
        const path = element.querySelector("[data-connection-path]");
        let active = -1;
        element.classList.add("is-enhanced");
        gsap.set(panels.slice(1), { autoAlpha: 0, y: 28 });
        gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });

        function setActive(index: number) {
          if (active === index) return;
          active = index;
          panels.forEach((panel, i) => {
            panel.inert = i !== index;
            panel.setAttribute("aria-hidden", String(i !== index));
          });
          links.forEach((link, i) => {
            if (i === index) link.setAttribute("aria-current", "step");
            else link.removeAttribute("aria-current");
          });
          element.dataset.active = String(index);
        }

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: () => `+=${window.innerHeight * 3.5}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            setActive(Math.min(3, Math.floor(this.time() + 0.17)));
            element.style.setProperty("--scene-progress", String(this.progress()));
          },
        });
        const positions = [{ x: 0, y: 0, rotation: -4 }, { x: 38, y: -60, rotation: 7 }, { x: -48, y: 25, rotation: -10 }, { x: 10, y: -18, rotation: 2 }];
        gsap.set(bird, positions[0]);
        panels.slice(1).forEach((panel, i) => {
          const at = i + 0.65;
          timeline.to(panels[i], { autoAlpha: 0, y: -28, duration: 0.35 }, at)
            .to(panel, { autoAlpha: 1, y: 0, duration: 0.35 }, at)
            .to(bird, { ...positions[i + 1], duration: 0.75 }, at - 0.15);
        });
        timeline.to(path, { strokeDashoffset: 0, ease: "none", duration: 3.8 }, 0);
        setActive(0);

        const handlers = links.map((link, i) => {
          const handleClick = (event: MouseEvent) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const trigger = timeline.scrollTrigger;
            if (!trigger) return;
            event.preventDefault();
            // Native scrolling also works when Lenis is not available.
            const progress = (i + 0.3) / timeline.duration();
            window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "instant" });
          };
          link.addEventListener("click", handleClick);
          return () => link.removeEventListener("click", handleClick);
        });
        ScrollTrigger.refresh();

        return () => {
          handlers.forEach((remove) => remove());
          element.classList.remove("is-enhanced");
          delete element.dataset.active;
          element.style.removeProperty("--scene-progress");
          panels.forEach((panel) => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
          links.forEach((link) => link.removeAttribute("aria-current"));
        };
      });
      media.add("(max-width: 1023px), (max-height: 699px)", () => {
        gsap.utils.toArray<HTMLElement>(".capability-copy", element).forEach((copy) => {
          gsap.from(copy, {
            y: 22,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: copy, start: "top 92%", once: true },
          });
        });
      });
      cleanup = () => media.revert();
    });
    return () => { disposed = true; cleanup(); };
  }, [enabled]);

  return <div ref={root} className="capability-scene">{children}</div>;
}
