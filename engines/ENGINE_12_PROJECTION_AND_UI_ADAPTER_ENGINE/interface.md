# /engines/ENGINE_12_PROJECTION_AND_UI_ADAPTER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 12
ENGINE NAME: PROJECTION & UI ADAPTER ENGINE

This file defines the ONLY permitted boundary for Engine 12.
Engine 12 is responsible for translating committed reality into something a human can see.
It renders. It does not invent.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 12 exists to produce **Projection Output** for the UI.

Projection:
- is a view, not reality,
- is derived strictly from committed ledger entries,
- respects visibility boundaries,
- does not repair gaps or invent continuity.

Engine 12 makes reality visible without altering it.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 12 exclusively owns:

1. Projection assembly
- Building `/contracts/projection_output.md` objects.
- Assembling stream entries and pocket content.

2. Display-channel enforcement
- USER / VOICE / PEOPLE channel handling.
- Author label inclusion rules.

3. Cursor handling
- Managing stream cursors for incremental updates.
- Ensuring stable replay ordering.

4. UI-facing adaptation
- Adapting internal representations to UI-safe payloads.
- Nothing UI-facing bypasses this engine.

Engine 12 is the ONLY engine allowed to emit ProjectionOutput.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 12 does NOT own:

- Reality creation or storage (Engine 0).
- Time advancement (Engine 3).
- Beat logic (Engine 2).
- Knowledge boundary definitions (Engine 4).
- Retrieval (Engine 8).
- Capsule generation (Engine 6).
- Content generation (Engine 9).
- Scene anchoring or rehydration (Engine 5).

Engine 12 shows what is written. Nothing more.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 12 accepts ONLY:

A) Committed WriteEntries
- `/contracts/write_entry.md`
- Retrieved from Engine 0, already committed.

B) Visibility constraints
- From Engine 4.

C) Time and calendar views
- From Engine 3 (for pocket clock/calendar).

D) Cursor hints
- Opaque cursor tokens from UI.

Engine 12 MUST NOT accept uncommitted proposals.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 12 emits ONLY:

A) `/contracts/projection_output.md`
- Fully assembled projection payload.

Engine 12 MUST NOT emit:
- WriteEntry
- WriteBundle
- ToolRequest
- RetrievalResultPack
- CapsulePack

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `render_projection(request_id, cursor) -> projection_output`
- Fetches entries.
- Filters by visibility.
- Formats for UI.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 12 may call:
- Engine 0 (Reality Ledger) - to read entries.
- Engine 3 (Time) - to get clock.
- Engine 4 (Knowledge) - to check visibility.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 12 must NEVER call:
- Engine 9 (LLM Writer).
- Engine 10 (Write Acceptance).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 12 may read:
- Committed ledger entries.
- Time state.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 12 must NEVER read:
- Uncommitted proposals.
- Private data not authorized for the viewer.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Rendering Error**: Return empty stream (safe default).
- **Missing Data**: Render what is available.

