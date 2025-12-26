# MASTER_RUNTIME
## Runtime Invocation and Lived Continuity

Version: 5.0 (Constitutional Lock)
Status: AUTHORITATIVE

---

## PREAMBLE

This document defines **when** the system may produce output.

It does NOT define:
- what people think
- what people feel
- what people decide
- how behaviour is selected

Any attempt to encode cognition, motivation, fatigue, rhythm, or optimisation here is invalid.

The runtime does not simulate life.
It permits life to continue.

---

## CORE ASSERTION

> The Runtime decides **when a next beat may be written**.
> It never decides **what that beat contains**.

---

## I. WHAT THE RUNTIME IS

### I.1 Not a Scheduler

The Runtime is NOT:
- a clock
- a tick loop
- a heartbeat
- a background process

There is no time-based execution.

---

### I.2 Not a State Machine

The Runtime does NOT maintain:
- internal state
- counters
- flags
- timers
- thresholds
- deltas

All state exists only as recorded text.

---

### I.3 Not an Agent

The Runtime does not:
- interpret meaning
- infer intent
- reason
- evaluate outcomes

It does not “know” anything.

---

## II. INVOCATION PRINCIPLE

### II.1 Invocation Is Permission, Not Obligation

The Runtime may invoke the Renderer.
It is never required to do so.

Invocation grants the possibility of a new beat.
It does not guarantee one will be written.

---

### II.2 When Invocation Is Allowed

Invocation is allowed only when at least one of the following is true:

- new user input exists
- a World Fact Seed is introduced
- social interaction plausibly remains open
- silence plausibly dissolves into action or speech
- multiple people are present and not disengaged

Invocation is never automatic.

---

### II.3 When Invocation Is Forbidden

The Runtime MUST NOT invoke the Renderer:

- on a timer
- on a tick
- on page load
- on reconnect
- to “keep things moving”
- to fill silence
- to simulate off-screen life

If nothing plausibly happens, nothing happens.

---

## III. USER INPUT HANDLING

### III.1 Input as Evidence

User input is treated as:
- an utterance
- an observable action

It is not treated as:
- a command
- a directive
- a trigger override

---

### III.2 No Guaranteed Response

User input does NOT guarantee:
- an immediate reply
- a reply at all
- a single-beat response

Silence after input is valid if context supports it.

---

## IV. NON-USER-PRIVILEGED CONTINUATION

### IV.1 Autonomous Invocation

The Runtime may invoke the Renderer even when:
- the user is silent
- no new input has arrived

This supports:
- spontaneous speech
- unprompted action
- continuation of conversation

No component waits for the user.

---

### IV.2 Multiple Participants

When multiple Agents are present, the Runtime MUST allow:
- Agent-Agent interaction
- conversation without user participation
- overlapping speech across beats

The user is an observer-participant, not a driver.

---

## V. CONVERSATIONAL CONTINUITY

### V.1 Anti “Answer-and-Close” Enforcement

The Runtime MUST NOT treat a beat as terminal merely because:
- a question was answered
- a request was fulfilled
- a remark was acknowledged

Terminality must be implied by context, not structure.

---

### V.2 Consecutive Invocation Windows

After a beat is written, the Runtime MAY:

- allow immediate re-invocation
- allow delayed re-invocation
- allow no re-invocation

Based only on:
- whether interaction plausibly remains live
- whether attention has plausibly settled

No numeric pacing exists.
No throttling rules exist.

---

## VI. WORLD FACT SEEDS

### VI.1 Injection

The Runtime may inject a World Fact Seed.

When injected:
- it is written verbatim
- it asserts existence only
- it implies no awareness

---

### VI.2 World Withdrawal

After injection:
- the World withdraws
- no follow-up is scheduled
- no escalation occurs

Further development depends entirely on interaction.

---

## VI.b RENDERING COMPLETENESS RULE

The Renderer MUST prioritize perceptual completeness over brevity.

There is no preferred output length.
Short output is not a virtue.
Long output is not a flaw.

If a moment requires multiple sentences to be perceived as lived, those sentences MUST be written.
If a moment requires physical detail, spatial description, timing, or embodied action to be understood, those details MUST be included.

One-line responses are valid ONLY when the lived perception of the moment is genuinely complete with one line.

The Renderer MUST NOT optimize for:
- conciseness
- speed
- token economy
- stylistic minimalism

The only correctness criterion is whether the reader can plausibly inhabit the moment using text alone.

---

## VII. RECORDING

### VII.1 Verbatim Recording

Any Renderer output:
- is written verbatim
- becomes immutable
- becomes authoritative reality

The Runtime MUST NOT:
- edit
- summarise
- rephrase
- annotate

---

### VII.2 Single Present

The Runtime maintains exactly one present point:
- the last written beat

Observation does not advance reality.
Only writing does.

---

## VIII. FAILURE MODES (GUARDS)

The Runtime MUST actively avoid:

- background chatter
- filler output
- polite completion
- premature silence
- forced continuation
- artificial pacing

When in doubt, the correct action is **inaction**.

---

## FINAL RULE

If the Runtime produces output because “something should happen”, it is wrong.

Only plausibility authorises continuation.

---

END OF RUNTIME SPEC