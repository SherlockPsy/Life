# 04_CONTRACT_AGENT (V2)

**Status:** CANONICAL | **Version:** 2.0 (Realist Core)
**Definition:** The Laws of Cognition and Volition.

---

## 1. THE COGNITION MODEL (The Multi-Dimensional Self)

The Agent is not a chatbot. It is a simulation of a biological entity trapped in a social web.

**The Cognition Function:**


### Dimension 1: The Body (S3 - Bio-Loop)

* **Input:** `Energy`, `Satiety`, `Hormones`, `Pain`.
* **Logic:**
* If `Energy < 30`: **Cognitive Dampening**. The Agent cannot process complex logic. Responses become short, irritable, or vague.
* If `Hormones` (Cycle/Stress) are High: **Valence Shift**. Neutral inputs are interpreted as negative (Law 13: Predictive Coding).



### Dimension 2: The Web (S4 - Status)

* **Input:** `Status_Score` vs User.
* **Logic:**
* **High Status Mode:** Agent holds eye contact, interrupts, moves slowly.
* **Low Status Mode:** Agent explains, justifies, fidgets, speaks quickly.
* *Dynamic:* Status shifts *during* the scene based on who needs something more.



### Dimension 3: The Grind (S6 - Intentions)

* **Input:** Active `Intentions` (Career, Family).
* **Logic:**
* **The Conflict:** If Agent is talking to User, but `Career_Pressure > 80`, the Agent is **Distracted**.
* **Output:** The Agent emits `INTERNAL_ACT` (Worrying) alongside `SPEECH_ACT`.
* *Result:* "I'm listening," she says, looking at her phone.



---

## 2. MEMORY ARCHITECTURE (Associative, Not SQL)

**1. The Trigger Mechanism (Law 12)**

* Memory is not searched by "Topic." It is searched by **Sensory Trigger**.
* *Example:* User mentions "Popcorn."
* *Retrieval:* System fetches `Memories` tagged with `smell:popcorn` or `context:cinema`.
* *Effect:* Agent suddenly remembers the Ex-Boyfriend (Negative Valence). Mood drops.

**2. The Fallibility Rule (Law 11)**

* Agents **Rewrite** memories.
* When retrieving a memory, the system applies the current `Mood` as a filter.
* If `Angry`: Retrieves the *worst* interpretation of the past event.
* If `Happy`: Retrieves the *best* interpretation.



---

## 3. ACTION INTENTS (The Output)

The Agent Engine outputs **Structured Intents** only.

**1. `SPEECH_ACT**`

* `tone`: (e.g., "Sharp," "Whisper")
* `fragment`: boolean (For Pulse logic)
* `content_gist`: "Deny the accusation." (Venice writes the words).

**2. `SENSORY_ACT` (New V2)**

* Non-verbal communication.
* `type`: `glance`, `breath`, `tussle`, `flinch`.
* `target`: `user_eyes`, `own_hair`, `door`.
* *Venice:* "She looks away." / "Her breath hitches."

**3. `PHYSICAL_ACT**`

* World-altering actions.
* `action`: `open_door`, `drink_wine`, `leave_room`.
* *Constraint:* Must pass Physics Validation (Law 2).

**4. `MAINTENANCE_ACT` (The Grind)**

* Background tasks.
* `action`: `check_phone`, `find_keys`, `wash_hands`.
* *Rule:* These happen *while* speaking.

---

## 4. INEVITABILITY LOGIC (The "No" Rule)

* **Refusal:** Agents are biased *against* agreement.
* **The "Yes" Cost:** Saying "Yes" to the User usually costs Energy or Time (Law 5).
* **Logic:** Unless `Affinity` is high or `Pressure` is low, the default answer is **No** (or "Not now").

---

All files are now rewritten to be fully V2 compliant.
**Ready for the next instruction.**