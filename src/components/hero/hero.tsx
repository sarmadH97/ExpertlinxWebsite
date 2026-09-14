import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Hummingbird } from "@/components/hummingbird/hummingbird";
import { MotionToggle } from "@/components/motion/motion-preferences";
import { HeroEntrance } from "./hero-entrance";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="hero page-gutter" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <HeroEntrance>
        <div className="hero-topline eyebrow" data-hero-detail><span className="signal-dot" /> Technology with direction.</div>
        <div className="hero-art" aria-hidden="true">
          <svg className="flight-path" viewBox="0 0 740 660" fill="none"><ellipse cx="380" cy="330" rx="295" ry="225" transform="rotate(-32 380 330)" /><ellipse cx="380" cy="330" rx="325" ry="254" transform="rotate(-32 380 330)" /><path d="M85 524C185 494 349 591 641 211" /><circle cx="602" cy="144" r="4" /></svg>
          <div className="hero-bird" data-hero-bird><Hummingbird /></div>
          <div className="art-coordinate"><span className="crosshair">+</span> Precision in every move.</div>
        </div>
        <h1 id="hero-title" className="hero-title">
          <span className="line-clip"><span data-hero-line>TECHNOLOGY</span></span>
          <span className="line-clip"><span data-hero-line>THAT MOVES</span></span>
          <span className="line-clip"><span className="accent-line" data-hero-line>BUSINESS FORWARD<span className="hero-period">.</span></span></span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-intro" data-hero-detail>
            <span className="small-cross" aria-hidden="true">↗</span>
            <p>We connect Microsoft solutions, cloud, AI and custom software to move your business forward.</p>
          </div>
          <div className="hero-actions" data-hero-detail>
            <a href="#capabilities" className="button button-primary">Explore Our Solutions <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href={site.contact} className="text-link">Start a Conversation <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-baseline" data-hero-detail>
          <a href="#capabilities" className="scroll-cue"><span className="scroll-icon"><ArrowDown size={14} aria-hidden="true" /></span> Scroll to explore</a>
          <p className="technology-list">Microsoft <span>·</span> Cloud <span>·</span> AI <span>·</span> Custom Software</p>
          <MotionToggle />
        </div>
      </HeroEntrance>
    </section>
  );
}
