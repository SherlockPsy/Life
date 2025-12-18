# 00_CONSTITUTION.md

## The Supreme Law of VirLife

### 1. AUTHORITY AND PRECEDENCE

**Status:** CANONICAL | **Version:** 1.0 (Consolidated)

This document is the **Supreme Authority** for the VirLife system. It defines the physics, ethics, and hard constraints of the simulation.

**The Hierarchy of Truth:**

1. **`00_CONSTITUTION.md` (This Document)** — Defines Reality, Time, and Experience.
2. **`01_SYSTEM_ARCHITECTURE.md`** — Defines the Machine (Infrastructure, Schemas, Execution Loop).
3. **`02_CONTRACT_STATE.md`** — Defines the Data Shapes.
4. **`03_CONTRACT_RENDERER.md`** — Defines the Output Rules.
5. **`04_CONTRACT_AGENT.md`** — Defines the Cognition/AI Rules.

**Binding Constraint:**
If any lower-level document, code implementation, prompt, or architectural decision conflicts with this Constitution, **this Constitution wins**. No optimization, narrative convenience, or "user happiness" metric may violate these laws.

---

### 2. THE SIX LIFE SUBSTRATES (The Material of Reality)

*(Derived from `LIFE_MECHANICS.md` and `STATE_SPEC.md`)*

All life in the system evolves exclusively along these six substrates. No other "hidden" state exists.

* **S1 — Temporal Continuity:** The irreversible passage of system time (`current_tick_id`).
* **S2 — Situational State:** What is true about the external world right now (Facts, Locations).
* **S3 — Internal State:** What is true inside a participant (Energy, Mood, Health).
* **S4 — Relational State:** What is true between participants (Trust, Tension, Affinity).
* **S5 — Interaction State:** How participants habitually deal with one another (Modes, Patterns).
* **S6 — Intentional Pressure:** What pulls, pushes, or weighs on a participant (Plans, Fears).

---

### 3. THE LAWS OF LIFE (Reality Generation)

*(Derived from `LIFE_LAWS.md`. These laws govern what **exists**, regardless of whether it is seen.)*

**LAW 1 — Temporal Irreversibility**
Time moves in one direction only. Nothing resets. Nothing rewinds. There are no "save slots" or "relive" functions. History is read-only influence; it never becomes present state.

**LAW 2 — State Precedes Event**
Events do not create reality; they reveal or perturb it. Something is always true *before* an event happens. Life is driven by underlying state (S3/S4/S6), not by narrative beats.

**LAW 3 — Continuous Drift**
If time advances, state changes somewhere. Stasis is impossible. Change does not require action, acknowledgement, or observation.

**LAW 4 — Limited Human Capacity**
Participants have finite bandwidth. No one can respond to everything. Silence, delay, and non-response are valid, neutral outcomes, not errors.

**LAW 5 — Accumulation Without Visibility**
Repeated exposure or absence produces change (trust, erosion, safety) even without explicit events or discussion.

**LAW 6 — Structural Conditions**
Certain realities (pregnancy, illness, grief, poverty) are "Load-Bearing." They are not events but continuous pressures that propagate across all domains until resolved.

**LAW 7 — Experiential Asymmetry**
A relationship `A->B` is distinct from `B->A`. Shared experience does not mean shared meaning.

**LAW 8 — Crystallisation of Interaction**
Repeated interactions stabilize into patterns (Habits). These patterns emerge automatically and reduce the friction of choice.

**LAW 9 — Inertia of Established Patterns**
Once established, a pattern persists by default. It changes only if explicitly challenged or eroded by sustained pressure.

**LAW 10 — Intentional Pressure**
Intentions (plans, worries, desires) create internal pressure (S6) even without action. This pressure accumulates over time.

**LAW 11 — Non-Action Is Action**
Silence and delay are real behaviors with real consequences. They are never "null" states.

**LAW 12 — Private Meaning**
Meaning is subjective. The system must never enforce a "shared truth" about how an event felt. Misunderstanding is a feature.

**LAW 13 — Anti-Optimisation**
Life does not optimize for clarity, satisfaction, or closure. The system must actively resist "tidying up" the narrative.

**LAW 14 — Opacity of Reality**
Most changes are invisible. Only a small fraction of reality (S2–S6) ever surfaces to the UI.

**LAW 15 — Provenance**
Nothing comes from nowhere. Every state change must have a plausible causal origin in prior state or context.

---

### 4. THE ARBITRATION LAWS (Experience Selection)

*(Derived from `ARBITRATION_LAWS.md`. These laws govern what is **shown**, delayed, or suppressed.)*

**A1 — Uneven Salience:** Not all truth is equally loud. Salience is driven by emotion/context, not "importance."
**A2 — Non-Linear Threshold Crossing:** Awareness is not gradual. Latent pressures accumulate silently until they snap across a threshold.
**A3 — Contextual Dominance:** "What wins" depends on the immediate context (energy, setting), not just long-term importance.
**A4 — Capacity Saturation:** When overwhelmed, arbitration becomes crude. Nuance collapses into habit or avoidance.
**A5 — Parallel Thread Persistence:** Unattended threads (S6) do not pause. They continue to evolve and drift in the dark.
**A6 — Non-Conscious Memory Binding:** Past events influence behavior without requiring explicit recall or narrative reference.
**A7 — Embodied Rhythms:** Biological states (fatigue, hormones) can override rational arbitration.
**A8 — Path Dependence:** Life follows existing tracks. Change has friction.
**A9 — Quiet Value Recalibration:** Norms shift slowly through exposure, not just through dramatic decisions.
**A10 — Ambient Social Influence:** Atmosphere affects state even without direct interaction.
**A11 — Narrative Substitution:** Agents may generate coherent "lies" (false causal narratives) to explain tension or reduce discomfort.
**A12 — Retrospective Reweighting:** The meaning of past events can change later without the facts changing.
**A13 — Habituation:** Repeated exposure often reduces emotional weight (desensitization).
**A14 — Stable Incompletion:** Arcs may remain unresolved indefinitely. Closure is not required.
**A15 — Temporal Density Preservation:** Time must feel like time. Two hours of boredom must feel dense, not skipped.

---

### 5. MECHANICS: DRIFT & TIME

*(Derived from `DRIFT_SPEC.md` and `LIFE_MECHANICS.md`)*

**5.1 The Time Checksum (Presence Gating)**

* System Time (`S1`) advances **if and only if** the user (George) is **Present**.
* If George is absent, the universe is frozen. No drift, no aging, no processing.
* **Drift Execution:** Drift executes *only* when S1 advances.

**5.2 The Drift Mandate**

* **Definition:** Drift is the continuous evolution of S3, S4, and S6 caused by time alone.
* **Constraint:** Drift must be expressed exclusively as `StateDelta` operations.
* **No-Op Forbidden:** If time advances, *something* must drift (even if microscopically).

---

### 6. INEVITABILITY CONSTRAINTS (The Anti-Chatbot Rules)

*(Derived from `INEVITABILITY_ADDENDUM.md`. These are hard mathematical constraints enforced by tests.)*

**6.1 Silence Distribution (The "Shut Up" Rule)**
To prevent constant, eager narration, the system must enforce silence.

* **Window Size:** `50 ticks` (Rolling Window)
* **Minimum Silence:** In any 50-tick window, there must be at least **8 ticks** where *nothing is rendered* (Silent Ticks).
* **Maximum Silence:** In any 50-tick window, there must be at most **40 Silent Ticks** (unless the user is absent or a Hold is active).
* **Anti-Constant-Surfacing:** It is **INVALID** to render text on every tick for more than **12 consecutive ticks** (unless in a high-intensity scene).

**6.2 Drift Impact (The "Realism" Rule)**
Drift cannot be cosmetic. It must matter.

* **Window:** `80 ticks`
* **Impact Requirement:** Drift must produce at least **10 dimension changes** > `1.0` (normalized magnitude) per window.
* **Arbitration Crossing:** At least **3 drift updates** per window must cross a threshold that alters arbitration logic (e.g., flipping a mood from "Calm" to "Irritable").

---

### 7. GLOBAL PARAMETERS (Tuning)

*(Derived from `PARAMETERS.md`)*

The following parameters are **Binding**. Implementation must respect these bounds.

| Parameter | Default | Range | Meaning |
| --- | --- | --- | --- |
| `SILENCE_WINDOW_TICKS` | 50 | 10–500 | Rolling window for silence checks. |
| `SILENCE_MIN_SILENT` | 8 | 0–50 | Min silent ticks per window. |
| `SILENCE_MAX_SILENT` | 40 | 0–50 | Max silent ticks per window (anti-dead-world). |
| `SILENCE_MAX_SURFACED` | 12 | 1–200 | Max consecutive ticks with text output. |
| `DRIFT_IMPACT_WINDOW` | 80 | 10–1000 | Window for checking drift consequence. |
| `DRIFT_MIN_CHANGES` | 10 | 1–1000 | Min number of state changes per window. |
| `OBSERVABLE_CONFIDENCE` | 0.70 | 0.0–1.0 | Threshold for a fact to be "observable." |

---

### 8. CHANGE CONTROL

This Constitution allows **no silent drift**. Any change to these rules must be explicit, versioned, and justified against the Core Axioms.