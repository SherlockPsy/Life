---
spec_version: v1.0.0
status: DRAFT
owner: laws
depends_on:
  - LAW_MAPPING_INDEX.md
  - ARBITRATION_LAWS.md
  - GLOSSARY.md
  - SYSTEM_EXECUTION_MODEL.md
supersedes: []
---

# LAW APPLICATION PROTOCOL

## Authority Note (Binding)

This protocol executes **strictly within** the tick lifecycle defined in `SYSTEM_EXECUTION_MODEL.md`.

This document **does not define an independent execution order** and must not be interpreted as such.

If any ordering ambiguity exists, `SYSTEM_EXECUTION_MODEL.md` takes precedence.

---

## Purpose

Define the deterministic process by which applicable laws are selected,
evaluated, and arbitrated **for experience surfacing only**.

This protocol governs **selection and dominance**, not truth mutation.

---

## Inputs
- DecisionContext (read-only)
- ProposedEvents (validated, non-authoritative)

---

## Outputs
- ApplicableLawSet (ordered, deterministic)
- ConflictReport (if any)
- ResolvedLawPlan  
  *(experience selection only; does not authorize or generate StateDelta operations)*

---

## Steps

1. Identify domains touched by ProposedEvents.
2. Retrieve candidate laws from `LAW_MAPPING_INDEX.md` by domain.
3. Evaluate trigger conditions deterministically.
4. Sort ApplicableLawSet by precedence rules defined in `ARBITRATION_LAWS.md`.
5. Detect conflicts:
   - mutually exclusive permissions/requirements
   - competing experiential dominance claims
   - incompatible salience outcomes
6. Invoke arbitration to produce a ResolvedLawPlan governing:
   - what surfaces
   - what stays latent
   - what is delayed or suppressed
   - how time density is experienced

---

## Invariants

- Same inputs produce identical ApplicableLawSet ordering.
- Arbitration is deterministic.
- Arbitration outputs **never** introduce, modify, select, suppress, or authorize
  `StateDelta` operations.
- Arbitration operates exclusively on **experience surfacing, timing, and dominance**.
- Truth mutation occurs only via mechanisms defined upstream of arbitration
  and committed independently of surfacing.

END OF LAW_APPLICATION_PROTOCOL.md
