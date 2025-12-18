# SPEC_VERSION

spec_version: v1.0.0
date_utc: 2025-12-18
status: DRAFT (until explicitly marked LOCKED)

## Authority
- The only authoritative specification is the set of files in this Project marked LOCKED.
- Chat messages are non-authoritative and must not be used as implementation source.

## Change control
- Any behavioral change MUST update:
  - spec_version (semantic)
  - impacted files’ headers
  - conformance tests
- If spec is silent: IMPLEMENTATION MUST FAIL (no guessing).

## Determinism scope (locked principle)
- Determinism is required for engine-level state transition logic and arbitration.
- Determinism is NOT required for rendered narrative text, except that it must not contradict state.
