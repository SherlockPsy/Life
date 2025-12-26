EXECUTION CANON — MILESTONE 8 — NEW PEOPLE CAN ENTER LIFE
Status: Binding / Non-negotiable

0. Purpose
New people can appear as textually defined agents, without global awareness.

1. Required invocations (HTTP surface)
1.1 POST /world/person
- Purpose: introduce a new person into the world.

2. Request truth
2.1 POST /world/person
- Content-Type: application/json
- Body schema:
  - name: string (required)
  - introduction_text: string (required)
  - request_id: string (required)

3. Writing rules
3.1 Introduction block
- Written as a public block
- source MUST equal "WORLD"
- evidence_text MUST include the name verbatim

Example:
"Marcus joins the table. He looks tired."

3.2 Identity linkage
- The system must internally associate this name with:
  - one personality template reference
  - an empty private ledger

No identity exposition is written publicly unless later spoken.

4. Rereading rules
4.1 New agents:
- Do not speak until invoked by:
  - direct address
  - world fact
  - later milestone mechanisms

5. Proof by curl
curl -i -X POST "$BASE/world/person" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Marcus",
    "introduction_text":"Marcus joins the table. He looks annoyed.",
    "request_id":"m8-test-0001"
  }'

6. Forbidden improvisations
- No auto-dialogue
- No backstory dumps
- No omniscient descriptions