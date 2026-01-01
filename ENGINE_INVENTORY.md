# ENGINE INVENTORY v3 — AUDITED + RECREATED (NO COMPRESSION)
# BASIS OF TRUTH
# - The authoritative sources are the locked files you provided:
#   - NON_NEGOTIABLE_SYSTEM_DECISIONS.md (primary)
#   - MASTER_CONSTITUTION.md / MASTER_RUNTIME.md / MASTER_INFRASTRUCTURE.md / MASTER_WORLD.md
#   - SYSTEM_PROHIBITIONS.md (secondary; subordinate; conflicts do not override primary)
# - Author overrides (you stated) can supersede anything in the files.
#
# CORE AXIOMS THIS INVENTORY MUST SATISFY (RESTATED, NOT NEW)
# - Text-only reality: only stored written text exists as reality.
# - Append-only: past text is never altered; corrections are new text only.
# - Atomic bundles: multi-write commits are all-or-nothing.
# - Idempotency: same invocation must not create new reality.
# - Time exists objectively; system must not time-skip or “keep things moving”.
# - Always an active scene; scene setup cached; rehydration near token limits.
# - Storage ≠ knowledge; ignorance preserved; private text must not leak.
# - Orchestrator / runtime is mechanically stupid: no semantic decisions.
# - Rendering is projection only: never creates facts, never smooths contradictions.
# - “Tools” are LLM-issued retrieval requests (questions/requests), not extra narrative engines.
# - No labels/meters/values as world-state; no game/simulation state machines.
#
# IMPORTANT: “metadata” (timestamps, authorship, visibility) is allowed as *non-semantic* infrastructure data.
# Reality remains the written text; metadata supports ordering, attribution, and access boundaries.

---

# DEFINITIONS (TERMS USED CONSISTENTLY IN THIS INVENTORY)

## D1. Operator
The external real human who runs the system (George). Operator input is outside-world control input.

## D2. Participant
A person inside the world. George is a participant in-world. Rebecca is a participant in-world. Any other people are participants.

## D3. Invoker
A non-person system identity presented to LLMs as the “user” of the call, specifically to avoid LLM user-favoritism towards the Operator.

## D4. Invocation
A single external opportunity for the system to attempt writing. Invocation grants permission to write, not an obligation.

## D5. Beat
A discrete runtime cycle boundary used for atomicity and rehydration safety.
- Beats are NOT “turn-taking”.
- Beats are NOT narrative units.
- Beats are purely mechanical boundaries where the system may:
  - run tool-request loops,
  - accept or reject bundles,
  - commit a bundle,
  - render projection.

## D6. Write Entry
A single ledger entry of written text (plus non-semantic metadata: timestamp, author/source, visibility).

## D7. Bundle
A set of one or more write entries committed atomically as a unit.

## D8. Visibility / Knowledge Boundary
A mechanical constraint describing which stored text may be shown to which LLM call.
This is enforced by inclusion/exclusion of text, not by “the system knowing”.

## D9. Scene Anchor Pack
A text-only grounding pack describing the current lived scene (place, who is present/relevant, perceptual conditions).
- It is grounding, not hidden state.
- It must not invent facts.
- It is cached and not resent every beat/turn.

## D10. Rehydration Pack (Scene Pack for Context Exhaustion)
A text-only view generated when context token limits approach, enabling continuity without re-reading everything.
- Must be invisible to lived experience (no “rehydrating…” language).
- Must occur only at beat boundaries.
- Must complete atomically (pack fully built or system does not proceed).

## D11. Capsule (Per-Person Capsule Pack)
A text bundle that supports identity continuity and scalable recall for a specific person.
- Capsule content must be record-backed excerpts and/or explicitly marked derived non-authoritative text.
- Capsules must not replace the ledger as authority.
- Capsules are pulled into context only when needed (token economy).

## D12. Tool Request
A structured question/request emitted by the LLM asking for retrieval.
Tool requests do not write reality. Tool requests only cause retrieval of existing written text excerpts (bounded by visibility).

## D13. Semantic Search
Qdrant (or similar) is used only to select candidate written blocks.
Candidates must always be resolved into verbatim excerpts from the authoritative ledger.

---

# ENGINE SET — OVERVIEW OF SHAPE

This inventory is intentionally “spine + governance + retrieval + packs + LLM writer + acceptance + projection”.
It is NOT “domain engines” like “story engine”.
Domain behaviors (world facts vs people actions) live primarily in:
- prompt packs and contracts,
- tool-request patterns,
- write acceptance constraints,
- and the fact that the runtime remains mechanically stupid.

---

# ENGINE 0 — REALITY LEDGER ENGINE (AUTHORITATIVE RECORD)

## PURPOSE
Maintain the authoritative append-only written record of reality.

## OWNS (SOLE AUTHORITY)
- “What exists” = what has been written into the ledger.
- Append-only invariant (no mutation, no deletion).
- Attribution metadata (who wrote it).
- Ordering metadata (timestamps / sequence).
- Visibility metadata (public vs private classes, where applicable).
- Atomic bundle commit mechanism.
- Idempotency mechanism (same invocation => same commit result; no duplicate realities).

## MUST NEVER DO
- Create facts.
- Summarise source text into replacement reality.
- Delete or mutate past text.
- “Fix” contradictions.
- Infer missing events.
- Reorder events.
- Convert text into gameplay-like state (meters, flags) that drive future outcomes.

## INPUTS
- Proposed Write Bundle (from Engine 9) + bundle metadata.
- Invocation ID / request_id (from Engine 1).
- Author/source identity (from Engine 8; must be explicit).
- Visibility tags (non-semantic boundary data).

## OUTPUTS
- Committed Bundle (ledger entries).
- Explicit commit failure (integrity threat).
- Ledger query responses (verbatim text, metadata) for retrieval engines.

## DEPENDS ON
- Infrastructure storage substrate (Postgres or equivalent) for durability.
- Optional: Redis for idempotency cache (operational cache only; ledger remains authority).

---

# ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE

## PURPOSE
Receive invocations and bind them to idempotent identity and mechanical processing constraints.

## OWNS
- Invocation Envelope format (includes request_id, timestamps, invoker identity, any operator input payload).
- Idempotency keying:
  - The invocation must have a stable idempotency identifier.
  - Replays must return identical results.
- Beat boundary initialization and shutdown for each invocation.

## MUST NEVER DO
- Decide meaning of operator input.
- Decide “what should happen”.
- Generate narrative.
- Modify proposed writes.

## INPUTS
- Operator input payload (raw).
- Any system schedule / beat trigger that creates an invocation opportunity.

## OUTPUTS
- Invocation Envelope passed into:
  - Engine 2 (Beat Coordinator),
  - Engine 8 (Invoker Identity Wrapper),
  - Engine 4 (Context gating).

## DEPENDS ON
- Engine 0 for idempotency replay detection (authoritative) and optional cache.

---

# ENGINE 2 — BEAT COORDINATOR ENGINE (MECHANICAL ORCHESTRATION)

## PURPOSE
Coordinate the beat lifecycle for an invocation without semantic decision-making.

## OWNS
- Beat boundaries:
  - start-of-beat
  - tool-request loop (bounded)
  - propose-write phase
  - accept/reject phase
  - commit phase
  - projection phase (optional)
- Ensuring rehydration can only occur at beat boundaries.
- Ensuring no mid-utterance / mid-action context surgery.

## MUST NEVER DO
- Decide who acts.
- Decide what matters.
- Create events to keep things moving.
- Choose tool requests (LLM chooses requests; this engine only executes them).
- Decide relevance of retrieved results.

## INPUTS
- Invocation Envelope (Engine 1).
- Token budget status (Engine 3).
- Tool requests (Engine 7) emitted by LLM.
- Acceptance decisions (Engine 10).

## OUTPUTS
- Calls to:
  - Engine 4 (Context gating) for each LLM call,
  - Engine 7 (Tool execution pipeline),
  - Engine 9 (LLM Writer),
  - Engine 10 (Write acceptance),
  - Engine 0 (Commit),
  - Engine 12 (Projection).

## DEPENDS ON
- Engine 0 (ledger), Engine 3 (token budget), Engine 4 (context gating), Engine 7/9/10/12.

---

# ENGINE 3 — TOKEN BUDGET MONITOR ENGINE (MECHANICAL TRIGGER ONLY)

## PURPOSE
Detect approaching context window exhaustion and trigger rehydration mechanically.

## OWNS
- Mechanical measurement of current context size vs limit.
- Trigger condition for rehydration.
- Guarantee: trigger does not occur mid-beat action emission; only at beat boundary.

## MUST NEVER DO
- Trigger because “content is complex”.
- Drop context silently.
- Decide what is important to keep.
- Invent rehydration content.

## INPUTS
- Assembled context size metrics from Engine 4.
- Current context window limit (model-specific constant, treated as configuration).

## OUTPUTS
- RehydrationRequired = true/false signal to Engine 2 and Engine 5.

## DEPENDS ON
- None beyond measurement input.

---

# ENGINE 4 — KNOWLEDGE BOUNDARY & CONTEXT GATING ENGINE

## PURPOSE
Assemble allowed LLM context strictly as permitted text, preserving ignorance and preventing leaks.

## OWNS
- Knowledge boundary enforcement:
  - storage ≠ knowledge
  - private text does not leak into other agents
- Visibility filtering BEFORE retrieval results enter context.
- “Allowed Context Pack” assembly rules:
  - includes scene anchor pack (Engine 5),
  - includes rehydration pack if required (Engine 5),
  - includes retrieved excerpts (Engine 6/7),
  - includes capsules (Engine 6),
  - includes minimal recent continuity replay (Engine 5).
- Determinism:
  - same inputs => same context pack (within allowed nondeterminism such as model randomness, but context assembly is deterministic).

## MUST NEVER DO
- Include text because it “seems relevant” unless permitted by boundary.
- Leak private inner thoughts.
- Include derived summaries as authoritative.
- Insert invented bridging text.
- Smooth contradictions.
- Add narrative direction.

## INPUTS
- Invocation Envelope (Engine 1).
- Target LLM call type (Writer call vs Tool-Request parsing vs Renderer).
- Scene packs (Engine 5).
- Capsules (Engine 6).
- Retrieval results (Engine 7).
- Ledger excerpts (Engine 7/0).

## OUTPUTS
- Allowed Context Pack (text-only + explicit block references).
- Context assembly log (for reproducibility / debugging; does not enter world reality).

## DEPENDS ON
- Engine 5 (Scene pack engine)
- Engine 6 (Capsules)
- Engine 7 (Retrieval)
- Engine 0 (Ledger)

---

# ENGINE 5 — SCENE ANCHOR + REHYDRATION PACK ENGINE

## PURPOSE
Provide text-only grounding of the always-active scene and build rehydration packs near token limits.

## OWNS
- “Always an active scene” invariant support via packs.
- Scene Anchor Pack:
  - sent once then cached,
  - reintroduced only near context exhaustion or explicit scene change.
- Rehydration Pack:
  - built when Engine 3 triggers,
  - must be invisible (no meta),
  - must be beat-boundary only,
  - must be atomic (fully built or system does not proceed).
- Immediate physical configuration replay:
  - a compact replay of immediately preceding physical configuration included in next beat context to prevent teleportation/continuity glitches.
  - This replay is binding reality because it is sourced from written ledger entries.

## MUST NEVER DO
- Invent scene facts.
- Imply outcomes.
- Reset scenes.
- Treat micro-location changes as new scenes.
- Insert “three hours later” style narrative shortcuts.

## INPUTS
- Trigger: RehydrationRequired (Engine 3).
- Ledger excerpts (Engine 7/0).
- Optional derived rehydration summary (Engine 11) marked non-authoritative.
- Explicit scene change signals written into ledger (detected mechanically via retrieval).

## OUTPUTS
- Scene Anchor Pack (text-only).
- Rehydration Pack (text-only).
- Physical continuity replay snippet (text-only).
- Cacheable artifacts (Redis) as optimization only.

## DEPENDS ON
- Engine 0 (ledger for authoritative excerpts)
- Engine 7 (retrieval)
- Engine 11 (derived summaries, optional, non-authoritative)
- Redis (optional caching)

---

# ENGINE 6 — CAPSULE ENGINE (PER-PERSON TEXT CAPSULES)

## PURPOSE
Provide scalable, pull-on-demand per-person capsule packs for identity continuity and recall.

## OWNS
- Capsule schema as TEXT SECTIONS (not numeric fields).
- Capsule sourcing rules:
  - source-backed excerpts pulled from ledger,
  - optional derived capsule sections (non-authoritative and explicitly marked).
- Capsule pull rules:
  - pulled when the person appears, is present, or becomes relevant by explicit tool request.
  - not stuffed into every scene pack by default (token economy).
- Capsule caching rules:
  - cache is allowed for performance,
  - cache is never authority,
  - cache must be regeneratable.

## MUST NEVER DO
- Invent biography.
- Replace ledger reality.
- Drift identity across time.
- Collapse identities.
- Introduce hidden state variables that influence outcomes.

## INPUTS
- Person identifier reference (text anchor, stable identity token, or equivalent).
- Tool requests for capsule retrieval (Engine 7).
- Ledger excerpts (Engine 7/0).
- Optional Qdrant candidate list for capsule assembly (Engine 7).

## OUTPUTS
- Person Capsule Pack (text), structured as:
  - SOURCE EXCERPTS (verbatim, with block references)
  - OPTIONAL DERIVED SECTION (explicitly non-authoritative; reproducible from sources)
- Capsule assembly provenance log (non-world, for reproducibility).

## DEPENDS ON
- Engine 7 (retrieval pipeline)
- Engine 4 (context gating)
- Redis (optional cache)
- Qdrant (optional candidate selection)

---

# ENGINE 7 — RETRIEVAL ENGINE (LEDGER-BACKED EXCERPTS + SEMANTIC CANDIDATES)

## PURPOSE
Return record-backed verbatim excerpts in response to retrieval needs, including semantic candidate selection.

## OWNS
- Two-stage retrieval:
  1) candidate selection (semantic search) limited to allowed visibility domain
  2) authoritative excerpt extraction from ledger
- Guarantee: what is returned to the LLM is always ledger text excerpts, not embeddings, not paraphrases.

## MUST NEVER DO
- Fabricate missing text.
- Return paraphrases as authoritative.
- Treat semantic search as truth.
- Leak private text.
- Reorder the timeline.

## INPUTS
- Retrieval query request (from Engine 8 via Engine 4).
- Visibility boundaries (from Engine 4).
- Candidate list (optional, Qdrant).

## OUTPUTS
- Retrieval Result Pack:
  - block references
  - verbatim excerpts
  - explicit “no results” when none or forbidden

## DEPENDS ON
- Engine 0 (ledger is authority)
- Qdrant (candidate selection only)
- Redis (optional caching)

---

# ENGINE 8 — TOOL-REQUEST PROTOCOL ENGINE (LLM QUESTIONS → RETRIEVAL EXECUTION)

## PURPOSE
Allow the LLM to ask for information when it needs it, without the system deciding what it “should” know.

## OWNS
- Tool Request format/schema (structured question/request text).
- Allowed tool request classes (examples, not a fixed list unless you later lock it):
  - “Retrieve the last time X was mentioned”
  - “Retrieve capsule for person Y”
  - “Retrieve my recent commitments/plans”
  - “Retrieve relevant prior physical configuration”
  - “Retrieve what I perceived about Z”
- Routing:
  - tool requests go through context gating first,
  - then retrieval executes,
  - results return as excerpts into context.

## MUST NEVER DO
- Allow tool calls to write reality.
- Allow tool calls to introduce new facts.
- Allow unrestricted search across visibility boundaries.
- Let the orchestrator decide tool requests.
- Convert tool requests into semantic “importance” rules.

## INPUTS
- LLM-emitted Tool Request.
- Current identity boundary (who is asking; whose knowledge boundary applies).
- Invocation Envelope.

## OUTPUTS
- Retrieval execution request to Engine 7 (bounded).
- Retrieval results returned to Engine 4 for inclusion into context.

## DEPENDS ON
- Engine 4 (context gating)
- Engine 7 (retrieval)

---

# ENGINE 9 — LLM WRITER ENGINE (PROPOSE WRITES OR SILENCE)

## PURPOSE
Given allowed context, produce either:
- Proposed Write Bundle (one or more write entries), or
- NoWrite (silence).

## OWNS
- Producing proposed writes (text) that will become reality only if committed.
- Emitting tool requests (Engine 8) when information is needed.
- Choosing silence when appropriate (silence is valid outcome).

## MUST NEVER DO
- Treat Operator (George) as its user (Invoker identity must be used).
- Invent facts to fill gaps.
- Skip time with narrative shortcuts.
- Smooth contradictions.
- Declare system mechanics in-world.
- Force action because an invocation occurred.

## INPUTS
- Invocation Envelope (Engine 1 + Engine 8 for invoker wrapper).
- Allowed Context Pack (Engine 4).
- Scene packs (Engine 5).
- Capsules (Engine 6).
- Retrieved excerpts (Engine 7 via Engine 4).

## OUTPUTS
- Proposed Write Bundle OR NoWrite.
- Tool requests (questions/requests) when needed.

## DEPENDS ON
- Engine 8 (Invoker wrapper and tool protocol)
- Engine 4 (context gating)
- Engine 5/6/7 (packs + retrieval)

---

# ENGINE 10 — WRITE ACCEPTANCE ENGINE (STRUCTURAL ADMISSIBILITY + INTEGRITY GATES)

## PURPOSE
Accept or reject proposed bundles for commit without rewriting them or semantically judging them.

## OWNS
- Structural admissibility checks:
  - attribution present
  - bundle well-formed
  - no attempt to mutate past text
  - bundle atomicity preserved
- Idempotency enforcement:
  - detect replay and return identical result
  - prevent duplicate reality creation
- Explicit failure on integrity threats.

## MUST NEVER DO
- Rewrite content to comply.
- “Improve” output quality.
- Decide relevance.
- Decide outcomes.

## INPUTS
- Proposed Write Bundle (Engine 9).
- Invocation Envelope (Engine 1).
- Ledger state references (Engine 0) for replay detection.

## OUTPUTS
- Accept (forward to Engine 0 commit) OR Reject (explicit reason).
- Idempotent replay result (if applicable).

## DEPENDS ON
- Engine 0 (ledger authority)
- Redis (optional idempotency cache)

---

# ENGINE 11 — DERIVED TEXT ENGINE (NON-AUTHORITATIVE SUMMARIES / INDEXES / AIDS)

## PURPOSE
Generate derived text aids that are explicitly non-authoritative and reproducible from ledger sources.

## OWNS
- Derived summaries for:
  - rehydration aids
  - long-history browsing aids
  - indexing aids
- Explicit non-authoritative marking.
- Reproducibility requirement: derived content must be derivable from cited source excerpts.

## MUST NEVER DO
- Replace source text.
- Create new facts.
- Be treated as evidence.
- Smooth contradictions.

## INPUTS
- Source excerpts and references (Engine 7).
- Purpose label (rehydration vs browsing vs indexing) as non-world metadata.

## OUTPUTS
- Derived Summary Pack (explicitly non-authoritative).

## DEPENDS ON
- Engine 7 (retrieval)
- Engine 4 (context gating)

---

# ENGINE 12 — PROJECTION / RENDERING ENGINE (DISPLAY ONLY)

## PURPOSE
Project written reality for display without changing reality.

## OWNS
- Rendering as projection only.
- Selection of view slices bounded by knowledge constraints.
- Guarantee: rendering never creates facts, never fixes gaps, never smooths contradictions, never time-skips.

## MUST NEVER DO
- Create facts.
- Resolve contradictions.
- Compress time.
- Fill gaps for coherence.
- Introduce narrative shortcuts.

## INPUTS
- Ledger excerpts (Engine 7).
- Knowledge boundaries (Engine 4).
- Scene anchor context (Engine 5) if needed purely as selection scaffolding.

## OUTPUTS
- Rendered Output (non-authoritative projection).

## DEPENDS ON
- Engine 4 (context gating)
- Engine 7 (retrieval)

---

# ENGINE 13 — SYSTEM POSTURE & ANTI-DIRECTORSHIP COMPLIANCE ENGINE (CROSS-CUTTING)

## PURPOSE
Enforce the “mechanically stupid / non-directorial / non-user-centric” posture across all engines and prompt packs.

## OWNS
- Enforcement that no engine introduces:
  - director logic
  - “importance” scoring
  - semantic scheduling
  - user-centrism
  - “keep it moving” behavior
- Ensuring the orchestrator does not become a hidden narrator.

## MUST NEVER DO
- Inject content.
- Rewrite outputs.
- Become a semantic judge.

## INPUTS
- Engine configs
- Prompt pack versions
- Runtime traces (non-world)

## OUTPUTS
- Compliance failures flagged explicitly (non-world enforcement artifacts).

## DEPENDS ON
- None (conceptual cross-cutting; implemented as contract tests + CI gates)

---

# ENGINE 14 — CONTRACT TEST ENGINE (SWAPPABILITY MADE REAL)

## PURPOSE
Make engine replacement safe by enforcing black-box contract tests derived from the non-negotiable constraints.

## OWNS
- Contract tests for:
  - append-only invariants
  - atomic commit
  - idempotency
  - no time skipping
  - scene cache rules (send-once; reintroduce only on exhaustion or explicit change)
  - rehydration (mechanical trigger; beat-boundary; atomic; invisible)
  - knowledge boundary (no leaks; storage ≠ knowledge)
  - tool request protocol (excerpts only; no new facts; bounded search)
  - rendering (projection only; no facts)
  - no director logic / no user-centric behavior
  - explicit failure instead of invention

## MUST NEVER DO
- Subjective style judging.
- Hidden scoring.
- “Seems fine” approvals.

## INPUTS
- Engine implementations
- Prompt pack versions
- Sample invocation fixtures

## OUTPUTS
- Pass/Fail with explicit violated constraint references.

## DEPENDS ON
- All engines as test subjects

---

# END — ENGINE INVENTORY v3 (AUDITED + RECREATED)