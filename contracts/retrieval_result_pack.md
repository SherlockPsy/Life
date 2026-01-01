# Contract: Retrieval Result Pack (Ledger-Backed Evidence)
STATUS: BINDING
SCOPE: Any tool response that returns evidence excerpts.

Retrieval returns EVIDENCE, not interpretation.
All results must point to ledger sources.
Verbatim excerpts only.

---

## 1) Canonical JSON Shape

```json
{
  "tool_request_id": "string",
  "request_id": "string",
  "results": [
    {
      "entry_id": "string",
      "bundle_id": "string",
      "created_at_world": "string",
      "visibility_scope": "PUBLIC|PRIVATE",
      "verbatim_excerpt": "string"
    }
  ],
  "empty": "boolean",
  "notes": "string|null"
}


⸻

2) MUST Rules
	•	tool_request_id MUST match the request.
	•	results.verbatim_excerpt MUST be a direct substring of the ledger entry text (or the full text).
	•	results MUST already be filtered for the requested knowledge_view visibility.
	•	empty MUST be true iff results is empty.

⸻

3) MUST NOT Rules
	•	MUST NOT paraphrase or rewrite excerpts.
	•	MUST NOT return embeddings as content.
	•	MUST NOT include unauthorized private text.

⸻

4) Valid Example

{
  "tool_request_id":"tr:0001",
  "request_id":"mvp-00000010",
  "results":[
    {
      "entry_id":"e:00000021",
      "bundle_id":"b:00000008",
      "created_at_world":"2026-01-01T07:30:00+00:00",
      "visibility_scope":"PUBLIC",
      "verbatim_excerpt":"Hm... I have never told you but... it is time to reveal the truth..."
    }
  ],
  "empty":false,
  "notes":null
}


⸻

END OF CONTRACT
