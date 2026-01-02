# Phase 8 Authoritative Curl Tests (Retrieval Engine)

## 1. Valid Retrieval Execution
**Purpose:** Verify that the system can execute a retrieval tool.
**Authority:** `/engines/ENGINE_8_RETRIEVAL_ENGINE/interface.md` Section 0: "Retrieval returns EVIDENCE, not interpretation."

```bash
curl -i -X POST $BASE_URL/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase8_retrieval_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Find all entries about the garden." },
  "mode": { "kind": "BEAT", "client_intent": "testing_retrieval" },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
**Expectations:**
- Status: 200 OK
- `debug.tool_execution.tool`: `LEDGER_SEARCH`
- `debug.tool_execution.result`: Contains `results` array (even if empty)
