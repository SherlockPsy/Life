# Phase 5 Verification Commands

These commands verify the implementation of Engine 2 (Beats) and Engine 3 (Time).
Target URL: `https://life-production-1b7b.up.railway.app`

## 1. Initial Time Check (No Advance)
```bash
curl -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "test-phase5-001",
    "operator": { "input_text": "Hello World" }
  }'
```
**Expected Output:** `pocket.clock.world_time` should be `null` (Time not declared).

## 2. Advance Time Explicitly
```bash
curl -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "test-phase5-002",
    "operator": { "input_text": "Waiting..." },
    "declared_overrides": {
      "time": { "advance_by": 10 }
    }
  }'
```
**Expected Output:** `pocket.clock.world_time` should be previous + 10 (Time declared).

## 3. Set Time Explicitly
```bash
curl -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "test-phase5-003",
    "operator": { "input_text": "Time Travel" },
    "declared_overrides": {
      "time": { "declared_world_time": 5000 }
    }
  }'
```
**Expected Output:** `pocket.clock.world_time` should be 5000.

## 4. Idempotency Check (Replay #2)
```bash
curl -X POST https://life-production-1b7b.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "test-phase5-002",
    "operator": { "input_text": "Waiting..." },
    "declared_overrides": {
      "time": { "advance_by": 10 }
    }
  }'
```
**Expected Output:** Same response as #2. Time should NOT have advanced again.
