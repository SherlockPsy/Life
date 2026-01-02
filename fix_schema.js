const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@turntable.proxy.rlwy.net:25006/railway';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const schemaSQL = `
DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS bundles;
DROP TABLE IF EXISTS invocations CASCADE; 
-- Dropping invocations too just to be clean, though not strictly necessary if schema is fine.
-- Actually, let's drop everything to be sure.
DROP TABLE IF EXISTS scene_anchors;
DROP TABLE IF EXISTS rehydration_events;
DROP TABLE IF EXISTS beats;
DROP TABLE IF EXISTS world_clock;

-- 1. Invocations
CREATE TABLE invocations (
    request_id TEXT PRIMARY KEY,
    envelope JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Bundles
CREATE TABLE bundles (
    bundle_id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    proposed_by JSONB NOT NULL,
    wrote BOOLEAN NOT NULL,
    rejection JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Entries
CREATE TABLE entries (
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
CREATE TABLE world_clock (
    clock_id INTEGER PRIMARY KEY,
    world_time BIGINT NOT NULL DEFAULT 0
);

INSERT INTO world_clock (clock_id, world_time) VALUES (1, 0);

-- 5. Beats
CREATE TABLE beats (
    beat_id SERIAL PRIMARY KEY,
    request_id TEXT NOT NULL,
    world_time BIGINT NOT NULL,
    beat_kind TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_beats_request_id ON beats(request_id);

-- 6. Scene Anchors
CREATE TABLE scene_anchors (
    scene_anchor_id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    created_at_world BIGINT NOT NULL,
    anchor_text TEXT NOT NULL,
    provenance JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Rehydration Events
CREATE TABLE rehydration_events (
    rehydration_id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    created_at_world BIGINT NOT NULL,
    rehydration_text TEXT NOT NULL,
    physical_continuity_replay TEXT NOT NULL,
    provenance JSONB NOT NULL,
    trigger_info JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

async function run() {
  const client = await pool.connect();
  try {
    console.log("Connected to database...");
    console.log("Nuking and rebuilding schema...");
    await client.query(schemaSQL);
    console.log("Schema rebuilt successfully.");
  } catch (e) {
    console.error("Error rebuilding schema:", e);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
