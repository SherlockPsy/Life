# SherlockPsy Life

This repository contains the implementation of **Life**, a text-only, real-time, continuous-life simulation system.

This is **not** a game engine.  
This is **not** a chatbot.  
This is **not** a narrative generator.

It is a system where **written text is the only substrate of reality**, and where time, memory, and change exist only when something is written.

---

## Core Principles (Read Before Touching Anything)

Life operates under a locked constitution. The most important rules are:

- Text is the only thing that exists.
- There is exactly one irreversible timeline.
- Time does not pass unless new text is written.
- Silence is valid and meaningful.
- Nothing happens “in the background”.
- No schedulers, timers, loops, or hidden state exist.
- Agents are autonomous readers of text, not functions that respond on demand.
- The World is not an agent and has no awareness or intent.
- All persistence is append-only.

If a fact is not written, it does not exist.  
If something exists, it must be written.

---

## Repository Structure

This repository is governed by a small set of authoritative documents:

- `MASTER_CONSTITUTION.md`  
  The highest authority. Defines what is allowed to exist at all.

- `MASTER_INFRASTRUCTURE.md`  
  Defines storage, persistence, and retrieval laws.

- `MASTER_RUNTIME.md`  
  Defines when the system may act, and when it must remain silent.

- `MASTER_WORLD.md`  
  Defines what the World may and may not do.

- `TOTAL_PLAN.md`  
  The execution canon. Milestones, endpoints, and behavioral locks.

- `copilot-instructions.md`  
  Enforcement instructions for automated code generation.

These documents are **not guidelines**. They are law.

---

## How the System Is Built

Development follows a strict milestone process:

- Each milestone has a dedicated Work Order file.
- Milestones are implemented sequentially.
- No future behavior is anticipated.
- No refactoring “for cleanliness”.
- No optimizations that change semantics.
- No local development environments.
- No localhost usage.
- No scripts that bypass the running system.

All interaction with the system is done through HTTP endpoints and verified using `curl`.

Railway is used for deployment.  
PostgreSQL is the authoritative store.  
Qdrant is used only for selective rereading.

---

## What This Repository Is *Not*

This repository is **not**:

- A reusable framework
- A library
- A template project
- An AI assistant playground
- A multi-user system
- A product with accounts, logins, or permissions

There is exactly one user.  
There is no account system by design.

---

## Status

The system is being built incrementally, milestone by milestone, toward a production-ready continuous-life environment.

History may be reset during development runs.  
The architecture itself is not experimental.

---

## Important Note

If you are reading this and thinking:

> “I could simplify this”  
> “I could optimize this”  
> “I could add a small helper”  

You have already misunderstood the project.

Reality is not optimized.