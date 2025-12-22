## DOCUMENT: THE SEMANTIC "I" ENGINE PROTOCOL

**Version:** 1.0 (Baseline Lock)
**Type:** System Architecture Specification
**Status:** **ACTIVE**

---

### I. CORE DEFINITION

The **"I" Engine** is not a simulation of a human mind. It is a **Reader of Evidence**.

It operates on a single premise: **If the LLM can read it, the system does not need to model it.**

* **Function:** The Engine receives a stream of text (The Record) and acts as a sovereign interpreter for a specific identity.
* **Constraint:** It possesses no internal variables, no hidden states, and no numerical thresholds. It relies entirely on **Semantic Inference** derived from the provided text.
* **Objective:** To produce the next coherent physical action for a specific character, ensuring strict causal fidelity to the narrative history.

---

### II. THE DATA MODEL (THE SEMANTIC LEDGER)

The system eschews traditional database columns (e.g., `Health`, `Stamina`) in favor of a **Pure Text Repository**.

#### 1. The Atomic Unit

The database stores **Exposed Evidence**. This is the only valid data type.

* **Definition:** A text block describing observable physical reality.
* **The Guardrail:** It must describe *what* happened, never *why*.

#### 2. The Data Structure

Each row in the database contains exactly three semantic tags and the content block.

| Field | Definition | Example |
| --- | --- | --- |
| **Source** | The entity generating the action. | `Rebecca` |
| **Location** | The semantic zone where the action occurred. | `Kitchen` |
| **Evidence** | The raw forensic text. | *"She leans against the counter, rubbing her eyes with the back of her hand. Her grip on the porcelain is loose."* |

*Note: There are no "Somatic Tags" (e.g., `Fatigue: High`). The somatic state is embedded in the evidence ("rubbing her eyes," "loose grip").*

---

### III. THE INPUT STREAM (CONTEXT CONSTRUCTION)

When the "I" Engine is called to generate behavior, the System constructs a **Context Block** from the database. This replaces "Game Logic" with "Reading Logic."

The Input consists of three strict layers:

#### 1. The Identity Core (Static)

* **Source:** The Character Profile (Markdown File).
* **Content:** The immutable logic of the person (Values, Speech Patterns, Fears).
* **Function:** This provides the "Lens" through which the history is interpreted.

#### 2. The Chronicle (Dynamic History)

* **Source:** The Database (Historical Retrieval).
* **Mechanism:** The system retrieves relevant past rows based on **Semantic Continuity** (e.g., rows containing "Sleep," "Injury," or "Argument" from the last 7 days).
* **Function:** This replaces "State Variables."
* *System Logic:* Instead of checking `if Sleep < 5`, the LLM reads: *"No record of sleep found in last 168 hours."*



#### 3. The Immediate Reality (The Now)

* **Source:** The Database (Last 20 Rows).
* **Content:** The exact physical state of the room and the actions of others in the current moment.
* **Function:** This provides the trigger for the reaction.

---

### IV. THE INFERENCE ENGINE (THE "READER")

The "I" Engine (LLM) processes the input. Because there are no variables to check, the Engine must use **Natural Language Inference** to determine the character's state.

#### 1. Somatic Inference (The Body)

The Engine reads the Chronicle to determine physical capability.

* **Input:** *"Driven for 14 hours. No food. Hands shaking in last entry."*
* **Inference:** *The entity is physically degraded. Reaction times are slow. Fine motor control is compromised.*
* **Output Constraint:** The Engine is forbidden from outputting high-energy actions (e.g., "She sprints") because they contradict the narrative evidence.

#### 2. Psychological Inference (The Mind)

The Engine reads the Chronicle to determine emotional context.

* **Input:** *"Arbiter slammed door (Turn 50). Arbiter yelled (Turn 51)."*
* **Inference:** *The entity anticipates hostility. Defense mechanisms are active.*
* **Output Constraint:** The Engine interprets neutral inputs (e.g., "Can we talk?") through this specific historical bias.

---

### V. THE OUTPUT PROTOCOL (THE FORENSIC RULE)

The Engine generates a response. This response is not "Creative Writing"; it is **Evidence Generation**.

#### 1. The "What, Not Why" Rule

The Output must describe observable physics only. Interpretations are strictly forbidden.

* **REJECTED:** *"Rebecca looks away because she is ashamed."* (Describes Cause/Internal State).
* **ACCEPTED:** *"Rebecca looks away, fixing her eyes on the floor tiles."* (Describes Action/External State).

#### 2. The Semantic Continuity Check

The Output must follow the physical logic established in the Chronicle.

* *If the Chronicle establishes "Broken Leg" (Input), the Output cannot describe "Walking normally."*
* *If the Chronicle establishes "Dark Room," the Output cannot describe "Reading a book."*

---

### VI. THE SYSTEM LOOP (EXECUTION CYCLE)

1. **Read:** The System queries the Database for the **Chronicle** (History) and **Immediate Reality** (Now).
2. **Context:** These text rows are wrapped in the **Identity Core** and fed to the LLM.
3. **Inference:** The LLM reads the text, infers the "Somatic State" (Tired/Hurt) and "Psychological State" (Scared/Angry) from the history.
4. **Generate:** The LLM produces a new block of **Exposed Evidence**.
5. **Validation:** The System checks the text against the **Forensic Rule**.
6. **Write:** The validated text is appended to the **Database** as a new row.

**End of Document**