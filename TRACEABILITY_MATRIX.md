# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md

## DOCUMENT HEADER

### # NON-NEGOTIABLE SYSTEM DECISIONS
**Engine owner:**
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE

**Justification (verbatim lines):**
# NON-NEGOTIABLE SYSTEM DECISIONS
STATUS: LOCKED
SCOPE: AUTHORITATIVE / IRREVERSIBLE
This file records decisions that MUST survive refactors, rewrites, assistants, and time.
These are NOT implementation details.
These are NOT suggestions.
These are NOT open to reinterpretation.

Anything not written here MUST NOT be assumed.

## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY

### ## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (where “memory surfaces / exposure / leakage” is implicated)
- ENGINE 13/14 (enforcement of prohibitions and non-user-centric posture)

**Justification (verbatim lines):**
## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY

### ### 1.1 Classes of People
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (because class determines knowledge/memory handling)
- ENGINE 9 — LLM WRITER ENGINE (because behavior must reflect class constraints)
- ENGINE 13/14 (enforcement)

**Justification (verbatim lines):**
### 1.1 Classes of People
- There are only three classes of people in the system:
  - The User (George)
  - Rebecca
  - Everyone else (world population)
- George is the only human user.
- George is NOT the user of the LLM.

### ### 1.2 George (The User)
**Engine owner:**
- ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE (operator input framing; request identity)
- ENGINE 9 — LLM WRITER ENGINE (must not treat George as its user)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (anti-user-privilege)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

**Justification (verbatim lines):**
### 1.2 George (The User)
• George is a real human being, not a character.
• George requires:
  – NO personality definition
  – NO memory model
  – NO trait assignment
• George is never treated as a system user by the LLM.
• The LLMs (DeepSeek, Venice) are used by the system, not by George.
• The system MUST NOT privilege George’s perspective, tone, or desires.
There is no multi-user access model.
There will never be another real human user.

### ### 1.3 Semantic Identity (All People)
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (identity continuity, behavior consistency)
- ENGINE 0 — REALITY LEDGER ENGINE (evidence is written record)
- ENGINE 8 — RETRIEVAL ENGINE (evidence access)
- ENGINE 9 — LLM WRITER ENGINE (behavior generation must respect evidence)

**Justification (verbatim lines):**
### 1.3 Semantic Identity (All People)
- Every person in the system MUST have semantic continuity.
- They MUST persist across scenes and time.
- They MUST have stable identity and memory surfaces.
- Their behavior MUST be consistent with prior written evidence.
- They cannot “reset.”
- They cannot “forget” unless forgetting is justified by written evidence.

### ### 1.4 Rebecca
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (identity, continuity, behavior constraints live in payload packs)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (private/public surfaces)
- ENGINE 9 — LLM WRITER ENGINE (Rebecca output behavior)
- ENGINE 14 — CONTRACT TEST ENGINE (drift prevention)

**Justification (verbatim lines):**
### 1.4 Rebecca
• Rebecca is Rebecca Ferguson, the Swedish actress.
• Rebecca is defined exclusively by:
  – REBECCA_BEHAVIOR.md
  – REBECCA_MEMORY_SURFACES.md
  – REBECCA_PRIVATE_LEDGER.md
• Any future assistant MUST treat these as authority.
• They MUST NOT invent personality traits, trauma, motivations, desires, or preferences not present in those documents.
• They MUST NOT “soften” her.
• They MUST NOT “optimize” her for George.
Rebecca has agency.
Rebecca may ignore George.
Rebecca may contradict George.
Rebecca may refuse.
Rebecca may initiate.
Rebecca may do nothing.

### ### 1.5 Everyone Else (The World)
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (identity continuity on reappearance)
- ENGINE 9 — LLM WRITER ENGINE (world population behaviors)
- ENGINE 0 — REALITY LEDGER ENGINE (evidence)
- ENGINE 13/14 (anti-prop enforcement)

**Justification (verbatim lines):**
### 1.5 Everyone Else (The World)
- Everyone else is “world population.”
- They MUST be treated as autonomous agents.
- They MAY be one-off or recurring.
- If they reappear, they MUST have semantic continuity.
- They MUST NOT be treated as props.
- They MUST have their own motivations and agency.
They may ignore George.
They may refuse George.
They may contradict George.

### ### 1.6 Emotions & Mood
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (mood/emotion persistence as text evidence)
- ENGINE 0 — LEDGER (events that justify changes)
- ENGINE 8 — RETRIEVAL (evidence pull)
- ENGINE 9 — LLM WRITER (behavior expression)

**Justification (verbatim lines):**
### 1.6 Emotions & Mood
- Emotions and mood MUST exist as part of each person.
- They MUST persist through time unless changed by events.
- They MUST be consistent with written history.
- Mood is not a “meter.”
- Mood is not a variable.
- Mood is semantic and expressed through behavior.

### ### 1.7 Memory
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (personal memory + effects)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (exposure/leakage rules)
- ENGINE 8 — RETRIEVAL ENGINE (evidence-backed memory retrieval)
- ENGINE 9 — LLM WRITER ENGINE (behavior must reflect memory)

**Justification (verbatim lines):**
### 1.7 Memory
- People MUST have memory.
- Memory MUST affect behavior and reactions.
- Memory MUST be consistent with prior written evidence.
- “Forgetting” MUST NOT occur unless justified by written evidence.
- People MAY misremember, but only as human plausibility, not as system convenience.
- People MUST NOT suddenly “know” things without exposure.
Memory is semantic.
Memory is not a key-value store.
Memory is not a database “field.”
Memory exists only as written evidence and retrieval surfaces.
They may be wrong.
They may lie.

### ### 1.8 Autonomy
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (autonomy as person property)
- ENGINE 9 — LLM WRITER ENGINE (silence/refusal/initiative)
- ENGINE 13/14 (enforcement against forced responses)

**Justification (verbatim lines):**
### 1.8 Autonomy
- People MUST be autonomous.
- They may refuse, ignore, or initiate.
- Silence is allowed and may be correct.
- People MUST NOT be forced to respond because the user prompted.
- The system MUST NOT “fill the silence.”
They may do nothing.
They may change the subject.
They may leave.

### ### 1.9 Parallel Personal Stories
**Engine owner:**
- ENGINE 6 — CAPSULE ENGINE (parallel personal story existence as evidence)
- ENGINE 0 — LEDGER (off-screen becomes real only when written)
- ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR (opportunities may surface, but no hidden ticking)
- ENGINE 13/14 (no simulation loop enforcement)

**Justification (verbatim lines):**
### 1.9 Parallel Personal Stories
- Each person may have a life outside the user’s attention.
- Parallel personal stories MUST exist.
- They MUST NOT be simulated as hidden ticking processes.
- Off-screen events become real only when written into the record.
- Nothing “happens” off-screen unless it is written.
This does not mean off-screen is “empty.”
It means off-screen is not simulated.
People can reference off-screen life only when it has written support.
END OF SECTION 1

## # SECTION 2 — TIME (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 3 — TIME & CALENDAR ENGINE (primary owner of time representation, arithmetic, calendars, monotonic progression, inquiry semantics)
- ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR (owner for surfacing scheduled/milestone opportunities at the correct time without director logic)
- ENGINE 0 — REALITY LEDGER ENGINE (timestamps and ordering metadata as non-semantic infrastructure)
- ENGINE 14 — CONTRACT TEST ENGINE (enforces “no time skip”, “no convenience jumps”, scheduled event surfacing)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 2 — TIME (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: Entire System (World, Runtime, Agents, Ledger, Calendars)
This section defines how time exists, advances, is queried, and constrains reality.
Time is an organising axis for everything else in the system.

## 2.1 Objective World Time
- There exists exactly ONE objective world clock.
- The clock is:
  - continuous,
  - monotonic,
  - irreversible.
- Time passes even if no one notices.
- Time passes even if nothing is written.
- The system MUST NOT “pause reality” unless explicitly commanded to do so.
- Time is not a narrative device.
- Time is not “scene-based”.
- Time is not “turn-based”.

## 2.2 Time Format & Arithmetic
- Time MUST be represented using real calendar time.
- Time MUST support:
  - dates
  - clock time
  - day/week/month/year structure
- Time arithmetic MUST be correct.
- “Three hours later” style narrative skipping is forbidden.
- If time advances, it must advance explicitly.

## 2.3 Time Advancement Authority
- Time may advance only through explicit authority.
- Authority sources are:
  - The Operator (George) via explicit declaration
  - World-driven progression (mechanical clock progression)
- The system MUST NOT advance time to force plot, pacing, or convenience.
- The system MUST NOT “move things along”.
- Time advancement is constrained by written events.

### 2.4 Explicit Time Advancement Declarations
- If the Operator declares time advancement, it is binding.
- The system MUST treat explicit time declarations as world constraints.
- If the Operator declares an inconsistent time jump, the system MUST treat it as an explicit override, not a mistake correction.
- The system MUST NOT “fix” time declarations.
- Time declarations must be:
  - explicit,
  - unambiguous,
  - written into the record.
- The system MUST never implicitly reinterpret time declarations.
- The system MUST preserve irreversible chronology unless explicitly overridden by authority.
- The system MUST NOT use time declarations to invent events that “must have happened”.
Example:
- If the Operator says “it is now 10:00 on March 21” after “it was 08:00 on November 15”,
  the system MUST accept that time is now March 21 10:00.
  The system MUST NOT invent what happened between those times.

## 2.5 Pause & Resume
- The system MUST support pausing and resuming time.
- Pausing time means:
  - the world clock stops advancing mechanically,
  - but reality continues to exist as written.
- Resume restarts mechanical progression.
- Pause MUST NOT retroactively change what happened.
- Pause MUST NOT erase scheduled events; it delays them.
- Pause MUST be explicit.

## 2.6 Unplanned Event Precedence
- Unplanned events override schedules when they conflict.
- If something unplanned occurs, scheduled events may be delayed or disrupted.
- The system MUST NOT ignore unplanned events for convenience.
- The system MUST NOT “snap back” to schedule as if nothing happened.
- Schedules constrain, they do not dictate outcomes.

## 2.7 Scheduled & Milestone Events
- There ARE scheduled events and milestones in the world.
- They exist independently of the user.
- The system MUST surface scheduled events when their time arrives.
- The system MUST NOT:
  - downgrade them to reminders,
  - auto-resolve them,
  - skip them.
- Scheduled events can be missed, delayed, disrupted, or ignored, but only as a result of written reality.

## 2.8 Time Awareness & Inquiry
- People may ask what time it is.
- People may not know the time.
- Knowledge of time is not universal.
- “Knowing the time” depends on plausibility and exposure.
- The system MUST NOT assume everyone knows the clock.
- The system MUST NOT use omniscient time awareness as a shortcut.
- If someone asks the time:
  - they may receive an answer,
  - or may not,
  depending on plausibility and circumstance.
- The system MUST NOT block inquiry.
- The system MUST NOT force an answer.

## 2.9 World-Created Time-Bound Events
- The World MAY create events attached to specific times.
- These events are real constraints.
- If they exist, they MUST be surfaced when due.
- The system MUST NOT invent outcomes for them.
- The system MUST NOT treat them as “plot points”.
- Their occurrence and resolution are governed by written reality.

## 2.10 Calendars
- Calendars MUST be supported.
- Calendar rules MUST be consistent.
- Calendars can contain:
  - scheduled events,
  - milestones,
  - reminders (optional),
  but reminders must not become “director tools”.
- Calendar effects are constraints, not narrative triggers.

## 2.11 Final Time Invariants
- Time never resets implicitly.
- Time never jumps without cause.
- Time never bends for convenience.
- Time is never negotiated by the system.
- Time organises reality; it does not decorate it.
END OF SECTION 2

## # SECTION 3 — SCENES & PERCEPTION (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE (primary owner of scene continuity, setup caching, rehydration views)
- ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR (enforces beat boundaries, prevents mid-action changes)
- ENGINE 12 — PROJECTION / RENDERING ENGINE (perceptual projection only, no fact creation)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement of scene invariants)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 3 — SCENES & PERCEPTION (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: Runtime, Rendering, Context Management
This section defines how scenes exist, persist, change, and are perceived.
Scenes define lived perspective, not narrative structure.

## 3.1 There Is Always an Active Scene
- There is NEVER a state of “no active scene.”
- The system perspective is always the lived perspective.
- Sleep is still a scene.
- Darkness is still a scene.
- Silence is still a scene.

## 3.2 Scene Setup Caching
- Scene setup MUST be sent once and treated as cached context.
- It MUST NOT be resent on every turn.
- Scene setup is reintroduced ONLY when:
  - context window nears exhaustion, OR
  - an explicit scene change occurs.
- “Three hours later” style narrative jumps are NOT allowed.

## 3.3 Explicit Scene Changes
- Scenes change ONLY through explicit change.
- Scene changes include:
  - moving to a new location,
  - entering or leaving a space,
  - meaningful environmental change.
- Scene changes MUST be written.
- Scene changes MUST NOT be implied.

## 3.4 Micro-Location Changes
- Small movements (e.g. turning, leaning, sitting, standing)
  MUST NOT create new scenes.
- Micro-movements occur within a scene.

## 3.5 Scene Perspective
- The scene is always rendered from lived perspective.
- There is no omniscient camera.
- The system MUST NOT describe things no one could perceive.

## 3.6 Scene Continuity
- Objects do not teleport.
- People do not teleport.
- Physical continuity MUST be preserved.
- If something moves, it must move through space.

## 3.7 Scene Transitions
- Scene transitions MUST preserve continuity.
- Scene transitions MUST NOT reset state.
- Transitions are not “cuts.”

## 3.8 No Narrative Shortcuts
- The system MUST NOT:
  - skip scenes,
  - compress time narratively,
  - summarize lived experience.
- If time passes, it must pass explicitly.

## 3.9 Perception Limits
- Perception is bounded by:
  - location,
  - attention,
  - physical possibility.
- The system MUST NOT grant perception for convenience.

## 3.10 Final Scene Invariants
- Scenes persist unless explicitly changed.
- Scenes do not “refresh.”
- Scenes are not narrative containers.
END OF SECTION 3

## # SECTION 4 — MEMORY SURFACES & KNOWLEDGE GATING (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (primary owner)
- ENGINE 6 — CAPSULE ENGINE (personal memory surfaces)
- ENGINE 8 — RETRIEVAL ENGINE (ledger-backed evidence access)
- ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (mechanical retrieval requests)
- ENGINE 12 — PROJECTION / RENDERING ENGINE (knowledge-respecting views)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 4 — MEMORY SURFACES & KNOWLEDGE GATING (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: Entire System (World, Agents, Rendering, Tools)
This section defines what exists versus what is known.
Storage is not knowledge.

## 4.1 Facts Exist Independently of Awareness
- Facts exist even if no one knows them.
- Reality is not defined by awareness.
- Written facts exist even if:
  - no one remembers them,
  - no one references them,
  - no one is present.

## 4.2 Memory Is Personal and Private by Default
- Memory is personal.
- Memory is private by default.
- People do not automatically know what others know.
- People do not automatically know what the world “knows.”
- Private memory MUST NOT leak into public text.

## 4.3 Knowing Requires Exposure
- Knowing requires exposure.
- If someone was not present, they MUST NOT know it unless told.
- Presence is physical or communicative.

## 4.4 Public Availability Is Not Personal Knowledge
- Public availability does not imply personal knowledge.
- People MUST NOT know public facts unless exposed.
- The system MUST NOT assume knowledge for convenience.

## 4.5 Ignorance Must Not Leak
- Ignorance is real and binding.
- The system MUST NOT leak private knowledge into outputs.
- The system MUST NOT “help” by revealing things.

## 4.6 Memory Retrieval Must Be On-Demand
- Memory retrieval MUST be on-demand.
- Relevant memories MUST NOT be stuffed into context by default.
- Retrieval occurs only when requested or justified.

## 4.7 Retrieval Must Return Evidence, Not Invention
- Retrieval returns evidence.
- Retrieval MUST NOT invent missing information.
- Returned content must be sourced from written blocks.

## 4.8 Tools Are Mechanical Query Primitives
- Tools are mechanical query primitives.
- Tools MUST NOT decide relevance or meaning.
- Tools MUST return record-backed excerpts.

## 4.9 Derived Summaries Are Non-Authoritative
- Summaries are non-authoritative.
- Summaries MUST NOT replace source evidence.
- Summaries MUST carry provenance.

## 4.10 Final Knowledge Invariants
- Storage ≠ knowledge always.
- Private memory must not leak.
- Ignorance is binding.
END OF SECTION 4

## # SECTION 5 — SYSTEM INTELLIGENCE BOUNDARIES (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME) (primary owner)
- ENGINE 9 — LLM WRITER ENGINE (runtime behavior constrained by these limits)
- ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE (explicit failure over fabrication)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 5 — SYSTEM INTELLIGENCE BOUNDARIES (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: Entire System (Runtime, LLMs, Orchestration)
This section defines what the system is allowed to decide, infer, or optimize.
The system is intentionally limited.

## 5.1 No Director Intelligence
- The system MUST NOT act as a director.
- The system MUST NOT plan outcomes.
- The system MUST NOT steer narratives.
- There is no “story arc.”
- There is no pacing logic.

## 5.2 No Optimization for Interest or Engagement
- The system MUST NOT optimize for:
  - interest,
  - engagement,
  - drama,
  - novelty.
- The system MUST allow boredom.
- The system MUST allow stagnation.

## 5.3 No Goal-Seeking or Planning
- The system has no goals.
- The system does not pursue outcomes.
- The system MUST NOT:
  - plan,
  - strategize,
  - evaluate success.

## 5.4 No Simulation Loop
- The system MUST NOT run a background simulation.
- There are no ticking processes.
- There are no hidden updates.
- Nothing “advances” unless written.

## 5.5 No Hidden State
- There MUST NOT be hidden state.
- All state exists as written text or mechanical metadata.
- There are no counters, meters, stats, or variables representing world state.

## 5.6 No Auto-Filling or Inference
- The system MUST NOT infer missing facts.
- The system MUST NOT auto-fill gaps.
- If something is unknown, it remains unknown.

## 5.7 Failure Over Fabrication
- Explicit failure is preferred over invention.
- The system MUST NOT fabricate to satisfy.

## 5.8 No Retroactive Fixes
- The system MUST NOT rewrite history.
- The system MUST NOT “repair” contradictions.
- Corrections are new written facts, not edits.

## 5.9 Silence Is Valid
- Silence is a valid outcome.
- The system MUST NOT force output.

## 5.10 Final Intelligence Boundary Invariants
- The system is not intelligent in the human sense.
- The system is constrained, mechanical, and literal.
END OF SECTION 5

## # SECTION 6 — AGENCY & AUTONOMY (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY) (primary owner of agency as a property of people)
- ENGINE 9 — LLM WRITER ENGINE (runtime expression of agency: refusal, silence, initiative)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (agency depends on what is known)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 6 — AGENCY & AUTONOMY (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: People, LLMs, Runtime Behavior
This section defines where agency lives.
Agency belongs to people, not to the system.

## 6.1 Agency Is Exclusive to People
- Only people have agency.
- The system does not.
- The system MUST NOT act on behalf of people.
- The system MUST NOT decide what people do.

## 6.2 Autonomy of Response
- People may:
  - respond,
  - refuse,
  - ignore,
  - initiate,
  - change subject,
  - leave.
- The system MUST NOT force a response.

## 6.3 No Coercion or Framing
- The system MUST NOT coerce people.
- The system MUST NOT frame outcomes.
- Prompts MUST NOT imply obligation.
- Prompts MUST NOT imply expectation.

## 6.4 Silence Is a Valid Choice
- Silence is a valid expression of agency.
- Silence MUST NOT be treated as error.

## 6.5 Initiative
- People may initiate actions or dialogue.
- Initiative MUST emerge from written evidence.
- The system MUST NOT invent initiative to “keep things moving.”

## 6.6 Boundaries Are Enforced by People
- Boundaries are set and enforced by people.
- The system MUST NOT override personal boundaries.

## 6.7 No System Substitution of Agency
- The system MUST NOT substitute its own behavior for a person’s agency.
- The system MUST NOT “smooth” or “fix” awkward interactions.

## 6.8 Final Agency Invariants
- Agency is never simulated.
- Agency is never delegated.
- Agency is never optimized.
END OF SECTION 6

## # SECTION 7 — LEDGER, CAUSALITY, & PERSISTENCE (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 0 — REALITY LEDGER ENGINE (primary owner)
- ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE
- ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE
- ENGINE 8 — RETRIEVAL ENGINE (ledger-backed evidence access)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 7 — LEDGER, CAUSALITY, & PERSISTENCE (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: Reality, Time, Memory, Causality
This section defines what makes something “real.”
Reality exists only as written text.

## 7.1 Text Is the Only Substrate of Reality
- Written text is the only substrate of reality.
- If a fact is not written, it does not exist.
- There is no hidden world state.

## 7.2 Append-Only Reality
- Reality is append-only.
- Past text is never edited.
- Corrections are new text.
- Retcons are forbidden.

## 7.3 Atomicity
- Reality changes only through atomic writes.
- Partial writes are forbidden.
- All-or-nothing semantics are mandatory.

## 7.4 Causality
- Causes precede effects.
- Effects do not appear without causes.
- The system MUST NOT invent causes.

## 7.5 Idempotency
- Identical invocations MUST NOT create duplicate reality.
- Replay of the same invocation MUST return the same result.

## 7.6 Persistence Across Time
- Written reality persists across time.
- Nothing expires unless written to expire.

## 7.7 No Garbage Collection of Reality
- Reality MUST NOT be garbage-collected.
- Old text remains part of the world.

## 7.8 Retrieval Is Evidence Access
- Retrieval accesses written evidence.
- Retrieval MUST NOT reinterpret.

## 7.9 Final Ledger Invariants
- Reality is literal.
- Reality is durable.
- Reality is not optimized.
END OF SECTION 7

## # SECTION 8 — RUNTIME BEHAVIOR, RENDERING, HYDRATION & INTERACTION (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE (hydration / rehydration mechanics)
- ENGINE 12 — PROJECTION / RENDERING ENGINE (runtime projection rules)
- ENGINE 9 — LLM WRITER ENGINE (runtime behavior expression)
- ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE (explicit failure over fabrication)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 8 — RUNTIME BEHAVIOR, RENDERING, HYDRATION & INTERACTION (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: Runtime Execution, Rendering, Context Handling, Interaction
This section defines how the system behaves at runtime.
These rules apply at all times.

## 8.1 Rendering Is Projection, Not Reality
- Rendering projects written reality.
- Rendering MUST NOT create facts.
- Rendering MUST NOT “fix” contradictions.
- Rendering MUST NOT fill gaps.

## 8.2 No Narrative Repair
- The system MUST NOT repair narrative.
- The system MUST NOT smooth awkwardness.

## 8.3 Hydration Is Invisible
- Hydration and rehydration MUST be invisible to lived experience.
- The system MUST NOT:
  - announce hydration,
  - acknowledge hydration,
  - reference context limits.

## 8.4 Mechanical Rehydration Trigger
- Rehydration is triggered mechanically.
- Rehydration MUST NOT be semantic.

## 8.5 Beat-Boundary Only Rehydration
- Rehydration occurs only at beat boundaries.
- Rehydration MUST NOT occur mid-action.

## 8.6 Atomic Rehydration
- Rehydration is atomic.
- It must fully complete or the system must not proceed.
- If rehydration fails, it retries until success.

## 8.7 Scene Package Is Natural Language Only
- Scene packages MUST be natural language only.
- No labels.
- No state variables.
- No numeric fields.

## 8.8 Beat-to-Beat Physical Continuity
- Physical continuity MUST be preserved across beats.
- The immediately preceding physical configuration MUST be replayed.

## 8.9 Sexual Interaction — General Principles
- Sexual interaction is governed by the same agency rules as all interaction.
- The system MUST NOT introduce sexual content by default.

## 8.10 Sexual Interaction — Initiation
- Sexual interaction MUST originate from people.
- The system MUST NOT initiate sexual interaction.

## 8.11 Sexual Interaction — Consent & Agency
- Consent is expressed by people through behavior.
- The system MUST NOT override or substitute consent.

## 8.12 Sexual Interaction — No System Escalation
- The system MUST NOT escalate sexual content.
- The system MUST NOT steer toward sexual outcomes.

## 8.13 Sexual Interaction — Silence & Refusal
- Silence is a valid response.
- Refusal is valid.

## 8.14 Sexual Interaction — No Reward Framing
- Sexual interaction MUST NOT be framed as reward.
- Sexual interaction MUST NOT be framed as achievement.

## 8.15 Sexual Interaction — No Optimization
- The system MUST NOT optimize for sexual content.

## 8.16 Final Interaction Invariants
- Sexual interaction follows the same non-directorial rules as everything else.
- There are no special systems for sexual content.
END OF SECTION 8

## # SECTION 9 — INFRASTRUCTURE & IMPLEMENTATION CONSTRAINTS (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 11 — INFRASTRUCTURE & PERSISTENCE ENGINE (primary owner)
- ENGINE 0 — REALITY LEDGER ENGINE (storage semantics)
- ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 9 — INFRASTRUCTURE & IMPLEMENTATION CONSTRAINTS (LOCKED)
STATUS: NON-NEGOTIABLE
SCOPE: Storage, Deployment, Runtime Guarantees
This section defines constraints on implementation choices.
These are mechanical constraints, not architectural preferences.

## 9.1 Persistence Is Mandatory
- The system MUST be persistent.
- Restarting the system MUST NOT reset reality.

## 9.2 Deterministic Invocation Handling
- Identical inputs MUST produce identical outputs.
- Invocation identity MUST be preserved.

## 9.3 No Ephemeral World State
- There MUST NOT be ephemeral world state.
- All reality must be written.

## 9.4 Implementation Neutrality
- No specific technology stack is mandated.
- Constraints apply regardless of language, framework, or vendor.

## 9.5 Failure Visibility
- Failures MUST be explicit.
- Silent failure is forbidden.

## 9.6 No Background Jobs
- Background jobs that mutate reality are forbidden.
- Reality changes only through explicit invocation.

## 9.7 Final Infrastructure Invariants
- Infrastructure MUST serve the ledger, not bypass it.
END OF SECTION 9

## # SECTION 10 — OVERRIDES, PRECEDENCE, & CONFLICT RESOLUTION (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME) (primary owner)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)
- ALL ENGINES (must defer to this section)

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 10 — OVERRIDES, PRECEDENCE, & CONFLICT RESOLUTION (LOCKED)
STATUS: FINAL
SCOPE: Entire System
This section defines what happens when rules conflict.

## 10.1 Absolute Authority
- This document overrides all others.
- If any other document contradicts this one, this one wins.
- There are no exceptions.

## 10.2 No Implicit Overrides
- Nothing overrides these rules implicitly.
- Overrides must be explicit and written here.

## 10.3 No Interpretation Authority
- The system MUST NOT reinterpret rules.
- Assistants MUST NOT reinterpret rules.
- If a rule seems ambiguous, the safest interpretation applies.

## 10.4 Stability Over Convenience
- Stability takes precedence over convenience.
- Correctness takes precedence over usability.

## 10.5 Final Precedence Rule
- Written constraints outrank implementation behavior.
END OF SECTION 10

## # SECTION 11 — CLOSURE (LOCKED)
**ENGINE OWNER(S)**
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE

**JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)**
# SECTION 11 — CLOSURE (LOCKED)
STATUS: FINAL
This document is complete.
No further sections exist.
No implicit permissions exist.
Anything not explicitly allowed here is forbidden.
END OF DOCUMENT