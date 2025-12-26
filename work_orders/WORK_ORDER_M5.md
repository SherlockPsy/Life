COPILOT WORK ORDER PACKET — MILESTONE 5
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_INFRASTRUCTURE.md + copilot-instructions.md
Milestone Target: M5 — PRIVATE LEARNING EXISTS
Scope: Implement ONLY private ledger writing.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- Private text is never returned via HTTP.
- Private text is append-only.
- Private text is agent-specific.

======================================================================
1) YOUR TASK (MILESTONE 5 IMPLEMENTATION)
======================================================================

Implement private ledger storage for Rebecca.

Rules:
- Private entries MAY be written only when a public block is written.
- Private entries MUST NOT be written alone.
- Private entries MUST NOT be summarized.
- Private entries MUST NOT be exposed.

======================================================================
2) DATABASE REQUIREMENTS (SQL OUTPUT REQUIRED)
======================================================================

Output SQL file:
sql/m5_private_ledger.sql

Create table: private_ledger_entries

Columns:
- id BIGSERIAL PRIMARY KEY
- agent_id TEXT NOT NULL
- entry_text TEXT NOT NULL
- created_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW()

No other columns.

======================================================================
3) ACCEPTANCE TEST
======================================================================

- After Rebecca writes publicly, a private row MAY be created.
- No HTTP endpoint exposes it.

======================================================================
4) COMMIT DISCIPLINE
======================================================================

- Commit SQL and minimal write logic.
- No reading yet.

END WORK ORDER PACKET — MILESTONE 5