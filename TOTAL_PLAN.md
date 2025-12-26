TOTAL_PLAN.md
Execution Canons — Authoritative and Binding
Text-only Continuous Life System

================================================================================
EXECUTION CANON — MILESTONE 0 — THE WORLD CAN EXIST
Status: Binding / Non-negotiable
================================================================================

0. Purpose
A deployed place exists where invocations are possible and nothing about life is implied.

Nothing happens. Nothing is assumed. Nothing advances.

1. Allowed invocations (HTTP surface)
1.1 GET /health
- Purpose: confirm reachability only.

2. Response truth
2.1 GET /health
- Must return HTTP 200.
- Must return JSON body with exactly these keys:
  - ok: true
  - service_time_utc: string (ISO 8601)
  - version: string (git commit hash or tag)
- Must NOT include:
  - secrets
  - connection strings
  - internal paths
  - stack traces

3. Writing rules
3.1 No writing is permitted.
- No public blocks.
- No private ledger entries.
- No identity text.
- No world facts.

4. Rereading rules
4.1 No rereading is permitted.
- /health must not access stored text.

5. Failure posture
5.1 If /health fails:
- HTTP 500
- JSON:
  - ok: false
  - error: "unavailable"

6. Proof by curl
curl -i "$BASE/health"

7. Forbidden forever at this milestone
- No seed data
- No test writes
- No background activity
- No implicit time

================================================================================
EXECUTION CANON — MILESTONE 1 — YOU CAN SPEAK TO REBECCA
Status: Binding / Non-negotiable
================================================================================

0. Purpose
A first exchange exists as written public text.
You write. Rebecca may or may not write.

1. Required invocations
1.1 POST /say
1.2 GET /public/latest?n=<int>

2. POST /say request
- Content-Type: application/json
- Body:
  - speaker: string (required). Must equal "GEORGE".
  - addressee: string (required). Must equal "REBECCA".
  - text: string (required).
  - request_id: string (required, unique).

3. GET /public/latest request
- Query:
  - n: integer (required, 1..200).

4. Response truth — POST /say

Outcome A: Rebecca writes
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: array of exactly two blocks, chronological:
    1. GEORGE block
    2. REBECCA block

Outcome B: Rebecca does not write
- HTTP 200
- JSON:
  - wrote: false
  - request_id
  - public_blocks: array of exactly one block (GEORGE)

Each public block contains:
- id: integer
- source: string
- location_token: string
- evidence_text: string
- created_at_utc: ISO 8601 string

5. Response truth — GET /public/latest
- HTTP 200
- JSON:
  - blocks: array ordered OLDEST → NEWEST

6. Writing rules
6.1 Your utterance MUST always be written.
6.2 Rebecca may write 0 or 1 block only.
6.3 No block may ever be updated or deleted.
6.4 Write-before-show is absolute.
6.5 request_id enforces idempotency.

7. Rereading rules
7.1 Rebecca may reread a minimal recent public window.
7.2 No Qdrant retrieval permitted yet.

8. Failure posture
8.1 If GEORGE block fails to write:
- HTTP 500
- wrote: false
- write nothing

8.2 If REBECCA block fails:
- Return only GEORGE block
- wrote: false

9. Forbidden improvisations
- No system narration
- No future writing
- No summaries
- No injected people
- No world facts

================================================================================
EXECUTION CANON — MILESTONE 2 — REBECCA CAN SPEAK WITHOUT YOU
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Rebecca may initiate a beat without user speech.

1. Required invocations
1.1 POST /beat
1.2 GET /public/latest

2. POST /beat request
- Content-Type: application/json
- Body:
  - focus: string (required). Must equal "REBECCA".
  - request_id: string (required).
  - system_direction: string (optional).

3. system_direction rules (binding)
3.1 If system_direction is present:
- It MUST be written as a public block.
- source = "SYSTEM"
- evidence_text = system_direction
3.2 system_direction:
- Is not user speech.
- Is not world intent.
- Must not imply outcomes.
- Exists solely to preserve causality.

4. Response truth — POST /beat

Outcome A: Rebecca writes
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: chronological array containing:
    - optional SYSTEM block
    - exactly one REBECCA block

Outcome B: Rebecca does not write
- HTTP 200
- JSON:
  - wrote: false
  - request_id
  - public_blocks: empty OR containing only SYSTEM block if written

5. Writing rules
5.1 POST /beat must never write a GEORGE block.
5.2 Write-before-show is absolute.
5.3 request_id enforces idempotency.

6. Rereading rules
6.1 Rebecca may reread:
- recent public window
- her private ledger (if any)
6.2 No Qdrant retrieval yet.

7. Forbidden improvisations
- No hidden prompts
- No ghost inputs
- No implicit influence

================================================================================
EXECUTION CANON — MILESTONE 3 — REBECCA DOES NOT WAIT FOR YOU
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Conversation is not turn-based. Silence is valid.

1. Invocation surface
- POST /say
- POST /beat
- GET /public/latest

2. Behavioural constraints
2.1 POST /say does NOT obligate a response.
2.2 POST /say does NOT obligate relevance.
2.3 Rebecca may:
- respond
- redirect
- ignore
- stay silent

3. Writing rules
3.1 No new writing types.
3.2 Silence must return wrote:false.

4. Rereading rules
4.1 Bounded recent public window only.
4.2 No Qdrant retrieval yet.

5. Forbidden improvisations
- No forced replies
- No conversational closure
- No UX-driven responses

================================================================================
EXECUTION CANON — MILESTONE 4 — CONTINUITY FROM RECENT TEXT
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Recent text influences present writing.

1. Rereading contract
1.1 Before Rebecca writes:
- Assemble recent public window
- Bounded by count

LOCKED VALUE:
RECENT_PUBLIC_N = 80 blocks

2. Continuity rule
Rebecca’s writing may depend ONLY on:
- identity text
- recent public window
- immediate user utterance (if any)

3. Writing rules
3.1 No new text types introduced.
3.2 Write-before-show remains absolute.

4. Forbidden
- No memory beyond window
- No summarisation
- No threads as objects

================================================================================
EXECUTION CANON — MILESTONE 5 — PRIVATE LEARNING EXISTS
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Agents may learn privately without display.

1. Private ledger definition
- Text
- One agent only
- Never shown
- Never returned

2. Writing rules
2.1 Private entries MAY be written only when public text is written.
2.2 Private entries MUST NOT be written alone.
2.3 Append-only. Never edited. Never deleted.

3. Visibility rules
- No HTTP access
- No inference via metadata

4. Rereading rules
4.1 Only the owning agent may reread their private ledger.

5. Forbidden
- No summaries
- No tagging
- No importance flags

================================================================================
EXECUTION CANON — MILESTONE 6 — PRIVATE LEARNING INFLUENCES SPEECH
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Private learning may influence expression.

1. Influence rules
1.1 When writing, an agent may reread:
- recent public window
- its private ledger

1.2 Influence must be indirect.
- No quoting private text.
- No explicit “I remember”.

2. Consistency rule
Private influence must not contradict public evidence without intervening cause.

3. Qdrant activation (mandatory)
3.1 Every public block MUST be embedded.
3.2 Embeddings MUST be stored in Qdrant with payload:
- block_id
- source
- location_token
- created_at_utc

3.3 Before writing, the agent MUST retrieve:
- recent window
- top-K semantically similar older blocks

LOCKED VALUE:
TOP_K = 12

3.4 Retrieved blocks MUST be fetched verbatim from Postgres.

4. Forbidden
- No compression
- No summaries
- No global recall

================================================================================
EXECUTION CANON — MILESTONE 7 — THE WORLD INTRODUCES FACTS
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Facts may occur without intent.

1. Required invocation
POST /world/seed

2. Request
- fact_text: string
- request_id: string

3. Writing rules
3.1 Written as public block:
- source = "WORLD"
- evidence_text = fact_text

3.2 fact_text MUST:
- assert existence only
- imply no awareness
- imply no outcome

4. Forbidden
- No reactions
- No follow-up
- No interpretation

================================================================================
EXECUTION CANON — MILESTONE 8 — NEW PEOPLE ENTER LIFE
Status: Binding / Non-negotiable
================================================================================

0. Purpose
New agents appear via text.

1. Invocation
POST /world/person

2. Request
- name: string
- introduction_text: string
- request_id: string

3. Writing rules
3.1 Public block:
- source = "WORLD"
- evidence_text includes name

3.2 Internal linkage:
- personality template reference
- empty private ledger

4. Forbidden
- No backstory
- No auto-dialogue
- No omniscience

================================================================================
EXECUTION CANON — MILESTONE 9 — MULTIPLE THREADS COEXIST
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Life contains many unresolved matters.

1. Definition
Threads are not stored.
Threads exist only as recurring text.

2. Rules
- No labels
- No IDs
- No priority
- No decay

3. Rereading
Agents may surface any plausible matter.

================================================================================
EXECUTION CANON — MILESTONE 10 — PEOPLE CHANGE OVER TIME
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Agents evolve.

1. Change rule
Change is additive only.
Written as new private text.

2. No overwrites
- No updated profiles
- No versioning

================================================================================
EXECUTION CANON — MILESTONE 11 — SHARED KNOWLEDGE EMERGES
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Public text can influence others.

1. Rule
Anything public may be reread and learned.

2. Quirks
Preferences and aversions may be written as standing observations.

================================================================================
EXECUTION CANON — MILESTONE 12 — RESET VIA NEW RUN
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Enable iterative testing and development without erasing reality.

Reset does NOT delete text.
Reset creates a new, empty run.

Past runs persist indefinitely but are no longer active.

1. Definitions

1.1 Run
A Run is a named, isolated timeline namespace.
Each Run has:
- its own public evidence stream
- its own private ledgers
- its own identities as they evolve within that run

1.2 Active Run
Exactly one Run is active at any time.
All writes and reads apply only to the active Run.

2. Invocation

2.1 POST /admin/reset

- Content-Type: application/json
- Body:
  - reason: string (required)
  - request_id: string (required)

3. Writing rules (absolute)

3.1 On reset invocation:
- A new Run MUST be created.
- The new Run MUST start empty:
  - no public blocks
  - no private ledger entries
- Personality templates remain available.
- No text from previous runs is copied forward.

3.2 A public block MUST be written in the OLD run:
- source = "SYSTEM"
- evidence_text = "RESET: new run started. Reason: <reason>"

3.3 No deletion is permitted.
- No public block is deleted.
- No private ledger entry is deleted.
- No identity text is deleted.

4. Rereading rules

4.1 After reset:
- All endpoints read ONLY from the new active Run.
- Previous runs are not reread by default.

4.2 Previous runs:
- Remain persisted.
- Are never implicitly surfaced.
- May be accessed only via explicit administrative inspection (out of scope).

5. Failure posture

5.1 If a new Run cannot be created:
- HTTP 500
- No partial reset
- Active Run remains unchanged

6. Forbidden forever

- No wiping tables
- No truncation
- No deletion-by-reset
- No merging runs
- No “soft delete” flags

Reset is separation, not erasure.

================================================================================
EXECUTION CANON — MILESTONE 13 — ARCHIVAL WITHOUT AMNESIA
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Reduce routine rereading load while preserving the full record of reality.

Archival changes visibility defaults.
Archival never removes truth.

1. Core law

1.1 No deletion ever.
- No public block is deleted.
- No private ledger entry is deleted.
- No identity text is deleted.

2. Archival definition

2.1 Archival is an annotation, not a mutation.

2.2 To archive a block:
- Write a NEW public block with:
  - source = "SYSTEM"
  - evidence_text = 
    "ARCHIVE: block_id=<id> reason=<free text>"

2.3 The archived block:
- Remains immutable.
- Retains its original block_id.
- Retains its embeddings.
- Retains full retrievability.

3. Visibility rules

3.1 Default recent views MAY skip archived blocks.
- GET /public/latest may omit archived blocks by default.

3.2 Archival MUST NOT make a block unreachable.

Archived blocks MUST remain eligible for retrieval when:
- explicitly referenced by block_id
- explicitly mentioned by an agent
- semantically similar above retrieval threshold
- required for continuity by Qdrant retrieval

4. Retrieval rules (mandatory)

4.1 Vector retrieval MUST include archived blocks.
- Archival does NOT remove vectors from Qdrant.
- Archival does NOT exclude blocks from semantic search.

4.2 Post-retrieval filtering:
- Retrieved blocks are fetched verbatim from Postgres.
- Visibility rules are applied AFTER retrieval, not before.

5. Writing discipline

5.1 Archival NEVER rewrites history.
5.2 Archival NEVER summarizes history.
5.3 Archival NEVER replaces rereading judgment with rules.

6. Forbidden forever

- No deletion
- No compaction
- No summarization
- No “expired” flags
- No hard exclusion from retrieval

Reality may fade from attention.
Reality may not be erased.

================================================================================
EXECUTION CANON — MILESTONE 14 — SYSTEM IS PRODUCTION-READY
Status: Binding / Final
================================================================================

0. Properties
- One irreversible timeline
- No background activity
- No hidden state
- Silence is meaningful
- Agents are sovereign readers
- World asserts facts only

1. Invocation posture
- Invocation is permission
- Not obligation

2. Output discipline
- One invocation → at most one beat
- Output length unrestricted

3. Verification
- curl only
- no UI assumptions

4. Forbidden forever
- schedulers
- planners
- simulation machinery
- optimisation logic

End of document.