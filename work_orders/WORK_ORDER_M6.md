COPILOT WORK ORDER PACKET — MILESTONE 6
Project: SherlockPsy Life

Authority Order (binding, descending):
- MASTER_CONSTITUTION.md
- MASTER_INFRASTRUCTURE.md
- MASTER_RUNTIME.md
- MASTER_WORLD.md
- TOTAL_PLAN.md
- copilot-instructions.md
- THIS WORK ORDER (M6)

Milestone Target: M6 — PRIVATE LEARNING INFLUENCES SPEECH
Scope: Implement retrieval that can influence REBECCA without exposing private text. (If Qdrant is used, it is acceleration only.)

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

A) Authoritative truth remains verbatim written text
- Qdrant (if used) is acceleration only, never truth.
- The authoritative record is retrieved verbatim from Postgres (or the authoritative store).
- Nothing is rewritten.
- Nothing is deleted.

B) Summaries under v6 (allowed, but not authority)
- V6 allows summaries ONLY as non-authoritative reading aids derived from written text.
- This milestone does NOT introduce a summary feature unless explicitly required by a later Work Order.
Therefore:
- Do NOT generate summaries.
- Do NOT replace history with summaries.
- Do NOT treat any derived text as authoritative reality.

C) No compression of the authoritative record
- “No compression” means:
  - Do not discard, rewrite, or replace the authoritative record.
  - Do not collapse blocks into a new authoritative representation.

D) No director logic
- No pacing engine.
- No “interesting moment” selection.
- No “should act now.”

E) Privacy
- Private ledger contents must not be returned via HTTP.
- Private ledger contents must not be directly dumped into public output.
- Private ledger may influence tone/choices without disclosure.

======================================================================
1) YOUR TASK (MILESTONE 6 IMPLEMENTATION)
======================================================================

Implement “private learning influences speech” as follows:

1) When REBECCA writes:
   - She may be influenced by:
     - Identity text
     - Recent public window
     - Any private ledger entries she owns (if rereading is implemented here)
     - Optionally, retrieved older public blocks (if retrieval is introduced here)

2) If you use Qdrant:
   - Store vectors for public blocks (and/or private ledger entries if permitted).
   - Use Qdrant only to find candidate relevant items.
   - Fetch the authoritative text verbatim from the authoritative store.
   - Do not treat Qdrant as the record.

3) Do not add new endpoints.

4) Preserve idempotency:
   - Same request_id returns same response.
   - No extra writes (public or private) on repeat.

======================================================================
2) ACCEPTANCE TEST
======================================================================

A) Create enough history
- Create > 80 public blocks via POST /say (unique request_id each time).

B) Demonstrate influence from older text
- Cause a situation where something from earlier in the record plausibly reappears in REBECCA’s behavior (topic, phrasing, boundary decision, reference).

This is validated by:
- code inspection (retrieval path exists and obeys “Qdrant is acceleration only”)
- and a manual run that demonstrates older material can influence output without dumping private ledger contents.

C) Confirm no leakage
- No HTTP response contains private ledger text.
- No endpoint exposes private ledger entries.

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- Commit only what is required for M6.
- No world logic.
- No new endpoints.
- No “summary feature.”
- No refactors outside retrieval/selection plumbing.

END WORK ORDER PACKET — MILESTONE 6