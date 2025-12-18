# 02_CONTRACT_STATE (V2)

**Status:** DRAFT V2 (Aligning with Constitution V2)
**Definition:** The Physics of Data and Change.

---

## 1. AUTHORITY AND SCOPE

This document defines the **Application State** of VirLife. It is the single source of truth for the 6 Substrates.
**Binding Constraint:** The state defined here must be sufficient to simulate the **Bio-Loop**, **Entropy**, and **Continuous Time** mandated by the Constitution.

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
    "time_dilation_factor": "float (1.0 = Realtime)",
    "user_presence": {
      "is_present": "boolean",
      "last_interaction_at": "UTC ISO-8601",
      "accumulated_absence_seconds": "integer"
    }
  }
}

```

* **Change:** Removed "Freezing." Time is now tracked alongside `accumulated_absence` to calculate entropy during silence.

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
    "health_state": "float (0-100)", 
    "maintenance_required": "boolean"
  }
}

```

* **Change:** Added `health_state` to objects (e.g., Car, Guitar) to track **Atrophy/Decay** (Law 3).

### S3 — Internal State (The Bio-Machine)

*Implements Law 7 (Concurrent Domains) and Law 8 (Homeostasis).*

**Storage:** `postgres-primary.agent_state`

```json
{
  "internal_state": {
    "core_affect": {
      "valence": "float (-100 to +100)",
      "arousal": "float (0–100)",
      "dominance": "float (-100 to +100)"
    },
    "biological_drivers": {
      "energy": "float (0–100)",
      "satiety": "float (0–100)", 
      "sleep_pressure": "float (0–100)",
      "pain_level": "float (0–100)"
    },
    "cognitive_load": "float (0–100)"
  }
}

```

* **Change:** Split "Internal State" into **Affect** (Psychology) and **Biological Drivers** (Physiology) to enforce the "Hungry = Angry" logic.

### S4 — Relational State (The Connection)

*Implements Law 3 (Entropy) and Law 18 (Connection).*

**Storage:** `postgres-primary.relationships`

```json
{
  "relational_state": {
    "intimacy": "float (0–100)",
    "trust": "float (0–100)",
    "tension": "float (0–100)",
    "last_contact_at": "tick_id"
  }
}

```

* **Change:** Added `last_contact_at`. The Drift Engine uses this to calculate **Decay** (Law 3: "Relationships rot without maintenance").

### S5 — Interaction Mode (The Social Physics)

*Implements Law 15 (Status) and Law 10 (Default Mode).*

**Storage:** `postgres-primary.agent_state`

```json
{
  "interaction_mode": {
    "current_mode": "enum (default_mode | high_salience | intimacy | conflict | ritual)",
    "pulse_rate": "integer (0–100)",
    "status_stance": "enum (high | low | neutral)"
  }
}

```

* **Change:** Added `pulse_rate`.
* **0-30:** Slow, monologues (Dinner).
* **31-70:** Standard dialogue.
* **71-100:** Micro-turns, fragments, high interruption (Sex/Fight).



### S6 — Intentional State (The Grind)

*Implements Law 9 (The Grind) and Law 5 (Scarcity).*

**Storage:** `postgres-primary.intentions`

```json
{
  "intention": {
    "id": "uuid",
    "category": "enum (maintenance | ambition | obligation | leisure)",
    "description": "string",
    "resource_cost": {
      "time_minutes": "integer",
      "energy_cost": "float",
      "financial_cost": "float"
    },
    "pressure": "float (0–100)"
  }
}

```

* **Change:** Added `resource_cost`. Every plan (going to the cinema) now has a defined cost in Time, Energy, and Money, forcing **Opportunity Cost** decisions (Law 5).

---

## 3. THE MUTATION RULES (StateDelta V2)

To ensure **Physics Compliance**, the Delta Protocol is updated:

1. **`APPLY_ENTROPY` Operation:** A specific operation that degrades S2 (Objects) and S4 (Relationships) based on `TimeDelta`.
2. **`CONSUME_RESOURCE` Operation:** Actions must atomically reduce Energy/Money in S3/S6.
3. **`TRAVEL_UPDATE` Operation:** A special location update that validates `Distance / Velocity <= TimeDelta`. If invalid, it throws a `PHYSICS_VIOLATION` error.
