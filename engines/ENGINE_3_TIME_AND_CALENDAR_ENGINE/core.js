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
