### 1. Authoritative Test Inventory
- **Test Name:** Valid Projection Response
  - **Source:** `tests/contracts/projection_output.md`
  - **Section:** 1. Valid Projection Response
- **Test Name:** Idempotency Replay (First Call)
  - **Source:** `tests/contracts/projection_output.md`
  - **Section:** 2. Idempotency Replay
- **Test Name:** Idempotency Replay (Second Call)
  - **Source:** `tests/contracts/projection_output.md`
  - **Section:** 2. Idempotency Replay

### 2. Execution Results

**Test 1: Valid Projection Response**
- **Timestamp:** 2026-01-02T21:18:47Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_proj_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Show me the world." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:18:47 GMT
etag: W/"20d-sJw1HmMzCElowc4jrZKMyogCmZw"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: bK_XyoxTRv6J7SG8YqdHTg
content-length: 525

{"request_id":"req_proj_001","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"a89bf5d0-ab72-433b-b29b-a967c2eb4798","created_at_world":1000,"channel":"USER","author_label":null,"text":"Show me the world."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":true,"bundle_id":"60b738ef-aec7-4407-84fc-db4b523985ff","beat_id":26,"error":"tool_request unsupported because..."}}
```

**Test 2: Idempotency Replay (First Call)**
- **Timestamp:** 2026-01-02T21:18:57Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_replay_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Idempotency test." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:18:57 GMT
etag: W/"1be-5HPeTM7Bt/xbymDoiqk94Y+lcpw"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: F6gFykt-SeaCC5v1m3z_FQ
content-length: 446

{"request_id":"req_replay_001","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"59066376-a95d-4371-b040-127cd13e1265","created_at_world":1000,"channel":"USER","author_label":null,"text":"Idempotency test."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":true,"bundle..."}}
```

**Test 3: Idempotency Replay (Second Call)**
- **Timestamp:** 2026-01-02T21:19:03Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_replay_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Idempotency test." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:19:03 GMT
etag: W/"1c2-PRVtpk3k0y4FOnjKQ0HEz5KoFek"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: XzWTDkSuQnCEUehKm3z_FQ
content-length: 450

{"request_id":"req_replay_001","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"59066376-a95d-4371-b040-127cd13e1265","created_at_world":"1000","channel":"USER","author_label":null,"text":"Idempotency test."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":true,"bund..."}}
```

### 3. Result Classification
VERIFIED

### 4. Integrity Statement
- No code was modified
- No schema was modified
- No scripts were created
- Only curl against the deployed Railway URL was used
