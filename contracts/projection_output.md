# Contract: Projection Output (UI Stream Payload)
STATUS: BINDING
SCOPE: Anything rendered on screen (Perceptual Stream + Pocket).

Projection is not reality.
Projection MUST be derived from written reality (ledger) and visibility rules.
Projection MUST NOT create facts.
Projection MUST NOT “repair” gaps.

This contract is what the UI renders.

---

## 1) Canonical JSON Shape

```json
{
  "request_id": "string",
  "stream": {
    "cursor_before": "string|null",
    "cursor_after": "string|null",
    "entries": [
      {
        "entry_id": "string",
        "created_at_world": "string",
        "channel": "USER|VOICE|PEOPLE",
        "author_label": "string|null",
        "text": "string"
      }
    ]
  },
  "pocket": {
    "is_available": "boolean",
    "clock": {
      "world_time": "string|null",
      "timezone": "string|null"
    },
    "calendar": {
      "items": [
        { "title":"string", "time":"string|null", "location":"string|null", "notes":"string|null" }
      ]
    },
    "messages": {
      "items": [
        { "from":"string", "text":"string", "time":"string|null" }
      ]
    }
  },
  "debug": {
    "wrote": "boolean",
    "bundle_id": "string|null"
  }
}


⸻

2) Stream Rules

2.1 Entries
	•	MUST be ordered by created_at_world then ledger ordering.
	•	Each stream entry MUST correspond to a committed WriteEntry in the ledger.
	•	author_label:
	•	MUST be null for USER and VOICE.
	•	MUST be non-null for PEOPLE (e.g., “REBECCA”) and matches display label rule.
	•	text MUST be exactly the ledger text; no projection edits.

2.2 Cursor semantics
	•	cursor_* are opaque tokens.
	•	MUST support incremental fetch (“give me new since cursor_before”).
	•	Cursor must not affect reality.

⸻

3) Pocket Rules
	•	Pocket is a separate channel.
	•	Pocket MUST NOT appear as popups inside the stream.
	•	Pocket content is allowed to be a tool surface.
	•	Pocket MUST respect knowledge boundaries (no private leakage).

⸻

4) MUST Rules
	•	Projection MUST be ledger-backed.
	•	Projection MUST enforce visibility.
	•	Projection MUST be consistent across idempotency replay (same request_id yields identical output).
	•	Silence is valid: stream.entries may be empty for a beat.

⸻

5) MUST NOT Rules
	•	MUST NOT add “connective tissue” text between entries.
	•	MUST NOT invent implied actions.
	•	MUST NOT show private entries to unauthorized viewers.

⸻

6) Valid Example

{
  "request_id":"mvp-00000001",
  "stream":{
    "cursor_before":null,
    "cursor_after":"c:00000010",
    "entries":[
      {
        "entry_id":"e:00000001",
        "created_at_world":"2026-01-01T07:30:00+00:00",
        "channel":"USER",
        "author_label":null,
        "text":"I move closer to you and whisper: Hm... I have never told you but... it is time to reveal the truth..."
      },
      {
        "entry_id":"e:00000002",
        "created_at_world":"2026-01-01T07:30:05+00:00",
        "channel":"VOICE",
        "author_label":null,
        "text":"You feel the warmth of her body beside you in the pale morning light."
      },
      {
        "entry_id":"e:00000003",
        "created_at_world":"2026-01-01T07:30:07+00:00",
        "channel":"PEOPLE",
        "author_label":"REBECCA",
        "text":"She blinks, still waking. \"What truth?\""
      }
    ]
  },
  "pocket":{
    "is_available":true,
    "clock":{"world_time":"2026-01-01T07:30:07+00:00","timezone":"Europe/London"},
    "calendar":{"items":[]},
    "messages":{"items":[]}
  },
  "debug":{"wrote":true,"bundle_id":"b:00000001"}
}


⸻

END OF CONTRACT