---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
stopped_at: Completed 02-01-PLAN.md
last_updated: "2026-03-13T20:44:53.943Z"
last_activity: 2026-03-14 — i18n routing infrastructure + design token system
progress:
  total_phases: 10
  completed_phases: 1
  total_plans: 4
  completed_plans: 3
  percent: 75
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-13)

**Core value:** The interactive 3D robot chatbot — a cute robot that responds with emotions and animations based on LLM-generated answers — must work flawlessly
**Current focus:** Phase 2 — i18n Foundation + Lab Aesthetic (Plan 1 of 2 complete)

## Current Position

Phase: 2 of 10 (i18n Foundation + Lab Aesthetic) -- Plan 1/2 COMPLETE
Next: Plan 02-02 (Header + language switcher + mobile menu)
Status: Executing Phase 2
Last activity: 2026-03-14 — i18n routing infrastructure + design token system

Progress: [████████░░] 75%

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Phase 1 (reset): Old codebase deleted entirely — starting fresh with Next.js 16 + TypeScript + Tailwind CSS v4
- Phase 1 (reset): Core dependencies installed: framer-motion, zustand, lucide-react
- Phase 1 (reset): Old Phase 1 requirements (FNDN-01, FNDN-02, FNDN-04, UX-05) marked N/A — no longer applicable
- Phase 2: Use `app/[lang]/` + `generateStaticParams` for i18n — no middleware (static export incompatible)
- Phase 2 (02-01): Saprona for display/headings, MarlinGeoSQ for body text — Saprona distinctive for headlines, MarlinGeoSQ geometric sans for readability
- Phase 2 (02-01): Root layout is bare passthrough, locale layout owns html/body tags — standard next-intl static export pattern
- Phase 2 (02-01): Root redirect uses window.location.replace() — outside [lang] context, needs full navigation
- Phase 2 (02-01): 404 page uses inline styles — outside locale layout chain, Tailwind tokens unavailable
- Phase 3: Use `dynamic({ ssr: false })` for all R3F imports — prevents guaranteed SSR build crash
- Phase 3: Zustand is the only correct bridge across R3F Canvas boundary — React Context cannot cross it
- Phase 8: Use `next-mdx-remote` for blog; verify React 19 compat at install time; fallback is `mdx-bundler`

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 3] `.glb` animation clip names unknown until file is provided — `RobotEmotion` TypeScript union and `EmotionController` depend on exact clip names. Unblocked by: get the file early, run `console.log(gltf.animations.map(a => a.name))`.
- [Phase 4] LLM backend CORS headers must be set for `https://rayquasar18.github.io` before chatbot integration works in production — external dependency, coordinate before Phase 4 begins.
- [Phase 8] `next-mdx-remote` React 19 peer dep compatibility must be verified at install time — fallback is `mdx-bundler`.

## Session Continuity

Last session: 2026-03-13T20:44:53.941Z
Stopped at: Completed 02-01-PLAN.md
Resume: Ready for 02-02-PLAN.md (Header + language switcher + mobile menu)
