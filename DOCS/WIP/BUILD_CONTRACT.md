# BUILD_CONTRACT.md
## System Construction Contract (LLM-Facing)

---

## Authority

This document constrains **how the system may be built**.

It does not define life, meaning, or behaviour.
It exists to prevent misimplementation.

---

## Canonical Precedence

Canonical files (highest to lowest):
1. LIFE_LAWS.md
2. ARBITRATION_LAWS.md
3. LIFE_MECHANICS.md
4. DRIFT_SPEC.md
5. INFRA_SPEC.md
6. BUILD_CONTRACT.md

Support artifacts are binding only when referenced.

---

## Mandatory Support Artifacts (Binding)

The following artifacts are binding when referenced:

- `INEVITABILITY_ADDENDUM.md`
- `LLM_BUILD_CHECKLIST.md`
- `PARAMETERS.md`
- `STATE_DELTA_SPEC.md`
- `SYSTEM_EXECUTION_MODEL.md`

Failure to implement referenced artifacts invalidates the build.

---

## Non-Negotiable Rules

- If the spec is silent: **fail the build**.
- Guessing is forbidden.
- Convenience is forbidden.
- Narrative optimisation is forbidden.

---

## Build Invalidation Clause (Hard)

Any implementation is invalid if:

1. `SYSTEM_EXECUTION_MODEL.md` is not followed exactly.
2. Drift is not expressed exclusively via `StateDelta`.
3. Arbitration mutates or authorizes truth.
4. Renderer performs decisions.
5. Silence distribution and drift impact constraints are untested.
6. Any checklist item in `LLM_BUILD_CHECKLIST.md` fails.

Invalid builds must not deploy.

---

END OF BUILD_CONTRACT.md
