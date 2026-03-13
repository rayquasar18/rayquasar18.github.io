---
phase: 1
slug: codebase-cleanup
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — build verification only |
| **Config file** | none — no test framework needed for Phase 1 |
| **Quick run command** | `npx next build` |
| **Full suite command** | `npx next build && grep -r "quanmofii" src/ && grep -r "BASE_PATH" src/` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx next build`
- **After every plan wave:** Run `npx next build` + visual inspection in `npm run dev`
- **Before `/gsd:verify-work`:** Full build must succeed, no console hydration errors in dev
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | FNDN-01 | build | `npx next build` | N/A | ⬜ pending |
| 01-01-02 | 01 | 1 | FNDN-02 | grep | `grep -r "quanmofii" src/; grep -r "BASE_PATH" src/` | N/A | ⬜ pending |
| 01-01-03 | 01 | 1 | FNDN-04 | manual | `npm run dev` — visual inspection | N/A | ⬜ pending |
| 01-01-04 | 01 | 1 | UX-05 | manual | Verify `/HaMinhQuan_CV.pdf` accessible after build | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Restore source files from git — `git checkout HEAD -- src/ public/ .env.local .env.production next.config.ts package.json package-lock.json eslint.config.mjs README.md`
- [ ] Verify `npm install` succeeds and `npx next build` passes before any changes

*No test framework installation needed. Phase 1 bugs are verified through build success + visual inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Loading screen scale+fade transition | FNDN-04 | Visual animation quality not testable programmatically | Run `npm run dev`, observe: loader shows ≥1.5s, scale+fade exit, no layout jump, hero appears smoothly |
| Scroll-driven hero animations | FNDN-04 | Scroll behavior requires visual verification | Scroll through hero section in dev mode, verify video expansion, quote zoom, no jarring jumps |
| CV download at root domain | UX-05 | Requires actual file download verification | Click CV download button, verify PDF downloads correctly |
| No hydration errors in console | FNDN-01 | Console errors need runtime browser inspection | Open dev tools console, navigate all pages, verify no hydration mismatch warnings |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
