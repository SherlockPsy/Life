INFRASTRUCTURE_AND_RUNTIME_CONTRACT.md

Single-Participant · Single-World · Irreversible · No-Auth
Railway · Postgres · Redis · Qdrant

⸻

0. Scope and Authority

This document defines runtime reality, not narrative, not UI, not world logic.

It is authoritative over:
	•	deployment topology
	•	service boundaries
	•	process model
	•	environment variables
	•	startup order
	•	concurrency rules
	•	failure semantics
	•	persistence guarantees

If this document conflicts with:
	•	LIFE_LAWS.md
	•	STATE_SPEC.md
	•	COMPONENTS_REGISTRY.md
	•	Map Schema and Full Map.md

then those documents win.
This document exists to enforce them operationally, not reinterpret them.

⸻

1. Deployment Platform

1.1 Platform
	•	Railway is the sole deployment platform.
	•	No alternative runtime (Docker Compose, Kubernetes, local multi-node assumptions) is allowed to be relied upon.

1.2 Deployment Model
	•	The system is deployed as a single Railway project.
	•	That project contains multiple Railway services, explicitly enumerated below.
	•	No dynamic service creation at runtime is allowed.

⸻

2. Railway Services (Explicit List)

Exactly the following Railway services exist.
If a service is not listed here, it must not be created.

2.1 backend-core

Type: Railway Web Service
Responsibility:
Hosts all backend services and modules defined in COMPONENTS_REGISTRY.md, except external datastores.

This includes:
	•	API Gateway
	•	Session Service
	•	Sync Service
	•	User Input Service
	•	Tick Service
	•	World Service
	•	Interaction Engine
	•	Agent Engine
	•	Agent State Service
	•	Perception Filter
	•	Scene Continuity Service
	•	Envelope Assembler
	•	Renderer Service (Venice adapter)
	•	Event History Service
	•	Memory Service
	•	Embedding Service

Important constraint:
These are logical components, not deployment units.
They are co-resident in this single runtime unless explicitly stated otherwise.

⸻

2.2 postgres-primary

Type: Railway Postgres
Responsibility:
Authoritative persistence for:
	•	world singleton
	•	sessions
	•	ticks
	•	events
	•	UI snapshots
	•	memories

No other Postgres instance exists.

⸻

2.3 redis-primary

Type: Railway Redis
Responsibility:
Non-authoritative cache for:
	•	UI fast resume
	•	scene continuity acceleration
	•	ephemeral anchors

Redis must never be treated as truth.

⸻

2.4 qdrant-primary

Type: Railway Service (Qdrant)
Responsibility:
Vector similarity search for memory retrieval only.

Qdrant must never be used to:
	•	store world truth
	•	store timeline truth
	•	reconstruct present state

⸻

3. Process Model

3.1 Single Process Model
	•	backend-core runs as one process.
	•	There is no internal microservice networking.
	•	Internal boundaries are logical only, enforced by code and schema discipline.

3.2 No Horizontal Scaling Assumptions
	•	The system must function correctly with a single instance.
	•	Horizontal scaling may be added later, but must not be assumed.
	•	No logic may depend on:
	•	leader election
	•	distributed locks
	•	cross-instance consensus

This is not a chat app. Calm down.

⸻

4. Environment Variables (Hard Contract)

The following environment variables must exist at runtime.

If any required variable is missing, the process must fail to start.

4.1 Core
	•	APP_ENV = production | staging | development
	•	APP_BASE_URL = public base URL of the app
	•	SERVER_TIMEZONE = UTC (no other value allowed)

⸻

4.2 Postgres
	•	POSTGRES_HOST
	•	POSTGRES_PORT
	•	POSTGRES_DB
	•	POSTGRES_USER
	•	POSTGRES_PASSWORD

⸻

4.3 Redis
	•	REDIS_HOST
	•	REDIS_PORT
	•	REDIS_PASSWORD (nullable but must exist)

⸻

4.4 Qdrant
	•	QDRANT_HOST
	•	QDRANT_PORT
	•	QDRANT_API_KEY (nullable but must exist)

⸻

4.5 Venice (Renderer)
	•	VENICE_API_BASE_URL
	•	VENICE_API_KEY
	•	VENICE_MODEL_ID

⸻

4.6 Prohibited Environment Variables

The following must not exist:
	•	anything related to auth, users, tokens, sessions by identity
	•	feature flags that alter core laws (single world, no relive, etc.)

If found, the build is invalid.

⸻

5. Startup Sequence (Strict)

Startup order is mandatory.

5.1 Order
	1.	Load environment variables
	2.	Establish Postgres connection
	3.	Establish Redis connection
	4.	Establish Qdrant connection
	5.	Initialize schema validator
	6.	Validate database schema invariants
	7.	Verify world singleton existence
	8.	Verify root session existence
	9.	Start HTTP server
	10.	Start WebSocket server

5.2 World Bootstrap Rule

If and only if:
	•	world_singleton table is empty

Then:
	•	create exactly one world singleton row
	•	record creation time

This must happen once in the system’s lifetime.

⸻

6. Database Enforcement Rules

6.1 Single World Enforcement
	•	world_singleton table must contain exactly one row.
	•	Any attempt to insert a second row must fail.

This is enforced via:
	•	unique constraint
	•	application-level assertion at startup

⸻

6.2 Monotonic Time Enforcement
	•	ticks.tick_id must be strictly increasing.
	•	sessions.current_tick_id must never decrease.

Violations are fatal errors, not recoverable conditions.

⸻

6.3 Append-Only History

The following tables are append-only:
	•	ticks
	•	event_batches
	•	events
	•	user_inputs
	•	memories

No UPDATE or DELETE operations are allowed after insert.

⸻

7. Concurrency Rules

7.1 User Input
	•	Inputs are processed sequentially.
	•	If two devices submit input at the same time:
	•	they are ordered by server receipt time
	•	both are preserved
	•	neither is dropped or merged

7.2 Tick Execution
	•	Only one tick may execute at a time.
	•	Tick execution is serialized.
	•	No overlapping ticks are allowed.

This avoids race conditions without cleverness.

⸻

8. Failure Semantics (No Fallbacks)

8.1 Atomicity

A tick is atomic across:
	•	world update
	•	interaction resolution
	•	event commit
	•	UI snapshot creation

If any step fails:
	•	the tick must not commit
	•	current_tick_id must not advance
	•	no partial UI snapshot may be published

8.2 Renderer Failure

If Venice fails:
	•	the tick does not commit
	•	no placeholder text is allowed
	•	no “retry narrative” is shown

The system waits.

⸻

9. Logging and Observability (Build-Time Only)

9.1 Runtime Behavior
	•	Logs may exist for debugging.
	•	Logs must not:
	•	alter behavior
	•	drive logic
	•	be required for correctness

9.2 No Operational Dashboards

The system must not assume:
	•	human monitoring
	•	dashboards
	•	manual intervention

Correctness is structural.

⸻

10. Forbidden Runtime Behaviors

The following are explicitly forbidden:
	•	creating a second world
	•	resetting time
	•	replaying history as present
	•	inventing user actions
	•	inventing narrative events
	•	silently “helping” missing data
	•	degrading gracefully

If the system cannot proceed correctly, it must not proceed at all.

⸻

END OF INFRASTRUCTURE_AND_RUNTIME_CONTRACT