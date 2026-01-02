### 1. Authoritative Test Inventory
- **Test Name:** Valid Invocation (BEAT)
  - **Source:** `tests/contracts/invocation_envelope.md`
  - **Section:** 1. Valid Invocation (BEAT)
- **Test Name:** Invalid: Missing request_id
  - **Source:** `tests/contracts/invocation_envelope.md`
  - **Section:** 2. Invalid: Missing request_id
- **Test Name:** Invalid: Wrong Operator ID
  - **Source:** `tests/contracts/invocation_envelope.md`
  - **Section:** 3. Invalid: Wrong Operator ID
- **Test Name:** Invalid: Invoker is GEORGE
  - **Source:** `tests/contracts/invocation_envelope.md`
  - **Section:** 4. Invalid: Invoker is GEORGE

### 2. Contract Expectations
- **Section 2 (Missing request_id):**
  - **Expected Status:** 400 Bad Request
  - **Body:** "Error details (structure undefined, but must be error)."
- **Section 3 (Wrong Operator ID):**
  - **Expected Status:** 400 Bad Request
- **Section 4 (Invoker is GEORGE):**
  - **Expected Status:** 400 Bad Request
- **Section 1 (Valid Invocation):**
  - **Debug Field:** Contract does not constrain `debug.error`.

### 3. Execution Evidence

**Test 1: Valid Invocation (BEAT)**
- **Timestamp:** 2026-01-02T21:27:15Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_valid_beat_002",
  "invoker": {
    "invoker_id": "user_external_1",
    "invoker_role": "INVOKER",
    "notes": "Standard beat test"
  },
  "operator": {
    "operator_id": "GEORGE",
    "input_text": "Hello world."
  },
  "mode": {
    "kind": "BEAT",
    "client_intent": null
  },
  "declared_overrides": {
    "time": { "declared_world_time": null, "timezone": null },
    "pause_time": false
  },
  "ui": { "stream_cursor": null, "client_timestamp_utc": "2026-01-01T12:00:00Z" }
}'
```
- **Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:27:15 GMT
etag: W/"20d-IoiTb4BZfNEBkFOWvAH/Sr2hNTM"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: njiCddwQS6SxVRP-m3z_FQ
content-length: 525

{"request_id":"req_valid_beat_002","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"4b0d6fa4-2834-4e75-a6bc-201ebd1675b7","created_at_world":1000,"channel":"USER","author_label":null,"text":"Hello world."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":true,"bundle_id":"a23085c2-9158-4ac2-a4b2-a3cd2acee872","beat_id":30,"error":"tool_request unsupported because Engine 7 is stubbed"}}
```

**Test 2: Missing request_id**
- **Timestamp:** 2026-01-02T21:32:32Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "invoker": {
    "invoker_id": "user_external_1",
    "invoker_role": "INVOKER",
    "notes": null
  },
  "operator": {
    "operator_id": "GEORGE",
    "input_text": "Fail me."
  },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 400 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:32:32 GMT
etag: W/"1e-NGNpl0Yh8u8hBoFOyn6oRXzSj9w"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: H-k_y1IpQeOvQX_lm3z_FQ
content-length: 30

{"error":"Missing request_id"}
```

**Test 3: Invalid Operator ID**
- **Timestamp:** 2026-01-02T21:27:26Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_invalid_op_002",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": {
    "operator_id": "NOT_GEORGE",
    "input_text": "I am an imposter."
  },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 400 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:27:26 GMT
etag: W/"3a-AeJA7CeEEqE6PfL5bXcrKE7+57M"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: lD7gdel8SCO2c-sJm3z_FQ
content-length: 58

{"error":"Invalid operator_id","details":"Must be GEORGE"}
```

**Test 4: Invalid Invoker ID**
- **Timestamp:** 2026-01-02T21:27:31Z
- **Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_invalid_invoker_002",
  "invoker": {
    "invoker_id": "GEORGE",
    "invoker_role": "INVOKER",
    "notes": null
  },
  "operator": { "operator_id": "GEORGE", "input_text": "Self-invocation." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
- **Response:**
```http
HTTP/2 400 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:27:31 GMT
etag: W/"3b-57abx3KyXHiricEKylLrPRbtX64"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: f78QI6jbRzOGZkjNYqdHTg
content-length: 59

{"error":"Invalid invoker_id","details":"Cannot be GEORGE"}
```

### 4. Result Classification
VERIFIED

### 5. Integrity Statement
- No code was modified
- No schema was modified
- No scripts were created
- Only curl against the deployed Railway URL was used
