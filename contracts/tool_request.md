# Contract: Tool Request (LLM Asks Questions)
STATUS: BINDING
SCOPE: Any LLM tool invocation (retrieval, capsule fetch, scene pack build, etc.)

Tools are MECHANICAL QUERY PRIMITIVES.
Tools do not decide meaning.
Tools do not write reality.
Tools return ledger-backed excerpts with provenance.

---

## 1) Canonical JSON Shape

```json
{
  "tool_request_id": "string",
  "request_id": "string",
  "requested_by": {
    "engine": "ENGINE_9_LLM_WRITER",
    "actor": "string",
    "knowledge_view": "string"
  },
  "tool": {
    "name": "LEDGER_SEARCH|LEDGER_GET|CAPSULE_GET|SCENE_PACK_BUILD",
    "query_text": "string",
    "constraints": {
      "time_window": {"from":"string|null","to":"string|null"},
      "limit": "number",
      "person_id": "string|null"
    }
  }
}


⸻

2) MUST Rules
	•	tool_request_id MUST be unique within request_id scope.
	•	request_id MUST match the enclosing invocation.
	•	requested_by.actor MUST be explicit (e.g., “REBECCA”, “WORLD”).
	•	knowledge_view MUST specify whose knowledge boundary applies.

⸻

3) MUST NOT Rules
	•	MUST NOT include “please decide what is relevant” phrasing as a directive to the tool.
	•	Tools MUST NOT be asked to “summarize reality as fact” without provenance.
	•	Tools MUST NOT write entries.

⸻

4) Valid Example

{
  "tool_request_id":"tr:0001",
  "request_id":"mvp-00000010",
  "requested_by":{"engine":"ENGINE_9_LLM_WRITER","actor":"REBECCA","knowledge_view":"REBECCA_VIEW"},
  "tool":{
    "name":"LEDGER_SEARCH",
    "query_text":"What did George say about revealing the truth a moment ago?",
    "constraints":{"time_window":{"from":null,"to":null},"limit":5,"person_id":"GEORGE"}
  }
}


⸻

END OF CONTRACT