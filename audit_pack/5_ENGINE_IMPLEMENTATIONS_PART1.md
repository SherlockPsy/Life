# ENGINE IMPLEMENTATIONS PART 1 — ENGINES 0-5 + UTILITIES

## Note on Engines 0 and 1

Engines 0 (Reality Ledger) and 1 (Invocation/Idempotency) do not have separate core.js files.
Their logic is implemented directly in server.js (see 3_RUNTIME_ENTRYPOINTS.md).

---

## ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/core.js

**SHA-256:** `d5a67222da0c651479fe6a0b2996e6d001ce0ae43ac9ae6284c4fb2e966e6038`  
**Lines:** 36

### Full Contents:
```javascript
// REMOVED: Engine 2 MUST NOT coordinate time.
// Time resolution is now handled by the Invocation layer (Engine 1) before calling Engine 2.

module.exports = {
  /**
   * Coordinate a beat boundary.
   * @param {Object} client - Postgres client
   * @param {Object} envelope - Invocation envelope
   * @param {number} worldTime - Current world time (resolved by Engine 3)
   * @returns {Promise<Object>} - Beat Context
   */
  async handleBeat(client, envelope, worldTime) {
    // 1. Determine Beat Kind
    // In Phase 5, we don't have complex logic yet.
    // If the envelope explicitly requests a NO_OP, we might respect it,
    // but for now we treat all valid invocations as NORMAL beats.
    const beatKind = "NORMAL";

    // 2. Record Beat Boundary (Mechanical)
    // We store this to ensure the beat ID is monotonic and traceable.
    const res = await client.query(
      'INSERT INTO beats (request_id, world_time, beat_kind) VALUES ($1, $2, $3) RETURNING beat_id',
      [envelope.request_id, worldTime, beatKind]
    );

    // 3. Return Beat Context
    return {
      beat_id: res.rows[0].beat_id,
      beat_kind: beatKind,
      world_time: worldTime,
      envelope: envelope
    };
  }
};
```

### SQL Strings Used:
- `INSERT INTO beats (request_id, world_time, beat_kind) VALUES ($1, $2, $3) RETURNING beat_id`

---

## ENGINE_3_TIME_AND_CALENDAR_ENGINE/core.js

**SHA-256:** `fc0bef0ca379d88e49bf54a7f66df31859dec7bee07b17f3672c2f73c4c0da77`  
**Lines:** 55

### Full Contents:
```javascript
const { Pool } = require('pg');

module.exports = {
  /**
   * Get the current objective world time.
   * @param {Object} client - Postgres client
   * @returns {Promise<number>} - Current world time ticks
   */
  async getWorldTime(client) {
    const res = await client.query('SELECT world_time FROM world_clock WHERE clock_id = 1');
    if (res.rows.length === 0) {
      // Fallback initialization if SQL wasn't run (safety net, though SQL is required)
      await client.query('INSERT INTO world_clock (clock_id, world_time) VALUES (1, 0)');
      return 0;
    }
    return parseInt(res.rows[0].world_time);
  },

  /**
   * Advance world time by a specific delta.
   * @param {Object} client - Postgres client
   * @param {number} amount - Ticks to advance
   * @returns {Promise<number>} - New world time
   */
  async advanceTime(client, amount) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw new Error("Time advancement must be a non-negative integer.");
    }
    if (amount === 0) return await this.getWorldTime(client);

    const res = await client.query(
      'UPDATE world_clock SET world_time = world_time + $1 WHERE clock_id = 1 RETURNING world_time',
      [amount]
    );
    return parseInt(res.rows[0].world_time);
  },

  /**
   * Set world time to a specific value (Override).
   * @param {Object} client - Postgres client
   * @param {number} time - Absolute time ticks
   * @returns {Promise<number>} - New world time
   */
  async setTime(client, time) {
    if (!Number.isInteger(time) || time < 0) {
      throw new Error("Time must be a non-negative integer.");
    }
    const res = await client.query(
      'UPDATE world_clock SET world_time = $1 WHERE clock_id = 1 RETURNING world_time',
      [time]
    );
    return parseInt(res.rows[0].world_time);
  }
};
```

### SQL Strings Used:
- `SELECT world_time FROM world_clock WHERE clock_id = 1`
- `INSERT INTO world_clock (clock_id, world_time) VALUES (1, 0)`
- `UPDATE world_clock SET world_time = world_time + $1 WHERE clock_id = 1 RETURNING world_time`
- `UPDATE world_clock SET world_time = $1 WHERE clock_id = 1 RETURNING world_time`

---

## ENGINE_5_SCENE_ANCHOR_AND_REHYDRATION_ENGINE/core.js

**SHA-256:** `a65ccfeec30a3fb1a76acd404e47c9b23a86d0591f8998e7e25477685ab040d2`  
**Lines:** 157

### Full Contents:
```javascript
const { v4: uuidv4 } = require('uuid');

// CONSTANTS
const CONTEXT_CHAR_LIMIT = 10000; // Mechanical character limit
const REHYDRATION_TRIGGER_THRESHOLD = "NEAR_EXHAUSTION";

/**
 * Engine 5: Scene Anchor & Rehydration Engine
 */
const Engine5 = {

  /**
   * Main entry point for Beat Boundary check.
   * Called by Server/Engine 2 at the end of a beat.
   */
  async handleBeatBoundary(client, requestId, worldTime) {
    // 1. Get latest anchor
    const lastAnchor = await this.getLatestAnchor(client);
    
    // 2. Get entries since last anchor
    const entries = await this.getEntriesSince(client, lastAnchor ? lastAnchor.created_at_world : 0);
    
    // 3. Calculate Context Load (Mechanical)
    const load = this.calculateContextLoad(lastAnchor, entries);
    
    // 4. Check Threshold
    if (load >= CONTEXT_CHAR_LIMIT) {
      // 5. Trigger Rehydration
      return await this.performRehydration(client, requestId, worldTime, lastAnchor, entries);
    }
    
    return null; // No rehydration needed
  },

  /**
   * Retrieves the most recent Scene Anchor.
   */
  async getLatestAnchor(client) {
    const res = await client.query(
      'SELECT * FROM scene_anchors ORDER BY created_at_world DESC LIMIT 1'
    );
    return res.rows[0] || null;
  },

  /**
   * Retrieves ledger entries since a given world time.
   */
  async getEntriesSince(client, worldTime) {
    const res = await client.query(
      `SELECT e.* FROM entries e
       JOIN bundles b ON e.bundle_id = b.bundle_id
       WHERE e.created_at_world > $1
       AND b.wrote = true
       ORDER BY e.created_at_world ASC, e.sequence_id ASC`,
      [worldTime]
    );
    return res.rows;
  },

  /**
   * Mechanical load counting (Character Count).
   * Purely deterministic.
   */
  calculateContextLoad(anchor, entries) {
    let len = 0;
    if (anchor) len += anchor.anchor_text.length;
    entries.forEach(e => len += e.text.length);
    return len;
  },

  /**
   * Generates and stores a Rehydration Pack.
   * ATOMIC operation.
   */
  async performRehydration(client, requestId, worldTime, lastAnchor, entries) {
    const rehydrationId = "rh:" + uuidv4();
    
    // GENERATION LOGIC (Phase 7 Correction: Verbatim Only)
    // We must NOT invent text. We must NOT use placeholders.
    // We use the last entry as the physical continuity anchor.
    
    const lastEntry = entries[entries.length - 1];
    // If no entries, we default to empty string (silence).
    const physicalContinuity = lastEntry ? lastEntry.text : "";

    // The text of the rehydration pack is the re-introduction of context.
    // Since we cannot summarize (no LLM), we simply restate the physical continuity.
    const text = physicalContinuity;

    const provenance = {
      used_entry_ids: entries.map(e => e.entry_id),
      used_capsule_ids: []
    };

    const trigger = {
      kind: "TOKEN_BUDGET",
      threshold: REHYDRATION_TRIGGER_THRESHOLD
    };

    const pack = {
      rehydration_id: rehydrationId,
      request_id: requestId,
      created_at_world: worldTime,
      text: text,
      physical_continuity_replay: physicalContinuity,
      provenance: provenance,
      trigger: trigger
    };

    // Store it
    await client.query(
      `INSERT INTO rehydration_events 
       (rehydration_id, request_id, created_at_world, rehydration_text, physical_continuity_replay, provenance, trigger_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        pack.rehydration_id,
        pack.request_id,
        pack.created_at_world,
        pack.text,
        pack.physical_continuity_replay,
        JSON.stringify(pack.provenance),
        JSON.stringify(pack.trigger)
      ]
    );

    // Create a new Scene Anchor to reset the budget.
    // We use the same text (physical continuity) as the anchor.
    await this.createSceneAnchor(client, requestId, worldTime, entries, text);

    return pack;
  },

  /**
   * Creates a Scene Anchor.
   */
  async createSceneAnchor(client, requestId, worldTime, entries, summaryText) {
    const anchorId = "sa:" + uuidv4();
    
    const provenance = {
      used_entry_ids: entries.map(e => e.entry_id)
    };

    const anchorPack = {
      scene_anchor_id: anchorId,
      request_id: requestId,
      created_at_world: worldTime,
      text: summaryText || "", // No placeholders
      provenance: provenance
    };

    await client.query(
      `INSERT INTO scene_anchors
       (scene_anchor_id, request_id, created_at_world, anchor_text, provenance)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        anchorPack.scene_anchor_id,
        anchorPack.request_id,
        anchorPack.created_at_world,
        anchorPack.text,
        JSON.stringify(anchorPack.provenance)
      ]
    );

    return anchorPack;
  }
};

module.exports = Engine5;
```

### SQL Strings Used:
- `SELECT * FROM scene_anchors ORDER BY created_at_world DESC LIMIT 1`
- `SELECT e.* FROM entries e JOIN bundles b ON e.bundle_id = b.bundle_id WHERE e.created_at_world > $1 AND b.wrote = true ORDER BY e.created_at_world ASC, e.sequence_id ASC`
- `INSERT INTO rehydration_events (rehydration_id, request_id, created_at_world, rehydration_text, physical_continuity_replay, provenance, trigger_info) VALUES ($1, $2, $3, $4, $5, $6, $7)`
- `INSERT INTO scene_anchors (scene_anchor_id, request_id, created_at_world, anchor_text, provenance) VALUES ($1, $2, $3, $4, $5)`

---

## utils/character_payload_loader.js

**SHA-256:** `b188a5fc8702ef23ad7ade9fb3fd50a151e28649fe56a639a51608b8f782edf8`  
**Lines:** 75

### Full Contents:
```javascript
const fs = require('fs');
const path = require('path');

const CHARACTERS_ROOT = path.join(__dirname, '../characters');
const ARCHETYPES_ROOT = path.join(CHARACTERS_ROOT, 'archetypes');

/**
 * Loads character payload files for a given agent ID.
 * Returns a dictionary of filename -> content.
 * Returns null if no payloads found or directory missing.
 * 
 * GUARANTEES:
 * - Read-only access.
 * - No side effects.
 * - Graceful failure (removability).
 */
function loadCharacterPayload(agentId) {
    if (!agentId) return null;
    
    // Normalize and sanitize
    const safeId = agentId.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const charDir = path.join(CHARACTERS_ROOT, safeId);

    if (!fs.existsSync(charDir)) {
        return null;
    }

    const payloads = {};
    try {
        // DETERMINISTIC ORDERING: Sort files alphabetically
        const files = fs.readdirSync(charDir).sort();
        
        for (const file of files) {
            // RESTRICTION: Only load .md files. JSON is reserved for archetypes.
            if (file.endsWith('.md')) {
                const filePath = path.join(charDir, file);
                // Ensure it is a file, not a directory
                if (fs.statSync(filePath).isFile()) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    payloads[file] = content;
                }
            }
        }
    } catch (err) {
        // Log but do not crash. This ensures removability.
        console.warn(`[CHARACTER_LOADER] Could not load payloads for ${safeId}:`, err.message);
        return null;
    }

    if (Object.keys(payloads).length === 0) {
        return null;
    }

    return payloads;
}

/**
 * Loads a specific archetype definition.
 * Archetypes are semantic substrates, not agents.
 */
function loadArchetype(archetypeName) {
    if (!archetypeName) return null;

    const safeName = archetypeName.toUpperCase().replace(/[^A-Z0-9_]/g, '');
    const filePath = path.join(ARCHETYPES_ROOT, `${safeName}.json`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.warn(`[CHARACTER_LOADER] Could not load archetype ${safeName}:`, err.message);
        return null;
    }
}

module.exports = {
    loadCharacterPayload,
    loadArchetype
};
```

### Function Definitions:
1. `loadCharacterPayload(agentId)` — Loads .md files from /characters/{agentId}/
2. `loadArchetype(archetypeName)` — Loads .json file from /characters/archetypes/

---

END OF FILE
