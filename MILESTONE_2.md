EXECUTION CANON — MILESTONE 2 — REBECCA CAN SPEAK WITHOUT YOU
Status: Binding / Non-negotiable

0. Purpose
Rebecca can initiate a beat without a user message being introduced at that moment.

1. Required invocations (HTTP surface)
1.1 POST /beat
- Purpose: permit the next beat to be written without user text.

1.2 GET /public/latest?n=<int>
- Carries over unchanged from Milestone 1.

2. Request truth
2.1 POST /beat
- Content-Type: application/json
- Body schema:
  - focus: string (required). Must equal "REBECCA".
  - request_id: string (required). Unique per invocation.
  - prompt: string (optional). If present, it is not “user speech”, it is merely a hint. It is NOT written as public text.

3. Response truth
3.1 POST /beat has only two valid outcomes:

Outcome A: Rebecca writes a beat
- HTTP 200
- JSON:
  - wrote: true
  - request_id: string
  - public_blocks: array of exactly 1 item (Rebecca block)

Outcome B: no beat written
- HTTP 200
- JSON:
  - wrote: false
  - request_id: string
  - public_blocks: empty array

4. Writing rules
4.1 POST /beat must never write a “GEORGE” public block.
4.2 Write-before-show rule remains absolute.
4.3 Idempotency by request_id remains absolute.

5. Rereading rules
5.1 Rebecca may reread a bounded recent public window (implementation choice).
5.2 No Qdrant retrieval is required/permitted at this milestone.

6. Failure posture
6.1 If a beat cannot be written cleanly:
- Must return wrote:false
- Must write nothing.

7. Proof by curl
curl -i -X POST "$BASE/beat" \
  -H "Content-Type: application/json" \
  -d '{
    "focus":"REBECCA",
    "request_id":"m2-test-0001",
    "prompt":""
  }'

Expected:
- HTTP 200
- wrote true or false
- if wrote true: public_blocks[0].source == "REBECCA"

8. Forbidden improvisations
- POST /beat must not fabricate a user message.
- No “because you said earlier…” if it is not supported by recent reread.
- No world facts introduced here (that is Milestone 7).