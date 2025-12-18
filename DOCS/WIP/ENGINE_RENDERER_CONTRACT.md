---
spec_version: v1.0.0
status: DRAFT (locks only after SYSTEM_EXECUTION_MODEL.md and STATE_DELTA_SPEC.md are LOCKED)
owner: renderer
depends_on:
  - Renderer Rules.md
  - STATE_DELTA_SPEC.md
  - SYSTEM_EXECUTION_MODEL.md
supersedes: []
---

# ENGINE: RENDERER CONTRACT

## Purpose

Transform `(StateDelta + RenderContext)` into narrative output.

The renderer is a **pure presentation engine**.

---

## Inputs
- StateDelta (required)
- RenderContext (required; read-only)
- OutputFormat (required; e.g. markdown/plaintext)

---

## Outputs
- RenderedText
- RenderMetadata (entities mentioned, locations mentioned, continuity tags)

---

## Invariants

- Must not contradict State after applying StateDelta.
- Must not introduce new entities as factual unless created in StateDelta.
- Must respect continuity constraints as defined by:
  - `Renderer Rules.md`
  - canonical State

---

## Determinism

- Prose determinism is NOT required.
- Factual consistency with State **IS required**.

---

## Failure Modes

- If contradiction detected:
  - return `ERROR_RENDER_CONTRADICTION`
  - include offending clause pointers
- Renderer must not repair, reinterpret, or compensate.

---

## Authority Boundary

The renderer:
- does not decide
- does not arbitrate
- does not infer state
- does not advance time

Any renderer behaviour beyond transformation is invalid.

END OF ENGINE_RENDERER_CONTRACT.md
