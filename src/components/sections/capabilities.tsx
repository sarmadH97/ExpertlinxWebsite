import { ArrowUpRight, MoveDownRight } from "lucide-react";
import { capabilities } from "@/data/site";
import { CapabilityScene } from "./capability-scene";

const nodes = [[92,330],[164,135],[286,88],[482,152],[526,347],[362,485],[173,458]];

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
                  <a href={capability.link} className="text-link">Explore {capability.label} <ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
                <div className={`mobile-system mobile-system--${capability.id}`} aria-hidden="true"><span>{capability.number}</span><i /><i /><i /></div>
              </article>
            ))}
          </div>
          <div className="systems-stage" aria-hidden="true">
            <div className="system-glow" />
            <svg className="systems-canvas" viewBox="0 0 600 560">
              <g data-system="microsoft" className="system-layer system-network">
                <path data-draw-path pathLength="1" d="M92 330L164 135L286 88L482 152L526 347L362 485L173 458L92 330M164 135L362 485M286 88L173 458M482 152L92 330M526 347L164 135" />
                {nodes.map(([x,y],i)=><g key={i} className="system-node" transform={`translate(${x} ${y})`}><circle r="6"/><circle r="15" className="node-pulse"/></g>)}
              </g>
              <g data-system="cloud" className="system-layer system-cloud">
                {[0,1,2,3].map(i=><ellipse key={i} cx="310" cy="280" rx={80+i*48} ry={50+i*29} />)}
                <path data-draw-path pathLength="1" d="M75 305C167 183 245 401 318 251S461 192 548 295" />
                {[[115,283],[237,324],[319,251],[414,216],[510,278]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={5+i%2*3}/>)}
              </g>
              <g data-system="ai" className="system-layer system-ai">
                {[-2,-1,0,1,2].map((r)=><path key={r} data-draw-path pathLength="1" d={`M68 ${280+r*48}C194 ${120+r*36} 384 ${438-r*30} 542 ${270+r*34}`} />)}
                {nodes.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===2?12:6}/>)}
              </g>
              <g data-system="software" className="system-layer system-software">
                <rect x="79" y="90" width="445" height="365" rx="8" className="ui-shell"/>
                <path d="M79 148H524M151 148V455" />
                <rect x="178" y="180" width="138" height="102" rx="4"/><rect x="337" y="180" width="159" height="44" rx="4"/>
                <rect x="337" y="242" width="159" height="112" rx="4"/><rect x="178" y="307" width="138" height="113" rx="4"/>
                <circle cx="106" cy="119" r="5"/><circle cx="123" cy="119" r="5"/>
              </g>
            </svg>
            <div className="systems-index"><span>ELX / CONNECTED SYSTEMS</span><span data-system-readout>MICROSOFT</span></div>
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
