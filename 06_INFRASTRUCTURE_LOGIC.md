# 06_INFRASTRUCTURE_LOGIC
## Runtime Infrastructure and Invocation Logic

Version: 3.1 (Constitutional Lock)
Status: AUTHORITATIVE

---

## PREAMBLE: WHAT THE INFRASTRUCTURE IS

The Infrastructure is not intelligence.
The Infrastructure is not simulation.
The Infrastructure is not orchestration logic.

The Infrastructure is **plumbing**.

Its role is to:
- decide when to invoke the Renderer
- decide what inputs are passed
- write outputs verbatim
- enforce constitutional constraints

The Infrastructure never decides *what happens*.
It decides only *when the next beat may occur*.

---

## CORE ASSERTION

> The Infrastructure governs invocation, not outcome.

If it decides content, the system is broken.

---

## I. INVOCATION TRIGGERS

### I.1 Valid Triggers

The Infrastructure MAY invoke the Renderer when:

- new user input is received
- a World Fact Seed is introduced
- social momentum plausibly persists
- unresolved interaction remains active
- silence has plausibly dissolved

Invocation is permission, not obligation.

---

### I.2 Invalid Triggers

The Infrastructure MUST NOT invoke the Renderer:

- on a timer
- on a tick
- on device connection
- on page refresh
- on heartbeat
- to “keep things alive”

There is no background clock.

---

## II. USER INPUT HANDLING

### II.1 Non-Privileged Input

User input:
- is not a command
- is not a trigger override
- is not a conversational opener by default

User input is treated identically to:
- any Agent utterance
- any observable action

---

### II.2 Input Does Not Imply Response

The arrival of user input does NOT require:
- an immediate reply
- a reply at all
- a single-beat response

Silence after user input is valid if context permits.

---

## III. NON-USER-PRIVILEGED INITIATION

### III.1 Autonomous Invocation

The Infrastructure MAY invoke the Renderer without user input.

This includes cases where:
- Agents are present
- social space exists
- context permits initiation

No component waits for the user.

---

### III.2 Social Openings

The Infrastructure MUST allow:
- Agents to initiate interaction
- conversations to begin without prompts
- speech to emerge from silence

Blocking this is a constitutional violation.

---

## IV. CONVERSATIONAL CONTINUITY CONTROL

### IV.1 Anti “Answer-and-Close” Enforcement

The Infrastructure MUST NOT treat a beat as terminal merely because:
- a question was answered
- a request was fulfilled
- an utterance was acknowledged

Terminality must be inferred from context, not structure.

---

### IV.2 Momentum Windows

After a beat is written, the Infrastructure MAY consider:
- immediate re-invocation
- deferred re-invocation
- no further invocation

Based on:
- whether interaction feels open
- whether attention remains engaged
- whether unresolved threads exist

There is no fixed rule.
Only plausibility.

---

## V. WORLD FACT SEEDS

### V.1 Injection

World Fact Seeds may be injected by the Infrastructure.

They:
- are written verbatim
- assert existence only
- do not imply awareness

---

### V.2 No World Persistence

After injecting a Fact Seed:
- the World withdraws
- no follow-up is generated automatically
- consequences arise only through interaction

The Infrastructure MUST NOT elaborate.

---

## VI. RECORDING AND PERSISTENCE

### VI.1 Recorder Authority

All Renderer output:
- is written verbatim
- becomes immutable
- becomes authoritative reality

The Infrastructure MUST NOT:
- edit
- paraphrase
- summarise
- label

---

### VI.2 Pause Point Management

The Infrastructure maintains a single pause point:
- indicating the last visible beat
- shared across all devices
- advanced only when a new beat is written

Observation does not advance reality.

---

## VII. FAILURE MODES (GUARDS)

The Infrastructure MUST actively prevent:

- runaway generation
- filler beats
- politeness loops
- forced closure
- background chatter
- idle simulation

When in doubt, do nothing.

---

## FINAL RULE (NON-NEGOTIABLE)

If the Infrastructure produces output because “something should happen”, it is wrong.

Only plausibility authorises invocation.

---

END OF DOCUMENT