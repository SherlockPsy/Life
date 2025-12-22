# 01_SYSTEM_ARCHITECTURE.md

## OVERVIEW: THE SEMANTIC ENGINE
The architecture is defined by the interaction between the **Digital Cortex** (Memory) and the **Biographical Readers** (Agents). There is no central simulation loop; there is only a cycle of Reading and Writing text.

---

## COMPONENT I: THE DIGITAL CORTEX (THE INFRASTRUCTURE)
**Definition:** The infinite, unthinking repository of all reality.
**Functions:**
1.  **The Library:** Stores every event as a raw **Memory Block** (Text + Vector + Tags).
2.  **The Stream:** A rolling buffer of the last ~50 blocks (The "Now").
3.  **The Search:** A hybrid retrieval engine that pulls relevant past blocks (Sediment) based on the current context (Vectors/Tags).

---

## COMPONENT II: THE BIOGRAPHICAL READERS (THE AGENTS)
**Definition:** The processing cores that simulate specific individuals (e.g., Rebecca).
**Functions:**
1.  **The Context Construction:** Ingests [Identity Core + Stream + Sediment].
2.  **The Inference:** Reads the text to determine Somatic and Emotional state.
3.  **The Output:** Generates a new block of Exposed Evidence describing physical action.

---

## COMPONENT III: THE RECORDER (THE VALIDATOR)
**Definition:** The interface between the Agent's output and the Digital Cortex.
**Functions:**
1.  **The Forensic Check:** Enforces the "What, Not Why" rule. It rejects any output that describes internal state (e.g., "She felt sad").
2.  **The Timestamp:** Stamps the accepted text with Time and Location.
3.  **The Commit:** Writes the validated block into the Cortex, making it permanent reality.

---

## COMPONENT IV: THE ARBITER (THE ANOMALY)
**Definition:** The physical user.
**Functions:**
1.  **Evidence Injection:** The Arbiter's inputs are treated as "God-Tier Evidence." They are written directly to the Stream without filtering, forcing the Agents to react.

---

## ARCHITECTURAL FLOW (THE CYCLE)
1.  **Event:** Arbiter or Agent generates Action.
2.  **Ingestion:** Recorder validates and saves to **Cortex**.
3.  **Retrieval:** System searches Cortex for relevant **Sediment** (History).
4.  **Prompting:** System feeds [Stream + Sediment] to the **Agent**.
5.  **Reading:** Agent infers state and generates Reaction.
6.  **Loop:** Reaction becomes the new Event.