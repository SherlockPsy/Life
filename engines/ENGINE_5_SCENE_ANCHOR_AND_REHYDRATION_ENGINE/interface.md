# /engines/ENGINE_5_SCENE_ANCHOR_AND_REHYDRATION_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 5
ENGINE NAME: SCENE ANCHOR & REHYDRATION ENGINE

This file defines the ONLY permitted boundary for Engine 5.
Engine 5 is responsible for scene continuity and context survival.
It preserves lived experience without becoming a narrator or director.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 5 exists to solve one problem only:
**how the system survives context limits without breaking reality.**

It does this by:
- caching scene anchors,
- regenerating them mechanically when required,
- performing rehydration invisibly and atomically.

Engine 5 does NOT decide what happens in a scene.
It preserves *where things already are*.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 5 exclusively owns:

1. Scene anchor generation
- Natural-language scene setup summaries.
- Generated from ledger-backed evidence only.
- Treated as cached context, not world authority.

2. Rehydration triggering (mechanical)
- Triggered ONLY by token budget thresholds.
- NEVER triggered semantically (“this feels long”).

3. Rehydration execution
- Natural-language reintroduction of context.
- Includes physical continuity replay.
- Happens ONLY at beat boundaries.
- Atomic: completes fully or not at all.

4. Scene cache lifecycle
- Determines when anchors are reused, replaced, or regenerated.
- Cache invalidation is mechanical, not narrative.

Engine 5 is the ONLY engine allowed to produce scene_anchor_pack and rehydration_pack.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 5 does NOT own:

- Reality creation or modification (Engine 0).
- Time advancement (Engine 3).
- Beat boundaries (Engine 2).
- Knowledge boundaries (Engine 4).
- Retrieval mechanics (Engine 8).
- Tool invocation logic (Engine 7).
- Content generation beyond anchoring (Engine 9).
- Rendering/UI decisions (Engine 12).

Engine 5 preserves continuity; it does not invent events.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 5 accepts ONLY:

A) Beat boundary notification
- Mechanical signal from Engine 2.

B) Token budget signal
- Mechanical signal indicating proximity to context exhaustion.

C) Ledger excerpts (via Engine 8)
- Only entries permitted by Engine 4 knowledge surface.

D) Capsule packs (optional)
- `/contracts/capsule_pack.md`
- Only as supporting continuity material.

Engine 5 MUST reject any semantic “please rehydrate now” request.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 5 emits ONLY:

A) `/contracts/scene_anchor_pack.md`
- For initial scene setup or scene change.

B) `/contracts/rehydration_pack.md`
- For context regeneration near limits.

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `get_scene_anchor(request_id) -> scene_anchor_pack`
- Returns cached anchor or generates new one.

### 5.2 `check_rehydration_needed(token_usage) -> boolean`
- Checks if rehydration is required.

### 5.3 `perform_rehydration(request_id) -> rehydration_pack`
- Generates rehydration pack.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 5 may call:
- Engine 8 (Retrieval) - to get recent context.
- Engine 6 (Capsule) - to get person context.
- Engine 9 (LLM Writer) - to summarize context into anchor/rehydration pack.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 5 must NEVER call:
- Engine 0 (Reality Ledger) - Anchors are not writes.
- Engine 12 (Projection) - Anchors are not rendered directly.

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 5 may read:
- Ledger excerpts (via Engine 8).
- Token usage stats.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 5 must NEVER read:
- Raw ledger (bypassing Engine 8).
- Private knowledge not authorized for the scene view.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Generation Failure**: Retry.
- **Context Too Large**: Fallback to hard truncation (fail safe).

