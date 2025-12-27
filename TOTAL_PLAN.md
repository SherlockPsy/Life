TOTAL_PLAN.md
Execution Canons — Authoritative and Binding
Text-only Virtual Life System (Aligned to V6 MASTER_*)

================================================================================
EXECUTION CANON — MILESTONE 0 — THE WORLD CAN EXIST
Status: Binding / Non-negotiable
================================================================================

0. Purpose
A deployed place exists where invocations are possible and nothing about life is implied.

Written text is the only reality.
Written does not mean rendered.
Objective time exists and advances continuously, but time never decides outcomes.
If nothing is written, the authoritative record does not change.

1. Allowed invocations (HTTP surface)
1.1 GET /health

2. Response truth — GET /health
- HTTP 200
- JSON keys:
  - ok: true
  - service_time_utc: string (ISO 8601)
  - version: string (git hash or tag)

3. Behavioural constraints
- /health must not write.
- /health must not read the authoritative record.
- /health must not read private ledgers.
- /health must not generate or rely on summaries.
- /health must not infer or invent facts.

4. Failure posture
4.1 If /health fails:
- HTTP 500
- JSON:
  - ok: false
  - error: "unavailable"

5. Proof by curl
curl -i "$BASE/health"

6. Forbidden forever at this milestone
- No seed data
- No test writes
- No background simulation or hidden state evolution
- No director logic
- No time-driven outcome engine (time is context only)

================================================================================
EXECUTION CANON — MILESTONE 1 — YOU CAN SPEAK TO REBECCA
Status: Binding / Non-negotiable
================================================================================

0. Purpose
A first exchange exists as written public evidence.
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
3.1 The system MUST write a GEORGE public block:
- source = "GEORGE"
- evidence_text = utterance_text

3.2 The system MAY write a REBECCA public block immediately after:
- source = "REBECCA"
- evidence_text = Rebecca’s response

3.3 The system MUST NOT write any other public sources at this milestone.

3.4 Written ≠ rendered (v6):
- This milestone does not require unrendered/private writing.
- This milestone does not forbid it at the constitutional level.
- Implementation MUST follow the Work Order for whether private writing is introduced here.

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

IMPORTANT:
- "wrote" refers to public blocks written in this response.
- Unrendered/private writing (if ever introduced) is not disclosed by this endpoint.

6. Idempotency
- If request_id repeats, return the exact previously stored response.
- Perform no new writes (public or private).

7. Failure posture
7.1 If request invalid:
- HTTP 400
- JSON:
  - wrote: false
  - error: "invalid_request"

7.2 If required GEORGE block fails to write:
- HTTP 500
- wrote: false
- write nothing

7.3 If optional REBECCA block fails after GEORGE succeeds:
- Return only the GEORGE block
- HTTP 200 allowed
- wrote: true

8. Forbidden improvisations
- No system narrator output
- No director logic
- No world facts at this milestone
- No guaranteed future outcomes
- No “in N beats…” countdown hooks
- No summary-as-authority (summaries are permitted by v6 only as non-authoritative reading aids and only when introduced by an explicit milestone/work order)

================================================================================
EXECUTION CANON — MILESTONE 2 — REBECCA CAN SPEAK WITHOUT YOU
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Rebecca may initiate writing without user speech.

Invocation is opportunity, not causation.
Silence is valid.

1. Required invocations
1.1 POST /beat
1.2 GET /public/latest?n=<int>

2. POST /beat request
- Content-Type: application/json
- Body:
  - request_id: string (required)

3. Writing rules
3.1 The system MAY write a REBECCA public block:
- source = "REBECCA"
- evidence_text = Rebecca’s speech/action as text

3.2 The system MAY write no public blocks.

IMPORTANT:
- Silence (no public blocks written) is valid.
- "wrote" refers to public blocks written in this response.

4. Response truth — POST /beat

Outcome A: Rebecca writes
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: chronological array containing:
    - exactly one REBECCA block

Outcome B: Silence (no public blocks)
- HTTP 200
- JSON:
  - wrote: false
  - request_id
  - public_blocks: []

5. Idempotency
- If request_id repeats, return the exact previously stored response.
- Perform no new writes (public or private).

6. Forbidden improvisations
- No system narrator output
- No director logic
- No world facts at this milestone
- No “because time passed, force a response”
- No summary-as-authority (summaries are permitted by v6 only as non-authoritative reading aids and only when introduced by an explicit milestone/work order)

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
2.4 No turn-taking enforcement is permitted.

3. Forbidden improvisations
- No forced pacing
- No director logic
- No “always respond”
- No semantic scheduling as an outcome engine

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
- binding identity text
- recent public window
- immediate user utterance (if any)
- objective time context (context only; never an outcome engine)

3. Writing rules
3.1 No new public text types introduced.
3.2 Written is reality; rendering is projection remains absolute.

4. Forbidden
- No memory beyond window unless explicitly introduced by a later milestone/work order
- No hidden state variables
- No director logic
- No summary-as-authority (summaries are permitted by v6 only as non-authoritative reading aids and only when introduced by an explicit milestone/work order)

================================================================================
EXECUTION CANON — MILESTONE 5 — PRIVATE LEARNING EXISTS
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Agents may write private/unrendered text that is real but not shown.

This enables v6 off-screen developments and private cognition as written reality.

1. Private ledger definition
- Text only
- Owned by one agent only
- Not rendered to the user
- Not returned by any endpoint
- Append-only and immutable
- Timestamped and attributed

2. Writing rules
2.1 Private entries MAY be written on any invocation opportunity, regardless of whether a public block is written.
2.2 Private entries MUST NOT be disclosed by any HTTP response.
2.3 Private entries MUST be append-only. Never edited. Never deleted.
2.4 Private entries MUST NOT be represented as variables, meters, flags, counters, decay, or refresh cycles.

3. Visibility rules
- No HTTP access
- No inference via metadata
- No “private ledger count” exposed
- No “private summary” exposed as authoritative reality

4. Rereading rules
4.1 Only the owning agent may reread their private ledger.

5. Idempotency
- If request_id repeats, return the exact previously stored response.
- Perform no new writes (public or private).

6. Forbidden
- No behavioural meters, flags, counters, decay, refresh cycles
- No director logic
- No summary-as-authority

NOTE ON SUMMARIES:
- V6 allows summaries only as non-authoritative reading aids derived from written text.
- This milestone does not require implementing summaries unless a Work Order explicitly introduces them.

================================================================================
EXECUTION CANON — MILESTONE 6 — PRIVATE LEARNING INFLUENCES SPEECH
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Private/unrendered writing may influence expression without being exposed.

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
- No director logic
- No hidden meters

NOTE ON SUMMARIES:
- Summaries remain non-authoritative reading aids only.
- This milestone does not require implementing summaries unless a Work Order explicitly introduces them.

================================================================================
EXECUTION CANON — MILESTONE 7 — THE WORLD INTRODUCES FACTS (WORLD FACT SEEDS)
Status: Binding / Non-negotiable
================================================================================

0. Purpose
The World may introduce facts without intent, without being a director, and without forcing outcomes.

1. Required invocation
1.1 POST /world/fact

2. Request
- Content-Type: application/json
- Body:
  - fact_text: string (required)
  - request_id: string (required)

3. Writing rules
3.1 The system MUST write a WORLD public block:
- source = "WORLD"
- evidence_text = fact_text

3.2 fact_text MUST obey all of the following:

A) Existence-only
- It asserts existence of external conditions/events only.
- It does not encode “what should happen next.”

B) No internal-state authority
- It must not authoritatively state anyone’s internal experience as a world fact.
  Forbidden examples:
  - “Rebecca misses George.”
  - “George feels anxious.”
  Allowed alternatives:
  - private thought text (unrendered) written as internal experience
  - public evidence written as speech/action (“I miss you.”)

C) No outcome guarantees
- It must not guarantee future outcomes.
  Forbidden examples:
  - “This will lead to an argument.”
  - “She will definitely call later.”

D) The v6 grounding rule (no floating stimuli)
- If the fact introduces a stimulus (doorbell, knock, vibration, notification, email, call), it MUST be grounded in the same writing act by including, at minimum:
  - where it happens (location)
  - what is stimulated (which door/which phone/which device)
  - who can perceive it (or that it is objectively occurring in the space)

  VALID examples:
  - “From the hallway, the flat’s front doorbell rings once.”
  - “George’s phone vibrates on the coffee table beside the TV.”
  - “There’s a knock on the dressing-room door—two quick taps.”

  INVALID examples:
  - “The doorbell rings.”
  - “Someone knocks.”
  - “A phone vibrates.”
  - “An email arrives.”

E) No countdown plotting
- It must not introduce “in N beats/minutes/hours…” countdown hooks unless it is a written real-life commitment (e.g., “Martha said she’d be here at 10:00”).

4. Response truth — POST /world/fact
Outcome: WORLD written
- HTTP 200
- JSON:
  - wrote: true
  - request_id
  - public_blocks: chronological array containing:
    - exactly one WORLD block

5. Idempotency
- If request_id repeats, return the exact previously stored response.
- Perform no new writes (public or private).

6. Forbidden
- No director commentary
- No hidden state updates
- No “plot scheduler”
- No summary-as-authority

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
- Identity is not replaced by summaries.

3. Forbidden
- No identity drift
- No “helpful personality changes”
- No “assistant voice”
- No director logic

================================================================================
EXECUTION CANON — MILESTONE 9 — MULTIPLE THREADS COEXIST
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Life contains many unresolved matters.

1. Definition
Threads are not stored as objects.
Threads exist only as recurring text.

2. Rules
- No labels
- No IDs
- No priority
- No decay
- No “thread manager” component

3. Rereading
Agents may surface any plausible matter from written continuity.

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
- No replacement summaries

================================================================================
EXECUTION CANON — MILESTONE 11 — SHARED KNOWLEDGE EMERGES
Status: Binding / Non-negotiable
================================================================================

0. Purpose
Public text can influence others.

1. Rule
Anything public may be reread and learned.

2. Quirks
Preferences and aversions may be written as standing observations (as text, not variables).

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
- Content-Type: application/json
- Body:
  - run_name: string (required)
  - request_id: string (required)

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
- Archival NEVER replaces history with summaries.

3. Visibility rules (mandatory)
3.1 Default reread window prioritises non-archived.
3.2 Archived blocks MUST remain eligible for retrieval when:
- explicitly referenced by block_id
- explicitly mentioned by an agent
- semantically similar above retrieval threshold
- required for continuity

4. Retrieval rules (mandatory)
4.1 Retrieval returns verbatim authoritative text.
4.2 Archival does not remove reality from the record.

5. Forbidden
- No summary-as-authority
- No “expired” flags
- No hard exclusion from retrieval

Reality may fade from attention.
Reality may not be erased.

================================================================================
EXECUTION CANON — MILESTONE 14 — SYSTEM IS PRODUCTION-READY
Status: Binding / Final
================================================================================

0. Properties (V6-aligned)
- One irreversible timeline (append-only authoritative record)
- Written text is the only reality
- Written does not mean rendered
- Objective time exists and advances continuously, but time is context only (never an outcome engine)
- Off-screen life is narrated, not simulated (becomes real only when written)
- No hidden state (no meters/flags/counters/decay/refresh cycles)
- No director logic (no pacing, no “should happen now”)
- Invocation is opportunity, not causation
- Silence is valid and expected
- Summaries are allowed only as non-authoritative reading aids derived from authoritative text with traceability
- World facts are existence-only, grounded, non-directorial, and non-outcome-forcing

1. Invocation posture
- Invocation is permission.
- Not obligation.

2. Background activity (correct v6 meaning)
2.1 Forbidden background activity:
- Anything that writes text without an invocation opportunity.
- Anything that updates hidden state or variables.
- Anything that advances reality via simulation.

2.2 Allowed opportunity triggers (v6 Runtime alignment):
- The system MAY support content-agnostic opportunity invocations initiated by:
  - time passing, and/or
  - irregular, non-semantic randomness.
- These triggers MUST be:
  - opaque,
  - content-agnostic,
  - non-semantic,
  - non-predictable,
  - non-obligating.
- They MUST NOT:
  - select outcomes,
  - imply something should happen,
  - inspect world content to decide when to invoke.

3. Output discipline
- One invocation → at most one writing opportunity.
- Output length unrestricted.

4. Verification
- curl only
- no UI assumptions

5. Forbidden forever
- semantic schedulers / director schedulers / pacing engines
- fixed-interval “something happens” engines
- planners
- simulation machinery
- optimisation logic
- summary-as-authority
- countdown plotting (“in N beats/minutes…”) unless it is a written real-life commitment

End of document.