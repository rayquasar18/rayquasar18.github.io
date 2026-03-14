---
phase: 04-chatbot-integration
verified: 2026-03-14T00:00:00Z
status: human_needed
score: 10/10 must-haves verified
re_verification: false
human_verification:
  - test: "Open http://localhost:3000/en/ and verify the collapsed chat bar is visible at the bottom of the viewport while scrolling"
    expected: "A slim bar with MessageCircle icon and 'Type a message...' placeholder stays fixed at bottom, 400px wide on desktop, full-width on mobile"
    why_human: "Fixed positioning and scroll behavior can only be confirmed visually in a browser"
  - test: "Click the chat bar — verify it expands into a slide-up panel, then close it with the X button"
    expected: "Panel slides up smoothly with spring animation, then slides back down on close. AnimatePresence mount/unmount cycle must look smooth"
    why_human: "Animation quality and mount/unmount transitions require visual inspection"
  - test: "Click a prompt chip (e.g., 'What does Quan do?') and observe the full streaming flow"
    expected: "(a) User message appears as right-aligned green bubble, (b) robot changes to thinking animation, (c) bouncing dots appear, (d) text streams in word-by-word left-aligned, (e) robot emotion changes to match response (happy/excited/sad/thinking)"
    why_human: "End-to-end timing of streaming, robot state transitions, and visual rendering must be confirmed live"
  - test: "Refresh the page, reopen the chat panel"
    expected: "Previous messages are still visible — localStorage persistence across refresh works"
    why_human: "localStorage hydration edge cases (e.g., hydration flash) require browser testing"
  - test: "Open http://localhost:3000/vi/ and verify all chat UI strings are in Vietnamese"
    expected: "Placeholder, greeting, prompt chips, demo notice all render in Vietnamese with correct diacritics"
    why_human: "i18n rendering with correct diacritics and locale routing requires visual confirmation"
---

# Phase 4: Chatbot Integration — Verification Report

**Phase Goal:** Visitors can chat with the robot — messages reach the LLM backend, responses control robot animations, and unavailability is handled gracefully
**Verified:** 2026-03-14
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Sticky collapsed input bar is visible at bottom of viewport while scrolling any page | ? HUMAN | ChatBar renders `fixed bottom-0 right-0 z-50 w-full` with `md:right-4 md:bottom-4 md:w-[400px]` — structure correct, visual behavior needs browser check |
| 2 | Tapping the bar expands a slide-up chat panel overlay (400px desktop, full-width mobile) | ? HUMAN | AnimatePresence + motion.div with spring animation confirmed in code; visual quality requires browser |
| 3 | User can type a message and send it, receiving a streamed response with progressive text | ✓ VERIFIED | ChatInput calls `sendMessage(trimmed)` on submit; sendMessage orchestrates SSE stream → `appendToLastMessage` on each text chunk |
| 4 | Robot animation changes to match the emotion from the LLM response | ✓ VERIFIED | `consumeStream` calls `useRobotStore.getState().setEmotion(event.emotion)` on every `emotion` SSE event (line 283 of chat.ts) |
| 5 | Bouncing dots typing indicator appears in chat while streaming, robot plays thinking animation | ✓ VERIFIED | `sendMessage` sets `robotStore.setEmotion('thinking')` before streaming starts (line 207); ChatPanel renders `{isStreaming && <TypingIndicator />}` |
| 6 | When API is unreachable, error message appears and robot plays sad animation, then demo mode activates | ✓ VERIFIED | `handleStreamError` sets `useRobotStore.getState().setEmotion('sad')` and adds system error message; `!isApiConfigured` auto-routes to `mockStreamChat()` |
| 7 | Chat history persists across page refreshes via localStorage | ✓ VERIFIED | useChatStore uses `persist` with `createJSONStorage(() => localStorage)`, `partialize: (state) => ({ messages: state.messages })` |
| 8 | First open shows greeting message and 2-3 suggested prompt chips | ✓ VERIFIED | ChatPanel renders greeting text + `<PromptChips>` when `messages.length === 0` |
| 9 | Clear button resets chat to greeting state | ✓ VERIFIED | Trash2 button calls `useChatStore.getState().resetToGreeting()` which sets `{messages: [], error: null}` |
| 10 | Emotion demo buttons from Phase 3 are removed | ✓ VERIFIED | page.tsx contains no `useRobotStore`, `RobotEmotion`, or emotion button JSX — grep returned no matches |

**Score:** 10/10 truths verified (5 fully automated, 5 automated pass + human visual confirmation needed)

---

### Required Artifacts

#### Plan 01 Artifacts

| Artifact | Min Lines | Actual Lines | Status | Details |
|----------|-----------|--------------|--------|---------|
| `src/types/chat.ts` | — | 85 | ✓ VERIFIED | Exports `ChatMessage`, `SSEEvent` (discriminated union), `ChatState`, `MAX_MESSAGES`, `RATE_LIMIT_COOLDOWN_MS`, `STREAM_TIMEOUT_MS` |
| `src/stores/useChatStore.ts` | — | 73 | ✓ VERIFIED | Exports `useChatStore` with persist middleware, all 7 actions present |
| `src/services/chat.ts` | — | 331 | ✓ VERIFIED | Exports `streamSSE` (internal), `mockStreamChat`, `sendMessage`, `abortCurrentStream`, `isApiConfigured`, `ChatError` |
| `src/messages/en.json` | — | — | ✓ VERIFIED | `Chat` namespace present with all 13 required keys |
| `src/messages/vi.json` | — | — | ✓ VERIFIED | `Chat` namespace present with all 13 keys; proper Vietnamese diacritics confirmed |

#### Plan 02 Artifacts

| Artifact | Min Lines | Actual Lines | Status | Details |
|----------|-----------|--------------|--------|---------|
| `src/components/chat/ChatBar.tsx` | 40 | 51 | ✓ VERIFIED | Fixed positioning, expand/collapse, AnimatePresence, safe-area inset |
| `src/components/chat/ChatPanel.tsx` | 60 | 107 | ✓ VERIFIED | Spring animation, message list, greeting state, typing indicator, demo notice, auto-scroll |
| `src/components/chat/ChatBubble.tsx` | 20 | 39 | ✓ VERIFIED | All 3 roles rendered distinctly (user right green, assistant left dark, system center muted) |
| `src/components/chat/ChatInput.tsx` | 30 | 69 | ✓ VERIFIED | Controlled input, rate limiting, streaming disabled state, form submit wired to sendMessage |
| `src/components/chat/TypingIndicator.tsx` | 15 | 29 | ✓ VERIFIED | Framer-motion bounce with staggered delays, 3 dots in assistant bubble style |
| `src/components/chat/PromptChips.tsx` | 15 | 33 | ✓ VERIFIED | 3 chips from i18n, ghost button styling, onSelect prop wired |
| `src/app/[lang]/layout.tsx` | — | 65 | ✓ VERIFIED | `import {ChatBar}` present; `<ChatBar />` rendered inside `<NextIntlClientProvider>` |
| `src/app/[lang]/page.tsx` | — | 51 | ✓ VERIFIED | No emotion demo buttons, no `useRobotStore`/`RobotEmotion` imports |

---

### Key Link Verification

#### Plan 01 Key Links

| From | To | Via | Status | Evidence |
|------|----|-----|--------|----------|
| `src/services/chat.ts` | `src/stores/useRobotStore.ts` | `getState().setEmotion()` calls | ✓ WIRED | Line 283: `useRobotStore.getState().setEmotion(event.emotion)` (emotion events); line 300: `useRobotStore.getState().setEmotion('sad')` (error handling); line 207 in sendMessage: `robotStore.setEmotion('thinking')` |
| `src/services/chat.ts` | `src/stores/useChatStore.ts` | `getState()` calls for store mutations | ✓ WIRED | 9 `useChatStore.getState()` call sites across sendMessage, streamWithRetry, consumeStream, handleStreamError |
| `src/stores/useChatStore.ts` | localStorage | Zustand persist middleware | ✓ WIRED | `persist(...)` with `createJSONStorage(() => localStorage)` and `partialize: (state) => ({ messages: state.messages })` |

#### Plan 02 Key Links

| From | To | Via | Status | Evidence |
|------|----|-----|--------|----------|
| `src/components/chat/ChatBar.tsx` | `src/stores/useChatStore.ts` | `useChatStore` hook for `isOpen` | ✓ WIRED | Line 20: `useChatStore((s) => s.isOpen)`; lines 23, 27: `useChatStore.getState().setOpen(...)` |
| `src/components/chat/ChatInput.tsx` | `src/services/chat.ts` | `sendMessage()` on form submit | ✓ WIRED | Line 6: import; line 27: `sendMessage(trimmed)` inside `handleSubmit` |
| `src/components/chat/ChatPanel.tsx` | `src/stores/useChatStore.ts` | messages, isStreaming, resetToGreeting | ✓ WIRED | Lines 20-21: subscriptions; line 33: `useChatStore.getState().resetToGreeting()` |
| `src/app/[lang]/layout.tsx` | `src/components/chat/ChatBar.tsx` | direct import and render | ✓ WIRED | Line 7: `import {ChatBar}`; line 60: `<ChatBar />` inside NextIntlClientProvider |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| CHAT-01 | 04-02 | User can type messages in a sticky bottom input bar that follows scroll | ✓ SATISFIED | ChatBar: `fixed bottom-0` z-50, always-visible collapsed state in layout |
| CHAT-02 | 04-01, 04-02 | Messages sent to external LLM API endpoint via HTTP POST | ✓ SATISFIED | `streamSSE` sends `fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ...' } })` when `isApiConfigured` |
| CHAT-03 | 04-01, 04-02 | LLM response includes emotion field that controls robot animation state | ✓ SATISFIED | SSE `emotion` event type → `useRobotStore.getState().setEmotion(event.emotion)` in `consumeStream` |
| CHAT-04 | 04-02 | Chat displays typing indicator while waiting for API response | ✓ SATISFIED | `{isStreaming && <TypingIndicator />}` in ChatPanel; robot set to `thinking` in sendMessage |
| CHAT-05 | 04-01, 04-02 | Graceful handling of API unavailability with fallback | ✓ SATISFIED | `!isApiConfigured` → `mockStreamChat()`; stream error → `setEmotion('sad')` + system error message; demo notice banner in panel |
| CHAT-06 | 04-01 | Chat history maintained via Zustand store | ✓ SATISFIED | useChatStore persists `messages` to localStorage key `'rayquasar-chat'` with FIFO cap at 50 |

All 6 CHAT requirements are satisfied. No orphaned requirements detected — REQUIREMENTS.md maps CHAT-01 through CHAT-06 to Phase 4 and marks all as complete. Both plans (04-01 and 04-02) together cover all 6 requirements exactly as declared.

---

### Anti-Patterns Found

| File | Pattern | Severity | Notes |
|------|---------|----------|-------|
| None found | — | — | No TODO/FIXME/HACK comments, no empty implementations, no return null stubs, no console.log-only handlers across all 9 phase files |

TypeScript compiles clean (`tsc --noEmit` exits 0 with no output).

---

### Human Verification Required

#### 1. Sticky chat bar follows scroll

**Test:** Run `npm run dev`, open `/en/`, scroll the page up and down
**Expected:** The chat bar remains fixed at the bottom of the viewport at all scroll positions
**Why human:** Fixed positioning with `env(safe-area-inset-bottom)` and responsive width breakpoints require browser rendering to confirm

#### 2. Panel expand/collapse animation

**Test:** Click the chat bar to open, click X to close
**Expected:** Panel slides up from bottom with spring feel on open, slides back down on close with AnimatePresence unmount animation
**Why human:** Animation smoothness and the mount/unmount transition via AnimatePresence cannot be confirmed programmatically

#### 3. Full streaming flow end-to-end

**Test:** Click a prompt chip and observe the full sequence
**Expected:** (a) Right-aligned green user bubble appears instantly, (b) robot switches to thinking pose, (c) bouncing dots typing indicator appears, (d) text builds up word-by-word in left-aligned bubble, (e) robot emotion changes to match response (happy/excited/sad/thinking depending on mock pick)
**Why human:** Real-time streaming behavior, timing of state transitions, and visual rendering of progressive text require live observation

#### 4. localStorage persistence after refresh

**Test:** Send a message, close browser tab, reopen the URL, open the chat panel
**Expected:** Previous messages are visible; transient state (isOpen, isStreaming, error) is reset to defaults
**Why human:** localStorage hydration on the client side (especially with Next.js SSR + Zustand persist) may have a brief flash; needs visual confirmation

#### 5. Vietnamese locale rendering

**Test:** Open `/vi/`, click the chat bar
**Expected:** All UI strings in Vietnamese with correct diacritics (e.g., "Nhập tin nhắn...", "Gửi", "Xóa hội thoại")
**Why human:** next-intl locale routing and proper character rendering in browser fonts must be confirmed visually

---

### Gaps Summary

No gaps found. All automated checks pass:
- All 9 required files exist with substantive implementations (no stubs)
- All 4 key links from Plan 01 and 4 key links from Plan 02 are wired
- All 6 CHAT requirements have corresponding implementation evidence
- TypeScript compiles clean
- No anti-patterns detected

5 items flagged for human visual/behavioral confirmation — these are not blockers but require browser verification to fully close the phase.

---

_Verified: 2026-03-14_
_Verifier: Claude (gsd-verifier)_
