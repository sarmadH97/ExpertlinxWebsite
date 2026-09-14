import { Hero } from "@/components/hero/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return <><main id="main-content" tabIndex={-1}><div id="top" /><Hero /><Capabilities /></main><Footer /></>;
}
