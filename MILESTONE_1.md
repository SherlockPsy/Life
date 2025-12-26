EXECUTION CANON — MILESTONE 1 — YOU CAN SPEAK TO REBECCA
Status: Binding / Non-negotiable

0. Purpose
A first human exchange exists as written public text: you write, Rebecca may write.

1. Required invocations (HTTP surface)
1.1 POST /say
- Purpose: introduce your utterance into public text and permit Rebecca to write one beat (or nothing).

1.2 GET /public/latest?n=<int>
- Purpose: read the most recent public text in strict order.

2. Request truth
2.1 POST /say
- Content-Type: application/json
- Body schema:
  - speaker: string (required). Must equal "GEORGE".
  - addressee: string (required). Must equal "REBECCA".
  - text: string (required). Your message.
  - request_id: string (required). Unique per invocation; used to prevent accidental double-writing.

Notes:
- request_id is not “story state”. It is a network safety key.
- request_id must be treated as a write-once marker only.

2.2 GET /public/latest
- Query:
  - n: integer (required, 1..200)

3. Response truth
3.1 POST /say has only two valid outcomes:

Outcome A: Rebecca writes a beat
- HTTP 200
- JSON body keys:
  - wrote: true
  - request_id: string (echo)
  - public_blocks: array of exactly 2 items, ordered:
    1) your utterance block
    2) Rebecca utterance block
Each block object must contain:
  - id: integer
  - source: string ("GEORGE" or "REBECCA")
  - location_token: string (may be "UNSPECIFIED" at this milestone)
  - evidence_text: string
  - created_at_utc: string (ISO 8601)

Outcome B: no beat is written by Rebecca
- HTTP 200
- JSON body keys:
  - wrote: false
  - request_id: string (echo)
  - public_blocks: array of exactly 1 item (your utterance block)

3.2 GET /public/latest
- HTTP 200
- JSON body:
  - blocks: array (most recent first OR oldest first — pick ONE and lock it here)

LOCKED ORDER RULE:
- blocks MUST be returned OLDEST→NEWEST (chronological). This avoids argument forever.

Each block contains the same fields as above.

4. Writing rules (ledger discipline)
4.1 Write-before-show rule (absolute)
- If any block appears in the HTTP response, that exact text must already be committed to Postgres.

4.2 Public writing requirements
- Your utterance MUST always be written as a public block.
- Rebecca utterance MAY be written (0 or 1), never more than 1.

4.3 No mutation rule
- No public block may ever be updated or deleted.

4.4 Idempotency rule (request_id)
- If POST /say is invoked again with the same request_id:
  - Must return the same response as the first time
  - Must not create additional blocks

5. Rereading rules
5.1 Milestone 1 rereads only what is necessary to speak once.
- Minimum allowed reread: the immediate recent public blocks (implementation choice is allowed).
- No retrieval from Qdrant is permitted/required at this milestone.

6. Failure posture
6.1 If the write of your utterance fails:
- Must return HTTP 500 and wrote:false
- Must write nothing (no partial write).

6.2 If Rebecca writing fails after your utterance is written:
- Must return HTTP 200 with wrote:false and only your block returned.
- No “half” Rebecca block.

7. Proof by curl
Assume:
- BASE=https://<your-deployed-domain>

7.1 Say something
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"We are at a restaurant. How are you?",
    "request_id":"m1-test-0001"
  }'

Expected:
- HTTP 200
- wrote true or false
- public_blocks length 2 or 1 respectively

7.2 Read latest public text
curl -i "$BASE/public/latest?n=10"

Expected:
- HTTP 200
- blocks in chronological order
- includes your utterance block and maybe Rebecca’s beat

8. Forbidden improvisations
- No multi-paragraph “scene”.
- No future writing.
- No summaries of history.
- No “system messages” in-world.
- No auto-injection of other people or world facts.