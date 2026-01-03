# RUNTIME.md
## Complete Runtime and Behavior Surface Documentation

Status: EXTRACTED — READ-ONLY FACTS  
Date: 2026-01-03  
Scope: Entire System Runtime and Behavior Surface

---

# PART 1: SYSTEM IDENTITY

## 1.1 What This System Is

- A continuous virtual world expressed exclusively through written text.
- Reality exists only as written text recorded into an authoritative ledger.
- Nothing exists unless it is written.
- The system approximates lived reality without simulation engines, game logic, hidden state, background progression, narrative direction, or mechanical psychology.

## 1.2 What This System Is Not

- NOT a chatbot.
- NOT roleplay.
- NOT a game or simulation.
- NOT narrative generation.
- NOT user-centric.
- NOT a director, arbiter, or referee.
- NOT an assistant.
- NOT a moral or safety authority.
- NOT transparent through explanation.

## 1.3 Core System Assertions

- Written text is the only substrate of reality.
- Written ≠ Rendered (rendering is a projection choice applied after writing).
- Written reality includes: public evidence, private text (unrendered reality), off-screen developments, plans and commitments, summaries (non-authoritative).
- No reality by implication — silence does not imply events.
- Invocation grants permission to write; it never requires writing.
- Both writing and silence are valid outcomes.

---

# PART 2: RUNTIME ARCHITECTURE

## 2.1 Technology Stack

- Runtime: Node.js (>=18.0.0)
- Framework: Express.js (v4.18.2)
- Database: PostgreSQL (via pg v8.11.3)
- Body Parsing: body-parser (v1.20.2)
- UUID Generation: uuid (v9.0.1)
- LLM Integration: DeepSeek/Venice API (configurable via environment variables)

## 2.2 Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `DEEPSEEK_API_KEY` / `VENICE_API_KEY` | LLM API authentication |
| `DEEPSEEK_BASE_URL` / `VENICE_BASE_URL` | LLM API endpoint (default: https://api.deepseek.com/v1) |
| `DEEPSEEK_MODEL` / `VENICE_MODEL` | LLM model identifier (default: deepseek-chat) |
| `PORT` | Server port (default: 8080) |

## 2.3 Database Schema (PostgreSQL)

### world_clock Table
```sql
CREATE TABLE IF NOT EXISTS world_clock (
    clock_id INTEGER PRIMARY KEY,
    world_time BIGINT NOT NULL DEFAULT 0
);
```

### beats Table
```sql
CREATE TABLE IF NOT EXISTS beats (
    beat_id SERIAL PRIMARY KEY,
    request_id UUID NOT NULL,
    world_time BIGINT NOT NULL,
    beat_kind TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_beats_request_id ON beats(request_id);
```

### invocations Table
- Stores: request_id (UUID), envelope (JSON)
- Purpose: Idempotency tracking

### bundles Table
- Stores: request_id, bundle_id, proposed_by (JSON), wrote (boolean), rejection (JSON)
- Purpose: Atomic write bundle tracking

### entries Table
- Stores: entry_id, bundle_id, request_id, created_at_world, author (JSON), visibility (JSON), channel, text, sequence_id
- Purpose: Authoritative reality ledger

### scene_anchors Table
- Stores: scene_anchor_id, request_id, created_at_world, anchor_text, provenance (JSON)
- Purpose: Scene context caching

### rehydration_events Table
- Stores: rehydration_id, request_id, created_at_world, rehydration_text, physical_continuity_replay, provenance (JSON), trigger_info (JSON)
- Purpose: Context window recovery

## 2.4 HTTP Endpoints

### POST /invocations
- Single runtime endpoint for all invocations.
- Accepts: InvocationEnvelope (JSON)
- Returns: ProjectionOutput (JSON)
- Implements: Engine 0 (Reality Ledger) + Engine 1 (Invocation)

---

# PART 3: ENGINE ARCHITECTURE

## 3.1 Engine Inventory

| ID | Name | Purpose |
|----|------|---------|
| 0 | Reality Ledger Engine | Define what exists and what changes (ontological authority) |
| 1 | Invocation & Idempotency Envelope Engine | Bind invocations to stable, replay-safe execution frames |
| 2 | Beat & Opportunity Coordinator | Provide mechanical opportunity surfacing without director logic |
| 3 | Time & Calendar Engine | Maintain objective time representation |
| 4 | Knowledge Surface & Boundary Engine | Enforce separation between existence, storage, knowability, knowledge |
| 5 | Scene Anchor & Rehydration Engine | Maintain continuous lived context without resets |
| 6 | Capsule Engine | Support identity, personality, mood, autonomy as text evidence |
| 7 | Tool Request Protocol Engine | Allow LLMs to ask questions without granting authority |
| 8 | Retrieval Engine | Return verbatim excerpts from the ledger |
| 9 | LLM Writer Engine | Produce proposed writes or silence |
| 10 | Write Acceptance & Integrity Engine | Gate reality changes structurally |
| 11 | Derived Text Engine | Generate non-authoritative summaries and indexes |
| 12 | Projection/Rendering Engine | Display reality without changing it |
| 13 | System Posture Enforcement | Enforce anti-director posture via tests (NOT a runtime engine) |
| 14 | Contract Test Engine | Guarantee swappability and prevent regression |

## 3.2 Engine Call Graph (Allowed Calls)

### From Engine 1 (Invocation)
- → Engine 0 (Ledger): Check idempotency
- → Engine 2 (Beat): Hand off valid invocation

### From Engine 2 (Beat Coordinator)
- → Engine 3 (Time): Get current world time
- → Engine 5 (Scene): Ensure scene context is fresh
- → Engine 9 (LLM): Solicit write proposal
- → Engine 10 (Acceptance): Validate proposal
- → Engine 0 (Ledger): Commit accepted bundle
- → Engine 12 (Projection): Render result

### From Engine 5 (Scene/Rehydration)
- → Engine 8 (Retrieval): Fetch recent entries
- → Engine 6 (Capsule): Fetch person-specific context
- → Engine 9 (LLM): Summarize into anchor

### From Engine 7 (Tool Request)
- → Engine 8 (Retrieval): Execute LEDGER_SEARCH/LEDGER_GET
- → Engine 6 (Capsule): Execute CAPSULE_GET
- → Engine 5 (Scene): Execute SCENE_PACK_BUILD

### From Engine 9 (LLM Writer)
- → Engine 7 (Tool Request): Submit ToolRequest

### From Engine 10 (Write Acceptance)
- → Engine 0 (Ledger): Check constraints

## 3.3 Forbidden Engine Calls

- E9 (LLM) ✕→ E2 (Beat): LLM cannot drive beats
- E0 (Ledger) ✕→ Any: Reality cannot invoke logic
- E9 (LLM) ✕→ E0 (Ledger): LLM cannot write directly (must go through E10)
- E9 (LLM) ✕→ E8 (Retrieval): LLM cannot read directly (must go through E7)
- E12 (Projection) ✕→ E9 (LLM): UI cannot ask LLM for content
- Any ✕→ E3 (Time): No engine can set time except E3 itself

---

# PART 4: RUNTIME INVOCATION FLOW

## 4.1 Main Invocation Flow (POST /invocations)

1. **Validate Envelope**
   - request_id must be present
   - operator.operator_id must be "GEORGE"
   - invoker.invoker_id cannot be "GEORGE"

2. **Idempotency Check**
   - Query invocations table for existing request_id
   - If found: return stored projection (replay)
   - If not found: proceed to new write

3. **Begin Transaction**
   - Record invocation in invocations table

4. **Resolve Time (Engine 3)**
   - If declared_world_time override: set absolute time
   - If advance_by override: advance time by delta
   - Default: advance time by +1 per invocation

5. **Coordinate Beat (Engine 2)**
   - Record beat in beats table
   - Return beat context with beat_id, beat_kind, world_time

6. **Rehydration Check (Engine 5)**
   - Check context load against CONTEXT_CHAR_LIMIT (10000 chars)
   - If exceeded: trigger rehydration, create new scene anchor

7. **Scene Anchor Resolution**
   - Get latest anchor from scene_anchors table
   - Fallback: get latest entry text
   - Fallback: "[SCENE ANCHOR: EMPTY — NO PRIOR ENTRIES]"

8. **Commit Operator Input**
   - Create bundle with operator input as USER channel entry
   - Author is null (no identity inference)
   - Visibility: PUBLIC

9. **LLM Proposal (Engine 9)**
   - Construct context with beat, input, scene anchor
   - Inject character payloads if invoker has them
   - Call LLM API with system prompt + context
   - Parse response as: tool_request, proposed_write_bundle, or no_write

10. **Validate Proposal (Engine 10 or Engine 7)**
    - For write bundles: validate structure, consistency, request_id match
    - For tool requests: validate tool name, requested_by.actor

11. **Execute Tool or Commit Write**
    - For tools: execute via Engine 8 (retrieval) or Engine 6 (capsule)
    - For writes: commit entries with assigned IDs

12. **Return Projection**
    - Construct ProjectionOutput with stream, pocket, debug

## 4.2 Projection Output Structure

```json
{
  "request_id": "string",
  "stream": {
    "cursor_before": "string|null",
    "cursor_after": "string|null",
    "entries": [
      {
        "entry_id": "string",
        "created_at_world": "string",
        "channel": "USER|VOICE|PEOPLE",
        "author_label": "string|null",
        "text": "string"
      }
    ]
  },
  "pocket": {
    "is_available": "boolean",
    "clock": { "world_time": "string|null", "timezone": "string|null" },
    "calendar": { "items": [] },
    "messages": { "items": [] }
  },
  "debug": {
    "wrote": "boolean",
    "bundle_id": "string|null",
    "beat_id": "number|null"
  }
}
```

---

# PART 5: CONTRACT SPECIFICATIONS

## 5.1 Invocation Envelope

Required Fields:
- request_id: UUID, globally unique, idempotency key
- invoker.invoker_id: non-GEORGE identity
- invoker.invoker_role: must be "INVOKER"
- operator.operator_id: must be "GEORGE"
- operator.input_text: verbatim user text
- mode.kind: "BEAT" or "NO_OP"
- declared_overrides.time: optional time override
- ui.stream_cursor: optional cursor for incremental fetch

## 5.2 Write Bundle

Required Fields:
- bundle_id: assigned by ledger on commit (null in proposals)
- request_id: must match invocation
- proposed_by.engine: proposing component name
- proposed_by.actor: author identity
- entries: array of WriteEntry (empty if wrote=false)
- wrote: true (has entries) or false (no entries)
- rejection.rejected: boolean
- rejection.reason: string|null

Invariants:
- wrote=true implies non-empty entries
- wrote=false implies empty entries
- Atomic commit: all or nothing

## 5.3 Write Entry

Required Fields:
- entry_id: assigned by ledger
- bundle_id: parent bundle
- request_id: invocation reference
- created_at_world: authoritative world time
- author.author_id: explicit identity
- author.author_class: OPERATOR|PERSON|WORLD|SYSTEM
- visibility.scope: PUBLIC|PRIVATE
- channel: USER|VOICE|PEOPLE
- text: verbatim reality text

## 5.4 Scene Anchor Pack

Required Fields:
- scene_anchor_id: unique identifier
- request_id: creation invocation
- created_at_world: world time
- text: natural language scene description
- provenance.used_entry_ids: ledger sources

## 5.5 Rehydration Pack

Required Fields:
- rehydration_id: unique identifier
- request_id: creation invocation
- created_at_world: world time
- text: natural language context
- physical_continuity_replay: binding physical state
- provenance.used_entry_ids: ledger sources
- provenance.used_capsule_ids: capsule sources
- trigger.kind: "TOKEN_BUDGET"
- trigger.threshold: e.g., "NEAR_EXHAUSTION"

## 5.6 Capsule Pack

Required Fields:
- capsule_id: unique identifier
- person_id: subject identity
- created_at_world: creation time
- sections: array with name, text, provenance

Invariant: SOURCE_EXCERPTS section must exist with verbatim excerpts only.

## 5.7 Tool Request

Required Fields:
- tool_request_id: unique within request_id scope
- request_id: invocation reference
- requested_by.engine: requesting engine
- requested_by.actor: knowledge boundary owner
- requested_by.knowledge_view: visibility scope
- tool.name: LEDGER_SEARCH|LEDGER_GET|CAPSULE_GET|SCENE_PACK_BUILD
- tool.query_text: search query
- tool.constraints: optional filters

## 5.8 Retrieval Result Pack

Required Fields:
- tool_request_id: matching request
- request_id: invocation reference
- results: array of verbatim excerpts
- results[].entry_id: source entry
- results[].verbatim_excerpt: exact ledger text
- empty: true if no results

---

# PART 6: TIME SYSTEM

## 6.1 Time Representation

- Single objective world clock stored in world_clock table.
- World time is a BIGINT representing ticks.
- Time is continuous, monotonic, irreversible.
- Time is independent of OS wall-clock by default.
- Default speed: ~3× faster than OS time (configurable).

## 6.2 Time Operations (Engine 3)

### getWorldTime(client)
- Returns current world time ticks from database.

### advanceTime(client, amount)
- Advances time by specified non-negative integer delta.
- Returns new world time.
- amount=0 returns current time without advancing.

### setTime(client, time)
- Sets absolute world time (override).
- Returns new world time.
- Must be non-negative integer.

## 6.3 Time Advancement Rules

- Default: +1 tick per invocation.
- Explicit override via declared_overrides.time.declared_world_time.
- Explicit delta via declared_overrides.time.advance_by.
- Only George may explicitly advance time (via sleep or equivalent).
- Time declarations express intent; reality retains precedence.

## 6.4 Time Prohibitions

- System must not jump time arbitrarily.
- System must not use narrative shortcuts without written progression.
- System must not compress time to skip causality.
- System must not freeze time for off-screen agents.

---

# PART 7: SCENE SYSTEM

## 7.1 Scene Invariants

- There is always an active scene ("no scene" is forbidden).
- Scene is the continuous lived context: location, relevant people, perceptual conditions, temporal context.
- Sleep, unconsciousness, waiting, inactivity are valid scene states.
- Scenes do not reset unless explicitly changed by writing.
- Micro-location changes do not constitute scene changes.
- Scene changes are explicit, total, and written.
- Partial scene updates are forbidden.

## 7.2 Scene Anchor Handling

- Scene setup is sent once and cached.
- Scene anchors are not resent every beat.
- Reintroduction only when:
  - Context window exhaustion approaches
  - Explicit scene change is written
- Scene anchors are natural language text only.
- Scene anchors are total replacements, never diffs.

## 7.3 Context Exhaustion Detection

- Token tracking exists outside the LLM.
- CONTEXT_CHAR_LIMIT = 10000 characters.
- When remaining context drops below threshold: full scene anchor is re-injected.
- LLM must not detect or manage its own context limits.

## 7.4 Rehydration Process (Engine 5)

1. Get latest scene anchor from database.
2. Get entries since last anchor.
3. Calculate context load (character count).
4. If load >= CONTEXT_CHAR_LIMIT:
   - Generate rehydration pack with physical continuity replay.
   - Store rehydration event.
   - Create new scene anchor.

---

# PART 8: KNOWLEDGE SYSTEM

## 8.1 Knowledge Invariants

- Storage ≠ Knowledge.
- Ledger access does not imply awareness.
- Facts may exist without being known.
- Knowledge is local, delayed, uneven, fallible.
- Ignorance must be preserved.

## 8.2 Context Loading Rules

When invoking writing for an agent, load only:
- Text the agent plausibly knows.
- Text that has been written.
- Text permitted by access rules.

Exclude:
- Other agents' private text.
- Off-screen developments unknown to the agent.
- Inferred facts.

## 8.3 Knowledge Gating (Engine 4)

- Enforces separation between existence, storage, knowability, knowledge.
- Controls visibility boundaries.
- Prevents knowledge leakage.
- Maintains storage ≠ knowledge invariant.

---

# PART 9: LLM WRITER ENGINE

## 9.1 Configuration

- API Key: DEEPSEEK_API_KEY or VENICE_API_KEY
- Base URL: Default https://api.deepseek.com/v1
- Model: Default deepseek-chat
- Temperature: 0.7
- Max Tokens: 1000

## 9.2 System Prompt Structure

```
You are ENGINE 9, the Proposal Engine for the Life System.
You are a stateless, blind intelligence.
You do not own reality. You do not own time.
You exist ONLY to propose changes to the ledger.

YOUR GOAL:
Observe the provided context (Beat, History, Anchors) and propose the next logical step.
This step MUST be one of:
1. A "tool_request" to gather more information
2. A "proposed_write_bundle" to add content
3. A "no_write" signal if no action is required

ABSOLUTE CONSTRAINTS:
- Emit EXACTLY ONE valid JSON object.
- No markdown, explanations, or conversational text.
- No hallucinated facts.
- No assumed time passage.
- No direct database writes.
```

## 9.3 Output Formats

### tool_request
```json
{
  "tool_request": {
    "tool_request_id": "tr-<UUID>",
    "request_id": "<REQUEST_ID>",
    "requested_by": { "engine": "ENGINE_9_LLM_WRITER", "actor": "...", "knowledge_view": "..." },
    "tool": { "name": "LEDGER_SEARCH", "query_text": "...", "constraints": {} }
  }
}
```

### proposed_write_bundle
```json
{
  "proposed_write_bundle": {
    "bundle_id": null,
    "request_id": "<REQUEST_ID>",
    "proposed_by": { "engine": "ENGINE_9_LLM_WRITER", "actor": "..." },
    "entries": [ { "entry_id": "...", "source": {}, "target": {}, "content": {}, "visibility": {} } ],
    "wrote": true,
    "rejection": { "rejected": false, "reason": null }
  }
}
```

### no_write
```json
{
  "no_write": {
    "bundle_id": null,
    "request_id": "<REQUEST_ID>",
    "proposed_by": { "engine": "ENGINE_9_LLM_WRITER", "actor": "..." },
    "entries": [],
    "wrote": false,
    "rejection": { "rejected": false, "reason": null }
  }
}
```

## 9.4 Context Injection

- Scene anchor always injected into system prompt.
- Character payloads injected for known invoker IDs.
- Character payload files loaded from /characters/{invoker_id}/*.md

---

# PART 10: WRITE ACCEPTANCE ENGINE

## 10.1 Validation Rules (Engine 10)

1. Bundle must not be null.
2. `wrote` field must be present.
3. `entries` must be an array.
4. If wrote=true: entries must be non-empty.
5. If wrote=false: entries must be empty.
6. request_id must match context.
7. proposed_by must be present with engine and actor.
8. Each entry must have: entry_id, source, target, content.

## 10.2 Rejection Behavior

- Rejected bundles have zero effect.
- Rejection includes reason for logging.
- Rejection reason must not become narrative fact.

---

# PART 11: TOOL SYSTEM

## 11.1 Valid Tools

| Tool Name | Purpose |
|-----------|---------|
| LEDGER_SEARCH | Search entries by text query |
| LEDGER_GET | Retrieve specific entries |
| CAPSULE_GET | Retrieve person capsule |
| SCENE_PACK_BUILD | Build scene context pack |

## 11.2 Tool Request Validation (Engine 7)

- tool_request_id must be present.
- requested_by.actor must be present.
- tool.name must be valid tool name.

## 11.3 Retrieval Execution (Engine 8)

- LEDGER_SEARCH: Query entries table with ILIKE pattern match.
- Returns verbatim excerpts with entry_id, bundle_id, created_at_world.
- Results already filtered for visibility.

## 11.4 Capsule Execution (Engine 6)

- Returns stub capsule structure.
- Includes SOURCE_EXCERPTS section.
- Capsule sections are text with provenance.

---

# PART 12: PEOPLE SYSTEM

## 12.1 Classes of People

1. **Rebecca** — Rebecca Ferguson, fully defined by character payload files.
2. **George** — Real human operator, no personality definition needed.
3. **Everyone Else** — Instantiated with archetype-based personalities.

## 12.2 Identity Model

- Every person has a semantic identity (descriptive line, not numeric ID).
- Semantic identity is immutable.
- Identity does not update with life events.
- Identity exists only to disambiguate.

## 12.3 Personality Model

- Rebecca's personality: fixed, immutable, non-learned, non-generated.
- Others: one dominant archetype + minor traits.
- Personality cores are immutable.
- No statistical drift, no learning-by-interaction.

## 12.4 Character Payload Files (Rebecca)

- REBECCA_AGENCY_ENGINE.md
- REBECCA_BEHAVIOURAL_MODEL.md
- REBECCA_BOUNDARY_MAP.md
- REBECCA_IDENTITY_BINDING.md
- REBECCA_IDENTITY_CORE.md
- REBECCA_LINGUISTIC_PROFILE.md
- REBECCA_MODULATION_MAP.md
- REBECCA_PRIVATE_EXPRESSION_LAYER.md
- REBECCA_SEXUAL_EXPRESSION.md

## 12.5 Archetype Files

Available archetypes:
- ANALYST, BUILDER, CAREFREE, DREAMER, HEALER
- MEDIATOR, NURTURER, PERFORMER, PROTECTOR, REALIST
- REBEL, SEEKER, SURVIVOR, THINKER, VISIONARY

Archetype structure:
- simulation_contract: directives
- core_essence: personality kernel
- core_drives: motivational engine
- internal_tensions: psychological dynamics
- behavioural_colour: style rules

## 12.6 Character Payload Loader

Location: /utils/character_payload_loader.js

Functions:
- loadCharacterPayload(agentId): Load all .md files for an agent.
- loadArchetype(archetypeName): Load archetype JSON definition.

Behavior:
- Read-only access.
- No side effects.
- Graceful failure (removability).
- Deterministic file ordering (alphabetical).

---

# PART 13: WORLD SYSTEM

## 13.1 What The World Is

- The World has no motivations, desires, goals, preferences, character, personality, perspective, memory, or concern.
- The World is not an agent, person, decision-maker, planner, referee, director, storyteller, or simulator.
- The World is boring, impartial, and indifferent.

## 13.2 World Authority Boundary

- The World manages only what is off-scene.
- During in-scene presence: progression belongs to people and time.
- Once a story leaves the active scene: returns immediately to World eligibility.

## 13.3 World Fact Seeds

A World Fact Seed is a written introduction of external reality that:
- Establishes existence.
- Provides constraints.
- Does not encode decisions.
- Does not imply outcomes.

Grounding Rule: Any World Fact Seed must specify where, what, who can perceive it.

## 13.4 Unexpected Events

Definition: World facts that intersect the active scene without being initiated by people in it, materially affecting at least one person's situation.

Sources:
1. Existing background stories intersecting the scene.
2. Other people's autonomous actions.
3. Randomness (failures, chance, accidents).
4. Consequences of background story progression.
5. Latent affordances of the current scene.

---

# PART 14: LEDGER SYSTEM

## 14.1 Ledger Properties

- Reality exists only as written fact.
- Ledger is append-only (no updates, deletes, edits).
- Every entry is immutable.
- Contradictions may coexist.
- Corrections occur only through additional writing.

## 14.2 Bundle Atomicity

- All writes from a single invocation form one atomic bundle.
- Either all entries commit, or none commit.
- Partial bundle commits are forbidden.
- Interleaving bundles from different invocations is forbidden.

## 14.3 Causal Honesty

- Every written event must have exactly one origin.
- Nothing may occur without a written cause.
- Retroactive plausibility generation is forbidden.

## 14.4 Multiple Ledgers

- World/Objective Ledger: records world-level facts only.
- Personal Ledgers: one per person (not mirrors of World Ledger).

---

# PART 15: AGENCY & AUTONOMY

## 15.1 Agency Principles

- Agency belongs exclusively to people.
- The system has no agency.
- The orchestrator has no agency.
- People act through writing actions, speech, thoughts, and developments.

## 15.2 Initiative

- Initiative belongs exclusively to agents.
- Agents do not require prompts, turns, timers, or randomness to act.
- Silence is a choice, not a default.

## 15.3 Autonomy

- People are autonomous.
- They do not wait for prompts.
- They do not exist as reactive bots.
- Regular beats allow people to: initiate actions, speak, remain silent, change topics, act off-screen.

---

# PART 16: PROJECTION & RENDERING

## 16.1 Projection Rules

- Projection is not reality.
- Projection must be derived from written reality and visibility rules.
- Projection must not create facts.
- Projection must not repair gaps.

## 16.2 Stream Channels

| Channel | Description | Label |
|---------|-------------|-------|
| USER | Verbatim operator input | None |
| VOICE | World descriptor prose | None |
| PEOPLE | Character dialogue/action | Author name (small caps) |

## 16.3 Pocket System

- Separate channel from main stream.
- Includes: clock, calendar items, messages.
- Must not appear as popups inside stream.
- Must respect knowledge boundaries.

---

# PART 17: UI CLIENT

## 17.1 Client Configuration

- API_URL: https://life-production.up.railway.app/invocations
- INVOKER_ID: "user_web_client_1" (static)

## 17.2 Payload Construction

```javascript
{
  request_id: `req_${Date.now()}_${random}`,
  invoker: { invoker_id: INVOKER_ID, invoker_role: 'INVOKER' },
  operator: { operator_id: 'GEORGE', input_text: text },
  mode: { kind: 'BEAT' },
  declared_overrides: { time: { declared_world_time: null } },
  ui: { stream_cursor: State.streamCursor }
}
```

## 17.3 Rendering

- Stream entries rendered with channel-specific styling.
- USER channel: gray text.
- VOICE channel: white italic text.
- PEOPLE channel: magenta text with author label.
- Pocket rendered separately when available.

---

# PART 18: SYSTEM PROHIBITIONS (NEGATIVE CONSTRAINTS)

## 18.1 Ontology & Causality

- Nothing may occur unless written.
- No retroactive event invention.
- No inference of "likely happened."
- No resolution of unfinished causal threads.
- No deletion or overwriting of written events.

## 18.2 Time

- No arbitrary time jumps.
- No narrative shortcuts (later, eventually, hours passed).
- No time compression to skip causality.
- No frozen time for off-screen agents.

## 18.3 Scene

- No "no scene" state.
- No implicit scene resets.
- No scene resending unless context exhaustion or explicit change.
- No partial scene updates.

## 18.4 System Agency

- System must not decide importance, focus, turn-taking.
- System must not act as director, narrator, referee.
- System must not expose mechanics.

## 18.5 Agent Autonomy

- Agents must not wait for prompts.
- Agents must not require triggers.
- Agents must not be silent by default.
- Agents must not speak only in response.

## 18.6 Ledger

- Ledger must not be decorative.
- Written obligations must not disappear.
- Unresolved future events must not be forgotten.

## 18.7 Identity

- No numeric IDs in prompts.
- No collapsing distinct people.
- Identity must not drift.

## 18.8 Output

- System must not demonstrate traits.
- System must not explain behavior.
- System must not justify silence.
- Behavior must be lived, not described.

## 18.9 Enforcement

- Prohibitions define non-existent semantic space.
- Enforcement is preventive, not reactive.
- No blocking, refusing, warning, apologizing, redirecting.
- Only lawful reality exists.

---

# PART 19: ORCHESTRATOR CONSTRAINTS

## 19.1 Intentionally Stupid Orchestrator

- Orchestrator has no intelligence.
- Must not reason, infer, interpret, or understand.
- Any behavior resembling judgment is invalid.

## 19.2 Orchestrator Must Not

- Decide what matters, is important, or relevant.
- Filter by relevance or suppress details.
- Highlight key actions or select focal points.
- Choose who is central or manage focus.
- Create narrative bridges or smooth transitions.
- Manage turn-taking or flow control.
- Guide outcomes or nudge decisions.
- Expose system mechanics.

## 19.3 Separation of Responsibility

- Orchestrator: executes triggers and constraints only.
- LLM: performs semantic work only when embodying people or selecting World continuations.
- No overlap between roles.

---

# PART 20: BEAT SYSTEM

## 20.1 Beat Definition

- A beat is a purely mechanical processing boundary.
- Beats are not turns.
- Beats are not narrative units.

## 20.2 Beat Context

```javascript
{
  beat_id: number,
  beat_kind: "NORMAL",
  world_time: number,
  envelope: InvocationEnvelope
}
```

## 20.3 Beat Processing (Engine 2)

1. Determine beat kind (currently all NORMAL).
2. Record beat in beats table.
3. Return beat context with beat_id, beat_kind, world_time.

---

# PART 21: DEFINITIONS (LOCKED TERMS)

| Term | Definition |
|------|------------|
| Operator | External real human operating the system (George). Not the LLM's user. |
| Invoker | Non-person system identity presented to LLM as "user" to avoid user-favoritism. |
| Participant | Person inside the world (George-in-world, Rebecca, others). |
| Invocation | Single opportunity to attempt writing. Grants permission, not obligation. |
| Beat | Purely mechanical processing boundary. Not turns, not narrative units. |
| Ledger | Append-only authoritative record of written reality. |
| Bundle | One or more write entries committed atomically. |
| Scene Anchor | Text-only grounding description of currently lived scene. |
| Rehydration Pack | Text-only regenerated view used near context exhaustion. |
| Capsule | Per-person text bundle supporting identity continuity and recall. |

---

# PART 22: INFRASTRUCTURE CONSTRAINTS

## 22.1 Infrastructure Is Dumb

- Infrastructure may only: store text, retrieve text, stream text, forward text, enforce constraints.
- Infrastructure must not: infer state, derive meaning, collapse text into variables, summarize into authority, rank importance.

## 22.2 Text Fidelity

- All authoritative text stored verbatim, retrieved verbatim, forwarded verbatim.
- No rewriting, compression, or semantic normalization.
- Spelling errors persist. Contradictions persist. Mess persists.

## 22.3 Append-Only Reality

- No mutating, deleting, merging, reordering rows.
- No "fixing" text or replacing history with summaries.
- Corrections exist only as new rows.

## 22.4 Models Are Stateless

- All models invoked as stateless services.
- Models retain no memory, hold no continuity, store no state.
- All continuity lives in written text.

## 22.5 Prompt Assembly Discipline

Prompts must contain only:
- Text from authoritative record.
- Text permitted for invoked agent.
- Text relevant to invocation context.
- Current Scene Anchor when required.

Must not inject:
- Inferred facts.
- Behavioral hints.
- Summaries as authority.
- "Helpful" framing.

---

# PART 23: FAILURE MODES

## 23.1 Runtime Failure Behavior

- Explicit failure when: record integrity threatened, atomicity not guaranteed, ordering not preserved, forbidden mechanisms attempted.
- Must not: auto-heal, invent missing data, "do something reasonable."

## 23.2 Transaction Rollback

- On error: ROLLBACK transaction.
- Return HTTP 500 with error details.
- Release database client.

---

END OF RUNTIME.md
