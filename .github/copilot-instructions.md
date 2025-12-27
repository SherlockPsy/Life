# .github/copilot-instructions.md

## Life: A Text-Only Continuous Reality System  
### Zero-Wiggle / Procedural / Copilot-Hostile Specification (Canonical)

This repository implements **Life**, a deployed, text-only continuous reality system.

This file is not guidance.  
This file is not preference.  
This file is **binding constraint**.

Any implementation that violates these constraints is **incorrect**, regardless of whether it “works”.

---

## 0. Scope, Purpose, and STOP Semantics

This file exists to constrain:
- human contributors,
- automated code generation systems (including Copilot),
- future refactors,
- “helpful” assumptions.

The goal is not developer productivity.  
The goal is **ontological integrity under deployment**.

If a choice exists between:
- convenience and explicitness,
- flexibility and determinism,
- standard practice and written constraint,

**the written constraint wins.**

### STOP Definition
Whenever this document instructs you to **STOP**, this means:
- do not generate code,
- do not modify existing code,
- do not suggest alternatives,
- do not infer intent,
- wait for explicit clarification.

STOP is not a warning.  
STOP is a hard halt.

---

## 1. Authority Hierarchy (Absolute, No Interpretation)

All instructions MUST be read and applied in the following strict order:

1. **MASTER_CONSTITUTION.md**  
   Defines:
   - what may exist at all,
   - what counts as reality,
   - what is forbidden in principle.

2. **MASTER_RUNTIME.md**  
   Defines:
   - when the system may execute,
   - when output may be produced,
   - when writing is permitted.

3. **MASTER_INFRASTRUCTURE.md**  
   Defines:
   - storage mechanisms,
   - persistence rules,
   - retrieval guarantees.

4. **MASTER_WORLD.md**  
   Defines:
   - world invariants,
   - fact semantics,
   - causal sufficiency requirements.

5. **TOTAL_PLAN.md**  
   Defines:
   - global sequencing,
   - milestone intent (not permission).

6. **characters/rebecca/*.md**  
   Defines:
   - Rebecca’s identity,
   - values,
   - cognitive and behavioral constraints.

7. **Current Work Order**  
   (e.g., `work_orders/WORK_ORDER_M0.md`)

### Conflict Resolution
- If two documents conflict, the **earlier document prevails**.
- If any instruction contradicts a MASTER document:
  - STOP
  - do not implement
  - do not infer
  - do not workaround
- Silence is not permission.
- Absence of prohibition is not allowance.

---

## 2. Ontology (What Exists, What Does Not)

### 2.1 Reality
Reality consists **only** of authoritative written text explicitly stored in PostgreSQL and designated as authoritative by the MASTER documents.

Reality does NOT include:
- source code,
- logs,
- metrics,
- configuration files,
- environment variables,
- in-memory state,
- caches,
- developer intent,
- implied state,
- inferred causality.

If it is not written to PostgreSQL, it does not exist.

### 2.2 Logs
Logs are non-authoritative and ephemeral.

Logs MUST NOT be used as:
- memory,
- coordination mechanisms,
- fallback state,
- sources of truth,
- decision inputs.

Logs exist only for operational visibility.

---

### 2.3 Time
- There is exactly one timeline.
- The timeline advances **only** when new authoritative text is written.
- No request → no writing → no time passage.
- Clock time exists only as metadata attached to written text.

There is no background time.

---

### 2.4 Memory
- Memory equals written text.
- There is no other memory.
- Process memory MUST be treated as erased at the end of every request.

Any reliance on memory across requests is a violation.

---

## 3. Execution Model (Invocation-Only, Exhaustive)

### 3.1 Permitted Execution
The system executes **only** while handling an explicit HTTP request.

### 3.2 Forbidden Execution
The following are categorically forbidden.

This list is **illustrative, not permissive**.  
Any mechanism that achieves the same effect by different means is equally forbidden.

- schedulers
- cron jobs
- queues
- workers
- background loops
- retries
- polling
- listeners
- watchers
- delayed tasks
- self-triggering webhooks
- time-based triggers
- eventual consistency mechanisms
- deferred execution of any kind

If execution occurs without an HTTP request, the implementation is invalid.

---

### 3.3 Invocation Scope
All computation:
- begins at request receipt,
- ends at response completion,
- leaves no residue except explicitly written text.

---

## 4. Rebecca: Agentic Constraints

### 4.1 Nature of Agency
Rebecca is an **agentic decision-maker only within a single invocation**.

This means:
- Rebecca may evaluate written evidence.
- Rebecca may decide whether to write.
- Rebecca may write only what is explicitly permitted.
- Rebecca may choose not to write.

Rebecca is NOT:
- autonomous across time,
- proactive,
- persistent,
- self-scheduling,
- background-aware.

---

### 4.2 Output Constraints
- Rebecca’s output MUST be written text.
- Rebecca MUST NOT:
  - simulate memory,
  - invent internal state,
  - cache decisions,
  - infer facts not written,
  - remember previous invocations except via written text.

---

### 4.3 Output Limits
Unless explicitly overridden by a work order:
- Rebecca may write **at most one** new block per invocation.

Writing more is a violation.

---

### 4.4 Goal Prohibition
The system has no goals beyond those explicitly written.

There is:
- no optimization,
- no learning,
- no self-improvement,
- no adaptation,
- no self-modification,

unless explicitly specified in a governing document.

---

## 5. Runtime Environment (Procedural, Enforced)

### 5.1 Deployment-Only Execution
- The only supported runtime is a deployed HTTP service on Railway.
- Local execution is:
  - unsupported,
  - undocumented,
  - irrelevant to correctness.

Instructions MUST NOT:
- mention localhost,
- mention 127.0.0.1,
- mention dev servers,
- mention staging environments,
- mention local testing.

If an implementation requires local setup, it is incorrect.

---

### 5.2 Environment Variables
Environment variables MAY be used **only** for infrastructure bootstrapping, such as:
- port binding,
- database connection configuration.

Environment variables MUST NEVER:
- represent reality,
- store memory,
- influence decisions beyond infrastructure setup.

---

### 5.3 Port Binding
- The service MUST listen on `process.env.PORT`.
- A fallback to port `3000` MAY exist **only** to prevent runtime crashes.
- This fallback:
  - MUST NOT be documented,
  - MUST NOT be relied upon,
  - MUST NOT be referenced in instructions or examples.

---

## 6. Storage Authority

### 6.1 PostgreSQL Exclusivity
PostgreSQL is the sole authoritative store for:
- world facts,
- agent memory,
- evidence blocks,
- idempotency records,
- canonical responses.

No other store may hold authoritative information.

---

### 6.2 Append-Only Law
- Authoritative text is append-only.
- Mutation or deletion is forbidden unless:
  - explicitly allowed,
  - explicitly requested,
  - explicitly justified by a governing document.

Supersession occurs only by writing new text.

---

### 6.3 Ephemeral Computation
Ephemeral computation:
- may occur during a request,
- must be discarded afterward,
- must never substitute for written authority.

---

## 7. Schema Discipline (Manual, Explicit)

### 7.1 Forbidden
The application MUST NOT:
- create tables,
- alter schemas,
- auto-migrate,
- infer schema structure,
- self-heal schema mismatches.

---

### 7.2 Required Procedure for Schema Changes
If schema changes are required:
- emit explicit SQL,
- version SQL files,
- execute manually,
- document execution order.

No exceptions.

---

### 7.3 SQL Rules
- Parameterized queries only.
- No string interpolation.
- Transactions required for multi-step writes.
- Isolation level MUST preserve idempotency.

ORMs:
- permitted only as query builders,
- forbidden from managing schema or lifecycle.

---

## 8. Idempotency (Hard Law)

### 8.1 Request Identity
- All POST endpoints MUST require `request_id`.
- Missing `request_id` MUST return HTTP 400.
- `request_id` uniqueness is global unless explicitly overridden.

---

### 8.2 Enforcement Order
Idempotency MUST be enforced by:
- checking request identity **before** performing any write or side effect.

Write-first strategies are forbidden.

---

### 8.3 Behavioral Guarantee
For a given `request_id`:
- the first invocation establishes the canonical response,
- all subsequent invocations MUST:
  - return the identical JSON,
  - perform zero writes,
  - perform zero side effects.

---

### 8.4 Response Persistence
- Canonical responses MUST be stored verbatim.
- Stored responses are authoritative text.
- Returning stored responses is not derived state.

Failure to persist responses is a violation.

---

## 9. HTTP Contract (Exact)

### 9.1 Response Format
All responses MUST be JSON.

---

### 9.2 Status Codes
- `200` — success
- `400` — invalid or missing input
- `404` — unknown endpoint
- `500` — internal failure

No additional semantics are permitted.

---

### 9.3 Failure Behavior
On failure:
- return the correct status code,
- return a safe error message,
- do not retry,
- do not compensate,
- do not infer recovery.

---

## 10. World Fact Injection

- World facts enter only via explicit POST endpoints.
- Each fact MUST be causally sufficient.
- No implicit follow-up is permitted.
- The world does not reason.
- The world does not act unless invoked.
- The world does not remember beyond written text.

---

## 11. Development Workflow (Procedural, Enforced)

### 11.1 Vertical Slice Rule
Each milestone is a vertical slice:
- code → deployed → proven.

No partial implementations.

---

### 11.2 Proof of Correctness
Correctness is demonstrated **only** via `curl` commands executed against the deployed service.

- No unit tests.
- No integration tests.
- No test frameworks.
- No mocks.
- No local runners.

If it cannot be proven with `curl`, it does not exist.

---

### 11.3 Negative Proof Requirement
Proof MUST also demonstrate:
- absence of side effects when no request is made,
- absence of background activity.

If background effects cannot be ruled out, the implementation is invalid.

---

### 11.4 CI/CD Prohibition
- No GitHub Actions.
- No CI pipelines.
- No automated checks.
- Deployment occurs only via push to `main` and Railway auto-deploy.

---

## 12. Explicit Prohibitions (Copilot-Hostile)

The following are forbidden.

This list is illustrative, not permissive.

Do NOT:
- invent helper frameworks,
- introduce abstraction layers,
- refactor for elegance,
- generalize for reuse,
- add metrics or summaries,
- add dashboards or admin UIs,
- add debug endpoints,
- implement future milestones,
- prepare for scalability,
- compensate for failures,
- mutate authoritative text.

If you are unsure whether something is allowed, assume it is forbidden.

---

## 13. Milestone Absolutism

The current work order is final and binding.

It defines:
- endpoints,
- schemas,
- SQL,
- request/response formats,
- curl acceptance tests.

Implement:
- exactly what is written,
- exactly once,
- exactly as specified.

Nothing more.  
Nothing less.

---

## 14. Violation Principle

If a choice must be made between:
- convenience and correctness,
- elegance and determinism,
- inference and explicit instruction,

choose correctness, determinism, and explicit instruction.

If the correct choice is unclear, STOP.
