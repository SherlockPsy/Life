# 06_INFRASTRUCTURE_LOGIC.md

## PREAMBLE: THE BACKEND AGENTS
This document defines the invisible workers that maintain the Digital Cortex. These are lightweight LLM tasks that run between Ticks.

---

## SECTION I: THE INDEXER (THE TAGGER)
1.1 The Tagging Protocol
Immediately after an Agent writes a new Action, the **Indexer** scans it.
* **Task:** Extract "Objects" and "Themes."
* **Constraint:** Use forensic nouns (e.g., `Cup`, `Table`). Do not invent metaphors.
* **Output:** Adds tags to the Memory Block in the Cortex.

1.2 The Vector Embedder
The System converts the Action text into a mathematical Vector.
* **Function:** This allows "Fuzzy Search." (e.g., Searching for "Violence" finds "Slap" even if the word Violence isn't used).

---

## SECTION II: THE SEARCH LOGIC
2.1 The Hybrid Query
When retrieving Sediment, the System uses a two-step process:
1.  **Vector Scan:** Find blocks with similar "Vibes" (Meaning).
2.  **Tag Filter:** Prioritize blocks with matching "Facts" (Objects/People).

2.2 The Query Expansion
To ensure Richness, the System expands the Agent's context.
* **Context:** "Color."
* **Expansion:** The System automatically looks for `Red`, `Blue`, `Paint`, `Light`.
* **Result:** The Agent remembers "Red" things without needing precise keyword matching.