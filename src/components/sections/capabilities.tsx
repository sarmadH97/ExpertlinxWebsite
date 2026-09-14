import { ArrowUpRight, MoveDownRight } from "lucide-react";
import { capabilities } from "@/data/site";
import { Hummingbird } from "@/components/hummingbird/hummingbird";
import { CapabilityScene } from "./capability-scene";

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" tabIndex={-1}>
      <CapabilityScene>
        <div className="capability-inner page-gutter">
          <div className="capability-heading">
            <h2 id="capabilities-title" className="eyebrow"><span className="signal-dot" /> Connected expertise. One direction.</h2>
            <span className="section-label">EXPERTISE / 01—04</span>
          </div>
          <div className="capability-panels">
            {capabilities.map((capability) => (
              <article key={capability.id} id={`capability-${capability.id}`} className="capability-panel" data-capability tabIndex={-1} aria-labelledby={`${capability.id}-title`}>
                <div className="capability-copy">
                  <p className="capability-index"><span>{capability.number}</span> / {capability.label}</p>
                  <h3 id={`${capability.id}-title`}>{capability.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                  <p className="capability-description">{capability.description}</p>
                  <ul className="capability-technologies">{capability.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                  <a href={capability.link} className="text-link">Let’s explore {capability.label === "AI" ? "the possibilities" : capability.label === "Custom Software" ? "your idea" : capability.label} <ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
                <div className="panel-mobile-art" aria-hidden="true"><span>{capability.number}</span><Hummingbird variant="scene" /></div>
              </article>
            ))}
          </div>
          <div className="scene-art" aria-hidden="true">
            <div className="scene-orbit scene-orbit-one" /><div className="scene-orbit scene-orbit-two" />
            <svg className="connection-lines" viewBox="0 0 600 600" fill="none">
              <path d="M101 374L248 106L506 246L387 494Z" className="connection-base" />
              <path d="M101 374L248 106L506 246L387 494L101 374" pathLength="1" data-connection-path className="connection-active" />
              <path d="M101 374L506 246M248 106L387 494" className="connection-cross" />
              {[[101, 374], [248, 106], [506, 246], [387, 494]].map(([x, y], i) => <g key={i} className={`connection-node node-${i}`}><circle cx={x} cy={y} r="7" /><circle cx={x} cy={y} r="14" className="node-ring" /></g>)}
            </svg>
            <div data-scene-bird className="scene-bird"><Hummingbird variant="scene" /></div>
            <span className="orbit-label orbit-label-one">01 / MICROSOFT</span><span className="orbit-label orbit-label-two">02 / CLOUD</span><span className="orbit-label orbit-label-three">03 / AI</span><span className="orbit-label orbit-label-four">04 / SOFTWARE</span>
            <span className="scene-caption"><span className="crosshair">+</span> Different capabilities. Connected thinking.</span>
          </div>
          <nav className="capability-navigation" aria-label="Explore capabilities">
            {capabilities.map((capability) => <a key={capability.id} href={`#capability-${capability.id}`} data-capability-link><span>{capability.number}</span>{capability.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
          </nav>
          <div className="scene-footer"><span>BUILT TO WORK TOGETHER.</span><span className="scene-scroll-hint">Keep scrolling <MoveDownRight size={15} aria-hidden="true" /></span></div>
        </div>
      </CapabilityScene>
    </section>
  );
}
