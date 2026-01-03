# DATABASE SCHEMA

## Overview

All schema definitions extracted from:
- `sql/phase_5_schema.sql` (incremental migrations)
- `fix_schema.js` (destructive rebuild)
- `reconstruct_schema.js` (idempotent apply)

---

## sql/phase_5_schema.sql

**SHA-256:** `1ff7fcd13436c7f5286a342221c1c8a2bab11b70e30b9b6a088bd1676a18668e`  
**Lines:** 24

### Full Contents:
```sql
-- Phase 5 Schema Changes

-- 1. World Clock (Engine 3)
CREATE TABLE IF NOT EXISTS world_clock (
    clock_id INTEGER PRIMARY KEY,
    world_time BIGINT NOT NULL DEFAULT 0
);

-- Initialize if empty
INSERT INTO world_clock (clock_id, world_time)
SELECT 1, 0
WHERE NOT EXISTS (SELECT 1 FROM world_clock WHERE clock_id = 1);

-- 2. Beats (Engine 2)
CREATE TABLE IF NOT EXISTS beats (
    beat_id SERIAL PRIMARY KEY,
    request_id UUID NOT NULL,
    world_time BIGINT NOT NULL,
    beat_kind TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for lookups
CREATE INDEX IF NOT EXISTS idx_beats_request_id ON beats(request_id);
```

---

## reconstruct_schema.js (Canonical Schema)

**SHA-256:** (run `sha256sum reconstruct_schema.js` to verify)  
**Lines:** 102

### Full Schema SQL Extracted (Lines 10-79):
```sql
-- 1. Invocations
CREATE TABLE IF NOT EXISTS invocations (
    request_id TEXT PRIMARY KEY,
    envelope JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Bundles
CREATE TABLE IF NOT EXISTS bundles (
    bundle_id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    proposed_by JSONB NOT NULL,
    wrote BOOLEAN NOT NULL,
    rejection JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Entries
CREATE TABLE IF NOT EXISTS entries (
    entry_id TEXT PRIMARY KEY,
    bundle_id TEXT NOT NULL,
    request_id TEXT NOT NULL,
    created_at_world BIGINT NOT NULL,
    author JSONB,
    visibility JSONB,
    channel TEXT,
    text TEXT,
    sequence_id SERIAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. World Clock
CREATE TABLE IF NOT EXISTS world_clock (
    clock_id INTEGER PRIMARY KEY,
    world_time BIGINT NOT NULL DEFAULT 0
);

INSERT INTO world_clock (clock_id, world_time)
SELECT 1, 0
WHERE NOT EXISTS (SELECT 1 FROM world_clock WHERE clock_id = 1);

-- 5. Beats
CREATE TABLE IF NOT EXISTS beats (
    beat_id SERIAL PRIMARY KEY,
    request_id TEXT NOT NULL,
    world_time BIGINT NOT NULL,
    beat_kind TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_beats_request_id ON beats(request_id);

-- 6. Scene Anchors
CREATE TABLE IF NOT EXISTS scene_anchors (
    scene_anchor_id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    created_at_world BIGINT NOT NULL,
    anchor_text TEXT NOT NULL,
    provenance JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Rehydration Events
CREATE TABLE IF NOT EXISTS rehydration_events (
    rehydration_id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    created_at_world BIGINT NOT NULL,
    rehydration_text TEXT NOT NULL,
    physical_continuity_replay TEXT NOT NULL,
    provenance JSONB NOT NULL,
    trigger_info JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Table Summary

| Table | Primary Key | Engine Owner | Purpose |
|-------|-------------|--------------|---------|
| `invocations` | `request_id TEXT` | Engine 1 | Idempotency envelope storage |
| `bundles` | `bundle_id TEXT` | Engine 0 | Write bundle records |
| `entries` | `entry_id TEXT` | Engine 0 | Append-only ledger entries |
| `world_clock` | `clock_id INTEGER` | Engine 3 | Singleton world time tracker |
| `beats` | `beat_id SERIAL` | Engine 2 | Beat coordination records |
| `scene_anchors` | `scene_anchor_id TEXT` | Engine 5 | Scene anchor snapshots |
| `rehydration_events` | `rehydration_id TEXT` | Engine 5 | Rehydration event records |

---

## Column Details

### invocations
| Column | Type | Constraints |
|--------|------|-------------|
| request_id | TEXT | PRIMARY KEY |
| envelope | JSONB | NOT NULL |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() |

### bundles
| Column | Type | Constraints |
|--------|------|-------------|
| bundle_id | TEXT | PRIMARY KEY |
| request_id | TEXT | NOT NULL |
| proposed_by | JSONB | NOT NULL |
| wrote | BOOLEAN | NOT NULL |
| rejection | JSONB | nullable |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() |

### entries
| Column | Type | Constraints |
|--------|------|-------------|
| entry_id | TEXT | PRIMARY KEY |
| bundle_id | TEXT | NOT NULL |
| request_id | TEXT | NOT NULL |
| created_at_world | BIGINT | NOT NULL |
| author | JSONB | nullable |
| visibility | JSONB | nullable |
| channel | TEXT | nullable |
| text | TEXT | nullable |
| sequence_id | SERIAL | auto-increment |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() |

### world_clock
| Column | Type | Constraints |
|--------|------|-------------|
| clock_id | INTEGER | PRIMARY KEY |
| world_time | BIGINT | NOT NULL DEFAULT 0 |

### beats
| Column | Type | Constraints |
|--------|------|-------------|
| beat_id | SERIAL | PRIMARY KEY |
| request_id | TEXT | NOT NULL |
| world_time | BIGINT | NOT NULL |
| beat_kind | TEXT | NOT NULL |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() |

### scene_anchors
| Column | Type | Constraints |
|--------|------|-------------|
| scene_anchor_id | TEXT | PRIMARY KEY |
| request_id | TEXT | NOT NULL |
| created_at_world | BIGINT | NOT NULL |
| anchor_text | TEXT | NOT NULL |
| provenance | JSONB | NOT NULL |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() |

### rehydration_events
| Column | Type | Constraints |
|--------|------|-------------|
| rehydration_id | TEXT | PRIMARY KEY |
| request_id | TEXT | NOT NULL |
| created_at_world | BIGINT | NOT NULL |
| rehydration_text | TEXT | NOT NULL |
| physical_continuity_replay | TEXT | NOT NULL |
| provenance | JSONB | NOT NULL |
| trigger_info | JSONB | NOT NULL |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() |

---

## Indexes

| Index Name | Table | Column(s) |
|------------|-------|-----------|
| `idx_beats_request_id` | beats | request_id |

---

## SQL Queries Found in Codebase

### server.js
- `INSERT INTO invocations (request_id, envelope) VALUES ($1, $2)`
- `SELECT * FROM invocations WHERE request_id = $1`
- `SELECT world_time FROM world_clock WHERE clock_id = 1`
- `UPDATE world_clock SET world_time = $1 WHERE clock_id = 1`
- `INSERT INTO beats (request_id, world_time, beat_kind) VALUES ($1, $2, $3)`
- `INSERT INTO bundles (bundle_id, request_id, proposed_by, wrote, rejection) VALUES ($1, $2, $3, $4, $5)`
- `INSERT INTO entries (entry_id, bundle_id, request_id, created_at_world, author, visibility, channel, text) VALUES ...`
- `SELECT * FROM entries ORDER BY sequence_id DESC LIMIT 20`
- `SELECT anchor_text FROM scene_anchors ORDER BY created_at DESC LIMIT 1`
- `INSERT INTO scene_anchors (scene_anchor_id, request_id, created_at_world, anchor_text, provenance) VALUES ...`

### ENGINE_8_RETRIEVAL_ENGINE/core.js
- `SELECT * FROM entries WHERE text ILIKE $1 LIMIT 5`

---

END OF FILE
