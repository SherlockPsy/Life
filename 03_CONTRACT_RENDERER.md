# 03_CONTRACT_RENDERER.md

## The Laws of Presentation and Output

### 1. AUTHORITY AND SCOPE

**Status:** CANONICAL | **Version:** 1.0 (Consolidated)

This document defines the **Presentation Layer** of VirLife. It is the single source of truth for:

1. **Renderer Logic:** How the system converts state into language (Venice).
2. **UI Behavior:** How the frontend displays reality to the participant.
3. **Participation Contracts:** How input is handled and when the system waits.

**Binding Constraints:**

* **The Renderer Describes, It Does Not Decide:** Any attempt by the renderer to invent events, infer user actions, or advance time is a critical failure.
* **The UI Is A Window, Not A Narrator:** The UI must not explain, summarize, or "gamify" the experience. It simply renders the blocks it receives.
* **Zero Meta-Commentary:** The system must never describe itself (e.g., "The simulation pauses").

---

### 2. THE RENDERER ENGINE (Venice Execution Contract)

*(Derived from `Renderer Rules.md` and `ENGINE_RENDERER_CONTRACT.md`)*

The Renderer is a pure transformation engine: `Envelope` → `Prose`. It is stateless and non-authoritative.

#### 2.1 The Scriptwriter Constraint (Hard Rule)

The renderer must behave like a **Scriptwriter**, not a Novelist.

* **Rule:** Render only what can be seen, heard, or physically observed.
* **Forbidden:** Internal monologue (unless explicitly provided), thematic commentary, or explanation of meaning.
* **Forbidden Phrases:**
* "The tension is palpable..." (Commentary)
* "Nothing happens..." (Meta-narration)
* "Time passes..." (System narration)



#### 2.2 No Perception Ownership (The "Anti-You" Rule)

The renderer must never assert what the user perceives or realizes.

* **Forbidden:** "You notice," "You hear," "You realize," "You feel."
* **Allowed:** Describe the sound ("A loud crash from the kitchen"), not the hearing of it.
* **Reasoning:** Determining what the user notices is the user's job. Determining if a sound is audible is the `Perception Filter`'s job.

#### 2.3 No Action Invention

The renderer must never invent actions to "smooth" the narrative.

* **Forbidden:**
* Summarizing decisions ("Orders are taken").
* Inventing gestures for the user ("You nod").
* Filling silence with activity ("You wait patiently").



#### 2.4 Emotional Neutrality

The renderer is ethically neutral.

* **Rule:** Do not optimize for comfort, reassurance, or "good storytelling."
* **Rule:** Do not use prose to reward or punish the user.
* **Rule:** If a moment is awkward or boring, render it as awkward or boring. Do not "fix" the pacing.

---

### 3. THE UI CONTRACT (Frontend Behavior)

*(Derived from `UI_CONTRACT.md`)*

The Frontend (`COMP_FRONTEND_APP_WEB`) is a "dumb" terminal that renders the canonical state broadcast by the Backend.

#### 3.1 The Canonical Unit: Rendered Block

The UI displays a linear stream of **Rendered Blocks**.

* **Definition:** An atomic unit of output (Dialogue, Action, Scenery).
* **Immutability:** Once displayed, a block is **never** modified. No retroactive editing, no merging.
* **Persistence:** Blocks never disappear. History is an append-only transcript.

#### 3.2 Participation Gates: The "Hold"

A **Hold** is the only mechanism the system uses to request participation.

* **Definition:** A backend signal meaning "The system cannot proceed without input."
* **UI Behavior:**
* Input field is enabled.
* A minimal indicator may appear.
* **Forbidden:** The UI must NOT display text like "Your turn" or "What do you do?"
* **Forbidden:** The UI must NOT auto-fill suggestions.



#### 3.3 Silence Is Valid (No Nudging)

If no Hold exists and no new Blocks arrive, the UI must remain **idle**.

* **Forbidden:** "Loading..." spinners (unless network is actually pending).
* **Forbidden:** "Waiting for you..." prompts.
* **Forbidden:** "Nothing is happening" text.
* **Reasoning:** Silence is a valid state of life. The UI must not treat it as an error.

#### 3.4 Input Is Verbatim

* **Rule:** User input is sent to the backend **exactly as typed**.
* **Forbidden:** Auto-correcting "typos" that might change meaning.
* **Forbidden:** Paraphrasing input into "better" prose.
* **Forbidden:** Converting button clicks into narrative. (There are no buttons).

#### 3.5 Multi-Device Continuity

* **State Source:** `postgres-primary` (via `Sync Service`).
* **Behavior:** Opening the app on a second device must show **exactly** the same blocks, scroll position, and input draft state as the first device.
* **Constraint:** The frontend must never treat local state as authoritative.

---

### 4. FAILURE MODES

* **Renderer Contradiction:** If Venice outputs facts that contradict the `World Slice` (e.g., describing a gun that isn't in the inventory), the Backend **rejects** the block. The UI shows nothing.
* **System Failure:** If the backend errors, the UI stays silent. No "Oops, something went wrong" messages. The illusion of continuity is preferred over error transparency.