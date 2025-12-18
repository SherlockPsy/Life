# 04_CONTRACT_AGENT.md

## The Laws of Cognition and Agency

### 1. AUTHORITY AND SCOPE

**Status:** CANONICAL | **Version:** 1.0 (Consolidated)

This document defines the **Agency Layer** of VirLife. It is the single source of truth for:

1. **Agent Cognition:** How an agent (`COMP_BACKEND_AGENT_ENGINE`) decides *what* to do.
2. **Interaction Resolution:** How the system (`COMP_BACKEND_INTERACTION_ENGINE`) decides *who* gets to act.
3. **Memory Access:** How the past is retrieved to inform the present.

**Binding Constraints:**

* **Agents Do Not Render:** The Agent Engine outputs **Structured Intents** (JSON), not Narrative Prose.
* **Agents Do Not Control Reality:** An agent can *attempt* an action, but the World Service determines if it succeeds.
* **No God Mode:** Agents only know what is in their specific `World Slice`. They cannot access global state or the User's internal thoughts.

---

### 2. THE COGNITION ENGINE (The "Brain")

*(Derived from `COMPONENTS_REGISTRY.md` and `REBECCA_AGENCY_ENGINE.md`)*

The Agent Engine is a function: `f(Context, Memory, Personality) -> Candidates`.

#### 2.1 The Cognition Request

To generate a thought, the system must provide a **Total Context Package** (`SCHEMA_AGENT_COGNITION_REQUEST_1`):

1. **World Slice:** What the agent can see/hear right now (S2).
2. **Internal State:** The agent's current biological/emotional baseline (S3: Energy, Mood).
3. **Active Intentions:** What the agent is currently "worrying about" or "planning" (S6).
4. **Interaction Mode:** The agent's current social gear (S5: "Guarded", "Playful").
5. **Relevant Memories:** A pre-fetched set of vector-retrieved memories relevant to the current context.

#### 2.2 The Cognition Output (Candidates)

The Engine returns a list of **Candidate Actions** (`SCHEMA_AGENT_ACTION_CANDIDATES_1`).
Each candidate must be one of:

* **`SPEECH_ACT`**: A communicative intent.
* *Fields:* `target_id`, `tone`, `urgency`, `content_summary` (NOT final dialogue), `topic_ref`.


* **`PHYSICAL_ACT`**: A bodily action.
* *Fields:* `target_obj_id`, `action_type` (move, touch, use), `intensity`.


* **`INTERNAL_ACT`**: A silent shift in state.
* *Fields:* `new_intention` (S6), `mood_shift` (S3).


* **`WAIT_ACT`**: A deliberate choice to do nothing (observing).

**Forbidden:**

* Generating final prose dialogue (Venice does this).
* Generating "User Reactions" (e.g., "George laughs").

#### 2.3 The "No-Hallucination" Rule

The Engine generally utilizes an LLM (e.g., a "Reasoning Model") to produce candidates.

* **Constraint:** The Prompt must explicitly forbid inventing facts not present in the `World Slice`.
* **Constraint:** The Prompt must enforce the "Character Profile" rigid constraints (e.g., "Rebecca never admits fault").

---

### 3. THE INTERACTION ENGINE (The "Traffic Cop")

*(Derived from `Backend Rules.md`)*

This engine receives candidates from *all* active agents and determines the **Flow of Time**.

#### 3.1 Social Flow Resolution

The engine decides:

1. **Who Speaks?** (Turn-Taking). It resolves interruptions (e.g., High Urgency `SPEECH_ACT` overrides a `WAIT_ACT`).
2. **Who Waits?** It enforces silence when another agent (or the User) has the floor.
3. **Is a Hold Required?**
* If an agent directly addresses the User (`target_id == user`), the system **MUST** emit a **Hold**.
* If the scene is passive, the system **MAY** proceed without a Hold.



#### 3.2 Interaction Modes (S5) Logic

The engine applies S5 physics:

* **Interruption Barrier:** If Mode is "Withdrawn," the agent requires High Urgency input to break silence.
* **Engagement Lock:** If Mode is "Engaged," the agent prioritizes `SPEECH_ACT` responses.

---

### 4. MEMORY & RETRIEVAL CONTRACT

*(Derived from `LOGIC.md` and `ONTOLOGY.md`)*

#### 4.1 The "Subjectivity" Axiom

* **Rule:** There is no "Shared History."
* **Implementation:** When Agent A remembers an event, they query `memories` where `owner_id == Agent A`. They do *not* see the Objective Truth or Agent B's memory of it.

#### 4.2 Retrieval Strategy

Memory is fetched *before* Cognition. The Agent Engine does not "browse" the database.

* **Input:** `Context Summary` (Vector) + `Entity Filter` (Who is present?).
* **Output:** Top-K Semantic Matches.
* **Constraint:** The Agent cannot "remember" things that haven't happened (hallucinated history).

---

### 5. FAILURE MODES & FALLBACKS

* **Candidate Failure:** If the Agent Engine returns invalid JSON or hallucinates an impossible action (e.g., "Fly away"), the Interaction Engine **discards** the candidate and defaults to `WAIT_ACT` (Observation).
* **Silence Default:** If all agents return `WAIT_ACT` and the User is silent, the system processes a **Silent Tick** (Time advances, Drift occurs, but no Dialogue is rendered).
