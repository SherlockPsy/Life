# /engines/ENGINE_4_KNOWLEDGE_SURFACE_AND_BOUNDARY_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 4
ENGINE NAME: KNOWLEDGE SURFACE & BOUNDARY ENGINE

This file defines the ONLY permitted boundary for Engine 4.
Engine 4 defines what information is *visible* to whom.
It does not create knowledge, it enforces boundaries.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 4 exists to enforce **epistemic integrity**.

In this system:
- Storage is not knowledge.
- Retrieval is not permission.
- Visibility is explicit, mechanical, and enforced.

Engine 4 ensures that:
- no engine sees more than it is allowed to see,
- no private knowledge leaks into public projection,
- no agent gains omniscience by accident or convenience.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 4 exclusively owns:

1. Knowledge boundary definitions
- What each actor (George, Rebecca, WORLD, SYSTEM) is allowed to know.
- Mapping identities to knowledge views.

2. Visibility enforcement
- Enforcing PUBLIC vs PRIVATE visibility metadata on reads.
- Ensuring private entries are never exposed outside allowed views.

3. Knowledge surface construction
- Defining which ledger entries are eligible for retrieval per actor.
- Filtering is mechanical, not semantic.

4. Prevention of omniscience
- Ensuring no engine (including LLM Writer) has access to “everything”.

Engine 4 is the ONLY engine allowed to decide “who can see what”.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 4 does NOT own:

- Storage of reality (Engine 0).
- Retrieval mechanics or ranking (Engine 8).
- Tool invocation logic (Engine 7).
- Content generation (Engine 9).
- Time or beats (Engines 2, 3).
- Rendering or UI formatting (Engine 12).
- Capsule construction (Engine 6).

Engine 4 enforces boundaries; others operate within them.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 4 accepts ONLY:

A) Knowledge view requests
- Internal mechanical requests specifying:
  - actor_id
  - intended purpose (retrieval, capsule build, projection)
- Actor identity MUST be explicit.

B) Visibility metadata from ledger entries
- Supplied by Engine 0 as part of WriteEntry.

Engine 4 MUST reject any request without explicit actor identity.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 4 emits ONLY:

A) Knowledge surface descriptors (internal)
- Lists of entry_ids that are visible to the specified actor.
- These are mechanical filters, not content.

B) Visibility-approved read instructions
- Passed to Engine 8 (Retrieval) as constraints.

Engine 4 MUST NOT emit:
- Text excerpts
- Summaries
- Narrative content
- ProjectionOutput

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `get_knowledge_surface(actor_id) -> filter_criteria`
- Returns the filter criteria (e.g., "PUBLIC + PRIVATE(actor_id)") for a given actor.

### 5.2 `check_visibility(entry_metadata, actor_id) -> ALLOW|DENY`
- Checks if a specific entry is visible to an actor.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 4 may call:
- None. It is a policy engine used by others.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 4 must NEVER call:
- Engine 9 (LLM Writer).
- Engine 12 (Projection).
- Engine 0 (Reality Ledger).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 4 may read:
- Visibility metadata of ledger entries.
- Actor identity.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 4 must NEVER read:
- Ledger text content.
- Narrative context.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Unknown Actor**: Error.
- **Ambiguous Visibility**: Deny access (fail closed).

