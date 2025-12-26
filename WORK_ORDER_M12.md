COPILOT WORK ORDER PACKET — MILESTONE 12
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_INFRASTRUCTURE.md + copilot-instructions.md
Milestone Target: M12 — RESET VIA NEW RUN
Scope: Implement ONLY run isolation.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- No deletion.
- No truncation.
- No mutation of past runs.

======================================================================
1) YOUR TASK (MILESTONE 12 IMPLEMENTATION)
======================================================================

Implement endpoint:

POST /admin/reset

Behavior:
- Create a new run namespace.
- Switch active run to the new one.
- Write SYSTEM block in OLD run:
  "RESET: new run started. Reason: <reason>"

Old runs:
- Persist indefinitely.
- Are not reread by default.

======================================================================
2) ACCEPTANCE TEST
======================================================================

After reset:
- /public/latest returns empty array.
- Old data remains untouched.

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- Commit only run-scoping logic.

END WORK ORDER PACKET — MILESTONE 12