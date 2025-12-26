COPILOT WORK ORDER PACKET — MILESTONE 6
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_INFRASTRUCTURE.md + copilot-instructions.md
Milestone Target: M6 — PRIVATE LEARNING INFLUENCES SPEECH
Scope: Implement Qdrant-backed selective rereading.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- No summaries.
- No compression.
- Qdrant is acceleration only, never truth.

======================================================================
1) YOUR TASK (MILESTONE 6 IMPLEMENTATION)
======================================================================

A. Embeddings
- Every public block MUST be embedded.
- Every embedding MUST be upserted into Qdrant.

Payload MUST include:
- block_id
- source
- location_token
- created_at_utc

B. Retrieval
Before Rebecca writes:
- Retrieve recent window (M4).
- Query Qdrant for TOP_K similar blocks.

LOCKED VALUE:
TOP_K = 12

C. Fetch
- Retrieved block_ids MUST be fetched verbatim from Postgres.
- Qdrant payload is NOT truth.

D. Influence
- Retrieved blocks may influence writing.
- Must not be quoted explicitly unless publicly visible.

======================================================================
2) ACCEPTANCE TEST
======================================================================

After >80 blocks exist:
- Older relevant blocks may reappear in Rebecca’s behavior.

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- Commit Qdrant integration only.
- No world logic.
- No new endpoints.

END WORK ORDER PACKET — MILESTONE 6