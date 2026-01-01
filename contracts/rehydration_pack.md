# Contract: Rehydration Pack (Context Limit Recovery)
STATUS: BINDING
SCOPE: Context reintroduction near token limits.

Rehydration:
- is triggered mechanically (not semantically),
- occurs only at beat boundaries,
- is atomic: complete or do not proceed,
- is invisible in lived experience,
- is NATURAL LANGUAGE ONLY,
- includes physical continuity replay binding.

---

## 1) Canonical JSON Shape

```json
{
  "rehydration_id": "string",
  "request_id": "string",
  "created_at_world": "string",
  "text": "string",
  "physical_continuity_replay": "string",
  "provenance": {
    "used_entry_ids": ["string"],
    "used_capsule_ids": ["string"]
  },
  "trigger": {
    "kind": "TOKEN_BUDGET",
    "threshold": "string"
  }
}


⸻

2) MUST Rules
	•	MUST be produced only at beat boundary.
	•	text MUST be natural language only.
	•	physical_continuity_replay MUST be present and binding.
	•	If rehydration fails, system MUST retry until success (no partial proceed).
	•	provenance MUST be present.

⸻

3) MUST NOT Rules
	•	MUST NOT mention context windows or rehydration in the text.
	•	MUST NOT include labels/state vars as world-state.
	•	MUST NOT happen mid-action.

⸻

4) Valid Example (Sketch)

{
  "rehydration_id":"rh:00000001",
  "request_id":"mvp-00001000",
  "created_at_world":"2026-01-01T07:45:00+00:00",
  "text":"You are still in the bedroom. The morning light is brighter now. Rebecca remains nearby, alert and watching you. The room is quiet except for your breathing.",
  "physical_continuity_replay":"Your body is upright in bed; your hand is near the edge of the blanket; Rebecca is on her side facing you at close distance.",
  "provenance":{"used_entry_ids":["e:00000100","e:00000101"],"used_capsule_ids":["cap:REBECCA:v1"]},
  "trigger":{"kind":"TOKEN_BUDGET","threshold":"NEAR_EXHAUSTION"}
}


⸻

END OF CONTRACT