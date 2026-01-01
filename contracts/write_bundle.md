# Contract: Write Bundle (Atomic Commit Unit)
STATUS: BINDING
SCOPE: Any proposed or committed set of writes.

A Write Bundle is an atomic unit:
- Either ALL entries commit, or NONE commit.
- A rejected bundle has ZERO effect.

Bundles are the only supported commit mechanism.

---

## 1) Canonical JSON Shape

```json
{
  "bundle_id": "string|null",
  "request_id": "string",
  "proposed_by": {
    "engine": "string",
    "actor": "string"
  },
  "entries": [ { "WriteEntry": "..." } ],
  "wrote": "boolean",
  "rejection": {
    "rejected": "boolean",
    "reason": "string|null"
  }
}


⸻

2) Field Semantics

2.1 bundle_id
	•	assigned by ledger on commit
	•	null in proposals

2.2 request_id
	•	MUST match invocation request_id

2.3 proposed_by
	•	engine: name/id of the proposing component (e.g., “ENGINE_9_LLM_WRITER”)
	•	actor: author identity context (e.g., “REBECCA”, “WORLD”, “SYSTEM_INVOKER”)

2.4 entries
	•	MUST be present (may be empty only if wrote=false)
	•	If wrote=true:
	•	entries MUST be non-empty
	•	If wrote=false:
	•	entries MUST be empty

2.5 wrote
	•	wrote=true implies entries exist and will commit if accepted
	•	wrote=false implies explicit no-write outcome (silence / nothing happens)

2.6 rejection
	•	rejected=true means bundle was rejected and MUST NOT commit any entry
	•	reason may be shown to logs but MUST NOT be turned into narrative facts

⸻

3) MUST Rules
	•	Bundles MUST commit atomically.
	•	Bundle commit MUST be idempotent for the same request_id.
	•	If bundle is rejected:
	•	no entry_id is issued
	•	no bundle_id is issued
	•	nothing changes in reality ledger.

⸻

4) MUST NOT Rules
	•	MUST NOT partially commit some entries.
	•	MUST NOT “fix” a rejected bundle by rewriting it automatically.
	•	MUST NOT accept a bundle that violates visibility boundaries (enforced elsewhere but rejection is required).

⸻

5) Forbidden Examples

5.1 wrote=true with empty entries (INVALID)

{"request_id":"x","proposed_by":{"engine":"E9","actor":"WORLD"},"entries":[],"wrote":true,"rejection":{"rejected":false,"reason":null}}

5.2 wrote=false with entries (INVALID)

{"request_id":"x","proposed_by":{"engine":"E9","actor":"WORLD"},"entries":[{"text":"hi"}],"wrote":false,"rejection":{"rejected":false,"reason":null}}


⸻

6) Valid Example (NoWrite)

{
  "bundle_id": null,
  "request_id":"mvp-00000002",
  "proposed_by":{"engine":"ENGINE_9_LLM_WRITER","actor":"REBECCA"},
  "entries":[],
  "wrote":false,
  "rejection":{"rejected":false,"reason":null}
}


⸻

END OF CONTRACT