"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/data/site";
import { Hummingbird } from "@/components/hummingbird/hummingbird";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const anchorFocus = useRef<string | null>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner page-gutter">
        <a className="wordmark" href="#top" aria-label="ExpertLinx home">
          <Hummingbird variant="mark" /><span>expert<span className="wordmark-light">linx</span><span className="wordmark-dot">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <a href={site.contact} className="header-cta">Start a Conversation <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button ref={trigger} className="menu-trigger" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu"
          onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Menu size={24} aria-hidden="true" /></button>
      </div>
      <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-labelledby="menu-title"
        onClose={() => {
          setOpen(false);
          if (anchorFocus.current) document.querySelector<HTMLElement>(anchorFocus.current)?.focus({ preventScroll: true });
          else trigger.current?.focus();
          anchorFocus.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const focusable = dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
          if (!focusable?.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }}
        onClick={(event) => { if (event.target === dialog.current) closeMenu(); }}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top"><span id="menu-title" className="eyebrow">Explore ExpertLinx</span><button className="icon-button" aria-label="Close menu" onClick={() => closeMenu()}><X aria-hidden="true" /></button></div>
          <nav aria-label="Mobile navigation">
            {navigation.map((link, index) => <a key={link.label} href={link.href} onClick={() => closeMenu(link.href)}><span className="menu-number">0{index + 1}</span>{link.label}<ArrowUpRight size={22} aria-hidden="true" /></a>)}
          </nav>
          <a className="button button-primary" href={site.contact} onClick={() => closeMenu()}>Start a Conversation <ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="mobile-email" href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </dialog>
    </header>
  );
}
