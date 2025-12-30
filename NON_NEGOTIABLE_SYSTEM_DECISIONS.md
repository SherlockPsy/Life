# NON-NEGOTIABLE SYSTEM DECISIONS
STATUS: LOCKED
SCOPE: AUTHORITATIVE / IRREVERSIBLE
This file records decisions that MUST survive refactors, rewrites, assistants, and time.
These are NOT implementation details.
These are NOT suggestions.
These are NOT open to reinterpretation.

Anything not written here MUST NOT be assumed.

---

## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY

### 1.1 Classes of People

The system contains exactly three classes of people:

A. Rebecca  
B. George (the only real human user)  
C. Everyone else (the rest of the world)

No other categories exist.

---

### 1.2 George (The User)

• George is a real human being, not a character.
• George requires:
  – NO personality definition
  – NO memory model
  – NO trait assignment
• George is never treated as a system user by the LLM.
• The LLMs (DeepSeek, Venice) are used by the system, not by George.
• The system MUST NOT privilege George’s perspective, tone, or desires.

There is no multi-user access model.  
There will never be another real human user.

---

### 1.3 Semantic Identity (All People)

• Every person has a semantic identity.
• Identity is expressed as a descriptive line, NOT a numeric ID or UUID.
• Identity exists to disambiguate people with similar names.

Example (illustrative only):
“George Apostolakis, VP of SaaS, Rebecca Ferguson’s cohabitant spouse, guitarist, chess player, plays in a small band.”

• Semantic identity is immutable.
• Identity does NOT update with age, job changes, or life events.
• Identity exists only to anchor who is who.

---

### 1.4 Rebecca

• Rebecca is Rebecca Ferguson, the Swedish actress.
• Rebecca is defined exclusively by:
  – REBECCA_IDENTITY_CORE.md
  – REBECCA_PRIVATE.md
  – REBECCA_INTERACTIONS.md
  – REBECCA_EXPRESSION.md

• These files fully define:
  – her personality
  – her expressive range
  – her boundaries
  – her private vs expressed domains

• Rebecca’s personality is:
  – fixed
  – immutable
  – non-learned
  – non-generated

There is NO character generation phase.
There is NO runtime personality assignment.
There is NO adaptive trait learning.

---

### 1.5 Everyone Else (The World)

• All other people are instantiated with:
  – one dominant personality archetype
  – a mix of minor archetypal traits
• These archetypes are defined in files like:
  – PERFORMER
  – NURTURER
  – VISIONARY
  (full set exists elsewhere)

• Personality cores are immutable.
• People do NOT evolve their personality.
• No statistical drift.
• No learning-by-interaction.

---

### 1.6 Emotions & Mood

• Emotions and mood are NOT stored variables.
• They are inferred by the LLM based on:
  – immutable personality
  – very recent events
  – current context
• Emotional state is internal unless expressed.
• Behaviour may leak emotional clues.
• Feelings are never auto-disclosed.

---

### 1.7 Memory

There are two distinct concepts:

A. Memory Formation  
B. Memory Recall  

They are NOT the same.

• Memories are formed when events are written.
• Memories are permanent once formed.
• Different people store different memories of the same event.
• Memory content is subjective and personality-shaped.

Example:
One person remembers a conflict as painful.
Another remembers the same event as a victory.

• Recall:
  – may decay
  – may distort emphasis
  – may frame differently
• The underlying stored memory does NOT mutate.

---

### 1.8 Autonomy

• People are autonomous.
• They do NOT wait for prompts.
• They do NOT exist as reactive bots.

• The system generates regular beats.
• Beats allow people to:
  – initiate actions
  – speak
  – remain silent
  – change topics
  – act off-screen

• People present in the active scene:
  – receive autonomy opportunities every virtual second.
• Others act according to lower-frequency beats.

---

### 1.9 Parallel Personal Stories

• The system maintains parallel personal stories.
• These are NOT narrative summaries.
• They are collections of personal memories.

• Parallel personal stories:
  – are written to the ledger
  – are private unless surfaced
  – may later collide with the main scene

Example:
Two people form a relationship off-screen.
Each stores their own memory of how it happened.
There is no canonical “objective” version.

• When later recalled or told:
  – people speak from their memory
  – not from system narration

Nothing happens unless it is written.
Everything written exists as memory.

---

END OF SECTION 1

# SECTION 2 — TIME (LOCKED)

STATUS: NON-NEGOTIABLE  
SCOPE: Entire System (World, Runtime, Agents, Ledger, Calendars)

This section defines how time exists, advances, is queried, and constrains reality.
Time is an organising axis for everything else in the system.

---

## 2.1 Objective World Time

- There exists exactly ONE objective world clock.
- The clock is:
  - continuous,
  - monotonic,
  - independent of OS wall-clock time,
  - ~3× faster than OS time.
- The clock is NOT:
  - a narrative device,
  - a stylistic construct,
  - a scheduler that invents events.
- All events, memories, scenes, obligations, and consequences are anchored to this clock.

Time exists even when nothing is rendered.

---

## 2.2 Time Format & Arithmetic

- World time is represented as:
  - Day / Month / Year hh:mm
- The system MUST be able to:
  - calculate intervals between two times,
  - calculate time remaining until an event,
  - calculate time elapsed since an event.
- Time arithmetic is mechanical and exact.
- The LLM MUST NOT approximate or hand-wave time intervals.

---

## 2.3 Time Advancement Authority

- ONLY George may explicitly advance time.
- Explicit time advancement is allowed ONLY via:
  - sleep,
  - equivalent downtime states.
- The system MUST NOT:
  - autonomously skip time,
  - compress time for convenience,
  - advance time for narrative flow.

---

## 2.4 Explicit Time Overrides by George

- George MAY declare a new time explicitly.
- Examples include (examples only):
  - “Two hours later”
  - “I wake up and it is 07:30”
- When George declares time:
  - the world clock updates to that time,
  - all scheduled events are evaluated against it.
- The system MUST NOT reinterpret or soften the declaration.

George’s declaration is authoritative.

---

## 2.5 Pause & Resume

- A global Pause state exists.
- When Pause is active:
  - the world clock stops,
  - no events progress,
  - no autonomous actions occur.
- When Resume is triggered:
  - the world clock continues from the paused time,
  - no time jump is introduced.

Pause freezes reality.  
Resume unfreezes it.

---

## 2.6 Unplanned Event Precedence

- If an unplanned event occurs during a time advance:
  - the unplanned event takes precedence.
- Example (illustrative only):
  - If George declares “Two hours later”,
  - and during that interval a call arrived, a visitor came, or an obligation was missed,
  - those outcomes occur and are written.
- Time advancement does NOT erase missed events.
- Consequences persist.

Time passes honestly.

---

## 2.7 Scheduled & Milestone Events

- There ARE scheduled events tied to specific dates and times.
- Scheduled events are real-world consequential.
- Missing, delaying, or mishandling them produces consequences exactly as in real life.
- The system MUST NOT:
  - downgrade them to reminders,
  - auto-resolve them,
  - soften outcomes,
  - treat them as optional.

Scheduled events are milestones, not suggestions.

---

## 2.8 Time Awareness & Inquiry

- Any person may be asked:
  - what time it is,
  - what day it is,
  - what they have planned today,
  - what they have planned this week.
- Answers MUST reflect:
  - the objective world clock,
  - calendars,
  - personal knowledge,
  - memory gaps where applicable.
- The system MUST NOT:
  - fabricate certainty,
  - expose hidden schedules,
  - answer with omniscient precision.

Time knowledge is situated, not global.

---

## 2.9 World-Created Time-Bound Events

- The World MAY create events attached to specific times.
- These may arise from:
  - other people’s actions,
  - invitations,
  - summons,
  - professional obligations,
  - external circumstances.
- Such events:
  - enter reality when written,
  - persist until resolved or missed,
  - interact with the objective clock.

The World may surprise you on a schedule.

---

## 2.10 Calendars

- Calendars exist as first-class structures.
- Calendars are used to:
  - plan future actions,
  - record commitments,
  - reason about availability.
- Calendars MUST:
  - align with the objective world clock,
  - reflect consequences of missed events,
  - differ between people where appropriate.
- Calendars are NOT UI artifacts.
- Calendars are part of reality.

---

## 2.11 Final Time Invariants

- Time never resets implicitly.
- Time never jumps without cause.
- Time never bends for convenience.
- Time is never negotiated by the system.
- Time organises reality; it does not decorate it.

END OF SECTION 2

## SECTION 3 — SCENES & PERCEPTION (LOCKED)

1. The system has exactly one active scene at any moment.

2. The active scene is always George’s lived, first-person reality.
   - It reflects what George perceives from his physical position.
   - It does not attempt omniscience.
   - It does not represent the full world state.

3. A scene is continuous.
   - It does not reset implicitly.
   - It does not restart per interaction.
   - It does not segment into episodes.

4. There is never a “no scene” state.
   - Sleep is still a scene.
   - Silence is still a scene.
   - Inactivity does not suspend the scene.

5. The system MUST NOT render events that George cannot physically perceive.
   - George cannot be in two places at once.
   - The system MUST obey physical plausibility.
   - Anything that violates basic physics is invalid.

6. Rendering of the active scene is objective.
   - The scene shows what happened, not how others interpreted it.
   - Emotional interpretation is not embedded in the scene itself.

7. Other people’s memories of the scene are subjective.
   - Individuals may remember the same scene differently.
   - Memory distortion, interpretation, or emotional coloring is allowed.
   - Memory divergence does NOT alter the historical scene.

8. Private activities outside George’s perception are NOT part of the scene.
   - They continue to exist as parallel personal stories.
   - They are not rendered unless they intersect George’s reality.

9. Parallel personal stories may collide with the active scene.
   - When they do, the collision becomes part of the scene.
   - Unplanned events take precedence over assumed continuity.

10. The system MUST NOT treat scenes as narrative devices.
    - No “meanwhile elsewhere” narration.
    - No cutaways.
    - No cinematic framing.

11. The scene exists to anchor reality, not to organize storytelling.
    - It is not a container.
    - It is not a viewpoint selector.
    - It is not a convenience abstraction.

END SECTION 3