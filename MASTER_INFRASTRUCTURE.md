# MASTER_INFRASTRUCTURE
## Storage, Deployment, and System Plumbing

Version: 5.0 (Constitutional Lock)
Status: AUTHORITATIVE

---

## PREAMBLE

This document defines the **technical substrate** of the system.

It does NOT define:
- cognition
- agency
- psychology
- behaviour
- realism
- pacing

Those are constitutional concerns handled elsewhere.

Infrastructure exists to **support**, not to decide.

---

## ARTICLE I — PRINCIPLES

### I.1 Infrastructure Is Dumb

Infrastructure:
- stores text
- retrieves text
- forwards text
- persists text

Infrastructure does not:
- interpret
- infer
- optimise
- simulate
- decide

If infrastructure begins to “understand”, the system is broken.

---

### I.2 Text Fidelity

All text:
- is stored verbatim
- is retrieved verbatim
- is forwarded verbatim

There is no rewriting layer.
There is no compression layer.
There is no semantic normalisation.

---

## ARTICLE II — DATA STORES

### II.1 Authoritative Store (PostgreSQL)

PostgreSQL is the **authoritative ledger**.

It stores:
- Public Evidence (Recorder)
- World Fact Seeds
- Identity Documents
- System Configuration (non-behavioural)

It does NOT store:
- inferred state
- scores
- counters
- metrics
- derived psychology

---

### II.2 Recorder Table (Conceptual)

The Recorder table is append-only.

Each row contains:
- sequential index
- timestamp (for ordering only, not simulation)
- raw text content
- origin marker (user / agent / world)

No row is ever updated.
No row is ever deleted.

---

### II.3 Single Present Pointer

Infrastructure maintains a single pointer:
- referencing the last written Recorder row

This pointer:
- defines the present
- is shared across all devices
- advances only when a new row is written

---

## ARTICLE III — VECTOR STORE (QDRANT)

### III.1 Purpose

Qdrant exists solely to support **selective rereading**.

It is used for:
- retrieving relevant past text
- based on semantic similarity

It is NOT used for:
- memory compression
- summarisation
- state inference
- behaviour shaping

---

### III.2 Indexing Rules

Only raw text blocks may be indexed.

No metadata labels that encode:
- emotion
- intent
- priority
- importance
- decay
- truth

Text in equals text out.

---

### III.3 Retrieval Discipline

Retrieval:
- is mechanical
- is relevance-based
- asserts no correctness

Failure to retrieve is meaningful.
The system does not compensate.

---

## ARTICLE IV — MODEL INVOCATION

### IV.1 Models Used

The system uses:
- Venice (renderer)
- DeepSeek (reasoning / seeding support if needed)

Models are invoked as:
- stateless services
- with explicit input
- producing explicit output

---

### IV.2 No Persistent Model State

Models:
- do not retain memory
- do not maintain continuity
- do not store state

All continuity lives in stored text.

---

### IV.3 Prompt Discipline

Infrastructure MUST ensure that:
- only raw text is sent
- no labels are injected
- no control codes exist
- no internal fields are exposed

If it wouldn’t appear on screen, it must not appear in the prompt.

---

## ARTICLE V — STREAMING AND DEVICES

### V.1 Live Observation

Clients connect via:
- streaming (SSE or WebSocket)

They receive:
- newly written Recorder rows
- in order
- without buffering future content

---

### V.2 Cross-Device Continuity

Because:
- Recorder is authoritative
- present pointer is global

Any device may disconnect and reconnect and see:
- the same present
- the same accumulated reality

No session state exists on the client.

---

### V.3 Observation Is Passive

Client connection:
- does not trigger invocation
- does not advance time
- does not generate output

Watching is passive.

---

## ARTICLE VI — SECURITY AND ACCESS

### VI.1 Administrative Access

Administrative access may allow:
- inspection of Recorder
- inspection of Identity Documents
- inspection of World Fact Seeds

Administrative access MUST NOT:
- alter past evidence
- inject hidden state
- manipulate outcomes

---

### VI.2 Separation of Concerns

Infrastructure enforces:
- access control
- rate limiting
- API boundaries

It does NOT enforce:
- realism
- behaviour
- pacing
- narrative quality

---

## ARTICLE VII — FAILURE MODES (GUARDS)

Infrastructure MUST actively avoid:

- background jobs that simulate life
- cron-based advancement
- implicit state creation
- caching that alters order
- retries that duplicate output
- auto-healing that invents data

If infrastructure starts “helping”, it is wrong.

---

## FINAL RULE

Infrastructure exists to move text safely.

Anything beyond that belongs elsewhere and is forbidden here.

---

END OF INFRASTRUCTURE SPEC