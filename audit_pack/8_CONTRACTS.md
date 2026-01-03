# CONTRACTS

All contract definitions from `/contracts/` directory.

---

## Overview

| Contract | SHA-256 | Purpose |
|----------|---------|---------|
| invocation_envelope.md | `e1cbb7f4f49a64387ff45cad891d303a337640500b1b4c289f80ce724d514659` | Input from UI |
| write_bundle.md | `ca00cec869810477d725638f78cc9da442c2f6c47619cc25afc53d1ea281f6ef` | Atomic commit unit |
| write_entry.md | `e55a195c494fa2cbb68173f8c0bfc7aa5508c856b39c4f779a138195ca6a20bf` | Smallest reality unit |
| projection_output.md | `532bbbedb486ea3ea34fb5992b23f2bbaf2159ecde45e1e4f0a0757aff04f4ca` | UI stream payload |
| tool_request.md | `2cbc53600cfa66a8ad17b8c1f8d715cbaf212856b77f39f251269700fd627f5d` | LLM tool invocation |
| retrieval_result_pack.md | `559c73cb4fb58f43f189b493f7d958b9c76c363cc04aa7f0d52eb248825bb4d3` | Ledger-backed evidence |
| scene_anchor_pack.md | `5ddd477a2e55f6b24d452e4b4d84a8d5ca32633bb99ac6fec8e7f339465a54a8` | Scene setup caching |
| rehydration_pack.md | `1bd3f01f47f5c946c85d4225b32460f0ded7333632e4a60c58eced44a8c75e96` | Context limit recovery |
| capsule_pack.md | `f418bd40dbbf6d822e7509c03d5678fa13a60dfee6852333a9011f1b50ed461c` | Per-person continuity view |

---

## 1. invocation_envelope.md

**Lines:** 160

### Key Sections (Lines 1-80):

```markdown
# Contract: Invocation Envelope
STATUS: BINDING
SCOPE: All runtime calls that may cause a beat, tool loop, write proposal, write commit, projection refresh, or no-write.

This contract defines the single input shape the system accepts from the UI (and any other client). It exists to enforce:
- idempotency,
- non-user-centric LLM posture (LLM "user" is NOT George),
- explicitness of operator declarations (including time declarations),
- separation of operator input from system invoker identity.

This is a STRUCTURAL contract. Nothing here is world-state.
```

### Canonical JSON Shape:
```json
{
  "request_id": "string",
  "invoker": {
    "invoker_id": "string",
    "invoker_role": "INVOKER",
    "notes": "string|null"
  },
  "operator": {
    "operator_id": "GEORGE",
    "input_text": "string"
  },
  "mode": {
    "kind": "BEAT",
    "client_intent": "string|null"
  },
  "declared_overrides": {
    "time": {
      "declared_world_time": "string|null",
      "timezone": "string|null"
    },
    "pause_time": "boolean|null"
  },
  "ui": {
    "stream_cursor": "string|null",
    "client_timestamp_utc": "string|null"
  }
}
```

### Field Semantics:
- **request_id**: MUST be globally unique, idempotency key
- **invoker**: MUST NOT be "GEORGE", MUST NOT be human user identifier
- **operator.operator_id**: MUST be "GEORGE"
- **operator.input_text**: MUST be captured verbatim, MUST NOT be rewritten
- **mode.kind**: MUST be "BEAT" or "NO_OP"

---

## 2. write_bundle.md

**Lines:** 108

### Contract Summary:
```markdown
# Contract: Write Bundle (Atomic Commit Unit)
STATUS: BINDING
SCOPE: Any proposed or committed set of writes.

A Write Bundle is an atomic unit:
- Either ALL entries commit, or NONE commit.
- A rejected bundle has ZERO effect.
```

### Canonical JSON Shape:
```json
{
  "bundle_id": "string|null",
  "request_id": "string",
  "proposed_by": {
    "engine": "string",
    "actor": "string"
  },
  "entries": [ { "WriteEntry": "..." } ],
  "wrote": "boolean",
  "rejection": {
    "rejected": "boolean",
    "reason": "string|null"
  }
}
```

### MUST Rules:
- Bundles MUST commit atomically
- Bundle commit MUST be idempotent for same request_id
- If rejected: no entry_id issued, no bundle_id issued, nothing changes

### MUST NOT Rules:
- MUST NOT partially commit some entries
- MUST NOT "fix" a rejected bundle automatically

---

## 3. write_entry.md

**Lines:** 153

### Contract Summary:
```markdown
# Contract: Write Entry
STATUS: BINDING
SCOPE: Any committed text that becomes part of reality (ledger).

A Write Entry is the smallest unit of written reality.
Reality is append-only. Past entries are never edited.
Corrections are new entries.
```

### Canonical JSON Shape:
```json
{
  "entry_id": "string|null",
  "bundle_id": "string|null",
  "request_id": "string",
  "created_at_world": "string",
  "author": {
    "author_id": "string",
    "author_class": "OPERATOR|PERSON|WORLD|SYSTEM"
  },
  "visibility": {
    "scope": "PUBLIC|PRIVATE",
    "visible_to": ["string"]
  },
  "channel": "USER|VOICE|PEOPLE",
  "text": "string"
}
```

### author_class Values:
- OPERATOR (George)
- PERSON (Rebecca or other people)
- WORLD (world-generated)
- SYSTEM (mechanical system writes)

### channel Values:
- USER: verbatim operator input, unlabeled in UI
- VOICE: world descriptor projection text, unlabeled in UI
- PEOPLE: character speech/action, labeled in UI

---

## 4. projection_output.md

**Lines:** 141

### Contract Summary:
```markdown
# Contract: Projection Output (UI Stream Payload)
STATUS: BINDING
SCOPE: Anything rendered on screen (Perceptual Stream + Pocket).

Projection is not reality.
Projection MUST be derived from written reality (ledger) and visibility rules.
Projection MUST NOT create facts.
Projection MUST NOT "repair" gaps.
```

### Canonical JSON Shape:
```json
{
  "request_id": "string",
  "stream": {
    "cursor_before": "string|null",
    "cursor_after": "string|null",
    "entries": [
      {
        "entry_id": "string",
        "created_at_world": "string",
        "channel": "USER|VOICE|PEOPLE",
        "author_label": "string|null",
        "text": "string"
      }
    ]
  },
  "pocket": {
    "is_available": "boolean",
    "clock": { "world_time": "string|null", "timezone": "string|null" },
    "calendar": { "items": [...] },
    "messages": { "items": [...] }
  },
  "debug": {
    "wrote": "boolean",
    "bundle_id": "string|null"
  }
}
```

### Stream Rules:
- Entries MUST be ordered by created_at_world then ledger ordering
- author_label MUST be null for USER and VOICE
- text MUST be exactly the ledger text; no projection edits

---

## 5. tool_request.md

**Lines:** 80

### Contract Summary:
```markdown
# Contract: Tool Request (LLM Asks Questions)
STATUS: BINDING
SCOPE: Any LLM tool invocation (retrieval, capsule fetch, scene pack build, etc.)

Tools are MECHANICAL QUERY PRIMITIVES.
Tools do not decide meaning.
Tools do not write reality.
Tools return ledger-backed excerpts with provenance.
```

### Canonical JSON Shape:
```json
{
  "tool_request_id": "string",
  "request_id": "string",
  "requested_by": {
    "engine": "ENGINE_9_LLM_WRITER",
    "actor": "string",
    "knowledge_view": "string"
  },
  "tool": {
    "name": "LEDGER_SEARCH|LEDGER_GET|CAPSULE_GET|SCENE_PACK_BUILD",
    "query_text": "string",
    "constraints": {
      "time_window": {"from":"string|null","to":"string|null"},
      "limit": "number",
      "person_id": "string|null"
    }
  }
}
```

---

## 6. retrieval_result_pack.md

**Lines:** 80

### Contract Summary:
```markdown
# Contract: Retrieval Result Pack (Ledger-Backed Evidence)
STATUS: BINDING
SCOPE: Any tool response that returns evidence excerpts.

Retrieval returns EVIDENCE, not interpretation.
All results must point to ledger sources.
Verbatim excerpts only.
```

### Canonical JSON Shape:
```json
{
  "tool_request_id": "string",
  "request_id": "string",
  "results": [
    {
      "entry_id": "string",
      "bundle_id": "string",
      "created_at_world": "string",
      "visibility_scope": "PUBLIC|PRIVATE",
      "verbatim_excerpt": "string"
    }
  ],
  "empty": "boolean",
  "notes": "string|null"
}
```

---

## 7. scene_anchor_pack.md

**Lines:** 80

### Contract Summary:
```markdown
# Contract: Scene Anchor Pack (Cached Setup)
STATUS: BINDING
SCOPE: Scene setup caching and reintroduction.

Scene setup is sent once and treated as cached context.
It must not be resent every beat.
Scene anchors are NATURAL LANGUAGE ONLY.
```

### Canonical JSON Shape:
```json
{
  "scene_anchor_id": "string",
  "request_id": "string",
  "created_at_world": "string",
  "text": "string",
  "provenance": {
    "used_entry_ids": ["string"]
  }
}
```

---

## 8. rehydration_pack.md

**Lines:** 80

### Contract Summary:
```markdown
# Contract: Rehydration Pack (Context Limit Recovery)
STATUS: BINDING
SCOPE: Context reintroduction near token limits.

Rehydration:
- is triggered mechanically (not semantically),
- occurs only at beat boundaries,
- is atomic: complete or do not proceed,
- is invisible in lived experience,
- is NATURAL LANGUAGE ONLY,
- includes physical continuity replay binding.
```

### Canonical JSON Shape:
```json
{
  "rehydration_id": "string",
  "request_id": "string",
  "created_at_world": "string",
  "text": "string",
  "physical_continuity_replay": "string",
  "provenance": {
    "used_entry_ids": ["string"],
    "used_capsule_ids": ["string"]
  },
  "trigger": {
    "kind": "TOKEN_BUDGET",
    "threshold": "string"
  }
}
```

---

## 9. capsule_pack.md

**Lines:** 80

### Contract Summary:
```markdown
# Contract: Capsule Pack (Per-Person Continuity View)
STATUS: BINDING
SCOPE: Any per-person capsule assembled for continuity and behavior grounding.

Capsules are NOT authority.
Ledger entries are authority.
Capsules are regeneratable views built from ledger-backed excerpts.
```

### Canonical JSON Shape:
```json
{
  "capsule_id": "string",
  "person_id": "string",
  "created_at_world": "string",
  "sections": [
    {
      "name": "SOURCE_EXCERPTS",
      "text": "string",
      "provenance": {"used_entry_ids":["string"]}
    },
    {
      "name": "OPTIONAL_DERIVED",
      "text": "string",
      "provenance": {"used_entry_ids":["string"]}
    }
  ]
}
```

### MUST Rules:
- SOURCE_EXCERPTS section MUST exist
- SOURCE_EXCERPTS.text MUST be verbatim excerpts only

### MUST NOT Rules:
- MUST NOT store hidden semantic state (no meters, no numeric stats)
- MUST NOT invent biography, preferences, motives unless in written evidence
- MUST NOT "correct" contradictions

---

END OF FILE
