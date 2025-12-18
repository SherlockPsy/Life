# INEVITABILITY_ADDENDUM.md
## Mandatory Support Artifact — VirLife Canon
## INEVITABILITY LAYER — VERSION 1.0 — BINDING WHEN REFERENCED

This file is a **Mandatory Support Artifact**.

Binding rule:
- When referenced by a canonical file (LIFE_LAWS / ARBITRATION_LAWS / LIFE_MECHANICS / DRIFT_SPEC / INFRA_SPEC / BUILD_CONTRACT),
  the referenced portion is mandatory.
- This file may not contradict higher-precedence canonical files.
- If any conflict exists, canonical files win and this file must be updated to restore consistency.

Purpose:
- Convert “correct intentions” into **mechanically testable inevitabilities**.
- Close the remaining loopholes where an LLM can build a technically compliant but phenomenologically wrong system.

This file does not add new “life laws”.
It adds **enforcement constraints** that operationalize existing laws.

---

# SECTION I — SILENCE DISTRIBUTION CONSTRAINT (HARD)

## I.1 Rationale (Binding)
This system permits “nothing happens” and forbids narrative forcing.
However, a builder can still accidentally (or “helpfully”) surface small content every tick, creating constant low-grade narration.
That violates:
- ARB A15 (Temporal Density Preservation)
- ARB A14 (Stable Incompletion)
- ARB A1 (Uneven Salience)
- LIFE principles around non-optimisation and non-forcing (as already defined upstream)

Therefore: the system must enforce a **silence distribution** over time.

## I.2 Definitions (Binding)
- “Surface” means: a UI-visible Rendered Block is committed (text shown to participant).
- “Silent tick” means: system_time advances and/or internal state mutates, but **no Rendered Block** is emitted.
- “Window” means: a contiguous run of ticks measured on system_time.current_tick_id.

## I.3 Silence distribution requirements (Non-negotiable)
These are enforced via PARAMETERS.md and conformance tests.

A) Minimum silence presence:
- In any rolling window of SILENCE_WINDOW_TICKS,
  there must be at least SILENCE_MIN_SILENT_TICKS silent ticks.

B) Maximum silence (avoid “dead world” unless justified):
- In any rolling window of SILENCE_WINDOW_TICKS,
  there must be at most SILENCE_MAX_SILENT_TICKS silent ticks,
  unless HOLD is active or presence is false (no time advance).

C) Anti-constant-surfacing rule:
- It is invalid for the system to emit a Rendered Block on every tick for more than SILENCE_MAX_CONSECUTIVE_SURFACED ticks,
  unless:
  - a Hold exists, OR
  - explicit direct-address gating as defined in Renderer Rules.md has been triggered upstream, OR
  - an intrusion/perturbation has been logged as active in state (S2 fact with type=intrusion and confidence>=threshold).

D) Anti-constant-silence rule:
- It is invalid for the system to produce no Rendered Blocks for more than SILENCE_MAX_CONSECUTIVE_SILENT ticks
  while presence is true and no Hold exists,
  unless:
  - State indicates no observable channel changes are occurring (see I.4),
  AND
  - arbitration dominance indicates latent-only experience (ARB A1/A5) is active.

## I.4 Observable channel test (Binding)
To prevent “silence rules” from forcing content, the system must define an observable-change predicate:
OBSERVABLE_CHANGE_OCCURRED(tick) is true if any of the following occurred during that tick:
- Any participant changed physical location (Map/position changed), OR
- Any participant produced speech (explicit dialogue event upstream), OR
- Any object interaction event occurred (touch/use/move), OR
- Any sensory relevant fact was added/updated with confidence >= OBSERVABLE_CONFIDENCE_THRESHOLD.

If OBSERVABLE_CHANGE_OCCURRED(tick) is false, a silent tick is always permitted.

## I.5 Enforcement mechanism (Binding)
- The silence distribution is enforced by:
  1) deterministic counters over committed blocks vs ticks
  2) conformance tests that simulate windows and validate constraints
- The renderer is not responsible. The tick/orchestration layer is responsible.

---

# SECTION II — DRIFT IMPACT REQUIREMENT (HARD)

## II.1 Rationale (Binding)
DRIFT_SPEC requires continuous drift while time advances and forbids no-op drift.
A builder can still implement “cosmetic drift” (numbers change but nothing ever matters).
That violates:
- DRIFT_SPEC (anti-stagnation + auditability)
- ARB A5 (parallel persistence) and A3 (contextual dominance) in practice
- the system’s realism goals

Therefore: drift must be measurably consequential over time.

## II.2 Definitions (Binding)
- “DriftDelta” means: any delta applied due to drift execution (as per DRIFT_SPEC).
- “Impactful drift” means: drift changes at least one arbitration-relevant input enough to change downstream selection probabilities or dominance outcomes within a window.
- “Arbitration-relevant inputs” include:
  - S3 internal_state dimensions
  - S4 relational_state dimensions
  - S5 interaction_mode.current_mode or stability
  - S6 intentional_state pressures
  - S2 facts that modulate salience/context (where applicable)

## II.3 Impact requirements (Non-negotiable)
These are enforced via PARAMETERS.md and conformance tests.

A) Non-triviality (per window):
- In any rolling window of DRIFT_IMPACT_WINDOW_TICKS where presence is true,
  drift must produce at least DRIFT_IMPACT_MIN_DIMENSION_CHANGES updates
  such that the absolute change magnitude for each update >= DRIFT_IMPACT_MIN_ABS_DELTA (dimension-specific normalization allowed via PARAMETERS).

B) Arbitration coupling:
- In any rolling window of DRIFT_IMPACT_WINDOW_TICKS where presence is true,
  at least DRIFT_IMPACT_MIN_ARBITRATION_INPUTS must cross a threshold boundary used by arbitration/selection logic,
  where thresholds are declared in PARAMETERS.md.
(Example boundaries: saturation thresholds, dominance flips, salience boosts, mode changes, pressure thresholds.)

C) Outcome variability under stable external events:
- Under a fixed repeated micro-scenario (same external inputs, same map, same activity type),
  the system must be capable of producing different experienced dominance/salience outcomes across windows due solely to drift.
This does NOT mean “random”; it means state-driven divergence.

## II.4 Deterministic audit trace requirement (Binding)
For every DriftDelta applied:
- record:
  - substrate (S1–S6)
  - dimension name
  - old value
  - new value
  - driver class (time baseline / activity modulation / perturbation / non-event)
  - clamp flag if clamped (as per DRIFT_SPEC)
- If driver class is “non-event”, the non-event must be attributed to a known thread or context key.

## II.5 Prohibition (Binding)
It is invalid if drift:
- only changes dimensions that are never referenced by arbitration or action selection,
- changes dimensions only within noise below meaningful thresholds,
- changes dimensions but cannot ever influence experienced outcomes.

---

# SECTION III — CONFORMANCE TEST OBLIGATION (HARD)

## III.1 Mandatory tests
Any implementation is invalid unless it includes tests that prove:
- Silence distribution constraint holds (Section I)
- Drift impact requirement holds (Section II)

## III.2 Failure semantics
If any inevitability test fails:
- build is invalid
- deploy is invalid
- runtime must refuse to start (in strict mode) OR refuse to enable tick execution.

---

END OF INEVITABILITY_ADDENDUM.md