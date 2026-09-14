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
          const bird = document.querySelector("[data-hummingbird-scene]");
          const readout = element.querySelector("[data-system-readout]");
          let active = -1;
          element.classList.add("is-enhanced");
          gsap.set(panels.slice(1), { autoAlpha: 0, y: 48, clipPath: "inset(12% 0 12%)" });
          gsap.set(layers.slice(1), { autoAlpha: 0, scale: .72, transformOrigin: "50% 50%" });
          gsap.set("[data-draw-path]", { strokeDasharray: 1, strokeDashoffset: 1 });
          const setActive = (index: number) => {
            if (active === index) return;
            active = index;
            panels.forEach((panel,i) => { panel.inert=i!==index; panel.setAttribute("aria-hidden",String(i!==index)); });
            links.forEach((link,i) => i===index?link.setAttribute("aria-current","step"):link.removeAttribute("aria-current"));
            element.dataset.active=String(index);
            if (readout) readout.textContent=["MICROSOFT","CLOUD","AI + AUTOMATION","CUSTOM SOFTWARE"][index];
          };
          const tl = gsap.timeline({
            defaults:{ease:"power2.inOut"},
            scrollTrigger:{trigger:element,start:"top top",end:()=>`+=${window.innerHeight*4.6}`,pin:true,scrub:.8,anticipatePin:1,invalidateOnRefresh:true,refreshPriority:1},
            onUpdate(){setActive(Math.min(3,Math.floor(this.progress()*4)));},
          });
          tl.to(layers[0].querySelectorAll("[data-draw-path]"),{strokeDashoffset:0,duration:.8,ease:"none"},0);
          const birdStates=[
            {x:"66vw",y:"54vh",scale:.5,rotation:-8},
            {x:"77vw",y:"30vh",scale:.46,rotation:-14},
            {x:"59vw",y:"61vh",scale:.42,rotation:10},
            {x:"80vw",y:"45vh",scale:.44,rotation:-4},
          ];
          tl.to(bird,{...birdStates[0],opacity:1,duration:.35},0);
          panels.slice(1).forEach((panel,i)=>{
            const at=i+1;
            tl.to(panels[i],{autoAlpha:0,y:-42,clipPath:"inset(12% 0 12%)",duration:.34},at-.18)
              .to(layers[i],{autoAlpha:0,scale:1.18,rotation:i%2?8:-8,duration:.38},at-.18)
              .fromTo(panel,{autoAlpha:0,y:48,clipPath:"inset(12% 0 12%)"},{autoAlpha:1,y:0,clipPath:"inset(0% 0 0%)",duration:.46},at)
              .to(layers[i+1],{autoAlpha:1,scale:1,rotation:0,duration:.6},at-.08)
              .to(bird,{...birdStates[i+1],duration:.72,ease:"power1.inOut"},at-.18);
            const paths = layers[i+1].querySelectorAll("[data-draw-path]");
            if (paths.length) tl.to(paths,{strokeDashoffset:0,duration:.72,stagger:.05,ease:"none"},at);
          });
          setActive(0);
          return () => {
            element.classList.remove("is-enhanced"); delete element.dataset.active;
            panels.forEach(p=>{p.inert=false;p.removeAttribute("aria-hidden");});
            links.forEach(l=>l.removeAttribute("aria-current"));
          };
        });
        mm.add("(max-width: 1023px), (max-height: 699px)", () => {
          gsap.utils.toArray<HTMLElement>(".capability-panel",element).forEach(panel=>gsap.from(panel,{y:28,opacity:0,duration:.7,scrollTrigger:{trigger:panel,start:"top 88%",once:true}}));
        });
        cleanup=()=>mm.revert();
      }, element);
      const old=cleanup; cleanup=()=>{old();ctx.revert();}; ScrollTrigger.refresh();
    });
    return()=>{disposed=true;cleanup();};
  },[enabled]);
  return <div ref={root} className="capability-scene">{children}</div>;
}
