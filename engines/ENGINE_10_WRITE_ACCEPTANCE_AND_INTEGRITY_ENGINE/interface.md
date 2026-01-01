# /engines/ENGINE_10_WRITE_ACCEPTANCE_AND_INTEGRITY_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 10
ENGINE NAME: WRITE ACCEPTANCE & INTEGRITY ENGINE

This file defines the ONLY permitted boundary for Engine 10.
Engine 10 is the constitutional firewall between proposals and reality.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 10 exists to decide **whether a proposed write is allowed to become reality**.

This engine is deliberately non-intelligent.
It does not reason semantically.
It enforces structural, constitutional, and mechanical integrity.

The LLM proposes.
Engine 10 disposes.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 10 exclusively owns:

1. Proposal validation
- Structural validation of `/contracts/write_bundle.md`.
- Validation of all included `/contracts/write_entry.md` objects.

2. Constitutional enforcement at write-time
- Enforcing non-negotiable prohibitions before any commit.
- Rejecting proposals that violate system law, regardless of plausibility.

3. Write integrity guarantees
- Ensuring bundle atomicity preconditions are satisfied.
- Ensuring channel rules, author rules, and visibility rules are respected.

4. Explicit rejection handling
- Producing clear rejection outcomes without attempting repair.

Engine 10 is the ONLY engine allowed to say “this write is invalid.”

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 10 does NOT own:

- Reality persistence (Engine 0).
- Content generation (Engine 9).
- Time advancement (Engine 3).
- Beat boundaries (Engine 2).
- Knowledge boundary definitions (Engine 4).
- Scene anchoring or rehydration (Engine 5).
- Rendering (Engine 12).
- Tool logic (Engine 7).

Engine 10 judges form, not meaning.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 10 accepts ONLY:

A) `/contracts/write_bundle.md`
- Proposed bundle from Engine 9.

B) Beat context
- From Engine 2 (to ensure write occurs within a beat).

C) Invocation envelope (read-only)
- For request_id linkage and audit.

Engine 10 MUST reject any write proposal not associated with an active beat.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 10 emits ONLY:

A) Accepted WriteBundle
- Forwarded unchanged to Engine 0 for commit.

B) Rejected WriteBundle
- Same structure, with:
  - wrote=false
  - rejection.rejected=true
  - rejection.reason populated
- MUST NOT be committed.

Engine 10 MUST NOT emit:
- WriteEntry alone
- ProjectionOutput
- Narrative text
- ToolRequest

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `validate_proposal(write_bundle, context) -> accepted_bundle | rejected_bundle`
- Validates structure.
- Validates constraints.
- Returns verdict.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 10 may call:
- Engine 0 (Reality Ledger) - to check constraints (e.g. uniqueness) if needed, but usually validation is stateless or context-based.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 10 must NEVER call:
- Engine 9 (LLM Writer) - No negotiation.
- Engine 12 (Projection).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 10 may read:
- The proposed bundle.
- The context.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 10 must NEVER read:
- Private knowledge not relevant to validation.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Validation Error**: Reject bundle.
- **System Error**: Reject bundle.

