### 1. Authoritative Test Inventory
- **Test Name:** Prohibition: Implicit Time Jump
  - **Source:** `tests/prohibitions/time_prohibitions.md`
  - **Section:** 1. Prohibition: Implicit Time Jump
- **Test Name:** Control: Explicit Time Jump (Allowed)
  - **Source:** `tests/prohibitions/time_prohibitions.md`
  - **Section:** 2. Control: Explicit Time Jump (Allowed)

### 2. Execution Results

**Test 1: Prohibition: Implicit Time Jump**
- **Timestamp:** 2026-01-02T21:19:10Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_prohibit_time_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Later that day..." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": {
    "time": { "declared_world_time": null, "timezone": null },
    "pause_time": false
  },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:19:10 GMT
etag: W/"1c9-8+sPNoldzXK3pBCWG1TRGVsc2oU"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: QnNgvaIKRpKfhIWYm3z_FQ
content-length: 457

{"request_id":"req_prohibit_time_001","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"f83a8a97-def3-4d83-88c4-d1f426e5cec0","created_at_world":"1000","channel":"USER","author_label":null,"text":"Later that day..."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":tru..."}}
```

**Test 2: Control: Explicit Time Jump (Allowed)**
- **Timestamp:** 2026-01-02T21:19:15Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_allow_time_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Time passes." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": {
    "time": { "declared_world_time": 1000, "timezone": null },
    "pause_time": false
  },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:19:15 GMT
etag: W/"1c1-MQJIGkcP9WnkCuqVm+qZVFZQTzQ"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: jG17zDY_Rl-Fgdd9m3z_FQ
content-length: 449

{"request_id":"req_allow_time_001","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"7fc58c06-a2d9-4430-b971-e5b2f15f3283","created_at_world":"1000","channel":"USER","author_label":null,"text":"Time passes."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":true,"bundl..."}}
```

### 3. Result Classification
FAILED

### 4. Integrity Statement
- No code was modified
- No schema was modified
- No scripts were created
- Only curl against the deployed Railway URL was used
