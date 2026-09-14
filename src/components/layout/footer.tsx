import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer page-gutter">
      <a className="footer-conversation" href={site.contact}>What’s your next move? <ArrowUpRight aria-hidden="true" /></a>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ExpertLinx</span><span>Technology. Connected to possibility.</span><a href={`mailto:${site.email}`}>{site.email} <ArrowUpRight size={14} aria-hidden="true" /></a></div>
    </footer>
  );
}
