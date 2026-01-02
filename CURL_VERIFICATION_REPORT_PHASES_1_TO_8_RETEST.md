# CURL VERIFICATION REPORT: PHASES 1-8 (RETEST)

**Date:** 2026-01-02
**Target:** `https://life-production-1b7b.up.railway.app`
**Scope:** Retest of Phase 4 Contract Failure (Null Time Override)
**Method:** Strict Manual Execution of Authoritative Tests

## 1. Correction Summary

**File Changed:** `server.js`
**Logic Change:**
Replaced implicit truthy check for `declared_world_time` with strict type checking.
- `undefined` or `null` -> Ignored (No override).
- `Number` (non-negative integer) -> Applied via `Engine3.setTime`.
- Other -> Returns HTTP 400 (instead of crashing with 500).

This ensures the authoritative contract payload (which sends `null`) is handled correctly as "no override".

## 2. Retest Results

| Phase | Test Name | Result | HTTP Status | Notes |
|-------|-----------|--------|-------------|-------|
| 4 | Valid Invocation (BEAT) | **PASS** | 200 OK | Payload with `declared_world_time: null` accepted. |
| 4 | Idempotency | **PASS** | 200 OK | Replay returns identical response. |

## 3. Evidence Appendix (RAW)

### Test 1: Valid Invocation (BEAT)
**Timestamp:** 2026-01-02 21:01:31 GMT
**Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_valid_beat_001",
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
**Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:01:31 GMT
etag: W/"1c0-V7tOzOE8zHKnqyX7aLOftYcYpTg"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: y4qJmPUzSWqVO0Kkm3z_FQ
content-length: 448

{"request_id":"req_valid_beat_001","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"b2ecce5d-27d2-46f4-ba91-0b75afa3388c","created_at_world":"200","channel":"USER","author_label":null,"text":"Hello world."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":true,"bundle_id":"...","beat_id":...}}
```

### Test 2: Idempotency
**Timestamp:** 2026-01-02 21:01:37 GMT
**Command:**
```bash
curl -i -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_valid_beat_001",
  ... (same payload) ...
}'
```
**Response:**
```http
HTTP/2 200 
content-type: application/json; charset=utf-8
date: Fri, 02 Jan 2026 21:01:37 GMT
etag: W/"1c0-V7tOzOE8zHKnqyX7aLOftYcYpTg"
server: railway-edge
x-powered-by: Express
x-railway-edge: railway/europe-west4-drams3a
x-railway-request-id: LBj9SCV2S-y9ms4hm3z_FQ
content-length: 448

{"request_id":"req_valid_beat_001","stream":{"cursor_before":null,"cursor_after":null,"entries":[{"entry_id":"b2ecce5d-27d2-46f4-ba91-0b75afa3388c","created_at_world":"200","channel":"USER","author_label":null,"text":"Hello world."}]},"pocket":{"is_available":false,"clock":{"world_time":null,"timezone":null},"calendar":{"items":[]},"messages":{"items":[]}},"debug":{"wrote":true,"bundle_id":"...","beat_id":...}}
```

## 4. Conclusion

The critical contract failure is **RESOLVED**.
The system now correctly handles `null` values in `declared_overrides` as "no override", compliant with the contract specification.
