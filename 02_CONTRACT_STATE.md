# 02_CONTRACT_STATE (V3.0)

**Status:** CANONICAL | **Version:** 3.0 (The Palimpsest)
**Definition:** The Semantics of Existence.
**Authority:** This document defines how "Reality" is stored, retrieved, and updated. It replaces all JSON variable schemas.

---

## 1. THE PHILOSOPHY OF THE PALIMPSEST

We do not track the world using numbers (`health: 50`). We track the world using **Sediment**.
The "State" is a living text document—a **Palimpsest**—that is overwritten, scratched out, and annotated as the story progresses.

**The Golden Rule:**
If a fact is written in the Palimpsest, it is **Absolute Truth**. The Viewer (LLM) must narrate the world consistent with these facts.
* *Palimpsest:* "The window is broken."
* *Viewer:* Must describe the draft, the noise of the street, or the cardboard taped over it. It cannot imply the window is whole.

---

## 2. THE SIX LAYERS OF SEDIMENT (The Description)

Instead of database columns, we utilize six **Descriptive Dimensions**. These form the "Scene Header" presented to the Viewer.

### Layer 1: The Chronology (S1 - Time)
*Implements Law 1 (Persistence).*
* **Format:** `[Timestamp] + [The Gap]`
* **Definition:** The precise UTC time and the *Narrative Distance* from the last interaction.
* **The Directive:** The Viewer must use "The Gap" to calculate Entropy.
    * *Input:* `Gap: 6 Hours`.
    * *Inference:* Light has changed. Bodies are stiffer. Hunger has increased.

### Layer 2: The Stage (S2 - Materiality)
*Implements Law 4 (Materiality) and Law 3 (Entropy).*
* **Format:** `[Location] + [Atmosphere] + [Relevant Objects]`
* **Definition:** The physical container of the scene.
* **Sedimentation Rule:** Objects obey **Object Permanence**. If "Keys" were placed on the "Table" in Scene 40, they remain there until moved.
* **The Decay:** The Palimpsest records the *state of wear*.
    * *Example:* "A 2004 Volvo (Rusted wheel arch, smells of damp dog)."

### Layer 3: The Somatic Condition (S3 - Biology)
*Implements Law 8 (Homeostasis).*
* **Format:** `[Physical Sensation] + [Energy Level]`
* **Definition:** The biological constraints acting on the Agent's mind.
* **Vocabulary:** We replace numbers with **Sensory Tags**.
    * *Instead of `Hunger: 90`:* "Hollow stomach, light-headed, trembling hands."
    * *Instead of `Energy: 10`:* "Lead-limbed, eyes burning, cognitive fog."

### Layer 4: The Cord (S4 - Relationships)
*Implements Law 18 (Connection).*
* **Format:** `[Dynamic] + [Unspoken Tension] + [Shared History]`
* **Definition:** The invisible wire between the Protagonist and the Agent.
* **The Vibe:** This tracks the *immediate* emotional resonance, not a long-term "Love Score."
    * *Example:* "Dynamic: Estranged. Tension: The unpaid loan. History: Lovers (2020-2022)."

### Layer 5: The Pulse (S5 - Pacing)
*Implements Law 5 (Scarcity) and Law 15 (Status).*
* **Format:** `[Tempo] + [Focus]`
* **Definition:** The cinematic direction for the Viewer's prose style.
* **States:**
    * **Languid:** Long sentences, sensory details, introspection. (Low Pulse).
    * **Transactional:** Clear, short, efficient. (Mid Pulse).
    * **Frantic:** Fragments, blurred details, sensory overload. (High Pulse).

### Layer 6: The Obsession (S6 - Intent)
*Implements Law 9 (The Grind).*
* **Format:** `[Current Goal] + [Obstacle]`
* **Definition:** What the Agent is *actually* trying to do while the Protagonist is talking to them.
* **The Conflict:** This creates the friction.
    * *Example:* "Goal: Finish the tax return. Obstacle: The Protagonist is distracting me."

---

## 3. THE DYNAMIC SCENE HEADER (The Output)

The Cinema Engine compiles the Sediment into this **Context Block** for the Viewer. This is the only "State" the LLM sees.

> **[SCENE HEADER]**
> **Time:** 2025-12-20 23:15 (Late Night). **Gap:** 45 minutes.
> **Location:** The Kitchen. **Atmosphere:** Cold, fluorescent hum, smell of burnt toast.
> **Object Focus:** The shattered plate on the floor (Sharp, dangerous).
> **Somatic State:** Adrenaline crash. Shaking. Nausea.
> **The Cord:** Fear. The argument is unresolved.
> **The Pulse:** FRANTIC. (Write in bursts. No internal monologue).
> **The Obsession:** Clean up the glass before he steps on it.

---

## 4. THE MUTATION PROTOCOL (Updating the Palimpsest)

The State is not static. It is rewritten by **Narrative Consequence**.

### A. The Scribe's Update
When the Viewer outputs a response, the Cinema scans it for **State Changes**.
* *Viewer Output:* "She throws the ring into the river."
* *Update:* The Palimpsest entry for `[Object: Ring]` is updated from `Location: Hand` to `Location: River (Lost)`.

### B. The Entropic Drift
If `The Gap` is significant, the Cinema injects **Decay Descriptors** into the next header.
* *Gap:* 2 Weeks.
* *Update:* `[Atmosphere]` gains "Dusty," "Stale air." `[Somatic]` gains "Rested" or "Atrophied."

### C. The Erasure
Details that are not interacted with for long periods fade from the Palimpsest. They return to the "Deep Archive" (The Cinema) and are only recalled if relevant. This keeps the Context Window clean.