# SPEC HEADER TEMPLATE

Every spec file MUST start with:

---
spec_version: v1.0.0
status: DRAFT | LOCKED
owner: <component/area>
depends_on:
  - <file>
supersedes:
  - <file or version>
---

Rules:
- Any undefined term is invalid (must be in GLOSSARY.md).
- Any ambiguity must be resolved by (a) adding a rule, or (b) delegating to a named policy hook with a default.
