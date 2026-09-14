import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function ClosingCta() {
  return (
    <section id="closing-cta" className="closing-cta page-gutter">
      <div className="closing-orbit" aria-hidden="true"><i/><i/><i/></div>
      <p className="eyebrow"><span className="signal-dot"/> The next move is yours.</p>
      <h2>LET&apos;S BUILD<br/><span>WHAT&apos;S NEXT.</span></h2>
      <a className="button button-primary" href={site.contact}>Start a conversation <ArrowUpRight size={18}/></a>
      <p className="closing-coordinate">CONNECTED THINKING<br/>PRACTICAL PROGRESS</p>
    </section>
  );
}
