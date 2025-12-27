COPILOT WORK ORDER PACKET — MILESTONE 14
Project: SherlockPsy Life

Authority Order (binding, descending):
- MASTER_CONSTITUTION.md
- MASTER_INFRASTRUCTURE.md
- MASTER_RUNTIME.md
- MASTER_WORLD.md
- TOTAL_PLAN.md
- copilot-instructions.md
- THIS WORK ORDER (M14)

Milestone Target: M14 — SYSTEM IS PRODUCTION-READY
Scope: Lock v6 boundaries. Introduce no new “meaning-making machinery.” Remove ambiguity. Ensure system behavior matches v6 law.

======================================================================
0) ABSOLUTE META-CONSTRAINTS (FINAL)
======================================================================

A) Written reality and rendering separation
- Written text is the only reality.
- Written does not mean rendered.
- Rendering must not create facts.

B) Time under v6
- Objective time exists and advances continuously.
- Time is context only; time must never decide outcomes.

C) Background life under v6
Allowed:
- Off-screen developments as written text (narrated, not simulated).
Forbidden:
- background simulation
- ticking gradual evolution
- hidden progression that becomes real without writing

D) Opportunity triggers under v6 Runtime
Allowed (if implemented):
- content-agnostic opportunity triggers via time passing and/or irregular randomness
Constraints:
- opaque
- content-agnostic
- non-semantic
- non-predictable
- non-obligating
Forbidden:
- semantic schedulers (“if user inactive then inject drama”)
- fixed-interval “something happens” engines
- triggers that inspect world content to decide when to invoke
- triggers that select outcomes

E) No director / no explainer
Forbidden:
- relevance/pacing engines
- “moment selection”
- “keep things interesting”
- “now is important”
- “the story needs…”
Everything must remain blind and content-agnostic outside the model’s interpretation during an opportunity.

F) No hidden state machinery
Forbidden:
- meters
- flags
- counters
- decay
- refresh cycles
- “relationship points”
- “boredom scores”
- “momentum”

G) Summaries under v6
Allowed:
- Non-authoritative reading aids derived from written text, traceable to spans.
Forbidden:
- summary-as-authority
- replacing history with summaries
- compressing the authoritative record into a new truth layer

======================================================================
1) YOUR TASK (MILESTONE 14 IMPLEMENTATION)
======================================================================

1) Audit the codebase for any remaining v5-era contradictions:
   - “time does not pass unless written” as a runtime rule
   - “no summaries ever” as a blanket prohibition
   - “off-screen evolution forbidden” (off-screen writing is allowed; simulation is not)
   - “no timers ever” if opportunity triggers are implemented (they are allowed only as non-semantic opportunities)

2) Ensure the runtime conforms to v6:
   - Invocation is permission, not obligation.
   - Silence is valid.
   - Idempotency prevents duplicate public/private writes.

3) Ensure the world conforms to v6:
   - World facts are grounded (no floating stimuli).
   - No internal-state authority.
   - No guaranteed outcomes.

4) Ensure production boundaries are enforced:
   - No CI/CD shenanigans in repo.
   - No localhost assumptions in docs or defaults.
   - No hidden background writers.

(Anything not required to enforce these boundaries is out of scope.)

======================================================================
2) COMPLETION CONDITION
======================================================================

Milestone 14 is complete when:

- All prior milestones still pass their curl acceptance tests.
- No new behavior exists beyond what is specified by authority docs.
- The system behaves as a continuous life (time exists) without becoming a machine (no outcome engines).
- Any opportunity trigger mechanism (if present) is demonstrably content-agnostic and non-obligating.
- No hidden state machinery exists.
- No director logic exists.

END WORK ORDER PACKET — MILESTONE 14