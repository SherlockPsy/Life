const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@turntable.proxy.rlwy.net:25006/railway';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT conname, pg_get_constraintdef(c.oid)
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE conrelid = 'bundles'::regclass
    `);
    console.log("Constraints on bundles:", res.rows);
  } catch (e) {
    console.error(e);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
