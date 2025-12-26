COPILOT WORK ORDER PACKET — MILESTONE 3
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_CONSTITUTION.md + MASTER_RUNTIME.md + copilot-instructions.md
Milestone Target: M3 — REBECCA DOES NOT WAIT FOR YOU
Scope: Implement ONLY Milestone 3 behavior. Keep M0–M2 intact.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- No new endpoints.
- No new tables.
- No new state.
- No background activity.

======================================================================
1) YOUR TASK (MILESTONE 3 IMPLEMENTATION)
======================================================================

This milestone is behavioral, not structural.

You must ensure:

- POST /say does NOT obligate a Rebecca response.
- POST /beat does NOT obligate a Rebecca response.
- Silence is represented as:
  - wrote:false
  - empty public_blocks (or SYSTEM-only)

No auto-replies.
No conversational closure.
No “assistant-style” behavior.

======================================================================
2) ACCEPTANCE TESTS
======================================================================

Repeated POST /say calls may produce:
- sometimes Rebecca blocks
- sometimes no Rebecca blocks

This variability is allowed and expected.

curl commands from M1 and M2 remain valid.

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- If no code changes are required, DO NOT COMMIT.
- If changes are required, commit only those enforcing silence validity.

END WORK ORDER PACKET — MILESTONE 3