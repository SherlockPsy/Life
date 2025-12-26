EXECUTION CANON — MILESTONE 4 — CONTINUITY FROM RECENT TEXT
Status: Binding / Non-negotiable

0. Purpose
Rebecca’s writing can reflect what happened recently, grounded only in written text.

1. Required invocations (HTTP surface)
Carries over:
- POST /say
- POST /beat
- GET /public/latest

No new endpoints required.

2. Rereading contract (this is the point of the milestone)
2.1 Recent reread window
- Before Rebecca writes a beat, the system must assemble a “recent window” of public blocks.
- The window is bounded by COUNT, not by time.
- LOCKED VALUE: RECENT_PUBLIC_N = 80 blocks
(Reason: not a world meter; it is a context window cap.)

2.2 What “continuity” means (binding)
- Rebecca’s beat must be produced from:
  - her referenced identity text(s)
  - the recent public window
  - (optional) the immediate user utterance in the same invocation (already included if written)
- No other continuity source is permitted.

3. Writing rules
3.1 Nothing new is written beyond the public blocks already defined.
3.2 Write-before-show remains absolute.

4. Proof by curl
4.1 Establish a detail
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"Reminder: tomorrow I pick up my daughter.",
    "request_id":"m4-test-0001"
  }'

4.2 Prompt continuity
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"What’s on tomorrow?",
    "request_id":"m4-test-0002"
  }'

Expected:
- Rebecca may or may not answer, but if she references the earlier detail, it must be because it was in the recent window.

5. Forbidden improvisations
- No “memory” outside the recent window.
- No background summarisation.
- No “thread manager”.