---
phase: 02-i18n-foundation-lab-aesthetic
plan: 01
subsystem: i18n, ui
tags: [next-intl, tailwind-v4, css-variables, design-tokens, static-export, i18n, fonts]

# Dependency graph
requires:
  - phase: 01-codebase-cleanup
    provides: Fresh Next.js 16 app with TypeScript, Tailwind CSS v4, core dependencies
provides:
  - next-intl i18n routing infrastructure (routing, request, navigation configs)
  - Bilingual static export generating /en/ and /vi/ route trees
  - Full CSS design token system with @theme inline (surfaces, text, accents, borders, spacing, fonts, typography, radius)
  - Dark lab aesthetic grid background pattern (40px emerald green grid)
  - Custom font declarations (MarlinGeoSQ body, Saprona display, Geist Mono code)
  - Root locale redirect with localStorage persistence
  - Themed 404 page with bilingual navigation
  - hreflang alternate metadata on all locale pages
  - English and Vietnamese translation message files
affects: [02-02, phase-3, phase-4, phase-5, phase-6, phase-7, phase-8, phase-9]

# Tech tracking
tech-stack:
  added: [next-intl@4.8.3]
  patterns: [next-intl static export with generateStaticParams, Tailwind v4 @theme inline token system, client-side locale detection, passthrough root layout]

key-files:
  created:
    - src/i18n/routing.ts
    - src/i18n/request.ts
    - src/i18n/navigation.ts
    - src/lib/fonts.ts
    - src/app/[lang]/layout.tsx
    - src/app/[lang]/page.tsx
    - src/app/not-found.tsx
    - src/messages/en.json
    - src/messages/vi.json
  modified:
    - package.json
    - next.config.ts
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Saprona for display/headings (--font-display), MarlinGeoSQ for body text (--font-body) -- Saprona is more distinctive, MarlinGeoSQ has geometric sans readability"
  - "Root layout is bare passthrough (returns children only), locale layout owns html/body tags -- standard next-intl static export pattern"
  - "Root redirect uses window.location.replace() instead of Next.js router -- page is outside [lang] context, needs full navigation"
  - "404 page uses inline styles for lab aesthetic -- outside locale layout chain, Tailwind token utilities unavailable"

patterns-established:
  - "Passthrough root layout: src/app/layout.tsx returns children only, locale layout owns html/body"
  - "Locale layout pattern: [lang]/layout.tsx with generateStaticParams, NextIntlClientProvider, font variables, hreflang metadata"
  - "Design token hierarchy: primitives in :root (green/gray palettes), semantics in @theme inline (surfaces, text, accents)"
  - "Translation file structure: namespaced JSON (Metadata, Header, Hero, Home, LanguageSwitcher, NotFound)"
  - "Client-side locale detection: check localStorage first, then navigator.language, persist to localStorage"

requirements-completed: [I18N-01, I18N-04, I18N-05, FNDN-03, FNDN-05, UX-01]

# Metrics
duration: 5min
completed: 2026-03-14
---

# Phase 2 Plan 01: i18n Routing Infrastructure + Design Token System Summary

**next-intl bilingual routing with static export generating /en/ and /vi/ trees, full Tailwind v4 dark lab aesthetic design token system with emerald grid background, and restored custom fonts**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-13T20:36:45Z
- **Completed:** 2026-03-13T20:42:12Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Complete next-intl i18n infrastructure with static export support (routing, request config, navigation utilities)
- Full design token system in globals.css with primitive and semantic layers, registered as Tailwind utilities via @theme inline
- Dark lab aesthetic grid background (40px emerald green cells at 12% opacity on #030712 base)
- Bilingual route structure generating out/en/index.html and out/vi/index.html with correct hreflang metadata
- Custom fonts restored and declared (MarlinGeoSQ, Saprona, Geist Mono) with proper font variable CSS integration
- Root locale redirect with browser language detection and localStorage persistence
- Themed 404 page with dark lab styling and bilingual navigation links

## Task Commits

Each task was committed atomically:

1. **Task 1: Install next-intl, restore fonts, create i18n configs + font declarations + design tokens + next.config** - `4706400` (feat)
2. **Task 2: Create route structure, locale redirect, 404 page, translation files, and hreflang metadata** - `54fcab6` (feat)

## Files Created/Modified
- `src/i18n/routing.ts` - Locale routing config (en, vi) with defineRouting
- `src/i18n/request.ts` - Request config for loading locale messages
- `src/i18n/navigation.ts` - Navigation utilities (Link, redirect, usePathname, useRouter, getPathname)
- `src/lib/fonts.ts` - Font declarations for MarlinGeoSQ, Saprona, Geist Mono
- `src/app/globals.css` - Full design token system with grid background
- `src/app/layout.tsx` - Bare passthrough root layout
- `src/app/page.tsx` - Client-side locale detection and redirect
- `src/app/not-found.tsx` - Themed 404 with bilingual links
- `src/app/[lang]/layout.tsx` - Locale layout with NextIntlClientProvider, fonts, hreflang
- `src/app/[lang]/page.tsx` - Placeholder home page using design tokens
- `src/messages/en.json` - English translations (6 namespaces)
- `src/messages/vi.json` - Vietnamese translations with proper diacritics
- `next.config.ts` - next-intl plugin with static export config
- `package.json` - Added next-intl dependency

## Decisions Made
- Saprona assigned as display/heading font, MarlinGeoSQ as body font (Saprona is more distinctive for headlines, MarlinGeoSQ geometric sans for readability)
- Root layout is a bare passthrough returning children only; locale layout owns the html and body tags (documented next-intl static export pattern)
- Root page uses window.location.replace() for redirect (outside [lang] context)
- 404 page uses inline styles to maintain lab aesthetic without relying on Tailwind token utilities (outside locale layout chain)
- Grid cell size: 40px with 12% opacity emerald green lines on #030712 base

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - build succeeded on first attempt, all verification checks passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- i18n routing infrastructure complete and verified -- ready for 02-02 (Header + language switcher + mobile menu)
- Design token system fully operational -- all future components can use bg-surface-*, text-text-*, border-border, font-display/body/mono
- Translation files structured with namespaces ready for expansion
- Static export verified working with both locale trees

## Self-Check: PASSED

All 13 created/modified files verified present on disk. Both task commits (4706400, 54fcab6) verified in git log.

---
*Phase: 02-i18n-foundation-lab-aesthetic*
*Completed: 2026-03-14*
