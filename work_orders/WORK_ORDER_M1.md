COPILOT WORK ORDER PACKET — MILESTONE 1
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_CONSTITUTION.md + MASTER_INFRASTRUCTURE.md + MASTER_RUNTIME.md + copilot-instructions.md
Milestone Target: M1 — YOU CAN SPEAK TO REBECCA
Scope: Implement ONLY Milestone 1 (and keep Milestone 0 working). Do not implement any other milestone.

======================================================================
0) ABSOLUTE CONSTRAINTS (DO NOT NEGOTIATE)
======================================================================

A. No local assumptions, ever
- Do NOT assume localhost exists.
- Do NOT add documentation that instructs running locally.
- Do NOT add scripts that require local environment setup.

B. Verification is curl only
- All acceptance is via curl to the deployed domain.

C. No CI/CD pipelines
- Do NOT add CI.

D. Data operations rule
- The application MUST NOT auto-migrate.
- The application MUST NOT create tables automatically.
- If schema is required, you must output SQL that the operator (George) will run directly against Postgres.

E. “Write-before-show”
- If text appears in an HTTP response, it MUST already be written to Postgres.

F. No hidden state
- No in-memory “current conversation”.
- No local file persistence.
- No caches that become truth.

======================================================================
1) YOUR TASK (MILESTONE 1 IMPLEMENTATION)
======================================================================

Implement endpoints:

1) POST /say
2) GET /public/latest?n=<int>

POST /say must:
- Accept JSON:
  - speaker: must equal "GEORGE"
  - addressee: must equal "REBECCA"
  - text: string
  - request_id: unique string

- Always write one public block for GEORGE.
- Optionally write one public block for REBECCA (0 or 1).
- Return:
  Outcome A (Rebecca wrote):
    wrote: true
    request_id
    public_blocks: [GEORGE_BLOCK, REBECCA_BLOCK] in chronological order
  Outcome B (Rebecca did not write):
    wrote: false
    request_id
    public_blocks: [GEORGE_BLOCK]

Each public block must include:
- id: integer
- source: "GEORGE" or "REBECCA"
- location_token: string (use "UNSPECIFIED" for now)
- evidence_text: string
- created_at_utc: ISO 8601

Idempotency:
- If POST /say is called again with the same request_id:
  - Return the same response as the first time
  - Do NOT create additional blocks

GET /public/latest must:
- Return JSON:
  - blocks: array of public blocks ordered OLDEST → NEWEST
- n must be 1..200

Milestone 1 uses Postgres as authoritative store.
Milestone 1 does not require Qdrant.
Milestone 1 does not require LLM calls if you can generate a placeholder Rebecca response deterministically, BUT:
- You MUST NOT invent “narration” or multi-paragraph scenes.
- If you choose to produce Rebecca text, it must be one small lived beat.
- If you cannot produce a plausible beat without model calls, wrote:false is valid.

======================================================================
2) DATABASE REQUIREMENT (SQL OUTPUT REQUIRED)
======================================================================

You MUST output a single SQL file content (in your response) named:
sql/m1_public_blocks.sql

This SQL must create the table required for public evidence blocks.

Required table: public_evidence_blocks

Minimum columns:
- id BIGSERIAL PRIMARY KEY
- source TEXT NOT NULL
- location_token TEXT NOT NULL
- evidence_text TEXT NOT NULL
- created_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW()

Additional columns are forbidden at this milestone unless absolutely required.

The operator will run this SQL manually in Postgres.

The application must read DATABASE_URL from environment.

======================================================================
3) REQUIRED OUTPUTS (DELIVERABLES)
======================================================================

You MUST produce:
1) Exact code changes (files modified/added).
2) The SQL file content for table creation.
3) Curl commands proving the endpoint behaviour on deployed domain.

You MUST NOT produce:
- long explanations
- future milestone work
- schema beyond what is necessary

======================================================================
4) ACCEPTANCE TESTS (CURL ONLY)
======================================================================

Assume:
BASE=https://<RAILWAY_PUBLIC_DOMAIN>

Test 1: Say
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"Hello.",
    "request_id":"m1-test-0001"
  }'

Expected:
- HTTP 200
- wrote true or false
- public_blocks length 2 (if wrote true) or 1 (if wrote false)
- First block source is GEORGE

Test 2: Idempotency
Run the same curl again with same request_id.
Expected:
- Identical response
- No new row created

Test 3: Read latest
curl -i "$BASE/public/latest?n=10"

Expected:
- HTTP 200
- blocks ordered OLDEST → NEWEST
- Includes GEORGE block (and REBECCA if written)

======================================================================
5) COMMIT DISCIPLINE
======================================================================

- One commit for M1 changes.
- Do not bundle M2 or Qdrant.
- Keep M0 /health intact.

END WORK ORDER PACKET — MILESTONE 1