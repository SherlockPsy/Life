# AUDIT PACK INDEX

## Repository Information
- **Commit Hash**: `6bb0dab7b31c642576c52985751c6294101470c6`
- **Branch**: `main`
- **Repo Root Path**: `/workspaces/life`
- **Generated**: 2026-01-03

---

## Audit Pack Files

| File | Description |
|------|-------------|
| [0_INDEX.md](0_INDEX.md) | This file: commit info, branch, index of all audit files |
| [1_SPECS_LOCKED.md](1_SPECS_LOCKED.md) | Key constraints/invariants from spec files with SHA-256 hashes |
| [2_REPO_MAP.md](2_REPO_MAP.md) | Repository structure up to depth 4 with file sizes |
| [3_RUNTIME_ENTRYPOINTS.md](3_RUNTIME_ENTRYPOINTS.md) | server.js and route definitions with call graph index |
| [4_ENGINE_INTERFACES.md](4_ENGINE_INTERFACES.md) | All engine interface.md files with SHA-256 hashes |
| [5_ENGINE_IMPLEMENTATIONS_PART1.md](5_ENGINE_IMPLEMENTATIONS_PART1.md) | Engine 0-5 implementations and utilities |
| [6_ENGINE_IMPLEMENTATIONS_PART2.md](6_ENGINE_IMPLEMENTATIONS_PART2.md) | Engine 6-14 implementations |
| [7_DB_SCHEMA.md](7_DB_SCHEMA.md) | SQL schema files and table references in code |
| [8_CONTRACTS.md](8_CONTRACTS.md) | All contract files with SHA-256 hashes and full contents |
| [9_CHARACTER_PAYLOADS.md](9_CHARACTER_PAYLOADS.md) | Character definitions (rebecca/*.md, archetypes/*.json) |
| [10_PHASE_REPORTS.md](10_PHASE_REPORTS.md) | All PHASE_*_EXECUTION_REPORT.md files |

---

## Verification Instructions

To verify file integrity:
```bash
cd /workspaces/life
sha256sum <filename>
```

Compare output against SHA-256 hashes documented in each audit file.
