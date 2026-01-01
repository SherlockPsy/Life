# /engines/ENGINE_1_INVOCATION_AND_IDEMPOTENCY_ENVELOPE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 1
ENGINE NAME: INVOCATION & IDEMPOTENCY ENVELOPE ENGINE

This file defines the ONLY permitted boundary for Engine 1.
Engine 1 is the front-door contract enforcer for invocations and idempotency behavior.
It does not create meaning. It enforces shape and replay.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 1 exists to ensure:
- every runtime call is contract-valid,
- the system treats an invoker (non-George) as the LLM “user,”
- idempotency is enforced as a mechanical invariant:
  - same request_id returns identical outcome,
  - duplicates do not create new reality.

Engine 1 does not decide what happens in the world.
It decides whether an invocation is valid and whether it is a replay.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 1 exclusively owns:

1. Invocation validation gate
- Validate `/contracts/invocation_envelope.md` and reject invalid invocations.

2. Idempotency front-door behavior (decision side)
- Determine if request_id is:
  - new (needs processing)
  - replay (must return stored identical outcome)

3. Invocation audit capture (mechanical)
- Persist invoker/operator identity as metadata for traceability (not world facts).

4. “George is not the LLM user” enforcement at boundary
- Ensure invoker identity is distinct from operator identity.

Engine 1 is the ONLY owner of invocation acceptance/rejection logic.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 1 does NOT own:

- Ledger persistence semantics (Engine 0).
- Time advancement decisions (Engine 3).
- Scene/rehydration logic (Engine 5).
- Knowledge gating (Engine 4).
- Retrieval ranking or excerpts (Engine 8).
- Tool request loop logic (Engine 7).
- Any content generation (Engine 9).
- Rendering/projection (Engine 12).
- Any semantic interpretation of operator text.

Engine 1 is a gate and router, not an intelligence.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 1 accepts ONLY:
- `/contracts/invocation_envelope.md` (InvocationEnvelope)

Any other input shape must be rejected.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 1 outputs one of:

A) Replay outcome (if request_id already processed):
- `/contracts/projection_output.md` (ProjectionOutput), loaded from stored outcome
- and MAY include the committed bundle_id in debug for traceability (as allowed by projection_output contract)

B) “Proceed” directive (internal mechanical routing output; not a world fact):
- A structured internal signal to Engine 2 indicating:
  - request_id is new,
  - invocation is valid,
  - invoker/operator identities are validated.

Note:
Engine 1 MUST NOT output any content that appears in the perceptual stream.

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `validate_and_route(invocation_envelope) -> {kind: REPLAY|PROCEED, payload}`
Inputs:
- invocation_envelope: InvocationEnvelope

Behavior:
- Validates contract.
- Checks idempotency against Engine 0.
- Returns REPLAY + stored output if exists.
- Returns PROCEED if new.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 1 may call:
- Engine 0 (Reality Ledger) - to check for existing request_id.
- Engine 2 (Beat Coordinator) - to hand off valid new invocations.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 1 must NEVER call:
- Engine 9 (LLM Writer) - Validation is mechanical.
- Engine 12 (Projection) - Engine 1 does not render.
- Engine 3 (Time) - Engine 1 does not advance time.

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 1 may read:
- The incoming InvocationEnvelope.
- Idempotency records from Engine 0 (metadata only).

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 1 must NEVER read:
- Ledger content (text).
- World state.
- User history.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Invalid Contract**: Return HTTP 400 (Bad Request).
- **Idempotency Check Failure**: Return HTTP 500.
- **Missing Identity**: Return HTTP 403.

