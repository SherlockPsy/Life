# Contract: Scene Anchor Pack (Cached Setup)
STATUS: BINDING
SCOPE: Scene setup caching and reintroduction.

Scene setup is sent once and treated as cached context.
It must not be resent every beat.
It is reintroduced only:
- near context exhaustion, OR
- explicit scene change.

Scene anchors are NATURAL LANGUAGE ONLY.

---

## 1) Canonical JSON Shape

```json
{
  "scene_anchor_id": "string",
  "request_id": "string",
  "created_at_world": "string",
  "text": "string",
  "provenance": {
    "used_entry_ids": ["string"]
  }
}


⸻

2) MUST Rules
	•	text MUST be natural language only.
	•	provenance.used_entry_ids MUST reference ledger sources used.
	•	Scene anchors MUST NOT contain labels/state variables/numeric fields as “world state”.

⸻

3) MUST NOT Rules
	•	MUST NOT include “rehydration” meta language.
	•	MUST NOT include hidden directive content (“make it dramatic”, “keep it interesting”).

⸻

4) Valid Example (Sketch)

{
  "scene_anchor_id":"sa:00000001",
  "request_id":"mvp-00000020",
  "created_at_world":"2026-01-01T07:30:10+00:00",
  "text":"You are in bed. Morning light spills across the room. Rebecca is beside you, half-awake. The air is quiet and close.",
  "provenance":{"used_entry_ids":["e:00000001","e:00000002","e:00000003"]}
}


⸻

END OF CONTRACT