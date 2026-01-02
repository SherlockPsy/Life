# Phase 6 Authoritative Curl Tests (Capsule Engine)

## 1. Valid Capsule Request (via Tool)
**Purpose:** Verify that the system can retrieve a capsule when requested.
**Authority:** `/engines/ENGINE_6_CAPSULE_ENGINE/interface.md` Section 1.1: "Creation of /contracts/capsule_pack.md objects."

*Note: Since Capsule Engine is internal, we trigger it via a specific operator input that should elicit a tool request.*

```bash
curl -i -X POST $BASE_URL/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase6_capsule_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "FORCE_TOOL_TEST: Retrieve the capsule for Rebecca." },
  "mode": { "kind": "BEAT", "client_intent": "testing_capsule" },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
**Expectations:**
- Status: 200 OK
- `debug.tool_execution.tool`: `CAPSULE_GET` (if implemented in debug output)
- OR `debug.error` NOT containing "Engine 7 does not exist"

## 2. Invalid Capsule Request (Missing Person)
**Purpose:** Verify validation of capsule requests.
**Authority:** `/contracts/tool_request.md` Section 1: "person_id: string|null" (but logic might require it)

*Note: Hard to force invalid internal call via curl. Skipping invalid test for internal engine unless we have a direct route.*
