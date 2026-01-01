# /engines/ENGINE_8_RETRIEVAL_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 8
ENGINE NAME: RETRIEVAL ENGINE (EVIDENCE ACCESS)

This file defines the ONLY permitted boundary for Engine 8.
Engine 8 retrieves evidence from storage.
It does not decide meaning, relevance, or truth.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 8 exists to retrieve **ledger-backed evidence** in response to approved tool requests.

Retrieval in this system:
- returns verbatim text,
- preserves provenance,
- respects knowledge boundaries,
- does not summarize or interpret.

Engine 8 answers “what exists that matches this query,” not “what matters.”

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 8 exclusively owns:

1. Evidence retrieval mechanics
- Executing searches against ledger storage.
- Executing direct gets by entry_id or bundle_id.

2. Verbatim excerpt construction
- Returning exact substrings or full texts from ledger entries.
- Preserving original wording and ordering.

3. Provenance attachment
- Attaching entry_id, bundle_id, and created_at_world to every excerpt.

4. Mechanical ranking (if any)
- Ordering results by simple, non-semantic rules:
  - recency,
  - explicit query match,
  - deterministic index ordering.
- No “importance” or narrative ranking.

Engine 8 is the ONLY engine allowed to produce Retrieval Result Packs.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 8 does NOT own:

- Knowledge boundaries (Engine 4).
- Tool request validation (Engine 7).
- Content generation (Engine 9).
- Capsule assembly (Engine 6).
- Scene anchoring or rehydration (Engine 5).
- Rendering (Engine 12).
- Ledger authority (Engine 0).

Engine 8 fetches evidence; others decide how it is used.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 8 accepts ONLY:

A) Approved `/contracts/tool_request.md`
- Forwarded by Engine 7 after validation.

B) Knowledge surface constraints
- Provided by Engine 4 (explicit list or filter).

Engine 8 MUST reject any retrieval request not approved by Engine 7.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 8 emits ONLY:

A) `/contracts/retrieval_result_pack.md`
- With verbatim excerpts and provenance.

Engine 8 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- CapsulePack
- ToolRequest

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `execute_retrieval(tool_request, knowledge_surface) -> retrieval_result_pack`
- Executes the query.
- Filters by knowledge surface.
- Returns evidence.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 8 may call:
- Engine 11 (Infrastructure) - for DB/Vector search.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 8 must NEVER call:
- Engine 9 (LLM Writer).
- Engine 0 (Reality Ledger) - It reads via Infra, does not call Engine 0 logic.

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 8 may read:
- Ledger content (via Engine 11).
- Knowledge surface constraints.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 8 must NEVER read:
- Uncommitted proposals.
- Private data outside the provided knowledge surface.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **No Results**: Return empty pack (not error).
- **DB Error**: Return error.

