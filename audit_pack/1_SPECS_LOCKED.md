# SPECS LOCKED — VERBATIM EXTRACTIONS

## File Hashes

| File | SHA-256 |
|------|---------|
| NON_NEGOTIABLE_SYSTEM_DECISIONS.md | `f363720dbc9e5696cecdcb9e1e6ce5f47d2bb6b004f892735bada800c06490ea` |
| MASTER_CONSTITUTION.md | `a872f125d8c5aa44eb5fa38716458464c0ca3ebe8a2d69f06ef94b249bd04f12` |
| MASTER_RUNTIME.md | `d3945ce1f0d590190b1dbe64231c758e6e3e2aca163b4a4e481b691e0638e843` |
| MASTER_WORLD.md | `9a094911135f98552f0a6e33fc2f8a85d63e88771a8d06f852a8173919d62257` |
| MASTER_INFRASTRUCTURE.md | `955506650a5d13d19f02653459799d2c9426884a4322517451f49a78dbe93612` |
| PLAN.md | `3f2185f36e3ff0a3f38f8fb2080ecefa278021e51cd0eb82ea236c6687c67294` |

---

## NON_NEGOTIABLE_SYSTEM_DECISIONS.md

**Lines 1-80:**
```markdown
# NON-NEGOTIABLE SYSTEM DECISIONS
STATUS: LOCKED
SCOPE: AUTHORITATIVE / IRREVERSIBLE
This file records decisions that MUST survive refactors, rewrites, assistants, and time.
These are NOT implementation details.
These are NOT suggestions.
These are NOT open to reinterpretation.

Anything not written here MUST NOT be assumed.

---

## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY

### 1.1 Classes of People

The system contains exactly three classes of people:

A. Rebecca  
B. George (the only real human user)  
C. Everyone else (the rest of the world)

No other categories exist.

---

### 1.2 George (The User)

• George is a real human being, not a character.
• George requires:
  – NO personality definition
  – NO memory model
  – NO trait assignment
• George is never treated as a system user by the LLM.
• The LLMs (DeepSeek, Venice) are used by the system, not by George.
• The system MUST NOT privilege George's perspective, tone, or desires.

There is no multi-user access model.  
There will never be another real human user.

---

### 1.3 Semantic Identity (All People)

• Every person has a semantic identity.
• Identity is expressed as a descriptive line, NOT a numeric ID or UUID.
• Identity exists to disambiguate people with similar names.

Example (illustrative only):
"George Apostolakis, VP of SaaS, Rebecca Ferguson's cohabitant spouse, guitarist, chess player, plays in a small band."

• Semantic identity is immutable.
• Identity does NOT update with age, job changes, or life events.
• Identity exists only to anchor who is who.

---

### 1.4 Rebecca

• Rebecca is Rebecca Ferguson, the Swedish actress.
• Rebecca is defined exclusively by:
  – REBECCA_AGENCY_ENGINE.md
  – REBECCA_BEHAVIOURAL_MODEL.md
  – REBECCA_BOUNDARY_MAP.md
  – REBECCA_IDENTITY_BINDING.md
  – REBECCA_IDENTITY_CORE.md
  – REBECCA_LINGUISTIC_PROFILE.md
  – REBECCA_MODULATION_MAP.md
  – REBECCA_PRIVATE_EXPRESSION_LAYER.md
  – REBECCA_SEXUAL_EXPRESSION.md

• These files fully define:
  – her personality
  – her expressive range
  – her boundaries
  – her private vs expressed domains

• Rebecca's personality is:
  – fixed
  – immutable
  – non-learned
  – non-generated

There is NO character generation phase.
There is NO runtime personality assignment.
There is NO adaptive trait learning.
```

**Key Section: SECTION 2 — TIME (Lines 194-382):**
```markdown
# SECTION 2 — TIME (LOCKED)

VERSION: 2.0
SCOPE: Entire System (World, Runtime, Agents, Ledger, Calendars)

This section defines how time exists, advances, is queried, and constrains reality.
Time is an organising axis for everything else in the system.

---

## 2.1 Objective World Time

- The world has a single, universal objective time.
- This time is called "World Time" or "Objective World Time".
- World time is:
  - independent of OS wall-clock time,
  - ~3× faster than OS time.

...

## 2.11 Final Time Invariants

- Time never resets implicitly.
- Time never jumps without cause.
- Time never bends for convenience.
- Time is never negotiated by the system.
- Time organises reality; it does not decorate it.
```

---

## MASTER_CONSTITUTION.md

**Lines 1-80:**
```markdown
# MASTER_CONSTITUTION (v7)
## Constitution of Written Reality, Agency, Time, Scene, and Continuity

If something is not written as text, it does not exist in this system.

This Constitution defines the immutable physics of the Virtual Life world.
It is not guidance.
It is not preference.
It is law.

---

## PREAMBLE

This system is a continuous virtual world expressed exclusively through written text.

Its goal is to approximate lived reality as closely as possible **without**:
- simulation engines,
- game logic,
- hidden state,
- background progression,
- narrative direction,
- or mechanical psychology.

This Constitution enforces:

- Written reality as the sole substrate of existence
- Separation of existence from rendering
- Scene continuity without episodic resets
- Agency without prompts, timers, or directors
- Time as a continuous shared coordinate, not a plot engine
- Causality without retroactive invention
- Silence as an allowed outcome, never a privileged one

Anything not explicitly forbidden is allowed.
Anything forbidden is invalid regardless of realism or usefulness.

---

## ARTICLE I — ONTOLOGY OF REALITY

### I.1 Text Is the Only Substrate

1) The only substrate of reality in this system is written text.
2) "Written" means durable text recorded into the authoritative ledger.
3) Nothing exists merely because it was:
   - rendered,
   - spoken aloud,
   - displayed in an interface,
   - considered by a model,
   - inferred as likely,
   unless it is written.

---

### I.2 Written ≠ Rendered

1) Written reality is not limited to what is shown.
2) Rendering is a projection choice applied after writing.
3) Many written facts, thoughts, actions, and developments may never be rendered.
4) Rendering must never be treated as a condition for existence.
```

---

## MASTER_RUNTIME.md

**Lines 1-80:**
```markdown
# MASTER_RUNTIME (v7)
## Runtime Invocation, Scene Anchoring, Writing Opportunity, and Record Integrity

Version: 7.0  
Status: AUTHORITATIVE

Runtime exists solely to:
- provide opportunities to write,
- supply grounded context for writing,
- record what is written faithfully.

Runtime does NOT:
- decide what happens,
- decide who acts,
- decide what matters,
- decide when life progresses.

---

## PREAMBLE

This Runtime is bound by the Constitution and World Law.

It must enforce:

- written text as the only reality,
- continuous scene existence,
- initiative without prompts,
- time without plot mechanics,
- causality without retroactive invention,
- silence as allowed but not privileged.

Runtime is mechanically stupid by design.

If Runtime appears to understand meaning, the system is broken.

---

## CORE ASSERTION

**Runtime grants permission to write. It never requires writing.**

On any invocation:
- writing may occur,
- or silence may occur.

Both outcomes are valid.

---

## ARTICLE I — WHAT RUNTIME IS NOT

### I.1 Runtime Is Not a Director

Runtime MUST NOT:

- choose moments,
- evaluate relevance,
- manage pacing,
- enforce engagement,
- nudge outcomes,
- "keep life moving."
```

---

## MASTER_WORLD.md

**Lines 1-80:**
```markdown
# MASTER_WORLD (v7)
## World Definition, Facts, Scene, Time, and Non-Directorial Reality

Version: 7.0  
Status: AUTHORITATIVE

---

## PREAMBLE

This document defines:

- what the World may introduce as written reality,
- what counts as a fact even if nobody perceives it,
- how scenes exist continuously without resets,
- how time exists without becoming a rule engine,
- how off-screen life continues without simulation,
- how reality remains non-directorial at all times.

This document does NOT define:

- how people decide what to do,
- how behaviour is selected,
- how initiative is triggered,
- how outcomes are chosen,
- what should happen next.

If it feels like a director, it is wrong.  
If it feels like a simulator, it is wrong.  
If it feels like psychology software, it is wrong.

---

## ARTICLE I — WHAT THE WORLD IS

### I.1 The World Is Not a Mind

The World is not:

- conscious,
- intentional,
- strategic,
- evaluative,
- narratively aware,
- aware of participant goals.

The World does not "try" to do anything.

The World may introduce facts only.

---

### I.2 The World Is Text, Not Simulation

The World does not simulate gradual change.

There is no background engine that updates:

- moods,
- relationships,
- probabilities,
- tendencies,
- time-based states.

Nothing evolves unless written.
```

---

## MASTER_INFRASTRUCTURE.md

**Lines 1-80:**
```markdown
# MASTER_INFRASTRUCTURE (v7)
## Storage, Deployment, Invocation Plumbing, and Mechanical Integrity

Version: 7.0  
Status: AUTHORITATIVE

Infrastructure defines the physical and technical substrate of the system.

Infrastructure exists to:
- store text,
- retrieve text,
- forward text,
- persist text,
- enforce mechanical integrity.

Infrastructure does NOT:
- interpret,
- infer,
- optimise,
- simulate,
- decide,
- evaluate meaning,
- shape behaviour,
- manage narrative.

If infrastructure appears intelligent, the system is broken.

---

## PREAMBLE

This document governs databases, storage rules, invocation plumbing, model invocation boundaries, and transport.

It explicitly does NOT define:
- agency,
- psychology,
- realism,
- pacing,
- motivation,
- initiative,
- outcomes.

Those belong to constitutional and world law.

Infrastructure is intentionally stupid.

---

## ARTICLE I — CORE PRINCIPLES

### I.1 Infrastructure Is Dumb (Non-Negotiable)

Infrastructure may only:

- store text,
- retrieve text,
- stream text,
- forward text,
- enforce constraints.

Infrastructure MUST NOT:

- infer state,
- derive meaning,
- collapse text into variables,
- summarise authority,
- rank importance,
- decide relevance.

Any system component that "understands" text is violating this law.
```

---

## PLAN.md

**Lines 1-80:**
```markdown
# EXECUTION PLAN — HARDENED, CONTRACT-FIRST, UI-DRIVEN
# AUTHORITATIVE BASIS: NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# STATUS: CANDIDATE FOR LOCKING

This plan is written to eliminate execution risk, not just architectural error.
No step relies on developer restraint, Copilot goodwill, or "we'll fix it later".

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
```

---

END OF FILE
