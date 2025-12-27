TOTAL_PLAN.md
Execution Canons — Authoritative and Binding
Text-only Continuous Life System

================================================================================
EXECUTION CANON — MILESTONE 0 — THE WORLD CAN EXIST
Status: Binding / Non-negotiable
================================================================================

0. Purpose
A deployed place exists where invocations are possible and nothing about life is implied.

Nothing is assumed. Nothing becomes real unless it is written.

Objective time exists and advances, but time never decides outcomes.
If nothing is written, the authoritative record does not change.

1. Allowed invocations (HTTP surface)
1.1 GET /health

2. Response truth — GET /health
- HTTP 200
- JSON:
  - ok: true
  - service_time_utc: string (ISO 8601)

3. Behavioural constraints
- /health must not write.
- /health must not read any stored text.
- /health must not access stored text.

4. Failure posture
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
- No background simulation or hidden state evolution
- No time-driven outcome engine (time is context only)

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
  - utterance_text: string (required).
  - request_id: string (required).

3. Writing rules
3.1 The system MUST write a GEORGE block:
- source = "GEORGE"
- evidence_text = utterance_text

3.2 The system MAY write a REBECCA block immediately after:
- source = "REBECCA"
- evidence_text = (Rebecca’s response)

3.3 No other block types may be written at this milestone.

4. Retrieval rules — GET /public/latest
- Returns the most recent public blocks.
- Default n = 20.
- Ordered chronologically.

5. Response truth — POST /say

Outcome A: GEORGE written, REBECCA written
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: chronological array containing:
    - exactly one GEORGE block
    - exactly one REBECCA block

Outcome B: GEORGE written, REBECCA not written
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: chronological array containing:
    - exactly one GEORGE block

6. Idempotency
- If request_id repeats, return the exact previously stored response.
- Perform no new writes.

7. Failure posture
7.1 If request invalid:
- HTTP 400
- JSON:
  - wrote: false
  - error: "invalid_request"

8.2 If GEORGE block fails to write:
- HTTP 500
- wrote: false
- write nothing

8.2 If REBECCA block fails:
- Return only GEORGE block
- wrote: false

9. Forbidden improvisations
- No system narration
- No future writing
- No summaries as authoritative reality (summaries, if present, are non-authoritative reading aids derived from written text)
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
1.2 GET /public/latest?n=<int>

2. POST /beat request
- Content-Type: application/json
- Body:
  - request_id: string (required).

3. Writing rules
3.1 The system MAY write a REBECCA block:
- source = "REBECCA"
- evidence_text = (Rebecca’s speech/action as text)

3.2 The system MAY write nothing.

3.3 No other block types may be written at this milestone.

4. Response truth — POST /beat

Outcome A: Rebecca writes
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: chronological array containing:
    - exactly one REBECCA block

Outcome B: Rebecca does not write
- HTTP 200
- JSON:
  - wrote: false
  - request_id
  - public_blocks: []

5. Idempotency
- If request_id repeats, return the exact previously stored response.
- Perform no new writes.

6. Forbidden improvisations
- No system narration
- No world facts
- No injected people
- No summaries as authoritative reality (summaries, if present, are non-authoritative reading aids derived from written text)

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
2.2 POST /beat does NOT obligate a response.
2.3 Silence MUST be a normal outcome.

3. Forbidden improvisations
- No turn-taking enforcement
- No “always respond”
- No “must progress”

================================================================================
EXECUTION CANON — MILESTONE 4 — MEMORY WINDOW EXISTS
Status: Binding / Non-negotiable
================================================================================

0. Purpose
The system can reread a limited recent public window.

1. Definition
- The “recent window” is the last N public blocks.

LOCKED VALUE:
N = 60

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
- No authorial summarisation used as memory substitution (summaries may exist only as non-authoritative reading aids)
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
- No summaries as authoritative reality (summaries, if present, are non-authoritative reading aids derived from written text)
- No tagging
- No importance flags

================================================================================
EXECUTION CANON — MILESTONE 6 — PRIVATE LEARNING INFLUENCES SPEECH
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Private learning may influence expression.

1. Influence rules
1.1 Private learning MUST NOT be directly exposed.
1.2 Private learning MAY alter:
- tone
- word choice
- topic selection
- boundary decisions

2. Prohibitions
- No “private ledger dump”
- No “explain why” requirement

================================================================================
EXECUTION CANON — MILESTONE 7 — THE WORLD INTRODUCES FACTS
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Facts may occur without intent.

1. Required invocation
1.1 POST /world/fact

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
- No internal state claims
- No guaranteed future outcomes
- No director commentary
- No “in N beats…” countdown hooks

================================================================================
EXECUTION CANON — MILESTONE 8 — IDENTITY TEXT IS BINDING
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Agents exist under binding identity documents.

1. Identity sources
- Identity text is loaded from the repository.
- Identity text is immutable at runtime.

2. Rule
- Identity governs behaviour.
- Identity is not “tuned” by runtime.

3. Forbidden
- No identity drift
- No “helpful personality changes”
- No “assistant voice”

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

A Run is a named, isolated timeline namespace.
Exactly one Run is active at any time.

2. Invocation
POST /reset/run

3. Request
- run_name: string
- request_id: string

4. Rules
- Reset creates a new run_id.
- New run contains no public blocks.
- New run contains no private ledger entries.
- Identity text remains constant.

5. Prohibitions
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
Archival does not erase.

1. Definition
Archival is a visibility classification.
A block may be marked archived.

2. Rules
- No public block is deleted.
- No private ledger entry is deleted.
- No identity text is deleted.

3. Visibility rules (mandatory)
3.1 Default reread window prioritises non-archived.
3.2 Archived blocks MUST remain eligible for retrieval when:
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

5.2 Archival NEVER replaces history with summaries.

5. Forbidden
- No authorial summarization that replaces or alters authoritative text (summaries may exist only as non-authoritative reading aids)
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
- Objective time exists and advances (time is context only; never an outcome engine)
- No background simulation or hidden state evolution
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
- semantic schedulers / director schedulers / fixed-interval “something happens” engines
- planners
- simulation machinery
- optimisation logic

End of document.