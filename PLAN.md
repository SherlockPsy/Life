# EXECUTION PLAN — HARDENED, CONTRACT-FIRST, UI-DRIVEN
# AUTHORITATIVE BASIS: NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# STATUS: CANDIDATE FOR LOCKING

This plan is written to eliminate execution risk, not just architectural error.
No step relies on developer restraint, Copilot goodwill, or “we’ll fix it later”.

----------------------------------------------------------------------
GLOBAL EXECUTION PRINCIPLES (BINDING)
----------------------------------------------------------------------

G1. Nothing is implemented without a contract.
G2. Nothing runs without passing its contract tests.
G3. No engine may call another engine except through an explicit, versioned contract.
G4. UI behavior is treated as a constitutional surface, not a convenience layer.
G5. If a step cannot be mechanically enforced, it is not considered complete.

----------------------------------------------------------------------
PHASE 0 — CONTRACTS AS PHYSICS (MUST HAPPEN FIRST)
----------------------------------------------------------------------

Purpose:
Prevent Copilot (or humans) from inventing protocols, shortcuts, or implicit behavior.

0.1 Create `/contracts/` as a top-level, immutable directory
- This directory is read-only after creation.
- Any change to a contract file requires:
  - explicit version bump,
  - explicit rationale,
  - re-running the full contract test suite.

0.2 Create the following contract files (MANDATORY, BEFORE ANY CODE):

- invocation_envelope.md
- write_entry.md
- write_bundle.md
- projection_output.md
- tool_request.md
- retrieval_result_pack.md
- scene_anchor_pack.md
- rehydration_pack.md
- capsule_pack.md

Each contract file MUST contain:
- Purpose (1 paragraph, declarative)
- Allowed inputs (exact fields, required/optional)
- Allowed outputs (exact fields)
- MUST rules
- MUST NOT rules
- Explicit forbidden examples
- At least one valid example payload
- At least one invalid example payload

0.3 Contract immutability gate
- No implementation code is allowed to exist unless:
  - all contracts exist,
  - all contracts are internally consistent,
  - all contracts are referenced by engine specs.

Acceptance condition:
- A reviewer can delete all implementation code and still fully understand system behavior from contracts alone.

----------------------------------------------------------------------
PHASE 1 — ENGINE INTERFACES (NO IMPLEMENTATION YET)
----------------------------------------------------------------------

Purpose:
Eliminate inter-engine ambiguity and overlap BEFORE code exists.

1.1 For each engine in ENGINE_INVENTORY.md, create an interface file:
`/engines/ENGINE_<ID>_<NAME>/interface.md`

Each interface.md MUST define:
- Owned responsibilities (verbatim from traceability matrix)
- Inputs accepted (only via contracts)
- Outputs produced (only via contracts)
- Engines it may call (explicit list)
- Engines it must NEVER call
- Data it may read
- Data it must NEVER read
- Failure modes (what happens when it cannot act)

1.2 Explicit inter-engine call graph
Create `/architecture/engine_call_graph.md` defining:
- Allowed call directions (A → B)
- Forbidden call directions (A ✕→ B)
- Rationale for every allowed call

This file is binding.
Any implementation that violates it is invalid.

Acceptance condition:
- There exists a single, unambiguous directed graph of engine interactions.
- No engine has “implicit access” to another engine.

----------------------------------------------------------------------
PHASE 2 — CONTRACT TESTS (BEFORE REAL CODE)
----------------------------------------------------------------------

Purpose:
Turn philosophy into executable law.

2.1 Create `/tests/contracts/`
For EACH contract:
- Write tests that assert:
  - valid payloads pass,
  - invalid payloads fail,
  - forbidden behaviors are rejected.

2.2 Create `/tests/prohibitions/`
Tests that explicitly assert the system CANNOT:
- infer missing facts,
- write partial bundles,
- advance time implicitly,
- rehydrate mid-beat,
- render facts not in ledger,
- bypass knowledge boundaries,
- force responses,
- fabricate continuity.

These tests must fail loudly.

2.3 CI gate
- CI must fail if:
  - any contract test fails,
  - any prohibition test fails.
- CI failure blocks all merges, including refactors.

Acceptance condition:
- The system cannot be run without passing the constitutional test suite.
- Tests, not humans, enforce discipline.

----------------------------------------------------------------------
PHASE 3 — UI FIRST, BUT CONTRACT-BOUND
----------------------------------------------------------------------

Purpose:
Give you lived confidence early without creating a fake system.

3.1 Build UI shell strictly against `projection_output` contract
- UI may only render what the contract allows.
- UI must not infer or decorate missing data.
- UI must support:
  - perceptual stream,
  - USER / VOICE / PEOPLE channels,
  - pocket overlay,
  - stable scroll position.

3.2 Stub backend that ONLY returns contract-valid projection_output
- No ledger yet.
- No LLM yet.
- All outputs must still pass contract validation.

3.3 UI contract tests
- UI rendering must be testable:
  - no popups in stream,
  - pocket isolated,
  - silence renders as silence,
  - no synthetic filler.

Acceptance condition:
- You can interact with the UI.
- Everything you see is structurally valid, even if dumb.

----------------------------------------------------------------------
PHASE 4 — REALITY LEDGER + ATOMICITY
----------------------------------------------------------------------

Purpose:
Make the system real before it becomes intelligent.

4.1 Implement ENGINE 0 (Reality Ledger)
- Append-only.
- Bundle-based atomic commits.
- No updates, no deletes.
- Idempotency enforced via request_id.

4.2 Replace UI stub with ledger-backed data
- UI now renders ONLY ledger-derived projection_output.
- Refreshing the page does not change reality.

4.3 Ledger contract tests
- Partial writes must fail.
- Duplicate invocations must not duplicate reality.
- Replay must return identical output.

Acceptance condition:
- Reality persists.
- Bugs cannot be hidden by refresh or restart.

----------------------------------------------------------------------
PHASE 5 — TIME & BEATS (MECHANICAL, NOT NARRATIVE)
----------------------------------------------------------------------

Purpose:
Make time binding without turning it into a story tool.

5.1 Implement ENGINE 3 (Time & Calendar)
- Single monotonic clock.
- Explicit advancement only.
- No narrative shortcuts.

5.2 Implement ENGINE 2 (Beat & Opportunity Coordinator)
- Beats are mechanical boundaries.
- Opportunities surface but never resolve themselves.

5.3 Hard tests for time violations
- Any implicit time jump fails tests.
- Any “later that day” phrasing fails tests.

Acceptance condition:
- Time can pass while nothing happens.
- Nothing happens because time passed.

----------------------------------------------------------------------
PHASE 6 — KNOWLEDGE, RETRIEVAL, TOOLS
----------------------------------------------------------------------

Purpose:
Prevent omniscience and leakage.

6.1 Implement ENGINE 4 (Knowledge Surface)
- Visibility rules enforced mechanically.
- Storage ≠ knowledge.

6.2 Implement ENGINE 8 (Retrieval)
- Ledger-backed only.
- Verbatim excerpts only.
- Provenance mandatory.

6.3 Implement ENGINE 7 (Tool Requests)
- Tools are questions, not helpers.
- Bounded loops.
- No write authority.

Acceptance condition:
- The system can say “I don’t know” and mean it.
- Retrieval cannot invent.

----------------------------------------------------------------------
PHASE 7 — SCENES, ANCHORS, REHYDRATION
----------------------------------------------------------------------

Purpose:
Prevent drift without breaking immersion.

7.1 Implement ENGINE 5 (Scene Anchor & Rehydration)
- Natural language only.
- Beat-boundary only.
- Atomic or abort.

7.2 Token budget monitor (mechanical trigger only)
- No semantic judgement.
- No “this seems long” logic.

7.3 Tests for invisibility
- Any mention of hydration fails tests.
- Any mid-action rehydration fails tests.

Acceptance condition:
- Continuity survives context limits invisibly.

----------------------------------------------------------------------
PHASE 8 — LLM WRITER (LAST, NOT FIRST)
----------------------------------------------------------------------

Purpose:
Introduce intelligence without giving it power.

8.1 LLM outputs ONLY:
- tool_request
- proposed_write_bundle
- no_write

8.2 ENGINE 10 validates, does not negotiate
- Structural checks only.
- Failure > fabrication.

8.3 Prompt packs are versioned artifacts
- Tested.
- Reviewed.
- Never “tuned live”.

Acceptance condition:
- The LLM cannot break physics even if it tries.

----------------------------------------------------------------------
PHASE 9 — CHARACTER PAYLOADS (REBECCA, OTHERS)
----------------------------------------------------------------------

Purpose:
Add richness without contaminating law.

9.1 Rebecca packs feed:
- capsules,
- prompts,
- behavior constraints.

9.2 Rebecca packs do NOT:
- alter ledger rules,
- alter time,
- alter knowledge boundaries.

Acceptance condition:
- Rebecca can be removed and the system still works.

----------------------------------------------------------------------
PHASE 10 — LOCK & OPERATE
----------------------------------------------------------------------

10.1 Freeze contracts, engine interfaces, tests.
10.2 Any change requires:
- explicit amendment,
- re-traceability,
- full test pass.

SYSTEM IS NOW LIVE.

----------------------------------------------------------------------
END OF PLAN