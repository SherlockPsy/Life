COMPONENTS_REGISTRY.md (v2.0)

Single-Participant · Single-World · Irreversible · No-Auth

Register Rules
	•	If a component is not listed below, it does not exist.
	•	If an interface is not listed below, it does not exist.
	•	If a schema is not listed below, it does not exist.
	•	If an entity (table/keyspace/collection) is not listed below, it does not exist.
	•	Every component must obey its Authority Domain and must not violate its Forbidden Authority.
	•	No fallbacks. Missing required data is an invalid design. Components must be designed so required inputs exist by construction.
	•	No authentication. The system assumes one participant forever. Any auth logic is illegal.
	•	Single world forever. Creating, selecting, or switching among multiple worlds is illegal.
	•	No relive. History is record/influence only; it cannot become present state.

⸻

Naming Conventions
	•	Components: COMP_*
	•	Interfaces: COMP_IFACE_*
	•	Schemas: SCHEMA_*
	•	Entities: COMP_ENTITY_*
	•	Infrastructure: COMP_INFRA_*

⸻

Global Invariants (System-Wide)
	1.	WORLD_SINGLETON exists exactly once and is immutable after initialization.
	2.	NOW is a single monotonic pointer (current_tick_id) that only increases.
	3.	No component may set any “present pointer” to an earlier tick.
	4.	All persisted history is append-only.
	5.	The renderer renders only what it is given; it does not invent events, facts, or user actions.

⸻

A) Interfaces

COMP_IFACE_HTTP_PUBLIC_API

Name: Public HTTP API
Category: Interface (HTTP)
Owner: Backend
Lifecycle: Persistent

Responsibility

Expose minimal endpoints for:
	•	bootstrap/resume into the present
	•	posting verbatim user input
	•	fetching canonical UI snapshot (optional redundancy to WS)

Endpoints (v1)
	•	GET /v1/bootstrap → SCHEMA_BOOTSTRAP_REQUEST_1 → SCHEMA_BOOTSTRAP_RESPONSE_1
	•	POST /v1/input → SCHEMA_USER_INPUT_1 → SCHEMA_USER_INPUT_ACCEPTED_1
	•	GET /v1/session/snapshot → SCHEMA_UI_SNAPSHOT_REQUEST_1 → SCHEMA_UI_SNAPSHOT_1

Forbidden Authority
	•	Must not authenticate, authorize, identify, or assign user identities.
	•	Must not mutate user input.
	•	Must not generate narrative text.

⸻

COMP_IFACE_WS_SESSION_CHANNEL

Name: Session WebSocket Channel
Category: Interface (WebSocket)
Owner: Backend
Lifecycle: Persistent

Responsibility

Real-time continuity channel:
	•	server pushes canonical UI snapshots/deltas
	•	client sends UI events (scroll/focus/draft)
	•	server can broadcast to multiple devices attached to the same session

Message Types

Client → Server:
	•	ui.event → SCHEMA_UI_EVENT_1
	•	ui.ack → SCHEMA_UI_ACK_1
	•	session.ping → SCHEMA_SESSION_PING_1

Server → Client:
	•	ui.snapshot → SCHEMA_UI_SNAPSHOT_1
	•	ui.delta → SCHEMA_UI_DELTA_1
	•	render.blocks → SCHEMA_RENDERED_BLOCKS_1
	•	session.state → SCHEMA_SESSION_STATE_1

Forbidden Authority
	•	Must not alter block text.
	•	Must not invent events/facts.

## COMP_IFACE_INTERNAL_RPC
**Name:** Internal RPC Interface  
**Category:** Interface (Internal)  
**Owner:** Backend  
**Lifecycle:** Persistent

### Responsibility
Standard request/response and event messaging between backend services.

### Allowed Usage
- Service-to-service boundary calls where each side validates schemas.

### Forbidden Authority
- Must not be used to bypass schema validation.
- Must not be used to “smuggle” undefined fields.

## COMP_IFACE_INTERNAL_CALL
**Name:** Internal In-Process Call Interface  
**Category:** Interface (Internal)  
**Owner:** Backend  
**Lifecycle:** Persistent

### Responsibility
Direct calls inside a service or tightly coupled runtime boundary.

### Allowed Usage
- Calls where both sides are within the same deployed service boundary OR explicitly declared as safe in the component design.

### Forbidden Authority
- Must not be used to bypass schema rules.
- Must not be used to invent missing data.

## COMP_IFACE_POSTGRES_PRIMARY
**Name:** Postgres Primary Boundary  
**Category:** Interface (Data Boundary)  
**Owner:** Infrastructure  
**Lifecycle:** Persistent

### Responsibility
Represents the boundary for Postgres operations.

### Allowed Schemas
- `SCHEMA_SQL_READ_1`
- `SCHEMA_SQL_WRITE_1`

### Forbidden Authority
- Must not allow writes that violate entity invariants (append-only, monotonic tick, singleton world).

## COMP_IFACE_REDIS_PRIMARY
**Name:** Redis Primary Boundary  
**Category:** Interface (Data Boundary)  
**Owner:** Infrastructure  
**Lifecycle:** Persistent

### Responsibility
Represents the boundary for Redis operations.

### Allowed Schemas
- `SCHEMA_REDIS_WRITE_1`

### Forbidden Authority
- Must not be treated as authoritative truth for world/timeline state.

## COMP_IFACE_QDRANT_PRIMARY
**Name:** Qdrant Primary Boundary  
**Category:** Interface (Data Boundary)  
**Owner:** Infrastructure  
**Lifecycle:** Persistent

### Responsibility
Represents the boundary for Qdrant similarity search.

### Allowed Schemas
- `SCHEMA_QDRANT_QUERY_1`

### Forbidden Authority
- Must not be used to request replay/restore of past state.


⸻

# A2) Frontend Components

## COMP_FRONTEND_APP_WEB
**Name:** Web Frontend App  
**Category:** Frontend Component  
**Owner:** Frontend  
**Lifecycle:** Persistent

### Responsibility
Primary UI application that:
- displays the canonical UI snapshot (rendered blocks + UI state)
- sends verbatim user input
- maintains local draft state until persisted as continuity
- opens and maintains the session WebSocket channel

### Authority Domain
- **Decides:** UI presentation only (layout, rendering of blocks, scrolling behaviour, input composing UX)
- **Transforms:** none of the semantic content
- **Formats/Renders:** only the UI; never produces narrative text

### Forbidden Authority
- Must not paraphrase user input.
- Must not infer or invent user actions.
- Must not change rendered block text.
- Must not invent events, facts, or world state.

### Inputs
- `SCHEMA_BOOTSTRAP_RESPONSE_1`
- `SCHEMA_UI_SNAPSHOT_1`
- `SCHEMA_UI_DELTA_1`
- `SCHEMA_SESSION_STATE_1`

### Outputs
- `SCHEMA_BOOTSTRAP_REQUEST_1`
- `SCHEMA_USER_INPUT_1`
- WS: `SCHEMA_UI_EVENT_1`, `SCHEMA_UI_ACK_1`, `SCHEMA_SESSION_PING_1`

## COMP_FRONTEND_WS_CLIENT
**Name:** WebSocket Client  
**Category:** Frontend Component (Module)  
**Owner:** Frontend  
**Lifecycle:** Persistent

### Responsibility
Maintain a reliable WS connection to `COMP_IFACE_WS_SESSION_CHANNEL`.

### Forbidden Authority
- Must not alter payload schemas.
- Must not inject semantic content.

## COMP_FRONTEND_STATE_STORE
**Name:** Frontend State Store  
**Category:** Frontend Component (Module)  
**Owner:** Frontend  
**Lifecycle:** Persistent

### Responsibility
Hold local UI state:
- current snapshot id + version
- scroll/focus state
- input draft buffer
- pending hold state (if present)

### Forbidden Authority
- Must not treat local state as authoritative truth.
- Must not mutate rendered block text.

## COMP_FRONTEND_INPUT_COMPOSER
**Name:** Input Composer  
**Category:** Frontend Component (Module)  
**Owner:** Frontend  
**Lifecycle:** Persistent

### Responsibility
Collect and package your verbatim input for submission as `SCHEMA_USER_INPUT_1`.

### Forbidden Authority
- Must not paraphrase.
- Must not “helpfully” infer action details.
- Must not restructure the input beyond schema fields.

B) Backend Services and Modules

COMP_BACKEND_API_GATEWAY

Name: API Gateway
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Transport + routing + schema validation at ingress/egress.
	•	Terminates HTTP + WS.
	•	Validates schemas.
	•	Routes to internal services.

In-scope duties
	•	Route /v1/bootstrap to Session Service
	•	Route /v1/input to User Input Service
	•	Route /v1/session/snapshot to Sync Service
	•	Route WS messages to Sync Service

Out-of-scope duties
	•	Business logic
	•	Simulation decisions
	•	Rendering decisions
	•	Any auth/identity work

Authority Domain
	•	Decides: only “valid/invalid schema” and routing path.
	•	Transforms: transport envelopes only.
	•	Formats/Renders: none.

Forbidden Authority
	•	No authentication/authorization.
	•	No paraphrasing user input.
	•	No “helpful defaults” for missing fields.

Inputs
	•	HTTP/WS requests from frontends.

Outputs
	•	Routed internal requests and returned responses.

⸻

COMP_BACKEND_SCHEMA_VALIDATOR

Name: Schema Validator
Category: Backend Module (in-process)
Owner: Backend
Lifecycle: Persistent

Responsibility

Validate every boundary message against schema registry.

Authority Domain
	•	Decides: valid/invalid only.

Forbidden Authority
	•	Must not add missing fields.
	•	Must not guess values.

⸻

COMP_BACKEND_SESSION_SERVICE

Name: Session Service (Single Participant)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Bootstrap into the present and attach devices to the single ongoing session.
	•	There is one session lineage.
	•	Devices attach; there is no “user identity”.

In-scope duties
	•	Create WORLD_SINGLETON if it does not exist (first boot only).
	•	Create ROOT_SESSION if it does not exist (first boot only).
	•	Attach device to session (session_devices).
	•	Return WS URL and canonical present snapshot pointer.

Out-of-scope duties
	•	Any auth/token issuance.
	•	Any world simulation.
	•	Any rendering.

Authority Domain
	•	Decides: whether the singleton + root session exist; if not, initializes them.
	•	Selects/Filters: none.
	•	Transforms: none.
	•	Formats/Renders: none.

Forbidden Authority
	•	Must not create a second world.
	•	Must not start a new timeline.
	•	Must not reset tick pointers.

Inputs
	•	SCHEMA_BOOTSTRAP_REQUEST_1 from Gateway.

Outputs
	•	SCHEMA_BOOTSTRAP_RESPONSE_1 to Gateway.
	•	SCHEMA_UI_SNAPSHOT_REQUEST_1 to Sync Service (internal call).

State and Storage
	•	Owns: DB_PRIMARY.world_singleton, DB_PRIMARY.sessions, DB_PRIMARY.session_devices.

Illegal States (Design-Time Only)
	•	More than one row in world_singleton.
	•	More than one “root session” row (defined by invariant below).
	•	Any session row that points to a non-existent world_singleton.

⸻

COMP_BACKEND_SYNC_SERVICE

Name: Sync Service (Canonical UI State)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Maintain and broadcast the canonical UI snapshot for the present.
	•	UI snapshot is truth for “what you see”.
	•	Supports device switching and multi-device attachment.

In-scope duties
	•	Persist canonical UI snapshots (append-only snapshots, monotonic version).
	•	Broadcast snapshots/deltas over WS.
	•	Receive UI events (scroll/focus/draft) and persist viewer continuity fields.

Out-of-scope duties
	•	Simulation
	•	Rendering
	•	Editing narrative text

Authority Domain
	•	Decides: snapshot versioning and delta emission only.
	•	Transforms: snapshot → delta encoding only (via delta engine).
	•	Formats/Renders: none.

Forbidden Authority
	•	Must not rewrite rendered block text.
	•	Must not invent blocks.
	•	Must not “helpfully” nudge or insert meta narration.

Inputs
	•	SCHEMA_UI_EVENT_1, SCHEMA_UI_ACK_1, SCHEMA_SESSION_PING_1 (from Gateway via WS)
	•	SCHEMA_RENDERED_BLOCKS_1 (from Renderer Service)
	•	SCHEMA_UI_SNAPSHOT_REQUEST_1 (from Session Service or HTTP snapshot endpoint)

Outputs
	•	SCHEMA_UI_SNAPSHOT_1 and SCHEMA_UI_DELTA_1 to WS channel
	•	SCHEMA_SESSION_STATE_1 to WS channel

State and Storage
	•	Owns: DB_PRIMARY.ui_sessions, DB_PRIMARY.ui_snapshots, Redis fast-resume keys.

Illegal States
	•	UI snapshot version decreases.
	•	Delta does not apply cleanly to produce next snapshot.

⸻

COMP_BACKEND_UI_DELTA_ENGINE

Name: UI Delta Engine
Category: Backend Module (in-process)
Owner: Backend
Lifecycle: Persistent

Responsibility

Compute deterministic UI deltas from snapshots.

Forbidden Authority
	•	Must not alter block text.

⸻

COMP_BACKEND_CONTINUITY_ANCHOR_ENGINE

Name: Continuity Anchor Engine
Category: Backend Module (in-process)
Owner: Backend
Lifecycle: Persistent

Responsibility

Generate stable anchors (scroll/focus) tied to rendered blocks.

Forbidden Authority
	•	Must not edit narrative text.

⸻

COMP_BACKEND_USER_INPUT_SERVICE

Name: User Input Service (Verbatim)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Accept and persist user input verbatim as timeline material.

Authority Domain
	•	Decides: accept/reject based on schema + session existence only.

Forbidden Authority
	•	Must not paraphrase.
	•	Must not infer intent/emotion.
	•	Must not invent “what you did”.

Inputs
	•	SCHEMA_USER_INPUT_1

Outputs
	•	SCHEMA_USER_INPUT_ACCEPTED_1 to Tick Service and Sync Service

State and Storage
	•	Owns: DB_PRIMARY.user_inputs (append-only).

⸻

COMP_BACKEND_TICK_SERVICE

Name: Tick Service (Monotonic Present)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Advance the single present forward by one tick, producing a committed event batch and requesting rendering.

In-scope duties
	•	Create next tick id (monotonic).
	•	Call World Service, Interaction Engine, Perception Filter, Scene Continuity, Envelope Assembler, Renderer.
	•	Commit event history.
	•	Update session present pointer (sessions.current_tick_id) forward only.

Forbidden Authority
	•	Must not set tick pointer backward.
	•	Must not “re-run” older ticks as present.
	•	Must not render prose itself.

Inputs
	•	SCHEMA_TICK_TRIGGER_1 (from Sync Service and/or User Input accepted)

Outputs
	•	World tick request, interaction request, envelope request, commit batch

State and Storage
	•	Owns: DB_PRIMARY.ticks
	•	Writes forward-only DB_PRIMARY.sessions.current_tick_id

Illegal States
	•	Tick id repeats or decreases.
	•	Any commit references a future tick that does not exist.

⸻

COMP_BACKEND_WORLD_SERVICE

Name: World Service (Single World Truth)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Maintain world truth for the single world instance.

Forbidden Authority
	•	Must not create additional worlds.
	•	Must not produce narrative prose.

Inputs
	•	SCHEMA_WORLD_TICK_REQUEST_1

Outputs
	•	SCHEMA_WORLD_SLICE_1 to Interaction Engine and Envelope Assembler (via assembler request).

State and Storage
	•	Owns world tables (declared in Entities).

⸻

COMP_BACKEND_AGENT_STATE_SERVICE

Name: Agent State Service
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Persist and serve agent state snapshots.

Forbidden Authority
	•	Must not render prose.
	•	Must not invent user actions.

⸻

COMP_BACKEND_AGENT_ENGINE

Name: Agent Engine (Cognition Candidates)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Given world slice + agent state + memory, produce action/speech candidates for that agent.

Forbidden Authority
	•	Must not render prose.
	•	Must not decide global interaction ordering.

⸻

COMP_BACKEND_INTERACTION_ENGINE

Name: Interaction Engine (Social Flow)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Resolve interaction events for the moment:
	•	who speaks
	•	turn-taking / overlaps
	•	addressing
	•	holds (when user choice is needed)

Forbidden Authority
	•	Must not invent user actions.
	•	Must not render prose.

⸻

COMP_BACKEND_PERCEPTION_FILTER

Name: Perception Filter
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Determine which events are perceivable and how (audibility/visibility constraints).

Forbidden Authority
	•	Must not add “you notice” prose.
	•	Must not render.

⸻

COMP_BACKEND_SCENE_CONTINUITY_SERVICE

Name: Scene Continuity Service
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Maintain scene-local established facts and active threads to prevent contradictions.

Forbidden Authority
	•	Must not invent facts.
	•	Must not render prose.

⸻

COMP_BACKEND_ENVELOPE_ASSEMBLER

Name: Envelope Assembler
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Assemble the total renderer envelope for Venice, from:
	•	perceivable events
	•	world slice
	•	scene continuity
	•	tick context

Forbidden Authority
	•	Must not bias content (“be nice”, “reward user”, etc.).
	•	Must not invent events.

⸻

COMP_BACKEND_RENDERER_SERVICE

Name: Renderer Service (Venice Adapter)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Call Venice with SCHEMA_RENDERER_ENVELOPE_1 and return rendered blocks.

Forbidden Authority
	•	Must not alter envelope content.
	•	Must not invent events or facts.

⸻

COMP_LLM_VENICE_RENDERER

Name: Venice Renderer
Category: LLM
Owner: Renderer
Lifecycle: External

Responsibility

Render prose from the envelope only.

Forbidden Authority
	•	Must not invent events not present in envelope.
	•	Must not invent user actions.
	•	Must not introduce meta-system commentary.

⸻

COMP_BACKEND_EVENT_HISTORY_SERVICE

Name: Event History Service (Append-Only)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Persist event batches and events as immutable record.

Forbidden Authority
	•	Must not edit history.
	•	Must not enable replay/relive.

⸻

COMP_BACKEND_EMBEDDING_SERVICE

Name: Embedding Service
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Text → vector embeddings.

⸻

COMP_BACKEND_MEMORY_SERVICE

Name: Memory Service (Postgres Truth + Qdrant Similarity)
Category: Backend Service
Owner: Backend
Lifecycle: Persistent

Responsibility

Store and retrieve memory records; write embeddings to Qdrant linked to immutable Postgres ids.

Forbidden Authority
	•	Must not rewrite memory text.
	•	Must not generate narrative.

⸻

C) Data Stores

COMP_DATA_POSTGRES_PRIMARY

Name: Postgres Primary
Category: Data Store
Owner: Infrastructure
Lifecycle: Persistent

COMP_DATA_REDIS_PRIMARY

Name: Redis Primary
Category: Data Store
Owner: Infrastructure
Lifecycle: Persistent

COMP_DATA_QDRANT_PRIMARY

Name: Qdrant Primary
Category: Data Store
Owner: Infrastructure
Lifecycle: Persistent

⸻

D) Entities (Authoritative Storage)

COMP_ENTITY_PG_WORLD_SINGLETON

DB/Table: world_singleton
Purpose: enforce exactly one world instance.

Columns
	•	world_singleton_id TEXT PK NOT NULL (constant value, e.g. "WORLD_SINGLETON")
	•	created_at TIMESTAMPTZ NOT NULL

Invariants
	•	Table contains exactly one row.
	•	world_singleton_id never changes.

Illegal States
	•	second row exists
	•	row missing after initialization

⸻

COMP_ENTITY_PG_SESSIONS

DB/Table: sessions
Purpose: store the single ongoing session lineage and present pointer.

Columns
	•	session_id UUID PK NOT NULL
	•	world_singleton_id TEXT NOT NULL FK world_singleton(world_singleton_id)
	•	current_tick_id BIGINT NOT NULL
	•	created_at TIMESTAMPTZ NOT NULL
	•	updated_at TIMESTAMPTZ NOT NULL

Invariants
	•	There is exactly one “root session” row (enforced by deployment convention + DB uniqueness constraint on world_singleton_id).

Illegal States
	•	session points to non-existent world_singleton
	•	current_tick_id decreases

⸻

COMP_ENTITY_PG_SESSION_DEVICES

DB/Table: session_devices

Columns
	•	session_device_id UUID PK NOT NULL
	•	session_id UUID NOT NULL FK sessions(session_id)
	•	device_fingerprint TEXT NOT NULL
	•	device_type TEXT NOT NULL CHECK in (web,mobile_web)
	•	created_at TIMESTAMPTZ NOT NULL
	•	last_seen_at TIMESTAMPTZ NOT NULL

⸻

COMP_ENTITY_PG_TICKS

DB/Table: ticks

Columns
	•	tick_id BIGINT PK NOT NULL
	•	session_id UUID NOT NULL
	•	server_time TIMESTAMPTZ NOT NULL
	•	trigger_type TEXT NOT NULL
	•	created_at TIMESTAMPTZ NOT NULL

Invariants
	•	tick_id strictly increases.

⸻

COMP_ENTITY_PG_USER_INPUTS

DB/Table: user_inputs

Columns
	•	user_input_id UUID PK NOT NULL
	•	session_id UUID NOT NULL FK sessions(session_id)
	•	tick_id BIGINT NULL
	•	created_at TIMESTAMPTZ NOT NULL
	•	input_text TEXT NOT NULL
	•	input_kind TEXT NOT NULL CHECK in (utterance,action,mixed)
	•	raw_json JSONB NOT NULL

Invariants
	•	append-only, immutable.

⸻

COMP_ENTITY_PG_UI_SESSIONS

DB/Table: ui_sessions

Columns
	•	ui_session_id UUID PK NOT NULL
	•	session_id UUID NOT NULL UNIQUE FK sessions(session_id)
	•	created_at TIMESTAMPTZ NOT NULL
	•	last_snapshot_id UUID NOT NULL
	•	last_version INT NOT NULL

⸻

COMP_ENTITY_PG_UI_SNAPSHOTS

DB/Table: ui_snapshots

Columns
	•	ui_snapshot_id UUID PK NOT NULL
	•	session_id UUID NOT NULL FK sessions(session_id)
	•	tick_id BIGINT NOT NULL
	•	version INT NOT NULL
	•	rendered_blocks_json JSONB NOT NULL
	•	scroll_anchors_json JSONB NOT NULL
	•	focus_state_json JSONB NOT NULL
	•	pending_hold_json JSONB NOT NULL
	•	input_draft_json JSONB NOT NULL
	•	created_at TIMESTAMPTZ NOT NULL

Invariants
	•	version strictly increases per session.

⸻

COMP_ENTITY_PG_EVENT_BATCHES

DB/Table: event_batches

Columns
	•	event_batch_id UUID PK NOT NULL
	•	tick_id BIGINT NOT NULL UNIQUE
	•	session_id UUID NOT NULL
	•	created_at TIMESTAMPTZ NOT NULL

⸻

COMP_ENTITY_PG_EVENTS

DB/Table: events

Columns
	•	event_id UUID PK NOT NULL
	•	event_batch_id UUID NOT NULL FK event_batches(event_batch_id)
	•	event_type TEXT NOT NULL
	•	event_time TIMESTAMPTZ NOT NULL
	•	payload_json JSONB NOT NULL

⸻

COMP_ENTITY_PG_MEMORIES

DB/Table: memories

Columns
	•	memory_id UUID PK NOT NULL
	•	world_singleton_id TEXT NOT NULL
	•	agent_id UUID NULL
	•	created_at TIMESTAMPTZ NOT NULL
	•	source_type TEXT NOT NULL
	•	source_ref TEXT NOT NULL
	•	memory_type TEXT NOT NULL
	•	text TEXT NOT NULL
	•	tags_json JSONB NOT NULL
	•	meta_json JSONB NOT NULL

⸻

COMP_ENTITY_PG_MEMORY_LINKS

DB/Table: memory_links

Columns
	•	memory_id UUID PK NOT NULL FK memories(memory_id)
	•	qdrant_point_id TEXT NOT NULL UNIQUE
	•	embedding_model_id UUID NOT NULL
	•	embedded_at TIMESTAMPTZ NOT NULL

⸻

COMP_ENTITY_PG_EMBEDDING_MODELS

DB/Table: embedding_models

Columns
	•	embedding_model_id UUID PK NOT NULL
	•	name TEXT NOT NULL UNIQUE
	•	vector_dim INT NOT NULL
	•	created_at TIMESTAMPTZ NOT NULL
	•	status TEXT NOT NULL CHECK in (active,retired)

⸻

E) Schema Registry (v1)

(Defined so Map and Registry share the same schema authority. No split.)

SCHEMA_BOOTSTRAP_REQUEST_1

Producer: Frontends
Consumers: API Gateway, Session Service
Required Fields
	•	client_time (timestamptz)
	•	device_fingerprint (text)
	•	device_type (web | mobile_web)
Forbidden Fields
	•	auth tokens, credentials, user_id

SCHEMA_BOOTSTRAP_RESPONSE_1

Producer: Session Service
Consumers: Frontends
Required Fields
	•	session_id (uuid)
	•	world_singleton_id (text constant)
	•	last_tick_id (int)
	•	ws_url (text)
	•	ui_snapshot (SCHEMA_UI_SNAPSHOT_1)
Forbidden Fields
	•	auth fields

SCHEMA_USER_INPUT_1

Required Fields
	•	session_id (uuid)
	•	client_time (timestamptz)
	•	input_text (text; verbatim)
	•	input_kind (utterance | action | mixed)
	•	raw_json (json; present even if empty)

SCHEMA_USER_INPUT_ACCEPTED_1

Required Fields
	•	session_id
	•	user_input_id
	•	server_time

SCHEMA_UI_SNAPSHOT_REQUEST_1

Required Fields
	•	session_id
	•	client_time

SCHEMA_UI_SNAPSHOT_1

Required Fields
	•	ui_snapshot_id
	•	session_id
	•	tick_id
	•	version
	•	rendered_blocks (array; total)
	•	scroll_anchors (object; total)
	•	focus_state (object; total)
	•	pending_hold (object; total)
	•	input_draft (object; total)

SCHEMA_UI_DELTA_1

Required Fields
	•	session_id
	•	base_snapshot_id
	•	next_snapshot_id
	•	ops (array)
	•	version

SCHEMA_UI_EVENT_1

Required Fields
	•	session_id
	•	client_time
	•	event_type
	•	payload (object; total)

SCHEMA_UI_ACK_1

Required Fields
	•	session_id
	•	ui_snapshot_id
	•	client_time

SCHEMA_SESSION_PING_1

Required Fields
	•	session_id
	•	client_time

SCHEMA_SESSION_STATE_1

Required Fields
	•	session_id
	•	connected_devices (array)
	•	server_time
	•	last_tick_id

SCHEMA_TICK_TRIGGER_1

Required Fields
	•	session_id
	•	trigger_type (user_input | background | resume | heartbeat)
	•	server_time
	•	last_known_tick_id

SCHEMA_WORLD_TICK_REQUEST_1

Required Fields
	•	session_id
	•	world_singleton_id
	•	tick_id
	•	server_time

SCHEMA_WORLD_SLICE_1

Required Fields
	•	world_singleton_id
	•	user_location_id
	•	agents_in_scope
	•	objects_in_scope
	•	environment_facts (object; total)
	•	geometry_refs (object; total)
	•	noise_model (object; total)
Forbidden Fields
	•	any narrative prose

SCHEMA_AGENT_STATE_SNAPSHOT_1

Required Fields
	•	agent_id
	•	current_location_id
	•	current_activity
	•	mood_state_json
	•	traits_json
	•	relationships_json
	•	commitments_json
	•	inventory_json
	•	appearance_state_json

SCHEMA_INTERACTION_REQUEST_1

Required Fields
	•	session_id
	•	world_singleton_id
	•	tick_id
	•	world_slice (SCHEMA_WORLD_SLICE_1)
	•	agent_state_snapshots (array of SCHEMA_AGENT_STATE_SNAPSHOT_1)
	•	user_input (SCHEMA_USER_INPUT_1)

SCHEMA_AGENT_COGNITION_REQUEST_1

Required Fields
	•	agent_id
	•	session_id
	•	world_singleton_id
	•	tick_id
	•	world_slice
	•	agent_state
	•	memory_results (SCHEMA_MEMORY_RESULT_1)

SCHEMA_AGENT_ACTION_CANDIDATES_1

Required Fields
	•	agent_id
	•	tick_id
	•	candidates (array; total)

SCHEMA_INTERACTION_EVENTS_1

Required Fields
	•	session_id
	•	tick_id
	•	events (array; total)
	•	hold_state (object; total)

SCHEMA_PERCEIVABLE_EVENTS_1

Required Fields
	•	session_id
	•	tick_id
	•	events (array; each has perceptibility flags)

SCHEMA_SCENE_CONTINUITY_1

Required Fields
	•	scene_id
	•	session_id
	•	established_facts
	•	active_threads
	•	last_tick_id
	•	scene_boundary_conditions

SCHEMA_RENDERER_ENVELOPE_1

Required Fields
	•	session_id
	•	world_singleton_id
	•	tick_id
	•	tick_context
	•	world_slice
	•	perceivable_events
	•	scene_continuity
	•	rendering_ruleset_id
Forbidden Fields
	•	“be nice”, “reward user”, “optimize positivity”

SCHEMA_RENDERED_BLOCKS_1

Required Fields
	•	session_id
	•	tick_id
	•	blocks (array; total)
	•	hold_prompt (object; total)

SCHEMA_MEMORY_QUERY_1

Required Fields
	•	world_singleton_id
	•	agent_id (nullable)
	•	query_text
	•	top_k
	•	filters_json

SCHEMA_MEMORY_RESULT_1

Required Fields
	•	world_singleton_id
	•	agent_id (nullable)
	•	results (array; each includes provenance)

SCHEMA_MEMORY_WRITE_1

Required Fields
	•	world_singleton_id
	•	agent_id (nullable)
	•	source_type
	•	source_ref
	•	memory_type
	•	text
	•	tags_json
	•	meta_json

SCHEMA_EVENT_BATCH_1

Required Fields
	•	event_batch_id
	•	tick_id
	•	session_id
	•	created_at
	•	events (array; total)

## Transport and Infrastructure Schemas (Required for Map Closure)

SCHEMA_SQL_READ_1

Producer: Any backend service performing a Postgres read
Consumers: Postgres (conceptual boundary)
Purpose: Normalized description of a Postgres read boundary operation for map-level rigor.

Required Fields
	•	db (text; must be postgres_primary)
	•	operation (text; must be read)
	•	table (text; table name)
	•	where (json; total; may be {} but must be present)
	•	select (array of text; total; may be ["*"] but must be present)
	•	limit (int; nullable but present)
	•	order_by (array of text; total; may be empty but present)
	•	correlation_id (uuid; used to link to a higher-level request/tick)

Forbidden Fields
	•	narrative prose
	•	“best guess” placeholders that imply missing state is acceptable

Notes
	•	This schema exists to ensure map edges referencing Postgres reads are formally defined. It does not imply SQL is constructed exactly as represented.

⸻

SCHEMA_SQL_WRITE_1

Producer: Any backend service performing a Postgres write
Consumers: Postgres (conceptual boundary)
Purpose: Normalized description of a Postgres write boundary operation for map-level rigor.

Required Fields
	•	db (text; must be postgres_primary)
	•	operation (text; must be one of insert,update,upsert,delete)
	•	table (text; table name)
	•	values (json; total; may be {} but must be present; represents the write payload)
	•	where (json; total; required for update and delete; must be present even if {})
	•	conflict_target (array of text; present even if empty; used for upsert semantics)
	•	correlation_id (uuid)

Forbidden Fields
	•	any mutation of previously committed history that violates append-only invariants
	•	narrative prose

Notes
	•	The legality of a write is constrained by entity invariants and service Forbidden Authority, not by this schema alone.

⸻

SCHEMA_WS_MESSAGES_1

Producer: API Gateway (when routing WS messages internally)
Consumers: Sync Service
Purpose: Standard envelope for any WebSocket message routed through the backend.

Required Fields
	•	session_id (uuid)
	•	device_fingerprint (text; nullable but present)
	•	client_time (timestamptz; nullable but present)
	•	server_time (timestamptz; must be present)
	•	message_type (text; e.g. ui.event, ui.ack, session.ping)
	•	payload (json; total; must be present even if {})
	•	correlation_id (uuid)

Forbidden Fields
	•	auth tokens, credentials, user_id
	•	gateway-added “interpretations” of user state

Notes
	•	The payload must itself validate against the schema implied by message_type (e.g. SCHEMA_UI_EVENT_1).

⸻

SCHEMA_REDIS_WRITE_1

Producer: Any backend service writing Redis
Consumers: Redis (conceptual boundary)
Purpose: Normalized Redis write operation for map closure.

Required Fields
	•	redis (text; must be redis_primary)
	•	operation (text; must be one of set,hset,del,expire)
	•	key (text)
	•	value_json (json; total; must be present; use {} if needed)
	•	ttl_seconds (int; nullable but present)
	•	correlation_id (uuid)

Forbidden Fields
	•	using Redis as authoritative truth for world state or timeline state
	•	narrative prose

Notes
	•	Redis is permitted for caching and continuity acceleration only. Authority remains in Postgres entities declared in the registry.

⸻

SCHEMA_QDRANT_QUERY_1

Producer: Memory Service
Consumers: Qdrant (conceptual boundary)
Purpose: Standard similarity query request for Qdrant.

Required Fields
	•	qdrant (text; must be qdrant_primary)
	•	collection (text)
	•	query_vector (array of float; length must equal model vector_dim)
	•	top_k (int)
	•	filters_json (json; total; must be present; {} allowed)
	•	include_payload (boolean; must be present)
	•	correlation_id (uuid)

Forbidden Fields
	•	narrative prose
	•	requests that attempt to “restore” past world state

⸻

SCHEMA_HISTORY_QUERY_1

Producer: Scene Continuity Service (and only that, unless explicitly expanded later)
Consumers: Event History Service
Purpose: Request immutable history slices strictly for continuity constraint checking.

Required Fields
	•	session_id (uuid)
	•	from_tick_id (bigint)
	•	to_tick_id (bigint)
	•	event_types (array of text; must be present; may be empty meaning “all types”)
	•	max_events (int; nullable but present)
	•	correlation_id (uuid)

Forbidden Fields
	•	any field suggesting “restore”, “rerun”, “replay”, “relive”, “activate”
	•	any instruction to treat returned history as present state

Notes
	•	This schema is explicitly reference-only. It is illegal for any consumer to treat results as present state.

⸻

SCHEMA_HISTORY_RESULT_1

Producer: Event History Service
Consumers: Scene Continuity Service
Purpose: Return immutable history slices as record only.

Required Fields
	•	session_id (uuid)
	•	from_tick_id (bigint)
	•	to_tick_id (bigint)
	•	events (array; total; each element must include:)
	•	tick_id (bigint)
	•	event_id (uuid)
	•	event_type (text)
	•	event_time (timestamptz)
	•	payload_json (json; total)
	•	correlation_id (uuid)

Forbidden Fields
	•	any “present pointer” mutation
	•	any instruction implying re-entry to a past moment

Notes
	•	Returned events are immutable record. Their only permitted use is influence/constraint (e.g., prevent contradictions), never restoration.


⸻

END OF COMPONENTS_REGISTRY.md v2.0
