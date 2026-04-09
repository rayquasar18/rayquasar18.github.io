# Quick Task 260409-r0y: Fix project section overflow

**Completed:** 2026-04-09
**Commit:** 45cf08c

## Changes

### Task 1: Add overflow containment and wrapper div

**Files modified:**
- `src/components/projects/projects-section.tsx` — Added `overflow-hidden` to `<section>` className to prevent parallax animations and masonry grid offsets from bleeding outside section bounds
- `src/app/[lang]/page.tsx` — Wrapped `<ProjectsSection>` in a `<div>` container to match the structure used by `AboutSection` and `AchievementsSection`

## Verification

- ESLint: 0 errors
- Build structure consistent with other sections
