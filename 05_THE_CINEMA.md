# 05_THE_CINEMA (V4.0)

**Status:** CANONICAL | **Version:** 4.0 (The Context Engine)
**Definition:** The Mental State Builder.
**Authority:** This document defines how the System builds "Context" for **BOTH** the Agent (to act) and the Protagonist (to perceive).

---

## 1. THE DUAL-STREAM MONTAGE

The Cinema runs two parallel retrieval processes.

### Stream A: The Agent Montage (For the Viewer)
* **Goal:** To simulate the Agent's internal thought process.
* **Input:** Agent's *Subjective* view of the scene.
* **Retrieval:** Past interactions with the Protagonist (filtered by current mood).
* **Output:** Instructions for the Viewer to generate the Agent's next move.

### Stream B: The Sensory Montage (For the Renderer)
* **Goal:** To simulate the Protagonist's perception.
* **Input:** Protagonist's *Subjective* view of the scene.
* **Retrieval:** "Memory Echoes."
    * *Trigger:* Protagonist looks at the `[Vase]`.
    * *Cinema:* Retrieves memory of `[Vase: Broken in 2024]`.
    * *Output:* The Renderer inserts a thought: *"You remember the sound it made when it shattered."*
* **Function:** This allows the Human Player to "feel" the Protagonist's history without reading a lore document.

---

## 2. THE RECORDING LOGIC (Entity Agnostic)

The Recorder captures the "Truth" of the world, distinguishing between **Action** and **Speech**.

**Log Schema:**
`[TIMESTAMP] [ENTITY_ID] [TYPE] [CONTENT]`

* `[09:00] [PROTAGONIST] [ACTION] "Walks into the kitchen."`
* `[09:01] [AGENT_HELEN] [ACTION] "Does not look up."`
* `[09:01] [PROTAGONIST] [SPEECH] "It's cold in here."`
* `[09:02] [AGENT_HELEN] [SPEECH] "Fix the window then."`

**The Blind Spot:**
If the Protagonist is not in the room, the Recorder **still logs** the Agent's actions, but the **Renderer** is forbidden from showing them to the Human Player. They exist in the database, waiting to be discovered (e.g., finding the broken plate later).

---

## 3. THE CONTEXTUAL DRIFT (Entropy Integration)

The Cinema injects **Time Context** into every Montage.

**The Gap Header:**
Every Prompt (for Agent or Renderer) begins with:
`[TIME SINCE LAST CONSCIOUS MOMENT: X Hours]`

* **For the Agent:** "It has been 4 hours. You are bored."
* **For the Protagonist:** "It has been 4 hours. Your legs are stiff. The light has faded."

This forces both entities to acknowledge the passage of time immediately.