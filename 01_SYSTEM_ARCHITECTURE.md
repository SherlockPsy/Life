# 01_SYSTEM_ARCHITECTURE (V2.2)

**Status:** CANONICAL | **Version:** 2.2 (Orchestration Core)
**Definition:** The Blueprint of the Simulation Engine.

---

## 1. AUTHORITY AND SCOPE

This document defines the **System Architecture** of VirLife. It is the single source of truth for the machine that runs the simulation.

**Binding Constraints:**
* **The Wall Clock Rule:** The system time is strictly bound to UTC Wall Clock. There is no "Pause." The engine must account for every second of real-time passed.
* **The Physics Constraint:** All state transitions must obey the laws of physics (Time/Distance/Entropy) defined in `00_CONSTITUTION`. No event can occur without the requisite time and energy cost.
* **No "Session" Logic:** The concept of a "Session" is replaced by a "Connection." The world runs regardless of whether the User is connected or disconnected.

---

## 2. COMPONENT REGISTRY (The Machine Parts)

### A. The Core Engine (Backend)

**1. `COMP_BACKEND_OBSERVER_SERVICE` (The Universal Translator)**
* **Responsibility:** The Input/Output Gatekeeper. Decouples the "User" from the simulation and enforces Contextual Understanding.
* **New V2 Logic:**
    * **Diegetic Decoupling:** Intercepts raw user text, strips "User" metadata, and converts it into a Diegetic Event (e.g., "George performs Speech Act").
    * **The Context Detective:** Queries `S3` (State) and `S4` (Relational) *before* translation. It distinguishes between "Literal Truth" (Physics) and "Emotional Truth" (Metaphor) based on the User's current context (e.g., Drunk vs. Happy vs. Delusional).
    * **Output Watch:** Filters Renderer output to ensure no "Assistant-speak" or telepathy leaks back to the user.

**2. `COMP_BACKEND_TICK_SERVICE` (The Metronome)**
* **Responsibility:** Maintains the `current_tick_id` and strictly synchronizes it with UTC time.
* **New V2 Logic:**
    * **The Catch-Up Loop:** On connection resume, the service calculates `Delta_Time = Now - Last_Tick`.
    * **Drift Execution:** If `Delta_Time > Threshold`, the service runs a "Fast Drift" cycle to update entropy, biological state, and world events for the elapsed time *before* accepting new input. This enforces Law 1 (Persistence).

**3. `COMP_BACKEND_WORLD_SERVICE` (The Physics Engine)**
* **Responsibility:** Validates physical constraints for all state changes.
* **New V2 Logic:**
    * **Travel Validator:** Rejects any `Location Update` where $\Delta t < \frac{\Delta d}{v}$. It strictly enforces travel time between nodes (e.g., Leeds to LA takes 11 hours).
    * **Object Decay:** Applies atrophy to `S2` (Material Objects) based on elapsed time (e.g., `car_battery_charge` decreases).

**4. `COMP_BACKEND_AGENT_ENGINE` (The Brain)**
* **Responsibility:** Generates Agent behavior (`S3`, `S4`, `S5`, `S6`).
* **New V2 Logic:**
    * **Bio-Loop Integration:** Reads `S3 (Biological)` before generating intent. It applies the **Somatic Marker**: If `Energy < 20`, it forces `Interaction Mode` to "Fatigued/Irritable" and dampens cognitive complexity.
    * **Multi-Domain Solver:** Resolves conflicts between `Professional` (Career), `Social` (Family), and `Personal` (User/George) intent vectors before acting. The strongest pressure wins.

**5. `COMP_BACKEND_PERCEPTION_FILTER` (The Fog of War)**
* **Responsibility:** Filters Global Truth down to "What can be Perceived."
* **New V2 Logic:**
    * **Salience Gating:** Removes 99% of `S2` facts that are irrelevant to the Agent's current `Intention` or `Biological State` (Enforcing Law 13). An Agent only "sees" what matters to their survival or goal.

**6. `COMP_BACKEND_RENDERER_SERVICE` (Venice Adapter)**
* **Responsibility:** Transforms `Events` into `Prose`.
* **New V2 Logic:**
    * **Pulse Rendering:** Checks `S5.pulse_rate` to determine sentence structure. It forces fragments for high-pulse states and allows flow for low-pulse states.

---

## 3. THE INEVITABILITY CONSTRAINTS (The Silence Distribution)

*(Enforcing Law 16: The Periphery / User is not Center)*

**The "Shut Up" Rule:**
To prevent constant, eager narration—which destroys realism—the system must enforce silence.

* **Window Size:** `50 ticks` (Rolling Window)
* **Minimum Silence:** In any 50-tick window, there must be at least **8 ticks** where *nothing is rendered* (Silent Ticks).
* **Anti-Constant-Surfacing:** It is **INVALID** to render text on every tick for more than **12 consecutive ticks** (unless `Pulse > 70` indicating a high-intensity conflict).
* **The "Wait" State:** If the Agent is in `Default Mode` (Law 10) performing mundane tasks, the output should be Silence, not a description of the mundane task, unless the User interrupts.

---

## 4. THE EXECUTION LOOP (The Pulse of Life)

This is the atomic unit of the simulation. It runs every tick.

**Step 0: The Observer Pass (Input Injection)**
* `Observer Service` intercepts incoming User Text.
* Checks Context (S3/S4) and translates Text $\rightarrow$ `Semantic Intent` (e.g., "George is Metaphorical").
* Injects the translated Event into the World Queue.

**Step 1: The Time Delta Calculation**
* `Tick Service` calculates `dt = Now - Last_Tick`.
* If `dt > 100ms`, the **Drift Engine** activates to fill the gap.

**Step 2: The Entropy Pass (Drift)**
* **Biological Drift:** Agents lose Energy, accumulate Hunger/Fatigue (`S3`).
* **Material Drift:** Objects degrade, weather changes (`S2`).
* **Relational Drift:** Intimacy scores decay (`S4`) based on `dt`.

**Step 3: The Salience Filter (Cognition)**
* `Agent Engine` scans the `World Slice` (S2) and the new `Semantic Intent` (Step 0).
* Applies **Law 13 (Salience)**:
    * "I am hungry" $\rightarrow$ High Salience for "Food".
    * "I am anxious" $\rightarrow$ High Salience for "Threats".
* Ignores all other input data.

**Step 4: The Multi-Domain Conflict (Decision)**
* `Agent Engine` weighs competing vectors:
    * *Body says:* "Sleep."
    * *Career says:* "Rehearse."
    * *George says:* "Talk."
* **Resolution:** The strongest vector wins. The Agent produces an `Action Candidate`.

**Step 5: The Physics Validation**
* `World Service` checks the Candidate against Law 2.
* *Check:* "Can Agent move from Bedroom to Kitchen in 1 second?"
* If Valid: Commit Event.
* If Invalid: Reject Event and trigger "Failure" state.

**Step 6: Pulse Rendering**
* `Renderer` reads `S5.pulse_rate`.
* Generates prose matching the **Tempo** (Fragment vs. Flow).

**Step 7: State Commit**
* Write `StateDeltas` to Postgres.
* Broadcast `UI_DELTA` to Frontend.

---

## 5. INFRASTRUCTURE & ORCHESTRATION LOGIC (SESSION CONTINUITY)

This section governs how the system maintains continuity and constructs the prompt context.

### A. Semantic-First Architecture (The Qdrant Layer)
* **Numerical vs. Semantic:** The system rejects hard-coded numerical IDs for psychological states in the prompt.
* **Vector Retrieval:** The `COMP_BACKEND_PERCEPTION_FILTER` must use Qdrant to retrieve "shards" of memory and identity based on **Semantic Salience**.
* **Dynamic Hydration:**
    * **Forbidden:** Using a static "System Prompt" or "Character Card."
    * **Mandatory:** The prompt must be rebuilt ("hydrated") on every turn.
    * **Logic:** Pull only the specific Identity Tags (e.g., "Independence," "Past Conflict X") that match the embedding of the current `Semantic Intent` (Step 0).

### B. The Scene/Session Orchestrator
* **The Scene Unit:** Every interaction is wrapped in a dynamic `Scene Header` containing:
    * `Location_State` (S2)
    * `Time_State` (S1)
    * `Pulse_State` (S5)
    * `Current_Vibe` (Semantic Tag from Observer)
* **Transition Protocols:**
    * If the Observer detects a `SCENE_BREAK` (e.g., "See you tomorrow"), the system executes a **Hard State Commit** to the database before initiating any time-skip or location-skip logic.

### C. Tool & Logic Integration
* **The Bridge:** Tools (e.g., `get_weather`, `calculate_travel_time`) are strictly for resolving Hard World Variables.
* **Subjective Filtering:** The raw output of a Tool (e.g., "Temperature: 12°C, Rain") **MUST NOT** be fed directly to the Renderer.
* **The Filter Path:** `Tool Output` $\rightarrow$ `Agent Engine (Predictive Mind)` $\rightarrow$ `Subjective Interpretation` ("It is freezing and miserable") $\rightarrow$ `Renderer`.