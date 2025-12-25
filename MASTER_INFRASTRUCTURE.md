# MASTER_INFRASTRUCTURE.md
## The Physical and Logical Hardware of Semantic Reality

**Authority:** HIGH (Hardware Law)
**Scope:** Deployment, Database, Filesystem
**Enforcement:** Automated

---

# PART 1: RAILWAY DEPLOYMENT SPECIFICATION

## PREAMBLE

This section defines the **actual inventory** and **setup plan** for the system.
It is based on the verified documentation for Railway, Postgres, Qdrant, Venice, and DeepSeek.

---

## I. THE INFRASTRUCTURE STACK

The system requires exactly **three** mandatory services (and one optional).

### 1. PostgreSQL (The Authoritative Ledger)
- **Role:** The sole source of truth for Public Evidence, Private Ledgers, and Identity.
- **Provider:** Railway PostgreSQL Template.
- **Variables:** `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`.
- **Constraint:** Must be authoritative. If Qdrant disagrees with Postgres, Postgres wins.

### 2. Qdrant (The Vector Cortex)
- **Role:** Search accelerator and context assembler.
- **Provider:** Qdrant Cloud (Recommended) or Self-Hosted on Railway.
- **Configuration:**
  - **Collection:** `life_vectors` (or similar).
  - **Metric:** Cosine.
  - **Dimensions:** Must match embedding model (e.g., 1536).
  - **Payload:** Arbitrary JSON used for **filtering** (Location, AgentID, BlockType).
- **Security:** API Key authentication MUST be enabled.

### 3. The App Service (The API Server)
- **Role:** The runtime that talks to Postgres, Qdrant, and LLMs.
- **Provider:** Railway App Service (Node/Python).
- **Build:** Copilot-generated.

### 4. Redis (Optional)
- **Role:** Caching assembled context or rate limits.
- **Provider:** Railway Redis Template.

---

## II. ENVIRONMENT VARIABLES (APP SERVICE)

These variables must be set in Railway (not in code).

### Core Connectivity
- `DATABASE_URL`: (Auto-injected by Railway)
- `QDRANT_URL`: The specific endpoint for the cluster.
- `QDRANT_API_KEY`: The secret key for vector access.

### Venice AI (Renderer)
- `VENICE_API_KEY`: [Secret]
- `VENICE_BASE_URL`: `https://api.venice.ai/api/v1`
- `VENICE_MODEL_RENDERER`: `venice-uncensored`

### DeepSeek (Logic & Seeding)
- `DEEPSEEK_API_KEY`: [Secret]
- `DEEPSEEK_BASE_URL`: `https://api.deepseek.com`
- `DEEPSEEK_MODEL_CHAT`: `deepseek-chat` (V3)
- `DEEPSEEK_MODEL_REASONER`: `deepseek-reasoner` (R1 - Thinking Mode)

---

## III. DATABASE SCHEMA (POSTGRES)

The App must manage these tables via migrations.

### Table A: `public_evidence_blocks`
- **Nature:** Append-only, Immutable.
- **Fields:**
  - `id` (UUID/BigInt)
  - `content` (Text)
  - `location_token` (Text)
  - `timestamp` (ISO8601)
  - `source_agent_id` (Text)

### Table B: `private_ledger_entries`
- **Nature:** Append-only, Sealed per Agent.
- **Fields:**
  - `id` (UUID/BigInt)
  - `agent_id` (Text - Owner)
  - `content` (Text)
  - `timestamp` (ISO8601)
  - `associated_block_id` (Optional - Link to public event)

### Table C: `identity_constitutions`
- **Nature:** Static, Versioned.
- **Fields:**
  - `agent_id` (PK)
  - `content` (Markdown Text)
  - `hash` (For integrity checks)

---

## IV. QDRANT SCHEMA (VECTORS)

Qdrant is **not truth**. It is a **search helper**.

### Indexing Rule
- Every `public_evidence_block` gets an embedding.
- **Payload** MUST include:
  - `block_id`
  - `location_token`
  - `agent_id`
  - `timestamp`
  - `type` ("public" or "private")

### Retrieval Rule
- Searches must ALWAYS filter by `location_token` to enforce the "Anti-Telepathy" rule.
- Agents cannot search global vectors. They can only search vectors present in their location.

---

## V. ANTI-TELEPATHY IMPLEMENTATION (CRITICAL)

The App must enforce awareness gating at the **Database/Query level**.

1. **Global Seeds:** World seeds exist globally in Postgres.
2. **Local Awareness:** An Agent's context query MUST exclude global seeds unless the Agent has interacted with a "Channel" (Phone, TV, Person) that reveals them.
3. **Implementation:** Do not dump the "last 50 blocks" into the prompt. Dump "last 50 blocks WHERE location = current_location".

---

# PART 2: THE DIGITAL CORTEX

## PREAMBLE: WHAT THE DIGITAL CORTEX IS

The Digital Cortex is not intelligence.
The Digital Cortex is not reasoning.
The Digital Cortex is not interpretation.

The Digital Cortex is **context assembly**.

Its sole purpose is to:
- select what text is reread
- present it coherently
- preserve epistemic limitation
- avoid telepathy
- avoid simulation

The Cortex does not think.
The Renderer thinks.

---

## CORE ASSERTION

> What the Renderer produces depends entirely on what the Cortex chooses to show.

Incorrect context produces impossible minds.

---

## I. INPUT SOURCES

### I.1 Recorder Stream

The primary input is the Recorder.

The Cortex may retrieve:
- recent Public Evidence
- nothing else by default

The Cortex MUST NOT:
- summarise history
- compress events
- infer state
- introduce interpretation

---

### I.2 User Input

User input:
- is raw text
- is unlabelled
- is unclassified
- is not privileged

User input is treated as:
- another observable utterance
- nothing more

---

### I.3 World Fact Seeds

World Fact Seeds:
- are raw text statements
- assert existence only
- imply no awareness
- imply no reaction

The Cortex MUST NOT expand them.

---

## II. CONTEXT ASSEMBLY

### II.1 Minimal Sufficiency

The Cortex assembles **only enough context** for the Renderer to plausibly continue.

There is no obligation to include:
- full scene history
- emotional arcs
- resolved interactions

Excess context causes telepathy.

---

### II.2 No Canonical Context

There is no “correct” context window.

Context is:
- contingent
- local
- sufficient, not exhaustive

Omission is meaningful.

---

### II.3 Epistemic Isolation

The Cortex MUST ensure that:

- no Agent sees what they could not plausibly know
- no Agent reacts to unseen facts
- no Renderer output implies global awareness

If an event is not perceptible in-world, it must not appear in context.

---

## III. SOCIAL INITIATION SUPPORT

### III.1 No User Privilege

The Cortex MUST NOT bias context assembly toward:

- user utterances as initiators
- user silence as blocking
- user presence as causal priority

All present Agents are equal participants.

---

### III.2 Silence as Context

Silence is part of context.

The absence of text:
- may permit initiation
- may permit continuation
- may permit drift
- may permit nothing

Silence does not mean “wait”.

---

## IV. CONVERSATIONAL CONTINUITY SUPPORT

### IV.1 Anti-Closure Bias

When assembling context, the Cortex MUST assume:

- conversation is ongoing unless explicitly ended
- topics remain live unless displaced
- social momentum decays gradually, not instantly

The Cortex MUST NOT frame interactions as completed unless evidence shows closure.

---

### IV.2 Residual Threads

If recent text contains:
- unanswered remarks
- emotional charge
- practical loose ends
- conversational hooks

the Cortex SHOULD preserve these in context to allow continuation.

---

## V. WORLD INTERRUPTIONS

### V.1 Minimal Exposure

When a World Fact Seed is included, the Cortex MUST present:

- only the perceptible assertion
- no implied consequences
- no inferred reactions

Example:
- “The doorbell rings.”

Not:
- identity
- motive
- resolution

---

### V.2 Deferment After Exposure

After a World interruption is exposed, the Cortex MUST defer.

Further context is driven only by:
- Agent action
- Agent speech
- interaction outcomes

---

## VI. MULTI-BEAT GENERATION SUPPORT

### VI.1 Consecutive Invocation Eligibility

The Cortex MAY permit consecutive Renderer invocations when:

- social momentum is high
- multiple Agents are active
- interruption remains unresolved
- interaction is unfolding

This does NOT mandate output.
It permits it.

---

### VI.2 No Artificial Throttling

The Cortex MUST NOT enforce:
- “one beat per interaction”
- fixed pacing
- conversational symmetry

Irregularity is required.

---

## VII. PROHIBITIONS

The Digital Cortex MUST NOT:

- infer intent
- calculate emotion
- assign weights
- encode rules
- label participants
- predict outcomes
- stabilise conversations artificially

If context assembly feels clever, it is wrong.

---

## FINAL RULE (NON-NEGOTIABLE)

The Cortex exists to **withhold**, not to enrich.

It must show only what a mind could plausibly reread.

Anything more is telepathy.

---

# PART 3: REPOSITORY STRUCTURE

## PREAMBLE

This section defines the **only valid repository structure** for the system.
This structure is not cosmetic. It is a **constraint mechanism**.

Copilot is expected to build the system.
Therefore the filesystem itself must encode ontology, authority, and prohibition.

If a concept has no folder, it does not exist.
If a folder exists, it may contain only what is explicitly allowed.

---

## TOP-LEVEL TREE (CANONICAL)


```

/life
├── .github/
│   └── copilot-instructions.md
│
├── law/
│   ├── 0_constitution/
│   │   ├── NON_NEGOTIABLES_v0.2.md
│   │   ├── 00_CONSTITUTION_OF_REALITY.md
│   │   └── DIRECTION.md
│   │
│   └── 1_contracts/
│       ├── 01_SYSTEM_ARCHITECTURE.md
│       ├── 02_CONTRACT_STATE.md
│       ├── 03_CONTRACT_RENDERER.md
│       ├── 04_CONTRACT_AGENT.md
│       ├── 05_THE_CINEMA.md
│       ├── 06_INFRASTRUCTURE_LOGIC.md
│       └── 07_COLLISION_AND_FRICTION.md
│
├── ontology/
│   ├── public_reality/
│   ├── private_reality/
│   ├── identity/
│   └── world/
│
├── clerks/
│   ├── recorder/
│   ├── retrieval/
│   ├── invocation/
│   └── validation/
│
├── boot/
│   └── initial_evidence.md
│
└── README.md

```

---

## AUTHORITY LADDER

Authority flows **top to bottom** and **never upward**:

1. `/law/0_constitution/`
2. `/law/1_contracts/`
3. `/ontology/`
4. `/clerks/`
5. `/boot/`

No file in a lower tier may:
- reinterpret
- override
- weaken
- “extend”

a higher tier.

---

## FOLDER DEFINITIONS

### /law/
Defines **what reality is allowed to be**.
- **0_constitution:** Supreme, non-negotiable law.
- **1_contracts:** Binding operational constraints.

### /ontology/
Encodes the **four and only four things that exist**.
- **public_reality:** Append-only evidence storage.
- **private_reality:** Per-person private ledgers (sealed).
- **identity:** Static identity constitutions.
- **world:** Evidence injection and environmental change.

### /clerks/
Contains **non-thinking clerical machinery**.
- **recorder:** Forensic validation and writing to public reality.
- **retrieval:** Vector similarity and tag matching.
- **invocation:** Context assembly and LLM passing.
- **validation:** Continuity and physics checks.

### /boot/
Contains **Initial reality only**.
- Startup is evidence, not configuration.

---

## DELIBERATELY ABSENT FOLDERS

The following folder names MUST NOT exist:

- `/utils`
- `/services`
- `/engine`
- `/state`
- `/memory`
- `/scheduler`
- `/time`
- `/ai`
- `/logic`

If Copilot suggests adding one of these, it is wrong.

---

## FINAL NOTE

This repository structure is a **physical enforcement of ontology**.

If something cannot be placed in this tree without violating a rule above,
then it is not allowed to exist in the system.

---

# END OF MASTER INFRASTRUCTURE

```