# Contract: Write Entry
STATUS: BINDING
SCOPE: Any committed text that becomes part of reality (ledger).

A Write Entry is the smallest unit of written reality.
Reality is append-only. Past entries are never edited.
Corrections are new entries.

This contract defines structural metadata (non-semantic) required for ordering, attribution, visibility, and display channel.
The entry TEXT is the authoritative substrate.

---

## 1) Canonical JSON Shape

```json
{
  "entry_id": "string|null",
  "bundle_id": "string|null",
  "request_id": "string",
  "created_at_world": "string",
  "author": {
    "author_id": "string",
    "author_class": "OPERATOR|PERSON|WORLD|SYSTEM"
  },
  "visibility": {
    "scope": "PUBLIC|PRIVATE",
    "visible_to": ["string"]
  },
  "channel": "USER|VOICE|PEOPLE",
  "text": "string"
}

Notes:
	•	entry_id and bundle_id are assigned by the ledger on commit; they may be null in proposals.
	•	created_at_world is the authoritative world time coordinate for ordering (format defined by Time Engine).
	•	visibility.visible_to is only meaningful when scope is PRIVATE.

⸻

2) Field Semantics

2.1 request_id
	•	MUST be present.
	•	MUST match the invocation request_id that caused the write.
	•	MUST be used for idempotency trace.

2.2 created_at_world
	•	MUST be present.
	•	MUST be real calendar time string.
	•	MUST be consistent with the Time Engine’s current world time or explicit override semantics.

2.3 author
	•	MUST be present.
	•	author_id MUST be explicit.
	•	Examples: “GEORGE”, “REBECCA”, “WORLD”, “SYSTEM_INVOKER”
	•	author_class MUST be explicit and one of:
	•	OPERATOR (George)
	•	PERSON (Rebecca or other people)
	•	WORLD (world-generated)
	•	SYSTEM (mechanical system writes, if allowed; should be rare and explicit)

2.4 visibility
	•	MUST be present.
	•	scope MUST be PUBLIC or PRIVATE.
	•	If scope is PUBLIC:
	•	visible_to MUST be empty array or omitted by implementation (but contract shape keeps it explicit).
	•	If scope is PRIVATE:
	•	visible_to MUST contain at least one identity string.
	•	The projection layer MUST enforce visibility (no leakage).

2.5 channel (display channel)

This is display classification, not “world stats”.
	•	USER:
	•	verbatim operator input
	•	unlabeled in UI
	•	VOICE:
	•	world descriptor projection text
	•	unlabeled in UI
	•	second-person objective prose (rendering rule lives outside this contract, but this channel enables the UI rule)
	•	PEOPLE:
	•	character dialogue/action
	•	labeled in UI (small caps header with author name)

2.6 text
	•	MUST be present.
	•	MUST be non-empty unless the system explicitly allows empty entries (default: forbidden).
	•	MUST be treated as authoritative reality text.
	•	MUST NOT contain system meta such as “rehydrating…” or “context window…” (enforced by tests/prohibitions).

⸻

3) MUST Rules
	•	Every committed entry MUST have explicit author attribution.
	•	Every committed entry MUST have created_at_world.
	•	Every committed entry MUST have a channel.
	•	Every committed entry MUST have visibility scope.
	•	The ledger MUST never modify entry.text after commit.

⸻

4) MUST NOT Rules
	•	MUST NOT store hidden semantic state in metadata fields.
	•	MUST NOT store “mood meters”, “stats”, “HP”, “relationship scores”, etc. anywhere in metadata.
	•	MUST NOT rewrite past entries.
	•	MUST NOT retroactively “correct” created_at_world to maintain continuity.

⸻

5) Forbidden Examples

5.1 Missing author (INVALID)

{
  "request_id":"x",
  "created_at_world":"2026-01-01T02:00:00Z",
  "visibility":{"scope":"PUBLIC","visible_to":[]},
  "channel":"VOICE",
  "text":"You stare at the ceiling."
}

5.2 Channel is a game label (INVALID)

{
  "request_id":"x",
  "created_at_world":"2026-01-01T02:00:00Z",
  "author":{"author_id":"WORLD","author_class":"WORLD"},
  "visibility":{"scope":"PUBLIC","visible_to":[]},
  "channel":"XP_GAIN",
  "text":"+10 XP"
}


⸻

6) Valid Example

{
  "entry_id": null,
  "bundle_id": null,
  "request_id":"mvp-00000001",
  "created_at_world":"2026-01-01T07:30:00+00:00",
  "author":{"author_id":"GEORGE","author_class":"OPERATOR"},
  "visibility":{"scope":"PUBLIC","visible_to":[]},
  "channel":"USER",
  "text":"I move closer to you and whisper: Hm... I have never told you but... it is time to reveal the truth..."
}


⸻

END OF CONTRACT