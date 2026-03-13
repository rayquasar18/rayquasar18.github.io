# Phase 2: i18n Foundation + Lab Aesthetic - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Restructure the fresh Next.js app to bilingual routing (`app/[lang]/`) with next-intl and establish the dark lab aesthetic visual identity system (CSS variable tokens, grid background, typography, header, interactive styling) that all future sections inherit.

Requirements: FNDN-03, FNDN-05, I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, UX-01

</domain>

<decisions>
## Implementation Decisions

### Lab aesthetic visual system
- Subtle fine grid pattern on dark background — thin lines, graph-paper style
- Dark + green/emerald accent color palette (terminal/matrix aesthetic)
- Grid lines at moderate visibility (~12-18% opacity) — clearly a grid without competing with content
- Full-page grid background — every section inherits the same grid, unified look

### i18n routing & language switcher
- Auto-detect language from browser `navigator.language` on first visit
- Fallback to English if browser language is neither English nor Vietnamese
- Remember language choice in localStorage — skip detection on return visits
- Everything bilingual: all UI text, all section content, project descriptions, blog posts — both languages
- Follow Next.js best practices for static export i18n (next-intl + `generateStaticParams`)
- `app/[lang]/` route structure with `generateStaticParams` returning `['en', 'vi']`

### Typography & fonts
- Keep existing MarlinGeoSQ (Regular, Medium) and Saprona (Light, Regular, Medium) fonts from `src/app/fonts/`
- Test Vietnamese diacritics with these fonts — if they don't render correctly, add Be Vietnam Pro or Noto Sans as fallback
- Define a full typography scale with CSS variables now (heading sizes, body, small text, line heights)
- Keep Geist Mono for code/technical elements

### Header & navigation
- Minimal transparent bar — transparent background that gets subtle blur/dark tint on scroll
- Brand mark: icon (custom SVG) + text — use a placeholder Lucide icon until custom SVG is provided
- Language switcher: simple "EN | VI" text toggle in the header
- Mobile: hamburger menu icon that opens a slide-in or dropdown with nav links + language switcher

### Page layout & section flow
- Free scroll with active section tracking — no scroll snapping, but header highlights which section is in view
- Section dividers: gradient/glow transitions — green accent glow at section boundaries, not hard lines
- Content max-width: ~1200px centered, grid background extends full viewport width
- Generous vertical spacing between sections (~120-160px)

### Design token structure
- Semantic CSS variable naming: `--color-surface`, `--color-text-primary`, `--color-accent`, `--color-border`, etc.
- 3 surface levels: base (darkest background), elevated (cards/panels), overlay (modals/menus)
- 3 text color levels: primary (bright for headings), secondary (dimmer for body), muted (subtle for captions) + accent for links
- Full token set: colors, spacing scale, border radius, and typography — complete foundation for all future components

### Static export & GitHub Pages
- Root `/` page uses Next.js best-practice approach for locale redirect (client-side detection following next-intl static export pattern)
- Custom themed 404 page matching dark lab aesthetic, with links to both `/en/` and `/vi/` homepages
- Verify GitHub Pages deploy works: build generates `/en/index.html`, `/vi/index.html`, `404.html`, CI workflow deploys cleanly

### Interactive element styling
- Hover effects: green accent glow — elements light up with the accent color on hover
- Buttons: outlined (ghost) style — transparent with green border, fill on hover
- Inline links: green text with subtle underline on hover
- Transition timing: quick and snappy, 150-200ms

### Claude's Discretion
- Font role assignment (MarlinGeoSQ vs Saprona for headings vs body) — pick best pairing
- Exact green/emerald accent color values and surface color values
- Grid line spacing/size (cell dimensions)
- Exact spacing scale values and border radius tokens
- Typography scale exact values (px/rem sizes for h1-h6, body, small)
- Placeholder Lucide icon choice for header brand mark
- Root redirect implementation details (following next-intl best practices)
- 404 page copy and layout
- Hamburger menu animation style
- Active section detection threshold/algorithm

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/fonts/` — MarlinGeoSQ and Saprona woff files already present, need re-registration with localFont
- `src/app/globals.css` — Tailwind v4 setup with `@import "tailwindcss"` and `@theme inline` block, ready for token expansion
- `Geist` and `Geist_Mono` fonts already loaded in layout.tsx via `next/font/google`
- `lucide-react` installed — available for placeholder header icon and hamburger menu icon

### Established Patterns
- Static export mode (`output: 'export'`) with `trailingSlash: true` — must be preserved
- Tailwind v4 with `@theme inline` for custom tokens — extend this for the full design token system
- `@/*` path alias maps to `./src/*` — use for all imports
- ESLint with `next/core-web-vitals` and `next/typescript`

### Integration Points
- `src/app/layout.tsx` — currently default scaffold, needs complete rewrite for `[lang]` param, fonts, metadata, chrome
- `src/app/page.tsx` — currently default scaffold, will move to `app/[lang]/page.tsx`
- `next.config.ts` — currently empty, needs static export config restored
- `globals.css` — currently minimal, becomes the design token system foundation
- `.github/workflows/nextjs.yml` — existing CI, may need build step updates for new route structure

</code_context>

<specifics>
## Specific Ideas

- RAGFlow website style referenced for dark grid/caro pattern aesthetic (PROJECT.md)
- User emphasized following Next.js best practices for all routing and i18n implementation ("đảm bảo đúng chuẩn best practice xây dựng của nextjs")
- User wants clear client/server separation for SEO and loading performance (from Phase 1 context)
- Green/emerald terminal/matrix aesthetic — not neon-bright, more like a sophisticated lab environment

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-i18n-foundation-lab-aesthetic*
*Context gathered: 2026-03-14*
