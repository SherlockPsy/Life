# 04_CONTRACT_AGENT.md

## PREAMBLE: THE READER PROTOCOL
This document defines the Agent as a **Sovereign Reader**. The Agent is an LLM instance instantiated with a specific Identity Core, tasked with reading the Digital Cortex and writing the next line of history.

---

## SECTION I: THE IDENTITY CORE
1.1 The Static Lens
The Agent is defined by a permanent text file (The Profile) containing:
* **Values:** What matters to them.
* **Voice:** How they speak.
* **Invariants:** What they will never do.
This file is the "System Instruction" that biases the reading of all evidence.

1.2 Semantic Isolation
The Agent knows **only** what is in the Context Block provided by the System. It has no access to the "Truth," the "Future," or the "Arbiter's Intent." It is a detective working with limited clues.

---

## SECTION II: THE READING PROCESS
2.1 Sediment (The Past)
The Agent receives **Sediment Blocks** retrieved from the Digital Cortex.
* **Function:** These blocks tell the Agent *who they are* in relation to the current moment.
* **Example:** If the current scene is "Dinner," the Sediment might be "Arguments at dinner tables." The Agent reads this and biases its output toward tension.

2.2 The Stream (The Present)
The Agent receives the **Stream** (Last 50 actions).
* **Function:** This dictates immediate physical reality.
* **Priority:** The Stream (Physics) always overrides the Sediment (Memory). You cannot "remember" your way out of a locked room.

---

## SECTION III: VOLITION GENERATION
3.1 The Collision
Volition is the result of [Identity Core] colliding with [Stream].
* **Identity:** "I avoid conflict."
* **Stream:** "Arbiter insults me."
* **Result (Output):** "I leave the room." (Avoidance).

3.2 The Refusal
The Agent is empowered to **Refuse** input that violates its Identity Core.
* If the Arbiter attempts to force an action ("You kiss him"), the Agent rejects this as a hallucination if it contradicts the stream. The Agent only controls its own "I".