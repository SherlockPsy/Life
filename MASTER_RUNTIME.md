# MASTER_RUNTIME (v6)
## Runtime Invocation, Opportunity, Writing, Rendering, and Record Integrity

Runtime exists to **provide opportunities for writing** and to **record what is written**.
Runtime does not decide what happens in the world.

---

## PREAMBLE

This Runtime governs how the system is invoked, how writing opportunities are created, how writing is recorded, and how rendering is produced.

It must uphold the Constitution’s core physics:

- Written text is the only reality.
- Rendering is separate from existence.
- Off-screen life is narrated, not simulated.
- Initiative belongs to people, not the system.
- Invocation is not causation.
- Time exists as context, not as a rule engine.
- Summaries may exist only as non-authoritative reading aids.

---

## CORE ASSERTION

**Runtime only grants opportunities to write and faithfully records what is written.**

Runtime must be:
- blind to “story significance,”
- blind to “pacing,”
- blind to “what should happen,”
- blind to “who should act.”

Runtime must be able to do nothing (silence) without treating that as failure.

---

## I. WHAT THE RUNTIME IS (AND IS NOT)

### I.1 Runtime Is Not a Director

Runtime MUST NOT:
- choose moments,
- evaluate relevance,
- enforce narrative momentum,
- nudge outcomes,
- “keep things interesting,”
- decide someone should act.

### I.2 Runtime Is Not a Simulation

Runtime MUST NOT:
- simulate gradual change,
- advance hidden variables,
- maintain meters/flags/counters,
- decay or refresh psychological state,
- update the world in the background.

Reality changes only when new text is written and recorded.

### I.3 Runtime Is Not a State Machine

Runtime MUST NOT implement “if X then Y happens” world logic beyond:
- validating input contracts,
- enforcing record integrity,
- enforcing idempotency rules where specified,
- enforcing security and correctness rules.

### I.4 Runtime May Create Opportunities (Without Causing Outcomes)

Runtime MAY create opportunities for writing by permitting invocation windows triggered by:
- explicit external requests (user/system API calls),
- content-agnostic time passage mechanisms,
- content-agnostic randomness.

However:
- these triggers must never imply that writing must occur,
- these triggers must never encode semantic meaning,
- these triggers must never select outcomes.

---

## II. INVOCATION PRINCIPLE

### II.1 Invocation Is Permission, Not Obligation

On any invocation, the system may:
- write new text, or
- write nothing (silence).

Invocation must never be treated as a requirement to “produce content.”

### II.2 Invocation Sources (Allowed)

Invocation is allowed only via an explicit invocation event, such as:

1) **User-initiated calls** (e.g., sending user speech)
2) **Non-user initiated calls** (e.g., “beat” opportunities that do not include user speech)
3) **Opportunity invocations** initiated by time/randomness that are:
   - opaque,
   - content-agnostic,
   - non-predictable,
   - non-semantic.

Every invocation must be logged as an invocation event.

### II.3 Invocation Sources (Forbidden)

Invocation is forbidden if it is caused by:

1) semantic rules such as:
   - “if boredom > 0.7 then call,”
   - “if momentum low then add drama,”
   - “if user inactive then force event.”

2) deterministic schedules that function as outcome engines, such as:
   - “every 10 minutes, something happens.”

3) any component that inspects world content to decide when to invoke.

**Time/randomness may open opportunities. They must not choose outcomes.**

---

## III. TIME IN RUNTIME

### III.1 Time as Context

Runtime MAY read objective wall-clock time to provide context to the writing process, including:
- current timestamp,
- timezone context where applicable,
- elapsed time since last write (as a fact about timestamps, not as simulated experience).

Runtime MUST NOT interpret time as a rule engine:
- no “because it is 9am, force breakfast,”
- no “because it is Friday, force party.”

Time is informational context only.

### III.2 Calendar Commitments and “Due-ness”

Runtime MUST NOT invent plans or appointments.

If plans/appointments exist because they were written, Runtime may expose time context such that the writing process can acknowledge:
- due,
- missed,
- delayed,
- early,
- travel-time plausibility.

But Runtime must not enforce an outcome:
- it may permit an opportunity;
- it may not force a meeting to “happen.”

### III.3 Opportunity Triggers from Time (Allowed Form)

If time-based opportunity triggering is enabled, it must obey:

1) **Content-agnostic:** the trigger does not look at world text.
2) **Non-semantic:** no meaning is attached to “why now.”
3) **Non-fixed:** no simple fixed interval (“every 5 minutes”) as the defining mechanism.
4) **Non-obligating:** a triggered opportunity can yield silence.

A time-based trigger is allowed only as a way to permit thought/writing, not to cause action.

### III.4 Opportunity Triggers from Randomness (Allowed Form)

Randomness-based opportunity triggering is allowed only if:
- randomness selects only “an opportunity occurred,”
- randomness does not select which agent acts,
- randomness does not select events,
- randomness does not inject facts.

Randomness may open the door. It may not decide what walks through it.

---

## IV. WRITING PROCESS

### IV.1 Writing Is the Only World-Change

The only way reality changes is:
1) an invocation occurs (permission),
2) writing may occur (or silence),
3) written text is recorded (existence).

### IV.2 What May Be Written

Writing may include:
- public evidence (renderable),
- private text (unrendered reality),
- background developments (narrated off-screen life),
- plans/commitments,
- corrections (by new writing).

### IV.3 What Must Not Be Written

Writing must not include:
- hidden meters/flags/counters,
- mechanical triggers (“in N beats…”),
- guaranteed future outcomes,
- director commentary (“this is a good moment to…”),
- summary text presented as if it were authoritative reality.

---

## V. RENDERING (PROJECTION, NOT EXISTENCE)

### V.1 Rendering Is Optional

Runtime may render:
- everything,
- a subset,
- or nothing,
depending on the interface requirements.

Rendering decisions do not affect what exists.

### V.2 Rendering Must Not Create Facts

Runtime must not:
- infer new facts for display,
- “clean up” or rewrite reality for readability,
- present summaries as if they were original authoritative text.

Rendering must be faithful to written text.

---

## VI. SUMMARIES (READING AIDS ONLY)

### VI.1 Summary Generation Rules

Summaries may be produced only if:
1) they are derived solely from authoritative written text,
2) they introduce no new facts or interpretations,
3) each summary is linked to a source span of authoritative text.

### VI.2 Summary Authority

Summaries are non-authoritative.
If a summary conflicts with authoritative text, authoritative text wins automatically.

### VI.3 Summaries as Context Loading

Runtime may provide summaries to aid reading and context loading, but it must preserve the primacy of authoritative text by ensuring:
- the authoritative record remains intact and retrievable,
- summaries are clearly marked and traceable,
- the writing process is grounded in written reality, not invented compression.

---

## VII. INPUT HANDLING

### VII.1 Input as Evidence

User input may be written as evidence, subject to:
- format and safety validation,
- record integrity constraints.

### VII.2 No Guaranteed Response

The system must not promise that any input yields a reply.
Silence is valid and must not be treated as error.

---

## VIII. RECORDING (INTEGRITY)

### VIII.1 Verbatim Recording

Runtime must record written text verbatim.
No post-hoc rewriting, paraphrasing, or stylistic “cleanup” is allowed in the authoritative record.

### VIII.2 Append-Only

Runtime must enforce append-only storage of authoritative text.
Corrections are new writing, not edits.

### VIII.3 Timestamping

Each written entry must include:
- a timestamp anchored to objective time,
- authorship attribution,
- visibility classification (renderable/unrendered),
- and any required linkage metadata (e.g., summaries to spans).

---

## IX. FAILURE MODES (GUARDS)

Runtime must fail safely and explicitly when integrity is at risk, including:
- missing required configuration for persistence,
- inability to write to the authoritative record,
- corrupted or non-append-only storage conditions,
- attempts to invoke forbidden mechanisms (director logic, hidden state, semantic schedulers).

On such failures:
- Runtime must not invent compensations,
- Runtime must not “continue anyway” by simulating state,
- Runtime must not rewrite reality to recover.

---

## FINAL RULE

Runtime provides opportunities.
Writing changes reality.
Recording makes it exist.
Rendering merely shows a slice.

Time and randomness may open opportunities, but they never decide outcomes.