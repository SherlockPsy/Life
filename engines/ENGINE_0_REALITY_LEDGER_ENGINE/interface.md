# /engines/ENGINE_0_REALITY_LEDGER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 0
ENGINE NAME: REALITY LEDGER ENGINE (ONTOLOGICAL AUTHORITY)

This file defines the ONLY permitted boundary for Engine 0.
Any runtime component that reads/writes reality outside this interface is invalid.

----------------------------------------------------------------------

## 0) PURPOSE

Define what exists and what changes, and nothing else.

Engine 0 is the ontological authority:
- Reality exists only as written text committed to the ledger.
- Reality changes only via atomic bundle commits.
- Past reality is never edited.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 0 exclusively owns:

1. Ontology enforcement
- Only written text exists as reality.
- If it is not written into the ledger, it does not exist.

2. Append-only invariant
- No updates, no deletes, no in-place edits.

3. Atomic bundle commits
- Reality changes only through an all-or-nothing bundle.

4. Idempotency outcome persistence (storage side)
- Same invocation (same request_id) must not create duplicate reality.
- Replay returns the identical committed outcome.

5. Attribution metadata (non-semantic)
- Who authored an entry (explicit author identity + class).

6. Ordering / timestamps (non-semantic ordering metadata)
- Stores created_at_world and ledger order.

7. Visibility metadata (non-semantic boundary data)
- Public vs private classification and any visibility scoping metadata required.

Engine 0 is the ONLY owner of these properties. No other engine may re-implement them.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 0 does NOT own:

- Semantic interpretation of text.
- Narrative smoothing or contradiction resolution.
- Relevance or ranking decisions.
- Knowledge gating decisions (it stores visibility metadata but does not decide “who knows”).
- Rendering rules or formatting.
- Capsule generation or summaries.
- Tool request logic.
- Time logic (it stores created_at_world, but Engine 3 defines time).

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 0 accepts inputs ONLY in these contract shapes:

A) `/contracts/write_bundle.md`
- A proposed bundle of WriteEntry objects, to be committed atomically.

B) `/contracts/invocation_envelope.md`
- ONLY for idempotency linkage and audit correlation (request_id + invoker/operator identity).
- Engine 0 MUST NOT interpret any operator text content here as “world state” unless it arrives inside a WriteEntry to be committed.

Engine 0 MUST reject any input that is not contract-valid.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 0 emits outputs ONLY in these contract shapes:

A) Commit result (bundle + entries) expressed as:
- `/contracts/write_bundle.md` (with assigned bundle_id, entry_id for all entries)
- `/contracts/write_entry.md` (for each committed entry, with assigned IDs)

B) Read results for other engines:
- When returning entries, Engine 0 returns canonical WriteEntry shapes (write_entry.md).
- When returning bundles, Engine 0 returns canonical WriteBundle shapes (write_bundle.md).

Engine 0 MUST NOT emit derived summaries, paraphrases, or fabricated excerpts.

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `commit_bundle(write_bundle) -> committed_bundle | rejection`
- Atomically commits a bundle.
- Enforces append-only.
- Enforces idempotency.

### 5.2 `get_entries(filter) -> [write_entry]`
- Retrieves entries by ID, time range, or bundle.
- Returns raw entries.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 0 may call:
- Engine 11 (Infrastructure) - for raw DB persistence.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 0 must NEVER call:
- Engine 9 (LLM Writer) - Reality cannot ask for content.
- Engine 12 (Projection) - Reality cannot ask to be rendered.
- Engine 3 (Time) - Reality stores time, it does not ask for it.
- Any other domain engine.

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 0 may read:
- Its own internal storage (via Engine 11).
- Input contracts passed to it.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 0 must NEVER read:
- Uncommitted proposals from other engines (unless passed as input).
- External world state not in the ledger.
- System logs or debug traces as "facts".

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Storage Failure**: Return explicit error (HTTP 500 equivalent). Do not partial commit.
- **Integrity Violation**: Reject bundle (wrote=false, rejected=true).
- **Idempotency Conflict**: Return existing outcome.

