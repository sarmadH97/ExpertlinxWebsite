"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/data/site";
import { Hummingbird } from "@/components/hummingbird/hummingbird";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const anchorFocus = useRef<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => { header.current?.classList.toggle("is-scrolled", window.scrollY > 24); ticking = false; };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    update(); window.addEventListener("scroll", onScroll, { passive: true });
    let teardown = () => {};
    void import("gsap").then(({ gsap }) => {
      if (!nav.current || !indicator.current) return;
      const links = Array.from(nav.current.querySelectorAll("a"));
      const move = (link: HTMLAnchorElement) => {
        if (!nav.current || !indicator.current) return;
        const parent = nav.current.getBoundingClientRect(); const rect = link.getBoundingClientRect();
        gsap.to(indicator.current, { x: rect.left - parent.left, width: rect.width, opacity: 1, duration: .35, ease: "power3.out" });
      };
      const hide = () => gsap.to(indicator.current, { opacity: 0, duration: .2 });
      links.forEach(link => link.addEventListener("pointerenter", () => move(link)));
      nav.current.addEventListener("pointerleave", hide);
      teardown = () => nav.current?.removeEventListener("pointerleave", hide);
    });
    return () => { window.removeEventListener("scroll", onScroll); teardown(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (query.matches) dialog.current?.close(); };
    query.addEventListener("change", closeOnDesktop);
    return () => { document.body.style.overflow = previous; query.removeEventListener("change", closeOnDesktop); };
  }, [open]);

  function closeMenu(href?: string) {
    anchorFocus.current = href?.startsWith("#") ? href : null;
    dialog.current?.close();
  }

  return (
    <header ref={header} className="site-header">
      <div className="header-inner page-gutter">
        <a className="wordmark" href="#top" aria-label="ExpertLinx home">
          <Hummingbird variant="mark" /><span>expert<span className="wordmark-light">linx</span><span className="wordmark-dot">.</span></span>
        </a>
        <nav ref={nav} className="desktop-nav" aria-label="Main navigation">
          {navigation.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          <span ref={indicator} className="nav-indicator" aria-hidden="true" />
        </nav>
        <a href={site.contact} className="header-cta">Start a Conversation <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button ref={trigger} className="menu-trigger" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Menu size={24} aria-hidden="true" /></button>
      </div>
      <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-labelledby="menu-title"
        onClose={() => { setOpen(false); if (anchorFocus.current) document.querySelector<HTMLElement>(anchorFocus.current)?.focus({ preventScroll: true }); else trigger.current?.focus(); anchorFocus.current = null; }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const focusable = dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
          if (!focusable?.length) return;
          const first = focusable[0]; const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }}
        onClick={(event) => { if (event.target === dialog.current) closeMenu(); }}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top"><span id="menu-title" className="eyebrow">Explore ExpertLinx</span><button className="icon-button" aria-label="Close menu" onClick={() => closeMenu()}><X aria-hidden="true" /></button></div>
          <nav aria-label="Mobile navigation">
            {navigation.map((link,index)=><a key={link.label} href={link.href} onClick={()=>closeMenu(link.href)}><span className="menu-number">0{index+1}</span>{link.label}<ArrowUpRight size={22} aria-hidden="true"/></a>)}
          </nav>
          <a className="button button-primary" href={site.contact} onClick={()=>closeMenu()}>Start a Conversation <ArrowUpRight size={18} aria-hidden="true"/></a>
          <a className="mobile-email" href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </dialog>
    </header>
  );
}
