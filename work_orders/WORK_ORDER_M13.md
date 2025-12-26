COPILOT WORK ORDER PACKET — MILESTONE 13
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_INFRASTRUCTURE.md + copilot-instructions.md
Milestone Target: M13 — ARCHIVAL WITHOUT AMNESIA
Scope: Implement ONLY archival annotation.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- No deletion ever.
- No summarization ever.

======================================================================
1) YOUR TASK (MILESTONE 13 IMPLEMENTATION)
======================================================================

Implement archival via annotation.

To archive:
- Write a new SYSTEM public block:
  "ARCHIVE: block_id=<id> reason=<text>"

Rules:
- Original block remains immutable.
- Archived blocks remain in Qdrant.
- Archived blocks remain retrievable via:
  - semantic similarity
  - explicit reference
  - continuity need

Default views MAY skip archived blocks.

======================================================================
2) ACCEPTANCE TEST
======================================================================

Archived blocks:
- Disappear from /public/latest
- Reappear when semantically relevant

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- Commit only archival behavior.

END WORK ORDER PACKET — MILESTONE 13