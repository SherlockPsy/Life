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
