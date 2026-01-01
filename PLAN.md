# END-TO-END IMPLEMENTATION PLAN — FROM “LOCKED SPECS + ENGINE SPINE” TO FULL WORKING SYSTEM
# RULES THIS PLAN OBEYS
# - NON_NEGOTIABLE_SYSTEM_DECISIONS.md is the constitutional superset.
# - The engine inventory (v4) is the spine; future details attach to it without rewriting physics.
# - The UI is not “later polish”. You will use it early for confidence and testing.
# - No timeline promises. This is a sequencing plan and a build contract plan.
# - No curl as your primary validation tool. UI-driven validation is first-class.
# - No labels/meters/stats as world-state. Reality remains append-only text. Metadata is allowed only for ordering, attribution, visibility.

---

## 0) WHAT WE HAVE NOW (INPUTS TO THIS PLAN)

### 0.1 Locked authorities
- NON_NEGOTIABLE_SYSTEM_DECISIONS.md (superset)
- Engine inventory (v4)
- Traceability matrix for NON_NEGOTIABLE_SYSTEM_DECISIONS.md (complete)

### 0.2 Non-constitutional payloads (NOT in the matrix; layered later)
- Rebecca packs / personality profiles / agency maps / boundary maps
- Other “supporting docs” defining character behavior

### 0.3 UI direction (authoritative direction, not literal implementation)
- UI_UX_DESIGN.md (direction for perceptual stream, sources, pocket, scroll behavior, immersion rules)
- Example output sample (direction for rendering feel, not a template)

---

## 1) CREATE THE BUILD CONTRACT LAYER (COPILOT-PROOF SHAPES)
This is the “interfaces first” phase. It prevents Copilot from inventing protocols and forces every component to speak in locked shapes.

### 1.1 Create the “Contracts” folder
Create a folder in the repo (or wherever the system lives):
- /contracts/

### 1.2 Produce these contract documents (each as its own .md file)
These are not implementation notes. They are binding shapes. They are written so they can be unit-tested and contract-tested.

A) /contracts/invocation_envelope.md
- Defines:
  - request_id (idempotency)
  - invoker identity (non-person)
  - operator payload (raw)
  - optional: declared time adjustments (if allowed)
  - optional: UI viewport cursor token (for continuity)
- MUST specify:
  - what fields are required
  - what fields are optional
  - the exact JSON shape

B) /contracts/write_entry.md
- Defines:
  - entry_id (ledger assigned)
  - created_at (time coordinate)
  - author (explicit; e.g. REBECCA, WORLD, GEORGE, etc.)
  - visibility (public/private/etc. as metadata only)
  - channel (USER / VOICE / PEOPLE) [this is display channel metadata, not world-state]
  - text (the authoritative reality text)
- MUST specify:
  - append-only semantics
  - corrections are new entries

C) /contracts/bundle.md
- Defines:
  - bundle_id
  - request_id linkage
  - entries[] (list of WriteEntry to commit atomically)
- MUST specify:
  - atomic commit requirement
  - rejection semantics (all-or-nothing)

D) /contracts/tool_request.md
- Defines:
  - tool_request_id
  - requester identity context (who is asking; whose knowledge boundary)
  - request_type (bounded set; can be “string enum”)
  - request_text (the natural language question/request)
  - optional: target person id (for capsule retrieval)
  - optional: time window hints
- MUST specify:
  - tool requests do not write reality
  - tool requests are questions only

E) /contracts/retrieval_result_pack.md
- Defines:
  - tool_request_id
  - results[] each with:
    - ledger_reference (block ids / entry ids)
    - verbatim_excerpt (text)
    - visibility classification
  - explicit empty result
- MUST specify:
  - excerpts are verbatim from ledger
  - Qdrant provides candidates but not authoritative content

F) /contracts/scene_anchor_pack.md
- Defines:
  - pack_id
  - text (natural language only)
  - provenance references (ledger refs used)
- MUST specify:
  - cached send-once rule
  - reintroduce conditions

G) /contracts/rehydration_pack.md
- Defines:
  - pack_id
  - text (natural language only)
  - provenance references (ledger refs used)
  - physical continuity replay snippet
- MUST specify:
  - invisible in-world (no “rehydrating” wording)
  - beat-boundary only
  - atomic completion or do not proceed

H) /contracts/capsule_pack.md
- Defines:
  - person_id (stable)
  - sections:
    - SOURCE_EXCERPTS (verbatim excerpts + references)
    - OPTIONAL_DERIVED (non-authoritative; must include provenance)
- MUST specify:
  - capsule is not authority
  - capsule is regeneratable
  - no invention permitted in SOURCE_EXCERPTS

I) /contracts/projection_output.md
- Defines:
  - entries[] for stream display with required fields:
    - channel
    - author label rules (for PEOPLE)
    - text
    - display metadata (timestamps optional, not always shown)
  - pocket_payload (separate channel; never popups)
- MUST specify:
  - projection never creates facts
  - projection respects knowledge boundaries

### 1.3 Lock the contracts
- These contracts become the “API truth”.
- Future changes are treated as physics changes. They require explicit approval, not incidental refactor.

Acceptance condition for Phase 1:
- All contract documents exist.
- Each has an explicit “MUST / MUST NOT” section.
- Each has at least one concrete JSON example that matches the shape exactly.

---

## 2) BUILD THE UI FIRST (REAL FEEDBACK LOOP)
This phase creates a UI you can use immediately, even before the world is “intelligent”.

### 2.1 Implement the PWA shell and core layout
Implement these UI components from the direction doc (not literal details):
- Main Perceptual Stream view
- Input box (always available)
- Pocket overlay (toggleable, non-invasive)
- Stream smooth scrolling and stable cursor handling

### 2.2 Implement the 3 stream sources structurally
Implement strict rendering rules for:
- USER: verbatim, unlabeled
- VOICE: second-person, unlabeled prose
- PEOPLE: labeled header (small-caps) + text

Important: This is a display convention, but it becomes part of the system contract because it controls how reality is presented.

### 2.3 Implement the “UI cursor token” for continuity
UI must:
- preserve scroll position across updates
- support “stay at same pixel offset”
- support “snap to latest” when user is at bottom
Backend does not need to “understand” scroll. It just needs to support:
- “give me new entries since cursor”
- “give me the full stream slice around cursor” (optional)

### 2.4 UI talking to backend: one endpoint
Create a single endpoint that the UI calls to progress reality:
- POST /beat (or equivalent)
Payload:
- InvocationEnvelope (contract shape)
Response:
- ProjectionOutput (contract shape)

Early on, this endpoint can return placeholder VOICE/PEOPLE entries from a stub writer, but the output MUST still flow through the ledger once ledger is added (next phase).

Acceptance conditions for Phase 2:
- You can type in UI and see a USER entry appear.
- You can click “continue / beat” and see a VOICE entry appear.
- You can see a PEOPLE entry with a label header.
- Pocket opens and closes without disturbing the stream.
- No popups invade the stream (pocket is the overlay).

---

## 3) IMPLEMENT THE PHYSICS (LEDGER, ATOMICITY, IDEMPOTENCY)
This is where the system stops being a UI mock and becomes the real system, even if it is “dumb”.

### 3.1 Implement Engine 0 (Reality Ledger)
Create durable append-only storage with:
- WriteEntry table
- Bundle table
- Request table (request_id, response hash, bundle_id, status)
- Visibility metadata fields
- Author field
- Channel field (USER/VOICE/PEOPLE)

### 3.2 Implement Engine 1 (Invocation + idempotency)
- Accept request_id
- If request_id already processed:
  - return identical response body as before
  - do not create new ledger rows

### 3.3 Implement Engine 10 (Write acceptance)
At this stage acceptance checks are structural:
- entries array exists
- author present
- channel present
- text present
- no empty commits if declared as “wrote=true” (if you use that flag)
- atomic commit enforced

### 3.4 Wire UI endpoint to ledger
Now:
- USER input creates a WriteEntry in a bundle (atomic)
- “Beat” produces either:
  - NoWrite (no new bundle)
  - or a committed bundle with VOICE/PEOPLE from a stub writer

Acceptance conditions for Phase 3:
- UI is now showing entries loaded from the ledger, not from memory.
- Refreshing the UI preserves reality (append-only).
- Sending the same request_id twice returns identical response and does not create duplicates.
- If a bundle commit fails, nothing partial appears.

---

## 4) IMPLEMENT TIME + CALENDAR + SCHEDULED OPPORTUNITIES (WITHOUT DIRECTORSHIP)
This phase makes time “real” and usable, without inventing story.

### 4.1 Implement Engine 3 (Time & Calendar)
- Represent time in a real calendar format
- Implement time arithmetic consistently
- Support explicit time declarations (as allowed by your authority model)
- Persist world time coordinate

### 4.2 Implement Engine 2 scheduled/milestone surfacing
- Maintain a schedule registry (data structure + persistence)
- Surface “an opportunity exists now” when time hits milestones
- Do not decide outcomes, do not auto-resolve
- This can produce:
  - either a “World opportunity prompt context” for the writer
  - or simply an internal flag that a beat is eligible for writing

### 4.3 Display time in Pocket (not in stream)
- Pocket can show clock/calendar UI
- The stream remains immersion-first; no “system reminders” popups

Acceptance conditions for Phase 4:
- Time exists even when nothing is written.
- Time does not jump due to convenience.
- Scheduled events can become due and be surfaced as an opportunity.
- No scheduled event is auto-resolved.
- UI Pocket can show time without polluting the stream.

---

## 5) IMPLEMENT KNOWLEDGE SURFACES + VISIBILITY BOUNDARIES
This is where the system stops being “omniscient by accident”.

### 5.1 Implement Engine 4 knowledge model (mechanical)
- Add visibility classes (public/private)
- Add “who this is visible to” metadata where required
- Add “personal memory” vs “public record” separation if present in your constitution
- Enforce:
  - storage ≠ knowledge
  - knowing requires exposure
  - public availability ≠ personal knowledge

### 5.2 Implement knowledge filtering for projection
- Renderer must not leak private text
- Views must respect what the viewer is allowed to know

Acceptance conditions for Phase 5:
- Private entries never appear in public view.
- A participant’s view does not include facts they were not exposed to.
- Renderer does not “helpfully” reveal things.

---

## 6) IMPLEMENT RETRIEVAL PIPELINE (LEDGER-BACKED) + INDEXING (QDRANT) + CACHE (REDIS)
This phase enables scalable memory without stuffing everything into context.

### 6.1 Implement Engine 8 retrieval (ledger-backed)
- Provide retrieval by:
  - exact references (entry_id / bundle_id)
  - time window
  - keyword match (optional, mechanical)
- Always return verbatim excerpts from ledger entries

### 6.2 Add Qdrant as candidate selection (optional but agreed)
- Build embeddings for ledger entries
- Store in Qdrant:
  - vector + pointer to entry_id
- Retrieval steps:
  1) query Qdrant for candidate entry_ids
  2) fetch those entries from ledger
  3) return verbatim excerpts only

### 6.3 Add Redis caching for performance
- Cache:
  - recent retrieval results
  - scene anchor packs
  - capsules
  - idempotency responses (optional)
- Make sure:
  - cache loss changes nothing about reality

Acceptance conditions for Phase 6:
- Retrieval results always cite ledger sources.
- No retrieval returns paraphrase-as-truth.
- Qdrant can fail without breaking reality.
- Redis can be wiped without changing reality.

---

## 7) IMPLEMENT TOOL-REQUEST PROTOCOL (LLM ASKS QUESTIONS)
This phase makes tools what you said they are: questions/requests, not extra writers.

### 7.1 Implement Engine 7 tool request schema
- LLM can output tool requests in a strict format
- System parses tool requests mechanically (shape only)
- Tool requests are routed to retrieval and return retrieval packs

### 7.2 Implement bounded tool loop at beat boundary
- During a beat:
  - LLM may request retrieval
  - system returns excerpts
  - LLM may request again (bounded count)
  - then LLM must output Proposed Bundle or NoWrite
- No mid-utterance tool loops
- Everything stays inside the beat boundary

Acceptance conditions for Phase 7:
- Tool requests do not write reality.
- Tool requests cannot bypass visibility.
- Tool loop is bounded and ends in either a bundle or silence.
- The orchestrator never invents a tool request “because it seems needed”.

---

## 8) IMPLEMENT SCENE ANCHOR + REHYDRATION (TOKEN LIMITS)
This phase prevents drift and “forgetting” without meta narration.

### 8.1 Implement token budget monitor (mechanical)
- Track context size
- Trigger rehydration near exhaustion
- No semantic triggers

### 8.2 Implement Scene Anchor Pack caching rules
- Send once
- Reintroduce only when:
  - near context exhaustion OR
  - explicit scene change occurs

### 8.3 Implement Rehydration Pack (atomic + invisible)
- Built only at beat boundaries
- Must fully complete or the beat cannot proceed
- If it fails, retry until it succeeds (as per locked rules)
- Natural language only (no state vars)
- Must include:
  - grounding scene view
  - physical continuity replay snippet (binding continuity)
  - optional derived non-authoritative summaries with provenance

Acceptance conditions for Phase 8:
- No “rehydrating…” appears in the stream.
- Rehydration never happens mid-action.
- Rehydration pack is natural language only.
- If rehydration fails, system does not proceed with partial context.

---

## 9) IMPLEMENT CAPSULES (PEOPLE CONTINUITY) AS TEXT EVIDENCE
This phase supports many people without turning into a simulation.

### 9.1 Define capsule schema as text sections (contract-driven)
- SOURCE_EXCERPTS section: verbatim excerpts + ledger references
- OPTIONAL_DERIVED section: non-authoritative, provenance required

### 9.2 Implement capsule assembly (ledger-backed)
- Capsules are built from:
  - retrieval results
  - person’s prior written evidence
- Capsules are pulled:
  - on demand via tool request
  - when a person appears (policy-driven, not semantic “importance”)

### 9.3 Enforce identity continuity
- Capsule content is used to maintain continuity, not to invent biography
- Mood/emotion continuity is maintained through written evidence and capsule retrieval, not meters

Acceptance conditions for Phase 9:
- Capsules never contain invented SOURCE_EXCERPTS.
- Capsules can be regenerated (cache loss is safe).
- People reappearing feel continuous because evidence is retrieved, not because of hidden state.

---

## 10) PLUG IN THE REAL LLM WRITER (INVOCER IDENTITY + PROMPT PACKS)
This is where “the system becomes alive” while still obeying the constitution.

### 10.1 Implement invoker identity wrapper
- LLM’s “user” is the Invoker, not George
- Operator input is passed as raw content, not as privileged “director instruction”

### 10.2 Create prompt packs as versioned artifacts
- Prompts are part of the system, versioned and testable
- Prompts must encode:
  - must-not rules (no invention, no time skip, no director)
  - tool request format
  - silence allowed
  - rendering constraints (if renderer uses LLM)

### 10.3 Writer output contract
- LLM must output one of:
  - ToolRequest
  - ProposedWriteBundle
  - NoWrite

### 10.4 Write acceptance remains structural
- The system does not rewrite LLM outputs
- It accepts/rejects bundles structurally
- Failure is explicit

Acceptance conditions for Phase 10:
- LLM can request retrieval through tools.
- LLM can output NoWrite and nothing is committed.
- When LLM writes, it writes through bundles, committed atomically.
- No “assistant meta” leaks into the stream.

---

## 11) IMPLEMENT PROJECTION / RENDERING TO MATCH YOUR “REALITY ON SCREEN” INTENT
This phase focuses on lived experience presentation.

### 11.1 Rendering rules are strict
- VOICE is objective second-person prose (as per your direction)
- PEOPLE blocks have labeled headers
- USER blocks are verbatim and unlabeled
- Renderer never creates facts
- Renderer never fills gaps

### 11.2 Rendering selection respects knowledge boundaries
- What is shown depends on what the viewer is allowed to know
- Pocket is separate channel and never intrudes as popups

Acceptance conditions for Phase 11:
- The stream feels like a continuous perceptual stream, not a chat UI.
- Rendering never “patches” reality.
- Knowledge leaks do not occur through projection.

---

## 12) ADD REBECCA PACKS AND OTHER CHARACTER PROFILES (PAYLOAD LAYER)
This is intentionally late because it should ride on stable physics.

### 12.1 Rebecca pack integration points
Rebecca documents feed into:
- Capsule schema/assembly (Engine 6)
- Prompt packs (Engine 9)
- Boundary behaviors (within LLM writer behavior, not runtime mechanics)

### 12.2 Explicitly maintain the separation
- Rebecca packs define behavior and constraints for that agent
- They do not alter:
  - ledger physics
  - time physics
  - knowledge boundary rules
  - atomicity/idempotency
  - rehydration mechanics

Acceptance conditions for Phase 12:
- Rebecca behaves consistently with her packs.
- Rebecca can refuse/ignore/act independently as allowed.
- No system-level mechanics change is required to add her.

---

## 13) EXPAND TO “EVERYONE ELSE” (POPULATION) WITHOUT BECOMING A SIMULATION
This phase grows the world without hidden ticking processes.

### 13.1 Population instantiation policy (layer policy, not engine rewrite)
- Add new people only through written events
- Parallel personal stories exist only when written, not simulated

### 13.2 Off-screen events as writing opportunities
- World can write events at milestones/opportunities
- World cannot run hidden background simulation

Acceptance conditions for Phase 13:
- The world can add people and events without a simulation loop.
- Off-screen does not become a hidden tick system.
- Everything remains text evidence.

---

## 14) CONTRACT TESTS + CI AS PERMANENT ENFORCEMENT (NON-RUNTIME)
This is what prevents drift and future regressions.

### 14.1 Build the contract test suite around the constitution
Tests must enforce:
- append-only reality
- atomic bundles
- idempotency
- explicit failure over fabrication
- silence valid
- rendering never creates facts
- storage ≠ knowledge
- visibility boundaries
- tools return excerpts only
- rehydration invisibility + beat-boundary + atomic completion
- no director logic / no gameplay / no user-centric optimization
- caches removable; indexes not authority

### 14.2 Integrate into CI
- Every merge must pass these tests
- A failing test is a constitutional violation, not a “bug to fix later”

Acceptance conditions for Phase 14:
- Any violation of non-negotiables breaks CI.
- No one can “refactor around” the constitution without failing tests.

---

## 15) FULL USE OF THE SYSTEM (WHAT “DONE” MEANS IN YOUR TERMS)
The system is in “full use” when:
- You can live inside the UI perceptual stream continuously.
- Time advances consistently without narrative skips.
- Rehydration happens invisibly and reliably.
- Knowledge boundaries hold (no leaks).
- Tools work as questions/requests and return ledger-backed excerpts.
- Capsules keep identity continuous at scale.
- The system is non-directorial and non-user-centric in behavior, not just in docs.
- All constitutional contract tests pass continuously under real usage.

---

## OUTPUTS OF THIS PLAN (ARTIFACTS YOU WILL END UP WITH)
- A running UI you can use from early on (not a dev-only shell).
- A durable ledger-based reality store with atomic, idempotent commits.
- A tool-request retrieval loop with Qdrant + ledger excerpt enforcement.
- Scene anchor + rehydration pack system that preserves continuity.
- Capsule system for people continuity without meters/state.
- A rendering pipeline that matches your “lived reality stream” intent.
- Contract tests that enforce the constitution and prevent drift.

# END PLAN