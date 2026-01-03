# ENGINE INTERFACES — FULL CONTENTS WITH SHA-256

## Engine Interface Summary

| Engine | Has interface.md | Has core.js |
|--------|------------------|-------------|
| ENGINE_0_REALITY_LEDGER_ENGINE | ✓ | ✗ (logic in server.js) |
| ENGINE_1_INVOCATION_AND_IDEMPOTENCY_ENVELOPE_ENGINE | ✓ | ✗ (logic in server.js) |
| ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR | ✓ | ✓ |
| ENGINE_3_TIME_AND_CALENDAR_ENGINE | ✓ | ✓ |
| ENGINE_4_KNOWLEDGE_SURFACE_AND_BOUNDARY_ENGINE | ✓ | ✗ |
| ENGINE_5_SCENE_ANCHOR_AND_REHYDRATION_ENGINE | ✓ | ✓ |
| ENGINE_6_CAPSULE_ENGINE | ✓ | ✓ |
| ENGINE_7_TOOL_REQUEST_ENGINE | ✓ | ✓ |
| ENGINE_8_RETRIEVAL_ENGINE | ✓ | ✓ |
| ENGINE_9_LLM_WRITER_ENGINE | ✓ | ✓ |
| ENGINE_10_WRITE_ACCEPTANCE_AND_INTEGRITY_ENGINE | ✓ | ✓ |
| ENGINE_11_INFRASTRUCTURE_ENGINE | ✓ | ✗ |
| ENGINE_12_PROJECTION_AND_UI_ADAPTER_ENGINE | ✓ | ✗ |
| ENGINE_13_SYSTEM_POSTURE_ENFORCEMENT_ENGINE | ✓ | ✗ (non-runtime) |
| ENGINE_14_CONTRACT_AND_PROHIBITION_TEST_ENGINE | ✓ | ✗ (non-runtime) |

---

## ENGINE_0_REALITY_LEDGER_ENGINE/interface.md

**SHA-256:** `4f706a2025e46ef7b0fd44a48bfa7250a801a28f8af076d89622ebd027a99c45`

```markdown
# /engines/ENGINE_0_REALITY_LEDGER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 0
ENGINE NAME: REALITY LEDGER ENGINE (ONTOLOGICAL AUTHORITY)

This file defines the ONLY permitted boundary for Engine 0.
Any runtime component that reads/writes reality outside this interface is invalid.

## 0) PURPOSE
Define what exists and what changes, and nothing else.

## 1) OWNS (EXCLUSIVE)
1. Ontology enforcement
2. Append-only invariant
3. Atomic bundle commits
4. Idempotency outcome persistence (storage side)
5. Attribution metadata (non-semantic)
6. Ordering / timestamps (non-semantic ordering metadata)
7. Visibility metadata (non-semantic boundary data)

## 5) EXPORTED OPERATIONS
### 5.1 `commit_bundle(write_bundle) -> committed_bundle | rejection`
### 5.2 `get_entries(filter) -> [write_entry]`

## 6) ALLOWED CALLS: Engine 11 (Infrastructure)
## 7) FORBIDDEN CALLS: Engine 9, Engine 12, Engine 3
```

---

## ENGINE_1_INVOCATION_AND_IDEMPOTENCY_ENVELOPE_ENGINE/interface.md

**SHA-256:** `50636c836d9b46d4b57174bace3aafad9bd3946760613fefe5f8ca37674e66cc`

```markdown
# /engines/ENGINE_1_INVOCATION_AND_IDEMPOTENCY_ENVELOPE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 1
ENGINE NAME: INVOCATION & IDEMPOTENCY ENVELOPE ENGINE

## 0) PURPOSE
Ensure every runtime call is contract-valid, treat invoker as LLM "user", enforce idempotency.

## 1) OWNS (EXCLUSIVE)
1. Invocation validation gate
2. Idempotency front-door behavior
3. Invocation audit capture
4. "George is not the LLM user" enforcement

## 5) EXPORTED OPERATIONS
### 5.1 `validate_and_route(invocation_envelope) -> {kind: REPLAY|PROCEED, payload}`

## 6) ALLOWED CALLS: Engine 0, Engine 2
## 7) FORBIDDEN CALLS: Engine 9, Engine 12, Engine 3
```

---

## ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/interface.md

**SHA-256:** `230f907f4fa734eb60509b6319f7494ac96ee207e601d0dfabbdae7c9fca06ef`

```markdown
# /engines/ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 2
ENGINE NAME: BEAT & OPPORTUNITY COORDINATOR

## 0) PURPOSE
Enforce beat-based progression. A beat is a mechanical opportunity boundary.

## 1) OWNS (EXCLUSIVE)
1. Beat boundary enforcement
2. Opportunity surfacing
3. Silence legitimacy
4. Beat sequencing

## 5) EXPORTED OPERATIONS
### 5.1 `start_beat(invocation_envelope) -> projection_output`

## 6) ALLOWED CALLS: Engine 3, 5, 9, 10, 0, 12
## 7) FORBIDDEN CALLS: Engine 7, Engine 8
```

---

## ENGINE_3_TIME_AND_CALENDAR_ENGINE/interface.md

**SHA-256:** `9637a229cb3d7e16df69d0d233f0dc952f60c5f1a1408fb3455d4e3604c212a9`

```markdown
# /engines/ENGINE_3_TIME_AND_CALENDAR_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 3
ENGINE NAME: TIME & CALENDAR ENGINE

## 0) PURPOSE
Define, advance, and expose objective world time.

## 1) OWNS (EXCLUSIVE)
1. World clock definition
2. Time advancement mechanics
3. Calendar mapping
4. Explicit operator time declarations

## 5) EXPORTED OPERATIONS
### 5.1 `get_current_time() -> iso_string`
### 5.2 `advance_time(delta) -> new_time`
### 5.3 `set_time_override(time_declaration) -> new_time`

## 6) ALLOWED CALLS: Engine 11
## 7) FORBIDDEN CALLS: Engine 9, Engine 0, Engine 12
```

---

## ENGINE_4_KNOWLEDGE_SURFACE_AND_BOUNDARY_ENGINE/interface.md

**SHA-256:** `d9c9591dfead1b4222f3a7a08ed43fb62ef710c2cd9c328a6fa947c016857e67`

```markdown
# /engines/ENGINE_4_KNOWLEDGE_SURFACE_AND_BOUNDARY_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 4
ENGINE NAME: KNOWLEDGE SURFACE & BOUNDARY ENGINE

## 0) PURPOSE
Enforce epistemic integrity. Define what information is visible to whom.

## 1) OWNS (EXCLUSIVE)
1. Knowledge boundary definitions
2. Visibility enforcement
3. Knowledge surface construction
4. Prevention of omniscience

## 5) EXPORTED OPERATIONS
### 5.1 `get_knowledge_surface(actor_id) -> filter_criteria`
### 5.2 `check_visibility(entry_metadata, actor_id) -> ALLOW|DENY`

## 6) ALLOWED CALLS: None
## 7) FORBIDDEN CALLS: Engine 9, Engine 12, Engine 0
```

---

## ENGINE_5_SCENE_ANCHOR_AND_REHYDRATION_ENGINE/interface.md

**SHA-256:** `91127d4d7d49cecdcc9457c3528baf31009f95b65c22abd2a5842b7a05bb0b5f`

```markdown
# /engines/ENGINE_5_SCENE_ANCHOR_AND_REHYDRATION_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 5
ENGINE NAME: SCENE ANCHOR & REHYDRATION ENGINE

## 0) PURPOSE
Solve how the system survives context limits without breaking reality.

## 1) OWNS (EXCLUSIVE)
1. Scene anchor generation
2. Rehydration triggering (mechanical)
3. Rehydration execution
4. Scene cache lifecycle

## 5) EXPORTED OPERATIONS
### 5.1 `get_scene_anchor(request_id) -> scene_anchor_pack`
### 5.2 `check_rehydration_needed(token_usage) -> boolean`
### 5.3 `perform_rehydration(request_id) -> rehydration_pack`

## 6) ALLOWED CALLS: Engine 8, Engine 6, Engine 9
## 7) FORBIDDEN CALLS: Engine 0, Engine 12
```

---

## ENGINE_6_CAPSULE_ENGINE/interface.md

**SHA-256:** `eb81a389f3b9ca6a5a25c509a7cd9e146047dcc82aa089f131a40f923c324b9b`

```markdown
# /engines/ENGINE_6_CAPSULE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 6
ENGINE NAME: CAPSULE ENGINE (PER-PERSON CONTINUITY)

## 0) PURPOSE
Assemble Capsule Packs - regeneratable views per person.

## 1) OWNS (EXCLUSIVE)
1. Capsule pack construction
2. Capsule provenance enforcement
3. Capsule regeneration logic

## 5) EXPORTED OPERATIONS
### 5.1 `build_capsule(person_id, purpose) -> capsule_pack`

## 6) ALLOWED CALLS: Engine 8, Engine 9
## 7) FORBIDDEN CALLS: Engine 0, Engine 12
```

---

## ENGINE_7_TOOL_REQUEST_ENGINE/interface.md

**SHA-256:** `3caa5d34817f3baeea6e76f489187ec3572fbdc2d2279d1ff08cdc907c981ec1`

```markdown
# /engines/ENGINE_7_TOOL_REQUEST_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 7
ENGINE NAME: TOOL REQUEST ENGINE (LLM QUESTION GATE)

## 0) PURPOSE
Ensure tools are used as questions, not helpers. Tools never write or summarize.

## 1) OWNS (EXCLUSIVE)
1. Tool request validation
2. Tool invocation gating
3. Tool loop bounding

## 5) EXPORTED OPERATIONS
### 5.1 `validate_and_route_tool_request(tool_request) -> ROUTED|REJECTED`

## 6) ALLOWED CALLS: Engine 8, Engine 6, Engine 5
## 7) FORBIDDEN CALLS: Engine 0, Engine 9
```

---

## ENGINE_8_RETRIEVAL_ENGINE/interface.md

**SHA-256:** `e82adeb2e9e98cdb48a359174ab33749be262231dccbad1a9806e72222659c20`

```markdown
# /engines/ENGINE_8_RETRIEVAL_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 8
ENGINE NAME: RETRIEVAL ENGINE (EVIDENCE ACCESS)

## 0) PURPOSE
Retrieve ledger-backed evidence in response to approved tool requests.

## 1) OWNS (EXCLUSIVE)
1. Evidence retrieval mechanics
2. Verbatim excerpt construction
3. Provenance attachment
4. Mechanical ranking (recency, match, order)

## 5) EXPORTED OPERATIONS
### 5.1 `execute_retrieval(tool_request, knowledge_surface) -> retrieval_result_pack`

## 6) ALLOWED CALLS: Engine 11
## 7) FORBIDDEN CALLS: Engine 9, Engine 0
```

---

## ENGINE_9_LLM_WRITER_ENGINE/interface.md

**SHA-256:** `dd93962da751f46cdd358b23bfd6036e591ce45b37522531ee1dbc1542512a4b`

```markdown
# /engines/ENGINE_9_LLM_WRITER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 9
ENGINE NAME: LLM WRITER ENGINE (PROPOSAL-ONLY)

## 0) PURPOSE
Generate proposals, not facts. LLM does not own truth/time/continuity/boundaries.

## 1) OWNS (EXCLUSIVE)
1. Proposal generation
2. Natural language generation
3. Tool question formulation

## 5) EXPORTED OPERATIONS
### 5.1 `generate_proposal(context) -> write_bundle | tool_request`

## 6) ALLOWED CALLS: Engine 7
## 7) FORBIDDEN CALLS: Engine 0, Engine 10, Engine 12
```

---

## ENGINE_10_WRITE_ACCEPTANCE_AND_INTEGRITY_ENGINE/interface.md

**SHA-256:** `14e5574e4ea211b90b1bcebb0e49ee198c380308f7d55a5399fe6e3dd34e5146`

```markdown
# /engines/ENGINE_10_WRITE_ACCEPTANCE_AND_INTEGRITY_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 10
ENGINE NAME: WRITE ACCEPTANCE & INTEGRITY ENGINE

## 0) PURPOSE
Decide whether a proposed write is allowed to become reality.

## 1) OWNS (EXCLUSIVE)
1. Proposal validation
2. Constitutional enforcement at write-time
3. Write integrity guarantees
4. Explicit rejection handling

## 5) EXPORTED OPERATIONS
### 5.1 `validate_proposal(write_bundle, context) -> accepted_bundle | rejected_bundle`

## 6) ALLOWED CALLS: Engine 0
## 7) FORBIDDEN CALLS: Engine 9, Engine 12
```

---

## ENGINE_11_INFRASTRUCTURE_ENGINE/interface.md

**SHA-256:** `5bd4b2e4900704fb134049c5f1e7d74c8af366ace4dd6e915c9230320a3b27c0`

```markdown
# /engines/ENGINE_11_INFRASTRUCTURE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 11
ENGINE NAME: INFRASTRUCTURE ENGINE (MECHANICAL SUPPORT)

## 0) PURPOSE
Provide boring, reliable plumbing: storage, caching, indexing, transport.

## 1) OWNS (EXCLUSIVE)
1. Persistent storage primitives
2. Cache primitives
3. Search and indexing infrastructure
4. Transport and runtime mechanics

## 5) EXPORTED OPERATIONS
### 5.1 `db_query(sql, params) -> rows`
### 5.2 `cache_get(key) -> value`
### 5.3 `vector_search(vector) -> results`

## 6) ALLOWED CALLS: External Services (Postgres, Redis, Qdrant)
## 7) FORBIDDEN CALLS: Any domain engine (0-10, 12-14)
```

---

## ENGINE_12_PROJECTION_AND_UI_ADAPTER_ENGINE/interface.md

**SHA-256:** `3c80312e7274fee23d520d6daf0fa95018be752b3606d5609af4ba94fd902e4e`

```markdown
# /engines/ENGINE_12_PROJECTION_AND_UI_ADAPTER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 12
ENGINE NAME: PROJECTION & UI ADAPTER ENGINE

## 0) PURPOSE
Translate committed reality into something a human can see. Renders, does not invent.

## 1) OWNS (EXCLUSIVE)
1. Projection assembly
2. Display-channel enforcement
3. Cursor handling
4. UI-facing adaptation

## 5) EXPORTED OPERATIONS
### 5.1 `render_projection(request_id, cursor) -> projection_output`

## 6) ALLOWED CALLS: Engine 0, Engine 3, Engine 4
## 7) FORBIDDEN CALLS: Engine 9, Engine 10
```

---

## ENGINE_13_SYSTEM_POSTURE_ENFORCEMENT_ENGINE/interface.md

**SHA-256:** `102645654f36444568e2671701e5b9608707852cd77679b3a75d5efcbd210b9e`

```markdown
# /engines/ENGINE_13_SYSTEM_POSTURE_ENFORCEMENT_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 13
ENGINE NAME: SYSTEM POSTURE ENFORCEMENT ENGINE (NON-RUNTIME)

## 0) PURPOSE
Enforce system posture across development: non-directive, non-user-centric, constitution-first.

## 1) OWNS (EXCLUSIVE)
1. Posture rules
2. Drift detection
3. Development-time enforcement

## 5) EXPORTED OPERATIONS
### 5.1 `audit_posture(artifact_set) -> PASS|FAIL`

## 6) ALLOWED CALLS: None (Static Analysis)
## 7) FORBIDDEN CALLS: Any runtime engine
```

---

## ENGINE_14_CONTRACT_AND_PROHIBITION_TEST_ENGINE/interface.md

**SHA-256:** `9f6cbcbeac1897a32f198537ffe5a8b7a95caa318f79f96d8e08ba8cf1fb7941`

```markdown
# /engines/ENGINE_14_CONTRACT_AND_PROHIBITION_TEST_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 14
ENGINE NAME: CONTRACT & PROHIBITION TEST ENGINE (NON-RUNTIME)

## 0) PURPOSE
Ensure contracts are real, prohibitions are enforceable, violations are impossible to ignore.

## 1) OWNS (EXCLUSIVE)
1. Contract tests
2. Prohibition tests
3. CI enforcement

## 5) EXPORTED OPERATIONS
### 5.1 `run_contract_tests() -> PASS|FAIL`
### 5.2 `run_prohibition_tests() -> PASS|FAIL`
### 5.3 `run_full_suite() -> PASS|FAIL`

## 6) ALLOWED CALLS: All engines (via test harness)
## 7) FORBIDDEN CALLS: None
```

---

END OF FILE
