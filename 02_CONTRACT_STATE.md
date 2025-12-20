# 02_CONTRACT_STATE (V3.0)

**Status:** CANONICAL | **Version:** 3.0 (The Palimpsest)
**Definition:** The Semantics of Existence.
**Authority:** This document defines the "State" of the Simulation. It replaces the JSON Schema with the **Sediment Layers**.

---

## 1. THE SIX LAYERS OF SEDIMENT (The World Description)

We do not use variables (`Health: 50`). We use **Descriptive Sediment**.
The Viewer must treat these descriptions as **Physical Laws**.

### Layer 1: The Chronology (S1 - Time)
*Implements Law 1 (Persistence).*
* **The Sediment:** `[Current Time]` + `[The Gap]`.
* **The Rule:** `The Gap` dictates the **Atmospheric Density**.
    * *Gap < 1 min:* High Fidelity. Mention micro-movements.
    * *Gap > 1 hour:* Low Fidelity. Mention stiff muscles, lighting changes, temperature drops.

### Layer 2: The Stage (S2 - Materiality)
*Implements Law 4 (Materiality) and Law 3 (Entropy).*
* **The Sediment:** `[Location]` + `[Atmosphere]` + `[Object Status]`.
* **The Rule of Decay:** Objects must carry their history in adjectives.
    * *Fresh:* "A hot cup of coffee."
    * *Decayed (Gap > 30m):* "A cup of coffee, a skin forming on the surface."
    * *Ruined (Gap > 4h):* "A cold cup of coffee, creating a ring on the wood."
* **Constraint:** The Viewer cannot "heat up" the coffee unless a specific `[Action: Microwave]` occurs.

### Layer 3: The Somatic Condition (S3 - Biology)
*Implements Law 8 (Homeostasis) and Law 6 (Somatic Primacy).*
* **The Sediment:** `[Sensory State]` + `[Energy Level]`.
* **The Vocabulary of Suffering:** We map numerical ranges to **Forced Behaviors**.
    * *Hunger (High):* "Hollow," "Light-headed," "Trembling." -> **Effect:** Short sentences. Irritability. Distraction.
    * *Fatigue (High):* "Lead-limbed," "Gritty eyes," "Slurring." -> **Effect:** Missed cues. Literal interpretations. Defensive passivity.
    * *Arousal (High):* "Flushed," "Rapid pulse," "Dilated." -> **Effect:** Tunnel vision. Fragmented speech.

### Layer 4: The Cord (S4 - Relationships)
*Implements Law 18 (Connection).*
* **The Sediment:** `[Dynamic]` + `[Unspoken Tension]`.
* **The Vibe:** This replaces the "Relationship Score."
    * *Instead of `Love: 80`:* "Dynamic: Deep, worn-in comfort. Tension: None."
    * *Instead of `Hate: 50`:* "Dynamic: Cold war. Tension: The unpaid debt."
* **The Decay:** If `The Gap > 1 Week`, the Sediment automatically updates to: "Dynamic: Distant. Tension: The silence."

### Layer 5: The Pulse (S5 - Pacing)
*Implements Law 15 (Status) and Law 5 (Scarcity).*
* **The Sediment:** `[Tempo]` + `[Focus]`.
* **The Directorial Override:**
    * **LANGUID:** (Use for Low Stress). "Write long. Focus on light/dust."
    * **TRANSACTIONAL:** (Use for Work). "Write short. Focus on objects/verbs."
    * **FRANTIC:** (Use for Threat/Sex). "Write fragments. Focus on sweat/breath."

### Layer 6: The Obsession (S6 - Intent)
*Implements Law 9 (The Grind).*
* **The Sediment:** `[Current Goal]` + `[The Obstacle]`.
* **The Friction:** This defines *why* the Agent is annoyed by the User.
    * *Sediment:* "Goal: Sleep. Obstacle: User is talking."
    * *Result:* The Agent tries to end the conversation.

---

## 2. THE MUTATION PROTOCOL (Updating the Palimpsest)

The State only changes via **Narrative Acts** or **Entropy**.

### A. The "Apply Entropy" Mutation
* **Trigger:** `Pulse Check` (Gap > Threshold).
* **Action:** The System rewrites the adjectives in S2 and S3.
    * `Hot` -> `Warm` -> `Tepid` -> `Cold`.
    * `Satiated` -> `Peckish` -> `Hungry` -> `Starving`.

### B. The "Consume Resource" Mutation
* **Trigger:** Agent performs `[High Effort Action]` (e.g., "She runs to the station").
* **Action:** The System updates S3:
    * `[Energy]: Drained/Panting`.
    * `[Somatic]: Sweat, tight chest`.
    * The Viewer *must* depict the recovery period (panting, inability to speak) in the next turn.

### C. The "Status Transaction" Mutation
* **Trigger:** Viewer output contains a `[Status Violation]` (e.g., User interrupts Agent).
* **Action:** The System updates S4 `[Dynamic]`:
    * From `Neutral` to `Hostile/Guarded`.
    * This persists until a "Repair Act" is performed.