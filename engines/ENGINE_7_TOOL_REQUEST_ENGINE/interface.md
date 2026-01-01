# /engines/ENGINE_7_TOOL_REQUEST_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 7
ENGINE NAME: TOOL REQUEST ENGINE (LLM QUESTION GATE)

This file defines the ONLY permitted boundary for Engine 7.
Engine 7 governs how LLMs ask questions of the system.
It exists to prevent tools from becoming decision-makers.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 7 exists to ensure that:
- tools are used as **questions**, not helpers,
- tools never write, decide, infer, or summarize reality,
- tool usage is bounded, auditable, and knowledge-safe.

Engine 7 does not answer questions.
It validates and routes them.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 7 exclusively owns:

1. Tool request validation
- Enforces `/contracts/tool_request.md`.
- Ensures every tool request is explicit, bounded, and attributable.

2. Tool invocation gating
- Determines whether a tool request is permitted.
- Rejects malformed, unbounded, or policy-violating tool requests.

3. Tool loop bounding
- Prevents infinite or runaway tool invocation loops.
- Enforces per-beat and per-request limits.

Engine 7 is the ONLY engine allowed to accept ToolRequest objects.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 7 does NOT own:

- Tool implementation logic (Engine 8 or infrastructure).
- Knowledge boundary rules (Engine 4).
- Content generation (Engine 9).
- Capsule assembly (Engine 6).
- Scene anchoring (Engine 5).
- Rendering (Engine 12).
- Reality storage (Engine 0).

Engine 7 validates questions; it does not answer them.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 7 accepts ONLY:

A) `/contracts/tool_request.md`
- ToolRequest object produced by LLM Writer.

Any other input MUST be rejected.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 7 emits ONLY:

A) Routed ToolRequest (unchanged)
- Forwarded to the appropriate tool executor (Engine 8 or infrastructure).

B) Explicit rejection (internal error object)
- Returned to LLM Writer as a failure signal.
- MUST NOT be turned into narrative content.

Engine 7 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- RetrievalResultPack

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `validate_and_route_tool_request(tool_request) -> ROUTED|REJECTED`
Inputs:
- tool_request (ToolRequest contract)

Validation steps:
- tool_request_id present and unique within request scope.
- request_id matches active beat.
- requested_by.actor explicit.
- knowledge_view explicit.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 7 may call:
- Engine 8 (Retrieval) - to execute retrieval tools.
- Engine 6 (Capsule) - to execute capsule tools.
- Engine 5 (Scene) - to execute scene tools.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 7 must NEVER call:
- Engine 0 (Reality Ledger) - Tools cannot write.
- Engine 9 (LLM Writer) - Engine 7 is called BY Engine 9.

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 7 may read:
- The ToolRequest object.
- Loop counters (internal state).

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 7 must NEVER read:
- Ledger content.
- World state.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Validation Failure**: Reject request.
- **Loop Limit Exceeded**: Reject request (Stop).

