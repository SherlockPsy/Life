### File 3: `02_CONTRACT_STATE.md`

```markdown
# 02_CONTRACT_STATE (V2)

**Status:** ALIGNED | **Version:** 2.0
**Definition:** The Physics of Data and Change.

---

## 1. AUTHORITY AND SCOPE

This document defines the **Application State** of VirLife. It is the single source of truth for the 6 Substrates that comprise the simulation.

**Binding Constraint:**
The state defined here must be sufficient to simulate the **Bio-Loop**, **Entropy**, and **Continuous Time** mandated by the Constitution. If a phenomenon cannot be described by these JSON schemas, it does not exist in the simulation.

---

## 2. THE SIX SUBSTRATES (V2 Schema)

### S1 — Temporal State (The Absolute Clock)
*Implements Law 1 (Persistence) and Law 2 (Continuity).*

**Storage:** `postgres-primary.ticks`

```json
{
  "system_time": {
    "current_timestamp": "UTC ISO-8601 (Wall Clock)",
    "current_tick_id": "integer (Monotonic)",
    "time_dilation_factor": "float (Strictly 1.0 = Realtime)",
    "user_presence": {
      "is_present": "boolean",
      "last_interaction_at": "UTC ISO-8601",
      "accumulated_absence_seconds": "integer"
    }
  }
}

```

* **Critical Logic:** The `accumulated_absence_seconds` field is the fuel for the Drift Engine. When the user returns, this value dictates how much entropy (decay) must be applied to the world to bring it up to "Now."

### S2 — Situational State (The Material World)

*Implements Law 4 (Materiality) and Law 16 (The Periphery).*

**Storage:** `postgres-primary.facts`

```json
{
  "situational_fact": {
    "fact_id": "uuid",
    "type": "enum (material_object | ambient_condition | location_state)",
    "content": "string",
    "location_id": "uuid",
    "health_state": "float (0.00 - 100.00)", 
    "maintenance_required": "boolean",
    "physical_properties": {
      "mass_kg": "float",
      "is_movable": "boolean",
      "decay_rate": "float (Health loss per hour)"
    }
  }
}

```

* **Critical Logic:** `health_state` tracks the inevitable decay of objects. A car with `health_state: 15.0` will fail to start (Physics Constraint). `decay_rate` ensures this happens automatically over time.

### S3 — Internal State (The Bio-Machine)

*Implements Law 7 (Concurrent Domains) and Law 8 (Homeostasis).*

**Storage:** `postgres-primary.agent_state`

```json
{
  "internal_state": {
    "core_affect": {
      "valence": "float (-100.0 to +100.0)", 
      "arousal": "float (0.0 to 100.0)",
      "dominance": "float (-100.0 to +100.0)"
    },
    "biological_drivers": {
      "energy": "float (0.0 to 100.0)",
      "satiety": "float (0.0 to 100.0)", 
      "sleep_pressure": "float (0.0 to 100.0)",
      "pain_level": "float (0.0 to 100.0)",
      "hormonal_cycle_day": "integer (1-28)"
    },
    "cognitive_load": "float (0.0 to 100.0)"
  }
}

```

* **Critical Logic:** The split between **Affect** (Psychology) and **Biological Drivers** (Physiology) is mandatory. The system must calculate `Energy` and `Satiety` *before* it calculates `Valence`. (e.g., Low Energy causes Negative Valence).

### S4 — Relational State (The Connection)

*Implements Law 3 (Entropy) and Law 18 (Connection).*

**Storage:** `postgres-primary.relationships`

```json
{
  "relational_state": {
    "target_agent_id": "uuid",
    "intimacy_score": "float (0.0 to 100.0)",
    "trust_score": "float (0.0 to 100.0)",
    "tension_score": "float (0.0 to 100.0)",
    "history_summary": "vector_embedding",
    "last_contact_at": "tick_id",
    "dynamics": {
      "attraction": "float",
      "resentment": "float"
    }
  }
}

```

* **Critical Logic:** `last_contact_at` is used by the Drift Engine to calculate **Relationship Decay**. If `(Now - last_contact_at) > 7_days`, `intimacy_score` begins to drop automatically.

### S5 — Interaction Mode (The Social Physics)

*Implements Law 15 (Status) and Law 10 (Default Mode).*

**Storage:** `postgres-primary.agent_state`

```json
{
  "interaction_mode": {
    "current_mode": "enum (default_mode | high_salience | intimacy | conflict | ritual)",
    "pulse_rate": "integer (0–100)",
    "status_stance": "enum (high_status | low_status | neutral)",
    "social_mask": "enum (professional | vulnerable | guarded | mother | lover)"
  }
}

```

* **Critical Logic:** `pulse_rate` drives the Renderer.
* **0-30:** Slow, monologues, abstract thought.
* **31-70:** Standard dialogue, information exchange.
* **71-100:** Fragments, micro-turns, interruption, high arousal.



### S6 — Intentional State (The Grind)

*Implements Law 9 (The Grind) and Law 5 (Scarcity).*

**Storage:** `postgres-primary.intentions`

```json
{
  "intention": {
    "id": "uuid",
    "category": "enum (maintenance | ambition | obligation | leisure | social)",
    "description": "string",
    "resource_cost": {
      "time_minutes": "integer",
      "energy_cost": "float",
      "financial_cost": "float"
    },
    "pressure": "float (0.0 to 100.0)",
    "is_active": "boolean"
  }
}

```

* **Critical Logic:** `resource_cost` forces **Opportunity Cost**. Every plan (e.g., "Go to Cinema") has a defined cost in Time, Energy, and Money. The Agent *cannot* execute an intention if they lack the resources in S3 (Energy) or S2 (Money).

---

## 3. THE MUTATION RULES (StateDelta V2)

To ensure **Physics Compliance**, the Delta Protocol is updated. Any state change must occur via one of these atomic operations:

1. **`APPLY_ENTROPY` Operation:**
* **Input:** `TimeDelta`
* **Effect:** Decreases S2 `health_state`, decreases S4 `intimacy_score`, increases S3 `sleep_pressure`.


2. **`CONSUME_RESOURCE` Operation:**
* **Input:** `ActionID`
* **Effect:** Atomically reduces Energy (S3) and Money (S2) derived from the `resource_cost` of the intention.


3. **`TRAVEL_UPDATE` Operation:**
* **Input:** `Origin`, `Destination`, `TransportMethod`
* **Effect:** Validates `Distance / Velocity <= TimeDelta`. If invalid, throws `PHYSICS_VIOLATION`. If valid, updates Location and consumes massive Time/Energy.


4. **`STATUS_TRANSACTION` Operation:**
* **Input:** `InteractionEvent`
* **Effect:** Adjusts `status_stance` (S5) based on the outcome of a dialogue turn (e.g., being interrupted forces a shift to `low_status`).

