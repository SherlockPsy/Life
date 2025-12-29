import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { ok: true };
});

// Railway sets PORT automatically. Fallback for safety.
const port = Number(process.env.PORT || 3000);
const host = "0.0.0.0";

try {
  await app.listen({ port, host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}