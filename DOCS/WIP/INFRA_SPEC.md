# 1 - INFRA_SPEC.md
## VirLife Infrastructure & System Assembly Spec — CANONICAL, COMPLETE, INEVITABLE


## Authority and Precedence

This file is part of the **VirLife Canonical Specification Set**.

**Canonical files (exactly these six):**
1. `LIFE_LAWS.md`
2. `ARBITRATION_LAWS.md`
3. `LIFE_MECHANICS.md`
4. `DRIFT_SPEC.md`
5. `INFRA_SPEC.md`
6. `BUILD_CONTRACT.md`

**Precedence (highest to lowest):**
`LIFE_LAWS` → `ARBITRATION_LAWS` → `LIFE_MECHANICS` → `DRIFT_SPEC` → `INFRA_SPEC` → `BUILD_CONTRACT` → implementation/code.

**Mandatory support files (binding within scope):**
- `PARAMETERS.md` — defines numeric bounds, rates, weights, thresholds, and tuning knobs used by drift/arbitration. It is **binding** wherever referenced. It may not contradict `LIFE_LAWS.md` or `ARBITRATION_LAWS.md`. If a parameter is required and missing/ignored, the implementation is invalid.
- `LAW_MAPPING_INDEX.md` — defines required mappings from mechanics to laws. It is **binding** for review and change control. Any mechanics section or change that lacks mappings is invalid.

**Support-file rule:** Support files are not part of the canonical precedence chain. When a support file conflicts with a canonical file, the canonical file wins. When a canonical file references a support file, that referenced portion is mandatory.


If any statement conflicts with a higher-precedence document, the higher-precedence document wins. Lower-precedence documents must be updated to restore consistency.

---

This document defines:
- what processes exist
- what each process does
- what each process reads/writes
- how services are wired on Railway
- what is stored where
- what constitutes “system time”
- how presence gating is implemented infrastructurally
- minimal operational tests

This document does NOT define:
- life behaviour rules (see LIFE_MECHANICS.md)
- drift computation (see DRIFT_SPEC.md)
- LLM build discipline (see BUILD_CONTRACT.md)

---

## 0) Architectural Non-Negotiables (Infra-Level)

### 0.1 Authority separation
- PostgreSQL: canonical truth
- Redis: queues + locks only
- Vector store: retrieval candidates only
- Renderer output: never truth

### 0.2 Presence-gated system time (infra invariant)
- The system must maintain a **system clock**.
- The system clock advances only when George is present.
- No wall-clock catch-up.
- No background scheduler advancing time while George is absent.

This is enforced in code AND in process responsibilities.

---

## 1) Deployment Model (Railway)

### 1.1 Railway rule
- Repo commit triggers redeploy.
- No complex CI/CD.
- Quality gates are scripts/tests run locally and optionally as Railway build steps, but do not depend on external CI platforms.

### 1.2 Railway resources
- PostgreSQL
- Redis
- Qdrant (or equivalent vector store)

---

## 2) Runtime Processes (Canonical)

The system runs these processes. They may be deployed as separate Railway services or combined, but boundaries must exist as modules.

1) **api**
2) **worker**
3) **renderer**

A separate **scheduler** process is optional, but if used it must obey presence gating and must not advance time by wall-clock.

---

## 3) Process Responsibilities (Non-Ambiguous)

### 3.1 api process
Responsibilities:
- Accept user input (events).
- Expose read endpoints for snapshot and renders.
- Maintain George presence state (enter/exit).
- Enqueue jobs.

Hard prohibitions:
- Must not advance system time by wall-clock.
- Must not run the full moment pipeline inline (except explicit debug endpoints).

Required endpoints (minimum):
- `POST /events` -> enqueue USER_EVENT
- `GET /snapshot` -> current snapshot + system_time
- `GET /renders?since=` -> recent renders
- `POST /presence/enter` -> set presence=true
- `POST /presence/exit` -> set presence=false
- `GET /health`

Presence endpoints are not UI fluff. They are core invariant enforcement.

---

### 3.2 worker process
Responsibilities:
- Consume jobs from Redis.
- Apply a single atomic “Moment” transaction:
  - read system_time and presence
  - if presence=false: do not advance time, do not drift
  - if presence=true: advance time by a configured delta (system delta), then apply drift + intrusions + agent initiation evaluation
  - write ledger
  - write snapshot
  - enqueue render jobs per cadence policy

Hard prohibitions:
- Must not “advance to now” using wall-clock.
- Must not run drift while presence=false.
- Must not write truth into Redis or vector store.
- Must not use renderer output as truth.

---

### 3.3 renderer process
Responsibilities:
- Consume RENDER jobs.
- Load authorised structured inputs (facts, deltas, perceptual frame).
- Call renderer LLM.
- Persist render output.

Hard prohibitions:
- Must not mutate world state.
- Must not infer new facts into Postgres.

---

## 4) System Time (Infra Representation)

### 4.1 system time definition
System time is a timestamp (or monotonic counter) stored in Postgres, e.g. `world_snapshot.time_now`.

### 4.2 presence flag
Presence is stored canonically in Postgres (and may be cached in Redis), e.g. `system_presence` table.

Presence is **authoritative** in Postgres.

### 4.3 time advancement mechanism
Worker advances system time only when:
- presence=true
- and a tick job is processed (or a user event triggers a step)

Time advancement delta is controlled by config:
- `SYSTEM_TICK_SECONDS` (e.g., 1–5 seconds of system time per tick)
This is system time, not wall-clock.

---

## 5) Job Queues (Redis)

Required queues:
- `queue:moments`
- `queue:renders`

Required lock:
- `lock:world_writer` (single-writer world update)

Job types (canonical):
- `USER_EVENT`
- `STEP` (presence-gated time step, not wall-clock tick)
- `RENDER`

There is no required “TICK every second” wall-clock scheduler.
If you implement a scheduler, it may enqueue STEP jobs only when presence=true.

---

## 6) Storage (PostgreSQL Canonical Tables)

Minimum required tables (canonical names allowed to differ, but meanings must match):

### 6.1 `world_snapshot`
- `snapshot_id` (pk)
- `time_now` (system time)
- `state_json` (jsonb) or normalized refs
- `last_event_id` (fk)

### 6.2 `event_ledger` (append-only)
- `event_id` (pk)
- `moment_id` (indexed)
- `time` (system time, indexed)
- `event_type` (indexed)
- `actor_id` (nullable)
- `location_id` (nullable)
- `payload_json` (jsonb)
- `visibility` (public|private|internal)

### 6.3 `system_presence`
- `presence_id` (pk or singleton)
- `is_present` (bool)
- `last_change_time` (system time or wall-clock for audit, but must not drive system time)
- `updated_at` (wall-clock for ops only)

Presence changes must be ledgered.

### 6.4 Additional domain tables
(agents, locations, objects, relationships, commitments, continuity links, knowledge states, renders)
These remain as previously specified, but with the time semantics bound to system time.

---

## 7) Boot Sequence

On new deploy:
1) migrations
2) seed:
   - George agent
   - Rebecca agent
   - initial location(s)
   - initial snapshot with `time_now` set
   - presence set false
3) start api, worker, renderer

---

## 8) “It Works” Acceptance Tests (Infra-Level)

A build is acceptable if:

1) Presence gating works:
   - presence=false -> processing STEP jobs does not change `time_now`
   - presence=true -> processing STEP jobs advances `time_now` by configured delta

2) Ledger invariants:
   - each applied moment writes append-only ledger entries
   - snapshot update is atomic with ledger write

3) Renderer separation:
   - renderer writes output only, no truth mutation

4) Authority separation:
   - no canonical truth stored only in Redis or vector store

---

END OF 1 - INFRA_SPEC.md