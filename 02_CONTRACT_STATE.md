# 02_CONTRACT_STATE.md

## The Physics of Data and Change

### 1. AUTHORITY AND SCOPE

**Status:** CANONICAL | **Version:** 1.0 (Consolidated)

This document defines the **Application State** of VirLife. It is the single source of truth for:

1. **State Shapes:** The exact JSON structure of the 6 Substrates.
2. **Mutation Rules:** The only legal way to change state (`StateDelta`).
3. **Invariants:** The mathematical bounds that prevent the simulation from breaking.

**Binding Constraints:**

* **No Hidden State:** If a variable affects behavior, it must be defined here.
* **No Prose as State:** State dimensions are numeric (`0–100`), boolean, or categorical enum. Narrative text is *output*, never *input* for state logic.
* **Append-Only Mutation:** State can only be changed by applying a recorded `StateDelta`. Direct database updates that bypass the Delta log are forbidden.

---

### 2. THE SIX SUBSTRATES (Canonical Shapes)

*(Derived from `STATE_SPEC.md`)*

#### S1 — Temporal State (Time)

**Storage:** `postgres-primary.ticks` & `sessions`

```json
{
  "system_time": {
    "current_timestamp": "UTC ISO-8601",
    "current_tick_id": "integer (strictly monotonic)",
    "world_singleton_id": "constant string",
    "presence_gate": {
      "is_present": "boolean",
      "last_presence_change": "UTC ISO-8601"
    }
  }
}

```

* **Invariant:** `current_tick_id` never decreases. `current_timestamp` advances ONLY when `is_present` is `true`.

#### S2 — Situational State (World Facts)

**Storage:** `postgres-primary.facts`

```json
{
  "situational_fact": {
    "fact_id": "uuid",
    "type": "enum (transient | persistent | structural)",
    "content": "string (descriptive, not narrative)",
    "location_id": "uuid | null",
    "participants": ["uuid"],
    "confidence": "float (0.0–1.0)",
    "introduced_at": "tick_id"
  }
}

```

* **Invariant:** `structural` facts (like "Pregnancy" or "Blizzard") persist until explicitly resolved. `transient` facts (like "Loud Noise") decay rapidly.

#### S3 — Internal State (The Biological Core)

**Storage:** `postgres-primary.agent_state` (JSONB column)

```json
{
  "internal_state": {
    "energy": "float (0–100)",
    "stress": "float (0–100)",
    "affect_valence": "float (-100 to +100)",
    "affect_arousal": "float (0–100)",
    "cognitive_load": "float (0–100)",
    "embodied_factors": {
      "fatigue": "float (0–100)",
      "health_load": "float (0–100)",
      "hormonal_shift": "float (-100 to +100)"
    }
  }
}

```

* **Drift Rule:** These values drift continuously based on time passage (e.g., Energy decays, Fatigue rises) even when no events occur.

#### S4 — Relational State (The Asymmetric Web)

**Storage:** `postgres-primary.relationships` (Composite Key: `source_id`, `target_id`)

```json
{
  "relational_state": {
    "trust": "float (0–100)",
    "affinity": "float (-100 to +100)",
    "tension": "float (0–100)",
    "familiarity": "float (0–100)",
    "reliance": "float (0–100)"
  }
}

```

* **Invariant:** `A->B` state is independent of `B->A`.
* **Decay:** High Tension/Affinity decays toward neutral (0) over long periods of silence (Entropy).

#### S5 — Interaction Mode State (Habits)

**Storage:** `postgres-primary.agent_state`

```json
{
  "interaction_mode": {
    "current_mode": "enum (engaged | distracted | withdrawn | playful | guarded | fatigued)",
    "mode_stability": "float (0–100)",
    "last_mode_change": "tick_id"
  }
}

```

* **Inertia:** `current_mode` resists change. High `mode_stability` requires a high-impact event to trigger a switch.

#### S6 — Intentional State (Pressure)

**Storage:** `postgres-primary.intentions`

```json
{
  "intention": {
    "intention_id": "uuid",
    "category": "enum (plan | worry | desire | promise | fear)",
    "description": "string (semantic summary)",
    "pressure": "float (0–100)",
    "introduced_at": "tick_id",
    "decay_profile": "enum (none | slow | conditional)"
  }
}

```

* **Pressure Rule:** `pressure` increases over time for unresolved intentions (e.g., a "Promise" gets heavier the longer it is ignored).

---

### 3. THE STATE DELTA PROTOCOL (Mutation)

*(Derived from `STATE_DELTA_SPEC.md`)*

State is never mutated directly. It is mutated by applying a **StateDelta**.

#### 3.1 The Delta Envelope

Every mutation in the system must be wrapped in this structure:

```json
{
  "delta_id": "uuid",
  "tick_id": "integer",
  "timestamp_utc": "ISO-8601",
  "cause": "enum (drift | user_input | agent_logic | world_event)",
  "operations": [Array of Operations]
}

```

#### 3.2 Allowed Operations

1. **`UPDATE_DIMENSION`**
* Target: S3, S4, S5.
* Fields: `entity_id`, `dimension` (e.g., "energy"), `old_value`, `new_value`, `delta_value`.
* *Note:* `old_value` is required for concurrency safety (Optimistic Locking).


2. **`ADD_FACT` / `REMOVE_FACT**`
* Target: S2.
* Fields: `fact_payload` (for ADD) or `fact_id` (for REMOVE).


3. **`ADD_INTENTION` / `RESOLVE_INTENTION**`
* Target: S6.
* Fields: `intention_payload` or `intention_id` + `resolution_type` (abandoned | completed).


4. **`SET_INTERACTION_MODE`**
* Target: S5.
* Fields: `new_mode`, `new_stability`.



#### 3.3 The Forbidden List

* **Narrative Operations:** A delta cannot contain an instruction like "Make him seem angry." It must be `affect_valence: -50`.
* **Retroactive Edits:** A delta cannot reference a `tick_id` in the past.
* **Phantom Entities:** A delta cannot reference an `entity_id` that does not exist in `postgres-primary.entities`.

---

### 4. DRIFT & ARBITRATION INTERFACE

#### 4.1 Drift Execution

Drift is a function `f(State, TimeDelta) -> StateDelta`.

* It reads S3/S4/S6.
* It outputs `UPDATE_DIMENSION` operations.
* **Hard Rule:** Drift *never* deletes Structural Facts (S2) or resolves Intentions (S6). It only modifies numeric intensities (Energy, Pressure, Tension).

#### 4.2 Arbitration Access

* Arbitration (Law Application) has **Read-Only** access to S1–S6.
* Arbitration uses these values to calculate **Salience** and **Dominance**.
* Arbitration *never* emits a `StateDelta`. It emits a `RenderingPlan`.
