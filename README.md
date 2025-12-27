# SherlockPsy Life

This repository contains the implementation of **Life** — a text-only virtual world designed to replicate real life as closely as possible **without** becoming:

- a hidden simulation engine,
- a game system,
- or a story director.

This is **not** a game engine.  
This is **not** a chatbot.  
This is **not** a narrative generator.  

It is a system where **written text is the only substrate of reality** — and **written does not mean rendered**.

What exists is what is written.  
What changes is what gets written next.  
Everything else is only an opportunity to write — never a cause.

---

## The Physics (V6)

### Written is Reality
- If it is not written into the authoritative record, it does not exist in the system.
- Written does **not** mean “shown to the user.”
- Many written facts may never be rendered.

### Rendering is Downstream
- UI is a projection layer.
- Rendering choices do not create reality.
- Rendering cannot invent facts.

### Time Exists, But Time Does Not Decide
- Objective time exists and advances continuously.
- Time is a shared coordinate used for continuity:
  - days and weeks,
  - lateness,
  - fatigue,
  - plans and appointments,
  - time zones.
- Time must never be used as an outcome engine that forces events.

### Background Life is Narrated, Not Simulated
- Life may advance off-screen.
- Off-screen developments become real only when written as text.
- There is no continuous ticking simulation and no hidden gradual progression.

### Invocation is Opportunity, Not Causation
- Invocations grant an opportunity for writing to occur.
- Invocations never imply that writing must happen.
- Silence is valid, expected, and frequent.

### Initiative Belongs to People, Not the System
- The system never decides someone “should act.”
- No meters, flags, momentum scores, boredom counters, relationship points, decay timers, or refresh cycles.
- People act because written continuity contains reasons — not because a rule fired.

### No Director
- No component evaluates relevance, interest, pacing, or narrative momentum.
- No component decides “now is a moment.”
- Only the model interprets context when an opportunity exists.
- Everything else is blind, dumb, and content-agnostic.

### Summaries Are Allowed (Reading Aids Only)
- Summaries may be derived from existing written text only.
- Summaries must never introduce new facts or interpretations.
- Summaries are non-authoritative; the verbatim record remains the authority.
- Summaries must be traceable to the text they summarize.

---

## Authority Stack (What Must Be Obeyed)

When documents conflict, the higher one wins. The order is:

1) `MASTER_CONSTITUTION.md`  
2) `MASTER_INFRASTRUCTURE.md`  
3) `MASTER_RUNTIME.md`  
4) `MASTER_WORLD.md`  
5) `TOTAL_PLAN.md`  
6) `copilot-instructions.md`  
7) Work Orders in `/work_orders/`  
8) `README.md`

Do not invent rules. If something is not explicitly permitted by higher authority, assume it is forbidden.

---

## How Work Proceeds (No Heroics)

Implementation is driven by:

- `TOTAL_PLAN.md` (the canonical milestone canons)
- the active Work Order under `/work_orders/`

Rules of engagement:

- Implement **one** milestone / work order at a time.
- Touch only what the acceptance tests require.
- Avoid refactors “while you’re here.”
- Prefer direct, boring solutions over clever architecture.

---

## Opportunity Triggers (Not Schedulers)

If the system supports time/randomness-based invocation:
- the trigger must be content-agnostic and non-semantic,
- it must open an opportunity only,
- it must never select outcomes or imply something should happen now.

If you are about to implement a “scheduler that makes it feel alive,” stop. That’s director logic wearing a cheap moustache.

---

## Testing Philosophy

Testing is procedural and external:

- Proof is by simple HTTP calls (curl) against the deployed service.
- No UI assumptions are required for correctness.
- If the record is correct and the runtime rules are enforced, rendering can be added later.

---

## What You Must NOT Add

If you are reading this and thinking:

> “I could simplify this”  
> “I could optimise this”  
> “I could add a small helper”  
> “I could add a pacing engine”  
> “I could add a rule that triggers interesting moments”

You have already misunderstood the project.

Reality is not optimised.  
Reality is not directed.  
Reality is written, preserved, and lived through continuity.

---

## Where To Read Next

- `MASTER_CONSTITUTION.md` — the physics of reality  
- `MASTER_RUNTIME.md` — invocation, opportunity, recording, rendering boundaries  
- `MASTER_WORLD.md` — what the world may introduce, and what it must never become  
- `TOTAL_PLAN.md` — milestone canons and acceptance constraints  
- `/work_orders/` — the current implementation mandate