COPILOT WORK ORDER PACKET — MILESTONE 7
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_WORLD.md + MASTER_RUNTIME.md + copilot-instructions.md
Milestone Target: M7 — THE WORLD INTRODUCES FACTS
Scope: Implement ONLY Milestone 7. Keep M0–M6 intact.

======================================================================
0) ABSOLUTE CONSTRAINTS
======================================================================

- The World is NOT an agent.
- The World has no memory.
- The World has no intent.
- The World writes facts and withdraws.

======================================================================
1) YOUR TASK (MILESTONE 7 IMPLEMENTATION)
======================================================================

Implement endpoint:

POST /world/seed

Purpose:
- Introduce a bare fact into public reality.

Request:
- Content-Type: application/json
- Body:
  - fact_text: string (required)
  - request_id: string (required)

Writing rules:
- Write exactly ONE public block.
- source MUST equal "WORLD".
- evidence_text MUST equal fact_text.
- fact_text MUST:
  - assert existence only
  - imply no awareness
  - imply no outcome

Examples of valid facts:
- "The doorbell rings."
- "It starts raining outside."

Examples of forbidden facts:
- "Rebecca hears the doorbell."
- "The rain makes George nostalgic."

Response:
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: array containing exactly the WORLD block

Idempotency:
- Same request_id must not create duplicate blocks.

======================================================================
2) DATABASE REQUIREMENTS
======================================================================

- Reuse public_evidence_blocks.
- Embed WORLD blocks into Qdrant like any other public block.

======================================================================
3) ACCEPTANCE TESTS
======================================================================

curl -i -X POST "$BASE/world/seed" \
  -H "Content-Type: application/json" \
  -d '{
    "fact_text":"The phone vibrates on the table.",
    "request_id":"m7-test-0001"
  }'

Expected:
- One WORLD block written
- No follow-up behavior

======================================================================
4) COMMIT DISCIPLINE
======================================================================

- Commit only /world/seed.
- No agent reactions.

END WORK ORDER PACKET — MILESTONE 7