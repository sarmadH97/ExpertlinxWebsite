import { readFileSync } from "node:fs";
import path from "node:path";
import Script from "next/script";

export const dynamic = "force-static";

const legacyDocument = readFileSync(
  path.join(process.cwd(), "public", "legacy", "index.html"),
  "utf8",
);

const bodyMatch = legacyDocument.match(/<body>([\s\S]*?)<\/body>/i);
const bodyHtml = (bodyMatch?.[1] ?? "")
  .replace(/<script\s+src=["']script\.js(?:\?[^"']*)?["']><\/script>/i, "")
  .trim();

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://expertlinx.com/#organization",
      name: "ExpertLinx",
      url: "https://expertlinx.com",
      email: "sales@expertlinx.com",
      telephone: "+12892050570",
      description:
        "One senior team for Azure infrastructure, Microsoft 365 tenant setup and Dynamics 365 / Business Central.",
    },
    {
      "@type": "WebSite",
      "@id": "https://expertlinx.com/#website",
      url: "https://expertlinx.com",
      name: "ExpertLinx",
      publisher: { "@id": "https://expertlinx.com/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "Service",
      "@id": "https://expertlinx.com/#technology-consulting",
      name: "Technology consulting and engineering",
      provider: { "@id": "https://expertlinx.com/#organization" },
      serviceType: [
        "Azure Cloud Infrastructure & Management",
        "Microsoft 365 Tenant Setup & Deployment",
        "Business Applications",
        "Solution Architecture & Integration",
      ],
      areaServed: "Worldwide",
      url: "https://expertlinx.com/#capabilities",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Script
        id="expertlinx-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script src="/legacy/script.js?v=20261125-home-brief" defer />
    </>
  );
}
