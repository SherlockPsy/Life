COPILOT WORK ORDER PACKET — MILESTONE 14
Project: SherlockPsy Life
Authority:
- TOTAL_PLAN.md (Execution Canon)
- MASTER_CONSTITUTION.md
- MASTER_INFRASTRUCTURE.md
- MASTER_RUNTIME.md
- MASTER_WORLD.md
- copilot-instructions.md

Milestone Target: M14 — SYSTEM IS PRODUCTION-READY
Scope: This milestone LOCKS behavior. It introduces NO new mechanics. It only enforces final boundaries and removes remaining ambiguity.

======================================================================
0) ABSOLUTE META-CONSTRAINTS (FINAL)
======================================================================

From this milestone onward:

- The system is considered complete.
- No architectural layers may be introduced.
- No new categories of data may be created.
- No new execution models may be added.
- No background behavior may be introduced.
- No performance “optimizations” that alter semantics are permitted.

Copilot MUST treat this milestone as a **lock**, not a build.

======================================================================
1) YOUR TASK (MILESTONE 14 IMPLEMENTATION)
======================================================================

Your task is to ensure the following properties are TRUE IN CODE, not just described:

----------------------------------------------------------------------
A) INVOCATION DISCIPLINE (HARD LOCK)
----------------------------------------------------------------------

- NOTHING happens unless an HTTP invocation occurs.
- No code path may write text except during:
  - POST /say
  - POST /beat
  - POST /world/seed
  - POST /world/person
  - POST /admin/reset
  - archival annotation

- There must be:
  - no background loops
  - no timers
  - no schedulers
  - no async workers that write text independently

If any such mechanism exists, REMOVE IT.

----------------------------------------------------------------------
B) OUTPUT DISCIPLINE (HARD LOCK)
----------------------------------------------------------------------

For every invocation:

- At most ONE perceptible beat may be written.
- A beat is defined as:
  - zero or one public block written by an agent
  - plus zero or more SYSTEM blocks required for causality

- Output length is UNRESTRICTED.
- However:
  - no summaries
  - no future narration
  - no “meanwhile” constructions
  - no multi-scene output

Copilot MUST NOT introduce artificial truncation.
Copilot MUST NOT introduce artificial expansion.

----------------------------------------------------------------------
C) SILENCE IS VALID (HARD LOCK)
----------------------------------------------------------------------

- wrote:false MUST be treated as a successful outcome.
- wrote:false MUST NOT be logged as an error.
- wrote:false MUST NOT trigger retries.
- wrote:false MUST NOT cause follow-up behavior.

Silence is a first-class state.

----------------------------------------------------------------------
D) AGENT SOVEREIGNTY (HARD LOCK)
----------------------------------------------------------------------

- Agents are readers, not functions.
- Agents may:
  - ignore user input
  - change topic
  - initiate speech
  - remain silent

The system MUST NOT:
- force replies
- enforce politeness
- enforce conversational turn-taking
- enforce relevance

----------------------------------------------------------------------
E) WORLD WITHDRAWAL (HARD LOCK)
----------------------------------------------------------------------

- The World may only assert existence.
- After asserting a fact, the World MUST NOT:
  - react
  - comment
  - follow up
  - remember

If any World logic performs reasoning, REMOVE IT.

----------------------------------------------------------------------
F) STORAGE LAW (FINAL)
----------------------------------------------------------------------

- Postgres is the authoritative store.
- All public blocks are append-only.
- All private ledger entries are append-only.
- No row is ever updated.
- No row is ever deleted.

Archival is annotation only.
Reset is new run only.

----------------------------------------------------------------------
G) RETRIEVAL LAW (FINAL)
----------------------------------------------------------------------

- Recent window retrieval remains in force.
- Qdrant selective rereading remains in force.
- Qdrant payloads are never truth.
- Retrieved blocks are fetched verbatim from Postgres.

No summaries.
No compression.
No learned embeddings become state.

----------------------------------------------------------------------
H) CLIENT IGNORANCE (FINAL)
----------------------------------------------------------------------

- Clients are passive observers.
- Reconnecting does NOT advance time.
- Multiple clients do not imply multiple timelines.
- The system does not “wait” for a client.

----------------------------------------------------------------------
I) FRONTEND STATUS (EXPLICIT)
----------------------------------------------------------------------

- A frontend MAY exist.
- A frontend MUST:
  - only call HTTP endpoints
  - never write text directly
  - never invent state

The system MUST function fully with curl alone.

======================================================================
2) REQUIRED VERIFICATION (CURL-ONLY)
======================================================================

You MUST verify, and provide proof commands for, all of the following:

A) Silence does not error
- POST /beat → wrote:false → HTTP 200

B) No background behavior
- Wait without invoking endpoints → no new text appears

C) Reset creates a new run
- After reset → /public/latest returns empty
- Old run remains untouched

D) Archived blocks remain retrievable
- Archived block not in latest
- Archived block resurfaces when semantically relevant

E) Agents can initiate speech
- POST /beat may produce REBECCA text without prior /say

======================================================================
3) DELIVERABLES
======================================================================

You MUST produce:

1) A final commit that:
   - removes dead code
   - removes unused scaffolding
   - removes any future-milestone placeholders

2) A short verification section containing:
   - curl commands only
   - no prose explanation

You MUST NOT produce:
- refactors for elegance
- performance optimizations
- “nice-to-have” changes
- new abstractions

======================================================================
4) FINAL PROHIBITIONS (FOREVER)
======================================================================

From this milestone onward, the following are PERMANENTLY BANNED:

- schedulers
- planners
- game loops
- decay functions
- hidden state
- numeric meters
- decision trees
- goal optimizers
- world simulation
- off-screen evolution

If Copilot introduces any of these, it is WRONG.

======================================================================
5) COMPLETION CONDITION
======================================================================

Milestone 14 is complete when:

- All prior milestones still pass their curl acceptance tests
- No new behavior exists beyond what is specified
- The system behaves as a continuous life, not a machine

END WORK ORDER PACKET — MILESTONE 14