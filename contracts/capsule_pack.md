

---

## `/contracts/capsule_pack.md`

```md
# Contract: Capsule Pack (Per-Person Continuity View)
STATUS: BINDING
SCOPE: Any per-person capsule assembled for continuity and behavior grounding.

Capsules are NOT authority.
Ledger entries are authority.
Capsules are regeneratable views built from ledger-backed excerpts, optionally with derived non-authoritative notes.

Capsules are NATURAL LANGUAGE SECTIONS with explicit provenance.

---

## 1) Canonical JSON Shape

```json
{
  "capsule_id": "string",
  "person_id": "string",
  "created_at_world": "string",
  "sections": [
    {
      "name": "SOURCE_EXCERPTS",
      "text": "string",
      "provenance": {"used_entry_ids":["string"]}
    },
    {
      "name": "OPTIONAL_DERIVED",
      "text": "string",
      "provenance": {"used_entry_ids":["string"]}
    }
  ]
}


⸻

2) MUST Rules
	•	SOURCE_EXCERPTS section MUST exist.
	•	SOURCE_EXCERPTS.text MUST be composed of verbatim excerpts only (may be concatenated, but excerpts must be exact).
	•	OPTIONAL_DERIVED is allowed, but:
	•	MUST be clearly non-authoritative,
	•	MUST carry provenance,
	•	MUST NOT introduce new facts.

⸻

3) MUST NOT Rules
	•	MUST NOT store hidden semantic state (no meters, no numeric stats).
	•	MUST NOT invent biography, preferences, motives, trauma, etc., unless present in written evidence.
	•	MUST NOT “correct” contradictions; contradictions remain.

⸻

4) Valid Example (Sketch)

{
  "capsule_id":"cap:REBECCA:v1",
  "person_id":"REBECCA",
  "created_at_world":"2026-01-01T07:30:10+00:00",
  "sections":[
    {
      "name":"SOURCE_EXCERPTS",
      "text":"\"What truth?\"",
      "provenance":{"used_entry_ids":["e:00000003"]}
    },
    {
      "name":"OPTIONAL_DERIVED",
      "text":"Non-authoritative note: She appears alert, cautious, and unwilling to be led. (Derived from referenced excerpts.)",
      "provenance":{"used_entry_ids":["e:00000002","e:00000003"]}
    }
  ]
}


⸻

END OF CONTRACT