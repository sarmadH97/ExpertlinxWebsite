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
  .replace(/<script\s+src=["']script\.js["']><\/script>/i, "")
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
      description:
        "Technology consulting and engineering across Microsoft platforms, cloud, AI, data and custom software.",
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
        "Microsoft business applications",
        "Cloud and Azure consulting",
        "AI, data and automation",
        "Custom software engineering",
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
      <Script src="/legacy/script.js" strategy="afterInteractive" />
    </>
  );
}

