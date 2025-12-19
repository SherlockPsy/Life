# 01_SYSTEM_ARCHITECTURE (V2)

**Status:** CANONICAL | **Version:** 2.0 (Realist Core)
**Definition:** The Blueprint of the Simulation Engine.

---

## 1. AUTHORITY AND SCOPE

This document defines the **System Architecture** of VirLife. It is the single source of truth for the machine that runs the simulation.

**Binding Constraints:**

* **The Wall Clock Rule:** The system time is strictly bound to UTC Wall Clock. There is no "Pause."
* **The Physics Constraint:** All state transitions must obey the laws of physics (Time/Distance/Entropy) defined in `00_CONSTITUTION`.
* **No "Session" Logic:** The concept of a "Session" is replaced by a "Connection." The world runs regardless of connection status.

---

## 2. COMPONENT REGISTRY (The Machine Parts)

### A. The Core Engine (Backend)

**1. `COMP_BACKEND_TICK_SERVICE` (The Metronome)**

* **Responsibility:** Maintains the `current_tick_id` and strictly synchronizes it with UTC time.
* **New V2 Logic:**
* **The Catch-Up Loop:** On connection resume, if `(Now - Last_Tick_Time) > Threshold`, the service runs a "Fast Drift" cycle to update entropy/state for the elapsed time *before* accepting new input.



**2. `COMP_BACKEND_WORLD_SERVICE` (The Physics Engine)**

* **Responsibility:** Validates physical constraints.
* **New V2 Logic:**
* **Travel Validator:** Rejects any `Location Update` where \Delta t < \frac{\Delta d}{v}.
* **Object Decay:** Applies atrophy to `S2` (Material Objects) based on elapsed time.



**3. `COMP_BACKEND_AGENT_ENGINE` (The Brain)**

* **Responsibility:** Generates Agent behavior (`S3`, `S4`, `S5`, `S6`).
* **New V2 Logic:**
* **Bio-Loop Integration:** Reads `S3 (Biological)` before generating intent. (e.g., If `Energy < 20`, force `Interaction Mode` to "Fatigued").
* **Multi-Domain Solver:** resolves conflicts between `Professional` and `Personal` intent before acting.



**4. `COMP_BACKEND_PERCEPTION_FILTER` (The Fog of War)**

* **Responsibility:** Filters Global Truth down to "What can be Perceived."
* **New V2 Logic:**
* **Salience Gating:** Removes 99% of `S2` facts that are irrelevant to the Agent's current `Intention` or `Biological State` (Law 13).



**5. `COMP_BACKEND_RENDERER_SERVICE` (Venice Adapter)**

* **Responsibility:** Transforms `Events` into `Prose`.
* **New V2 Logic:**
* **Pulse Rendering:** Checks `S5.pulse_rate`.
* If `> 70`: Forces output into **Fragments/Micro-Turns**.
* If `< 40`: Allows **Full Sentences/Monologues**.





---

## 3. DATA CONTRACTS (The Signals)

### `SCHEMA_TICK_CONTEXT_2` (The Input to Every Tick)

```json
{
  "tick_id": "integer",
  "timestamp_utc": "ISO-8601",
  "time_delta_seconds": "float (Seconds since last tick)",
  "pulse_rate": "integer (0-100)",
  "global_entropy_factor": "float (0.0 - 1.0)"
}

```

### `SCHEMA_WORLD_SLICE_2` (The Local Reality)

```json
{
  "location_id": "uuid",
  "ambient_conditions": {
    "weather": "string",
    "noise_level": "float",
    "light_level": "float"
  },
  "local_objects": [
    { "id": "uuid", "name": "string", "health": "float", "salience_score": "float" }
  ],
  "active_agents": ["uuid"]
}

```

### `SCHEMA_AGENT_CONTEXT_2` (The Total Self)

```json
{
  "agent_id": "uuid",
  "biological_state": {
    "energy": "float",
    "pain": "float",
    "hormones": "float"
  },
  "active_intentions": [
    { "category": "career", "pressure": 85, "description": "Audition Anxiety" },
    { "category": "relational", "pressure": 40, "description": "Misses George" }
  ],
  "interaction_mode": {
    "current": "distracted",
    "pulse": 45
  }
}

```

---

## 4. THE EXECUTION LOOP (The Pulse of Life)

This is the atomic unit of the simulation.

**Step 1: The Time Delta Calculation**

* `Tick Service` calculates `dt = Now - Last_Tick`.
* If `dt > 100ms`, the **Drift Engine** activates.

**Step 2: The Entropy Pass (Drift)**

* **Biological Drift:** Agents lose Energy, accumulate Hunger/Fatigue (`S3`).
* **Material Drift:** Objects degrade (`S2`).
* **Relational Drift:** Intimacy scores decay (`S4`) based on `dt`.

**Step 3: The Salience Filter (Cognition)**

* `Agent Engine` scans `World Slice`.
* Applies **Law 13 (Salience)**: "I am hungry" \rightarrow High Salience for "Food". "I am anxious" \rightarrow High Salience for "Threats."
* Ignores all other input.

**Step 4: The Multi-Domain Conflict (Decision)**

* `Agent Engine` weighs competing vectors:
* *Body says:* "Sleep."
* *Career says:* "Rehearse."
* *George says:* "Talk."


* **Resolution:** The strongest vector wins. The Agent produces an `Action Candidate`.

**Step 5: The Physics Validation**

* `World Service` checks the Candidate.
* *Check:* "Can Agent move from Bedroom to Kitchen in 1 second?"
* If Valid: Commit Event.
* If Invalid: Reject.

**Step 6: Pulse Rendering**

* `Renderer` reads `S5.pulse_rate`.
* Generates prose matching the **Tempo** (Fragment vs. Flow).

**Step 7: State Commit**

* Write `StateDeltas` to Postgres.
* Broadcast `UI_DELTA` to Frontend.

---

# 03_CONTRACT_RENDERER (V2)

**Status:** CANONICAL | **Version:** 2.0 (Realist Core)
**Definition:** The Laws of Output and Presentation.

---

## 1. THE RENDERING PHILOSOPHY

The Renderer is not a storyteller. It is a **Sensory Transducer**. It converts raw physical/psychological state into language without adding "narrative gloss."

**Binding Constraints:**

* **No Telepathy:** Never write "You feel," "You realize," or "You notice."
* **No Smoothing:** If the interaction is awkward, render the awkwardness. Do not "fix" the flow.
* **Pulse Obedience:** The sentence structure must physically match the `Pulse Rate`.

---

## 2. THE PULSE MECHANIC (Law 15 Implementation)

The Renderer must strictly adhere to the `pulse_rate` (S5) provided in the Envelope.

### Mode A: Low Pulse (0–40) — "The Dinner Party"

* **Context:** Relaxation, Planning, Monologue, Lazy Mornings.
* **Rules:**
* Full sentences allowed.
* Complex grammar allowed.
* Focus on **Abstract Thought** and **Reflection**.


* *Example:* "She looks out the window, watching the rain blur the traffic lights. 'I don't know,' she says, taking a slow sip of wine. 'It feels like we've been running in circles for years.'"

### Mode B: Mid Pulse (41–70) — "The Standard Flow"

* **Context:** Work, Logistics, Standard Interaction.
* **Rules:**
* Standard SVO (Subject-Verb-Object) sentences.
* Focus on **Action** and **Information**.


* *Example:* "She picks up the script. 'I need ten minutes,' she says. She moves to the couch and puts her glasses on."

### Mode C: High Pulse (71–100) — "The Fight / The Sex / The Panic"

* **Context:** Intimacy, Argument, Danger, Rushing.
* **Rules:**
* **Fragments ONLY.** No compound sentences.
* **Sensory Focus.** Sweat, breath, heat, noise.
* **Micro-Turns.** The agent acts/speaks in bursts.
* **Ignore Grammar.**


* *Example:* "She stops. Breath hitching. 'Don't.' Her hand tightens on your arm. 'Just—don't.'"

---

## 3. THE SALIENCE FILTER (Output Gating)

The Renderer receives the **Total World State**, but it must **HIDE** 90% of it.

* **Rule:** Only render what the **User's Attention** would naturally catch.
* **The Spotlight:**
* If User is `High Pulse` (Aroused/Angry) \rightarrow Render **Micro-Details** (The vein in her neck, the smell of perfume). **Blur** the background (Ignore the furniture).
* If User is `Low Pulse` (Relaxed) \rightarrow Render **Wide Shot** (The room, the atmosphere, the weather).



---

## 4. UI BEHAVIOR (The Window)

**1. The "Live" Text Stream**

* Text is not delivered in "Paragraphs." It is delivered in **Beats**.
* In `High Pulse` mode, the UI must render fragments *as they happen*, appearing to "type" in real-time sync with the event.

**2. The Silence**

* If the Agent is in `WAIT_ACT` (Law 10: Default Mode), the UI displays **Nothing**.
* No "Waiting..." spinner.
* No "Rebecca is thinking..." text.
* Just the cursor blinking in the silence of the room.
