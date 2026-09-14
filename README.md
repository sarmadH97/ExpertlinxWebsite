# ExpertLinx — homepage foundation

A new visual direction for ExpertLinx: editorial typography, a faceted hummingbird and a connected, scroll-driven capability story. This first phase implements only the navigation, hero, four-part capability scene and a minimal footer. There are no additional page templates, invented client metrics or certification badges.

## Run locally

Use Node.js 20.9 or newer (Node 22 LTS recommended) and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production verification:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

No environment variables or external services are required. Manrope is self-hosted through `@fontsource-variable/manrope`; builds do not contact Google Fonts. The lockfile pins the installed dependency tree. Next.js 16 uses the ESLint CLI directly, so `lint` runs `eslint`, not the removed `next lint` command.

## Architecture

```text
src/
  app/                    App Router layout, homepage, metadata, icon, global theme
  components/
    layout/               Interactive navigation and server-rendered footer
    hero/                 Server-rendered hero + small Motion entrance boundary
    hummingbird/          Reusable decorative SVG renderer
    motion/               Motion preferences and Lenis lifecycle
    sections/             Server-rendered capabilities + GSAP scene controller
  data/site.ts            Navigation, contact information and capability copy
  lib/motion.ts           Shared media queries and entrance easing
```

`page.tsx`, `Hero`, `Capabilities` and `Footer` remain Server Components. The client animation boundaries accept server-rendered children; they do not turn the content tree into client components. The SVG has no animation dependency and can render on either side of the boundary. Navigation is a client island because it owns the mobile dialog and scroll state.

### Design system

Tailwind CSS v4 is configured in `postcss.config.mjs` and the CSS-first `@theme inline` block in `src/app/globals.css`. A separate `tailwind.config.ts` is not needed. Shared CSS variables define the near-black background, off-white text, cyan accent, muted text, border color, responsive gutter and header height. Bespoke layout classes handle the editorial composition and choreography without repeated card components.

### Animation responsibilities

| Owner | Responsibility |
| --- | --- |
| Motion (`HeroEntrance`) | Initial headline, supporting copy, CTA and mascot entrance; scoped selectors and cleanup |
| CSS (`Hummingbird`) | Small hover and wing movements on nested SVG groups; no continuous React renders |
| GSAP / ScrollTrigger (`CapabilityScene`) | Desktop pin, overlapping text transitions, mascot repositioning, connecting path and current capability navigation |
| Lenis (`SmoothScroll`) | Desktop wheel smoothing on the GSAP ticker; native touch scrolling is preserved |
| `MotionPreferences` | System reduced-motion subscription and user pause/resume control |

Motion and GSAP never write transforms to the same element. The hero entrance transforms the mascot's outer wrapper; CSS animates its inner SVG groups. The capability scene has its own mascot instance and GSAP-owned wrapper. Both GSAP consumers dynamically import the library and use `gsap.matchMedia()` with `revert()` cleanup. Lenis unregisters its scroll callback and ticker, then destroys its instance. Async imports are guarded against unmounting.

### Desktop, mobile and accessibility

- The desktop scene pins only at widths of at least **1024px** and heights of at least **700px**, with motion enabled. The CSS and JS queries must stay aligned.
- On smaller viewports, short screens, reduced motion or user-paused motion, all four articles appear in normal document flow. There is no mobile pin or wheel smoothing.
- Capability navigation can jump to a state using a mouse or keyboard. Inactive desktop panels are `inert` and `aria-hidden`; the current navigation link uses `aria-current="step"`. These attributes and inline animation styles are reverted when leaving the enhanced layout.
- The mobile menu uses a native modal `dialog` for focus containment and Escape support. Closing restores focus, and resizing to desktop closes the dialog and releases scroll lock.
- The page includes a skip link, semantic headings, focus indicators and decorative SVGs hidden from assistive technology. Every CTA has a destination.
- Reduced motion is checked before animation setup, responds to system changes and is enforced in CSS before hydration. The user can also pause animations with the hero's motion control; this preference lasts for the current page session.
- Server HTML is readable without JavaScript. Entrance effects progressively enhance visible content; no permanent opacity-zero initial state is shipped.

### Replacing the hummingbird with Rive

Keep the `HummingbirdProps` interface (`className`, `variant`) and the layout wrappers in place. Replace the SVG renderer with a client-side Rive implementation inside that boundary, retaining its fixed aspect ratio and decorative accessibility behavior. Keep a static SVG fallback for server rendering and reduced motion. Feed the same motion preference into the new renderer so paused/reduced motion stops the Rive state machine. GSAP should continue to own the scene wrapper; Rive should own only the internal mascot motion.

## Content sources and scope

Service and positioning references were reviewed on 13 September 2026:

- https://expertlinx.com/ — Microsoft, cloud and custom development positioning
- https://expertlinx.com/about — Dynamics 365, Power Platform, Microsoft 365 and Azure scope
- https://expertlinx.com/contact — public contact destination and sales email

The AI theme follows the project brief. Its exploratory copy makes no claims about deployed AI projects, certifications or measured outcomes. The other capability descriptions are new, concise editorial copy based on the service scope, not quotations from the existing website.

Services and Solutions navigate to the local capability section. Case Studies, About, Insights and contact links deliberately point to the current public site while those pages await their redesign. This phase does not provide a new contact form or backend.

Visual references from the brief (TELUS Digital, Octolane, Rothfinder and Heron) informed scale, pacing and hierarchy only. The composition and SVG artwork are original to this implementation.

## Verification

See `docs/verification.md` for the checked viewport sizes, interaction coverage and final command results.
