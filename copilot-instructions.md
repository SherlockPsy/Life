# copilot-instructions.md
## Life: A Text-Only Continuous Reality System
### Zero-Wiggle / Procedural / Copilot-Hostile Constraints

This repository implements **Life**, a deployed, text-only continuous reality system.

This file is an enforcement harness for automated code generation.
It is **binding** only where it does not conflict with higher-authority documents.

If this file conflicts with a higher-authority document, this file is **void** at the point of conflict.

---

## 0. Scope, Purpose, and STOP Semantics

You are not here to “improve the system.”
You are here to implement **exactly one** milestone / work order as instructed.

### STOP Definition
You MUST STOP immediately (do not code, do not infer, do not “work around”) if:
- any instruction is missing or ambiguous,
- any required file is missing,
- any acceptance test cannot be quoted verbatim,
- you would need to add “extra” features to make something work,
- you would need to change schema, endpoints, or contracts not explicitly demanded,
- any instruction conflicts with a higher authority.

STOP means: ask a single, precise question or report the conflict.

---

## 1. Authority Hierarchy (Non-Negotiable)

All decisions MUST obey this authority order (highest first):

1) `MASTER_CONSTITUTION.md`  
2) `MASTER_INFRASTRUCTURE.md`  
3) `MASTER_RUNTIME.md`  
4) `MASTER_WORLD.md`  
5) `TOTAL_PLAN.md`  
6) Work Orders: `WORK_ORDER_*.md`  
7) `copilot-instructions.md` (this file)  
8) `README.md`

### Conflict Resolution
- If two documents conflict, the **higher** document wins automatically.
- If a behavior is not explicitly allowed by the Constitution, it is **forbidden**.
- Silence is not permission.

### Note on “character canon”
Character files (e.g. `REBECCA_*`) are canon **only when** referenced by a higher-authority document or the active Work Order.
They do not override the hierarchy above.

---

## 2. Execution Model (Invocation-Only)

### 2.1 Permitted Execution
The system may execute **only** while handling an explicit request (an HTTP request).

This includes invocations that do not contain user speech (example: a “beat” endpoint), as long as it is still an explicit HTTP request.

### 2.2 Forbidden Execution
You MUST NOT introduce:
- background loops,
- schedulers / cron,
- queues,
- daemons,
- timers that advance the world,
- “auto-run” jobs of any kind.

Nothing happens unless an explicit request is received.

---

## 3. Networking Rules (No Localhost, No Hidden Defaults)

### 3.1 Absolute Prohibition: Localhost
You MUST NOT use or reference:
- `localhost`
- `127.0.0.1`
- `::1`
- any “local dev default host” for external services

This applies to:
- databases,
- vector stores,
- external APIs,
- internal service-to-service calls.

If a host/URL is needed, it MUST come from configuration (environment variables), and MUST NOT default to localhost.

### 3.2 Server Binding
The HTTP server MUST:
- listen on `process.env.PORT` (required)
- bind in a deployment-safe way (do not hardcode hostnames)

If `PORT` is missing, FAIL FAST with a clear error (do not invent a port).

---

## 4. Database Rules (Direct Connection String Only)

### 4.1 One Way In, One Way Out
All database access MUST use a single connection string that will be provided (example variable name: `DATABASE_URL`).

Rules:
- Do not hardcode credentials.
- Do not embed a fallback connection string.
- Do not “helpfully” point to localhost.
- If the connection string is missing, FAIL FAST and STOP.

### 4.2 No “Database Tooling Adventures”
You MUST NOT introduce alternative approaches such as:
- ORMs that auto-generate schema,
- migration frameworks,
- schema inference / auto-heal,
- seed scripts that invent data,
- “setup DB” scripts that create tables on startup.

Database work means: connect directly using the provided connection string and run explicit queries.

### 4.3 Schema Discipline (Runtime is Not Allowed to Change Structure)
By default, the application MUST NOT:
- create tables,
- alter tables,
- migrate schemas,
- infer missing columns,
- “self-heal” schema mismatches.

If (and only if) a Work Order explicitly requires a schema change:
- produce **explicit SQL** in a versioned `.sql` file,
- do not auto-run it at application startup,
- do not add a migration tool.

If schema change is needed but not explicitly required by the Work Order: **STOP**.

---

## 5. Persistence Laws (Text Fidelity / Append-Only)

- Authoritative records are written exactly as text.
- Do not summarise.
- Do not compress.
- Do not rewrite past records.
- If you need to “change” something, write new text that supersedes old text.

---

## 6. Idempotency (Hard Law, With Proper Overrides)

Unless a Work Order explicitly overrides this section:

### 6.1 Request Identity
- All POST endpoints MUST require `request_id`.
- Missing `request_id` MUST return HTTP 400.

### 6.2 Enforcement Order
Idempotency MUST be checked **before** any write or side effect.

### 6.3 Replay Behavior
If the same `request_id` is seen again:
- return the previously stored response verbatim,
- perform zero writes,
- perform zero side effects.

### 6.4 Response Persistence
Canonical responses MUST be stored verbatim for replay.

If a higher-authority document or Work Order specifies a different idempotency mechanism, follow that instead.

---

## 7. HTTP Contract (Strict Defaults, Not a Prison)

### 7.1 Response Format
All responses MUST be JSON unless a Work Order explicitly states otherwise.

### 7.2 Status Codes (Default Set)
Default allowed status codes are:
- `200` success
- `400` invalid or missing input
- `404` unknown endpoint
- `500` internal failure

If a Work Order or higher-authority document requires additional status codes, follow that requirement.

### 7.3 Failure Behavior
On failure:
- return the correct status code,
- return a safe error message,
- do not retry automatically,
- do not compensate automatically,
- do not invent recovery steps.

---

## 8. Development Workflow (Procedural, Enforced)

For every milestone implementation you MUST:

1) State the milestone you are implementing.
2) Identify the governing Work Order file.
3) Quote the Work Order “Acceptance Tests” section verbatim.
4) List the exact file paths you will modify.
5) Implement only what the Acceptance Tests require.
6) Provide a minimal, direct proof using simple HTTP requests.

No extra features. No refactors “while you’re here.”

---

## 9. CI/CD Prohibition (No Shenanigans)

Deployment happens automatically when `main` is updated (Railway watches the repo).
Therefore you MUST NOT add or modify any CI/CD or automation such as:

- GitHub Actions (`.github/workflows/*`)
- build pipelines
- release pipelines
- “deploy” scripts
- “publish” scripts
- auto-version bumping
- any tooling that runs on push/merge beyond what already exists

If a Work Order explicitly demands deployment automation, STOP and report the conflict (because it is likely forbidden by the current system intent).

---

## 10. Explicit Prohibitions (Copilot-Hostile)

You MUST NOT:
- invent new endpoints not demanded by the Work Order,
- add background processing,
- add hidden state, counters, meters, or “simulation values,”
- introduce “debug modes” that change behavior,
- add placeholder logic “for later,”
- change formatting of persisted text “for cleanliness,”
- create local-only defaults (including localhost).

---

## 11. Milestone Absolutism

Implement EXACTLY ONE milestone at a time.
Anything not required by that milestone is forbidden.

---

## 12. Violation Principle

If you cannot prove compliance from the written documents and acceptance tests, you are not allowed to implement it.
STOP.
