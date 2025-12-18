---
spec_version: v1.0.0
status: DRAFT
owner: state
depends_on:
  - STATE_SPEC.md
  - GLOSSARY.md
supersedes: []
---

# STATE DELTA SPEC
## The Only Legal State Mutation Format

---

## Authority

This document defines the **only legal mechanism** by which canonical State
may be mutated.

Any state change not represented as a `StateDelta` is invalid.

---

## Purpose

Provide a deterministic, auditable, replay-independent representation of
state mutation.

---

## Delta Structure

Each `StateDelta` contains:

- `delta_id` (UUID)
- `tick_id` (int)
- `timestamp_utc` (ISO-8601)
- `operations` (ordered list)

---

## Operation Types

### 1) ADD_ENTITY
- `entity_id` (stable)
- `entity_type`
- `initial_fields` (typed)

### 2) UPDATE_ENTITY
- `entity_id`
- `field_path`
- `old_value` (required unless explicitly waived)
- `new_value`

### 3) REMOVE_ENTITY
- `entity_id`
- `reason_code`

### 4) MOVE_ENTITY
- `entity_id`
- `from_location_id`
- `to_location_id`
- `path` (optional)
- `constraints_checked` (list of LAW IDs)

### 5) ADD_FACT / REMOVE_FACT
- As applicable for fact-based state models.

---

## Invariants

- Every operation must be lawful under applicable laws.
- No operation may reference unknown IDs.
- Application order is deterministic.
- `old_value` must match canonical State at time of application.

---

## Arbitration Boundary

Arbitration:
- may read State and deltas
- may influence experience selection

Arbitration:
- may NOT modify, filter, suppress, or generate `StateDelta` operations.

---

## Renderer Constraint Hook

Renderer may describe only:
- facts present in State **after** applying deltas
- changes implied by deltas

Renderer must not contradict State.

---

END OF STATE_DELTA_SPEC.md
