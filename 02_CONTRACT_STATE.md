# 02_CONTRACT_STATE (V4.0)

**Status:** CANONICAL | **Version:** 4.0 (The Palimpsest)
**Definition:** The Semantics of Existence.
**Authority:** This document defines the "State" of the Simulation. It applies symmetrically to **Agents** and the **Protagonist**.

---

## 1. THE ENTITY SCHEMA (Symmetric Biology)

The Palimpsest tracks the Protagonist exactly as it tracks an Agent.

### A. The Somatic Layer (The Body)
* **Variables:** `[Energy]`, `[Hunger]`, `[Intoxication]`, `[Pain]`.
* **Protagonist Impact:**
    * If `[Protagonist.Energy] < 10%`: The System blocks "High Effort" actions (e.g., Running, Fighting). Input is restricted to "Rest" or "Crawl."
    * If `[Protagonist.Intoxication] > High`: The System scrambles text output.

### B. The Location Layer (The Map)
* **Variables:** `[Zone]`, `[Room]`, `[Coordinates (Semantic)]`.
* **Rule:** An entity cannot interact with objects not in their Location.
* **Protagonist Impact:** You cannot "hear" a conversation in the Kitchen if you are in the Bedroom. The Renderer will output `[Muffled voices]` instead of dialogue.

### C. The Cord Layer (Relationships)
* **Variables:** `[Tension]`, `[Intimacy]`, `[Trust]`.
* **Note:** This is a bidirectional graph.
    * `Helen -> Protagonist` (How she feels about you).
    * `Protagonist -> Helen` (How the System predicts you feel, based on your actions).

---

## 2. THE WORLD SEDIMENT (The Environment)

### Layer 1: The Chronology (S1)
* **The Pulse:** UTC Time.
* **The Drift:** The accumulated decay since the last "Clean Up" event.

### Layer 2: The Material Stage (S2)
* **Object Permanence:** Objects stay where they are put.
* **State Tags:** Objects have states: `[Broken]`, `[Wet]`, `[Hot]`, `[Cold]`.
    * *Example:* If Protagonist leaves the stove on, `[Stove]` gains tag `[Hazard: Fire_Risk]`.

### Layer 3: The Atmosphere (S3)
* **Sensory Data:** `[Smell]`, `[Light_Level]`, `[Noise_Floor]`.
* **Function:** This dictates what the **Renderer** can show.
    * *Darkness:* Blocks visual descriptions.
    * *Loud Noise:* Blocks auditory descriptions.

---

## 3. THE AUTONOMOUS MUTATION PROTOCOL

How the State changes without Human Input.

### A. The Metabolic Burn
* **Frequency:** Hourly.
* **Action:**
    * `[Entity.Hunger]` +10.
    * `[Entity.Energy]` -5 (if awake) / +10 (if asleep).
    * *Scope:* Applied to Agents AND Protagonist (if "Camera Off").

### B. The Entropic Rot
* **Frequency:** Daily.
* **Action:**
    * `[Food.Freshness]` Decays.
    * `[Relationship.Intimacy]` Decays (if no interaction).

### C. The Agent Agenda
* **Trigger:** Agent Viewer Decision.
* **Action:** Agent moves from `[Kitchen]` to `[Garden]`.
* **State Update:** Palimpsest updates Agent Location.
* **Consequence:** If Protagonist enters Kitchen, Agent is **GONE**. System does not spawn them there for convenience.