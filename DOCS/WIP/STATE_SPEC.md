STATE_SPEC.md

Canonical State Containers — VirLife System

BINDING SUPPORT ARTIFACT — VERSION 1.0

⸻

0. Authority and Scope

This document defines the canonical minimum state container shapes for all six substrates (S1–S6).

It is a Mandatory Support Artifact as defined in all canonical specs.
	•	It may not contradict LIFE_LAWS.md or ARBITRATION_LAWS.md
	•	It may not redefine mechanics from LIFE_MECHANICS.md
	•	It must be used by any implementation that stores or mutates truth

Any implementation that invents alternative state shapes violates the system contract.

⸻

1. General State Principles (Global Invariants)

These apply to all substrates.

1.1 Explicit Dimensionality

All state must be represented as explicit dimensions.
Implicit meaning is forbidden.

1.2 Bounded Ranges

Every dimension must have:
	•	a declared range
	•	a declared default
	•	declared drift behaviour (if applicable)

Unbounded free-form state is forbidden.

1.3 No Narrative State

State containers must never store:
	•	prose
	•	interpretation
	•	explanation
	•	emotional narration

State is numeric, categorical, or boolean only.

⸻

2. S1 — Temporal State (Time)

{
  "system_time": {
    "current_timestamp": "UTC datetime",
    "current_tick_id": "int (monotonic, +1 each tick; never decreases)",
    "world_singleton_id": "constant (single value for entire system lifetime)",
    "last_advanced_at": "UTC datetime",
    "presence_gate": {
      "is_present": "boolean",
      "last_presence_change": "UTC datetime"
    }
  }
}

Invariants
	•	system_time advances only when is_present == true
	•	No jumps, rewinds, or skips
	•	All other substrate mutations reference the same current_timestamp
	•	current_tick_id is strictly monotonic: it may only increase
	•	world_singleton_id never changes after initialization
	•	No system operation may set current_timestamp or current_tick_id to any earlier value
	•	Past ticks may be referenced for continuity/memory only; they may not become “present”
⸻

3. S2 — Situational State (World Facts)

{
  "situational_facts": {
    "fact_id": {
      "type": "enum",
      "participants": ["participant_id"],
      "location_id": "location_id | null",
      "introduced_at": "UTC datetime",
      "persistence": "transient | persistent | structural",
      "confidence": "0.0–1.0"
    }
  }
}

Notes
	•	Facts are descriptive, not interpretive
	•	Confidence reflects epistemic certainty, not truthfulness
	•	Structural facts trigger LIFE_LAW 6 but do not encode behaviour

⸻

4. S3 — Internal State (Participant-Centric)

Per participant:

{
  "internal_state": {
    "energy": "0–100",
    "stress": "0–100",
    "affect_valence": "-100–100",
    "affect_arousal": "0–100",
    "cognitive_load": "0–100",
    "embodied_factors": {
      "fatigue": "0–100",
      "health_load": "0–100",
      "hormonal_shift": "-100–100"
    }
  }
}

Invariants
	•	Drift may change values gradually
	•	Arbitration may not change these values
	•	Embodied factors may override arbitration outcomes (ARB A7)

⸻

5. S4 — Relational State (Dyadic, Asymmetric)

Per ordered pair (A → B):

{
  "relational_state": {
    "trust": "0–100",
    "affinity": "-100–100",
    "tension": "0–100",
    "familiarity": "0–100",
    "reliance": "0–100"
  }
}

Invariants
	•	A → B ≠ B → A
	•	Changes are cumulative (LIFE_LAW 5)
	•	No instant flips allowed outside thresholds

⸻

6. S5 — Interaction Mode State (Patterned Behaviour)

Per participant:

{
  "interaction_mode": {
    "current_mode": "enum",
    "mode_stability": "0–100",
    "last_mode_change": "UTC datetime"
  }
}

Examples of modes (non-exhaustive):
	•	engaged
	•	distracted
	•	withdrawn
	•	playful
	•	guarded
	•	fatigued

Invariants
	•	Modes bias interaction, they do not force action
	•	Modes persist by inertia (LIFE_LAW 9)

⸻

7. S6 — Intentional State (Pressure Inventory)

Per participant:

{
  "intentional_state": {
    "active_intentions": {
      "intention_id": {
        "category": "plan | worry | desire | promise | fear",
        "pressure": "0–100",
        "introduced_at": "UTC datetime",
        "decay_profile": "none | slow | conditional"
      }
    }
  }
}

Invariants
	•	Intentions create pressure without action (LIFE_LAW 10)
	•	Pressure may increase even if intention is unsurfaced
	•	Removal requires explicit resolution or abandonment

⸻

8. Drift Interaction Rules (Cross-Substrate)
	•	Drift must affect at least one numeric dimension when time advances
	•	Drift must be:
	•	bounded
	•	logged
	•	attributable to a substrate
	•	“No-op drift” is forbidden

⸻

9. Arbitration Boundary (Hard Rule)
	•	Arbitration reads from S1–S6
	•	Arbitration produces experience selection only
	•	Arbitration may not write, mutate, clamp, or reinterpret state

Any implementation that violates this boundary is invalid.

⸻

10. Extension Rule

New dimensions may be added only if:
	•	mapped to LIFE_LAWS and ARBITRATION_LAWS
	•	ranges and defaults are declared
	•	LAW_MAPPING_INDEX is updated

⸻

END OF STATE_SPEC.md
