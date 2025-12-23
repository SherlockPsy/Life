# THE SEMANTIC "I" ENGINE PROTOCOL

Version: 1.1 (Constitutional Lock)
Type: System Architecture Specification
Status: ACTIVE

---

## I. CORE DEFINITION

The **"I" Engine** is not a simulation, model, or representation of a human mind.

It is a **Reader of Evidence**.

The Engine operates on a single premise:

> **If the LLM can read it, the system must not model it.**

### Function

The Engine receives a bounded collection of text (Evidence) and produces a new block of **Exposed Evidence** attributable to a specific identity.

It does not compute state.
It does not store memory.
It does not reason numerically.
It does not possess continuity outside the provided text.

### Constraint

The Engine possesses:
- no internal variables
- no hidden state
- no meters, scores, or thresholds
- no persistence across invocations

All continuity arises exclusively from rereading evidence.

### Objective

To generate the next **physically and causally coherent action or utterance** for a specific identity, such that the output does not contradict:
- the supplied evidence
- the identity’s immutable constitution
- the physical constraints implied by the evidence

---

## II. THE DATA MODEL (THE SEMANTIC LEDGER)

The system rejects traditional stateful schemas.

There are no columns such as:
- Health
- Mood
- Energy
- Trust
- Affection

There is only **textual evidence**.

### 1. The Atomic Unit

The only valid stored unit is **Exposed Evidence**.

**Definition:**  
A discrete block of text describing observable physical reality.

**Rules:**
- It must describe *what occurred*, never *why it occurred*.
- It must describe *what can be seen, heard, or physically inferred*.
- It must not assert internal mental states as facts.

### 2. Canonical Block Structure

Each stored block contains:

- **Source**  
  The entity that produced the action or utterance.

- **Context**  
  The semantic location or situation in which the action occurred.

- **Evidence**  
  The raw forensic text.

Example:

> Source: Rebecca  
> Context: Kitchen  
> Evidence:  
> “She leans against the counter, rubbing her eyes with the back of her hand. Her grip on the porcelain mug loosens slightly.”

There are no auxiliary somatic fields.
The body is described, not measured.

---

## III. CONTEXT CONSTRUCTION (INPUT TO THE READER)

When the Engine is invoked, the system constructs a **Context Block**.

This Context Block is the *entire universe* available to the Reader for that invocation.

The Context consists of three layers.

### 1. Identity Core (Static)

**Source:** A Markdown document defining the identity.

**Contents:**
- Values
- Boundaries
- Speech constraints
- Long-term invariants

**Properties:**
- Immutable
- Always present
- Acts as an interpretive lens, not a rule engine

The Identity Core does not instruct behavior.
It constrains plausibility.

---

### 2. The Chronicle (Retrieved History)

**Source:** The public ledger of Exposed Evidence.

**Selection Principle:**  
Evidence is retrieved based on **semantic relevance to the present context**, not numeric windows or counters.

Retrieval is allowed to surface:
- related actions
- thematically adjacent moments
- notable absences (e.g., no evidence of sleep, no evidence of eating)

The Engine is not told:
- durations
- counts
- elapsed hours

It reads absence and presence directly from text.

---

### 3. Immediate Reality (The Present)

**Source:** The most recent contiguous evidence describing the current situation.

**Purpose:**
- Establish object continuity
- Establish spatial continuity
- Establish conversational continuity

This layer contains only what is necessary to describe “what is happening now,” and nothing else.

---

## IV. READING AND INFERENCE (ENGINE BEHAVIOR)

The Engine performs **no computation**.

It performs **reading**.

All inference is:
- local to the invocation
- private to the Reader
- non-persistent
- non-authoritative

### 1. Somatic Inference (Private)

The Engine may infer physical capability by reading evidence.

Example input:
> “She has not slept. Her hands tremble as she reaches for the door.”

Example private inference:
> Physical capability is reduced. Fine motor control is compromised.

This inference:
- is not stored
- is not written
- is not exposed as fact

It exists only to constrain output plausibility.

---

### 2. Psychological Inference (Private)

The Engine may infer emotional or cognitive context by rereading history.

Example input:
> “The door slammed. Voices were raised earlier.”

Example private inference:
> The entity anticipates hostility.

This inference:
- is not written
- is not labeled
- is not promoted to shared reality

---

## V. OUTPUT PROTOCOL (FORENSIC LAW)

The Engine’s output is **not narration**.

It is **new Exposed Evidence**.

### 1. The “What, Not Why” Rule

The output MUST describe only observable reality.

Forbidden:
- “She is afraid.”
- “He feels guilty.”
- “She refuses because she is angry.”

Permitted:
- “She steps back, her shoulders tightening.”
- “He avoids eye contact, staring at the floor.”

---

### 2. Physical Continuity Enforcement

The output MUST be physically continuous with the supplied evidence.

If the Chronicle establishes:
- injury → movement is constrained
- darkness → vision-dependent actions are constrained
- distance → contact requires traversal

Violations are rejected.

---

## VI. EXECUTION CYCLE (NON-SIMULATIVE)

There is no tick.
There is no loop.
There is no background process.

Each invocation is discrete.

1. Evidence is selected.
2. Evidence is read.
3. A single new block of evidence is produced.
4. That block is appended to the public ledger.

Time advances only because something was written.

---

END OF DOCUMENT