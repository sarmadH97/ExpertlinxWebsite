# ExpertLinx — cinematic homepage

A motion-led homepage for ExpertLinx connecting a pinned hero, four transforming capability states, real case-study chapters and a final conversation prompt.

## Run locally

Use Node.js 20.9 or newer (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production checks:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

No environment variables or external services are required. Manrope is self-hosted through `@fontsource-variable/manrope`.

## Motion architecture

- `HomepageChoreography` owns the hero, case-study and CTA camera movement.
- `CapabilityScene` owns the pinned four-state capability timeline and connected system transformations.
- GSAP and ScrollTrigger are dynamically imported, scoped with `gsap.context()`, split by `gsap.matchMedia()`, and reverted on cleanup.
- Scroll positions update transforms directly; React state is not used as a scroll loop.
- Desktop uses pinned, scrubbed scenes. Tablet and mobile use shorter entrance and in-flow reveals.
- Reduced-motion mode disables pinning, long flights and large scroll scaling while retaining all content.
- Lenis supplies desktop wheel smoothing and stays synchronized with ScrollTrigger.

The hero uses hand-wrapped text masks for predictable line reveals. The capability canvas transforms between Microsoft nodes, cloud depth rings, an AI neural network and assembled software interface blocks. Case studies expand from framed system visuals into full-viewport chapters.

## Content

Service positioning and project information come from the current ExpertLinx website. The homepage highlights:

- Inner City Health Associates — Dynamics 365 Business Central, 16 weeks, 5 consultants
- Diamond Architectural Openings — Business Central, 22 weeks, 6 consultants
- Nomad Nexus — Dynamics 365 CRM, 75% customer engagement improvement

Project imagery is expressed as branded technical systems rather than implied product screenshots. Links continue to the existing ExpertLinx service, case-study, company and contact pages.

## Responsive and accessibility behavior

The full pinned choreography runs at widths of at least 1024px and heights of at least 700px. Smaller screens keep content in document flow and use shorter reveal sequences. The native mobile dialog, skip link, keyboard focus styles, semantic headings, inert inactive panels and motion preference control remain available.

The key review sizes are 1440, 1024, 768 and 390 pixels wide. See `docs/verification.md` for the verification record.
