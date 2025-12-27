COPILOT WORK ORDER PACKET — MILESTONE 13
Project: SherlockPsy Life

Authority Order (binding, descending):
- MASTER_CONSTITUTION.md
- MASTER_INFRASTRUCTURE.md
- MASTER_RUNTIME.md
- MASTER_WORLD.md
- TOTAL_PLAN.md
- copilot-instructions.md
- THIS WORK ORDER (M13)

Milestone Target: M13 — ARCHIVAL WITHOUT AMNESIA
Scope: Implement ONLY archival annotation and visibility effects. No deletion. No history replacement.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

A) No deletion ever
- No public block is deleted.
- No private ledger entry is deleted.
- No identity text is deleted.

B) No summary-as-authority ever
- V6 allows summaries ONLY as non-authoritative reading aids.
- This milestone does not introduce a summary feature.
- Absolutely forbidden:
  - replacing history with summaries
  - rewriting history as “compressed truth”
  - deleting and substituting

C) Archival is visibility, not erasure
- Archived items may be hidden from default “latest” views.
- Archived items remain real, retrievable, and eligible for semantic retrieval.

======================================================================
1) YOUR TASK (MILESTONE 13 IMPLEMENTATION)
======================================================================

1) Add “archived” annotation to public blocks (mechanism depends on current schema).
2) Modify GET /public/latest behavior:
   - Default: exclude archived blocks.
   - (Optional) allow a parameter to include archived if already defined elsewhere.
3) Ensure semantic retrieval (if present) can still retrieve archived blocks.
   - Retrieval must be able to surface archived blocks when relevant.
4) Ensure the authoritative record remains verbatim and append-only.

======================================================================
2) ACCEPTANCE TEST
======================================================================

A) Archiving hides from /public/latest
- Archive at least one older public block.
- Call:
  - GET /public/latest?n=20
Expected:
- The archived block does not appear in the default latest view.

B) Archived remains retrievable by relevance
- Create a scenario where an archived block is semantically relevant to a current context.
- Verify the system can still use that block as retrieved context (via Qdrant or retrieval mechanism if present).

C) No deletion, no replacement
- Confirm archived blocks still exist in the authoritative store unchanged.
- Confirm nothing was rewritten or replaced with a summary.

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- Commit only archival annotation + retrieval visibility behavior.
- No feature creep.
- No new endpoints unless already mandated by TOTAL_PLAN / Work Order chain.

END WORK ORDER PACKET — MILESTONE 13