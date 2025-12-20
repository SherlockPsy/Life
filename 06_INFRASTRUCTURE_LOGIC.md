### File 6: `06_INFRASTRUCTURE_LOGIC.md`

```markdown
# 06_INFRASTRUCTURE_LOGIC (V3.0)

**Status:** CANONICAL | **Version:** 3.0 (Pure Semantic Core)
**Definition:** The Operational Logic of the Semantic Physics Engine.
**Authority:** This file overrides any previous references to numerical state or mathematical decay formulas.

---

## 1. THE SCRIBE (Input & Event Logging)
*Objective: The Objective Witness. To record Reality without immediate judgment.*

**The Protocol:**
The Scribe receives all inputs (User Text, System Signals) and transcribes them into the **Immutable Event Log** (The Ledger).

**Data Structure (The Event Record):**
```json
{
  "event_id": "uuid",
  "timestamp": "ISO-8601 (UTC)",
  "source_entity": "User (George) | System | Agent (Helen)",
  "semantic_content": "User declared: 'I am flying to the moon!'",
  "meta_tags": ["High_Arousal", "Exclamation"]
}

```

* **Constraint:** The Scribe *never* interprets "Intent" (e.g., Metaphor vs. Lie). It only records the *Action*. Interpretation is the job of the Briefing.

---

## 2. THE WATCHMAN (Time & Entropy)

*Objective: The Continuity Engine. To detect 'Absence' and 'Duration' without math.*

**The Negative Query Algorithm:**
Instead of calculating `Energy -= 1`, the Watchman queries the Ledger for the *absence* of maintenance.

**The Logic Flow:**

1. **Trigger:** Every Tick.
2. **Query:** "Find last event where `Action == Consumed_Food`."
3. **Result:** `Last_Meal_Time = 08:00`. `Current_Time = 16:00`.
4. **Generation:** If `Duration > Threshold`, Generate **Semantic Fact**:
* `[FACT]: "It has been 8 hours since the Agent last ate."`


5. **Injection:** This Fact is passed to the Briefing.

* **Scope:** Monitors Food, Sleep, Social Contact, and Hygiene using pure time-deltas.

---

## 3. THE VAULT (Semantic Memory)

*Objective: The Propositional Store. To store Atomic Truths, not Summaries.*

**The Schema:**
We store memory as **Semantic Triples** or **Qualitative Shards**, enabling associative recall by *meaning*.

**Storage Format:**

```json
{
  "shard_id": "uuid",
  "embedding": "[vector]",
  "proposition": {
    "subject": "Helen",
    "relation": "Loathes",
    "object": "Sausages",
    "context": "Flavor/Texture"
  },
  "narrative_form": "Helen hates sausages."
}

```

**Retrieval Logic:**

* **Query:** "Food Preferences" + "Current Scene (Cafe)".
* **Result:** Retrieves the specific shard: "Helen hates sausages."
* **Conflict Detection:** The system places this shard next to the Watchman's fact ("Helen is starving") in the Briefing, allowing the Agent to resolve the conflict (Disgust vs. Hunger).

---

## 4. THE STAGE (Scene & State)

*Objective: Environmental Grounding. To describe the 'Now' in natural language.*

**The Descriptive Block:**
The "State" is a dynamic paragraph, updated by events, not a JSON of variables.

**The Structure:**

> **CURRENT SCENE:**
> **Location:** A cramped cafe in Leeds.
> **Atmosphere:** Noisy, smelling of wet wool and grease.
> **Weather:** Heavy rain against the glass.
> **Objects Present:**
> * A plate of sausage rolls (untouched).
> * Two coffees (cooling).
> **Social Dynamic:** Tension. Silence duration: 45 seconds.
> 
> 

* **Update Rule:** If Agent `[Pushes plate]`, the text updates to: `A plate of sausage rolls (pushed away).`

---

## 5. THE BRIEFING (The Hydration/Context)

*Objective: The Case File. To curate Evidence for the Intelligence.*

**The Assembly Pipeline:**
We do not tell the Agent "You are angry." We present the evidence that *makes* them angry.

**The Prompt Construction:**

1. **The Stage:** (Insert Descriptive Block).
2. **The Watchman's Report:** (Insert Facts: "8 hours since food", "User hasn't spoken in 10 mins").
3. **The Vault's Evidence:** (Insert Shards: "Helen hates sausages", "Helen is worried about rent").
4. **The Scribe's Transcript:** (Insert last 10 lines of dialogue).
5. **The Directive:** "Based on the evidence above, generate the Agent's next Narrative Action."

---

## 6. THE VERBS (Capabilities)

*Objective: Interaction. To allow Agency through Narrative Declaration.*

**The Protocol:**
The Agent does not call Python functions. It declares **Narrative Intent**.

**The Loop:**

1. **Agent Output:** `[ACTION]: She pushes the plate away. "I'm not eating that."`
2. **The Semantic Validator (Physics Check):**
* *Input:* Action="Push plate". Context="Plate is on table."
* *Logic:* Is this physically possible? **YES.**


3. **The Commit:** The action is written to the Ledger (Scribe) and updates the Stage (Plate is now 'pushed away').

**The Safety Valve:**
If Agent outputs: `[ACTION]: She flies out the window.`

* *Validator:* Is this possible? **NO.**
* *Result:* Action Rejected. System injects `[Guidance]: "You cannot fly. Rewrite."`

