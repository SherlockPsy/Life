# /engines/ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 2
ENGINE NAME: BEAT & OPPORTUNITY COORDINATOR

This file defines the ONLY permitted boundary for Engine 2.
Engine 2 coordinates *when* the system is allowed to attempt actions.
It does not decide *what* happens.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 2 exists to enforce **beat-based progression**.

A beat is a mechanical opportunity boundary where:
- time may advance,
- the world may respond,
- or nothing may happen at all.

Engine 2 ensures:
- the system does not react continuously,
- silence is allowed,
- no engine acts outside a beat boundary.

Engine 2 is explicitly **non-intelligent**.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 2 exclusively owns:

1. Beat boundary enforcement
- All world-affecting activity MUST occur inside a beat.
- No mid-beat writes are permitted.

2. Opportunity surfacing (mechanical)
- Determines whether a beat allows:
  - possible write attempt,
  - explicit no-write,
  - projection-only refresh.

3. Silence legitimacy
- A beat may legally produce no write bundle.
- Silence is a first-class valid outcome.

4. Beat sequencing
- Maintains the mechanical notion of “next beat” after invocation acceptance.

Engine 2 is the ONLY engine allowed to say “this is a beat boundary.”

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 2 does NOT own:

- Time semantics or clock math (Engine 3).
- Reality commits (Engine 0).
- Scene anchoring or rehydration (Engine 5).
- Knowledge visibility or memory retrieval (Engine 4 / 8).
- Content generation (Engine 9).
- Rendering or UI decisions (Engine 12).
- Interpretation of operator intent or meaning.

Engine 2 does not know *why* something should happen.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 2 accepts ONLY:

A) Validated invocation envelope (from Engine 1)
- `/contracts/invocation_envelope.md`

B) Optional replay directive (from Engine 1)
- If invocation is REPLAY, Engine 2 MUST NOT be called.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 2 emits ONLY mechanical routing outputs:

A) Beat Context (internal mechanical object)
- Contains:
  - request_id
  - beat_id (monotonic, mechanical)
  - beat_kind (NORMAL | NO_OP)
  - invocation_envelope (unchanged)
- This context is NOT a world fact and MUST NOT be written to ledger.

Engine 2 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `start_beat(invocation_envelope) -> projection_output`
- Orchestrates the beat lifecycle.
- Calls other engines in sequence.
- Returns final projection.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 2 may call:
- Engine 3 (Time) - to get current time.
- Engine 5 (Scene/Rehydration) - to ensure context.
- Engine 9 (LLM Writer) - to solicit proposals.
- Engine 10 (Write Acceptance) - to validate proposals.
- Engine 0 (Reality Ledger) - to commit accepted bundles.
- Engine 12 (Projection) - to render the result.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 2 must NEVER call:
- Engine 7 (Tool Request) - Tools are called by LLM, not Coordinator.
- Engine 8 (Retrieval) - Retrieval is called by consumers, not Coordinator.

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 2 may read:
- Invocation Envelope.
- Status returns from called engines.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 2 must NEVER read:
- Ledger content (text).
- Private knowledge.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Orchestration Failure**: If any step fails, abort beat and return error.
- **Timeout**: If beat takes too long, abort.

