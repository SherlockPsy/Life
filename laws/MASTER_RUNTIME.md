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
- “keep life moving.”

---

### I.2 Runtime Is Not a Simulation

Runtime MUST NOT:

- simulate gradual change,
- evolve hidden variables,
- decay or refresh state,
- advance the world implicitly,
- run background life.

Nothing changes unless text is written.

---

### I.3 Runtime Is Not a State Machine

Runtime MUST NOT encode semantic rules such as:

- “if bored then act,”
- “if quiet then inject event,”
- “if time passed then respond.”

Runtime logic is limited to:
- invocation handling,
- context assembly,
- record integrity,
- idempotency,
- access control.

---

## ARTICLE II — INVOCATION PRINCIPLE

### II.1 Invocation Is Permission, Not Obligation

An invocation:

- opens an opportunity to write,
- does not require output,
- does not imply relevance,
- does not imply action.

Invocation is not causation.

---

### II.2 Allowed Invocation Sources

Invocation may occur only via explicit, non-semantic triggers:

1) **Participant-Initiated**
   - speech,
   - actions,
   - written contributions.

2) **Non-Participant Opportunities**
   - beat-style opportunities,
   - system ticks,
   - time-based opportunities,
   - randomness-based opportunities.

All such invocations must be:

- content-agnostic,
- non-obligating,
- non-semantic,
- mechanically blind.

---

### II.3 Forbidden Invocation Sources

Invocation MUST NOT be triggered by:

- semantic inspection of world state,
- boredom detection,
- momentum heuristics,
- narrative pacing logic,
- countdown schedules,
- “nothing happened” detection.

Time and randomness may open the door.
They may not decide what walks through it.

---

## ARTICLE III — TIME IN RUNTIME

### III.1 Objective Runtime Time

1) Runtime maintains a continuously advancing objective time coordinate.
2) This time:
   - advances even if nothing is written,
   - is monotonic and irreversible,
   - is independent of rendering,
   - is independent of OS wall-clock by default.
3) Runtime time may be provided as contextual reference only.

Time advancing alone does NOT:
- create facts,
- force perception,
- require writing,
- trigger outcomes.

---

### III.2 Time Awareness vs Time Control

1) Agents may perceive time.
2) Writing perceived time is allowed.
3) Runtime must prevent authorial time control:
   - no arbitrary jumps,
   - no compression into a new “now,”
   - no advancing time by declaration alone.

---

## ARTICLE IV — SCENE ANCHOR (CRITICAL)

### IV.1 Always-On Scene Anchor Requirement

For **every invocation that permits writing**, Runtime MUST provide a Scene Anchor.

A Scene Anchor MUST exist even if:

- nothing happens,
- everyone is asleep,
- silence occurs,
- no output is produced.

“No scene” is a forbidden runtime state.

---

### IV.2 Scene Anchor Definition

A Scene Anchor is minimal grounding text describing:

- where the agent is,
- who is present or relevant,
- what conditions are perceptually salient,
- what time context matters to perception.

A Scene Anchor is:

- text only,
- not authoritative reality by itself,
- not a data structure,
- not a diff.

---

### IV.3 Scene Anchor Continuity

1) Scene Anchors persist across invocations.
2) Scene setup is sent once and treated as cached context.
3) Scene Anchors MUST NOT be resent on every invocation.
4) Scene Anchors are reintroduced ONLY when:
   - context window exhaustion approaches, OR
   - an explicit scene change has been written.

---

### IV.4 Scene Update Rules

1) Scene updates are total replacements.
2) Partial scene updates are forbidden.
3) Micro-location changes do NOT require scene replacement.
4) Explicit scene changes replace the full anchor.

---

### IV.5 Context Exhaustion Detection

1) Token and context exhaustion detection exists outside the LLM.
2) Runtime MUST track remaining context mechanically.
3) When remaining context drops below a defined threshold:
   - the full Scene Anchor is re-injected.
4) The LLM must NOT be responsible for detecting its own context limits.

---

## ARTICLE V — KNOWLEDGE GATING

### V.1 Storage ≠ Knowledge

1) Runtime MUST NOT assume agents know what is stored.
2) Ledger access does not imply awareness.

---

### V.2 Context Loading Rules

When invoking writing for an agent, Runtime MUST load:

- only text the agent plausibly knows,
- only text that has been written,
- only text permitted by access rules.

Runtime MUST exclude:

- other agents’ private text,
- off-screen developments unknown to the agent,
- inferred facts.

Ignorance must be preserved.

---

### V.3 Error Preservation

Agents may:

- be wrong,
- contradict facts,
- misunderstand reality.

Runtime MUST record this without correction.

Reality is not “fixed” by the system.

---

## ARTICLE VI — WRITING BUNDLES AND CAUSALITY

### VI.1 Single Invocation, Multiple Writes

During a single invocation, writing MAY include:

- multiple public entries,
- multiple private entries,
- off-screen developments for other agents.

---

### VI.2 Atomic Bundle Requirement

1) All writes from a single invocation form one atomic bundle.
2) Bundles share:
   - a single invocation reference,
   - ordered timestamps,
   - explicit authorship.
3) Partial bundle commits are forbidden.
4) Interleaving bundles from different invocations is forbidden.

---

### VI.3 Causal Honesty

1) Every written event must have exactly one origin.
2) Nothing may occur without a written cause.
3) Retroactive plausibility generation is forbidden.
4) “What likely happened” is invalid.

---

## ARTICLE VII — OFF-SCREEN WRITING

Runtime MAY permit off-screen writing during any invocation, provided:

- it does not depend on participant actions,
- it does not causally affect the current scene,
- it obeys all World and Constitutional rules.

Off-screen writing must not be used as justification for other writes in the same bundle.

---

## ARTICLE VIII — RENDERING SEPARATION

1) Rendering is a projection choice.
2) Rendering does not create facts.
3) Runtime MUST NOT:
   - infer missing facts,
   - smooth contradictions,
   - replace text with summaries.

---

## ARTICLE IX — SILENCE

1) Silence is allowed.
2) Silence is not privileged.
3) Silence must not be encouraged mechanically.
4) Silence must not replace valid output.

Silence occurs only if chosen.

---

## ARTICLE X — FAILURE MODES

Runtime MUST fail explicitly when:

- record integrity is threatened,
- atomicity cannot be guaranteed,
- forbidden mechanisms are attempted.

Runtime MUST NOT:

- invent compensations,
- “do something reasonable,”
- simulate continuity.

---

## FINAL RULE

Runtime opens the door.
Writing changes reality.
Recording makes it exist.
Time passes regardless.