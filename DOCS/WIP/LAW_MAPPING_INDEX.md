# LAW_MAPPING_INDEX.md
## Mandatory Support Artifact — VirLife Canon

This file is a **mandatory support artifact** referenced by the canonical specification set:
- `LIFE_LAWS.md`
- `ARBITRATION_LAWS.md`
- `LIFE_MECHANICS.md`
- `DRIFT_SPEC.md`
- `INFRA_SPEC.md`
- `BUILD_CONTRACT.md`

**Binding rule:** When referenced by a canonical file, the referenced portion is mandatory. This file may not contradict `LIFE_LAWS.md` or `ARBITRATION_LAWS.md`. In any conflict, canonical files win.

---
# LAW_MAPPING_INDEX.md
## Canonical Cross-Reference Index

Purpose: provide an explicit, auditable mapping from **mechanics** to the governing **laws**.
This index does not add new rules. If a rule appears unmapped, it is non-authoritative until mapped.

Precedence: `LIFE_LAWS.md` and `ARBITRATION_LAWS.md` govern; this file merely indexes.

## Enforcement Rule (Non-Negotiable)

Any LIFE_MECHANICS rule or section that does not map to at least one governing item in:
- `LIFE_LAWS.md` and/or
- `ARBITRATION_LAWS.md`

is invalid and must not be implemented.

---

## A) LIFE_MECHANICS → LIFE_LAWS / ARBITRATION_LAWS

### 0) Checksums (Non-Negotiable)
- Governing LIFE_LAWS: LAW 1, LAW 2, LAW 3, LAW 13
- Governing ARBITRATION_LAWS: A15, A14

### 1) What This System Is
- Governing LIFE_LAWS: LAW 2, LAW 13, LAW 14
- Governing ARBITRATION_LAWS: A14, A15

### 2) Governing Realism Principle (Causal Envelope)
- Governing LIFE_LAWS: LAW 2, LAW 15
- Governing ARBITRATION_LAWS: A1, A8

### 3) System Time (The Only Clock)
- Governing LIFE_LAWS: LAW 1, LAW 3, LAW 4
- Governing ARBITRATION_LAWS: A15, A5

### 4) The Central Mechanics Question
- Governing LIFE_LAWS: LAW 2, LAW 14, LAW 13
- Governing ARBITRATION_LAWS: A1, A2, A3, A15

### 5) State Evaluation Over Action Forcing
- Governing LIFE_LAWS: LAW 4, LAW 13, LAW 14
- Governing ARBITRATION_LAWS: A1, A2, A3, A4, A14, A15

### 6) Exhaustive Sources of Change
- Governing LIFE_LAWS: LAW 3, LAW 15, LAW 6
- Governing ARBITRATION_LAWS: A10, A1, A2

### 7) Concurrency
- Governing LIFE_LAWS: LAW 4, LAW 11
- Governing ARBITRATION_LAWS: A3, A4, A5

### 8) Response Capacity and Backlog
- Governing LIFE_LAWS: LAW 4, LAW 10, LAW 11
- Governing ARBITRATION_LAWS: A4, A5

### 9) Autonomy
- Governing LIFE_LAWS: LAW 4, LAW 5
- Governing ARBITRATION_LAWS: A6, A7, A2

### 10) Continuity Items
- Governing LIFE_LAWS: LAW 5, LAW 6, LAW 10
- Governing ARBITRATION_LAWS: A5, A14, A12

### 11) Provenance
- Governing LIFE_LAWS: LAW 15
- Governing ARBITRATION_LAWS: A1, A8

### 12) Population
- Governing LIFE_LAWS: LAW 2, LAW 4, LAW 14
- Governing ARBITRATION_LAWS: A5

### 13) Scenes
- Governing LIFE_LAWS: LAW 2, LAW 14
- Governing ARBITRATION_LAWS: A1, A15

### 14) Communication and Reachability
- Governing LIFE_LAWS: LAW 4, LAW 11
- Governing ARBITRATION_LAWS: A3, A4, A5

### 15) Meaning
- Governing LIFE_LAWS: LAW 12, LAW 7
- Governing ARBITRATION_LAWS: A11, A12

### 16) Intimacy and Sexuality
- Governing LIFE_LAWS: LAW 7, LAW 13
- Governing ARBITRATION_LAWS: A7, A1, A15

### 17) Anti-Optimisation Rule
- Governing LIFE_LAWS: LAW 13
- Governing ARBITRATION_LAWS: A14, A15

### 18) Nothing Happens
- Governing LIFE_LAWS: LAW 14, LAW 3
- Governing ARBITRATION_LAWS: A14, A15, A5

### 19) Success Criteria
- Governing LIFE_LAWS: LAW 1, LAW 13, LAW 14
- Governing ARBITRATION_LAWS: A15

### 20) Interaction Modes
- Governing LIFE_LAWS: LAW 8, LAW 9
- Governing ARBITRATION_LAWS: A5, A6, A13, A14

### 21) Single World and Present Pointer
- Governing LIFE_LAWS: LAW 1
- Governing ARBITRATION_LAWS: (none)
- Enforced by: STATE_SPEC S1 (current_tick_id, world_singleton_id + invariants)
