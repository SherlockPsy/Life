COPILOT WORK ORDER PACKET — MILESTONE 5
Project: SherlockPsy Life

Authority Order (binding, descending):
- MASTER_CONSTITUTION.md
- MASTER_INFRASTRUCTURE.md
- MASTER_RUNTIME.md
- MASTER_WORLD.md
- TOTAL_PLAN.md
- copilot-instructions.md
- THIS WORK ORDER (M5)

Milestone Target: M5 — PRIVATE LEARNING EXISTS
Scope: Implement ONLY private/unrendered ledger writing + storage rules. Do not expose it via HTTP.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

A) V6 meaning of “private”
- Private/unrendered text is real written reality.
- Private text is NOT returned to the user.
- Private text is NOT inferable from metadata in HTTP responses.

B) Append-only and immutable
- No updates.
- No deletes.
- No “rewrite/cleanup.”
- Corrections are new entries only.

C) No hidden-state machinery
Private text must NOT be implemented as:
- meters
- flags
- counters
- decay
- refresh cycles
- “state variables”

It must be text entries, append-only.

D) Private-only writing is allowed (v6 alignment)
- Private ledger entries MAY be written even when no public blocks are written.
- This is required to support v6 off-screen life and private cognition as written reality.

E) Idempotency applies to private writes too
- If request_id repeats, perform NO new writes (public or private).

======================================================================
1) YOUR TASK (MILESTONE 5 IMPLEMENTATION)
======================================================================

1) Add durable storage for private ledger entries (append-only).
   Minimum requirements:
   - Each entry must store:
     - owning agent (e.g., REBECCA)
     - timestamp
     - raw text content (verbatim)
     - a link to the invocation/request_id OR an equivalent idempotency-safe linkage
       (so repeated request_id never creates duplicate private writes)

2) Update the write pipeline:
   - On an invocation opportunity (POST /say, POST /beat, and any future endpoints):
     - The system MAY write a private ledger entry for an agent.
     - This may occur with or without a public write.
   - Private ledger writing must never be required.
   - Private ledger writing must never be disclosed via HTTP responses.

3) Ensure private ledger entries are never retrievable via any HTTP route.
   - No “debug endpoints.”
   - No “admin endpoints.”
   - No “counts.”
   - No “latest private entry.”

======================================================================
2) ACCEPTANCE TEST (DB DIRECT, NO HTTP EXPOSURE)
======================================================================

This milestone’s private ledger cannot be validated via HTTP by design.
Validation is by direct database inspection (read-only).

A) Trigger a private-only write possibility
1) Call POST /beat with a new request_id.
2) Allow the system to produce either:
   - a public REBECCA block, OR
   - silence (no public block)

Either is acceptable.

B) Confirm private ledger entry may exist even if no public block was written
- After the call above, inspect the private ledger table and confirm:
  - A new entry exists for the owning agent (REBECCA) OR (if your implementation chooses) that no entry exists.
  - The key requirement is that the system supports private-only entries as a capability.
  - The stronger requirement: demonstrate at least one case where a private entry is written without any public block written.

C) Confirm idempotency for private writes
- Repeat the exact same request_id.
- Confirm:
  - No additional private ledger entries are created.

D) Confirm no HTTP exposure
- Call:
  - GET /public/latest
- Confirm:
  - No private ledger data appears.
  - No metadata implies private ledger presence (no counts, no “private_write:true”, etc.).

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- Commit SQL/schema changes and minimal write logic only.
- Do not implement private ledger rereading yet (that is later).
- Do not add endpoints.
- Do not refactor unrelated code.

END WORK ORDER PACKET — MILESTONE 5