COPILOT WORK ORDER PACKET — MILESTONE 2
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_CONSTITUTION.md + MASTER_INFRASTRUCTURE.md + MASTER_RUNTIME.md + copilot-instructions.md
Milestone Target: M2 — REBECCA CAN SPEAK WITHOUT YOU
Scope: Implement ONLY Milestone 2. Keep Milestones 0 and 1 working exactly as specified.

======================================================================
0) ABSOLUTE CONSTRAINTS (DO NOT NEGOTIATE)
======================================================================

A. No local assumptions
- Do NOT assume localhost.
- Do NOT add local run instructions.

B. Verification via curl only
- All acceptance must be demonstrable via curl to the deployed Railway domain.

C. No CI/CD
- No GitHub Actions.
- No pipelines.

D. Data operations
- Do NOT introduce migrations tooling.
- Do NOT auto-create tables on boot.
- If schema is required, output SQL only.

E. No hidden variables
- Any influence on agent behavior MUST be written as text.

======================================================================
1) YOUR TASK (MILESTONE 2 IMPLEMENTATION)
======================================================================

Implement endpoint:

POST /beat

POST /beat exists to permit a beat without user speech.

Request:
- Content-Type: application/json
- Body:
  - focus: string (required). Must equal "REBECCA".
  - request_id: string (required).
  - system_direction: string (optional).

system_direction RULES (ABSOLUTE):
- If present, system_direction MUST be written as a public block BEFORE any Rebecca block.
- The block MUST have:
  - source = "SYSTEM"
  - evidence_text = system_direction
- system_direction:
  - is not user speech
  - is not world intent
  - must not imply outcomes
  - exists only to preserve causal traceability

Response:

Outcome A: Rebecca writes
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: array in chronological order:
    - optional SYSTEM block
    - exactly one REBECCA block

Outcome B: Rebecca does not write
- HTTP 200
- JSON:
  - wrote: false
  - request_id
  - public_blocks: empty OR containing only SYSTEM block if written

Idempotency:
- Same request_id must return identical response.
- No additional rows created.

======================================================================
2) DATABASE REQUIREMENTS
======================================================================

Milestone 2 reuses public_evidence_blocks.
No schema changes required.

======================================================================
3) IMPLEMENTATION RULES
======================================================================

- POST /beat MUST NEVER write a GEORGE block.
- Write-before-show is absolute.
- Silence is valid: wrote:false is acceptable.
- No background triggers.
- No timers.
- No polling.

======================================================================
4) ACCEPTANCE TESTS (CURL ONLY)
======================================================================

Assume:
BASE=https://<RAILWAY_PUBLIC_DOMAIN>

Test 1: Beat without direction
curl -i -X POST "$BASE/beat" \
  -H "Content-Type: application/json" \
  -d '{
    "focus":"REBECCA",
    "request_id":"m2-test-0001"
  }'

Expected:
- HTTP 200
- wrote true or false
- If wrote true, public_blocks length = 1 (REBECCA)

Test 2: Beat with system_direction
curl -i -X POST "$BASE/beat" \
  -H "Content-Type: application/json" \
  -d '{
    "focus":"REBECCA",
    "system_direction":"The room is quiet.",
    "request_id":"m2-test-0002"
  }'

Expected:
- SYSTEM block first
- Optional REBECCA block second

======================================================================
5) COMMIT DISCIPLINE
======================================================================

- One commit for M2.
- No M3 logic.
- No refactors.

END WORK ORDER PACKET — MILESTONE 2