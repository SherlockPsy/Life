COPILOT WORK ORDER PACKET — MILESTONE 4
Project: SherlockPsy Life

Authority Order (binding, descending):
- MASTER_CONSTITUTION.md
- MASTER_INFRASTRUCTURE.md
- MASTER_RUNTIME.md
- MASTER_WORLD.md
- TOTAL_PLAN.md
- copilot-instructions.md
- THIS WORK ORDER (M4)

Milestone Target: M4 — MEMORY WINDOW EXISTS
Scope: Implement ONLY recent-window rereading. Do not implement long-term retrieval. Do not implement summaries as a feature.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

A) What you are implementing
- Implement a strict “recent window” reread for public blocks.
- LOCKED VALUE: N = 60 public blocks.

B) What you are NOT implementing
- No long-term memory beyond the recent window.
- No Qdrant (vector store) integration at this milestone.
- No archival behavior.
- No new endpoints.
- No refactors “while you’re here.”

C) Summaries under v6 (do not get clever)
- V6 allows summaries ONLY as non-authoritative reading aids derived from written text.
- This milestone does NOT introduce a summary feature.
- Therefore:
  - Do NOT implement any summary generation.
  - Do NOT store summaries.
  - Do NOT treat summaries as authoritative reality.
  - Do NOT “compress” the authoritative record in any way.

D) Time under v6 (context only)
- Objective time exists and advances, but time must not force outcomes.
- This milestone may pass current time as context to the model, but must not use time as a rule engine.

E) Silence is valid
- POST /say does not obligate REBECCA to write.
- POST /beat does not obligate REBECCA to write.
- Silence is expected and valid.

======================================================================
1) YOUR TASK (MILESTONE 4 IMPLEMENTATION)
======================================================================

Implement “recent-window rereading” exactly as required:

1) When generating REBECCA output:
   - Provide ONLY:
     - Identity text (binding)
     - The last N=60 public blocks (chronological)
     - The immediate user utterance (if any)
     - Objective time context (optional; context only)

2) Ensure the system never loads public blocks older than the last 60 into REBECCA’s context at this milestone.

3) Ensure idempotency still holds:
   - Repeating the same request_id returns the same response.
   - Repeating the same request_id performs no new writes (public or private).

======================================================================
2) ACCEPTANCE TEST (CURL + INSPECTION)
======================================================================

A) Build > 60 public blocks
- Repeatedly call POST /say with unique request_id to create > 60 public blocks.

B) Confirm /public/latest returns newest first correctly
curl -s "$BASE/public/latest?n=20"

Expected:
- HTTP 200
- 20 blocks returned
- Ordered oldest → newest (chronological)
- Contains the most recent entries

C) Confirm REBECCA context construction is capped
This is validated by code inspection and/or logging (internal only):
- The context fed to REBECCA includes at most:
  - Identity
  - 60 public blocks
  - Immediate input (if any)
  - Optional time context

Forbidden:
- Including blocks older than the last 60
- Including any derived “summary memory”
- Including any “compressed history”

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- If no code changes are required, DO NOT COMMIT.
- If changes are required:
  - Commit only what enforces N=60 public window reread.
  - Do not bundle any other milestone work.

END WORK ORDER PACKET — MILESTONE 4