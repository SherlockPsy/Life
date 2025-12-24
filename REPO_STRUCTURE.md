# REPOSITORY STRUCTURE
## Copilot-Proof Physical Architecture for Semantic Reality

This document defines the **only valid repository structure** for the system.

This structure is not cosmetic.
It is a **constraint mechanism**.

Copilot is expected to build the system.
Therefore the filesystem itself must encode ontology, authority, and prohibition.

If a concept has no folder, it does not exist.
If a folder exists, it may contain only what is explicitly allowed.

---

## TOP-LEVEL TREE (CANONICAL)

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

## /law/

This folder defines **what reality is allowed to be**.

### /law/0_constitution/

**Purpose:** Supreme, non-negotiable law.

Allowed:
- Markdown only
- Absolute definitions
- Explicit prohibitions

Forbidden:
- Code
- TODOs
- “Future considerations”
- Implementation advice

Copilot must treat these files as immutable law.

---

### /law/1_contracts/

**Purpose:** Binding operational constraints.

Allowed:
- Markdown only
- Enforcement rules
- Hard bans

Forbidden:
- APIs
- Examples that look like functions
- Optimization guidance

Contracts constrain behavior.
They do not describe how to “build faster” or “improve UX”.

---

## /ontology/

This folder encodes the **four and only four things that exist**.

No other folder may introduce new ontological entities.

---

### /ontology/public_reality/

**Represents:** Public reality (Exposed Evidence).

Allowed:
- Append-only evidence storage
- Ordering tokens
- Text persistence

Forbidden:
- State variables
- Summaries
- Interpretation
- Truth reconciliation
- Mutation of past evidence

If it is not append-only text, it does not belong here.

---

### /ontology/private_reality/

**Represents:** Per-person private ledgers.

Allowed:
- Text-only personal notebooks
- Write-only by the owning agent

Forbidden:
- Cross-agent access
- Promotion to public truth
- System queries
- Aggregation

Private reality is sealed by design.

---

### /ontology/identity/

**Represents:** Identity constitutions.

Allowed:
- Static Markdown files
- Values, invariants, boundaries, voice

Forbidden:
- Runtime mutation
- Learning
- Counters
- Scores
- Traits derived from behavior

Identity is read.
Never updated.

---

### /ontology/world/

**Represents:** The World as orchestrator.

Allowed:
- Evidence injection
- Collision
- Interruption
- Environmental change
- Randomness

Forbidden:
- Decision logic
- Outcome optimization
- Knowledge of agent internals
- Moral or narrative intent

The World causes.
It never decides.

---

## /clerks/

This folder contains **non-thinking clerical machinery**.

The name is intentional.
These components are not engines, services, or managers.

---

### /clerks/recorder/

Allowed:
- Forensic validation
- Rejection of illegal output
- Writing evidence to public reality

Forbidden:
- Interpretation
- Auto-correction
- Explanation

---

### /clerks/retrieval/

Allowed:
- Vector similarity
- Tag matching
- Mechanical candidate selection

Forbidden:
- Ranking by importance
- Mood-based retrieval
- State-based filtering

Retrieval selects.
Readers interpret.

---

### /clerks/invocation/

Allowed:
- Context assembly
- Passing text to the LLM
- Receiving text back

Forbidden:
- Loops
- Scheduling
- Background execution
- Queues

Invocation is discrete.

---

### /clerks/validation/

Allowed:
- Continuity checks
- Physics plausibility checks
- Contract enforcement

Forbidden:
- Auto-fixing output
- Soft warnings
- Fallback narration

Invalid output fails hard.

---

## /boot/

**Purpose:** Initial reality only.

Allowed:
- One Markdown file
- Initial public evidence

Forbidden:
- Setup scripts
- Migrations
- Seed state
- Configuration logic

Startup is evidence, not configuration.

---

## /README.md

Allowed:
- Brief description of what this system is
- Brief description of what it is not

Forbidden:
- Architecture diagrams
- How-to guides
- Friendly onboarding
- Feature lists

Marketing text causes hallucinations.
Do not feed Copilot marketing text.

---

## DELIBERATELY ABSENT FOLDERS

The following folder names MUST NOT exist:

- /utils
- /services
- /engine
- /state
- /memory
- /scheduler
- /time
- /ai
- /logic

If Copilot suggests adding one of these, it is wrong.

---

## FINAL NOTE

This repository structure is a **physical enforcement of ontology**.

If something cannot be placed in this tree without violating a rule above,
then it is not allowed to exist in the system.

END OF DOCUMENT