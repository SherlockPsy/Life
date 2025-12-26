COPILOT WORK ORDER PACKET — MILESTONE 0
Project: SherlockPsy Life
Authority: TOTAL_PLAN.md + MASTER_CONSTITUTION.md + MASTER_INFRASTRUCTURE.md + MASTER_RUNTIME.md + copilot-instructions.md
Milestone Target: M0 — THE WORLD CAN EXIST
Scope: Implement ONLY Milestone 0. Do not implement any other milestone, even partially.

======================================================================
0) ABSOLUTE CONSTRAINTS (DO NOT NEGOTIATE)
======================================================================

A. No local assumptions, ever
- Do NOT assume localhost exists.
- Do NOT add documentation that instructs running locally.
- Do NOT add scripts that require local environment setup.
- Do NOT add “dev mode” workflows.
- Everything must run on Railway in production mode.

B. Verification is curl only
- All verification and acceptance MUST be demonstrable via curl to the deployed domain.
- No browser-only steps.
- No Postman.
- No unit tests required unless explicitly demanded by the milestone (not demanded here).

C. No CI/CD pipelines
- Do NOT add GitHub Actions or any CI workflows.
- Deployment happens only via pushing to main and Railway auto deploy.

D. Data operations
- Do NOT introduce migrations tooling.
- Do NOT add scripts that “initialize” DB.
- This milestone must not require DB access at all.

E. No architectural improvisation
- Do NOT introduce schedulers, timers, ticks, loops, background jobs, queues, cron.
- Do NOT invent state machines, planners, thread managers, “engine” abstractions.
- Implement only what the milestone requires, but do it cleanly and deployably.

F. “Write-before-show” is a global law, but M0 writes nothing
- This milestone MUST NOT write anything anywhere.
- No seed data, no “hello world” evidence blocks.

======================================================================
1) YOUR TASK (MILESTONE 0 IMPLEMENTATION)
======================================================================

Implement a deployed web service that exposes exactly:

GET /health

Required /health response:
- HTTP 200
- JSON body with exactly these keys:
  - ok: true
  - service_time_utc: string (ISO 8601)
  - version: string (git commit hash or tag)

Forbidden in /health response:
- secrets
- connection strings
- internal file paths
- stack traces

Failure mode:
- HTTP 500
- JSON:
  - ok: false
  - error: "unavailable"
- Do NOT leak internal exception detail.

This milestone performs:
- NO DB reads
- NO DB writes
- NO Qdrant calls
- NO LLM calls

======================================================================
2) IMPLEMENTATION RULES (YOU MUST FOLLOW THESE)
======================================================================

A. Use the repo’s existing stack if present.
- First, inspect the repository.
- If a server framework already exists, extend it minimally.
- If no server exists, create one.

B. Railway port handling (hard requirement)
- The service MUST listen on process.env.PORT.
- Do NOT hardcode a port.
- Do NOT require a PORT env var to exist locally.
- If process.env.PORT is missing, choose a safe default ONLY for runtime stability (e.g., 3000) but do not document local usage.

C. Minimal dependencies
- Only add dependencies required to serve HTTP and JSON reliably.
- No extra tooling.

D. Version string
- version MUST be derived from the deployed build environment if available (e.g. a commit SHA env var).
- If Railway/Git environment variable exists, use it.
- If none exist, fall back to "unknown" (string). Do NOT crash.

E. Time string
- service_time_utc must be ISO 8601 UTC time at request handling.

======================================================================
3) REQUIRED OUTPUTS (DELIVERABLES)
======================================================================

You MUST produce:

1) The exact file changes (new files + modified files) needed to run on Railway.
2) A short “How to verify” section consisting ONLY of curl commands (no other tooling).
3) No other documentation, no “future milestones,” no architectural notes.

You MUST NOT output:
- long explanations
- alternative options
- refactors unrelated to /health
- plans for later

======================================================================
4) ACCEPTANCE TESTS (CURL ONLY)
======================================================================

After Railway deploy, the following must work:

Assume:
BASE=https://<RAILWAY_PUBLIC_DOMAIN>

Test 1:
curl -i "$BASE/health"

Expected:
- HTTP 200
- JSON object with keys: ok, service_time_utc, version
- ok must be true
- service_time_utc must parse as ISO 8601
- version is a string

Failure test (simulated by temporarily breaking an internal dependency is NOT required here).
Just ensure internal errors return 500 with:
{ "ok": false, "error": "unavailable" }

======================================================================
5) COMMIT DISCIPLINE
======================================================================

- Commit directly to main.
- Keep the commit focused: M0 /health only.
- Do not bundle future code.

======================================================================
6) START NOW
======================================================================

Step 1: Inspect repo structure.
Step 2: Implement /health endpoint and server start.
Step 3: Ensure it listens on process.env.PORT.
Step 4: Ensure JSON shape matches requirements exactly.
Step 5: Commit and push to main.

END WORK ORDER PACKET — MILESTONE 0