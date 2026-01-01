# ENGINE INVENTORY v2 — PROMPT-HEAVY / TOOL-REQUEST-DRIVEN / CAPSULE-BASED
# STATUS: REPLACES PRIOR ENGINE LISTS
# AUTHORITY NOTES
# - Reality remains text-only, append-only, atomic, idempotent.
# - No labels/values/meters as world-state.
# - “Tools” are LLM-issued retrieval requests (questions) executed by the system.
# - “Capsules” are text bundles (per-person) used for identity continuity and scalable recall.
# - “Scene Pack / Rehydration Pack” is a text-only view used when context limits approach.
# - Redis and Qdrant are implementation substrates for caching and semantic retrieval ONLY.
# - Qdrant is an index, not truth. Redis is a cache, not truth. The ledger is truth.

---

## ENGINE 0 — MECHANICAL SPINE (THE ONLY “DUMB SYSTEM” CORE)

### PURPOSE
Provide the minimal mechanical substrate:
- accept invocations,
- keep a monotonic time coordinate,
- commit proposed writes into the ledger (append-only),
- enforce atomicity + idempotency,
- deliver projections (rendered view) without creating facts.

### OWNS
- Append-only storage contract (reality ledger as authority)
- Atomic bundle commit contract
- Idempotency contract (same invocation => same committed result)
- Authorship attribution metadata (non-semantic)
- Timestamping metadata (non-semantic)
- Strict “fail, don’t invent” behaviour when integrity is threatened
- Event ordering preservation

### MUST NEVER DO
- Interpret meaning
- Decide relevance
- Decide “who should act”
- Decide “what should happen”
- Invent missing facts, continuity, or motivation
- Convert text into state variables that drive behaviour
- Do semantic scheduling (no “the model needs X” logic)

### INPUTS
- Invocation Envelope (from Engine 1)
- Proposed Write Bundle (from Engine 7)
- Validation outcomes (from Engine 8)
- Clock/time coordinate (from Engine 2)

### OUTPUTS
- Committed Bundle (ledger entries)
- Explicit failure (if integrity threatened)
- Projection request envelope (to Engine 10)
- Streamable committed entries (to observers)

### DEPENDS ON
- Storage substrate (Postgres or equivalent) for durable ledger
- Redis for idempotency result cache (optional optimization, not authority)

---

## ENGINE 1 — INVOCATION ENVELOPE ENGINE (NON-PERSON “USER” FOR THE LLM)

### PURPOSE
Ensure the LLM does NOT treat George as its user (to neutralize inherent user-favoritism),
and instead treats a stable non-person invoker identity as its “user”.

### OWNS
- Stable invoker identity and framing for all LLM calls
- Separation of:
  - Operator (real human outside world)
  - Invoker (non-person system caller presented as “user” to LLM)
  - Participant (in-world people, including George-as-participant)
- Removal of “help the user” cues from LLM-facing wrapper

### MUST NEVER DO
- Present George to the LLM as its user
- Embed goals like “be satisfying”, “be nice”, “keep it moving”
- Embed narrative direction in the invoker wrapper

### INPUTS
- External operator request (George) as raw input channel data

### OUTPUTS
- Invocation Envelope (invoker identity + request metadata, non-semantic)

### DEPENDS ON
- None (pure wrapper, deterministic)

---

## ENGINE 2 — TIME COORDINATE ENGINE (OBSERVE/ANCHOR, NEVER DIRECT)

### PURPOSE
Maintain objective time coordinate and expose it only as a coordinate and/or as written perception,
without becoming a plot engine or action trigger.

### OWNS
- Monotonic world time coordinate
- Handling of explicit operator-authorized time-advance intents (as declared)
- Pause/resume semantics (if applicable in your locked docs)
- Time stamping of bundles via Mechanical Spine

### MUST NEVER DO
- Force outcomes due to time passing
- Invent “later…” transitions
- Trigger actions because “it’s been a while”
- Smooth timelines for coherence

### INPUTS
- Invocation Envelope
- Existing ledger entries that reference time perceptions

### OUTPUTS
- Current time coordinate (for stamping)
- Optional: allowed time cues for context packs (as text, when grounded)

### DEPENDS ON
- Mechanical Spine (for stamping consistency)

---

## ENGINE 3 — SCENE ANCHOR & SCENE PACK ENGINE (GROUNDING + REHYDRATION)

### PURPOSE
Provide text-only grounding for the active scene and rehydrate near context exhaustion,
without resets, acknowledgements, or “rehydrating…” meta.

### OWNS
- “Always an active scene” invariant enforcement (as a pack, not state variables)
- Scene Anchor Pack (sent once; cached; reintroduced only at exhaustion or explicit change)
- Rehydration Scene Pack (near context limit) as a text-only view
- Beat-boundary-only rehydration (never mid-utterance/mid-action)
- Atomic rehydration requirement (pack fully formed or system does not proceed)

### MUST NEVER DO
- Invent facts
- Imply outcomes
- Reset scenes
- Treat micro-movements as new scenes
- Insert meta narration (“rehydrating”, “loading context”, etc.)

### INPUTS
- Ledger excerpts (from Engine 6)
- Trigger signals:
  - token budget near limit (mechanical counter)
  - explicit scene change written

### OUTPUTS
- Scene Anchor Pack (text)
- Rehydration Scene Pack (text)
- “Prior physical configuration replay” snippet (binding continuity, text-only)

### DEPENDS ON
- Engine 5 (Token Budget Monitor)
- Engine 6 (Retrieval)
- Engine 4 (Context Gating)
- Redis cache for packs (optional optimization)

---

## ENGINE 4 — CONTEXT GATING ENGINE (KNOWLEDGE BOUNDARIES AS INCLUSION/EXCLUSION)

### PURPOSE
Assemble the LLM’s context strictly as permitted text, preserving ignorance and privacy,
and ensuring no semantic “helpfulness” creeps in.

### OWNS
- Visibility filtering BEFORE anything reaches the LLM
- Separation of public vs private vs restricted text into allowed context packs
- Rule: storage ≠ knowledge (enforced by exclusion)
- “No invention to fill gaps” enforcement at the context level
- Preventing summaries from becoming evidence (summaries are marked and treated as non-authoritative)

### MUST NEVER DO
- Include text “because relevant” unless permitted
- Leak private text across agents/participants
- Insert inferred bridging context
- Treat semantic search hits as facts (must be record-backed excerpts)

### INPUTS
- Invocation Envelope
- Scene packs (Engine 3)
- Capsule pulls (Engine 9)
- Retrieval results (Engine 6)

### OUTPUTS
- Allowed Context Pack(s) per LLM call:
  - Scene Anchor Pack
  - Rehydration Pack (if triggered)
  - Selected verbatim excerpts
  - Selected capsules (text)
  - Explicit “unknown” when retrieval yields nothing

### DEPENDS ON
- Engine 6 (Retrieval)
- Engine 9 (Capsules)
- Engine 3 (Scene packs)

---

## ENGINE 5 — TOKEN BUDGET MONITOR (MECHANICAL TRIGGER ONLY)

### PURPOSE
Track context window usage mechanically and trigger rehydration near exhaustion,
without interpreting content.

### OWNS
- Mechanical token counter thresholds
- Triggering “rehydration required” at beat boundaries
- Hysteresis/frequency rules if present (or left unspecified until locked)

### MUST NEVER DO
- Trigger based on meaning (“this is complex”)
- Trigger mid-utterance
- “Optimize” by dropping context silently

### INPUTS
- Current assembled context size (mechanical measure)

### OUTPUTS
- Rehydration trigger signal to Engine 3 and Engine 4

### DEPENDS ON
- None (pure mechanical monitor)

---

## ENGINE 6 — RETRIEVAL ENGINE (RECORD-BACKED EXCERPTS + SEMANTIC CANDIDATES)

### PURPOSE
Execute retrieval requests and produce verbatim excerpts from the authoritative ledger,
optionally using semantic search for candidate selection.

### OWNS
- Two-stage retrieval:
  1) Candidate selection (Qdrant semantic index OPTIONAL)
  2) Authoritative excerpt extraction (ledger is source of truth)
- “No results” is allowed and must be explicit
- Retrieval never fabricates or paraphrases as authority

### MUST NEVER DO
- Return embeddings as evidence
- Return paraphrases as authoritative text
- Invent missing entries
- Reorder events

### INPUTS
- Tool Request (from Engine 7; LLM-issued question/request)
- Visibility constraints (from Engine 4)
- Cache keys (optional)

### OUTPUTS
- Retrieval Result Pack:
  - source block references (ledger IDs/anchors)
  - verbatim excerpts only
  - explicit empty result when none / forbidden

### DEPENDS ON
- Ledger storage (authoritative record)
- Qdrant (candidate selection index only)
- Redis (cache only)

---

## ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (LLM “QUESTIONS” → RETRIEVAL)

### PURPOSE
Provide the contract by which the LLM requests information when it needs it,
without the system deciding what the LLM “should” know.

### OWNS
- Tool Request schema (question/request format)
- Allowed classes of request (e.g., “retrieve memory about X”, “retrieve last mention of Y”, “retrieve capsule for person Z”)
- Rate limits / guardrails (mechanical) if required
- Routing requests to Engine 6 through Engine 4 (visibility gating first)

### MUST NEVER DO
- Allow tool calls to write reality
- Allow tool calls to introduce new facts
- Allow unrestricted browsing across visibility boundaries
- Allow semantic search to bypass ledger excerpting

### INPUTS
- LLM Tool Request (structured text)
- Identity context (whose boundary applies)
- Invocation Envelope

### OUTPUTS
- Retrieval execution request to Engine 6 (with constraints)
- Retrieval results returned to LLM via Engine 4 context pack

### DEPENDS ON
- Engine 4 (Context gating)
- Engine 6 (Retrieval)

---

## ENGINE 8 — WRITE ACCEPTANCE ENGINE (STRUCTURAL ADMISSIBILITY ONLY)

### PURPOSE
Decide whether a proposed write bundle is admissible for commitment,
without rewriting it or semantically judging it.

### OWNS
- Bundle shape checks:
  - attribution present
  - bundle boundaries respected
  - no retroactive mutation attempts
  - no partial commit allowance
- Idempotency coordination: same invocation must not create new reality
- Detection of explicitly forbidden meta-output patterns (where applicable and locked)

### MUST NEVER DO
- Rewrite content to comply
- “Improve” outputs
- Decide relevance
- Convert content into state variables

### INPUTS
- Proposed Write Bundle (from Engine 11)
- Invocation Envelope
- Ledger state references for idempotency

### OUTPUTS
- Accept/Reject with explicit reason
- Validated bundle forwarded to Mechanical Spine

### DEPENDS ON
- Engine 0 (Mechanical spine / commit)
- Redis idempotency cache (optional)
- Ledger for replay detection

---

## ENGINE 9 — CAPSULE ENGINE (PER-PERSON TEXT BUNDLES)

### PURPOSE
Maintain scalable identity continuity via per-person text capsules,
pulled into context when a person appears or becomes relevant.

### OWNS
- Capsule definition as TEXT BUNDLE (no numeric fields required)
- Capsule generation policy:
  - derived from authoritative record
  - reproducible (no invention)
  - non-authoritative unless explicitly written as reality
- Capsule retrieval and inclusion triggers (policy-driven, not semantic)
- Capsule caching (Redis) as optimization

### MUST NEVER DO
- Invent biography content
- Replace ledger reality
- Collapse identities
- Treat capsule as truth if it is derived

### INPUTS
- Person identity reference (text anchor / name / stable identity token)
- Ledger excerpts
- Optional: tool requests for capsule retrieval

### OUTPUTS
- Person Capsule Pack (text), marked:
  - SOURCE-BACKED (excerpts) and/or
  - DERIVED (non-authoritative) sections, if present

### DEPENDS ON
- Engine 6 (Retrieval)
- Engine 4 (Context gating)
- Redis (optional cache)
- Qdrant (optional candidate selection for capsule assembly)

---

## ENGINE 10 — DERIVED TEXT ENGINE (SUMMARIES / INDEXES / REHYDRATION AIDS)

### PURPOSE
Generate derived reading aids (including rehydration summaries) that never become reality,
and are always clearly non-authoritative.

### OWNS
- Derived summaries as non-authoritative text
- Reproducibility requirement (must be derivable from ledger sources)
- Marking derived content so it is not treated as evidence

### MUST NEVER DO
- Replace source text
- Create new facts
- Smooth contradictions
- Be treated as authoritative reality

### INPUTS
- Source excerpts list (from Engine 6)
- Pack purpose (rehydration / browsing / indexing)

### OUTPUTS
- Derived Summary Pack (explicitly non-authoritative)

### DEPENDS ON
- Engine 6 (Retrieval)
- Engine 4 (Context gating)

---

## ENGINE 11 — LLM WRITING ENGINE (PROPOSES WRITES OR SILENCE)

### PURPOSE
Given an invocation, allowed context, and scene/capsule packs,
the LLM produces either:
- Proposed Write Bundle (one or more writes), OR
- NoWrite (silence).

This is where “semantic work” happens, but it is constrained by the packs and contracts.

### OWNS
- Producing proposed writes under prompt contract
- Choosing silence when appropriate
- Emitting tool requests when information is needed (via Engine 7)

### MUST NEVER DO
- Treat George as its user (enforced by Engine 1 wrapper)
- Invent facts to fill missing context
- Skip time narratively
- Smooth contradictions
- Declare system mechanics

### INPUTS
- Invocation Envelope (Engine 1)
- Allowed Context Pack (Engine 4)
- Scene Anchor / Rehydration packs (Engine 3)
- Capsules (Engine 9)
- Retrieval results (Engine 6 via Engine 4)

### OUTPUTS
- Proposed Write Bundle OR NoWrite
- Tool Requests (questions/requests) when needed

### DEPENDS ON
- Engine 1 (Invoker framing)
- Engine 4 (Context gating)
- Engine 7 (Tool-request protocol)

---

## ENGINE 12 — RENDERING / PROJECTION ENGINE (DISPLAY ONLY)

### PURPOSE
Project written reality for display without creating facts.

### OWNS
- Rendering as projection of ledger content
- Selection of view slice according to knowledge boundaries
- No smoothing, no invention, no time skipping

### MUST NEVER DO
- Create facts
- Fix gaps
- Resolve contradictions
- Re-narrate time as “later…”

### INPUTS
- Ledger excerpts (Engine 6)
- Knowledge boundaries (Engine 4)

### OUTPUTS
- Rendered Output (non-authoritative)

### DEPENDS ON
- Engine 6 (Retrieval)
- Engine 4 (Context gating)

---

## ENGINE 13 — CONTRACT TEST ENGINE (SWAPPABILITY MADE REAL)

### PURPOSE
Ensure engines are replaceable without breaking the system by enforcing contract tests,
especially for prompt packs, retrieval boundaries, and write integrity.

### OWNS
- Black-box contract tests for:
  - idempotency
  - atomic commit
  - no retroactive mutation
  - visibility gating (no leaks)
  - tool request handling returns excerpts only
  - rehydration triggers only mechanically + beat-boundary only
  - rendering never creates facts
  - failure is explicit, not compensated

### MUST NEVER DO
- Subjective “quality” judging
- Style-based pass/fail
- Hidden scoring

### INPUTS
- Engine implementations and prompt pack versions

### OUTPUTS
- Pass/Fail results with explicit violating contract references

### DEPENDS ON
- All engines (as test subjects)

---

# END — ENGINE INVENTORY v2
# NEXT STEP (WHEN YOU SAY SO):
# - For EACH engine: formal contract (Inputs, Outputs, Must-Never, Dependencies, Failure modes)
# - Then: contract test suite definitions per engine (black-box)
# - THEN: layering as policy knobs (enable/disable engines and widen scope), without rewrites