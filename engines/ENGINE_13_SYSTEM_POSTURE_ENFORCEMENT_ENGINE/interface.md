# /engines/ENGINE_13_SYSTEM_POSTURE_ENFORCEMENT_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 13
ENGINE NAME: SYSTEM POSTURE ENFORCEMENT ENGINE (NON-RUNTIME)

This file defines the ONLY permitted boundary for Engine 13.
Engine 13 does NOT run in production.
It exists to prevent philosophical and architectural drift over time.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 13 exists to enforce **system posture** across development, testing, and evolution.

System posture means:
- the system remains non-directive,
- the system remains non-user-centric,
- the system remains non-narrative,
- the system remains constitution-first.

Engine 13 ensures the system does not slowly become a game, a chatbot, or a storyteller.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 13 exclusively owns:

1. Posture rules
- “The system must not want anything.”
- “The system must not steer.”
- “The system must not optimize for engagement.”
- “The system must not privilege the operator.”

2. Drift detection
- Detecting reintroduction of:
  - director logic,
  - narrative pacing logic,
  - engagement heuristics,
  - user-pleasing defaults.

3. Development-time enforcement
- Preventing merges that violate posture constraints.
- Preventing “temporary hacks” from becoming permanent.

Engine 13 is the ONLY owner of posture enforcement.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 13 does NOT own:

- Runtime logic.
- Content generation.
- Reality storage.
- Test execution (Engine 14).
- CI mechanics (Engine 11).

Engine 13 defines *what must never be allowed to creep in*.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 13 accepts ONLY:

A) Source code
B) Engine interface definitions
C) Contract files
D) Prompt packs
E) Configuration files

Engine 13 does NOT accept runtime data.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 13 emits ONLY:

A) Posture violations
- Explicit, blocking findings.
- Human-readable but non-negotiable.

B) Posture compliance confirmations
- For audit purposes.

Engine 13 MUST NOT emit:
- Runtime artifacts
- Code modifications
- Suggested “improvements”

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `audit_posture(artifact_set) -> PASS|FAIL`
- Scans artifacts for posture violations.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 13 may call:
- None (Static Analysis).

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 13 must NEVER call:
- Any runtime engine.

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 13 may read:
- All source code and documentation.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 13 must NEVER read:
- Production database (it is not a runtime monitor).

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Violation Detected**: Block merge/deploy.

