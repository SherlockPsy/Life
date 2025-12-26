EXECUTION CANON — MILESTONE 3 — REBECCA DOES NOT WAIT FOR YOU
Status: Binding / Non-negotiable

0. Purpose
The system must stop behaving like “answer-and-close”. Rebecca may ignore, redirect, or stay silent.

1. Required invocations (HTTP surface)
Carries over:
- POST /say
- POST /beat
- GET /public/latest

No new endpoints required.

2. Behavioural constraints (binding)
2.1 Non-obligation rule
- POST /say does NOT obligate Rebecca to respond.
- POST /say does NOT obligate topical relevance.

2.2 Valid outcomes for POST /say at this milestone
- Same as Milestone 1:
  - wrote true (2 blocks) OR wrote false (1 block)
But with an added constraint:
- If wrote true, Rebecca’s block may be:
  - directly responsive
  - deflecting
  - redirecting
  - unrelated (if plausible from reread context)
No special marker is required. It is textual realism.

2.3 Valid outcomes for POST /beat
- Same as Milestone 2.

3. Writing rules
3.1 No new writing types.
3.2 The system must not “force” a reply to satisfy UX.
3.3 Silence is valid and must be representable as wrote:false.

4. Rereading rules
4.1 Rebecca rereads only a bounded recent public window.
4.2 No Qdrant retrieval yet.

5. Proof by curl
5.1 Attempt to force a question
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"Answer me: what is 2+2?",
    "request_id":"m3-test-0001"
  }'

Expected:
- HTTP 200
- wrote true or false
- if wrote true: response is not required to answer; it may deflect or redirect.

6. Forbidden improvisations
- No “closing” phrases that end conversation as a system behaviour.
- No auto-generated next prompt to the user.