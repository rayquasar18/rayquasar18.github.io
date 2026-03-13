# Phase 1: Codebase Cleanup - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix all outstanding bugs in the existing codebase so every existing feature works correctly in both dev and production builds. No new features — only fixes to what already exists.

Requirements: FNDN-01, FNDN-02, FNDN-04, UX-05

</domain>

<decisions>
## Implementation Decisions

### Loading-to-hero transition
- Dismiss trigger: wait for `document.readyState === 'complete'` + minimum 1.5s display time (whichever is later)
- Transition animation: scale down + fade out (not the current h-screen→h-0 which causes layout jumps)
- Keep current ldrs spinners (Bouncy + Reuleaux) — Phase 2 will restyle to dark theme
- Remove the race condition between setTimeout(1000) and window.load event

### Scroll animation approach
- Keep the video-based hero with scroll-driven animations for now — Phase 5 replaces video with 3D robot + static black hole background
- Keep the quote zoom effect ("QUIET EFFORT CREATES LOUD IMPACT") — creative choice preserved

### BasePath strategy
- Deploy to root domain (rayquasar18.github.io) — no basePath needed
- Remove `NEXT_PUBLIC_BASE_PATH` from both .env.local and .env.production
- Remove basePath/assetPrefix conditional logic from next.config.ts
- CV download uses direct path: `/HaMinhQuan_CV.pdf` (no basePath helper needed)
- Update all URL references from `quanmofii.github.io` to `rayquasar18.github.io` (metadataBase, homepage, OG URLs)

### Use client audit
- Full audit: check all components for hooks, framer-motion, Zustand, and event handler imports
- Clear client/server separation: only mark components as `"use client"` when they genuinely need client features — optimize for loading performance + SEO
- Split components where beneficial: extract static content to server components, keep only interactive logic as client
- Convert page.tsx to server component (remove `"use client"`) — it only composes section components
- 4 known missing directives: GradientBackground, InfoItem, IntroduceSection, ProjectSection

### Claude's Discretion
- Scroll lock behavior during loading screen (recommended: lock)
- Loading screen DOM removal after transition (recommended: remove from DOM)
- Hero animation coordination with loading screen dismiss (recommended: start after loading gone)
- Loading screen error/timeout behavior (recommended: timeout and dismiss)
- HeroSection scroll length (h-[1100vh]) — adjust if needed
- Magic number approach in scroll transforms (95px, 40%, 1700%, 5200%) — replace with computed/measured values or extract as named constants
- Quote zoom scale values — make responsive across screen sizes

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AnimatedDiv`: framer-motion wrapper with `useInView`, supports delay and rotation — has `"use client"`
- `AnimatedText`: character-by-character animation with delay — has `"use client"`
- `BaseVideo`: video component using `process.env.NEXT_PUBLIC_BASE_PATH` — needs basePath removal
- `BaseImage`: next/image wrapper using basePath — needs basePath removal
- `ButtonDownloadCV`: hardcodes `/HaMinhQuan_CV.pdf` — works for root domain, no change needed
- `LoadingScreen`: uses `ldrs` library (Bouncy, Reuleaux) — fix timing logic, keep visual

### Established Patterns
- framer-motion for all animations (motion components, useScroll, useTransform)
- Local fonts loaded via next/font/local (MarlinGeoSQ, Saprona families)
- Section-based architecture: each section is a standalone component in sections/
- Static export (`output: 'export'`) with `trailingSlash: true`

### Integration Points
- `layout.tsx`: wraps with Header, Footer, LoadingScreen — metadata references need URL update
- `page.tsx`: composes all sections — needs `"use client"` removed
- `next.config.ts`: basePath/assetPrefix logic needs cleanup
- `.env.local` / `.env.production`: remove NEXT_PUBLIC_BASE_PATH

</code_context>

<specifics>
## Specific Ideas

- User wants clear client/server component separation specifically for SEO and loading performance optimization ("nên chia rõ cái nào là client cái nào là server side render để tối ưu hiệu xuất load + seo")
- Scale+fade transition for loading screen — not just a simple fade, should feel polished
- Keep the dramatic quote zoom — it's a creative signature

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-codebase-cleanup*
*Context gathered: 2026-03-13*
