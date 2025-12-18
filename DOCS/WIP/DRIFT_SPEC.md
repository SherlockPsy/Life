# DRIFT_SPEC.md
## Drift Specification — Continuous Background Change
## CANONICAL — SUBSTRATE-BOUND — NON-AUTHORITATIVE FOR EXPERIENCE

---

## Authority and Scope

This document defines **how drift operates** across substrates.

It is canonical for drift behaviour but **subordinate** to:
- `LIFE_LAWS.md`
- `ARBITRATION_LAWS.md`
- `LIFE_MECHANICS.md`

Drift must never override higher-precedence constraints.

---

## Definition

Drift is the continuous, gradual evolution of underlying conditions
caused by time alone.

Drift:
- does not require events
- does not require surfacing
- operates whenever system time advances

---

## State Mutation Constraint (Binding)

All drift effects MUST be expressed **exclusively** as `StateDelta` operations
as defined in `STATE_DELTA_SPEC.md`.

Direct mutation of State containers by drift logic is forbidden.

Any implementation that applies drift by directly writing to state
violates the system contract.

---

## Substrate Coverage

Drift may operate on:
- S3 — Internal State
- S4 — Relational State
- S6 — Intentional Pressure

Drift must not directly modify:
- S1 (time)
- S2 (situational facts)
- S5 (interaction modes)

---

## Drift Execution Rules

- Drift executes only when system time advances.
- Drift executes deterministically given:
  - elapsed time
  - current state
  - declared parameters
- Drift may change underlying conditions without surfacing.
- Drift must never be a no-op when time advances.

---

## Boundedness

All drift:
- must respect declared ranges
- must apply clamping rules explicitly
- must be logged with provenance

Unbounded or implicit drift is forbidden.

---

## Arbitration Boundary (Hard)

Arbitration may:
- read drifted state
- influence experience selection

Arbitration may NOT:
- alter drift rates
- suppress drift
- rewrite drift outcomes

---

## Auditability

Each drift delta must record:
- affected substrate
- affected dimension
- old value
- new value
- driver classification
- timestamp and tick id

---

END OF DRIFT_SPEC.md
