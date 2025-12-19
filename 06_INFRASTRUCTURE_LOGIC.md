# 06_INFRASTRUCTURE_LOGIC (V1.0)

**Status:** CANONICAL | **Version:** 1.0 (Engineering Spec)
**Definition:** The Operational Logic, Data Structures, and Algorithms.
**Authority:** This file defines **HOW** the system implements the constraints defined in Files 00–05.

---

## 1. OBSERVER PROTOCOLS (The Input Logic)

*Objective: Define the taxonomy and logic for the "Context Detective" (File 05).*

### A. The Classification Taxonomy

The Observer must classify every User Input into one of these strict **Semantic Types** before the Agent sees it.

1. **`SPEECH_ACT_LITERAL`**: Standard communication. (e.g., "Pass the salt.")
2. **`SPEECH_ACT_METAPHOR`**: Symbolic expression. (e.g., "I'm flying to the moon.")
* *Trigger:* User `Valence > 0.8` OR `BAC > 0.08` (S3 State).


3. **`SPEECH_ACT_DECEPTION`**: User statement contradicts `World_Fact` (S2).
* *Trigger:* User says "I am in London" but S2 says "User is in Leeds."


4. **`SILENCE_EVENT`**: `Time_Since_Last_Input > Threshold`.

### B. The Vibe Check Algorithm

*Logic for Step 0 of Execution Loop.*

```python
def classify_input(user_text, agent_state, world_state):
    # 1. Physics Check (Law 2)
    if contains_location_claim(user_text):
        if not is_physically_possible(user_text, world_state):
            return "SPEECH_ACT_DECEPTION" (or Delusion)

    # 2. Chemical Check (Law 8)
    if agent_state.intoxication_level > 0.08:
        # Drunk agents perceive metaphors more easily
        return "SPEECH_ACT_METAPHOR" 

    # 3. Default
    return "SPEECH_ACT_LITERAL"

```

---

## 2. ENTROPY FUNCTIONS (The Physics Logic)

*Objective: Define the mathematical formulas for "Drift" and "Decay" (Law 3).*

### A. The Time Delta Function

The `Tick_Service` must calculate `dt` (Delta Time) in seconds.


### B. Decay Formulas (The Cost of Time)

These functions run during **Step 2 (Entropy Pass)**.

1. **Biological Decay (Energy/Satiety):**
* `New_Value = Old_Value - (dt * Decay_Rate)`
* *Constraint:* Rate accelerates if `Sleep_Pressure > 80`.


2. **Relational Decay (Intimacy):**
* *Formula:* `Intimacy = Intimacy * (0.999 ^ (dt_in_hours / 24))`
* *Logic:* Asymptotic decay. It never hits zero, but it halves every  days of silence.


3. **Object Decay (Entropy):**
* `Item_Health -= (dt * Material_Coefficient)`
* *Example:* A hot coffee (`Coefficient: High`) goes cold in 30 mins. A stone (`Coefficient: Low`) lasts centuries.



---

## 3. SEMANTIC MEMORY SCHEMA (The Storage Logic)

*Objective: Define the Qdrant JSON structure for Associative Linking (Law 12).*

### A. The Vector Config

* **Collection:** `virlife_memory_core`
* **Dimensions:** 1536 (Ada-002)
* **Distance Metric:** Cosine Similarity

### B. The Node Payload

```json
{
  "id": "uuid",
  "vector": "[float...]", 
  "payload": {
    "memory_type": "enum (episodic | core_identity | semantic_fact)",
    "content": "string (The narrative text)",
    "creation_tick": "integer",
    "emotional_context": {
      "valence_at_encoding": "float (-1.0 to 1.0)",
      "arousal_at_encoding": "float (0.0 to 1.0)"
    },
    "entities_involved": ["user_id", "location_id"],
    "decay_factor": "float (1.0 = Permanent, 0.1 = Fleeting)"
  }
}

```

* **Constraint:** The `decay_factor` allows the system to "forget" trivial memories (coffee orders) while keeping core memories (breakups).

---

## 4. SCENE MANIFOLD (The State Logic)

*Objective: Define the "Snapshot" object passed to the LLM (Context).*

### The Scene Header JSON

Injected at the start of every Prompt.

```json
{
  "scene_context": {
    "tick_id": 10452,
    "absolute_time": "2025-10-12T23:45:00Z",
    "location_state": {
      "name": "Leeds_Apartment",
      "sensory_tags": ["Rain", "Cold", "Smell_of_Toast"]
    },
    "agent_bio_state": {
      "energy": 14,
      "satiety": 88,
      "is_critical": true (Triggers "Hangry" logic)
    },
    "social_vector": {
      "target": "George",
      "intimacy": 65.4,
      "current_stance": "Defensive"
    }
  }
}

```

---

## 5. HYDRATION PIPELINE (The Processing Logic)

*Objective: Define the algorithm for constructing the "Dynamic Prompt" (Section 5A of Architecture).*

### The Assembly Pseudo-Code

**Trigger:** Every Tick where `Input != NULL`.

1. **Fetch Identity Shard:**
* *Query:* `Agent_State.Current_Mood` + `User_Input`.
* *Source:* `identity_nodes` collection.
* *Result:* Retrieves *only* the personality aspects relevant to "Anger" or "Flirting" (not the whole bio).


2. **Fetch Episodic Context:**
* *Query:* `User_Input` embedding.
* *Filter:* `must_have(entities_involved: [George])`.
* *Result:* Top-3 past events relevant to the current topic.


3. **Inject Biological Imperative:**
* If `S3.Energy < 20`: Inject `SYSTEM_OVERRIDE: "You are exhausted. Use short sentences. Be irritable."`


4. **Assemble Prompt:**
* `[Scene Header] + [Bio Override] + [Identity Shard] + [Episodic Context] + [Task Instruction]`.



---

## 6. TOOL REGISTRY (The Output Logic)

*Objective: Define the exact capabilities of the Agent.*

### A. The Tool Definitions (Python Signatures)

The LLM generates JSON to call these functions.

1. **`perform_speech_act(content: str, tone: str, pulse_match: int)`**
* *Logic:* Renders dialogue.
* *Constraint:* `pulse_match` must be within +/- 10 of `S5.pulse_rate`.


2. **`perform_sensory_act(action: str, target: str)`**
* *Logic:* Describes body language.
* *Example:* `action="shiver"`, `target="self"`.


3. **`update_internal_state(variable: str, delta: float)`**
* *Logic:* Allows Agent to self-modify mood.
* *Example:* `variable="resentment"`, `delta=+5.0`.


4. **`world_interact(object_id: str, interaction_type: str)`**
* *Logic:* Physical manipulation.
* *Constraint:* Validates `Law 2` (Distance) and `Law 4` (Object Health).



### B. The Safety Valve (No Hallucination)

If the LLM outputs a tool call that is **NOT** in this registry (e.g., `fly_to_moon()`), the `Tool_Executor` throws a `CAPABILITY_ERROR` and forces a fallback reaction (Confusion).