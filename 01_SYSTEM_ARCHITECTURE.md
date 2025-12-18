# 01_SYSTEM_ARCHITECTURE.md

## The Machine Blueprint

### 1. AUTHORITY AND SCOPE

**Status:** CANONICAL | **Version:** 1.0 (Consolidated)

This document defines the **System Architecture** of VirLife. It is the single source of truth for:

1. **Infrastructure:** Deployment topology, database contracts, and runtime environment.
2. **Components:** The strict boundaries, inputs, and outputs of every software module.
3. **Schemas:** The exact data shapes allowed across boundaries.
4. **Execution:** The atomic lifecycle of a "Tick."

**Binding Constraints:**

* **No Auth:** There is no user authentication, no login, and no multi-tenancy. The system runs for exactly one participant.
* **Single World:** There is exactly one world instance.
* **Irreversibility:** The system is append-only. No rollback, no retry.
* **No Microservices:** The system deploys as a **monolith** (`backend-core`) connected to managed persistence.

---

### 2. DEPLOYMENT & RUNTIME INFRASTRUCTURE

*(Derived from `INFRA_SPEC.md` and `INFRASTRUCTURE_AND_RUNTIME_CONTRACT.md`)*

#### 2.1 Deployment Topology (Railway)

The system consists of exactly **4 defined services**. No other services exist.

1. **`backend-core`** (Web Service)
* **Responsibility:** Hosts all logical components (API, Session, Tick Engine, Agents, Renderer Adapter).
* **Process Model:** Single process. No internal networking. Component communication via internal method calls (enforced interfaces).


2. **`postgres-primary`** (PostgreSQL)
* **Responsibility:** **Authoritative Truth**. Stores World State, Event History, UI Snapshots, and Memories.


3. **`redis-primary`** (Redis)
* **Responsibility:** **Ephemeral Cache**. UI fast-resume, continuity caching. *Never* authoritative.


4. **`qdrant-primary`** (Qdrant)
* **Responsibility:** **Similarity Search**. Retrieval of memories only. *Never* authoritative.



#### 2.2 Environment Variables (Hard Contract)

The system **must fail to start** if any of these are missing.

* `APP_ENV`: `production` | `staging` | `development`
* `SERVER_TIMEZONE`: `UTC` (Must be UTC).
* `POSTGRES_URL`: Connection string for `postgres-primary`.
* `REDIS_URL`: Connection string for `redis-primary`.
* `QDRANT_URL` / `QDRANT_API_KEY`: Connection for vector store.
* `VENICE_API_KEY`: Credentials for the LLM Renderer.
* **FORBIDDEN:** Any variable related to `AUTH`, `JWT`, `OAUTH`, or `USER_ID`.

#### 2.3 Database Invariants

1. **Monotonic Time:** `ticks.tick_id` must strictly increase. `sessions.current_tick_id` must never decrease.
2. **Single World:** The `world_singleton` table must contain exactly **one row**.
3. **Append-Only:** `events`, `user_inputs`, and `memories` tables are `INSERT`-only. `UPDATE`/`DELETE` are forbidden.

---

### 3. COMPONENT REGISTRY (Logical Boundaries)

*(Derived from `COMPONENTS_REGISTRY.md`)*

#### A) Frontend Components

* **`COMP_FRONTEND_APP_WEB`**: The single-page application.
* **Authority:** Presentation only.
* **Forbidden:** Must not paraphrase user input or invent narrative text.


* **`COMP_FRONTEND_WS_CLIENT`**: Maintains the WebSocket session.
* **Inputs:** `SCHEMA_UI_SNAPSHOT_1`, `SCHEMA_UI_DELTA_1`.
* **Outputs:** `SCHEMA_USER_INPUT_1`.



#### B) Backend Services (Hosted in `backend-core`)

**1. Gateway & Session Layer**

* **`COMP_BACKEND_API_GATEWAY`**: Terminates HTTP/WS. Validates schemas.
* *Forbidden:* Auth logic.


* **`COMP_BACKEND_SESSION_SERVICE`**: Bootstraps the single session.
* *Responsibility:* Ensures `WORLD_SINGLETON` exists. Returns current snapshot.


* **`COMP_BACKEND_SYNC_SERVICE`**: Broadcasts canonical UI state.
* *Responsibility:* Pushes `SCHEMA_UI_SNAPSHOT` and `SCHEMA_UI_DELTA` to the frontend.


* **`COMP_BACKEND_USER_INPUT_SERVICE`**: Persists input verbatim.
* *Constraint:* Must write raw text to Postgres before any processing.



**2. The Engine Core (The "Brains")**

* **`COMP_BACKEND_TICK_SERVICE`**: The Orchestrator.
* *Responsibility:* Advances `current_tick_id`. Calls all other engines sequentially.


* **`COMP_BACKEND_WORLD_SERVICE`**: Maintains `S2` (Situational State).
* **`COMP_BACKEND_AGENT_ENGINE`**: Generates Cognition.
* *Input:* World Slice + Memory.
* *Output:* Candidate Actions (JSON). *No narrative prose.*


* **`COMP_BACKEND_INTERACTION_ENGINE`**: Resolves Social Flow.
* *Responsibility:* Decides who speaks, interruptions, and turn-taking.


* **`COMP_BACKEND_PERCEPTION_FILTER`**: Applies "Fog of War."
* *Responsibility:* Filters events based on audibility/visibility.


* **`COMP_BACKEND_SCENE_CONTINUITY_SERVICE`**: Prevents contradictions.
* *Responsibility:* Tracks "What has been established" in the current scene.



**3. The Renderer Layer**

* **`COMP_BACKEND_ENVELOPE_ASSEMBLER`**: Gathers all data for the renderer.
* *Output:* `SCHEMA_RENDERER_ENVELOPE_1`.


* **`COMP_BACKEND_RENDERER_SERVICE`**: The Adapter for Venice.
* *Forbidden:* Modifying the envelope or the output.


* **`COMP_LLM_VENICE_RENDERER`**: The LLM (External).
* *Responsibility:* Pure prose generation.
* *Forbidden:* Inventing events or user actions.



**4. Storage Services**

* **`COMP_BACKEND_EVENT_HISTORY_SERVICE`**: Appends to the immutable log.
* **`COMP_BACKEND_MEMORY_SERVICE`**: Manages Vector/SQL duality for memory.

---

### 4. SCHEMA REGISTRY (Data Contracts)

*(Derived from `COMPONENTS_REGISTRY.md` and `Map Schema`. These define the JSON shapes exchanged between components.)*

#### 4.1 Input & Bootstrap

**`SCHEMA_BOOTSTRAP_RESPONSE_1`**

* `session_id` (uuid)
* `world_singleton_id` (text)
* `last_tick_id` (int)
* `ui_snapshot` (`SCHEMA_UI_SNAPSHOT_1`)

**`SCHEMA_USER_INPUT_1`**

* `session_id` (uuid)
* `client_time` (timestamptz)
* `input_text` (text; verbatim)
* `input_kind` (`utterance` | `action` | `mixed`)
* `raw_json` (json)

#### 4.2 UI State

**`SCHEMA_UI_SNAPSHOT_1`**

* `ui_snapshot_id` (uuid)
* `tick_id` (int)
* `version` (int)
* `rendered_blocks` (array of blocks)
* `scroll_anchors` (object)
* `focus_state` (object)
* `input_draft` (object)

**`SCHEMA_UI_DELTA_1`**

* `base_snapshot_id` (uuid)
* `next_snapshot_id` (uuid)
* `ops` (array of diff operations)

#### 4.3 Engine Internals

**`SCHEMA_TICK_TRIGGER_1`**

* `trigger_type` (`user_input` | `background` | `resume` | `heartbeat`)
* `last_known_tick_id` (int)

**`SCHEMA_WORLD_SLICE_1`**

* `world_singleton_id` (text)
* `user_location_id` (uuid)
* `agents_in_scope` (array)
* `environment_facts` (object)
* *Forbidden:* Any narrative prose.

**`SCHEMA_INTERACTION_REQUEST_1`**

* `world_slice` (`SCHEMA_WORLD_SLICE_1`)
* `agent_state_snapshots` (array)
* `user_input` (`SCHEMA_USER_INPUT_1`)

**`SCHEMA_AGENT_ACTION_CANDIDATES_1`**

* `agent_id` (uuid)
* `candidates` (array of structured intents)

**`SCHEMA_RENDERER_ENVELOPE_1`**

* `tick_context` (object)
* `world_slice` (object)
* `perceivable_events` (array)
* `scene_continuity` (object)
* *Forbidden:* "Be nice" or "Reward user" directives.

**`SCHEMA_RENDERED_BLOCKS_1`**

* `blocks` (array)
* `text` (string)
* `speaker_id` (uuid | null)
* `type` (`dialogue` | `action` | `scenery`)



#### 4.4 Persistence

**`SCHEMA_SQL_WRITE_1`**

* `table` (text)
* `operation` (`insert` | `update` | `upsert`)
* `values` (json)
* *Forbidden:* Updating history tables.

---

### 5. THE SYSTEM EXECUTION LOOP (The Authoritative Tick)

*(Derived from `SYSTEM_EXECUTION_MODEL.md`. This is the exact sequence of a "Moment" in VirLife.)*

**Preconditions:**

1. `system_time.presence_gate.is_present == true` (or trigger is `resume`).
2. Tick Lock acquired (Strict Serialization).

**Step 1: Time Advance (S1)**

* `Tick Service` reads current `tick_id`.
* Increments `tick_id` by 1.
* Updates `current_timestamp` based on `SYSTEM_TICK_SECONDS` (Parameter).

**Step 2: Drift & Intrusions (S2/S3/S4/S6)**

* `World Service` calculates **Drift Deltas** (Entropy, Decay).
* *Constraint:* Must produce `StateDelta` objects.
* *Inevitability Check:* Is silence/drift distribution satisfied?

**Step 3: Interaction Resolution**

* `Interaction Engine` receives World Slice + User Input.
* Calls `Agent Engine` for candidates.
* Determines "Who acts?" (User vs. Agent vs. Silence).
* Outputs: `Interaction Events`.

**Step 4: Perception Gating**

* `Perception Filter` removes events the user cannot see/hear.
* Output: `Perceivable Events`.

**Step 5: Envelope Assembly**

* `Envelope Assembler` packages:
* World Slice (Facts)
* Perceivable Events (Action)
* Scene Continuity (Context)


* Output: `SCHEMA_RENDERER_ENVELOPE_1`.

**Step 6: Rendering**

* `Renderer Service` sends Envelope to `Venice`.
* `Venice` returns `Rendered Blocks`.
* *Constraint:* Venice **must not** invent new events.

**Step 7: Atomic Commit**

* Persist:
* `StateDeltas` (Logic changes) -> `postgres-primary`
* `Events` (History) -> `postgres-primary`
* `UI Snapshot` (New Blocks) -> `postgres-primary`


* *Constraint:* All or nothing.

**Step 8: Broadcast**

* `Sync Service` emits `SCHEMA_UI_DELTA` via WebSocket.
* Frontend updates.

---

### 6. FAILURE SEMANTICS

* **No Fallbacks:** If a tick fails (e.g., Renderer timeout, DB lock), the tick **aborts**. The state rolls back. The user sees nothing.
* **No "Retry with simpler prompt":** The system does not degrade gracefully; it ensures correctness or nothing.
* **No "Blind" Rendering:** The Renderer never runs without a validated Envelope.