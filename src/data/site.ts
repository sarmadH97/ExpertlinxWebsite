export const site = {
  name: "ExpertLinx",
  description:
    "Microsoft solutions, cloud, AI and custom software. ExpertLinx connects technology with the way your business works.",
  email: "sales@expertlinx.com",
  contact: "https://expertlinx.com/contact",
};

// Existing pages remain on the public website until their redesign phase.
export const navigation = [
  { label: "Services", href: "#capabilities" },
  { label: "Solutions", href: "#capabilities" },
  { label: "Case Studies", href: "https://expertlinx.com/case-studies" },
  { label: "About", href: "https://expertlinx.com/about" },
  { label: "Insights", href: "https://expertlinx.com/blog" },
];

export const caseStudies = [
  {
    client: "Inner City Health Associates",
    monogram: "ICHA",
    sector: "Healthcare",
    location: "Toronto, Canada",
    platform: "Dynamics 365 Business Central",
    result: "Finance and inventory processes streamlined.",
    metrics: [{ value: "16", label: "Weeks" }, { value: "05", label: "Consultants" }],
    href: "https://expertlinx.com/case-studies",
  },
  {
    client: "Diamond Architectural Openings",
    monogram: "DAO",
    sector: "Architecture & Design",
    location: "Canada",
    platform: "Business Central",
    result: "Project management and finance streamlined.",
    metrics: [{ value: "22", label: "Weeks" }, { value: "06", label: "Consultants" }],
    href: "https://expertlinx.com/case-studies",
  },
  {
    client: "Nomad Nexus",
    monogram: "NN",
    sector: "Customer Services",
    location: "Poland",
    platform: "Dynamics 365 CRM",
    result: "A connected CRM foundation built to improve customer engagement.",
    metrics: [{ value: "75%", label: "Customer engagement improvement" }],
    href: "https://expertlinx.com/case-studies",
  },
] as const;

export const capabilities = [
  {
    id: "microsoft",
    number: "01",
    label: "Microsoft",
    headline: "Built around\nyour business.",
    description:
      "Connect your people, processes and data with Microsoft solutions shaped around the way you work.",
    technologies: ["Dynamics 365", "Microsoft 365", "Power Platform"],
    annotation: "CONNECTED WORKPLACE",
    link: "https://expertlinx.com/services",
  },
  {
    id: "cloud",
    number: "02",
    label: "Cloud",
    headline: "Room to grow.\nBuilt in.",
    description:
      "Move to Azure with a clear plan. Build a cloud foundation for your applications, your teams and what comes next.",
    technologies: ["Microsoft Azure", "Cloud migration", "Managed services"],
    annotation: "A STRONGER FOUNDATION",
    link: "https://expertlinx.com/services/cloud-migration",
  },
  {
    id: "ai",
    number: "03",
    label: "AI",
    headline: "Intelligence.\nWith purpose.",
    description:
      "Start with the work that matters. Explore how AI and automation can turn everyday complexity into practical progress.",
    technologies: ["AI opportunities", "Workflow automation", "Data & insights"],
    annotation: "IDEAS INTO IMPACT",
    link: "https://expertlinx.com/contact",
  },
  {
    id: "software",
    number: "04",
    label: "Custom Software",
    headline: "Your workflow.\nYour software.",
    description:
      "Bring your ideas to life with custom web and mobile applications, connected systems and thoughtful digital experiences.",
    technologies: ["Web applications", "Mobile applications", "API development"],
    annotation: "PURPOSE-BUILT POSSIBILITIES",
    link: "https://expertlinx.com/contact",
  },
] as const;
