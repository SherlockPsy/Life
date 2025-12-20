# 01_SYSTEM_ARCHITECTURE (V3.0)

**Status:** CANONICAL | **Version:** 3.0 (The Cinematic Machine)
**Definition:** The Operational Blueprint of the Semantic Simulation.
**Authority:** This document supersedes all previous "Backend" or "Middleware" specifications.

---

## 1. AUTHORITY AND SCOPE

This document defines the **Machine** that runs the simulation. It replaces the "Video Game Engine" (Variables, Ticks, State Managers) with a **Cinematic Pipeline** (Recording, Montage, Projection).

**The Core Directive:**
The Machine does not "calculate" the world. It **curates** the context (The Cinema) and **observes** the result (The Viewer).

---

## 2. COMPONENT REGISTRY (The Cinematic Stack)

### A. The Pulse (The Metronome)
* **Definition:** The absolute, unblinking timecode.
* **Responsibility:** It stamps every frame of input and output with UTC Wall Clock time.
* **Mechanism:**
    * It does not "wait" for the user.
    * It calculates the `Delta_t` (Time passed since last frame) explicitly.
    * It forces the **Law of Entropy**: If `Delta_t > Threshold`, the Viewer is forced to acknowledge decay, hunger, or silence in the narrative.

### B. The Recorder (The Raw Log)
* **Definition:** The Passive Capture Layer.
* **Responsibility:** To store the "Raw Footage" of reality without interpretation.
* **Mechanism:**
    * It accepts User Input (Dialogue, Action) and System Signals (Time).
    * It appends them to the **Immutable Log** (The Ledger).
    * *Constraint:* It never summarizes. It keeps the "grain" of the text—the typos, the tone, the exact phrasing.

### C. The Cinema (The Montage Engine)
* **Definition:** The Context Assembler (formerly "The Observer" or "Retrieval Layer").
* **Responsibility:** To construct the "Viewing Experience" for the Intelligence.
* **Mechanism (Semantic Resonance):**
    * Instead of "checking variables," the Cinema scans the current input (The Trigger) and searches the **Archive** for "Resonant Clips."
    * *Trigger:* "User touches Helen's arm."
    * *Retrieval:* The Cinema pulls past clips where "Touch" = "Threat" or "Touch" = "Comfort."
    * **The Montage:** It splices these past clips alongside the current input to create the **Prompt Context**.

### D. The Viewer (The Intelligence)
* **Definition:** The Large Language Model (LLM).
* **Responsibility:** The Sole Active Agent. It is the Actor, the Narrator, and the Physicist.
* **Mechanism:**
    * It watches the **Montage** (Current Input + Resonant Past + World Status).
    * It **Deduced Reality:** It sees the timestamp gap and "simulates" the off-screen time (e.g., "It has been 4 hours; she is tired").
    * It **Collapses the Wavefunction:** It generates the narrative response (Dialogue + Action) and the internal thought process.

### E. The Palimpsest (The World Status)
* **Definition:** The Compressed State Document.
* **Responsibility:** To handle Deep Time without infinite token usage.
* **Mechanism:**
    * It does not store "Events." It stores **Sediment** (Facts/Traits).
    * *Event:* "User broke the window in 2023."
    * *Sediment:* `[Location_Damage]: The living room window is taped up with cardboard.`
    * The Viewer reads this document to ensure long-term consistency (Laws 1 & 8).

---

## 3. THE EXECUTION FLOW (The Cinematic Turn)

This is the atomic unit of the simulation. It replaces the "Game Loop."

**Phase 1: The Slate (Input)**
1.  **Input:** User enters text ("I open the door").
2.  **Timestamp:** The Pulse stamps the input: `[2025-12-20 09:00:00]`.
3.  **The Gap Check:** The System calculates `Delta_t` since the last System Output.
    * If `Delta_t > 6 hours`: Flag **HIGH ENTROPY**.

**Phase 2: The Montage (Context Construction)**
1.  **State Retrieval:** The Cinema pulls the **Palimpsest** (Current World Status: Location, Weather, Health).
2.  **Semantic Search:** The Cinema uses vector embedding on the Input ("Open Door") to find relevant history.
    * *Result:* Finds clip "Argument at the Door (2 days ago)."
3.  **Assembly:** The Cinema builds the **Prompt**:
    * `[CURRENT STATUS]`: (The Palimpsest)
    * `[RELEVANT MEMORY]`: (The Clip of the Argument)
    * `[TIME GAP]`: "6 Hours have passed."
    * `[ACTION]`: "I open the door."

**Phase 3: The Viewing (Inference)**
1.  **The Viewer watches the Montage.**
2.  **Physics Check (Internal):** The Viewer notes the 6-hour gap. It deduces: "The Agent has been waiting. The room is dark."
3.  **Psychological Check (Internal):** The Viewer sees the "Argument" clip. It deduces: "The Agent is defensive because of the previous fight."
4.  **Generation:** The Viewer writes the output.

**Phase 4: The Projection (Output)**
1.  **Narrative:** The System streams the text to the user.
    * *"The room is pitch black. She jumps as the door handle turns, dropping her phone."*
2.  **Sedimentation:** The Viewer updates the Palimpsest if a major change occurred (e.g., "Phone is dropped/broken").

---

## 4. THE INEVITABILITY CONSTRAINTS (Viewer Directives)

These are instructions to the Viewer to ensure the simulation feels "Real" and not "Game-like."

### A. The "Shut Up" Protocol
* **Rule:** If the `Delta_t` is short (< 10 seconds) and the input is low-salience, the Viewer is permitted to output **SILENCE**.
* **Reasoning:** Real people do not reply to every grunt or glance.
* **Execution:** The Viewer outputs a "Null Response" or a simple ambient descriptor ("The clock ticks") rather than forced dialogue.

### B. The Drift Directive (Entropy)
* **Rule:** When `Delta_t` indicates a gap, the Viewer **must** describe the physical toll of that time *before* addressing the User's input.
* **Example:**
    * *User:* "I'm back." (After 8 hours).
    * *Bad Output:* "Welcome back!"
    * *Correct Output:* "The coffee on the desk has formed a skin. She rubs her eyes, looking at you blindly for a second, disoriented by the sudden noise."

### C. The Fidelity of Friction
* **Rule:** The Viewer must reject "Video Game Logic" inputs by describing the **failure of physics**, not by sending an error message.
* **Input:** "I fly to the roof."
* **Response:** "You jump, but gravity drags you back down. You land heavily on the concrete, looking ridiculous." (Narrative correction, not System correction).

---

## 5. INFRASTRUCTURE LOGIC (Memory Architecture)

### A. The Sedimentation Process
History is handled in two layers:
1.  **The Reel (Raw):** Stored in `Postgres/Logs`. Accessible via Semantic Search. Used for *Vibes* and *Specific Flashbacks*.
2.  **The Status (Sediment):** Stored in `Markdown/Palimpsest`. Updated via "Overwrite." Used for *Hard Truths* (Location, Injuries, Objects).

### B. The Scene Header (Dynamic Context)
Every Turn is preceded by a "Mini-Paragraph" generated by the Cinema (Direction), replacing the JSON State.
* **Format:**
    > **[SCENE START]**
    > **Location:** A cramped kitchen. **Time:** 04:00 AM (Pre-Dawn).
    > **Somatic State:** Shivering, sleep-deprived.
    > **Atmosphere:** The hum of the fridge is the only sound.
    > **Active Tension:** The unresolved question about the money.

This header forces the Viewer to align with the physical reality before writing a single word of dialogue.