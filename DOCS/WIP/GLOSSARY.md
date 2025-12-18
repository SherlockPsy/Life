---
spec_version: v1.0.0
status: DRAFT
owner: core
depends_on: []
supersedes: []
---

# GLOSSARY

## TERM.STATE.v1
Definition: The canonical, persistent representation of the world at a point in time. State is authoritative. No engine output is authoritative unless it mutates State via the State Transition Protocol.
Source of truth: STATE_SPEC.md
Not: rendered text, summaries, “scene descriptions”.

## TERM.STATE_DELTA.v1
Definition: A minimal, typed description of changes applied to State during one tick/step. Must be sufficient to reproduce State if applied in order.
Source of truth: STATE_DELTA_SPEC.md
Not: narrative, free-form notes, “what happened”.

## TERM.TICK.v1
Definition: The atomic forward step of the system where inputs are processed, laws applied, arbitration resolved, State mutated, and outputs produced. Time advances here only.
Source: SYSTEM_EXECUTION_MODEL.md
Not: a renderer paragraph; an LLM call; a UI event by itself.

## TERM.LAW.v1
Definition: A rule that constrains allowable state transitions or behavior. Laws may be mapped by domain and must be selected by protocol.
Source: LAW_MAPPING_INDEX.md
Not: “guidelines”, “preferences”, “style”.

## TERM.ARBITRATION.v1
Definition: The deterministic resolution process applied when laws conflict, priorities overlap, or multiple state mutations compete.
Source: ARBITRATION_LAWS.md + LAW_APPLICATION_PROTOCOL.md
Not: human judgement; “LLM decides”.

## TERM.ENGINE.v1
Definition: A bounded subsystem implementing a contract: inputs → outputs, invariants, failure modes, determinism requirements.
Source: ENGINE_*_CONTRACT.md
Not: a prompt; a persona.

## TERM.RENDERER.v1
Definition: An engine that transforms (StateDelta + RenderContext) into narrative output. It must never mutate State and must not contradict State.
Source: Renderer Rules.md + ENGINE_RENDERER_CONTRACT.md
Not: the source of truth; a state generator.

## TERM.DRIFT.v1
Definition: Controlled, bounded long-term change applied by protocol to avoid static or frozen dynamics, without violating core laws.
Source: DRIFT_SPEC.md + ENGINE_DRIFT_CONTRACT.md
Not: random personality mutation; “LLM got bored”.

## TERM.PARAMETERS.v1
Definition: Explicit configuration values controlling system behavior. Parameter changes are versioned and must be tracked.
Source: PARAMETERS.md
Not: hidden defaults; undocumented constants.
