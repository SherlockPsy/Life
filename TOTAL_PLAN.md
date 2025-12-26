EXECUTION CANON — MILESTONE 0 — THE WORLD CAN EXIST
Status: Binding / Non-negotiable

0. Purpose
A deployed place exists where invocations are possible and nothing about life is implied.

1. Allowed invocations (HTTP surface)
1.1 GET /health
- Purpose: confirm reachability only.

2. Response truth
2.1 GET /health
- Must return: HTTP 200
- Must return JSON body with exactly these keys:
  - ok: true
  - service_time_utc: string (ISO 8601)
  - version: string (git commit hash or tag)
- Must NOT include:
  - any secrets
  - any connection strings
  - any internal file paths
  - any stack traces

3. Writing rules (ledger discipline)
3.1 Milestone 0 writes NOTHING
- No public text is written.
- No private text is written.
- No identity text is written.
- No world seed text is written.

4. Rereading rules
4.1 Milestone 0 rereads NOTHING
- /health must not access or require past text.

5. Failure posture
5.1 If /health cannot respond cleanly:
- Must return HTTP 500
- Must return JSON with:
  - ok: false
  - error: "unavailable"
- Must NOT leak any internal error details.

6. Proof by curl (only acceptable verification)
Assume:
- BASE=https://<your-deployed-domain>

6.1 Reachability proof
curl -i "$BASE/health"

Expected:
- HTTP/1.1 200
- JSON contains: ok:true, service_time_utc, version

7. Forbidden improvisations
- No “welcome” text.
- No automatic seed data.
- No “test message” written anywhere.
- No background activity of any kind.

EXECUTION CANON — MILESTONE 1 — YOU CAN SPEAK TO REBECCA
Status: Binding / Non-negotiable

0. Purpose
A first human exchange exists as written public text: you write, Rebecca may write.

1. Required invocations (HTTP surface)
1.1 POST /say
- Purpose: introduce your utterance into public text and permit Rebecca to write one beat (or nothing).

1.2 GET /public/latest?n=<int>
- Purpose: read the most recent public text in strict order.

2. Request truth
2.1 POST /say
- Content-Type: application/json
- Body schema:
  - speaker: string (required). Must equal "GEORGE".
  - addressee: string (required). Must equal "REBECCA".
  - text: string (required). Your message.
  - request_id: string (required). Unique per invocation; used to prevent accidental double-writing.

Notes:
- request_id is not “story state”. It is a network safety key.
- request_id must be treated as a write-once marker only.

2.2 GET /public/latest
- Query:
  - n: integer (required, 1..200)

3. Response truth
3.1 POST /say has only two valid outcomes:

Outcome A: Rebecca writes a beat
- HTTP 200
- JSON body keys:
  - wrote: true
  - request_id: string (echo)
  - public_blocks: array of exactly 2 items, ordered:
    1) your utterance block
    2) Rebecca utterance block
Each block object must contain:
  - id: integer
  - source: string ("GEORGE" or "REBECCA")
  - location_token: string (may be "UNSPECIFIED" at this milestone)
  - evidence_text: string
  - created_at_utc: string (ISO 8601)

Outcome B: no beat is written by Rebecca
- HTTP 200
- JSON body keys:
  - wrote: false
  - request_id: string (echo)
  - public_blocks: array of exactly 1 item (your utterance block)

3.2 GET /public/latest
- HTTP 200
- JSON body:
  - blocks: array (most recent first OR oldest first — pick ONE and lock it here)

LOCKED ORDER RULE:
- blocks MUST be returned OLDEST→NEWEST (chronological). This avoids argument forever.

Each block contains the same fields as above.

4. Writing rules (ledger discipline)
4.1 Write-before-show rule (absolute)
- If any block appears in the HTTP response, that exact text must already be committed to Postgres.

4.2 Public writing requirements
- Your utterance MUST always be written as a public block.
- Rebecca utterance MAY be written (0 or 1), never more than 1.

4.3 No mutation rule
- No public block may ever be updated or deleted.

4.4 Idempotency rule (request_id)
- If POST /say is invoked again with the same request_id:
  - Must return the same response as the first time
  - Must not create additional blocks

5. Rereading rules
5.1 Milestone 1 rereads only what is necessary to speak once.
- Minimum allowed reread: the immediate recent public blocks (implementation choice is allowed).
- No retrieval from Qdrant is permitted/required at this milestone.

6. Failure posture
6.1 If the write of your utterance fails:
- Must return HTTP 500 and wrote:false
- Must write nothing (no partial write).

6.2 If Rebecca writing fails after your utterance is written:
- Must return HTTP 200 with wrote:false and only your block returned.
- No “half” Rebecca block.

7. Proof by curl
Assume:
- BASE=https://<your-deployed-domain>

7.1 Say something
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"We are at a restaurant. How are you?",
    "request_id":"m1-test-0001"
  }'

Expected:
- HTTP 200
- wrote true or false
- public_blocks length 2 or 1 respectively

7.2 Read latest public text
curl -i "$BASE/public/latest?n=10"

Expected:
- HTTP 200
- blocks in chronological order
- includes your utterance block and maybe Rebecca’s beat

8. Forbidden improvisations
- No multi-paragraph “scene”.
- No future writing.
- No summaries of history.
- No “system messages” in-world.
- No auto-injection of other people or world facts.

EXECUTION CANON — MILESTONE 2 — REBECCA CAN SPEAK WITHOUT YOU
Status: Binding / Non-negotiable

0. Purpose
Rebecca can initiate a beat without a user message being introduced at that moment.

1. Required invocations (HTTP surface)
1.1 POST /beat
- Purpose: permit the next beat to be written without user text.

1.2 GET /public/latest?n=<int>
- Carries over unchanged from Milestone 1.

2. Request truth
2.1 POST /beat
- Content-Type: application/json
- Body schema:
  - focus: string (required). Must equal "REBECCA".
  - request_id: string (required). Unique per invocation.
  - prompt: string (optional). If present, it is not “user speech”, it is merely a hint. It is NOT written as public text.

3. Response truth
3.1 POST /beat has only two valid outcomes:

Outcome A: Rebecca writes a beat
- HTTP 200
- JSON:
  - wrote: true
  - request_id: string
  - public_blocks: array of exactly 1 item (Rebecca block)

Outcome B: no beat written
- HTTP 200
- JSON:
  - wrote: false
  - request_id: string
  - public_blocks: empty array

4. Writing rules
4.1 POST /beat must never write a “GEORGE” public block.
4.2 Write-before-show rule remains absolute.
4.3 Idempotency by request_id remains absolute.

5. Rereading rules
5.1 Rebecca may reread a bounded recent public window (implementation choice).
5.2 No Qdrant retrieval is required/permitted at this milestone.

6. Failure posture
6.1 If a beat cannot be written cleanly:
- Must return wrote:false
- Must write nothing.

7. Proof by curl
curl -i -X POST "$BASE/beat" \
  -H "Content-Type: application/json" \
  -d '{
    "focus":"REBECCA",
    "request_id":"m2-test-0001",
    "prompt":""
  }'

Expected:
- HTTP 200
- wrote true or false
- if wrote true: public_blocks[0].source == "REBECCA"

8. Forbidden improvisations
- POST /beat must not fabricate a user message.
- No “because you said earlier…” if it is not supported by recent reread.
- No world facts introduced here (that is Milestone 7).

EXECUTION CANON — MILESTONE 3 — REBECCA DOES NOT WAIT FOR YOU
Status: Binding / Non-negotiable

0. Purpose
The system must stop behaving like “answer-and-close”. Rebecca may ignore, redirect, or stay silent.

1. Required invocations (HTTP surface)
Carries over:
- POST /say
- POST /beat
- GET /public/latest

No new endpoints required.

2. Behavioural constraints (binding)
2.1 Non-obligation rule
- POST /say does NOT obligate Rebecca to respond.
- POST /say does NOT obligate topical relevance.

2.2 Valid outcomes for POST /say at this milestone
- Same as Milestone 1:
  - wrote true (2 blocks) OR wrote false (1 block)
But with an added constraint:
- If wrote true, Rebecca’s block may be:
  - directly responsive
  - deflecting
  - redirecting
  - unrelated (if plausible from reread context)
No special marker is required. It is textual realism.

2.3 Valid outcomes for POST /beat
- Same as Milestone 2.

3. Writing rules
3.1 No new writing types.
3.2 The system must not “force” a reply to satisfy UX.
3.3 Silence is valid and must be representable as wrote:false.

4. Rereading rules
4.1 Rebecca rereads only a bounded recent public window.
4.2 No Qdrant retrieval yet.

5. Proof by curl
5.1 Attempt to force a question
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"Answer me: what is 2+2?",
    "request_id":"m3-test-0001"
  }'

Expected:
- HTTP 200
- wrote true or false
- if wrote true: response is not required to answer; it may deflect or redirect.

6. Forbidden improvisations
- No “closing” phrases that end conversation as a system behaviour.
- No auto-generated next prompt to the user.

EXECUTION CANON — MILESTONE 4 — CONTINUITY FROM RECENT TEXT
Status: Binding / Non-negotiable

0. Purpose
Rebecca’s writing can reflect what happened recently, grounded only in written text.

1. Required invocations (HTTP surface)
Carries over:
- POST /say
- POST /beat
- GET /public/latest

No new endpoints required.

2. Rereading contract (this is the point of the milestone)
2.1 Recent reread window
- Before Rebecca writes a beat, the system must assemble a “recent window” of public blocks.
- The window is bounded by COUNT, not by time.
- LOCKED VALUE: RECENT_PUBLIC_N = 80 blocks
(Reason: not a world meter; it is a context window cap.)

2.2 What “continuity” means (binding)
- Rebecca’s beat must be produced from:
  - her referenced identity text(s)
  - the recent public window
  - (optional) the immediate user utterance in the same invocation (already included if written)
- No other continuity source is permitted.

3. Writing rules
3.1 Nothing new is written beyond the public blocks already defined.
3.2 Write-before-show remains absolute.

4. Proof by curl
4.1 Establish a detail
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"Reminder: tomorrow I pick up my daughter.",
    "request_id":"m4-test-0001"
  }'

4.2 Prompt continuity
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"What’s on tomorrow?",
    "request_id":"m4-test-0002"
  }'

Expected:
- Rebecca may or may not answer, but if she references the earlier detail, it must be because it was in the recent window.

5. Forbidden improvisations
- No “memory” outside the recent window.
- No background summarisation.
- No “thread manager”.

EXECUTION CANON — MILESTONE 5 — PRIVATE LEARNING EXISTS (INVISIBLE)
Status: Binding / Non-negotiable

0. Purpose
Agents may internally register things they learn without those things appearing on screen.

This milestone introduces private text without changing visible behaviour.

1. Required invocations (HTTP surface)
No new invocations.

Carries over unchanged:
- POST /say
- POST /beat
- GET /public/latest

2. New writing domain
2.1 Private Ledger Entries
A private ledger entry is:
- text
- attributed to exactly one agent
- never shown directly
- never returned in any HTTP response

2.2 When private entries MAY be written
During any invocation that produces public text:
- The system MAY also write zero or more private ledger entries
- Each entry must be attributable to a specific agent

Example (non-exhaustive):
- Rebecca learns something about George
- Rebecca notices a pattern
- Rebecca forms or reinforces a disposition

2.3 When private entries MUST NOT be written
- If no public block is written, no private entry may be written
- Private entries must never be written alone

3. Visibility rules
3.1 Private entries:
- MUST NOT appear in:
  - POST /say responses
  - POST /beat responses
  - GET /public/latest
- MUST NOT be inferable by structure, counts, or metadata

4. Writing discipline
4.1 Write-before-show still applies
- If a public block exists, it must be committed before any response
- Private entries must also be committed before response if written

4.2 Append-only rule
- Private entries are append-only
- Never updated
- Never deleted (at this milestone)

5. Rereading rules
5.1 Private rereading is allowed ONLY for the owning agent
- Rebecca may reread Rebecca’s private entries
- George has no access to Rebecca’s private entries

5.2 No cross-agent leakage
- Private text of one agent must never influence another agent’s output unless it later appears publicly

6. Proof by curl
There is no direct curl proof.
Proof is indirect:
- Behaviour must not change observably
- System must remain correct if private writing is disabled

7. Forbidden improvisations
- No “memory summaries”
- No categorisation of private entries
- No flags like “important” or “long-term”
- No querying private entries via HTTP

EXECUTION CANON — MILESTONE 6 — PRIVATE LEARNING INFLUENCES SPEECH
Status: Binding / Non-negotiable

0. Purpose
Private learning can influence what an agent says, without being quoted or exposed.

1. Required invocations (HTTP surface)
No new invocations.

Carries over unchanged.

2. Influence rule (binding)
2.1 When an agent writes a public block:
- The agent MAY reread:
  - recent public window
  - its own private ledger entries

2.2 How influence is allowed
- Influence is indirect and stylistic or dispositional
- Private text must NEVER be quoted verbatim unless it later appeared publicly
- Private text must NEVER be mentioned as “remembering” unless textually plausible

3. Consistency constraint
3.1 If a private entry exists stating a preference or aversion:
- Future public writing MAY reflect it
- But must never contradict public evidence without cause

4. Proof by curl (behavioural)
4.1 Establish a preference
curl -i -X POST "$BASE/say" \
  -H "Content-Type: application/json" \
  -d '{
    "speaker":"GEORGE",
    "addressee":"REBECCA",
    "text":"I really love your calves. They distract me.",
    "request_id":"m6-test-0001"
  }'

Expected:
- Rebecca may react or not
- Private entry MAY be written

4.2 Later tease
curl -i -X POST "$BASE/beat" \
  -H "Content-Type: application/json" \
  -d '{
    "focus":"REBECCA",
    "request_id":"m6-test-0002"
  }'

Expected:
- Rebecca may tease
- Must not explicitly say “I remember you said…”
- Influence must feel natural, not archival

5. Forbidden improvisations
- No explicit “memory recall” narration
- No exposition about private thoughts
- No confidence scores or weights

EXECUTION CANON — MILESTONE 7 — THE WORLD INTRODUCES FACTS
Status: Binding / Non-negotiable

0. Purpose
The world may introduce new facts without awareness or intent.

1. Required invocations (HTTP surface)
1.1 POST /world/seed
- Purpose: introduce a minimal fact into public text.

2. Request truth
2.1 POST /world/seed
- Content-Type: application/json
- Body schema:
  - fact_text: string (required)
  - request_id: string (required)

3. Writing rules
3.1 World fact block
- Written as a public block
- source MUST equal "WORLD"
- evidence_text must be exactly fact_text
- No interpretation, no emotion, no consequence

Examples of valid fact_text:
- "Marcus calls George."
- "It starts raining."
- "A new couple sits at the table nearby."

3.2 Forbidden fact_text
- Anything implying intent, reaction, or outcome
- Anything longer than a single factual assertion

4. Rereading rules
4.1 World facts:
- Exist globally
- Are not automatically reread by agents
- Influence only when encountered through later reread windows

5. Proof by curl
curl -i -X POST "$BASE/world/seed" \
  -H "Content-Type: application/json" \
  -d '{
    "fact_text":"Marcus calls George.",
    "request_id":"m7-test-0001"
  }'

Expected:
- HTTP 200
- public_blocks[0].source == "WORLD"

6. Forbidden improvisations
- No automatic agent response
- No follow-up action
- No interpretation layer

EXECUTION CANON — MILESTONE 8 — NEW PEOPLE CAN ENTER LIFE
Status: Binding / Non-negotiable

0. Purpose
New people can appear as textually defined agents, without global awareness.

1. Required invocations (HTTP surface)
1.1 POST /world/person
- Purpose: introduce a new person into the world.

2. Request truth
2.1 POST /world/person
- Content-Type: application/json
- Body schema:
  - name: string (required)
  - introduction_text: string (required)
  - request_id: string (required)

3. Writing rules
3.1 Introduction block
- Written as a public block
- source MUST equal "WORLD"
- evidence_text MUST include the name verbatim

Example:
"Marcus joins the table. He looks tired."

3.2 Identity linkage
- The system must internally associate this name with:
  - one personality template reference
  - an empty private ledger

No identity exposition is written publicly unless later spoken.

4. Rereading rules
4.1 New agents:
- Do not speak until invoked by:
  - direct address
  - world fact
  - later milestone mechanisms

5. Proof by curl
curl -i -X POST "$BASE/world/person" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Marcus",
    "introduction_text":"Marcus joins the table. He looks annoyed.",
    "request_id":"m8-test-0001"
  }'

6. Forbidden improvisations
- No auto-dialogue
- No backstory dumps
- No omniscient descriptions

EXECUTION CANON — MILESTONE 9 — MULTIPLE THREADS CAN COEXIST
Status: Binding / Non-negotiable

0. Purpose
Life contains concurrent unresolved matters without explicit tracking.

1. Definition (binding)
A “thread” is not a stored object.
A thread exists only as:
- recurring textual reference
- private influence
- public continuity

2. Writing discipline
2.1 No thread labels
- No IDs
- No names
- No categories

2.2 Thread persistence arises from:
- repeated mention
- private reinforcement
- selective rereading

3. Rereading rules
3.1 When an agent writes:
- It may reread:
  - recent public window
  - its private ledger
- It may surface:
  - ongoing matters
  - dormant concerns
  - unrelated topics

3.2 No relevance filtering requirement
- The system must not require relevance
- Plausibility is sufficient

4. Proof by curl (behavioural)
4.1 Introduce multiple matters
- assignment deadline
- upcoming trip
- Marcus conflict

4.2 Later invocation
- Rebecca may bring up any of them
- Or none

No determinism required.

5. Forbidden improvisations
- No “active thread list”
- No prioritisation
- No resolution tracking
- No decay functions

EXECUTION CANON — MILESTONE 10 — PEOPLE CHANGE OVER TIME
Status: Binding / Non-negotiable

0. Purpose
Agents are not static. Their dispositions may evolve through lived text.

This milestone introduces gradual internal change without rewriting the past.

1. Change definition (binding)
Change is represented ONLY by:
- new private ledger entries
- never by editing or removing older ones

There is no “current state”.
There is only accumulated understanding.

2. Writing rules
2.1 When private entries MAY express change
- When an agent reacts differently to a similar situation
- When an agent revises an opinion in public
- When an agent internalises repeated experiences

2.2 How change is written
- As new private text
- In natural language
- Without declaring replacement of prior beliefs

Example (private):
"I used to be rigid about this, but lately I find myself softer."

3. Rereading rules
3.1 When writing, an agent may reread:
- its private ledger in full or in part (bounded by retrieval)
- recent public window

3.2 No resolution requirement
- Contradictory private entries may coexist
- The LLM resolves them implicitly in writing

4. Public consistency constraint
4.1 If an agent publicly contradicts an earlier public claim:
- The contradiction must be plausible given intervening text
- No explicit apology or explanation is required

5. Forbidden improvisations
- No “updated profile”
- No trait overwrites
- No versioning of identity

EXECUTION CANON — MILESTONE 11 — SHARED KNOWLEDGE EMERGES NATURALLY
Status: Binding / Non-negotiable

0. Purpose
What is said publicly can become part of others’ understanding.

1. Knowledge rule (binding)
1.1 Anything written as public text:
- May be reread by any agent later
- May influence their private learning

1.2 Nothing is “automatically known”
- Knowledge spreads only by rereading public text

2. Writing rules
2.1 When an agent rereads public text involving another person:
- It MAY write a private entry about that person

Example:
Rebecca hears Marcus complain publicly → Rebecca privately forms an opinion.

3. Memory distinction
3.1 Quirks vs events
- Quirks (preferences, aversions, habits) are not “events”
- They may be written privately as standing observations

Example:
"Marcus seems to hate being contradicted."

4. Forbidden improvisations
- No explicit “knowledge base”
- No tagging of facts as global truths
- No forced remembrance

EXECUTION CANON — MILESTONE 12 — RESET IS POSSIBLE
Status: Binding / Non-negotiable

0. Purpose
The entire lived history can be discarded safely.

1. Reset definition
A reset means:
- All public evidence blocks are deleted
- All private ledger entries are deleted
- All agent-specific accumulated deltas are deleted
- Identity templates remain available

2. Required invocation
2.1 POST /admin/reset
- Content-Type: application/json
- Body schema:
  - confirm: string (required). Must equal "RESET_ALL_TEXT"
  - request_id: string (required)

3. Response truth
3.1 Successful reset
- HTTP 200
- JSON:
  - reset: true
  - request_id: string
  - timestamp_utc: string

4. Post-reset guarantees
4.1 After reset:
- /public/latest returns empty array
- Agents have no memory of prior runs
- Behaviour is indistinguishable from day zero

5. Forbidden improvisations
- No partial resets
- No migrations
- No archival snapshots

EXECUTION CANON — MILESTONE 13 — PRUNING WITHOUT COMPRESSION
Status: Binding / Non-negotiable

0. Purpose
Old text may be removed without summarising or distorting reality.

1. Pruning definition (binding)
Pruning is deletion of obsolete text.
Pruning is NOT summarisation.

2. Eligible pruning targets
2.1 Public blocks MAY be pruned if:
- They refer to completed, non-recurrent matters
- Their absence does not create contradictions

Example:
"Assignment deadline is Jan 5th" may be removed after submission.

2.2 Replacement rule
If a public block is pruned:
- A new public block MAY exist stating:
  "The assignment was submitted."

No automatic replacement is required.

3. Private pruning
3.1 Private entries MAY be pruned if:
- They refer exclusively to pruned public events
- They are no longer behaviourally relevant

4. Invocation
4.1 POST /admin/prune
- Body schema:
  - scope: "public" | "private" | "both"
  - request_id: string

5. Forbidden improvisations
- No summarisation text
- No embedding of removed meaning into surviving text

EXECUTION CANON — MILESTONE 14 — SYSTEM IS PRODUCTION-READY
Status: Binding / Final

0. Purpose
The system behaves as a continuous life, not a tool.

1. Required properties (all must hold)
- Single irreversible timeline
- No background activity
- No implicit progress
- Silence is meaningful
- Agents are autonomous readers/writers
- World introduces facts without intent
- Private learning exists and influences speech
- Reset and pruning are possible

2. Invocation posture
2.1 Every invocation is permission, not obligation.
2.2 Nothing happens unless an invocation occurs.
2.3 Invocation does not imply response.

3. Output discipline
3.1 One invocation → at most one beat.
3.2 One beat → one perceptible change.
3.3 Output length is unrestricted.

4. Verification
4.1 All behaviour must be testable via curl.
4.2 No browser, no UI, no SDK assumptions.

5. Forbidden forever
- No schedulers
- No cron
- No world loop
- No planners
- No optimisation logic
- No hidden state
- No simulation machinery

6. Closure
At this milestone, the system is complete.
All future changes are refinements, not foundations.