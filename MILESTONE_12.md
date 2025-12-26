EXECUTION CANON — MILESTONE 12 — RESET IS POSSIBLE
Status: Binding / Non-negotiable

0. Purpose
The entire lived history can be discarded safely.

1. Reset definition
A reset means:
- All public evidence blocks are deleted
- All private ledger entries are deleted
- All agent-specific accumulated deltas are deleted
- Identity templates remain available

2. Required invocation
2.1 POST /admin/reset
- Content-Type: application/json
- Body schema:
  - confirm: string (required). Must equal "RESET_ALL_TEXT"
  - request_id: string (required)

3. Response truth
3.1 Successful reset
- HTTP 200
- JSON:
  - reset: true
  - request_id: string
  - timestamp_utc: string

4. Post-reset guarantees
4.1 After reset:
- /public/latest returns empty array
- Agents have no memory of prior runs
- Behaviour is indistinguishable from day zero

5. Forbidden improvisations
- No partial resets
- No migrations
- No archival snapshots