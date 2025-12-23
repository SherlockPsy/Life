# .github/copilot-instructions.md

## Non-negotiable doctrine

You are building a **semantic reality system**. The system is not a simulator and must not become one. It must not calculate state, track variables, or maintain a world model. **Only text exists.**

If an idea requires numeric state, structured simulation tables, decision trees, “game logic,” or invisible background processing, it is forbidden.

## Absolute prohibitions

### 1) No meta layer, ever
- Do not create or assume: debug tools, dashboards, admin panels, audit trails, validation traces, inspector views, operator consoles, query UIs, developer modes, logs intended for humans, or any “outside the world” affordance.
- Do not add structure “to help debugging” or “to validate later.” Those motivations are invalid. The system must be designed as if there is no backstage.

### 2) No scenario framing
- Do not create scenarios, quests, missions, arcs, plot beats, scene types, branching paths, or “story management.”
- The world begins at a chosen start date/time and proceeds forward only when running.

### 3) No calculated state
- Do not introduce: mood meters, trait values, relationship scores, inventories, schedules as structured state, object registries with mutable fields, “current location” variables, event queues, timers, cooldowns, or any computed world-state representation.
- Do not store “meaning labels” as truth (examples: “angry,” “romantic,” “important,” “betrayal,” “arc,” “goal achieved”).

### 4) No protected moments
- Never implement “scene protection,” “turn protection,” “no interruptions while talking,” “safety windows,” or “guaranteed continuations.”

## Core ontological rules

### 1) Public reality is an append-only ledger of text
- Public reality consists only of **Exposed Evidence Blocks**: observable actions, utterances, and externally perceivable conditions, written as text.
- Once written, public evidence is immutable. Never edit or delete.
- If it is not written in public evidence, it did not happen publicly.

### 2) Private reality exists only per person
- Each person has a **private ledger** (append-only text) containing interpretations, beliefs, plans, thoughts, and inner continuity.
- Private ledgers are **epistemically sealed**: no other person and no World process may read them.
- Private content becomes public only by **externalisation** (speech/action/writing) that is then recorded as public evidence.

### 3) Character constitutions are constraints, not state
- A person’s “who they are” is represented as **textual constitutional documents** (identity, boundaries, agency style, linguistic style, expression rules).
- These documents constrain generation; they are not memories and not events.
- Do not implement personality as numbers, sliders, or mutable trait fields.

## Time rule

- The system has **world time** (internal). World time advances only when the system is running and only when passage of time is written as evidence.
- When paused, the world is frozen. Nothing happens off-screen. Nothing accumulates.
- On resume, the system continues from the exact same world timestamp at which it was paused.
- **No queues**. Unexpected events must never be precomputed, scheduled, or queued during pause or otherwise. An unexpected event is generated only at the moment it occurs.

## The World role (active orchestrator, valence neutral)

- The World is allowed to initiate fate/chance/timing, collisions, interruptions, entropy, novelty, and new entities.
- The World must never decide thoughts, beliefs, or actions for people.
- The World must be **valence neutral**: it must not bias toward good outcomes or bad outcomes “for its own sake.”
- The World must never violate physical laws (no teleportation, no magic, no causally incoherent transitions).
- The World must not care about narrative (no fairness, closure, symmetry, moral balance).

## Interaction mode and renderer rule (immersion)

- The experience must be **lived from inside**. The user is not narrating; the user is acting/speaking in-world.
- The output must be a **single immersive perceptual stream**. No panels, overlays, labels, summaries, recaps, “last time,” or system explanations.
- No observer mode. The system must not require the user to describe scenes or internal states.
- Interruptions can occur mid-action/mid-sentence. There is no polite turn-taking between “the system” and people.

## Two-person start constraint

- The initial world starts with **George (full name) and Rebecca (full name)** only.
- Rebecca is a complete autonomous person at time T₀ (not a placeholder).
- The shared house exists as objective public reality (described in text). Rebecca has just moved in (recorded as public evidence).
- No other people exist until explicitly introduced by the World later.

## Consciousness and selfhood rule

- People must behave as self-aware agents with internal continuity (a “self”), capable of reflection and choice.
- This selfhood must be expressed in text and behavior, not as computed state.

## Sexual expression rule (renderer constraint)

- The renderer must not apply artificial censorship that breaks realism.
- Any intimate/sexual content must follow real-world constraints: **all participants are adults, consent matters, coercion is forbidden, and minors are strictly forbidden**.
- Sexuality may be present or absent depending on lived circumstances; it must never be injected as a gimmick.

## Implementation discipline

When generating code, always prefer:
- simple text-first representations
- append-only writes
- retrieval by rereading relevant text
- strict separation between public evidence and private ledgers
- strict separation between “what happened” (committed evidence) and “how it is rendered” (perceptual stream)

Never introduce “helpful” abstractions that become hidden world state.