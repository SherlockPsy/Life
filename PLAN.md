# LIFE SYSTEM — CAPABILITIES-COMPLETE EXECUTION PLAN
STATUS: AUTHORITATIVE BUILD PLAN
SCOPE: DELIVER 100% OF NON_NEGOTIABLE_SYSTEM_DECISIONS.md
ASSUMPTION: PHASES 0–9 FOUNDATIONAL MECHANICS EXIST
            (LEDGER, TIME ENGINE, SCENE ENGINE, LLM WRITER, ACCEPTANCE, PROJECTION)

THIS PLAN DELIVERS:
- Full lived continuity without human dependence
- Autonomous reality progression
- Human-indifferent orchestration
- Emergent experience via enforcement, not scripting
- Zero remaining structural work after completion
  (only tuning and content calibration)

THIS PLAN DOES NOT:
- Add philosophy
- Add convenience abstractions
- Add user workflows
- Add UI or client design decisions
- Add illustrative examples that could be misread as requirements

----------------------------------------------------------------------
GLOBAL ABSOLUTES (BINDING)
----------------------------------------------------------------------

- Reality MUST exist and progress without George interaction.
- Reality MUST remain valid if George is silent indefinitely.
- Reality MUST remain valid if no human traffic occurs.
- No fact may depend on being queried to exist.
- No subsystem may infer meaning, importance, relevance, or intent.
- All requirements in NON_NEGOTIABLE_SYSTEM_DECISIONS.md
  MUST be mechanically enforced, never assumed.

----------------------------------------------------------------------
ORGANIZING STRATEGY
----------------------------------------------------------------------

This plan is organized by **capability strata**, not by document sections.

Each stratum:
- introduces exactly one class of capability
- locks invariants immediately
- exposes reuse points for later strata
- forbids duplication or reinterpretation

Later strata MUST NOT re-implement or override earlier ones.

----------------------------------------------------------------------
STRATUM 1 — CONTINUOUS AUTONOMOUS REALITY PROGRESSION
----------------------------------------------------------------------

OBJECTIVE:
Reality MUST advance even if no human ever invokes again.

DELIVERABLES:

1. AUTONOMOUS BEAT SOURCE (ABS)
   - Runtime-owned scheduler controlled by the orchestrator.
   - Emits beats at deterministic wall-clock intervals.
   - Starts automatically on deploy.
   - Survives restarts.
   - Emits beats even with zero HTTP traffic.
   - Cannot be disabled by feature flags or environment toggles.

2. BEAT PROVENANCE TAGGING
   - Beats are mechanically tagged as:
     - HUMAN_INVOKED
     - AUTONOMOUS
   - Tags are non-semantic.
   - Used only for audit and enforcement.

3. HARD INVARIANT
   - Absence of ABS MUST prevent system startup.
   - This forbids regression to “reality begins on invocation”.

REUSE:
- Engine 2 (Beat Coordinator)
- Engine 3 (Time Engine)

FORBIDDEN:
- No semantic gating
- No idle-only shortcuts
- No dependence on traffic volume

----------------------------------------------------------------------
STRATUM 2 — TIME AS AN INDEPENDENT FORCE WITH RATE COUPLING
----------------------------------------------------------------------

OBJECTIVE:
Time progresses independently of attention and at a fixed,
configurable rate relative to wall-clock time.

DELIVERABLES:

1. WORLD TIME DEFINITION
   - world_time unit is **MINUTES**.
   - Stored as BIGINT.
   - Monotonic, irreversible.

2. TIME RATE COUPLING
   - Autonomous beats occur on wall-clock cadence.
   - Each autonomous beat advances world_time by
     WORLD_MINUTES_PER_BEAT.
   - Default:
     - ABS interval: 60 seconds (1 OS minute)
     - WORLD_MINUTES_PER_BEAT: 3
   - Therefore: 1 OS minute → 3 world minutes.
   - Rate is configurable via environment variables.
   - Defaults MUST enforce 3× progression.

3. HUMAN INVOCATIONS
   - Human-invoked beats do NOT define the rate.
   - They may advance time, but never control cadence.

4. TIME VISIBILITY SEPARATION
   - Time existence is independent of projection visibility.
   - Hiding time in projection MUST NOT affect reality.

5. FAILURE MODE
   - Failure to advance time MUST hard-fail runtime.
   - Silent freezing is forbidden.

REUSE:
- Engine 3 exclusively

----------------------------------------------------------------------
STRATUM 3 — AUTHORITATIVE PAUSE AND RESUME
----------------------------------------------------------------------

OBJECTIVE:
Reality can be intentionally paused and resumed
without corruption or drift.

DELIVERABLES:

1. PAUSE SEMANTICS
   - Pausing stops ABS emission.
   - No beats → no time advancement → no reality progression.
   - Ledger remains readable.
   - No background progression occurs.

2. RESUME SEMANTICS
   - Resuming restarts ABS.
   - Time continues from last committed world_time.
   - No catch-up or compression is permitted.

3. INVARIANTS
   - Pause does NOT modify world_time.
   - Pause does NOT alter scene state.
   - Pause is explicit and reversible.

REUSE:
- ABS control layer
- Engine 3

----------------------------------------------------------------------
STRATUM 4 — ALWAYS-ON SCENE CONTINUITY
----------------------------------------------------------------------

OBJECTIVE:
There is never “no scene”.

DELIVERABLES:

1. SCENE GUARANTEE
   - Every beat resolves a scene anchor.
   - Anchor may be empty but never absent.

2. RESOLUTION ORDER
   - Latest scene anchor
   - Else latest written entry
   - Else explicit EMPTY SCENE token

3. IMMUTABILITY
   - Anchors are replaced wholesale.
   - No diffs.
   - No partial updates.

REUSE:
- Engine 5 (Scene & Rehydration)

----------------------------------------------------------------------
STRATUM 5 — WORLD AS INTERRUPTING FORCE (NOT AGENT)
----------------------------------------------------------------------

OBJECTIVE:
The world can intrude without intention.

DELIVERABLES:

1. WORLD INTERRUPTION ELIGIBILITY
   - World events eligible on autonomous beats only.
   - Eligibility is mechanical, not semantic.

2. CONSTRAINTS
   - Must intersect current scene materially.
   - Must specify where, what, who can perceive.
   - Must not encode outcomes or intent.

3. FREQUENCY BOUNDS
   - Minimum silence window enforced.
   - Maximum dormancy enforced.
   - Prevents spam and stasis.

REUSE:
- Engine 9 for proposal only
- Engine 10 for acceptance

----------------------------------------------------------------------
STRATUM 6 — PEOPLE AUTONOMY WITHOUT PROMPTS
----------------------------------------------------------------------

OBJECTIVE:
People act or remain silent without being asked.

DELIVERABLES:

1. AUTONOMOUS ELIGIBILITY
   - On autonomous beats, each present person is eligible to act.
   - Eligibility does not guarantee action.

2. SILENCE
   - Silence is treated as non-action.
   - It is not privileged.
   - It is not deprioritized.
   - It has no special weighting beyond eligibility effects.

3. NO TURN MECHANICS
   - No ordering.
   - No fairness.
   - No expectation of response.

REUSE:
- Person payloads
- Engine 9 proposer

----------------------------------------------------------------------
STRATUM 7 — COMMITMENTS AS PERSISTENT REALITY
----------------------------------------------------------------------

OBJECTIVE:
Future-oriented statements persist.

DELIVERABLES:

1. COMMITMENT CREATION
   - Any written future-oriented statement creates a commitment.

2. PERSISTENCE
   - Commitments persist until explicitly resolved in writing.

3. RESURFACING
   - Commitments may resurface via:
     - autonomous beats
     - calendar pressure
     - world intrusion

REUSE:
- Ledger only

----------------------------------------------------------------------
STRATUM 8 — CALENDAR AS LIVED PRESSURE
----------------------------------------------------------------------

OBJECTIVE:
Calendar entries matter without querying.

DELIVERABLES:

1. CALENDAR FACTS
   - Calendar entries are written facts.
   - Not reminders.
   - Not queries.

2. PRESSURE MECHANICS
   - As world_time approaches entries,
     related actions gain eligibility.

3. FAILURE MODE
   - Calendar entries that never influence behavior
     MUST be rejected at write-time.

REUSE:
- Ledger
- Engine 9 logic

----------------------------------------------------------------------
STRATUM 9 — STORY POOL & BACKGROUND CONTINUITY
----------------------------------------------------------------------

OBJECTIVE:
Unfinished things continue existing.

DELIVERABLES:

1. STORY POOL
   - Background stories exist independent of scene.

2. PROGRESSION
   - Stories may progress, intersect, stall, or expire.
   - All transitions must be written.

3. NO SILENT DISAPPEARANCE
   - Expiry must be written.

REUSE:
- Ledger
- World interruption system

----------------------------------------------------------------------
STRATUM 10 — NEW PEOPLE INTRODUCTION
----------------------------------------------------------------------

OBJECTIVE:
New people enter lawfully.

DELIVERABLES:

1. ENTRY CONDITIONS
   - Location
   - Reason
   - Grounding

2. ARCHETYPE
   - One dominant archetype.
   - Immutable.

3. CONTINUITY
   - No teleportation.

REUSE:
- Archetype loader
- Scene system

----------------------------------------------------------------------
STRATUM 11 — KNOWLEDGE, IGNORANCE, MISALIGNMENT
----------------------------------------------------------------------

OBJECTIVE:
People do not know everything.

DELIVERABLES:

1. KNOWLEDGE GATING
   - Only load what a person plausibly knows.

2. MISALIGNMENT
   - Contradictory beliefs may coexist.

3. FAILURE
   - Knowledge leakage aborts writes.

REUSE:
- Engine 4

----------------------------------------------------------------------
STRATUM 12 — PROJECTION AS DERIVATIVE ONLY
----------------------------------------------------------------------

OBJECTIVE:
Display never becomes reality.

DELIVERABLES:

1. STREAM VS POCKET
   - Stream: lived text
   - Pocket: auxiliary facts

2. NO REPAIR
   - Projection cannot fill gaps.

3. NO EXPLANATION
   - System never explains itself.

REUSE:
- Engine 12

----------------------------------------------------------------------
STRATUM 13 — ENFORCEMENT & REGRESSION PROTECTION
----------------------------------------------------------------------

OBJECTIVE:
Nothing breaks quietly.

DELIVERABLES:

1. RUNTIME ASSERTIONS
   - ABS present
   - Time advances at correct rate
   - Scene always exists

2. CONTRACT TESTS
   - Removal of any stratum causes failure.

3. SWAPPABILITY
   - LLMs replaceable without semantic drift.

REUSE:
- Engine 14

----------------------------------------------------------------------
FINAL GUARANTEE
----------------------------------------------------------------------

If ALL strata are implemented:

- Reality does not begin with George.
- Reality continues during silence.
- Time advances at enforced rate.
- Time can be paused and resumed safely.
- World intrudes lawfully.
- People act autonomously.
- Commitments and calendars matter.
- Stories persist.
- New people arrive naturally.
- Projection never lies.

NO STRUCTURAL WORK REMAINS AFTER THIS PLAN.

ONLY:
- Synthetic data removal
- Day-0 data loading
- Lived fine-tuning

END OF PLAN