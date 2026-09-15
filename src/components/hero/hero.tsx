import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MotionToggle } from "@/components/motion/motion-preferences";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="hero page-gutter" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <svg className="hero-flight-map" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path data-hero-path pathLength="1" d="M1512 181C1180 81 1021 317 1132 452C1253 600 1131 746 718 893" />
        <g className="map-nodes"><circle cx="1132" cy="452" r="4" /><circle cx="718" cy="893" r="4" /></g>
      </svg>
      <div className="hero-composition">
        <div className="hero-topline eyebrow" data-hero-detail><span className="signal-dot" /> Technology with direction.</div>
        <p className="hero-coordinate" data-hero-detail>43.6532° N / 79.3832° W<br />SYSTEMS IN MOTION</p>
        <h1 id="hero-title" className="hero-title">
          <span className="line-clip"><span data-hero-line="one">TECHNOLOGY</span></span>
          <span className="line-clip"><span data-hero-line="two">THAT MOVES</span></span>
          <span className="line-clip"><span className="accent-line" data-hero-line="three">BUSINESS FORWARD<span className="hero-period">.</span></span></span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-intro" data-hero-detail>
            <span className="small-cross" aria-hidden="true">↗</span>
            <p>ExpertLinx helps organizations transform through Microsoft solutions, cloud, AI and custom software.</p>
          </div>
          <div className="hero-actions" data-hero-detail>
            <a href="#capabilities" className="button button-primary">Explore Our Solutions <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href={site.contact} className="text-link">Start a Conversation <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-scroll-message" data-hero-intro-late><span>One connected flight path.</span><strong>Strategy → systems → momentum.</strong></div>
        <div className="hero-baseline" data-hero-detail>
          <a href="#capabilities" className="scroll-cue"><span className="scroll-icon"><ArrowDown size={14} aria-hidden="true" /></span> Scroll to explore</a>
          <p className="technology-list">Microsoft <span>·</span> Cloud <span>·</span> AI <span>·</span> Custom Software</p>
          <MotionToggle />
        </div>
      </div>
    </section>
  );
}
