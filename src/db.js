import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL missing in environment');
}

const pool = new Pool({
  connectionString,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000
});

export async function pingDb() {
  await pool.query('SELECT 1');
}

export async function insertBlock(block) {
  const { id, source, text, visibility, request_id } = block;
  await pool.query(
    `INSERT INTO blocks (id, source, text, visibility, request_id) VALUES ($1, $2, $3, $4, $5)`,
    [id, source, text, visibility, request_id]
  );
}

export async function getBlocksByIds(ids) {
  if (!ids || ids.length === 0) return [];
  const result = await pool.query(
    `SELECT id, ts, source, text, visibility FROM blocks WHERE id = ANY($1)`,
    [ids]
  );
  return result.rows;
}

export async function getRecentBlocks(limit = 8) {
  const result = await pool.query(
    `SELECT id, ts, source, text, visibility FROM blocks ORDER BY ts DESC LIMIT $1`,
    [limit]
  );
  return result.rows;
}

export async function getRequestLog(requestId) {
  const result = await pool.query(
    `SELECT response FROM request_log WHERE request_id = $1`,
    [requestId]
  );
  return result.rows[0]?.response || null;
}

export async function insertRequestLog(requestId, response) {
  await pool.query(
    `INSERT INTO request_log (request_id, response) VALUES ($1, $2)`,
    [requestId, response]
  );
}

export async function getScenePackage() {
  const result = await pool.query(
    `SELECT scene_package FROM scene_cache WHERE id = 1`
  );
  return result.rows[0]?.scene_package || '';
}

export async function updateScenePackage(scenePackage) {
  await pool.query(
    `UPDATE scene_cache SET scene_package = $1, updated_at = now() WHERE id = 1`,
    [scenePackage]
  );
}

export { pool };
