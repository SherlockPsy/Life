import Fastify from "fastify";
import { v4 as uuidv4 } from "uuid";
import {
  insertBlock,
  getBlocksByIds,
  getRecentBlocks,
  getRequestLog,
  insertRequestLog,
  getScenePackage,
  updateScenePackage
} from "./db.js";
import { ensureCollection, upsertPoint, searchSimilar } from "./qdrant.js";
import { generateEmbedding } from "./embeddings.js";
import { runCognition } from "./cognition.js";
import { renderText, setRendererConstraints } from "./renderer.js";
import { loadConstraints } from "./constraints.js";

const app = Fastify({ logger: true });

let CONSTRAINTS = "";

// Build system prompt for DeepSeek cognition
function buildSystemPrompt(scenePackage, retrievedBlocks, constraints) {
  const blockContext = retrievedBlocks
    .map((b) => `[${b.ts}] ${b.source}: ${b.text} (${b.visibility})`)
    .join("\n");

  const parts = [];
  
  // Base control rules from constraints (identity comes from retrieval/scene)
  if (constraints) {
    parts.push(constraints);
  }
  
  // Scene context
  if (scenePackage) {
    parts.push(`SCENE:\n${scenePackage}`);
  }
  
  // Retrieved memory
  if (blockContext) {
    parts.push(`MEMORY:\n${blockContext}`);
  }
  
  // JSON output format
  parts.push(`OUTPUT FORMAT (strict JSON):
{
  "outward_text": "string",
  "blocks_to_write": [{ "source": "REBECCA|SYSTEM|OTHER", "text": "...", "visibility": "public|private" }],
  "scene_update": "string|null",
  "wrote": true|false
}`);
  
  return parts.join("\n\n");
}

// Retrieve context: Qdrant semantic + recent blocks
async function retrieveContext(queryText) {
  try {
    const queryEmbedding = await generateEmbedding(queryText);
    const qdrantResults = await searchSimilar(queryEmbedding, 12);
    const semanticIds = qdrantResults.map((r) => r.id);

    const [semanticBlocks, recentBlocks] = await Promise.all([
      getBlocksByIds(semanticIds),
      getRecentBlocks(8),
    ]);

    // Merge and dedupe by id
    const seen = new Set();
    const merged = [];

    for (const block of [...semanticBlocks, ...recentBlocks]) {
      if (!seen.has(block.id)) {
        seen.add(block.id);
        merged.push(block);
      }
    }

    return merged;
  } catch (error) {
    console.error("Context retrieval error:", error.message);
    // Fallback to just recent blocks
    return getRecentBlocks(8);
  }
}

// Write blocks to Postgres and Qdrant
async function writeBlocks(blocks, requestId) {
  for (const block of blocks) {
    const id = uuidv4();

    // Write to Postgres
    await insertBlock({
      id,
      source: block.source,
      text: block.text,
      visibility: block.visibility,
      request_id: requestId,
    });

    // Generate embedding and upsert to Qdrant
    try {
      const embedding = await generateEmbedding(block.text);
      await upsertPoint(id, embedding, {
        source: block.source,
        visibility: block.visibility,
        ts: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Qdrant upsert error:", error.message);
    }
  }
}

// Health check
app.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// POST /say - Handle user input
app.post("/say", async (request, reply) => {
  try {
    const { text, request_id } = request.body || {};
    const requestId = request_id || uuidv4();

    // Idempotency check
    const existingResponse = await getRequestLog(requestId);
    if (existingResponse) {
      return existingResponse;
    }

    // Retrieve context using user text
    const retrievedBlocks = await retrieveContext(text);
    const scenePackage = await getScenePackage();

    // Run cognition
    const systemPrompt = buildSystemPrompt(
      scenePackage,
      retrievedBlocks,
      CONSTRAINTS
    );
    const userPrompt = `User says: ${text}`;

    const cognitionResult = await runCognition(systemPrompt, userPrompt);

    // Write blocks if any
    if (
      cognitionResult.blocks_to_write &&
      cognitionResult.blocks_to_write.length > 0
    ) {
      await writeBlocks(cognitionResult.blocks_to_write, requestId);
    }

    // Update scene if changed
    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    // Render output
    const renderedText = await renderText(cognitionResult.outward_text);

    // Build response
    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      text: renderedText,
      scene_refreshed: sceneRefreshed,
    };

    // Log for idempotency
    await insertRequestLog(requestId, response);

    return response;
  } catch (error) {
    console.error("/say error:", error);
    reply.code(500);
    return { error: error.message };
  }
});

// POST /beat - Autonomous tick
app.post("/beat", async (request, reply) => {
  try {
    const { request_id } = request.body || {};
    const requestId = request_id || uuidv4();

    // Idempotency check
    const existingResponse = await getRequestLog(requestId);
    if (existingResponse) {
      return existingResponse;
    }

    // Get current scene
    const scenePackage = await getScenePackage();

    // Retrieve context using "BEAT " + scene
    const queryText = `BEAT ${scenePackage || "idle state"}`;
    const retrievedBlocks = await retrieveContext(queryText);

    // Run cognition
    const systemPrompt = buildSystemPrompt(
      scenePackage,
      retrievedBlocks,
      CONSTRAINTS
    );
    const userPrompt = `Autonomous beat tick. Current scene: ${
      scenePackage || "none"
    }. Process any pending thoughts or observations.`;

    const cognitionResult = await runCognition(systemPrompt, userPrompt);

    // Write blocks if any
    if (
      cognitionResult.blocks_to_write &&
      cognitionResult.blocks_to_write.length > 0
    ) {
      await writeBlocks(cognitionResult.blocks_to_write, requestId);
    }

    // Update scene if changed
    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    // Render output
    const renderedText = await renderText(cognitionResult.outward_text);

    // Build response
    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      text: renderedText,
      scene_refreshed: sceneRefreshed,
    };

    // Log for idempotency
    await insertRequestLog(requestId, response);

    return response;
  } catch (error) {
    console.error("/beat error:", error);
    reply.code(500);
    return { error: error.message };
  }
});

// Startup
async function start() {
  try {
    // Load constraints
    CONSTRAINTS = loadConstraints();
    setRendererConstraints(CONSTRAINTS);

    // Ensure Qdrant collection exists
    await ensureCollection();

    const port = Number(process.env.PORT || 3000);
    const host = "0.0.0.0";

    await app.listen({ port, host });
    console.log(`Life server running on port ${port}`);
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

start();