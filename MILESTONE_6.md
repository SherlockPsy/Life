EXECUTION CANON — MILESTONE 6 — PRIVATE LEARNING INFLUENCES SPEECH
Status: Binding / Non-negotiable

0. Purpose
Private learning can influence what an agent says, without being quoted or exposed.

1. Required invocations (HTTP surface)
No new invocations.

Carries over unchanged.

2. Influence rule (binding)
2.1 When an agent writes a public block:
- The agent MAY reread:
  - recent public window
  - its own private ledger entries

2.2 How influence is allowed
- Influence is indirect and stylistic or dispositional
- Private text must NEVER be quoted verbatim unless it later appeared publicly
- Private text must NEVER be mentioned as “remembering” unless textually plausible

3. Consistency constraint
3.1 If a private entry exists stating a preference or aversion:
- Future public writing MAY reflect it
- But must never contradict public evidence without cause

4. Proof by curl (behavioural)
4.1 Establish a preference
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"I really love your calves. They distract me.",
    "request_id":"m6-test-0001"
  }'

Expected:
- Rebecca may react or not
- Private entry MAY be written

4.2 Later tease
curl -i -X POST "$BASE/beat" \
  -H "Content-Type: application/json" \
  -d '{
    "focus":"REBECCA",
    "request_id":"m6-test-0002"
  }'

Expected:
- Rebecca may tease
- Must not explicitly say “I remember you said…”
- Influence must feel natural, not archival

5. Forbidden improvisations
- No explicit “memory recall” narration
- No exposition about private thoughts
- No confidence scores or weights