# 1 - LIFE_MECHANICS.md
## VirLife Life Mechanics Specification (How Life Works In-System)
## CANONICAL — SUBSTRATE-ALIGNED — CLOSED

## Authority and Precedence

This file is part of the **VirLife Canonical Specification Set**.

**Canonical files (exactly these six):**
1. `LIFE_LAWS.md`
2. `ARBITRATION_LAWS.md`
3. `LIFE_MECHANICS.md`
4. `DRIFT_SPEC.md`
5. `INFRA_SPEC.md`
6. `BUILD_CONTRACT.md`

**Precedence (highest to lowest):**
`LIFE_LAWS` → `ARBITRATION_LAWS` → `LIFE_MECHANICS` → `DRIFT_SPEC` → `INFRA_SPEC` → `BUILD_CONTRACT` → implementation/code.

**Mandatory support files (binding within scope):**
- `PARAMETERS.md` — defines numeric bounds, rates, weights, thresholds, and tuning knobs used by drift/arbitration. It is **binding** wherever referenced. It may not contradict `LIFE_LAWS.md` or `ARBITRATION_LAWS.md`. If a parameter is required and missing/ignored, the implementation is invalid.
- `LAW_MAPPING_INDEX.md` — defines required mappings from mechanics to laws. It is **binding** for review and change control. Any mechanics section or change that lacks mappings is invalid.

**Support-file rule:** Support files are not part of the canonical precedence chain. When a support file conflicts with a canonical file, the canonical file wins. When a canonical file references a support file, that referenced portion is mandatory.

If any statement conflicts with a higher-precedence document, the higher-precedence document wins. Lower-precedence documents must be updated to restore consistency.

---

Audience: life engine implementer (LLM or human)

Purpose:  
Define how life unfolds in-system with experiential fidelity by specifying  
**the complete set of life substrates and the laws governing their evolution**.

This document defines **how life works**, not how it is built, prompted, or rendered.

---

# A. The Six Life Substrates (Closed Set)

All life in VirLife evolves exclusively along these six substrates.  
No other substrate exists. No rule may operate outside them.

### S1 — Temporal Continuity  
The irreversible passage of system time.

### S2 — Situational State  
What is true about the external world right now.

### S3 — Internal State  
What is true inside a participant.

### S4 — Relational State  
What is true between participants.

### S5 — Interaction State  
How participants habitually deal with one another.

### S6 — Intentional Pressure  
What pulls, pushes, or weighs on a participant over time.

Every rule below explicitly maps to one or more of these substrates.

---

# 0) Checksums (Non-Negotiable)

### 0.1 Primary Intent Checksum  
**Substrates:** S1–S6

> The system exists to prevent the relationship from becoming easier, clearer,
> faster, or more available than it would be in real life — while still allowing
> the full spectrum of human experience to emerge.

This checksum constrains *all substrate evolution*.

---

### 0.2 Time Checksum (Presence-Gated)  
**Substrate:** S1

> System time advances if and only if George is present.

If George is absent:
- S1 does not advance
- S2–S6 do not evolve
- nothing accumulates
- nothing decays
- nothing happens to anyone

This is not “paused time”.  
It is **temporal non-existence**.

---

### 0.3 Continuity Checksum  
**Substrates:** S1 + S3 + S4 + S6

> Life is constant activity sitting on top of continuously drifting conditions.

Activity occurs on top of substrates; it does not replace them.

---

# 1) What This System Is  
**Substrates:** All

The system models:

> **Being a real human inside a life that is already unfolding.**

It does not simulate:
- a global world
- narrative arcs
- optimal interaction
- background timelines

Only substrate evolution inside the causal envelope is modelled.

---

# 2) Governing Realism Principle (Causal Envelope)  
**Substrate:** S2

Only situational facts that can intersect George’s lived life exist.

The world is vast.  
The **situational state** is narrow.

---

# 3) System Time (The Only Clock)  
**Substrate:** S1

### 3.1 Definition
System time is:
- monotonic
- shared
- irreversible
- the backbone of causality

### 3.2 Inactivity Rule
If S1 is not advancing:
- S3 internal states do not drift
- S4 relational states do not drift
- S6 intentional pressures do not accumulate
- S2 does not progress

### 3.3 Active Evaluation
When S1 advances:
- all other substrates are eligible to evolve
- surfacing is optional
- “nothing changed” is valid

---

# 4) The Central Mechanics Question  
**Substrates:** All

At each tick of S1, the system asks:

> Given time advanced, did any substrate change in a way that enters experience?

Most cycles produce **no surfaced change**.

**Clarification (Non-Literal):**  
The “central mechanics question” is a conceptual checksum, not a requirement to implement a literal
question-asking loop.

---

### 4.1 Surfacing and Selection Authority  
**Substrates:** All (via arbitration)

All decisions about **what becomes lived/experienced** are governed by:

- `ARBITRATION_LAWS.md` (supreme second-order authority)

`LIFE_MECHANICS.md` may describe lifecycle placement, but must not redefine:
- salience
- dominance
- threshold crossing
- temporal density
- parallel persistence
- stable incompletion

If any mechanic implies surfacing rules that contradict `ARBITRATION_LAWS.md`, it is invalid.

---

### 4.2 Moment Ordering and Non-Mutation (Locked)

> **Authority Note (Binding):**  
> The ordering described in this section is conceptual and descriptive.  
> The single authoritative and enforceable execution order for all ticks is defined in `SYSTEM_EXECUTION_MODEL.md`.  
> If any discrepancy exists, `SYSTEM_EXECUTION_MODEL.md` takes precedence.

A “Moment” is the smallest atomic unit of system evolution when S1 advances.

**Invariant:** arbitration selects experience; it never changes truth.

Conceptual ordering:
1. Time Advance (S1)
2. Drift Evaluation (S3/S4/S6)
3. World Intrusions (S2)
4. Agent Initiations (S3/S6)
5. Arbitration (experience selection only)
6. Render (non-authoritative)
7. Commit (truth only)

---

# 18) Nothing Happens  
**Substrates:** All

It is valid for:
- S1 to advance
- substrates to drift
- nothing to surface

This is the default state of life.

---

## Inevitability Enforcement Hook (Binding)

Mechanics must satisfy:
- `INEVITABILITY_ADDENDUM.md` Section I (Silence Distribution Constraint)
- `INEVITABILITY_ADDENDUM.md` Section II (Drift Impact Requirement)

Any mechanics implementation that does not prove these constraints via tests is invalid.

END OF LIFE_MECHANICS.md
