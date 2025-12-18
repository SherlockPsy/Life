
# LLM_BUILD_CHECKLIST.md
## LLM-FACING IMPLEMENTATION CHECKLIST — VirLife — VERSION 1.0
## This is a build-time gate. If any item is not satisfied, the implementation is invalid.

This checklist is binding when referenced by BUILD_CONTRACT.md.

---

# A) Spec ingestion gates (must be true before writing code)
[A1] Builder has loaded and is operating from canonical file precedence exactly as stated in ARBITRATION_LAWS.md and related canon.
[A2] Builder has loaded STATE_SPEC.md and is using S1–S6 shapes exactly; no alternate shapes invented.
[A3] Builder has loaded Renderer Rules and will not assign decisions to renderer.
[A4] Builder has loaded INFRASTRUCTURE_AND_RUNTIME_CONTRACT.md and will not assume microservices/horizontal scaling.

---

# B) Closed-world gates (no guessing)
[B1] If spec is silent: builder must fail the build rather than invent behavior.
[B2] Any new dimension/rule requires updating mappings in LAW_MAPPING_INDEX.md (per its enforcement rule).
[B3] Any default thresholds, bounds, rates must exist in PARAMETERS.md. No hidden constants.

---

# C) Time and tick gates (irreversibility)
[C1] current_tick_id strictly monotonic (STATE_SPEC S1).
[C2] system_time advances only when presence_gate.is_present == true (STATE_SPEC S1).
[C3] Tick execution serialized (INFRA contract concurrency); only one tick at a time.
[C4] No “meanwhile” background activity when absent (DRIFT_SPEC presence-gated drift).

---

# D) Drift gates (must be real)
[D1] Drift executes only when system time advances (DRIFT_SPEC).
[D2] Drift is deterministic given (time delta + current state + modulators).
[D3] Drift must never be no-op while presence is true and time advances (STATE_SPEC Drift Interaction + DRIFT_SPEC anti-stagnation).
[D4] Drift must satisfy INEVITABILITY_ADDENDUM Section II (impact requirements).
[D5] Drift emits auditable deltas with provenance (DRIFT_SPEC auditability + INEVITABILITY_ADDENDUM II.4).

---

# E) Silence distribution gates (must feel like life)
[E1] It must be possible for no rendered block to occur while time advances.
[E2] Silence distribution must satisfy INEVITABILITY_ADDENDUM Section I.
[E3] Renderer is not allowed to “fill silence” with meta lines or commentary; UI rejects forbidden content (UI_CONTRACT renderer boundary rules).

---

# F) Renderer gates (strict)
[F1] Renderer receives only an envelope assembled by backend (UI_CONTRACT).
[F2] Renderer output is rejected if it contains instructions, meta commentary, system behaviour references (UI_CONTRACT).
[F3] Renderer never invents actions, perception ownership, or decisions (Renderer Rules).

---

# G) Storage gates (truth vs cache)
[G1] Postgres is authoritative truth store (Infra contract).
[G2] Redis is cache only and must never be used to reconstruct present truth.
[G3] Qdrant is retrieval only; never stores truth; never reconstructs present.

---

# H) Conformance tests gates (non-negotiable)
[H1] A test suite exists that validates:
     - monotonic time
     - single-world singleton constraint
     - append-only history constraints
     - serialized tick constraint
[H2] A test suite exists that validates:
     - Silence distribution constraints (INEVITABILITY_ADDENDUM I)
     - Drift impact constraints (INEVITABILITY_ADDENDUM II)
[H3] Build/deploy fails if any required test fails.

---

END OF LLM_BUILD_CHECKLIST.md