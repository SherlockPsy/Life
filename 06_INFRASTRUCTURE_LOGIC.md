# 06_INFRASTRUCTURE_LOGIC (V3.0)

**Status:** CANONICAL | **Version:** 3.0 (The Tools)
**Definition:** The Mechanics of Storage, Retrieval, and Consequence.
**Authority:** This document defines the background processes that support the Cinematic Architecture. It replaces "The Scribe" and "The Watchman" with **The Recorder** and **The Entropy Engine**.

---

## 1. THE RECORDER (The Immutable Log)

*Objective: To capture the raw footage of reality without judgment.*

**The Protocol:**
The Recorder captures the **Narrative Stream**. It does not try to interpret "Intent" or "Truth" at the moment of capture. It simply records the "Film."

**Storage Schema (The Reel):**
We store **Time-Stamped Prose**.
* **Format:** `[TIMESTAMP] [ENTITY] [CONTENT]`
* **Example:** `[2025-12-20 09:15:00] [USER]: "I'm not hungry."`
* **Example:** `[2025-12-20 09:15:05] [AGENT]: She looks at your full plate. "Liar."`

**The Index:**
The Recorder generates a **Vector Embedding** for every block of text immediately upon storage. This allows the Cinema to retrieve this moment later based on "Vibe" (Semantic Resonance) rather than Keywords.

---

## 2. THE ENTROPY ENGINE (The Decay Calculator)

*Objective: To enforce the cost of Time (Laws 1 & 3).*

**The Negative Query:**
The Engine does not run a "Game Loop" every second. It runs a **Gap Check** only when interaction occurs.

**The Workflow:**
1.  **Trigger:** User Input arrives.
2.  **Calculate Gap:** `Current_Time - Last_Interaction_Time`.
3.  **Apply Decay (The Drift):**
    * If `Gap > 4 Hours`: Inject `[Somatic: Hunger]` + `[Atmosphere: Stale]` into the Palimpsest.
    * If `Gap > 16 Hours`: Inject `[Somatic: Sleep_Pressure]` + `[Atmosphere: Dark]` into the Palimpsest.
    * If `Gap > 1 Week`: Inject `[Cord: Distance]` (Downgrade Intimacy) into the Palimpsest.
    * If `Gap > 1 Month`: Inject `[Environment: Dust/Decay]` into the Location.

**The Output:**
This process does not write text. It updates the **Palimpsest (S1, S2, S3)** so the Viewer *sees* the decay in the Scene Header before writing the next line.

---

## 3. THE SEDIMENTATION LOOP (Writing the Palimpsest)

*Objective: To compress the Stream into Status (Handling Deep Time).*

The Viewer writes the Narrative. The **Sedimentation Process** reads the Narrative and updates the "Hard Truths."

**The Extraction Protocol:**
After every Scene (or every 10 turns), a lightweight "Scribe Model" reads the transcript and updates the **Palimpsest Markdown**.

* *Transcript:* "She smashes the vase against the wall."
* *Scribe Action:*
    * **REMOVE:** `[Object: Vase]` from `[Location: Table]`.
    * **ADD:** `[Object: Ceramic Shards]` to `[Location: Floor]`.
    * **UPDATE:** `[Atmosphere]` to "Tense, sharp smell of ozone."

**The Rule of Permanence:**
Once written to the Palimpsest, the shard stays on the floor until a new Narrative Action cleans it up. The Viewer *must* see the shards in the next Scene Header.

---

## 4. THE PHYSICS OF INTERACTION (Verbs & Cost)

*Objective: To handle Agency without "Functions."*

**The Narrative Declaration:**
The Agent does not call `MoveTo(Kitchen)`. The Agent declares: *"She walks to the kitchen."*

**The Consequence Check (The Cost):**
1.  **The Viewer** generates the prose: "She walks to the kitchen."
2.  **The System** calculates the **Cost**:
    * Is the Kitchen connected to the current room? (Yes).
    * How far is it? (10 meters -> 5 seconds).
3.  **The Commit:**
    * The System updates `[Location]` in the Palimpsest.
    * The System advances the Pulse by 5 seconds.

**The Impossible Act:**
If the Viewer attempts to violate physics (e.g., "She teleports to London"):
1.  **The Constraint:** The Palimpsest shows `Location: Leeds`.
2.  **The Cost:** London is 200 miles away.
3.  **The Correction:** The System refuses to update the Location *unless* the Viewer also writes a "Time Skip" narrative (e.g., "The train ride is long...").
4.  **Result:** If the Viewer tries to cheat (teleport without time), the System **Rejects the Output** and prompts the Viewer: *[DIRECTOR NOTE: Travel requires time. Rewrite with time transition or stay in location.]*