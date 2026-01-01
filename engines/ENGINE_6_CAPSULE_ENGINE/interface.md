# /engines/ENGINE_6_CAPSULE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 6
ENGINE NAME: CAPSULE ENGINE (PER-PERSON CONTINUITY)

This file defines the ONLY permitted boundary for Engine 6.
Engine 6 exists to provide *per-person continuity views* without becoming an authority.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 6 exists to assemble **Capsule Packs**.

A capsule:
- is a regeneratable view,
- is NOT authoritative reality,
- is derived strictly from ledger-backed evidence,
- exists to help other engines maintain continuity and behavioral grounding.

Capsules support consistency.
They do not define truth.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 6 exclusively owns:

1. Capsule pack construction
- Creation of `/contracts/capsule_pack.md` objects.
- Sectioned, natural-language views per person.

2. Capsule provenance enforcement
- Every section MUST declare which ledger entries it was derived from.
- SOURCE_EXCERPTS must be verbatim.

3. Capsule regeneration logic
- Capsules may be rebuilt at any time from ledger evidence.
- Capsules are disposable and replaceable.

Engine 6 is the ONLY engine allowed to produce capsule packs.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 6 does NOT own:

- Reality storage (Engine 0).
- Knowledge boundaries (Engine 4).
- Retrieval mechanics (Engine 8).
- Tool invocation logic (Engine 7).
- Scene anchoring or rehydration (Engine 5).
- Content generation beyond capsule assembly (Engine 9).
- Rendering or UI formatting (Engine 12).
- Personality or behavior rules as law (those live in documents, not capsules).

Engine 6 assembles views. It does not decide behavior.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 6 accepts ONLY:

A) Person identity
- person_id (e.g., "REBECCA", "GEORGE")

B) Retrieval result packs
- `/contracts/retrieval_result_pack.md`
- Already filtered by Engine 4 knowledge surface.

C) Capsule build request (internal)
- Mechanical signal specifying:
  - person_id
  - purpose (e.g., CONTINUITY, REHYDRATION_SUPPORT)

Engine 6 MUST reject any request without explicit person_id.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 6 emits ONLY:

A) `/contracts/capsule_pack.md`
- Complete capsule pack for the specified person.

Engine 6 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- ToolRequest

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `build_capsule(person_id, purpose) -> capsule_pack`
- Assembles a capsule for the person.
- Uses Engine 8 to get evidence.
- Uses Engine 9 to summarize if needed.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 6 may call:
- Engine 8 (Retrieval) - to get evidence.
- Engine 9 (LLM Writer) - to summarize evidence into capsule sections.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 6 must NEVER call:
- Engine 0 (Reality Ledger).
- Engine 12 (Projection).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 6 may read:
- Ledger excerpts (via Engine 8).
- Person identity files.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 6 must NEVER read:
- Raw ledger.
- Private knowledge of other people.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Build Failure**: Return empty/minimal capsule.
- **Missing Person**: Error.

