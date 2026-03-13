---
phase: 02-i18n-foundation-lab-aesthetic
verified: 2026-03-14T00:00:00Z
status: human_needed
score: 5/5 must-haves verified
re_verification: false
human_verification:
  - test: "Language switcher toggles UI text"
    expected: "Clicking VI in the header changes all visible text to Vietnamese (nav links, headings, tagline). Clicking EN reverts to English."
    why_human: "Translation switching requires a live browser session — static HTML confirms both locales render correctly, but the interactive toggle cannot be verified from file content alone."
  - test: "Language preference is remembered on return visit"
    expected: "After clicking VI and refreshing the page, the browser stays on /vi/ without redirecting to /en/. Closing and reopening the tab should also land on /vi/."
    why_human: "localStorage persistence requires executing JavaScript in a real browser. The code path exists (switchLocale writes to localStorage; root page.tsx reads it), but correctness of the round-trip needs human confirmation."
  - test: "Browser language detection on first visit"
    expected: "On a fresh browser profile (no localStorage entry for 'preferred-locale'), visiting / redirects to /vi/ if the browser language is Vietnamese, and /en/ otherwise."
    why_human: "Requires clearing localStorage and verifying navigator.language branch in a browser."
  - test: "Header scroll blur activates"
    expected: "Scrolling more than 20px down the page causes the header background to change from transparent to a dark blurred tint (bg-surface-base/80 + backdrop-blur-md + bottom border)."
    why_human: "Scroll event behavior requires a live browser session."
  - test: "Mobile hamburger menu opens and closes"
    expected: "On a viewport narrower than 768px, the hamburger icon is visible. Tapping it opens a slide-down menu with nav links and the EN/VI switcher. Tapping again (or clicking a link) closes it."
    why_human: "Framer Motion AnimatePresence animations and responsive breakpoint behavior require a live browser session."
  - test: "Dark grid background and lab aesthetic visible"
    expected: "All pages display a near-black (#030712) background with faint emerald green grid lines (~12% opacity, 40px cells). Custom fonts (Saprona for headings, MarlinGeoSQ for body) render correctly."
    why_human: "Visual rendering — grid lines, font rendering, and color accuracy — require human inspection."
---

# Phase 2: i18n Foundation + Lab Aesthetic — Verification Report

**Phase Goal:** The app is restructured to bilingual routing and has the visual identity system that all future sections inherit
**Verified:** 2026-03-14
**Status:** human_needed — all automated checks pass; 6 items require human browser verification
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|---------|
| 1  | Visiting `/en/` and `/vi/` both serve the portfolio — no 404s | VERIFIED | Build produces `out/en/index.html` and `out/vi/index.html`; both contain full rendered HTML with Header, hero content, and design tokens applied |
| 2  | The language switcher in the header toggles between English and Vietnamese and the UI text updates | VERIFIED (code) / NEEDS HUMAN (runtime) | `LanguageSwitcher.tsx` calls `router.replace(pathname, {locale: newLocale})`; both locale trees render different text (`"Hi, I'm Quan"` vs `"Xin chào, mình là Quân"`); interactive toggle needs browser |
| 3  | Language preference is detected from browser settings on first visit and remembered on return | VERIFIED (code) / NEEDS HUMAN (runtime) | `src/app/page.tsx` reads `localStorage` first then `navigator.language`; `LanguageSwitcher.tsx` writes `localStorage.setItem('preferred-locale', ...)` on every switch |
| 4  | The static export build generates `/en/` and `/vi/` route trees — both work after gh-pages deploy | VERIFIED | `npm run build` exits cleanly; `out/en/index.html`, `out/vi/index.html`, `out/404.html` confirmed present |
| 5  | All pages display the dark grid/caro lab aesthetic background with the CSS variable token system | VERIFIED (tokens) / NEEDS HUMAN (visual) | `globals.css` contains complete `@theme inline` block with all semantic tokens; `body` has `background-image: linear-gradient(...)` 40px emerald grid; visual rendering requires browser |

**Score:** 5/5 truths have verified code backing — 6 runtime behaviors flagged for human confirmation

---

## Required Artifacts

### Plan 01 Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/i18n/routing.ts` | Locale routing configuration | VERIFIED | Exports `routing` via `defineRouting({locales: ['en','vi'], defaultLocale: 'en'})` |
| `src/i18n/request.ts` | Request config for message loading | VERIFIED | Uses `getRequestConfig`, loads `@/messages/${locale}.json` dynamically |
| `src/i18n/navigation.ts` | Navigation utilities (Link, redirect, usePathname, useRouter, getPathname) | VERIFIED | All 5 exports present via `createNavigation(routing)` |
| `src/lib/fonts.ts` | Font declarations for MarlinGeoSQ, Saprona, Geist Mono | VERIFIED | All 3 exports (`marlinGeo`, `saprona`, `geistMono`) with correct variables (`--font-marlin`, `--font-saprona`, `--font-geist-mono`) |
| `src/app/globals.css` | Full design token system + grid background | VERIFIED | Contains `@theme inline` with surfaces, text, accent, borders, spacing, fonts, typography, radius tokens; grid `background-image` on `body`; no `prefers-color-scheme` media query |
| `src/app/[lang]/layout.tsx` | Locale-aware layout with NextIntlClientProvider | VERIFIED | Exports `generateStaticParams` and `generateMetadata`; wraps children in `NextIntlClientProvider`; applies font variables; sets `html lang={lang}` |
| `src/app/[lang]/page.tsx` | Home page with translated content | VERIFIED | `'use client'`, uses `useTranslations('Hero')` and `useTranslations('Home')`, all text via `t()` calls, uses design token classes (`font-display`, `text-text-primary`, `bg-surface-elevated`, `border-border`, `min-h-dvh`) |
| `src/app/page.tsx` | Root locale redirect | VERIFIED | `'use client'`, reads `localStorage`, falls back to `navigator.language`, calls `window.location.replace()` |
| `src/app/not-found.tsx` | Custom themed 404 page | VERIFIED | Dark background (#030712), emerald grid pattern inline, green 404 heading, links to `/en/` and `/vi/` |
| `src/messages/en.json` | English translation messages | VERIFIED | 7 namespaces: Metadata, Header, Hero, Home, LanguageSwitcher, NotFound, Footer |
| `src/messages/vi.json` | Vietnamese translation messages | VERIFIED | 7 namespaces mirroring English with proper Vietnamese diacritics |
| `next.config.ts` | next-intl plugin + static export config | VERIFIED | `createNextIntlPlugin('./src/i18n/request.ts')`, `output: 'export'`, `trailingSlash: true`, `images: {unoptimized: true}` |
| Font .woff files | 5 custom font files restored | VERIFIED | `MarlinGeoSQ-Regular.woff`, `MarlinGeoSQ-Medium.woff`, `Saprona-Light.woff`, `Saprona-Regular.woff`, `Saprona-Medium.woff` all present in `src/app/fonts/` |

### Plan 02 Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/Header.tsx` | Fixed header with scroll blur, brand mark, nav, language switcher | VERIFIED | 97 lines; `'use client'`; passive scroll listener at 20px threshold; `FlaskConical` brand mark; `Link` from `@/i18n/navigation`; desktop nav + `LanguageSwitcher`; mobile hamburger with `aria-label`; delegates to `MobileMenu` |
| `src/components/LanguageSwitcher.tsx` | EN/VI toggle with localStorage + next-intl router | VERIFIED | 41 lines; `useLocale()`, `useRouter()`, `usePathname()` from correct sources; `localStorage.setItem('preferred-locale', newLocale)`; `router.replace(pathname, {locale: newLocale})` |
| `src/components/MobileMenu.tsx` | Hamburger-triggered mobile navigation menu | VERIFIED | 63 lines; `AnimatePresence` + `motion.div`; opacity + y transform only (compositor-safe); 200ms ease-out; `bg-surface-elevated border-b border-border`; nav links call `onClose()`; `LanguageSwitcher` at bottom |

---

## Key Link Verification

### Plan 01 Key Links

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `next.config.ts` | `src/i18n/request.ts` | `createNextIntlPlugin('./src/i18n/request.ts')` | WIRED | Confirmed in file: exact string present |
| `src/i18n/request.ts` | `src/messages/*.json` | dynamic import of locale messages | WIRED | `(await import(\`@/messages/${locale}.json\`)).default` — loads dynamically by locale |
| `src/app/[lang]/layout.tsx` | `src/i18n/routing.ts` | `generateStaticParams` uses `routing.locales` | WIRED | `routing.locales.map((locale) => ({lang: locale}))` confirmed |
| `src/app/[lang]/layout.tsx` | `src/lib/fonts.ts` | font CSS variable classes on body | WIRED | `${marlinGeo.variable} ${saprona.variable} ${geistMono.variable}` on `<body>` className |
| `src/app/globals.css` | body styles | CSS grid background via token colors | WIRED | `background-image: linear-gradient(to right, rgba(16, 185, 129, 0.12) 1px, transparent 1px), linear-gradient(to bottom, ...)` with `background-size: 40px 40px` |
| `src/app/page.tsx` | `/en/` or `/vi/` | client-side redirect with localStorage check | WIRED | `localStorage.getItem('preferred-locale')` check before `window.location.replace()` confirmed |

### Plan 02 Key Links

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/components/LanguageSwitcher.tsx` | localStorage | `localStorage.setItem('preferred-locale', newLocale)` | WIRED | Exact call confirmed on line 12 |
| `src/components/LanguageSwitcher.tsx` | next-intl router | `router.replace(pathname, {locale: newLocale})` | WIRED | Confirmed on line 13; `useRouter` imported from `@/i18n/navigation` |
| `src/components/Header.tsx` | scroll state | `window.addEventListener('scroll', ...)` | WIRED | Passive scroll listener in `useEffect`; threshold at 20px; drives `scrolled` state which controls className |
| `src/components/Header.tsx` | `src/messages/*.json` | `useTranslations('Header')` | WIRED | `t('brand')`, `t('home')`, `t('about')`, `t('projects')`, `t('blog')` all present in JSX |
| `src/app/[lang]/page.tsx` | `src/messages/*.json` | `useTranslations('Home')` and `useTranslations('Hero')` | WIRED | Both hooks present; all JSX text via `t()` calls — no hardcoded strings |
| `src/app/[lang]/layout.tsx` | `src/components/Header.tsx` | import + render in layout | WIRED | `import {Header} from '@/components/Header'`; `<Header />` rendered before `<main>` inside `NextIntlClientProvider` |

---

## hreflang Verification (FNDN-03)

Confirmed in both built files:

- `out/en/index.html` contains: `<link rel="alternate" hrefLang="en" href="/en/"/>` and `<link rel="alternate" hrefLang="vi" href="/vi/"/>`
- `out/vi/index.html` contains: `<link rel="alternate" hrefLang="en" href="/en/"/>` and `<link rel="alternate" hrefLang="vi" href="/vi/"/>`

Both hreflang tags point to routes that exist in the static export. FNDN-03 is satisfied.

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|---------|
| FNDN-03 | 02-01 | Fix hreflang meta tags that declare routes returning 404 | SATISFIED | Both `/en/` and `/vi/` exist as static export files; hreflang links in both locale pages confirmed in generated HTML |
| FNDN-05 | 02-01 | Establish lab aesthetic with grid/caro pattern background (dark theme CSS variable system) | SATISFIED | `globals.css` has complete `@theme inline` token system + body grid background; no `prefers-color-scheme` dark-only |
| I18N-01 | 02-01 | App routes restructured to `app/[lang]/` pattern with next-intl | SATISFIED | `src/app/[lang]/layout.tsx` and `src/app/[lang]/page.tsx` exist; `generateStaticParams` generates both locales |
| I18N-02 | 02-02 | User can switch between Vietnamese and English via language switcher | SATISFIED (code) | `LanguageSwitcher.tsx` uses `router.replace` with locale option; both locale HTMLs contain different translated content; runtime toggle needs human confirmation |
| I18N-03 | 02-02 | All UI text is externalized to translation files (not hardcoded) | SATISFIED | All component JSX text is via `useTranslations` calls; no hardcoded English or Vietnamese strings found in component JSX; confirmed in Header, MobileMenu, and page.tsx |
| I18N-04 | 02-01, 02-02 | Language preference is detected and persisted client-side | SATISFIED (code) | `src/app/page.tsx` detects via `navigator.language` and writes `localStorage`; `LanguageSwitcher.tsx` updates `localStorage` on every switch |
| I18N-05 | 02-01 | Static export generates both `/en/` and `/vi/` route trees via generateStaticParams | SATISFIED | Build confirmed; `out/en/index.html` and `out/vi/index.html` exist |
| UX-01 | 02-01 | Consistent dark-only theme across all pages with lab aesthetic grid/caro background | SATISFIED (code) | `globals.css` dark-only (no light mode media query), emerald grid on `body`, all surface tokens reference `--gray-950` base; visual confirmation needs human |

**No orphaned requirements** — all 8 IDs assigned to Phase 2 in REQUIREMENTS.md are claimed by plans 02-01 and 02-02 and verified above.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/app/[lang]/page.tsx` | 11 | `{/* Hero section (placeholder -- real hero comes in Phase 5) */}` | Info | Expected and intentional — this is a documented placeholder for Phase 5; the page renders real content and demonstrates the design system; not a stub |

No blocker or warning anti-patterns found.

- No `h-screen` usage (all use `min-h-dvh` or `h-16`)
- No empty handlers (`=> {}` or `return null`)
- No hardcoded UI strings in component JSX
- No `prefers-color-scheme` media query in CSS

---

## Human Verification Required

### 1. Language Switcher Toggle

**Test:** Run `npm run dev`, visit `http://localhost:3000/en/`. Click "VI" in the header.
**Expected:** URL changes to `/vi/`. All visible text updates to Vietnamese (nav links show "Trang Chu", "Gioi Thieu", "Du An", "Blog"; hero shows "Xin chao, minh la Quan"; button shows "Kham Pha Du An"). Click "EN" — text reverts to English.
**Why human:** Interactive locale switching requires JavaScript execution in a real browser.

### 2. Language Preference Remembered on Return

**Test:** After clicking VI (URL is `/vi/`), refresh the page or close and reopen the tab.
**Expected:** Browser lands on `/vi/` without any redirect loop or flash of `/en/`. The EN button should be inactive and VI button should be highlighted green.
**Why human:** localStorage round-trip requires a browser session.

### 3. Browser Language Detection on First Visit

**Test:** Open DevTools, run `localStorage.removeItem('preferred-locale')` in the console, then navigate to `http://localhost:3000/`. Also test with browser language set to Vietnamese.
**Expected:** Redirects to `/en/` for English-language browsers, `/vi/` for Vietnamese-language browsers.
**Why human:** `navigator.language` detection and `window.location.replace` behavior must be observed in a real browser.

### 4. Header Scroll Blur

**Test:** At `/en/` or `/vi/`, scroll down more than 20px.
**Expected:** The header transitions from fully transparent to a dark semi-transparent background with backdrop blur and a visible bottom border.
**Why human:** Scroll event and CSS transition require live rendering.

### 5. Mobile Hamburger Menu

**Test:** Narrow the browser to under 768px wide. The desktop nav should disappear. Tap the hamburger icon (three horizontal lines, top-right).
**Expected:** A slide-down panel appears with the four nav links and the EN | VI switcher. Tap a link or tap the X icon to close. Verify the slide animation is smooth (opacity + y transform, ~200ms).
**Why human:** Responsive breakpoints and Framer Motion animations require a live browser.

### 6. Dark Grid Lab Aesthetic

**Test:** Visit `/en/` and `/vi/`, inspect visually.
**Expected:** Near-black background (#030712) with a subtle emerald-green grid pattern (40px cells, ~12% opacity lines). Headings use a distinctive display font (Saprona). Body text uses a different geometric sans (MarlinGeoSQ). Interactive elements (nav links, buttons) glow green on hover.
**Why human:** Font rendering and visual design quality require human judgment.

---

## Summary

Phase 2 goal is **structurally complete**. All 14 artifacts exist with substantive implementations. All 11 key links are wired. All 8 requirements are satisfied by code evidence. The static export build passes cleanly, generating `/en/`, `/vi/`, and `404.html` with correct hreflang alternates and full Vietnamese/English content.

The only outstanding items are 6 runtime behaviors — language switching, localStorage persistence, browser language detection, scroll blur, mobile menu animation, and visual aesthetic — which require human confirmation in a live browser. These are expected for an interactive UI phase; the code paths are correct and complete.

**Automated verdict: PASS.** Phase goal is achieved at the infrastructure and code level.

---

_Verified: 2026-03-14_
_Verifier: Claude (gsd-verifier)_
