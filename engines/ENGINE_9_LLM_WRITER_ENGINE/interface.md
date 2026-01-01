# /engines/ENGINE_9_LLM_WRITER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 9
ENGINE NAME: LLM WRITER ENGINE (PROPOSAL-ONLY)

This file defines the ONLY permitted boundary for Engine 9.
Engine 9 is allowed to *propose* text.
It is never allowed to *decide* reality.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 9 exists to generate **proposals**, not facts.

In this system:
- the LLM does not own truth,
- the LLM does not own time,
- the LLM does not own continuity,
- the LLM does not own knowledge boundaries.

Engine 9 may:
- propose write bundles,
- propose silence,
- ask questions via tools.

Engine 9 may NOT:
- commit reality,
- bypass constraints,
- act without supervision.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 9 exclusively owns:

1. Proposal generation
- Proposing zero or more WriteEntry objects bundled as a WriteBundle.
- Proposing explicit no-write outcomes.

2. Natural language generation
- Producing candidate VOICE and PEOPLE text.
- Producing no USER text (USER text comes verbatim from operator).

3. Tool question formulation
- Emitting ToolRequest objects when evidence is required.

Engine 9 is the ONLY engine allowed to generate natural language content beyond anchoring.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 9 does NOT own:

- Reality commits (Engine 0).
- Write acceptance or rejection (Engine 10).
- Time advancement (Engine 3).
- Beat boundaries (Engine 2).
- Knowledge boundaries (Engine 4).
- Retrieval execution (Engine 8).
- Tool validation (Engine 7).
- Scene anchoring or rehydration (Engine 5).
- Rendering or UI layout (Engine 12).

Engine 9 writes drafts. Others decide.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 9 accepts ONLY:

A) Beat context
- From Engine 2.
- Includes invocation envelope and beat_id.

B) Scene anchor pack (optional)
- `/contracts/scene_anchor_pack.md`

C) Rehydration pack (optional)
- `/contracts/rehydration_pack.md`

D) Capsule packs (optional)
- `/contracts/capsule_pack.md`

E) Retrieval result packs (optional)
- `/contracts/retrieval_result_pack.md`

Engine 9 MUST NOT receive raw ledger access.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 9 emits ONLY:

A) `/contracts/write_bundle.md`
- Proposed write bundle (wrote=true or wrote=false).

B) `/contracts/tool_request.md`
- Request for more information.

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `generate_proposal(context) -> write_bundle | tool_request`
- Generates the next step.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 9 may call:
- Engine 7 (Tool Request) - to submit a tool request.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 9 must NEVER call:
- Engine 0 (Reality Ledger).
- Engine 10 (Write Acceptance).
- Engine 12 (Projection).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 9 may read:
- The context objects passed to it (Scene, Capsule, Retrieval).

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 9 must NEVER read:
- Raw ledger.
- System logs.
- Anything not explicitly passed in context.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **LLM Failure**: Retry or return No-Op.
- **Context Limit**: Fail (should be handled by Engine 5).

