# Contract: Invocation Envelope
STATUS: BINDING
SCOPE: All runtime calls that may cause a beat, tool loop, write proposal, write commit, projection refresh, or no-write.

This contract defines the single input shape the system accepts from the UI (and any other client). It exists to enforce:
- idempotency,
- non-user-centric LLM posture (LLM “user” is NOT George),
- explicitness of operator declarations (including time declarations),
- separation of operator input from system invoker identity.

This is a STRUCTURAL contract. Nothing here is world-state.

---

## 1) Canonical JSON Shape

```json
{
  "request_id": "string",
  "invoker": {
    "invoker_id": "string",
    "invoker_role": "INVOKER",
    "notes": "string|null"
  },
  "operator": {
    "operator_id": "GEORGE",
    "input_text": "string"
  },
  "mode": {
    "kind": "BEAT",
    "client_intent": "string|null"
  },
  "declared_overrides": {
    "time": {
      "declared_world_time": "string|null",
      "timezone": "string|null"
    },
    "pause_time": "boolean|null"
  },
  "ui": {
    "stream_cursor": "string|null",
    "client_timestamp_utc": "string|null"
  }
}


⸻

2) Field Semantics

2.1 request_id
	•	MUST be present.
	•	MUST be globally unique for new invocations.
	•	MUST be treated as idempotency key.
	•	MUST be stored with the outcome so that replay returns identical output.

2.2 invoker
	•	MUST be present.
	•	invoker_role MUST equal "INVOKER".
	•	invoker_id identifies the entity the system treats as the “user” of LLMs.
	•	MUST NOT be "GEORGE".
	•	MUST NOT be a human user identifier.
	•	Notes exist only for logging/audit; MUST NOT be treated as world facts.

2.3 operator
	•	MUST be present.
	•	operator_id MUST be "GEORGE".
	•	input_text:
	•	MUST be captured verbatim.
	•	MUST be committed as USER channel text (verbatim) when a beat accepts operator input as part of the record.
	•	MUST NOT be rewritten, “cleaned,” re-phrased, summarized, or corrected by the system.

2.4 mode
	•	kind MUST be one of:
	•	"BEAT" (normal progression tick)
	•	"NO_OP" (projection refresh only; no writes allowed)
	•	client_intent is optional UI hint:
	•	MUST NOT be treated as directive or plot steering.
	•	MAY be logged.
	•	MUST NOT influence “interest,” “drama,” or pacing.

2.5 declared_overrides

These are explicit operator declarations that bind the world if used.
	•	time.declared_world_time:
	•	if present and non-null, MUST be treated as an explicit time declaration.
	•	MUST be written into the record as an explicit constraint (not as a “mistake correction”).
	•	MUST NOT cause invention of intervening events.
	•	timezone:
	•	optional; if absent, system default timezone applies.
	•	pause_time:
	•	optional; if true, system enters paused time mode.
	•	if false, resumes mechanical progression.

2.6 ui
	•	stream_cursor:
	•	optional stable cursor used to request incremental projection updates.
	•	MUST NOT influence reality.
	•	client_timestamp_utc:
	•	optional; for debugging/latency tracking.
	•	MUST NOT be used as authoritative world time.

⸻

3) MUST Rules
	•	MUST reject (HTTP 400) if request_id is missing or empty.
	•	MUST reject if invoker is missing or invoker_role != “INVOKER”.
	•	MUST reject if operator is missing or operator_id != “GEORGE”.
	•	MUST treat operator.input_text as verbatim user text.
	•	MUST ensure idempotency: same request_id yields identical outcome payload and does not create new writes.

⸻

4) MUST NOT Rules
	•	MUST NOT treat George as the “user” of the LLM.
	•	MUST NOT interpret client_intent as instruction.
	•	MUST NOT auto-fill or infer declared_overrides.
	•	MUST NOT “fix” operator time declarations.
	•	MUST NOT transform operator.input_text.

⸻

5) Forbidden Examples

5.1 Missing request_id (INVALID)

{
  "invoker": {"invoker_id":"SYSTEM_INVOKER","invoker_role":"INVOKER"},
  "operator": {"operator_id":"GEORGE","input_text":"Hello"}
}

5.2 Invoker is George (INVALID)

{
  "request_id":"abc",
  "invoker":{"invoker_id":"GEORGE","invoker_role":"INVOKER"},
  "operator":{"operator_id":"GEORGE","input_text":"Hello"},
  "mode":{"kind":"BEAT","client_intent":null},
  "declared_overrides":{"time":{"declared_world_time":null,"timezone":null},"pause_time":null},
  "ui":{"stream_cursor":null,"client_timestamp_utc":null}
}


⸻

6) Valid Example

{
  "request_id":"mvp-00000001",
  "invoker":{"invoker_id":"SYSTEM_INVOKER","invoker_role":"INVOKER","notes":null},
  "operator":{"operator_id":"GEORGE","input_text":"I sit up in bed and look toward you."},
  "mode":{"kind":"BEAT","client_intent":null},
  "declared_overrides":{"time":{"declared_world_time":null,"timezone":"Europe/London"},"pause_time":null},
  "ui":{"stream_cursor":null,"client_timestamp_utc":"2026-01-01T02:00:00Z"}
}


⸻

END OF CONTRACT