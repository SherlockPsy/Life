# Life

Semantic memory system with Qdrant vector search and Postgres as source of truth.

## Architecture

- **Postgres**: Append-only ledger (`blocks`), idempotency (`request_log`), scene state (`scene_cache`)
- **Qdrant**: Vector similarity search for semantic retrieval
- **DeepSeek**: Cognition model (strict JSON output)
- **Venice**: Text rendering

## Environment Variables

```
DATABASE_URL=postgresql://...    # required
QDRANT_URL=http://qdrant.railway.internal:6333
VENICE_API_KEY=...
VENICE_BASE_URL=https://api.venice.ai/api/v1
EMBEDDINGS_API_KEY=...          # defaults to VENICE_API_KEY
EMBEDDINGS_BASE_URL=...         # defaults to VENICE_BASE_URL
EMBEDDINGS_MODEL=text-embedding-bge-m3
EMBEDDINGS_DIM=1024
DEEPSEEK_API_KEY=sk-...
VENICE_MODEL=llama-3.3-70b
PORT=3000
```

## Curl Tests

### Health Check
```bash
curl https://life-production-1b7b.up.railway.app/health
# Response: {"status":"ok","timestamp":"..."}
```

### Say (User Input)
```bash
curl -X POST https://life-production-1b7b.up.railway.app/say \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, how are you?", "request_id": "test-123"}'
# Response: {"request_id":"test-123","wrote":true,"speaker":"REBECCA","text":"...","scene_refreshed":false}
```

### Beat (Autonomous Tick)
```bash
curl -X POST https://life-production-1b7b.up.railway.app/beat \
  -H "Content-Type: application/json" \
  -d '{"request_id": "beat-456"}'
# Response: {"request_id":"beat-456","wrote":false,"speaker":"","text":"","scene_refreshed":false}
```

### Idempotency Replay (same request_id returns cached response)
```bash
# First call
curl -X POST https://life-production-1b7b.up.railway.app/say \
  -H "Content-Type: application/json" \
  -d '{"text": "Remember this", "request_id": "idem-789"}'

# Replay (returns identical response, writes nothing new)
curl -X POST https://life-production-1b7b.up.railway.app/say \
  -H "Content-Type: application/json" \
  -d '{"text": "Remember this", "request_id": "idem-789"}'
```

## Constraints

Only `constraints/00_KERNEL.md` is loaded at startup. All other constraint files are ignored.