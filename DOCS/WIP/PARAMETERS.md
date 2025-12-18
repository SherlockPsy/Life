# PARAMETERS.md
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
# PARAMETERS.md
## Governing Parameters and Change Control (Canonical Support File)

This file exists to prevent “tuning” from becoming a backdoor that violates `LIFE_LAWS.md` or `ARBITRATION_LAWS.md`.

It defines:
- the kinds of parameters the system may expose,
- where they live,
- and how changes are allowed.

This file does **not** introduce new life rules. It only constrains configuration.

---

## 0) Authority and Precedence

- Parameters must never be used to violate `LIFE_LAWS.md`.
- Parameters must never be used to violate `ARBITRATION_LAWS.md`.
- If a parameter change would effectively change a law, that change is invalid unless the law files are explicitly amended and versioned.

---

## 1) Parameter Types (Allowed)

### 1.1 Drift Parameters (state moves even when nothing surfaces)
Examples of allowed drift parameters:
- baseline drift rates for internal state dimensions (fatigue recovery, stress decay, mood drift)
- relational balance drift rates (trust erosion rate under neglect, goodwill decay)
- pressure accumulation rates (how quickly unresolved intentions become weighty)
- habituation rates (how quickly repeated exposure loses charge)

**Hard constraint:** drift must remain continuous under time advance (LIFE_LAW 3) and must not be turned off to create stasis.

---

### 1.2 Arbitration Parameters (what becomes lived)
Examples of allowed arbitration parameters:
- salience weighting coefficients (recency weight, emotional charge weight, bodily-signal weight)
- threshold sensitivity (how easily latent pressure crosses into awareness)
- capacity saturation thresholds (when arbitration becomes crude)
- temporal density thresholds (minimum “compression” allowed per unit time under different contexts)

**Hard constraint:** these parameters may shape selection, but must not force “important things” to surface, must allow silence, and must preserve temporal density (ARB A15).

---

### 1.3 Structural Condition Parameters (load-bearing realities)
Examples:
- propagation strength multipliers for structural loads (pregnancy/illness/grief)
- phase progression (e.g., pregnancy trimesters as time-indexed internal changes)
- dominance volatility (how the load competes with other pressures depending on context)

**Hard constraint:** structural conditions must remain non-optional and cross-domain (LIFE_LAW 6).

---

### 1.4 Memory Binding Parameters (knowing without recall)
Examples:
- retention thresholds for “small facts” (preferences, aversions)
- cue sensitivity (what kinds of contexts activate a memory influence)
- decay rules (what can fade, and what must persist)

**Hard constraint:** behaviour may be influenced without recall (ARB A6). “Forgetting” cannot be used to erase consequence (LIFE_LAW 1).

---

### 1.5 Interaction Pattern Parameters (habit formation / inertia)
Examples:
- repetition counts and stability thresholds to crystallise a pattern
- exception tolerance parameters (how many contradictions before a pattern shifts)
- conflict inertia (how long avoidance can remain stable)

**Hard constraint:** patterns must persist until broken (LIFE_LAW 9) and stable incompletion must be allowed (ARB A14).

---

## 2) Where Parameters Live (Single Source of Truth)

Parameters must be stored in exactly one of:
1) A versioned config file in the repo (preferred for “global” constants), OR
2) A dedicated Postgres table (preferred for “live tuning” values)

If parameters exist in multiple places, that is invalid.

---

## 3) Change Control (No Silent Drift)

Any parameter change must be accompanied by:

1) A change note stating:
   - which parameter changed,
   - previous value → new value,
   - intended behavioural effect,
   - and explicit statement of which laws are unaffected.

2) A law compliance check:
   - the change must cite at least one governing law section it touches,
   - and explicitly state why the change does not violate it.

If either is missing, the change is invalid.

---
## Inevitability Parameters — Silence Distribution (Binding)

SILENCE_WINDOW_TICKS:
  type: int
  default: 50
  range: 10–500
  meaning: rolling window size for silence distribution checks

SILENCE_MIN_SILENT_TICKS:
  type: int
  default: 8
  range: 0–SILENCE_WINDOW_TICKS
  meaning: minimum silent ticks required in each window

SILENCE_MAX_SILENT_TICKS:
  type: int
  default: 40
  range: 0–SILENCE_WINDOW_TICKS
  meaning: maximum silent ticks allowed per window unless presence is false or hold is active

SILENCE_MAX_CONSECUTIVE_SURFACED:
  type: int
  default: 12
  range: 1–200
  meaning: forbid block emission on every tick beyond this count without justification

SILENCE_MAX_CONSECUTIVE_SILENT:
  type: int
  default: 25
  range: 1–500
  meaning: forbid prolonged silence unless observable-change predicate remains false

OBSERVABLE_CONFIDENCE_THRESHOLD:
  type: float
  default: 0.70
  range: 0.0–1.0
  meaning: confidence threshold for observable change detection

## Inevitability Parameters — Drift Impact (Binding)

DRIFT_IMPACT_WINDOW_TICKS:
  type: int
  default: 80
  range: 10–1000
  meaning: rolling window for drift impact verification

DRIFT_IMPACT_MIN_DIMENSION_CHANGES:
  type: int
  default: 10
  range: 1–10000
  meaning: minimum impactful dimension changes per window

DRIFT_IMPACT_MIN_ABS_DELTA:
  type: float
  default: 1.0
  range: 0.0–100.0
  meaning: minimum normalized absolute delta to count as impactful

DRIFT_IMPACT_MIN_ARBITRATION_INPUTS:
  type: int
  default: 3
  range: 1–1000
  meaning: minimum arbitration-relevant inputs crossing thresholds per window


## 4) Prohibited Uses (Backdoor List)

Parameters must never be used to:
- make participants unrealistically available (violates LIFE_LAW 4)
- force surfacing for engagement/plot (violates LIFE_LAW 13 and ARB A1/A14/A15)
- compress time into highlights for convenience (violates ARB A15)
- erase or soften consequences retroactively (violates LIFE_LAW 1)
- remove drift to create stasis (violates LIFE_LAW 3)
- “stabilise” meaning into shared certainty (violates LIFE_LAW 12)
---

## END OF PARAMETERS.md
