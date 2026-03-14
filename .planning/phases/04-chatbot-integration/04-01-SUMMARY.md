---
phase: 04-chatbot-integration
plan: 01
subsystem: chat
tags: [zustand, sse, streaming, i18n, typescript, localStorage]

# Dependency graph
requires:
  - phase: 03-3d-robot
    provides: RobotEmotion type, useRobotStore with setEmotion
provides:
  - ChatMessage, SSEEvent, ChatState type contracts
  - useChatStore with localStorage persistence (messages only)
  - streamSSE async generator for real API SSE parsing
  - mockStreamChat async generator for demo mode
  - sendMessage orchestrator with auto-retry and emotion bridge
  - Chat namespace i18n strings (en + vi)
affects: [04-chatbot-integration plan 02 (UI components)]

# Tech tracking
tech-stack:
  added: []
  patterns: [SSE streaming with async generators, module-level AbortController, Zustand persist partialize]

key-files:
  created:
    - src/types/chat.ts
    - src/stores/useChatStore.ts
    - src/services/chat.ts
  modified:
    - src/messages/en.json
    - src/messages/vi.json

key-decisions:
  - "SSE parser uses async generator pattern for composability with retry logic"
  - "Module-level AbortController enables abortCurrentStream from UI without prop drilling"
  - "appendToLastMessage walks backwards to find last assistant message (safe no-op if none)"
  - "Error handling distinguishes TimeoutError vs AbortError (user-cancel) vs generic"

patterns-established:
  - "Async generator SSE: streamSSE yields SSEEvent, consumeStream dispatches to stores"
  - "Store getState() outside React: chatStore.getState().action() for non-component code"
  - "Persist partialize: only persist messages, not transient UI state (isOpen, isStreaming, error)"

requirements-completed: [CHAT-02, CHAT-03, CHAT-05, CHAT-06]

# Metrics
duration: 3min
completed: 2026-03-14
---

# Phase 4 Plan 1: Chat Infrastructure Summary

**Chat type contracts, Zustand store with localStorage persistence, SSE streaming service with auto-retry and mock/demo mode, and bilingual i18n strings**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-14T10:52:12Z
- **Completed:** 2026-03-14T10:55:57Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- ChatMessage, SSEEvent (discriminated union), and ChatState type contracts defining the full chat system shape
- Zustand store with persist middleware that serializes only messages to localStorage (FIFO cap at 50)
- SSE streaming parser with partial line buffering, [DONE] sentinel handling, and async generator pattern
- Mock/demo mode with 6 varied responses across all robot emotions, word-by-word streaming simulation
- sendMessage orchestrator with auto-retry (1x), 30s timeout, AbortController cancellation support
- Chat namespace added to both en.json and vi.json with proper Vietnamese diacritics

## Task Commits

Each task was committed atomically:

1. **Task 1: Create chat type contracts and Zustand store with localStorage persistence** - `3496dda` (feat)
2. **Task 2: Create streaming chat service with auto-retry, mock mode, and i18n strings** - `0f387e2` (feat)

## Files Created/Modified
- `src/types/chat.ts` - ChatMessage, SSEEvent, ChatState interfaces and config constants
- `src/stores/useChatStore.ts` - Zustand store with persist middleware, FIFO pruning, all chat actions
- `src/services/chat.ts` - SSE parser, mock streaming, sendMessage orchestrator, abort support
- `src/messages/en.json` - Added Chat namespace with 13 English strings
- `src/messages/vi.json` - Added Chat namespace with 13 Vietnamese strings (proper diacritics)

## Decisions Made
- SSE parser uses async generator pattern for composability with retry logic -- generators can be consumed by the same consumeStream function whether real or mock
- Module-level AbortController enables abortCurrentStream from UI without prop drilling
- appendToLastMessage walks backwards to find last assistant message (safe no-op if none found)
- Error handling distinguishes TimeoutError vs AbortError (user-cancel is silent) vs generic errors
- Mock responses include variety across all emotions (happy, excited, sad, thinking) with robot personality

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. The chat service auto-detects API configuration via `NEXT_PUBLIC_LLM_API_URL` and `NEXT_PUBLIC_LLM_API_KEY` environment variables. When unconfigured, it falls back to mock/demo mode automatically.

## Next Phase Readiness
- All type contracts, store, and service modules ready for Plan 02 (Chat UI Components)
- useChatStore and sendMessage are the primary interfaces Plan 02 will consume
- Chat i18n namespace ready for UI component integration
- Robot emotion bridge tested via existing useRobotStore pattern

## Self-Check: PASSED

All files exist, all commits verified, all exports present, both i18n namespaces confirmed.

---
*Phase: 04-chatbot-integration*
*Completed: 2026-03-14*
