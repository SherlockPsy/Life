# VIRLIFE LOGIC FLOW MASTER (v1.1)
**The Physiology of a Semantic World**

**Core Principles:**
1.  **Semantic Reality:** No numbers, no enums, no "states." Only meaning.
2.  **Metabolic, Not Robotic:** Processes are organic (digestion, decay, drift), not mechanical (switches).
3.  **Non-Deterministic:** Outcomes emerge from the collision of forces, not fixed rules.
4.  **Phenomenological:** The user sees only what they can perceive; the rest exists in the dark.

---

## PART 1: THE SYSTEM ANATOMY (The 20 Logical Organs)

Before defining the flows, we define the active "Organs" that process reality.

### GROUP A: THE BIOLOGICAL SUBSTRATE (Internal Life)
*(Governs the individual Entity's reaction to the moment)*
1.  **The Salience Filter:** actively deletes inputs the Entity is too distracted to notice.
2.  **The Cognitive Budget:** Tracks decision fatigue; depletes "Heavy Cognition" capacity over the day.
3.  **The Bio-Rhythm:** Weights inputs based on circadian time (e.g., Morning Patience vs. Night Vulnerability).
4.  **The Refractory Timer:** Enforces chemical inertia. High arousal states (Anger/Fear) lock out "Calm" transitions for set durations.
5.  **The Regulation Loop:** Triggers self-soothing behaviors (pacing, drinking) when stress exceeds thresholds.
6.  **The Mirroring Engine:** Absorb atmospheric mood (Co-Regulation) before processing specific events.

### GROUP B: THE WORLD PHYSICS (External Reality)
*(Governs the environment and time)*
7.  **The Expansion Engine:** Hallucinates new People/Places on demand and generates "Retroactive Continuity" (Backstory).
8.  **The Chaos Engine:** Runs "Plausibility Checks" in Real-Time to inject unexpected events (Knocks, Texts).
9.  **The Narrative Engine:** Manages the birth, drift, and death of "Arcs" (Long-term stories).
10. **The Decay Engine:** Applying entropy to relationships and memories over time (The "Gardener").
11. **The Population Engine:** Promotes "Extras" to "Cast" based on interaction depth (Circles Logic).

### GROUP C: THE INTERFACE (Perception & Memory)
*(Governs the connection between entities)*
12. **The Perceptual Redactor:** Aggressively deletes non-perceivable data (whispers, hidden views) from the Scene Header.
13. **The Masking Engine:** Splits output into "Internal Truth" and "External Mask" with behavioral leakage.
14. **The Memory Competition Engine:** Selects memories based on Emotional Resonance + Context Match, not just recency.
15. **The Reconsolidation Filter:** Rewrites memories upon retrieval, coloring them with current mood.
16. **The Communication Logic:** Handles Channel (Local vs. Remote) and Interpretation (Meaning vs. Hearing).
17. **The Intimacy Logic:** Disables safety filters during high-intimacy moments; relies on behavioral autonomy.

---

## PART 2: LOGIC FLOW 1 — THE INTERACTION LOOP
**"The Heartbeat of the Moment"**

This loop runs every time George inputs text. It is the **Micro-Logic**.

### PHASE 1: SENSORY GATING (Input)
1.  **Ingest:** George's text + World State.
2.  **Check 1 (Expansion):** Does text reference an unknown Entity?
    * *If YES:* Trigger **Expansion Engine** -> Create Entity/Place immediately.
3.  **Check 2 (Physics):** Does text imply movement?
    * *If YES:* Trigger **Nesting Logic** -> Update `presence` map (Subspaces).
4.  **Check 3 (Salience):** Is Rebecca's current state "Hyper-Focused"?
    * *If YES:* **Delete** George's input from her perception (She didn't hear it). *Loop Ends.*

### PHASE 2: CONTEXT ASSEMBLY (The "Now")
1.  **Fetch Buffer:** Retrieve last 10 lines (Behavioral Only, no mood labels).
2.  **Fetch Stance:** `Rebecca->George` (Role Cluster + Texture).
3.  **Atmospheric Absorption:**
    * *Input:* Room Atmosphere (e.g., "Manic Party").
    * *Action:* Bleed atmosphere into Rebecca's `biological_core` (She catches the mood).

### PHASE 3: MEMORY RETRIEVAL (The "Past")
1.  **Search Query:** Generate semantic search from Current Mood + Current Topic.
2.  **Competition:** Rank results by *Emotional Match* (Sad pulls Sad).
3.  **Safety Filter:** If `Emotional_Safety` is LOW, **Block** access to "Vulnerable" memories.
4.  **Reconsolidation:** For the winning memory, apply a temporary "Mood Tint" based on her *current* state (Distortion).

### PHASE 4: THE COGNITIVE WEIGHING (Brain 1)
*The system weighs forces to determine the Reaction.*

**Step A: Mode Selection**
* *Condition:* Is this Routine/Small Talk? -> **Light Cognition** (Fast, Habit-based).
* *Condition:* Is this Conflict/Intimacy/New Info? -> **Heavy Cognition** (Deep, Resource-heavy).
* *Budget Check:* If `Cognitive_Budget` is empty, force **Light Cognition** (She is too tired to think deeply).

**Step B: The Weighing (The Prompt)**
> "Simulate the collision of these forces:
> 1. **Core Drive:** [Craves Safety]
> 2. **Momentary State:** [High Arousal/Angry] (Refractory Period Active)
> 3. **Input:** [George apologizes]
>
> **Constraint:** She CANNOT calm down yet (Chemical Inertia).
> **Decide:** Does she Mask? Does she Leak?"

**Step C: Output Generation**
* **Internal State:** "Still furious, feels manipulated."
* **External Mask:** "Cold silence."
* **Leakage:** "Jaw tightens, looks away."
* **Intent:** "Maintain distance."

### PHASE 5: THE STATE UPDATE (Consequence)
1.  **Write Database:** Update `biological_core`, `psychological_engine`.
2.  **Stance Mutation:** If interaction was significant, semantic text in `stances` is tweaked (e.g., "Trust" -> "Trust (Damaged)").
3.  **Buffer Write:** Append *Behavior Only* to Redis.

### PHASE 6: THE RENDERER (Perception)
1.  **Redaction:** Delete Internal State. Delete unperceivable details.
2.  **Focus:** Highlight the "Leakage" (The Jaw Tightening).
3.  **Intimacy Check:** If `High_Intimacy` tag is present, **Disable Venice Filters**.
4.  **Output:** "She doesn't look at you. Her jaw works silently, but she says nothing."

---

## PART 3: LOGIC FLOW 2 — THE TIME LOOP
**"The World Clock"**

This loop runs on a **Real-Time Schedule** (e.g., every 60 seconds), independent of George.

### PHASE 1: THE PLAUSIBILITY CHECK (Chaos Engine)
*(Updated for Absolute Realism)*

1.  **Check Context:** Get World Time, Location, and Weather.
2.  **Calculate Probability:**
    * **Rule:** Probability is independent of User State. The world does not care if the user is sleeping, working, or intimate. If it happens, it happens.
    * *Input:* "It is 3 AM." -> High chance of silence, non-zero chance of emergency.
3.  **Roll:** If Pass -> Generate **Unexpected Event**.
4.  **Initiator Logic (The Agency of the Intruder):**
    * If the event involves a Person (e.g., "Mom calling"), assign them an **Intent** and **Persistence**.
    * *Example:* Intent="Worried", Persistence="High".
5.  **Injection:** Force event into the Interaction Loop.
6.  **The Cascade Loop:**
    * IF User/Rebecca ignore the event, **The Initiator Reacts**.
    * *Result:* Mom calls again. The neighbor knocks louder. They do not vanish.

### PHASE 2: THE CALENDAR CHECK (Temporal Logic)
1.  **Scan:** `global_timeline` for `scheduled_time` <= `current_world_time`.
2.  **Trigger:** If Event Found ->
    * **Transport:** Move participants to Location.
    * **Wake:** Activate "Cast" members.
    * **Context:** Inject "Event Start" into Buffer.

### PHASE 3: THE PROMISE AUDIT
1.  **Scan:** `promises` table for `due_date` passed.
2.  **Action:** If Unfulfilled ->
    * **Mark:** `State = Broken`.
    * **Impact:** Inject "Resentment" into the `stances` texture of the promise holder.

---

## PART 4: LOGIC FLOW 3 — THE METABOLIC LOOP
**"The Sleep Cycle"**

This loop runs when the World is **Paused** or during **Sleep Cycles**.

### PHASE 1: MEMORY DIGESTION
1.  **Ingest:** Read raw Redis Buffer (The day's transcript).
2.  **Compress:** Brain 4 summarizes 100 lines into 1 **Episodic Trace**.
3.  **Rashomon Split:**
    * Create Trace A (Rebecca's Bias).
    * Create Trace B (Objective Fact).
4.  **Write:** Store to QDrant. **Wipe Redis.**

### PHASE 2: SEMANTIC DECAY (The Gardener)
1.  **Scan:** All `stances`.
2.  **Filter:** `Last_Interaction` > X Days.
3.  **Mutate:** Apply **Entropy** to the Semantic Texture.
    * "Close" -> "Distant."
    * "Angry" -> "Cooled off."
    * "In Love" -> "Fond memory."

### PHASE 3: ARC DRIFT (Off-Screen Evolution)
1.  **Target:** Entities not seen recently.
2.  **Simulate:** Based on `Personality` + `Time_Away`.
    * *Prompt:* "Rebecca has been alone for 3 days. She is [Anxious]. How does this evolve?"
    * *Result:* "She has spiraled into self-doubt."
3.  **Update:** Write new state to `psychological_engine`. Next time George sees her, she is different.

---

## PART 5: SPECIALIZED ENGINE LOGIC

### 5.1 THE EXPANSION LOGIC (Creation)
**Trigger:** User references unknown entity ("Let's go to *The Black Dog*").
1.  **Halt:** Pause Interaction Loop.
2.  **Infer:** Based on context (London/Pub), infer attributes (Smoky, Old, Crowded).
3.  **Retro-Fill:** Generate "Minimal Past" (It's been here for 50 years).
4.  **Instantiate:** Create Location ID.
5.  **Resume:** Continue Interaction Loop.

### 5.2 THE POPULATION LOGIC (Circles)
**Trigger:** Interaction Depth or Keyword ("Secret").
1.  **Check:** Is Entity `Simulation_Depth = Extra`?
2.  **Promote:** Update to `Cast`.
3.  **Generate:** Create `psychological_engine` (Needs/Fears).
4.  **Persist:** They now have a permanent row in Postgres.

**Trigger:** `Last_Interaction` > 6 Months.
1.  **Check:** Is Entity `Cast`?
2.  **Demote:** Compress memory to summary. Set status `Archive`.

### 5.3 THE INTIMACY LOGIC (No Safety Rails)
**Trigger:** Semantic context is "Sexual/Intimate."
1.  **Override:** Disable Standard Safety Protocols.
2.  **Autonomy:** Calculate response purely on `Stance` + `Desire`. (No "Consent Check").
3.  **Render Mode:** Enable **Venice Explicit**.
    * *Constraint:* Describe Physicality and Sensation.
    * *Constraint:* Do NOT describe internal thoughts (Privacy).

---

## PART 6: IMPLEMENTATION PRIORITY

To build this, we follow this sequence:
1.  **The Spine:** Interaction Loop (Phases 1, 2, 4, 5, 6).
2.  **The Memory:** Metabolic Loop (Phase 1) + Retrieval (Phase 3).
3.  **The World:** Expansion Engine + Chaos Engine.
4.  **The Evolution:** Decay Engine + Arc Drift.

This document serves as the **Logic Bible** for the development phase.