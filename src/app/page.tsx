import { Hero } from "@/components/hero/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { CaseStudies } from "@/components/sections/case-studies";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Footer } from "@/components/layout/footer";
import { HomepageChoreography } from "@/components/motion/homepage-choreography";

export default function Home() {
  return <HomepageChoreography><main id="main-content" tabIndex={-1}><div id="top" /><Hero /><Capabilities /><CaseStudies /><ClosingCta /></main><Footer /></HomepageChoreography>;
}
