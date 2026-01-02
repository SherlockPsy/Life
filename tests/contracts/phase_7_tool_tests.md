# Phase 7 Authoritative Curl Tests (Tool Request Engine)

## 1. Valid Tool Request Flow
**Purpose:** Verify that the system accepts and validates tool requests.
**Authority:** `/engines/ENGINE_7_TOOL_REQUEST_ENGINE/interface.md` Section 1.1: "Enforces /contracts/tool_request.md."

```bash
curl -i -X POST $BASE_URL/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase7_tool_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Search the ledger for apples." },
  "mode": { "kind": "BEAT", "client_intent": "testing_tool" },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
**Expectations:**
- Status: 200 OK
- `debug.tool_execution`: Present
- `debug.tool_execution.status`: "VALIDATED" or "EXECUTED"

