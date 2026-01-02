# Phase 2 Authoritative Curl Tests (Beat & Opportunity)

## 1. Valid Beat (Silence)
**Purpose:** Verify that a beat can occur without producing a write (Silence).
**Authority:** `/engines/ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/interface.md` Section 1.3: "Silence is a first-class valid outcome."

```bash
curl -i -X POST $BASE_URL/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase2_silence_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "" },
  "mode": { "kind": "BEAT", "client_intent": "silence_test" },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
**Expectations:**
- Status: 200 OK
- `debug.wrote`: `false` (or true if LLM decides to write, but empty input usually implies silence)
- `pocket.clock.world_time`: `null` (unless declared)

## 2. Valid Beat (Write)
**Purpose:** Verify that a beat can produce a write.
**Authority:** `/engines/ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/interface.md` Section 1.1: "All world-affecting activity MUST occur inside a beat."

```bash
curl -i -X POST $BASE_URL/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase2_write_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Hello Phase 2." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
**Expectations:**
- Status: 200 OK
- `debug.wrote`: `true`
- `stream.entries[0].text`: "Hello Phase 2."

## 3. Invalid Mode
**Purpose:** Verify that invalid modes are rejected.
**Authority:** `/contracts/invocation_envelope.md` Section 2.4: "kind MUST be one of: BEAT, NO_OP"

```bash
curl -i -X POST $BASE_URL/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase2_invalid_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "" },
  "mode": { "kind": "INVALID_MODE", "client_intent": null },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```
**Expectations:**
- Status: 400 Bad Request (or 500 if validation fails hard, but 400 preferred)
