---
spec_version: v1.0.0
status: DRAFT
owner: core-runtime
depends_on:
  - LIFE_LAWS.md
  - ARBITRATION_LAWS.md
  - LIFE_MECHANICS.md
  - DRIFT_SPEC.md
  - STATE_DELTA_SPEC.md
supersedes: []
---

# SYSTEM EXECUTION MODEL
## The Only Authoritative Tick Lifecycle

---

## Authority (Binding)

This document defines the **single authoritative and enforceable execution order**
for all system ticks.

No other document may define, override, or reinterpret tick order.
Any conceptual descriptions elsewhere are subordinate to this file.

If a conflict exists, this file wins.

---

## Core Invariants

- State is authoritative.
- Narrative is downstream.
- Time advances only here.
- All mutations occur via `StateDelta`.
- Arbitration never mutates truth.

---

## Tick Preconditions

A tick may execute if and only if:
- `system_time.presence_gate.is_present == true`
- No other tick is executing (strict serialization)

If preconditions fail, the tick aborts silently.

---

## The Tick Pipeline (Authoritative)

### 1) Time Advance (S1)
- Increment `current_tick_id` by exactly +1.
- Update `current_timestamp`.
- If time does not advance, the tick aborts immediately.

### 2) Drift Evaluation (S3 / S4 / S6)
- Execute drift logic as defined in `DRIFT_SPEC.md`.
- Produce zero or more `StateDelta` operations.
- Drift deltas may remain unsurfaced.

### 3) World Intrusion Ingest (S2)
- Ingest new situational facts intersecting the causal envelope.
- Produce `StateDelta` operations only.

### 4) Agent Initiations (S3 / S6)
- Evaluate autonomous participant initiations.
- Produce `StateDelta` operations only.

### 5) Arbitration (Experience Selection Only)
- Execute `LAW_APPLICATION_PROTOCOL.md`.
- Produce a `ResolvedLawPlan`.
- Arbitration operates on **experience only**.

### 6) Render (Non-Authoritative)
- Renderer receives:
  - committed `StateDelta` set
  - experience selection
- Renderer produces narrative text only.

### 7) Commit (Atomic)
- Commit all `StateDelta` operations to canonical State.
- Persist:
  - new State snapshot
  - deltas
  - experience selection
  - rendered output (non-authoritative)

---

## Forbidden Behaviours

- Surfacing before drift.
- Renderer writing truth.
- Arbitration authorizing mutations.
- Partial commits.
- Parallel ticks.

Any violation invalidates the implementation.

---

END OF SYSTEM_EXECUTION_MODEL.md
