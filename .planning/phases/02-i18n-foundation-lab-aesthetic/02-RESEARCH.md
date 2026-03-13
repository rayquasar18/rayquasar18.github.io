# Phase 2: i18n Foundation + Lab Aesthetic - Research

**Researched:** 2026-03-14
**Domain:** Internationalization (next-intl), CSS design tokens (Tailwind v4), static export routing
**Confidence:** HIGH

## Summary

This phase restructures the fresh Next.js 16 app into a bilingual `app/[lang]/` routing structure using next-intl and establishes the dark lab aesthetic visual identity system. The two domains are mostly independent: i18n is a structural concern (routing, message loading, locale detection) while the lab aesthetic is a visual concern (CSS tokens, grid background, typography, interactive styles). Both must work with `output: 'export'` for GitHub Pages deployment.

next-intl v4.8.3 (latest stable) fully supports Next.js 16, React 19, and static export via `generateStaticParams`. The key constraint is that middleware cannot be used with static export, so locale detection and redirect must happen client-side. The Tailwind v4 `@theme inline` block is the correct mechanism for registering CSS custom properties as first-class Tailwind utilities, replacing the old `tailwind.config.ts` approach entirely.

**Primary recommendation:** Use next-intl with the "with i18n routing" pattern adapted for static export (no middleware, client-side root redirect), and build the token system directly in `globals.css` using Tailwind v4's `@theme inline` directive.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Subtle fine grid pattern on dark background -- thin lines, graph-paper style
- Dark + green/emerald accent color palette (terminal/matrix aesthetic)
- Grid lines at moderate visibility (~12-18% opacity) -- clearly a grid without competing with content
- Full-page grid background -- every section inherits the same grid, unified look
- Auto-detect language from browser `navigator.language` on first visit
- Fallback to English if browser language is neither English nor Vietnamese
- Remember language choice in localStorage -- skip detection on return visits
- Everything bilingual: all UI text, all section content, project descriptions, blog posts
- Follow Next.js best practices for static export i18n (next-intl + `generateStaticParams`)
- `app/[lang]/` route structure with `generateStaticParams` returning `['en', 'vi']`
- Keep existing MarlinGeoSQ and Saprona fonts (restore from git history), test Vietnamese diacritics
- If fonts don't render Vietnamese correctly, add Be Vietnam Pro or Noto Sans as fallback
- Define full typography scale with CSS variables
- Keep Geist Mono for code/technical elements
- Minimal transparent header bar with blur/dark tint on scroll
- Brand mark: icon (custom SVG) + text -- use placeholder Lucide icon until custom SVG provided
- Language switcher: simple "EN | VI" text toggle in header
- Mobile: hamburger menu with slide-in or dropdown
- Free scroll with active section tracking (no scroll snapping)
- Section dividers: gradient/glow transitions with green accent glow
- Content max-width ~1200px centered, grid background full viewport width
- Generous vertical spacing between sections (~120-160px)
- Semantic CSS variable naming: `--color-surface`, `--color-text-primary`, `--color-accent`, etc.
- 3 surface levels: base, elevated, overlay
- 3 text color levels: primary, secondary, muted + accent
- Full token set: colors, spacing, border radius, typography
- Root `/` page: client-side locale redirect following next-intl static export pattern
- Custom themed 404 page with links to both `/en/` and `/vi/`
- Verify GitHub Pages deploy works with both route trees
- Hover effects: green accent glow on hover
- Buttons: outlined (ghost) style with green border, fill on hover
- Inline links: green text with subtle underline on hover
- Transition timing: quick and snappy, 150-200ms

### Claude's Discretion
- Font role assignment (MarlinGeoSQ vs Saprona for headings vs body)
- Exact green/emerald accent color values and surface color values
- Grid line spacing/size (cell dimensions)
- Exact spacing scale values and border radius tokens
- Typography scale exact values (px/rem sizes for h1-h6, body, small)
- Placeholder Lucide icon choice for header brand mark
- Root redirect implementation details (following next-intl best practices)
- 404 page copy and layout
- Hamburger menu animation style
- Active section detection threshold/algorithm

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FNDN-03 | Fix hreflang meta tags that declare routes returning 404 | next-intl `generateMetadata` + `alternates.languages` pattern produces correct hreflang for `/en/` and `/vi/` routes that actually exist |
| FNDN-05 | Establish lab aesthetic with grid/caro pattern background (dark theme CSS variable system) | Tailwind v4 `@theme inline` token system + CSS grid background pattern using `repeating-linear-gradient` or SVG |
| I18N-01 | App routes restructured to `app/[lang]/` pattern with next-intl | next-intl v4.8.3 `defineRouting` + `app/[lang]/layout.tsx` + `generateStaticParams` |
| I18N-02 | Language switcher toggles between Vietnamese and English | `useLocale` + `useRouter` from next-intl navigation, or simple `<Link>` to alternate locale path |
| I18N-03 | All UI text externalized to translation files (not hardcoded) | `messages/en.json` + `messages/vi.json` with nested namespace structure, `useTranslations` hook |
| I18N-04 | Language preference detected and persisted client-side | Client-side `navigator.language` check on root page + `localStorage` persistence, no middleware needed |
| I18N-05 | Static export generates both `/en/` and `/vi/` route trees | `generateStaticParams` returning `[{lang: 'en'}, {lang: 'vi'}]` + `output: 'export'` in next.config.ts |
| UX-01 | Consistent dark-only theme across all pages with lab aesthetic grid/caro background | CSS custom properties on `:root` with no light mode toggle, grid background on `body` |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | 4.8.3 | i18n routing, message loading, formatting | The standard Next.js i18n library; supports App Router, Server Components, static export, React 19, Next.js 16 |
| next/font/local | (built-in) | Load MarlinGeoSQ and Saprona woff files | Next.js built-in font optimization with automatic font-display and preloading |
| next/font/google | (built-in) | Load Geist Mono and optional Be Vietnam Pro | Already used for Geist; extends for Vietnamese fallback if needed |
| tailwindcss | ^4 | Utility CSS with `@theme inline` token system | Already installed; v4 natively supports CSS custom property registration |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.577.0 | Placeholder header icon, hamburger menu icon | Already installed; use for brand placeholder and mobile menu toggle |
| framer-motion | ^12.36.0 | Header scroll animation, mobile menu transitions | Already installed; for header backdrop blur on scroll and menu open/close |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-intl | react-intl + manual routing | next-intl has native Next.js App Router support, built-in static export pattern; react-intl requires manual plumbing |
| next-intl | i18next + react-i18next | i18next is more generic, lacks Next.js-specific optimizations like Server Component support and routing integration |
| CSS grid pattern | SVG pattern background | CSS `repeating-linear-gradient` is simpler, more performant, and easier to token-ize; SVG is better if the pattern needs to be complex |
| Tailwind v4 @theme | Separate CSS variables file | `@theme inline` registers variables directly as Tailwind utilities; a separate file would require manual bridging |

**Installation:**
```bash
npm install next-intl
```

No other new dependencies required -- all others (lucide-react, framer-motion, tailwindcss) are already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/
  i18n/
    routing.ts           # defineRouting config (locales, defaultLocale)
    request.ts           # getRequestConfig for message loading
    navigation.ts        # createNavigation exports (Link, redirect, etc.)
  messages/
    en.json              # English translations (namespaced)
    vi.json              # Vietnamese translations (namespaced)
  app/
    [lang]/
      layout.tsx         # Root layout with NextIntlClientProvider, fonts, html lang
      page.tsx           # Home page (placeholder for now)
      not-found.tsx      # Locale-specific not found (optional)
    layout.tsx           # Minimal root layout (just html shell, no lang attr)
    page.tsx             # Root redirect: detects locale, redirects to /en/ or /vi/
    not-found.tsx        # Custom 404 page (lab aesthetic themed)
    globals.css          # Design tokens + grid background + base styles
    fonts/               # Restored woff files (MarlinGeoSQ, Saprona)
  components/
    Header.tsx           # Transparent header with brand, nav, lang switcher
    LanguageSwitcher.tsx  # EN | VI toggle component
    MobileMenu.tsx       # Hamburger slide-in/dropdown menu
  lib/
    fonts.ts             # Font declarations (localFont + google fonts)
    constants.ts         # Shared constants (locales array, etc.)
```

### Pattern 1: next-intl Static Export Setup (No Middleware)

**What:** Configure next-intl for static export where middleware is not available. All locale routing is file-system based via `[lang]` dynamic segment with `generateStaticParams`.

**When to use:** Any Next.js project using `output: 'export'` that needs i18n routing.

**Key files:**

1. **`src/i18n/routing.ts`** -- Define supported locales and default:
```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en'
});
```

2. **`src/i18n/request.ts`** -- Load messages per request:
```typescript
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
```

3. **`src/i18n/navigation.ts`** -- Create navigation utilities:
```typescript
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

4. **`next.config.ts`** -- Wire up the plugin:
```typescript
import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
```

5. **`src/app/[lang]/layout.tsx`** -- Per-locale layout:
```typescript
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({lang: locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

**Confidence:** HIGH -- next-intl v4.8.3 confirmed to support Next.js 16 + React 19 via peer dependencies. The `defineRouting` / `createNavigation` / `getRequestConfig` API is the documented v4 pattern. The `generateStaticParams` approach for static export is the documented pattern.

**Important note on `params`:** In Next.js 15+, `params` is a Promise and must be awaited. This is a breaking change from Next.js 14. The `await params` pattern shown above is correct for Next.js 16.

### Pattern 2: Root Locale Redirect (Client-Side)

**What:** The root `/` page detects the user's browser language and redirects to `/en/` or `/vi/`. Since static export has no middleware, this must be client-side.

**When to use:** Root page of a statically exported i18n site.

**Approach:**
```typescript
// src/app/page.tsx (root, outside [lang])
'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const SUPPORTED_LOCALES = ['en', 'vi'];
const DEFAULT_LOCALE = 'en';
const STORAGE_KEY = 'preferred-locale';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Check localStorage for returning visitors
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      router.replace(`/${stored}/`);
      return;
    }

    // 2. Detect from browser language
    const browserLang = navigator.language.split('-')[0];
    const detected = SUPPORTED_LOCALES.includes(browserLang)
      ? browserLang
      : DEFAULT_LOCALE;

    // 3. Persist and redirect
    localStorage.setItem(STORAGE_KEY, detected);
    router.replace(`/${detected}/`);
  }, [router]);

  // Minimal loading state while redirect happens
  return null;
}
```

**Confidence:** HIGH -- this is a well-established pattern for static export i18n. No middleware alternative exists for `output: 'export'`.

### Pattern 3: Tailwind v4 Design Token System

**What:** Use Tailwind v4's `@theme inline` to register CSS custom properties as first-class utilities.

**When to use:** Any Tailwind v4 project that needs a design token system.

**Key insight:** In Tailwind v4, there is no `tailwind.config.ts` for theme extension. Instead, CSS custom properties registered in `@theme inline` blocks become directly usable as Tailwind utilities. For example, `--color-accent: #10b981` becomes usable as `text-accent`, `bg-accent`, `border-accent`, etc.

```css
@import "tailwindcss";

/* === PRIMITIVE TOKENS === */
:root {
  /* Green/Emerald palette */
  --green-50: #ecfdf5;
  --green-100: #d1fae5;
  --green-200: #a7f3d0;
  --green-300: #6ee7b7;
  --green-400: #34d399;
  --green-500: #10b981;
  --green-600: #059669;
  --green-700: #047857;
  --green-800: #065f46;
  --green-900: #064e3b;

  /* Surface scale */
  --gray-950: #030712;
  --gray-900: #0a0f1a;
  --gray-800: #111827;
  --gray-700: #1f2937;
  --gray-600: #374151;
}

/* === SEMANTIC TOKENS (registered with Tailwind) === */
@theme inline {
  /* Surfaces */
  --color-surface-base: var(--gray-950);
  --color-surface-elevated: var(--gray-900);
  --color-surface-overlay: var(--gray-800);

  /* Text */
  --color-text-primary: #f0fdf4;
  --color-text-secondary: #a3a3a3;
  --color-text-muted: #6b7280;
  --color-text-accent: var(--green-400);

  /* Accent */
  --color-accent: var(--green-500);
  --color-accent-hover: var(--green-400);
  --color-accent-muted: var(--green-900);

  /* Borders */
  --color-border: rgba(16, 185, 129, 0.15);
  --color-border-hover: rgba(16, 185, 129, 0.3);

  /* Spacing scale */
  --spacing-section: 8rem;
  --spacing-section-sm: 5rem;

  /* Typography */
  --font-display: var(--font-marlin);
  --font-body: var(--font-saprona);
  --font-mono: var(--font-geist-mono);
}
```

Usage in components:
```tsx
<div className="bg-surface-base text-text-primary border-border">
  <h1 className="text-text-accent font-display">Title</h1>
  <p className="text-text-secondary font-body">Body text</p>
</div>
```

**Confidence:** HIGH -- Tailwind v4 `@theme inline` is already partially set up in the project's `globals.css`. This extends the existing pattern.

### Pattern 4: CSS Grid Background

**What:** Full-viewport graph-paper grid using CSS only.

**Approach using `repeating-linear-gradient`:**
```css
body {
  background-color: var(--color-surface-base);
  background-image:
    linear-gradient(
      to right,
      rgba(16, 185, 129, 0.12) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(16, 185, 129, 0.12) 1px,
      transparent 1px
    );
  background-size: 40px 40px;
}
```

**Alternative using SVG (for more control):**
```css
body {
  background-color: var(--color-surface-base);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M40 0H0v40' fill='none' stroke='%2310b98120' stroke-width='0.5'/%3E%3C/svg%3E");
}
```

The CSS gradient approach is recommended because:
- Simpler to customize via CSS variables
- No external file dependency
- Better performance (no image decode)
- Easy to adjust opacity/color/size via tokens

**Confidence:** HIGH -- standard CSS technique, well-supported across all browsers.

### Pattern 5: Header with Scroll Effect

**What:** Transparent header that gains backdrop blur and dark tint when user scrolls.

```typescript
'use client';

import {useState, useEffect} from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-surface-base/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      {/* Brand + Nav + Language Switcher */}
    </header>
  );
}
```

**Note from baseline-ui skill:** Avoid animating `backdrop-filter` on large surfaces. The `backdrop-blur-md` on header is acceptable because the header is a narrow fixed strip, not a full-screen surface.

**Confidence:** HIGH -- standard pattern.

### Anti-Patterns to Avoid

- **Middleware for static export:** Next.js middleware is incompatible with `output: 'export'`. All locale detection must be client-side.
- **Hardcoded color values in components:** All colors must reference CSS variables or Tailwind token utilities. Never use raw hex in JSX.
- **`h-screen` for full-height elements:** Per baseline-ui skill, use `h-dvh` instead (handles mobile viewport correctly).
- **`prefers-color-scheme` media query:** This project is dark-only. Remove the existing `@media (prefers-color-scheme: dark)` block from globals.css. All dark values go directly on `:root`.
- **Missing `"use client"` on components using hooks:** Components using `useTranslations`, `useState`, `useEffect` must have `"use client"` directive.
- **Locale param as string instead of Promise:** In Next.js 16, `params` is always `Promise<{lang: string}>` and must be awaited.
- **Nesting NextIntlClientProvider:** Only wrap once in `[lang]/layout.tsx`. Child pages and components consume via hooks.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| i18n message formatting | Custom template string interpolation | next-intl `useTranslations` with ICU syntax | Handles plurals, dates, numbers, nested messages correctly |
| Locale routing | Manual `[lang]` param parsing + redirect logic | next-intl `defineRouting` + `createNavigation` | Handles locale validation, default locale, path rewriting |
| Font loading/optimization | Manual `@font-face` declarations | `next/font/local` and `next/font/google` | Automatic font-display, preloading, size-adjust, no layout shift |
| CSS utility generation from tokens | Manual utility classes for each token | Tailwind v4 `@theme inline` | Automatic utility generation (`bg-*`, `text-*`, `border-*`) from registered variables |
| Scroll position detection | Manual IntersectionObserver + state management for section tracking | Still needs manual IntersectionObserver, but keep it minimal | This is one area where a small custom hook is appropriate |

**Key insight:** next-intl handles the hard parts of i18n (message interpolation, plural rules, date/number formatting, locale negotiation). Tailwind v4 handles the hard parts of design tokens (utility generation, responsive variants, state variants). Focus implementation effort on the visual design and UX details, not infrastructure.

## Common Pitfalls

### Pitfall 1: Static Export + next-intl Plugin Configuration
**What goes wrong:** Build fails because next-intl plugin expects a request config file path that doesn't match.
**Why it happens:** The `createNextIntlPlugin` function needs the exact path to the `request.ts` file. Default is `./src/i18n/request.ts` but it must match the actual file location.
**How to avoid:** Pass explicit path: `createNextIntlPlugin('./src/i18n/request.ts')`. Verify the file exists before building.
**Warning signs:** Build error about missing module or configuration.

### Pitfall 2: Root Page Not Generating index.html
**What goes wrong:** The root `/` page at `src/app/page.tsx` (outside `[lang]`) doesn't generate properly because it's a client component with `useEffect` redirect.
**Why it happens:** Static export needs to generate HTML. A pure client component with no server-rendered content will generate an empty HTML shell.
**How to avoid:** This is actually acceptable -- the root page only needs a minimal HTML shell that loads JS which does the redirect. Ensure the page has a minimal loading state or hidden content. A `<meta http-equiv="refresh">` fallback in `<head>` can serve as a no-JS fallback.
**Warning signs:** Visiting `/` shows a brief flash of empty page before redirect.

### Pitfall 3: `generateStaticParams` Missing from Sub-Pages
**What goes wrong:** Adding new pages under `[lang]/` without `generateStaticParams` causes build failures in static export mode.
**Why it happens:** Static export requires ALL dynamic routes to have `generateStaticParams`. Every page and layout in the `[lang]` tree needs it.
**How to avoid:** Add `generateStaticParams` to every page.tsx under `[lang]/` or ensure the layout-level `generateStaticParams` covers all routes.
**Warning signs:** Build error: "Page ... is missing generateStaticParams".

### Pitfall 4: Vietnamese Diacritics Not Rendering
**What goes wrong:** MarlinGeoSQ and Saprona are display/geometric fonts that may not include full Vietnamese character support (diacritics like a, e, o, u, etc.).
**Why it happens:** Many Western display fonts don't include the full Latin Extended Additional range needed for Vietnamese.
**How to avoid:** Test early. Render a test page with Vietnamese text and check for tofu (missing glyph boxes). If needed, add `Be_Vietnam_Pro` from Google Fonts as a fallback in the font stack.
**Warning signs:** Missing characters, squares, or wrong glyphs in Vietnamese text.

### Pitfall 5: Font Files Not Restored
**What goes wrong:** The CONTEXT.md references `src/app/fonts/` with MarlinGeoSQ and Saprona woff files, but these were deleted in the Phase 1 reset.
**Why it happens:** `git reset` deleted all old files.
**How to avoid:** Restore font files from git history: `git checkout HEAD~1 -- src/app/fonts/MarlinGeoSQ-Medium.woff src/app/fonts/MarlinGeoSQ-Regular.woff src/app/fonts/Saprona-Light.woff src/app/fonts/Saprona-Medium.woff src/app/fonts/Saprona-Regular.woff`
**Warning signs:** Build error about missing font files.

### Pitfall 6: GitHub Pages 404 Handling
**What goes wrong:** Custom 404 page doesn't work on GitHub Pages, or navigating directly to `/en/about/` returns GitHub's default 404.
**Why it happens:** GitHub Pages looks for a `404.html` at the root of the site. Next.js static export generates `404.html` from `src/app/not-found.tsx`.
**How to avoid:** Ensure `src/app/not-found.tsx` exists and generates a themed 404 page. The `404.html` in the `out/` directory is automatically served by GitHub Pages for any URL that doesn't match a static file.
**Warning signs:** Seeing GitHub's default 404 instead of the custom page.

### Pitfall 7: `actions/configure-pages` Injecting basePath
**What goes wrong:** The GitHub Actions workflow uses `actions/configure-pages@v5` with `static_site_generator: next`, which can auto-inject a `basePath` into next.config.
**Why it happens:** The action tries to be helpful by setting basePath for project sites (username.github.io/repo-name), but this is a user site (username.github.io) with no basePath needed.
**How to avoid:** For a username.github.io site, the basePath should be empty. Verify the CI workflow doesn't break the build by injecting an incorrect basePath. The `NEXT_PUBLIC_BASE_PATH:` env var in the workflow is already empty, which is correct.
**Warning signs:** Assets loading from wrong paths after deploy.

### Pitfall 8: Tailwind v4 @theme vs :root Scope
**What goes wrong:** Defining CSS variables in `:root` but not in `@theme inline` means they exist as CSS variables but are NOT available as Tailwind utilities.
**Why it happens:** Tailwind v4 only generates utilities for variables registered in `@theme inline`. Raw `:root` variables are invisible to Tailwind.
**How to avoid:** Put all tokens that need Tailwind utility classes in `@theme inline`. Use `:root` only for primitive values that feed into the theme tokens via `var()` references.
**Warning signs:** `bg-surface-base` doesn't work even though `--color-surface-base` is defined.

## Code Examples

### Message File Structure
```json
// src/messages/en.json
{
  "Header": {
    "brand": "RayQuasar",
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "blog": "Blog"
  },
  "Hero": {
    "greeting": "Hi, I'm Quan",
    "role": "AI Engineer",
    "tagline": "Make Wall-E can love again"
  },
  "LanguageSwitcher": {
    "en": "EN",
    "vi": "VI"
  },
  "NotFound": {
    "title": "404 - Page Not Found",
    "description": "The page you're looking for doesn't exist.",
    "homeLink": "Go Home"
  }
}
```

```json
// src/messages/vi.json
{
  "Header": {
    "brand": "RayQuasar",
    "home": "Trang Chu",
    "about": "Gioi Thieu",
    "projects": "Du An",
    "blog": "Blog"
  },
  "Hero": {
    "greeting": "Xin chao, minh la Quan",
    "role": "Ky su AI",
    "tagline": "Lam cho Wall-E biet yeu lai"
  },
  "LanguageSwitcher": {
    "en": "EN",
    "vi": "VI"
  },
  "NotFound": {
    "title": "404 - Khong Tim Thay Trang",
    "description": "Trang ban dang tim khong ton tai.",
    "homeLink": "Ve Trang Chu"
  }
}
```

Note: Vietnamese text above uses simplified ASCII. Actual translations must include proper diacritics (e.g., "Trang Chu" -> "Trang Chu" with proper marks). This is a placeholder structure.

### Font Declaration with next/font/local
```typescript
// src/lib/fonts.ts
import localFont from 'next/font/local';
import {Geist_Mono} from 'next/font/google';

export const marlinGeo = localFont({
  src: [
    {path: '../app/fonts/MarlinGeoSQ-Regular.woff', weight: '400', style: 'normal'},
    {path: '../app/fonts/MarlinGeoSQ-Medium.woff', weight: '500', style: 'normal'},
  ],
  variable: '--font-marlin',
  display: 'swap',
});

export const saprona = localFont({
  src: [
    {path: '../app/fonts/Saprona-Light.woff', weight: '300', style: 'normal'},
    {path: '../app/fonts/Saprona-Regular.woff', weight: '400', style: 'normal'},
    {path: '../app/fonts/Saprona-Medium.woff', weight: '500', style: 'normal'},
  ],
  variable: '--font-saprona',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
```

### Language Switcher Component
```typescript
'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    localStorage.setItem('preferred-locale', newLocale);
    router.replace(pathname, {locale: newLocale});
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale('en')}
        className={`px-1 transition-colors duration-150 ${
          locale === 'en'
            ? 'text-text-accent'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        EN
      </button>
      <span className="text-text-muted">|</span>
      <button
        onClick={() => switchLocale('vi')}
        className={`px-1 transition-colors duration-150 ${
          locale === 'vi'
            ? 'text-text-accent'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        VI
      </button>
    </div>
  );
}
```

### hreflang Meta Tags via generateMetadata
```typescript
// src/app/[lang]/layout.tsx (add to existing layout)
import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string}>;
}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        en: '/en/',
        vi: '/vi/',
      },
    },
  };
}
```

This generates correct `<link rel="alternate" hreflang="en" href="/en/" />` and `<link rel="alternate" hreflang="vi" href="/vi/" />` tags, directly fixing FNDN-03.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` for theme | `@theme inline` in CSS | Tailwind v4 (2024-2025) | No config file needed; CSS-native token registration |
| next-intl `createSharedPathnamesNavigation` | next-intl `createNavigation` | next-intl v4.0 | Simplified API, single function for all navigation utilities |
| `unstable_setRequestLocale` | `setRequestLocale` | next-intl v4.0 | Stable API, no longer experimental |
| `params.locale` as sync object | `await params` as Promise | Next.js 15+ | Breaking change; all dynamic params are now async |
| next-intl middleware required | Static export without middleware | next-intl v3.x+ | Client-side redirect pattern documented for static export |
| `@tailwind base/components/utilities` directives | `@import "tailwindcss"` single import | Tailwind v4 | Simplified import; layers handled automatically |

**Deprecated/outdated:**
- `tailwind.config.ts` theme configuration: Still works in Tailwind v4 via compat mode but `@theme inline` in CSS is the recommended approach
- `createSharedPathnamesNavigation` / `createLocalizedPathnamesNavigation`: Merged into single `createNavigation` in next-intl v4
- `unstable_setRequestLocale`: Renamed to `setRequestLocale` (stable)
- Synchronous `params` access in layouts/pages: Must use `await params` in Next.js 15+

## Open Questions

1. **Vietnamese diacritics in MarlinGeoSQ and Saprona fonts**
   - What we know: These are custom/specialty fonts (woff format). Many display fonts lack full Vietnamese character coverage.
   - What's unclear: Whether these specific fonts include Latin Extended Additional characters needed for Vietnamese diacritics.
   - Recommendation: Test immediately after restoring fonts. Render a test page with comprehensive Vietnamese text. If missing glyphs, add `Be_Vietnam_Pro` from Google Fonts as CSS font-stack fallback.

2. **next-intl v4.8.3 static export with Next.js 16.1.6 specific behavior**
   - What we know: Peer dependencies confirm compatibility. The API pattern is well-established from v4.0.
   - What's unclear: Whether there are any Next.js 16-specific edge cases not yet documented (since Next.js 16 is very recent).
   - Recommendation: Follow standard v4 setup. If build fails, check next-intl GitHub issues for Next.js 16-specific reports. LOW risk given the peer dep declaration.

3. **Exact `generateStaticParams` propagation to child pages**
   - What we know: Layout-level `generateStaticParams` in Next.js provides params to child pages during static generation.
   - What's unclear: Whether every child `page.tsx` under `[lang]/` needs its own `generateStaticParams` or if the layout-level one suffices in Next.js 16.
   - Recommendation: Start with layout-level only. If build complains about missing params for child pages, add `generateStaticParams` to each page file.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- needs setup |
| Config file | None -- see Wave 0 |
| Quick run command | `npx next build` (build validation) |
| Full suite command | `npx next build && ls out/en/index.html out/vi/index.html out/404.html` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FNDN-03 | hreflang meta tags point to existing routes | smoke | `npx next build && grep -l 'hreflang' out/en/index.html out/vi/index.html` | -- Wave 0 |
| FNDN-05 | Lab aesthetic CSS tokens and grid background | manual | Visual inspection in browser | N/A (manual-only) |
| I18N-01 | `app/[lang]/` route structure works | smoke | `npx next build && test -f out/en/index.html && test -f out/vi/index.html` | -- Wave 0 |
| I18N-02 | Language switcher toggles locale | manual | Click EN/VI in browser, verify URL and text change | N/A (manual-only) |
| I18N-03 | All UI text from translation files | manual | Visual review: no hardcoded strings in components | N/A (manual-only) |
| I18N-04 | Language detection and persistence | manual | Clear localStorage, visit `/`, check redirect matches browser lang | N/A (manual-only) |
| I18N-05 | Static export generates both route trees | smoke | `npx next build && ls -la out/en/ out/vi/` | -- Wave 0 |
| UX-01 | Consistent dark theme with grid background | manual | Visual inspection across all pages | N/A (manual-only) |

### Sampling Rate
- **Per task commit:** `npx next build` (must succeed)
- **Per wave merge:** `npx next build && ls out/en/index.html out/vi/index.html out/404.html`
- **Phase gate:** Full build + visual inspection of both locale trees

### Wave 0 Gaps
- [ ] No test framework installed -- for this phase, build validation (`next build`) is the primary automated check
- [ ] No test scripts in package.json -- add `"test:build": "next build"` as a minimum
- [ ] Smoke test script for verifying output files exist: `scripts/verify-build.sh`

Note: This phase is primarily a structural/visual foundation. Most requirements are best validated by successful build + visual inspection rather than unit tests. A formal test framework (vitest or playwright) should be introduced when there is testable logic (Phase 3+ with robot state management, Phase 4+ with chatbot API calls).

## Sources

### Primary (HIGH confidence)
- npm registry: `next-intl@4.8.3` -- version, peer dependencies, exports verified via `npm view`
- npm registry: confirmed Next.js 16 + React 19 support in peer deps
- Project codebase: `package.json`, `next.config.ts`, `globals.css`, `layout.tsx`, `tsconfig.json` -- current state verified
- Project codebase: git history confirmed MarlinGeoSQ and Saprona woff files exist in previous commit
- `.agents/skills/ckm-design-system/` -- token architecture pattern (three-layer system)
- `.agents/skills/baseline-ui/` -- UI constraints and anti-patterns
- `.agents/skills/frontend-design/` -- design approach guidelines

### Secondary (MEDIUM confidence)
- next-intl v4 API patterns (defineRouting, createNavigation, getRequestConfig, setRequestLocale) -- based on training data for next-intl v3-v4 API evolution, corroborated by npm exports structure showing these exact entry points
- Tailwind v4 `@theme inline` pattern -- based on training data and corroborated by existing project setup already using this pattern
- Next.js 16 async params pattern (`await params`) -- based on training data for Next.js 15+ breaking change

### Tertiary (LOW confidence)
- Exact `generateStaticParams` propagation behavior in Next.js 16 with next-intl -- extrapolated from Next.js 14/15 behavior, may have subtle differences
- WebSearch was unavailable during research -- all findings based on training data + npm registry verification + codebase analysis

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- next-intl peer deps verified on npm, Tailwind v4 already in project, all libraries confirmed compatible
- Architecture: HIGH -- patterns are well-established; next-intl v4 API verified via npm exports; Tailwind v4 @theme already partially working in project
- Pitfalls: MEDIUM -- based on training data and experience with similar setups; no live documentation verification was possible due to WebSearch/WebFetch unavailability
- Code examples: MEDIUM -- patterns are based on training data for next-intl v4 and Tailwind v4; the exact API surface was corroborated by npm exports but code samples could not be verified against current docs

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (30 days -- stable libraries, low churn expected)
