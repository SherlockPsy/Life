COPILOT WORK ORDER PACKET — MILESTONE 7
Project: SherlockPsy Life

Authority Order (binding, descending):
- MASTER_CONSTITUTION.md
- MASTER_INFRASTRUCTURE.md
- MASTER_RUNTIME.md
- MASTER_WORLD.md
- TOTAL_PLAN.md
- copilot-instructions.md
- THIS WORK ORDER (M7)

Milestone Target: M7 — THE WORLD INTRODUCES FACTS (WORLD FACT SEEDS)
Scope: Implement ONLY Milestone 7 endpoint and writing rules. Keep M0–M6 intact.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

A) The World is not an agent
- The World has no intent.
- The World has no goals.
- The World does not choose moments for pacing.
- The World does not decide outcomes.

B) World writes facts only
- Existence-only facts.
- No internal-state authority.
- No guaranteed outcomes.

C) V6 grounding rule MUST be enforced (no floating stimuli)
If a fact introduces a stimulus (doorbell, knock, vibration, notification, email, call), the fact must be grounded in the same writing act by including:
- where it happens (location)
- what is stimulated (which door/which phone/which device)
- who can perceive it (or that it is objectively occurring in the space)

Floating stimuli are forbidden.

D) No countdown plotting
- No “in N beats/minutes/hours…” hooks unless it is a written real-life commitment.

======================================================================
1) YOUR TASK (MILESTONE 7 IMPLEMENTATION)
======================================================================

1) Implement the endpoint exactly as per TOTAL_PLAN:

POST /world/fact

Request JSON:
- fact_text: string (required)
- request_id: string (required)

Response JSON:
- wrote: true
- request_id
- public_blocks: array containing exactly one WORLD block

2) Writing:
- Write a single public block:
  - source = "WORLD"
  - evidence_text = fact_text

3) Validation:
- Reject (HTTP 400) if:
  - request is missing required fields, OR
  - fact_text violates the v6 grounding rule in an obvious “floating stimulus” way.

This validation is not “director logic.”
This is integrity enforcement to prevent invalid world writes.

======================================================================
2) ACCEPTANCE TEST (CURL)
======================================================================

A) Valid grounded stimulus
curl -i -X POST "$BASE/world/fact" \
  -H "Content-Type: application/json" \
  -d '{
    "fact_text":"From the hallway, the flat’s front doorbell rings once.",
    "request_id":"m7-test-0001"
  }'

Expected:
- HTTP 200
- JSON shows one WORLD block written
- No follow-up behavior
- No agent reaction is forced

B) Invalid floating stimulus (must be rejected)
curl -i -X POST "$BASE/world/fact" \
  -H "Content-Type: application/json" \
  -d '{
    "fact_text":"The doorbell rings.",
    "request_id":"m7-test-0002"
  }'

Expected:
- HTTP 400
- wrote: false
- error: "invalid_world_fact" (or equivalent)

C) Idempotency
- Repeat request_id m7-test-0001
Expected:
- The exact stored response is returned
- No new write occurs

======================================================================
3) COMMIT DISCIPLINE
======================================================================

- Commit only the /world/fact endpoint and its write/validation path.
- No agent reactions.
- No additional world logic.
- No refactors outside this endpoint.

END WORK ORDER PACKET — MILESTONE 7