import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/site";

export function CaseStudies() {
  return (
    <section id="selected-work" className="case-studies" aria-labelledby="work-title">
      <div className="case-intro page-gutter">
        <p className="eyebrow"><span className="signal-dot" /> Evidence over promises.</p>
        <h2 id="work-title">SELECTED<br/><span>WORK.</span></h2>
      </div>
      {caseStudies.map((study,index)=>(
        <article key={study.client} className={`case-panel case-panel--${index+1}`} data-case-study>
          <div className="case-visual" data-case-visual aria-hidden="true">
            <div className="case-grid" />
            <span className="case-monogram">{study.monogram}</span>
            <div className="case-system-card case-system-card--a"><span>01</span><i/><i/><i/></div>
            <div className="case-system-card case-system-card--b"><span>CONNECTED</span><strong>{study.platform}</strong></div>
            <svg viewBox="0 0 900 600"><path pathLength="1" d="M-20 472C190 278 336 528 492 291S760 103 940 171"/><circle cx="492" cy="291" r="7"/><circle cx="760" cy="148" r="7"/></svg>
          </div>
          <div className="case-content page-gutter">
            <div className="case-meta"><span data-case-reveal>0{index+1} / {study.sector}</span><span data-case-reveal>{study.location}</span></div>
            <div className="case-title-clip"><h3 data-case-reveal>{study.client}</h3></div>
            <p className="case-result" data-case-reveal>{study.result}</p>
            <div className="case-stats">
              {study.metrics.map(metric=><div key={metric.label} data-case-reveal><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
            </div>
            <a href={study.href} className="case-link" data-case-reveal>View case study <ArrowUpRight size={18}/></a>
          </div>
        </article>
      ))}
    </section>
  );
}
