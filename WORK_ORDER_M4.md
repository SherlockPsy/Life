COPILOT WORK ORDER PACKET — MILESTONE 4
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_RUNTIME.md + copilot-instructions.md
Milestone Target: M4 — CONTINUITY FROM RECENT TEXT
Scope: Implement ONLY recent-window rereading.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- No long-term memory yet.
- No Qdrant yet.
- No summaries.
- No thread objects.

======================================================================
1) YOUR TASK (MILESTONE 4 IMPLEMENTATION)
======================================================================

Before Rebecca writes a block (in POST /say or POST /beat):

- Retrieve recent public blocks.
- Limit to a fixed window.

LOCKED VALUE:
RECENT_PUBLIC_N = 80

Order:
- OLDEST → NEWEST

Rebecca’s generation may depend ONLY on:
- recent public window
- immediate user text (if any)
- identity text (if present)

======================================================================
2) DATABASE REQUIREMENTS
======================================================================

- Query public_evidence_blocks ordered by created_at_utc ascending.
- LIMIT RECENT_PUBLIC_N.

======================================================================
3) ACCEPTANCE TESTS
======================================================================

After more than 80 blocks exist:
- Rebecca must not reference block #1 unless it reappears later.

======================================================================
4) COMMIT DISCIPLINE
======================================================================

- Commit only recent-window logic.
- No future retrieval logic.

END WORK ORDER PACKET — MILESTONE 4