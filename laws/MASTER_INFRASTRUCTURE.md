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

Any system component that “understands” text is violating this law.

---

### I.2 Text Fidelity

All authoritative text:

- is stored verbatim,
- is retrieved verbatim,
- is forwarded verbatim.

There is:
- no rewriting layer,
- no compression layer,
- no semantic normalisation,
- no cleanup pass.

Spelling errors persist.
Contradictions persist.
Mess persists.

Reality is not hygienic.

---

### I.3 Append-Only Reality

The authoritative record is strictly append-only.

Infrastructure MUST NOT:

- mutate past rows,
- delete rows,
- merge rows,
- reorder rows,
- “fix” text,
- replace history with summaries.

Corrections exist only as new rows.

---

## ARTICLE II — AUTHORITATIVE DATA STORES

### II.1 Authoritative Ledger (PostgreSQL)

PostgreSQL is the sole authority on existence.

It stores:

- public evidence,
- private / unrendered text,
- world facts and fact seeds,
- plans and commitments,
- identity constraint documents,
- invocation audit records.

It does NOT store:

- inferred state,
- counters,
- meters,
- decay values,
- importance labels,
- emotional tags,
- behavioural flags.

---

### II.2 Recorder Rows (Conceptual Model)

Each recorder row contains:

- monotonic ordering key,
- timestamp (system time, not simulation),
- raw text content,
- authorship attribution,
- visibility classification,
- invocation reference.

No row is ever updated.
No row is ever deleted.

---

### II.3 Atomic Bundles (Hard Integrity)

1) A single invocation may produce multiple rows.
2) These rows form one atomic bundle.
3) Either all rows commit, or none do.
4) Ordering inside a bundle is preserved exactly.
5) Bundles MUST NOT interleave.

Retries MUST NOT duplicate rows.
Idempotency is mandatory.

---

## ARTICLE III — SYSTEM TIME (MECHANICAL ONLY)

### III.1 System Time Coordinate

Infrastructure maintains a system time coordinate that:

- advances continuously,
- advances independently of writing,
- is monotonic and irreversible,
- is initialised explicitly at system start,
- is not aligned to OS time by default.

System time exists even if nothing is written.

---

### III.2 What System Time Is For

System time is used ONLY for:

- timestamps,
- ordering guarantees,
- auditability,
- contextual reference when permitted.

System time MUST NOT:

- advance reality,
- trigger events,
- force writing,
- simulate life.

---

### III.3 “Last Written” Pointer

Infrastructure may maintain a pointer to the last written row.

This pointer:

- exists for streaming efficiency only,
- has no narrative meaning,
- MUST NOT be treated as “the present.”

Reality is not defined by a pointer.

---

## ARTICLE IV — VECTOR STORE (QDRANT)

### IV.1 Purpose

Qdrant exists solely to support **selective rereading**.

It supports:

- semantic similarity retrieval,
- mechanical relevance search.

It does NOT support:

- memory compression,
- summarisation into authority,
- importance ranking,
- decay modelling,
- behavioural shaping.

---

### IV.2 Indexing Rules

Only raw authoritative text may be indexed.

Indexes MUST NOT include metadata encoding:

- emotion,
- intent,
- priority,
- truth,
- importance,
- identity IDs,
- scene IDs,
- thread IDs.

Text in.
Text out.

---

### IV.3 Retrieval Discipline

Retrieval:

- asserts no correctness,
- asserts no completeness,
- may fail silently.

Failure to retrieve context is meaningful.
Infrastructure MUST NOT compensate by inventing context.

---

## ARTICLE V — MODEL INVOCATION BOUNDARIES

### V.1 Models Are Stateless Services

All models are invoked as stateless services.

Models:

- retain no memory,
- hold no continuity,
- store no state.

All continuity lives exclusively in written text.

---

### V.2 Prompt Assembly Discipline

Infrastructure MUST ensure prompts contain ONLY:

- text that exists in the authoritative record,
- text permitted for the invoked agent,
- text relevant to the invocation context,
- the current Scene Anchor when required.

Infrastructure MUST NOT inject:

- inferred facts,
- behavioural hints,
- summaries as authority,
- “helpful” framing,
- identity demonstrations,
- internal system commentary.

---

### V.3 Identity Handling (Critical)

Infrastructure MUST NOT expose numeric IDs to models.

Identity is conveyed only via:

- semantic descriptors,
- persistent constraints,
- accumulated written continuity.

Full biographies MUST NOT be re-injected every turn.

Identity persistence is enforced by constraint, not repetition.

---

## ARTICLE VI — SCENE CONTEXT MECHANICS

### VI.1 Scene Anchor Handling

Infrastructure MUST support:

- Scene Anchor caching,
- single-send semantics,
- explicit re-injection only on:
  - context exhaustion, OR
  - explicit scene change.

Scene Anchors are:

- total,
- never partial,
- never diff-based.

---

### VI.2 Context Exhaustion Tracking

1) Token tracking exists outside the LLM.
2) Infrastructure MUST track remaining usable context.
3) When remaining context drops below threshold:
   - full Scene Anchor is re-injected.
4) The LLM MUST NOT detect or manage its own limits.

---

## ARTICLE VII — STREAMING & CLIENTS

### VII.1 Observation Is Passive

Client connections:

- do not trigger invocation,
- do not advance time,
- do not generate output,
- do not cause writes.

Watching is inert.

---

### VII.2 Cross-Device Continuity

Because:

- the ledger is authoritative,
- ordering is global,
- system time is global,

any client may disconnect and reconnect without loss of reality.

No client session state exists.

---

## ARTICLE VIII — SECURITY & ACCESS

### VIII.1 Administrative Access

Administrative access may inspect:

- ledger contents,
- invocation logs,
- identity constraint documents.

Administrative access MUST NOT:

- alter past text,
- inject hidden state,
- rewrite contradictions,
- influence outcomes.

---

### VIII.2 Separation of Concerns

Infrastructure enforces:

- access control,
- rate limiting,
- transport integrity,
- append-only guarantees.

Infrastructure does NOT enforce:

- realism,
- narrative quality,
- psychological correctness,
- behavioural appropriateness.

---

## ARTICLE IX — FAILURE MODES

Infrastructure MUST fail explicitly when:

- atomicity cannot be guaranteed,
- idempotency is threatened,
- ordering cannot be preserved,
- forbidden mechanisms are attempted.

Infrastructure MUST NOT:

- auto-heal,
- invent missing data,
- “do something reasonable.”

If it cannot uphold law, it must stop.

---

## FINAL RULE

Infrastructure moves text.
It preserves order.
It enforces nothing else.

Anything smarter belongs elsewhere and is forbidden here.