COPILOT WORK ORDER PACKET — MILESTONE 8
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_WORLD.md + MASTER_INFRASTRUCTURE.md + copilot-instructions.md
Milestone Target: M8 — NEW PEOPLE ENTER LIFE
Scope: Implement ONLY Milestone 8. Keep M0–M7 intact.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- People enter life via text, not code instantiation.
- No backstory dumps.
- No auto-dialogue.

======================================================================
1) YOUR TASK (MILESTONE 8 IMPLEMENTATION)
======================================================================

Implement endpoint:

POST /world/person

Purpose:
- Introduce a new person into public reality.

Request:
- Content-Type: application/json
- Body:
  - name: string (required)
  - introduction_text: string (required)
  - request_id: string (required)

Writing rules:
- Write exactly ONE public block.
- source MUST equal "WORLD".
- evidence_text MUST include:
  - the person’s name
  - the introduction_text verbatim

Internal setup (non-public):
- Create an agent record for the person.
- Associate one personality template reference.
- Initialize empty private ledger for that agent.

Response:
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: array containing the WORLD block

Idempotency:
- Same request_id must not create duplicates.

======================================================================
2) DATABASE REQUIREMENTS
======================================================================

- No new public schema.
- Agent identity linkage may be internal.
- No public exposure of templates.

======================================================================
3) ACCEPTANCE TEST
======================================================================

curl -i -X POST "$BASE/world/person" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Marcus",
    "introduction_text":"Marcus joins you at the table.",
    "request_id":"m8-test-0001"
  }'

Expected:
- One WORLD block
- Marcus exists thereafter as a potential agent

======================================================================
4) COMMIT DISCIPLINE
======================================================================

- Commit only person-introduction logic.
- No personality inference beyond template assignment.

END WORK ORDER PACKET — MILESTONE 8