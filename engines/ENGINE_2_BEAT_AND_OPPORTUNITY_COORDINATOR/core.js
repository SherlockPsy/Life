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
