Map Schema and Full Map.md (v2.0)

Single-Participant · Single-World · Irreversible · No-Auth
Aligned to COMPONENTS_REGISTRY.md v2.0

⸻

Map Rules (Hard)
	1.	If a component is not in COMPONENTS_REGISTRY.md, it does not exist.
	2.	If a schema is not in the Schema Registry, it does not exist.
	3.	Every edge must declare: From, To, Interface, Direction, Schema, Trigger, Ordering.
	4.	No authentication exists: no login, no tokens, no user_id.
	5.	Single world exists: world_singleton_id is constant.
	6.	No relive: no edge may restore or activate past ticks as present.
	7.	No fallbacks: missing required fields is an invalid design.
	8.	Renderer is stupid: it renders only envelope content; it does not invent events or user actions.
	9.	Verbatim user input: your input is stored and forwarded exactly as typed.

⸻

Ordering Classes
	•	STRICT: must occur in the specified sequence; later steps depend on earlier steps.
	•	CAUSAL: must occur after the trigger, but can be async relative to other parallel work.
	•	NONE: independent ordering.

⸻

Edge Entry Fields (fixed order)
	•	Edge ID
	•	Name
	•	From
	•	To
	•	Interface
	•	Direction
	•	Schema
	•	Trigger
	•	Ordering
	•	Completeness Guarantee
	•	Prohibited Leakage Check

⸻

FULL MAP (Edges)

DOMAIN A: BOOTSTRAP INTO THE PRESENT (NO AUTH)

EDGE_BOOT_1
	•	Name: App bootstrap request
	•	From: COMP_FRONTEND_APP_WEB
	•	To: COMP_BACKEND_API_GATEWAY
	•	Interface: COMP_IFACE_HTTP_PUBLIC_API
	•	Direction: REQUEST
	•	Schema: SCHEMA_BOOTSTRAP_REQUEST_1
	•	Trigger: app opened/refreshed
	•	Ordering: NONE
	•	Completeness Guarantee: frontend must always send device_fingerprint, device_type, client_time
	•	Prohibited Leakage Check: no auth fields; no user identity

EDGE_BOOT_2
	•	Name: Bootstrap routed to Session Service
	•	From: COMP_BACKEND_API_GATEWAY
	•	To: COMP_BACKEND_SESSION_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_BOOTSTRAP_REQUEST_1
	•	Trigger: gateway receives /v1/bootstrap
	•	Ordering: CAUSAL
	•	Completeness Guarantee: gateway validates schema; rejects if missing required fields
	•	Prohibited Leakage Check: gateway does not infer intent

EDGE_BOOT_3
	•	Name: Ensure WORLD_SINGLETON exists (first-boot only)
	•	From: COMP_BACKEND_SESSION_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: READ/WRITE
	•	Schema: SCHEMA_SQL_READ_1 / SCHEMA_SQL_WRITE_1
	•	Trigger: bootstrap; singleton check
	•	Ordering: STRICT
	•	Completeness Guarantee: world_singleton table enforces exactly one row; must exist after step
	•	Prohibited Leakage Check: must not create additional world rows

EDGE_BOOT_4
	•	Name: Ensure ROOT session exists (first-boot only)
	•	From: COMP_BACKEND_SESSION_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: READ/WRITE
	•	Schema: SCHEMA_SQL_READ_1 / SCHEMA_SQL_WRITE_1
	•	Trigger: bootstrap; session existence check
	•	Ordering: STRICT
	•	Completeness Guarantee: sessions row must exist and must reference world_singleton_id
	•	Prohibited Leakage Check: must not create new timelines/sessions beyond root convention

EDGE_BOOT_5
	•	Name: Attach device to session
	•	From: COMP_BACKEND_SESSION_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_SQL_WRITE_1
	•	Trigger: bootstrap includes device_fingerprint
	•	Ordering: STRICT
	•	Completeness Guarantee: session_devices requires NOT NULL device fields; enforced by DB
	•	Prohibited Leakage Check: device attachment does not affect simulation

EDGE_BOOT_6
	•	Name: Request canonical UI snapshot
	•	From: COMP_BACKEND_SESSION_SERVICE
	•	To: COMP_BACKEND_SYNC_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_UI_SNAPSHOT_REQUEST_1
	•	Trigger: bootstrap needs current screen state
	•	Ordering: STRICT
	•	Completeness Guarantee: session_id always known from root session resolution
	•	Prohibited Leakage Check: no request for old tick snapshots

EDGE_BOOT_7
	•	Name: Read canonical UI snapshot from Postgres
	•	From: COMP_BACKEND_SYNC_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: READ
	•	Schema: SCHEMA_SQL_READ_1
	•	Trigger: snapshot request
	•	Ordering: STRICT
	•	Completeness Guarantee: ui_sessions points to last_snapshot_id; snapshot exists
	•	Prohibited Leakage Check: no synthetic “best guess” snapshot

EDGE_BOOT_8
	•	Name: Bootstrap response returned
	•	From: COMP_BACKEND_SESSION_SERVICE
	•	To: COMP_BACKEND_API_GATEWAY
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: RESPONSE
	•	Schema: SCHEMA_BOOTSTRAP_RESPONSE_1
	•	Trigger: singleton/session/device attached + snapshot fetched
	•	Ordering: CAUSAL
	•	Completeness Guarantee: response includes session_id, world_singleton_id, last_tick_id, ws_url, ui_snapshot
	•	Prohibited Leakage Check: no auth fields

EDGE_BOOT_9
	•	Name: Bootstrap response delivered to frontend
	•	From: COMP_BACKEND_API_GATEWAY
	•	To: COMP_FRONTEND_APP_WEB
	•	Interface: COMP_IFACE_HTTP_PUBLIC_API
	•	Direction: RESPONSE
	•	Schema: SCHEMA_BOOTSTRAP_RESPONSE_1
	•	Trigger: internal response ready
	•	Ordering: CAUSAL
	•	Completeness Guarantee: ui_snapshot included and total
	•	Prohibited Leakage Check: frontend must not rewrite snapshot content

⸻

DOMAIN B: LIVE WS CONTINUITY (MULTI-DEVICE VIEW, SINGLE SESSION)

EDGE_WS_1
	•	Name: WS connect handshake
	•	From: COMP_FRONTEND_WS_CLIENT
	•	To: COMP_BACKEND_API_GATEWAY
	•	Interface: COMP_IFACE_WS_SESSION_CHANNEL
	•	Direction: REQUEST
	•	Schema: SCHEMA_SESSION_PING_1
	•	Trigger: frontend connects using ws_url
	•	Ordering: NONE
	•	Completeness Guarantee: session_id present; client_time present
	•	Prohibited Leakage Check: no auth tokens

EDGE_WS_2
	•	Name: WS messages routed to Sync Service
	•	From: COMP_BACKEND_API_GATEWAY
	•	To: COMP_BACKEND_SYNC_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: EVENT
	•	Schema: SCHEMA_WS_MESSAGES_1
	•	Trigger: WS message received
	•	Ordering: CAUSAL
	•	Completeness Guarantee: envelope validated by gateway
	•	Prohibited Leakage Check: gateway does not alter semantic content

EDGE_WS_3
	•	Name: Push canonical UI snapshot on connect
	•	From: COMP_BACKEND_SYNC_SERVICE
	•	To: COMP_IFACE_WS_SESSION_CHANNEL
	•	Interface: COMP_IFACE_WS_SESSION_CHANNEL
	•	Direction: EVENT
	•	Schema: SCHEMA_UI_SNAPSHOT_1
	•	Trigger: device connects (or requests snapshot)
	•	Ordering: STRICT
	•	Completeness Guarantee: snapshot is canonical; stored in Postgres
	•	Prohibited Leakage Check: no invented blocks

EDGE_WS_4
	•	Name: Broadcast UI deltas to all connected devices
	•	From: COMP_BACKEND_SYNC_SERVICE
	•	To: COMP_IFACE_WS_SESSION_CHANNEL
	•	Interface: COMP_IFACE_WS_SESSION_CHANNEL
	•	Direction: EVENT
	•	Schema: SCHEMA_UI_DELTA_1
	•	Trigger: new snapshot committed
	•	Ordering: STRICT
	•	Completeness Guarantee: delta deterministic; applies cleanly
	•	Prohibited Leakage Check: delta does not change block text

⸻

DOMAIN C: UI EVENTS (SCROLL/FOCUS/DRAFT)

EDGE_UI_1
	•	Name: Client emits UI event
	•	From: COMP_FRONTEND_STATE_STORE
	•	To: COMP_IFACE_WS_SESSION_CHANNEL
	•	Interface: COMP_IFACE_WS_SESSION_CHANNEL
	•	Direction: EVENT
	•	Schema: SCHEMA_UI_EVENT_1
	•	Trigger: scroll/focus/draft updates
	•	Ordering: NONE
	•	Completeness Guarantee: payload total per event_type
	•	Prohibited Leakage Check: no inferred emotion/intent

EDGE_UI_2
	•	Name: UI event routed to Sync Service
	•	From: COMP_BACKEND_API_GATEWAY
	•	To: COMP_BACKEND_SYNC_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: EVENT
	•	Schema: SCHEMA_UI_EVENT_1
	•	Trigger: WS ui.event received
	•	Ordering: CAUSAL
	•	Completeness Guarantee: validated schema
	•	Prohibited Leakage Check: no rewriting of payload

EDGE_UI_3
	•	Name: Persist viewer continuity state
	•	From: COMP_BACKEND_SYNC_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_SQL_WRITE_1
	•	Trigger: UI continuity needs persistence
	•	Ordering: STRICT
	•	Completeness Guarantee: snapshot fields are NOT NULL JSON; enforced
	•	Prohibited Leakage Check: viewer state does not change world state

EDGE_UI_4
	•	Name: Write fast resume cache
	•	From: COMP_BACKEND_SYNC_SERVICE
	•	To: COMP_DATA_REDIS_PRIMARY
	•	Interface: COMP_IFACE_REDIS_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_REDIS_WRITE_1
	•	Trigger: snapshot committed
	•	Ordering: CAUSAL
	•	Completeness Guarantee: key/value/ttl present
	•	Prohibited Leakage Check: cache not authoritative

⸻

DOMAIN D: USER INPUT (VERBATIM) → TICK TRIGGER

EDGE_INPUT_1
	•	Name: Submit user input
	•	From: COMP_FRONTEND_INPUT_COMPOSER
	•	To: COMP_BACKEND_API_GATEWAY
	•	Interface: COMP_IFACE_HTTP_PUBLIC_API
	•	Direction: REQUEST
	•	Schema: SCHEMA_USER_INPUT_1
	•	Trigger: you submit a message/action
	•	Ordering: NONE
	•	Completeness Guarantee: input_text verbatim; raw_json present; session_id present
	•	Prohibited Leakage Check: no paraphrase

EDGE_INPUT_2
	•	Name: Route to User Input Service
	•	From: COMP_BACKEND_API_GATEWAY
	•	To: COMP_BACKEND_USER_INPUT_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_USER_INPUT_1
	•	Trigger: /v1/input
	•	Ordering: CAUSAL
	•	Completeness Guarantee: gateway schema validation
	•	Prohibited Leakage Check: gateway does not interpret meaning

EDGE_INPUT_3
	•	Name: Persist verbatim user input (append-only)
	•	From: COMP_BACKEND_USER_INPUT_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_SQL_WRITE_1
	•	Trigger: input accepted
	•	Ordering: STRICT
	•	Completeness Guarantee: DB requires NOT NULL input_text/input_kind/raw_json
	•	Prohibited Leakage Check: no edits after write

EDGE_INPUT_4
	•	Name: Emit input accepted event to Tick Service
	•	From: COMP_BACKEND_USER_INPUT_SERVICE
	•	To: COMP_BACKEND_TICK_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: EVENT
	•	Schema: SCHEMA_USER_INPUT_ACCEPTED_1
	•	Trigger: after DB commit
	•	Ordering: CAUSAL
	•	Completeness Guarantee: user_input_id exists
	•	Prohibited Leakage Check: no interpretation included

EDGE_INPUT_5
	•	Name: Notify Sync Service (for immediate UI state)
	•	From: COMP_BACKEND_USER_INPUT_SERVICE
	•	To: COMP_BACKEND_SYNC_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: EVENT
	•	Schema: SCHEMA_USER_INPUT_ACCEPTED_1
	•	Trigger: after DB commit
	•	Ordering: CAUSAL
	•	Completeness Guarantee: same accepted payload
	•	Prohibited Leakage Check: no content rewrite

⸻

DOMAIN E: TICK PIPELINE (SINGLE WORLD, IRREVERSIBLE)

EDGE_TICK_1
	•	Name: Tick trigger
	•	From: COMP_BACKEND_SYNC_SERVICE
	•	To: COMP_BACKEND_TICK_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: EVENT
	•	Schema: SCHEMA_TICK_TRIGGER_1
	•	Trigger: user_input accepted OR background heartbeat
	•	Ordering: CAUSAL
	•	Completeness Guarantee: last_known_tick_id present
	•	Prohibited Leakage Check: trigger contains no desired outcomes

EDGE_TICK_2
	•	Name: Read present pointers (NOW)
	•	From: COMP_BACKEND_TICK_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: READ
	•	Schema: SCHEMA_SQL_READ_1
	•	Trigger: tick begins
	•	Ordering: STRICT
	•	Completeness Guarantee: sessions row exists; current_tick_id present
	•	Prohibited Leakage Check: must not load past tick as present

EDGE_TICK_3
	•	Name: Create next tick (monotonic)
	•	From: COMP_BACKEND_TICK_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_SQL_WRITE_1
	•	Trigger: tick starts
	•	Ordering: STRICT
	•	Completeness Guarantee: tick_id increases; enforced by PK/sequence
	•	Prohibited Leakage Check: no rewinds

EDGE_WORLD_1
	•	Name: World tick request
	•	From: COMP_BACKEND_TICK_SERVICE
	•	To: COMP_BACKEND_WORLD_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_WORLD_TICK_REQUEST_1
	•	Trigger: tick step 1
	•	Ordering: STRICT
	•	Completeness Guarantee: world_singleton_id included
	•	Prohibited Leakage Check: no multiple worlds

EDGE_WORLD_2
	•	Name: World truth read/write
	•	From: COMP_BACKEND_WORLD_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: READ/WRITE
	•	Schema: SCHEMA_SQL_READ_1 / SCHEMA_SQL_WRITE_1
	•	Trigger: world tick request
	•	Ordering: STRICT
	•	Completeness Guarantee: constraints enforce total state
	•	Prohibited Leakage Check: world service does not render

EDGE_WORLD_3
	•	Name: World slice emitted
	•	From: COMP_BACKEND_WORLD_SERVICE
	•	To: COMP_BACKEND_INTERACTION_ENGINE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: RESPONSE
	•	Schema: SCHEMA_WORLD_SLICE_1
	•	Trigger: world tick completes
	•	Ordering: STRICT
	•	Completeness Guarantee: slice total
	•	Prohibited Leakage Check: no narrative prose inside slice

EDGE_INTERACT_1
	•	Name: Interaction request assembled
	•	From: COMP_BACKEND_TICK_SERVICE
	•	To: COMP_BACKEND_INTERACTION_ENGINE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_INTERACTION_REQUEST_1
	•	Trigger: world slice ready + agent states available
	•	Ordering: STRICT
	•	Completeness Guarantee: includes user_input (even if minimal)
	•	Prohibited Leakage Check: tick service does not decide who speaks

EDGE_AGENT_1
	•	Name: Agent cognition call(s)
	•	From: COMP_BACKEND_INTERACTION_ENGINE
	•	To: COMP_BACKEND_AGENT_ENGINE
	•	Interface: COMP_IFACE_INTERNAL_CALL
	•	Direction: REQUEST
	•	Schema: SCHEMA_AGENT_COGNITION_REQUEST_1
	•	Trigger: interaction needs agent candidates
	•	Ordering: STRICT
	•	Completeness Guarantee: memory_results present even if empty
	•	Prohibited Leakage Check: no renderer prose

EDGE_MEMORY_1
	•	Name: Memory query
	•	From: COMP_BACKEND_AGENT_ENGINE
	•	To: COMP_BACKEND_MEMORY_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_MEMORY_QUERY_1
	•	Trigger: cognition needs memories
	•	Ordering: CAUSAL
	•	Completeness Guarantee: query is total
	•	Prohibited Leakage Check: no replay requests

EDGE_MEMORY_2
	•	Name: Qdrant similarity query
	•	From: COMP_BACKEND_MEMORY_SERVICE
	•	To: COMP_DATA_QDRANT_PRIMARY
	•	Interface: COMP_IFACE_QDRANT_PRIMARY
	•	Direction: READ
	•	Schema: SCHEMA_QDRANT_QUERY_1
	•	Trigger: memory retrieval
	•	Ordering: CAUSAL
	•	Completeness Guarantee: query vector + filters total
	•	Prohibited Leakage Check: similarity only

EDGE_MEMORY_3
	•	Name: Memory results returned
	•	From: COMP_BACKEND_MEMORY_SERVICE
	•	To: COMP_BACKEND_AGENT_ENGINE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: RESPONSE
	•	Schema: SCHEMA_MEMORY_RESULT_1
	•	Trigger: query resolved
	•	Ordering: CAUSAL
	•	Completeness Guarantee: provenance included
	•	Prohibited Leakage Check: no “meaning” injection

EDGE_AGENT_2
	•	Name: Agent candidates returned
	•	From: COMP_BACKEND_AGENT_ENGINE
	•	To: COMP_BACKEND_INTERACTION_ENGINE
	•	Interface: COMP_IFACE_INTERNAL_CALL
	•	Direction: RESPONSE
	•	Schema: SCHEMA_AGENT_ACTION_CANDIDATES_1
	•	Trigger: agent cognition completes
	•	Ordering: STRICT
	•	Completeness Guarantee: candidates total
	•	Prohibited Leakage Check: no prose

EDGE_INTERACT_2
	•	Name: Interaction events emitted
	•	From: COMP_BACKEND_INTERACTION_ENGINE
	•	To: COMP_BACKEND_PERCEPTION_FILTER
	•	Interface: COMP_IFACE_INTERNAL_CALL
	•	Direction: EVENT
	•	Schema: SCHEMA_INTERACTION_EVENTS_1
	•	Trigger: social flow resolved
	•	Ordering: STRICT
	•	Completeness Guarantee: ordered event list + hold_state total
	•	Prohibited Leakage Check: no invented user actions

EDGE_PERCEPT_1
	•	Name: Perceivable events produced
	•	From: COMP_BACKEND_PERCEPTION_FILTER
	•	To: COMP_BACKEND_ENVELOPE_ASSEMBLER
	•	Interface: COMP_IFACE_INTERNAL_CALL
	•	Direction: EVENT
	•	Schema: SCHEMA_PERCEIVABLE_EVENTS_1
	•	Trigger: interaction events filtered by perceptibility
	•	Ordering: STRICT
	•	Completeness Guarantee: events have explicit visibility/audibility flags
	•	Prohibited Leakage Check: no “you notice” prose

EDGE_SCENE_1
	•	Name: Scene continuity update
	•	From: COMP_BACKEND_SCENE_CONTINUITY_SERVICE
	•	To: COMP_DATA_REDIS_PRIMARY
	•	Interface: COMP_IFACE_REDIS_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_REDIS_WRITE_1
	•	Trigger: established facts change
	•	Ordering: CAUSAL
	•	Completeness Guarantee: established_facts list present
	•	Prohibited Leakage Check: does not invent facts

EDGE_ENV_1
	•	Name: Envelope assembly request
	•	From: COMP_BACKEND_TICK_SERVICE
	•	To: COMP_BACKEND_ENVELOPE_ASSEMBLER
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_RENDERER_ENVELOPE_1
	•	Trigger: world+interaction+perception+continuity ready
	•	Ordering: STRICT
	•	Completeness Guarantee: envelope assembled from total inputs
	•	Prohibited Leakage Check: no “be nice/reward” directives

EDGE_RENDER_1
	•	Name: Venice render call
	•	From: COMP_BACKEND_RENDERER_SERVICE
	•	To: COMP_LLM_VENICE_RENDERER
	•	Interface: COMP_IFACE_INTERNAL_CALL
	•	Direction: REQUEST
	•	Schema: SCHEMA_RENDERER_ENVELOPE_1
	•	Trigger: envelope ready
	•	Ordering: STRICT
	•	Completeness Guarantee: total envelope
	•	Prohibited Leakage Check: renderer service does not alter envelope

EDGE_RENDER_2
	•	Name: Rendered blocks returned
	•	From: COMP_LLM_VENICE_RENDERER
	•	To: COMP_BACKEND_RENDERER_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_CALL
	•	Direction: RESPONSE
	•	Schema: SCHEMA_RENDERED_BLOCKS_1
	•	Trigger: render completes
	•	Ordering: STRICT
	•	Completeness Guarantee: blocks total
	•	Prohibited Leakage Check: Venice does not invent events, only renders them

EDGE_SYNC_1
	•	Name: Sync receives rendered blocks
	•	From: COMP_BACKEND_RENDERER_SERVICE
	•	To: COMP_BACKEND_SYNC_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: EVENT
	•	Schema: SCHEMA_RENDERED_BLOCKS_1
	•	Trigger: render result available
	•	Ordering: STRICT
	•	Completeness Guarantee: tick_id present
	•	Prohibited Leakage Check: sync does not rewrite blocks

EDGE_SYNC_2
	•	Name: Persist canonical UI snapshot (present view)
	•	From: COMP_BACKEND_SYNC_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_SQL_WRITE_1
	•	Trigger: rendered blocks accepted
	•	Ordering: STRICT
	•	Completeness Guarantee: version monotonic; NOT NULL JSON fields enforced
	•	Prohibited Leakage Check: no retroactive overwrites

EDGE_HISTORY_1
	•	Name: Commit event batch (append-only history)
	•	From: COMP_BACKEND_TICK_SERVICE
	•	To: COMP_BACKEND_EVENT_HISTORY_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: WRITE
	•	Schema: SCHEMA_EVENT_BATCH_1
	•	Trigger: tick commit stage
	•	Ordering: STRICT
	•	Completeness Guarantee: batch total
	•	Prohibited Leakage Check: no edit history; no replay/relive

EDGE_HISTORY_2
	•	Name: Persist event history
	•	From: COMP_BACKEND_EVENT_HISTORY_SERVICE
	•	To: COMP_DATA_POSTGRES_PRIMARY
	•	Interface: COMP_IFACE_POSTGRES_PRIMARY
	•	Direction: WRITE
	•	Schema: SCHEMA_SQL_WRITE_1
	•	Trigger: commit received
	•	Ordering: STRICT
	•	Completeness Guarantee: immutable record
	•	Prohibited Leakage Check: never used to restore past as present

⸻

DOMAIN F: HISTORY IS REFERENCE ONLY (NO RELIVE)

EDGE_HISTORY_REF_1
	•	Name: Continuity history query
	•	From: COMP_BACKEND_SCENE_CONTINUITY_SERVICE
	•	To: COMP_BACKEND_EVENT_HISTORY_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: REQUEST
	•	Schema: SCHEMA_HISTORY_QUERY_1
	•	Trigger: continuity needs last N ticks
	•	Ordering: CAUSAL
	•	Completeness Guarantee: bounded query
	•	Prohibited Leakage Check: query cannot request restore/re-run

EDGE_HISTORY_REF_2
	•	Name: History results returned (record only)
	•	From: COMP_BACKEND_EVENT_HISTORY_SERVICE
	•	To: COMP_BACKEND_SCENE_CONTINUITY_SERVICE
	•	Interface: COMP_IFACE_INTERNAL_RPC
	•	Direction: RESPONSE
	•	Schema: SCHEMA_HISTORY_RESULT_1
	•	Trigger: query resolved
	•	Ordering: CAUSAL
	•	Completeness Guarantee: results total
	•	Prohibited Leakage Check: returned content is not “present state”

⸻

All schemas referenced by this Map are defined in COMPONENTS_REGISTRY.md.

⸻

END OF Map Schema and Full Map.md v2.0