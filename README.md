# SherlockPsy Life

This repository contains the implementation of **Life** — a text-only virtual world designed to replicate real life as closely as possible **without** becoming a hidden simulation engine, a game system, or a story director.

This is **not** a game engine.  
This is **not** a chatbot.  
This is **not** a narrative generator.  

It is a system where **written text is the only substrate of reality** — and **written does not mean rendered**.

What exists is what is written.  
What changes is what gets written next.  
Everything else is only an opportunity to write — never a cause.

---

## Core Principles (Read Before Touching Anything)

Life operates under an authoritative constitution (see `MASTER_CONSTITUTION.md`). The most important rules are:

- **Written text is the only reality.**
  - If it is not written, it does not exist in the system.
  - Written does **not** mean “shown to the user.”
  - Many written facts may never be rendered.

- **Rendering is a projection choice, not existence.**
  - UI does not define reality.
  - Display is downstream of writing.

- **Time exists objectively and advances continuously — but time does not decide outcomes.**
  - Time is a shared coordinate used for continuity (days, fatigue, lateness, plans).
  - Time must never be used as a rule engine that forces events.

- **Background life is narrated, not simulated.**
  - Life may advance off-screen.
  - Off-screen developments become real only when written as text.
  - There is no continuous ticking simulation and no hidden gradual progression.

- **Invocation is separated from causation.**
  - Invocation only grants an opportunity for writing.
  - Invocation never implies writing must happen.
  - Silence is valid, expected, and frequent.

- **Initiative belongs to people, not the system.**
  - The system does not decide someone “should act.”
  - No meters, flags, momentum scores, boredom counters, relationship points, or decay timers.
  - People act because the written continuity contains reasons — not because a rule fired.

- **There is no director.**
  - No component evaluates relevance, interest, pacing, or narrative momentum.
  - No component chooses “now is a moment.”
  - Only the model interprets context when an opportunity exists.
  - Everything else is blind, dumb, and content-agnostic.

- **Summaries are allowed — but only as non-authoritative reading aids.**
  - Summaries may be derived from existing written text only.
  - Summaries must never introduce new facts or interpretations.
  - Summaries do not replace the authoritative record.

- **The authoritative record is append-only.**
  - Past text is not rewritten, “cleaned up,” or replaced.
  - Corrections happen only by writing new text that supersedes prior text.

If you want “real life,” you have to accept a brutal truth: real life is messy, continuous, and not optimised. This system is built to preserve that, not to tidy it up.

---

## Authority Stack (What Must Be Obeyed)

When documents conflict, the higher one wins. The order is:

1) `MASTER_CONSTITUTION.md`  
2) `MASTER_INFRASTRUCTURE.md`  
3) `MASTER_RUNTIME.md`  
4) `MASTER_WORLD.md`  
5) `TOTAL_PLAN.md`  
6) Work Orders in `work_orders/`  
7) `copilot-instructions.md`  
8) `README.md`

Do not invent rules. If something is not explicitly permitted by higher authority, assume it is forbidden.

---

## How Work Proceeds (No Heroics)

Implementation is driven by:

- `TOTAL_PLAN.md` (the canonical milestone canons)
- the active Work Order under `work_orders/`

Rules of engagement:

- Implement **one** milestone / work order at a time.
- Touch only what the acceptance tests require.
- Avoid refactors “while you’re here.”
- Prefer direct, boring solutions over clever architecture.

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
> “I could add a scheduler that makes it feel alive”

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
- `work_orders/` — the current implementation mandate