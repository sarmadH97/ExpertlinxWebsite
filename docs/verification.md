# Homepage verification

Verified against the production build on 14 September 2026.

## Automated checks

| Check | Result |
| --- | --- |
| `npm install` | Passed; 373 packages audited, 0 vulnerabilities |
| `npm run lint` | Passed with 0 warnings |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; homepage statically prerendered |

The restricted Windows test environment cannot create the child-process pipes used by Next.js during type checking. The build was run with `NEXT_BUILD_WORKER_THREADS=1`, which activates the opt-in worker-thread branch in `next.config.ts`. A normal local or CI environment uses Next.js defaults.

## Browser checks

| Viewport | Coverage | Result |
| --- | --- | --- |
| 1440 × 900 | Hero composition, fixed navigation, hero CTA, pinned scene, all four capability states, footer release | Passed |
| 390 × 844 | Hero, no horizontal overflow, native scrolling, vertical capability layout, mobile dialog | Passed |
| 320 × 700 | Narrow typography, stacked CTA treatment, no horizontal overflow, no pin | Passed |

Additional behavior checked:

- Desktop capability links activate Microsoft, Cloud, AI and Custom Software states; keyboard Enter activation was checked on AI.
- Inactive pinned panels become `inert` and `aria-hidden`; the active panel remains visible and available to assistive technology.
- The motion toggle removes pinning, continuous mascot motion and inactive-panel accessibility state, exposing all four articles in document flow.
- Mobile navigation uses a modal dialog, wraps keyboard focus, closes with Escape, restores focus and releases body scroll lock.
- Selecting the local Services link closes the dialog, scrolls to the capability section and moves focus to it.
- Resizing from mobile to desktop closes the dialog and restores the pinned scene.
- Runtime console contained no warnings or errors during the desktop capability sequence.

External destinations were checked against the current ExpertLinx navigation: `/services`, `/services/cloud-migration`, `/case-studies`, `/about`, `/blog` and `/contact` exist on the public site.
