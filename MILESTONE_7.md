EXECUTION CANON — MILESTONE 7 — THE WORLD INTRODUCES FACTS
Status: Binding / Non-negotiable

0. Purpose
The world may introduce new facts without awareness or intent.

1. Required invocations (HTTP surface)
1.1 POST /world/seed
- Purpose: introduce a minimal fact into public text.

2. Request truth
2.1 POST /world/seed
- Content-Type: application/json
- Body schema:
  - fact_text: string (required)
  - request_id: string (required)

3. Writing rules
3.1 World fact block
- Written as a public block
- source MUST equal "WORLD"
- evidence_text must be exactly fact_text
- No interpretation, no emotion, no consequence

Examples of valid fact_text:
- "Marcus calls George."
- "It starts raining."
- "A new couple sits at the table nearby."

3.2 Forbidden fact_text
- Anything implying intent, reaction, or outcome
- Anything longer than a single factual assertion

4. Rereading rules
4.1 World facts:
- Exist globally
- Are not automatically reread by agents
- Influence only when encountered through later reread windows

5. Proof by curl
curl -i -X POST "$BASE/world/seed" \
  -H "Content-Type: application/json" \
  -d '{
    "fact_text":"Marcus calls George.",
    "request_id":"m7-test-0001"
  }'

Expected:
- HTTP 200
- public_blocks[0].source == "WORLD"

6. Forbidden improvisations
- No automatic agent response
- No follow-up action
- No interpretation layer