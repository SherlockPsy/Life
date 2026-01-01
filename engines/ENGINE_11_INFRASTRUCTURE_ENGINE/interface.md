# /engines/ENGINE_11_INFRASTRUCTURE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 11
ENGINE NAME: INFRASTRUCTURE ENGINE (MECHANICAL SUPPORT)

This file defines the ONLY permitted boundary for Engine 11.
Engine 11 provides mechanical infrastructure services.
It is explicitly non-semantic and non-authoritative.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 11 exists to provide **boring, reliable plumbing**.

It supports other engines with:
- storage,
- caching,
- indexing,
- transport,
- logging,
- metrics.

Engine 11 does not know about reality, narrative, people, or meaning.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 11 exclusively owns:

1. Persistent storage primitives
- Database connections.
- Transactions.
- Schema migrations.
- Backups and restores.

2. Cache primitives
- Redis connections.
- Cache eviction policies.
- TTL handling.

3. Search and indexing infrastructure
- Vector indexes (Qdrant).
- Full-text search indexes.
- Index refresh mechanics.

4. Transport and runtime mechanics
- HTTP servers.
- Message queues (if any).
- Serialization/deserialization.

Engine 11 is the ONLY engine allowed to interact directly with infrastructure services.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 11 does NOT own:

- Reality or ledger semantics (Engine 0).
- Time logic (Engine 3).
- Beat coordination (Engine 2).
- Knowledge boundaries (Engine 4).
- Retrieval logic (Engine 8).
- Content generation (Engine 9).
- Rendering or UI (Engine 12).
- Any constitutional rule enforcement.

Engine 11 supports; it never decides.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 11 accepts ONLY:

A) Explicit infrastructure requests from other engines
- Storage read/write requests.
- Cache get/set requests.
- Index query requests.

All requests must come from an engine context.
No direct UI or LLM access is permitted.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 11 emits ONLY:

- Raw data results (records, rows, blobs).
- Success/failure signals.
- No domain-specific objects.

Engine 11 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- RetrievalResultPack

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `db_query(sql, params) -> rows`
### 5.2 `cache_get(key) -> value`
### 5.3 `vector_search(vector) -> results`

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 11 may call:
- External Services (Postgres, Redis, Qdrant).

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 11 must NEVER call:
- Any domain engine (0-10, 12-14).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 11 may read:
- Raw bytes/rows.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 11 must NEVER read:
- Domain logic.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Connection Failure**: Error.
- **Timeout**: Error.

