import Fastify from "fastify";
import pkg from "pg";
const { Pool } = pkg;

const app = Fastify({ logger: true });

// Database connection (Railway provides DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

app.get("/health", async () => {
  return { ok: true };
});

app.post("/ledger", async (request, reply) => {
  const { source, text } = request.body || {};

  if (!source || !text) {
    reply.code(400);
    return { error: "source and text required" };
  }

  await pool.query(
    "INSERT INTO blocks (source, text) VALUES ($1, $2)",
    [source, text]
  );

  return { written: true };
});

const port = Number(process.env.PORT || 3000);
const host = "0.0.0.0";

try {
  await app.listen({ port, host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}