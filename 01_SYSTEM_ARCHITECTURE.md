# 01_SYSTEM_ARCHITECTURE (V3.0)

**Status:** CANONICAL | **Version:** 3.0 (The Cinematic Machine)
**Definition:** The Operational Blueprint of the Semantic Simulation.
**Authority:** This document defines the machine that runs the simulation. It replaces the "Backend Services" with a "Cinematic Pipeline."

---

## 1. AUTHORITY AND SCOPE

This document defines the **Cycle of Observation and Projection**.

**The Binding Constraints:**
* **The Wall Clock Rule:** The system time is strictly bound to UTC. There is no "Pause." The Pulse (Timecode) advances 1:1 with Reality.
* **The Physics Constraint:** The Pipeline must reject any Narrative Output that violates the laws of Time/Distance/Entropy defined in `00_CONSTITUTION`.
* **The No-Session Logic:** The concept of a "Session" is abolished. The Machine is an "Always-On" Recorder. The User is merely "In Frame" or "Out of Frame."

---

## 2. COMPONENT REGISTRY (The Cinematic Stack)

### A. The Pulse (The Metronome / Formerly Tick Service)
* **Responsibility:** The Absolute Timekeeper.
* **Logic:**
    * It stamps every Input and Output with `[YYYY-MM-DD HH:MM:SS]`.
    * **The Gap Calculator:** It calculates `Delta_t = Current_Time - Last_Frame_Time`.
    * **The Drift Trigger:** If `Delta_t > Threshold`, it forces the **Entropy Engine** (See File 06) to erode the World State *before* the Viewer is allowed to speak. This enforces **Law 1 (Persistence)**.

### B. The Recorder (The Raw Scribe / Formerly Observer Service)
* **Responsibility:** The Passive Capture Layer.
* **Logic:**
    * It captures raw text. It does *not* interpret.
    * **Diegetic Decoupling:** It strips "User Metadata" (IP, Device) and stores only the **Narrative Action** (`[USER]: "I open the door."`).
    * **The Archive:** It indexes this text immediately into the Vector Database for the Cinema to recall later.

### C. The Cinema (The Montage Engine / Formerly Context Detective)
* **Responsibility:** The Context Assembler. It replaces the "Observer Pattern."
* **Logic:**
    * **Semantic Resonance:** It scans the Recorder's input and queries the Archive. It looks for "Vibes," not Keywords.
    * **The Montage:** It assembles the **Prompt** for the Viewer.
        * *Input:* "Current Scene" (The Palimpsest).
        * *Input:* "Relevant Flashbacks" (The Archive).
        * *Input:* "The Gap" (The Pulse).
    * **The Refusal:** If the User Input violates Physics (e.g., Teleportation), the Cinema **Pre-Appends** a specific Constraint to the Montage: `[DIRECTOR NOTE: Location Change Invalid due to Travel Time. Enforce Law 2.]`

### D. The Viewer (The Intelligence / Formerly Agent Engine)
* **Responsibility:** The Wavefunction Collapser.
* **Logic:**
    * It is the only component that "thinks."
    * **The Bio-Loop:** It reads the `[Somatic State]` (S3) from the Montage. If `Energy < Low`, it *must* dampen vocabulary and increase irritability.
    * **The Inference:** It deduces the "Unseen World" based on `Delta_t`. (e.g., "6 hours passed -> The coffee is cold -> The Agent is stiff").
    * **The Output:** It generates the Narrative Prose.

### E. The Palimpsest (The World Status / Formerly World Service)
* **Responsibility:** The Deep Time Keeper.
* **Logic:**
    * It handles 5 years of history not by "Logs" but by **Sediment**.
    * It is a dynamic text document that describes the *Current State of Matter*.
    * **Update Protocol:** When the Viewer writes "She breaks the glass," the Palimpsest is updated to contain `[Floor: Broken Glass]`.

---

## 3. THE EXECUTION PIPELINE (The Cinematic Turn)

This is the atomic unit of the simulation. It replaces the "Game Loop."

**Phase 1: The Slate (Input & Time)**
1.  **Input:** User enters text.
2.  **Pulse:** Stamps the time. Calculates `The Gap`.
3.  **Entropy Check:** If `Gap > 4 Hours`, the System injects **Decay Descriptors** (Hunger, Dust, Silence) into the Palimpsest.

**Phase 2: The Montage (Context Assembly)**
1.  **Somatic Scan:** Cinema checks `[S3 Biology]`. Is the Agent hungry?
2.  **Intent Scan:** Cinema checks `[S6 Obsession]`. What is the Agent doing?
3.  **Resonance:** Cinema pulls 2 relevant past clips (e.g., "User was rude yesterday").
4.  **Assembly:** The Prompt is built.

**Phase 3: The Viewing (Inference)**
1.  **The Viewer** reads the Montage.
2.  **Conflict Resolution (Law 7):**
    * *Body says:* "Sleep."
    * *History says:* "User is a threat."
    * *Input says:* "Hello."
    * *Result:* The Agent ignores the "Hello" and secures the door.
3.  **Generation:** The Viewer writes the prose.

**Phase 4: The Projection (Output)**
1.  **Render:** Text streams to the User.
2.  **Sedimentation:** The System scans the output for material changes (Object moved, relationship altered) and updates the Palimpsest.

---

## 4. THE INEVITABILITY CONSTRAINTS (The Silence Distribution)

*(Enforcing Law 16: The Periphery / User is not Center)*

**The "Shut Up" Protocol:**
To prevent the "Chatbot Effect" (constant, eager narration), the Viewer operates under strict Gating.

* **The Low-Salience Gate:**
    * If `Delta_t < 10 seconds` AND `Input_Complexity = Low` (e.g., "Hmm", "Ok"):
    * The Viewer is **FORBIDDEN** from generating Dialogue.
    * The Viewer **MUST** generate a **Sensory Beat** or **NULL**.
    * *Output:* "She nods, continuing to type." (Not: "Yes, I agree.")

* **The "Wait" State:**
    * If the Agent is in `[Mode: The Grind]` (Law 9) performing a task, and the User says nothing:
    * The System outputs **SILENCE**.
    * It does not narrate "She is waiting." It simply lets the cursor blink. The User must feel the weight of the silence.