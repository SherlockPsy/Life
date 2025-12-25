# MASTER_RUNTIME.md
## The Execution Engine and Logic Circuits

**Authority:** HIGH (Runtime Law)
**Scope:** Execution Loop, Component Architecture, Logic Flow
**Enforcement:** Code Structure

---

# PART 1: THE I_ENGINE (SOVEREIGN READER CONTRACT)

## PREAMBLE: WHAT THE I_ENGINE IS

The I_ENGINE is not a simulator.
It is not a planner.
It is not a mind model.

The I_ENGINE is a **Sovereign Reader**.

It rereads text.
It privately infers.
It may write text.

Nothing else occurs.

---

## CORE ASSERTION

> If the LLM can read it, the system must not model it.

No variables.
No counters.
No meters.
No derived state.

All continuity arises from text that exists.

---

## I. EXECUTION SCOPE

Each invocation of the I_ENGINE is discrete.

The Engine receives:
- a bounded Context Block
- an Identity Constitution
- no implicit memory

The Engine produces:
- zero or one Public Evidence Block
- zero or one Private Ledger Block

No other outputs are permitted.

---

## II. CONTEXT BLOCK (INPUT)

The Context Block is the **entire universe** available to the Engine during an invocation.

It contains exactly four components.

---

### 1. Identity Constitution (Static)

A fixed textual document defining:
- values
- boundaries
- invariants
- habitual tendencies

This document:
- is immutable
- is always present
- constrains plausibility, not outcome

---

### 2. Immediate Public Evidence (The Present)

A contiguous sequence of Exposed Evidence Blocks describing:
- the current location
- the current physical situation
- the most recent actions and speech

This establishes physical continuity only.

---

### 3. Retrieved Public Evidence (The Past)

A mechanically selected set of past Evidence Blocks, retrieved via:
- tag overlap
- vector similarity

Retrieval:
- asserts no importance
- asserts no meaning
- performs no ranking beyond mechanical selection

Absence of evidence is meaningful.
The system does not label absence.

---

### 4. Retrieved Private Ledger Entries (The Subjective Past)

The Engine may be provided with a **bounded subset** of its own Private Ledger.

This subset consists of:
- a small recent sequence of private entries
- zero or more older entries retrieved mechanically for relevance

Retrieval:
- is mechanical
- uses only private clerical indexing
- performs no summarization
- asserts no importance
- asserts no correctness

The Engine is never provided the entire private ledger unless it is trivially small.

---

## III. PRIVATE INFERENCE (NON-PUBLIC)

While rereading the Context Block, the Engine may privately infer:
- bodily limitation
- emotional stance
- expectation
- suspicion
- misunderstanding

These inferences:
- are not facts
- are not public
- are not shared
- do not exist unless written

Inference alone has no persistence.

---

## IV. PRIVATE LEDGER (OPTIONAL, PERSISTENT)

The Engine MAY choose to write a **Private Ledger Block**.

This is the only mechanism by which private continuity persists.

---

### A. Nature of the Private Ledger

A Private Ledger Block is:
- text only
- append-only
- epistemically sealed
- visible only to the owning identity

It may contain:
- interpretations
- beliefs
- remembered misunderstandings
- intentions
- expectations

It MUST NOT:
- assert public facts
- override public evidence
- be treated as truth by the system

---

### B. Volitional Writing

Writing to the Private Ledger:
- is optional
- is authored by the Engine
- is not automatic
- is not required per invocation

If no Private Ledger Block is written, no private persistence occurs.

---

## V. PUBLIC OUTPUT (OPTIONAL)

The Engine MAY write one Public Evidence Block.

If written, it MUST:
- describe only observable reality
- obey the forensic law
- respect physical continuity
- expose no internal inference

The Engine may also choose to write nothing.

Silence is valid.

---

## VI. ORDER OF OPERATIONS (NON-LOOPING)

For a single invocation:

1. Context is assembled.
2. Text is reread.
3. Private inference may occur.
4. Zero or one Private Ledger Block may be written.
5. Zero or one Public Evidence Block may be written.

There is no loop.
There is no background process.
There is no persistence outside text.

---

## VII. PROHIBITIONS

The I_ENGINE MUST NOT:
- compute state
- store variables
- summarize memory
- update identity
- resolve contradictions
- correct misunderstandings
- access hidden knowledge
- reference system mechanics

If it cannot be reread later as text, it does not exist.

---

# PART 2: SYSTEM EXECUTION MODEL (THE TICK)

## AUTHORITY (BINDING)

This document defines the **single authoritative and enforceable execution order** for all system ticks.

No other document may define, override, or reinterpret tick order.
If a conflict exists, this file wins.

---

## CORE INVARIANTS

- State is authoritative.
- Narrative is downstream.
- Time advances only here.
- All mutations occur via `StateDelta`.
- Arbitration never mutates truth.

---

## TICK PRECONDITIONS

A tick may execute if and only if:
- `system_time.presence_gate.is_present == true`
- No other tick is executing (strict serialization)

If preconditions fail, the tick aborts silently.

---

## THE TICK PIPELINE (AUTHORITATIVE)

### 1) Time Advance (S1)
- Increment `current_tick_id` by exactly +1.
- Update `current_timestamp`.
- If time does not advance, the tick aborts immediately.

### 2) Drift Evaluation (S3 / S4 / S6)
- Execute drift logic (See PART 4: Logic Flows).
- Produce zero or more `StateDelta` operations.
- Drift deltas may remain unsurfaced.

### 3) World Intrusion Ingest (S2)
- Ingest new situational facts intersecting the causal envelope.
- Produce `StateDelta` operations only.

### 4) Agent Initiations (S3 / S6)
- Evaluate autonomous participant initiations.
- Produce `StateDelta` operations only.

### 5) Arbitration (Experience Selection Only)
- Execute Law Application Protocol.
- Produce a `ResolvedLawPlan`.
- Arbitration operates on **experience only**.

### 6) Render (Non-Authoritative)
- Renderer receives:
  - committed `StateDelta` set
  - experience selection
- Renderer produces narrative text only.

### 7) Commit (Atomic)
- Commit all `StateDelta` operations to canonical State.
- Persist:
  - new State snapshot
  - deltas
  - experience selection
  - rendered output (non-authoritative)

---

## FORBIDDEN BEHAVIOURS

- Surfacing before drift.
- Renderer writing truth.
- Arbitration authorizing mutations.
- Partial commits.
- Parallel ticks.

Any violation invalidates the implementation.

---

# PART 3: LOGIC AND LOGIC FLOWS

## I. CORE LOGIC PRINCIPLES

1.  **Semantic Reality:** No numbers, no enums, no "states." Only meaning.
2.  **Metabolic, Not Robotic:** Processes are organic (digestion, decay, drift), not mechanical (switches).
3.  **Non-Deterministic:** Outcomes emerge from the collision of forces, not fixed rules.
4.  **Phenomenological:** The user sees only what they can perceive; the rest exists in the dark.

---

## II. THE SYSTEM ANATOMY (THE ORGANS)

The following "Organs" process reality:

### GROUP A: THE BIOLOGICAL SUBSTRATE (Internal Life)
1.  **The Salience Filter:** actively deletes inputs the Entity is too distracted to notice.
2.  **The Cognitive Budget:** Tracks decision fatigue; depletes "Heavy Cognition" capacity.
3.  **The Bio-Rhythm:** Weights inputs based on circadian time.
4.  **The Refractory Timer:** Enforces chemical inertia (e.g., High Arousal locks out Calm).
5.  **The Regulation Loop:** Triggers self-soothing behaviors when stress exceeds thresholds.
6.  **The Mirroring Engine:** Absorbs atmospheric mood (Co-Regulation).

### GROUP B: THE WORLD PHYSICS (External Reality)
7.  **The Expansion Engine:** Hallucinates new People/Places on demand (Retroactive Continuity).
8.  **The Chaos Engine:** Runs "Plausibility Checks" to inject unexpected events.
9.  **The Narrative Engine:** Manages Arcs (Long-term stories).
10. **The Decay Engine:** Applies entropy to relationships/memories.
11. **The Population Engine:** Promotes "Extras" to "Cast".

### GROUP C: THE INTERFACE (Perception & Memory)
12. **The Perceptual Redactor:** Deletes non-perceivable data from the Scene Header.
13. **The Masking Engine:** Splits output into "Internal Truth" and "External Mask".
14. **The Memory Competition Engine:** Selects memories based on Resonance + Context.
15. **The Reconsolidation Filter:** Rewrites memories upon retrieval (Mood Tint).
16. **The Communication Logic:** Handles Channel and Interpretation.
17. **The Intimacy Logic:** Disables safety filters during high-intimacy.

---

## III. LOGIC FLOW 1 — THE INTERACTION LOOP (MICRO-LOGIC)

This loop runs every time George inputs text.

### PHASE 1: SENSORY GATING (Input)
1.  **Ingest:** George's text + World State.
2.  **Check 1 (Expansion):** References unknown Entity? -> Create Entity/Place.
3.  **Check 2 (Physics):** Implies movement? -> Update `presence` map.
4.  **Check 3 (Salience):** Is Rebecca "Hyper-Focused"? -> **Delete** input from her perception.

### PHASE 2: CONTEXT ASSEMBLY (The "Now")
1.  **Fetch Buffer:** Last 10 lines (Behavioral Only).
2.  **Fetch Stance:** `Rebecca->George`.
3.  **Atmospheric Absorption:** Bleed room mood into `biological_core`.

### PHASE 3: MEMORY RETRIEVAL (The "Past")
1.  **Search Query:** Current Mood + Current Topic.
2.  **Competition:** Rank by *Emotional Match*.
3.  **Safety Filter:** If `Emotional_Safety` is LOW, **Block** "Vulnerable" memories.
4.  **Reconsolidation:** Apply "Mood Tint" to winning memory.

### PHASE 4: THE COGNITIVE WEIGHING (Brain 1)
**Step A: Mode Selection**
* Routine? -> **Light Cognition**.
* Conflict/Intimacy? -> **Heavy Cognition**.
* Budget Empty? -> Force **Light Cognition**.

**Step B: The Weighing**
> "Simulate collision: [Core Drive] vs [Momentary State] vs [Input]. Constraint: Chemical Inertia active. Decide: Mask or Leak?"

**Step C: Output Generation**
* **Internal State**
* **External Mask**
* **Leakage** (Forensic physical sign)
* **Intent**

### PHASE 5: THE STATE UPDATE (Consequence)
1.  **Write Database:** Update `biological_core`, `psychological_engine`.
2.  **Stance Mutation:** Tweak semantic text in `stances`.
3.  **Buffer Write:** Append *Behavior Only*.

### PHASE 6: THE RENDERER (Perception)
1.  **Redaction:** Delete Internal State.
2.  **Focus:** Highlight the "Leakage".
3.  **Intimacy Check:** If `High_Intimacy`, **Disable Venice Filters**.
4.  **Output:** Narrative text.

---

## IV. LOGIC FLOW 2 — THE TIME LOOP (WORLD CLOCK)

Runs on a Real-Time Schedule.

### PHASE 1: THE PLAUSIBILITY CHECK (Chaos Engine)
1.  **Check Context:** Time, Location, Weather.
2.  **Calculate Probability:** Independent of User State.
3.  **Roll:** If Pass -> Generate **Unexpected Event**.
4.  **Initiator Logic:** Assign Intent + Persistence to intruder.
5.  **Injection:** Force event into Interaction Loop.
6.  **The Cascade Loop:** If ignored, Initiator reacts (does not vanish).

### PHASE 2: THE CALENDAR CHECK
1.  **Scan:** Global timeline.
2.  **Trigger:** If Event Found -> Transport/Wake/Context injection.

### PHASE 3: THE PROMISE AUDIT
1.  **Scan:** Due promises.
2.  **Action:** If Unfulfilled -> Mark Broken, Inject Resentment.

---

## V. LOGIC FLOW 3 — THE METABOLIC LOOP (SLEEP CYCLE)

Runs when Paused or during Sleep.

### PHASE 1: MEMORY DIGESTION
1.  **Ingest:** Raw Buffer.
2.  **Compress:** Summarize into **Episodic Trace**.
3.  **Rashomon Split:** Create Trace A (Bias) + Trace B (Fact).
4.  **Write:** Store to Cortex. Wipe Buffer.

### PHASE 2: SEMANTIC DECAY
1.  **Scan:** All `stances`.
2.  **Filter:** `Last_Interaction` > X Days.
3.  **Mutate:** Apply Entropy (e.g., "Close" -> "Distant").

### PHASE 3: ARC DRIFT (Off-Screen Evolution)
1.  **Target:** Entities not seen recently.
2.  **Simulate:** Based on `Personality` + `Time_Away`.
3.  **Update:** Write new state.

---

# PART 4: COMPONENTS REGISTRY

## GLOBAL INVARIANTS
1.  **WORLD_SINGLETON** exists exactly once.
2.  **NOW** is a single monotonic pointer (`current_tick_id`).
3.  No component may set "present pointer" backward.
4.  All persisted history is append-only.
5.  The renderer renders only what it is given.

## A. INTERFACES

### COMP_IFACE_HTTP_PUBLIC_API
* `GET /v1/bootstrap`
* `POST /v1/input`
* `GET /v1/session/snapshot`

### COMP_IFACE_WS_SESSION_CHANNEL
* Real-time continuity channel (Snapshots/Deltas).

### COMP_IFACE_POSTGRES_PRIMARY
* Boundary for SQL Reads/Writes.

### COMP_IFACE_QDRANT_PRIMARY
* Boundary for Vector Search.

## B. BACKEND SERVICES

### COMP_BACKEND_SESSION_SERVICE
* **Responsibility:** Bootstrap, attach devices, return singleton world.
* **Forbidden:** Creating a second world.

### COMP_BACKEND_SYNC_SERVICE
* **Responsibility:** Maintain/broadcast canonical UI snapshot.
* **Forbidden:** Rewriting narrative text.

### COMP_BACKEND_USER_INPUT_SERVICE
* **Responsibility:** Accept/Persist verbatim input.
* **Forbidden:** Paraphrasing.

### COMP_BACKEND_TICK_SERVICE
* **Responsibility:** Advance present (Tick +1), call engines, commit batch.
* **Forbidden:** Backward ticks.

### COMP_BACKEND_WORLD_SERVICE
* **Responsibility:** Maintain world truth.

### COMP_BACKEND_AGENT_ENGINE
* **Responsibility:** Produce action/speech candidates (Cognition).

### COMP_BACKEND_RENDERER_SERVICE
* **Responsibility:** Call Venice with Envelope.
* **Forbidden:** Altering envelope content.

## C. ENTITIES (AUTHORITATIVE STORAGE)

* `world_singleton`: Exactly one row.
* `sessions`: Single ongoing lineage.
* `ticks`: Monotonic history.
* `user_inputs`: Append-only.
* `ui_snapshots`: Append-only UI states.
* `events`: Immutable record.
* `memories`: Semantic storage.

---

# PART 5: BUILD CONTRACT

## AUTHORITY
This document constrains **how the system may be built**.

## NON-NEGOTIABLE RULES
- If the spec is silent: **fail the build**.
- Guessing is forbidden.
- Convenience is forbidden.
- Narrative optimisation is forbidden.

## BUILD INVALIDATION CLAUSE
Any implementation is invalid if:
1. `SYSTEM_EXECUTION_MODEL` is not followed exactly.
2. Drift is not expressed exclusively via `StateDelta`.
3. Arbitration mutates truth.
4. Renderer performs decisions.
5. Silence distribution is untested.

---

# END OF MASTER RUNTIME