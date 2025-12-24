SherlockPsy Life

Railway Deployment Checklist v1 (Authoritative)

This checklist defines everything required to deploy the Life system correctly on Railway using Postgres + Qdrant + Venice + DeepSeek, without violating the architecture.

If something is not listed here, it is not required for v1.

⸻

0. Preconditions (Do Not Skip)
	•	You have a Railway account.
	•	You have a GitHub repo with your app code (e.g. sherlockpsy/life).
	•	You have rotated API keys for:
	•	Venice AI
	•	DeepSeek
	•	You understand that:
	•	Postgres is the source of truth
	•	Qdrant is a search accelerator
	•	LLMs do not store state

⸻

1. Create Railway Project
	1.	Go to Railway Dashboard.
	2.	Click + New Project.
	3.	Name it something stable (e.g. life-production).

This project will contain all services.

⸻

2. Provision PostgreSQL (Authoritative Ledger)
	1.	Inside the project, click + New → Provision PostgreSQL.
	2.	Do nothing else.

Railway automatically creates and manages:
	•	DATABASE_URL
	•	PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE

These variables are automatically injectable into other services in the same project.

Postgres is used for:
	•	Public Evidence Blocks (append-only)
	•	Private Ledger Entries (append-only)
	•	Identity Constitutions (immutable)

⸻

3. Provision Qdrant (Vector Store)

Choose ONE option.

Option A: Qdrant Cloud (Recommended)
	1.	Go to https://cloud.qdrant.io
	2.	Create a cluster (free tier is fine).
	3.	Copy:
	•	Cluster URL (exactly as shown, including port if present)
	•	API Key (shown once)

Option B: Self-hosted Qdrant on Railway
	1.	In Railway project → + New → Docker Image
	2.	Image: qdrant/qdrant:latest
	3.	After creation:
	•	Go to Settings → Volumes
	•	Add a volume mounted to: /qdrant/storage
	•	(If you skip this, all vectors are lost on restart)
	4.	Go to Settings → Networking
	•	Generate a Private Domain
	•	Public domain is optional and discouraged

⸻

4. Deploy Your Application Service
	1.	In the same Railway project:
	•	Click + New → GitHub Repo
	2.	Select your repo (e.g. sherlockpsy/life)
	3.	Click Deploy

The first deploy may fail. That is expected.

⸻

5. Configure Environment Variables (Critical)

Open your App Service → Variables → Raw Editor

Paste and edit the following.

Core System

NODE_ENV=production
PORT=3000

# Railway injects this automatically if Postgres is in the same project
DATABASE_URL=${{Postgres.DATABASE_URL}}


⸻

Qdrant

If using Qdrant Cloud:

QDRANT_URL=https://<exact-cluster-url-from-qdrant>
QDRANT_API_KEY=<your-qdrant-cloud-api-key>

If using Railway-hosted Qdrant (private networking):

QDRANT_URL=http://${{Qdrant.RAILWAY_PRIVATE_DOMAIN}}:6333

(No API key required if kept private, but allowed if you enable one.)

⸻

Venice AI (Renderer)

VENICE_API_KEY=<your-venice-key>
VENICE_BASE_URL=https://api.venice.ai/api/v1
VENICE_MODEL_RENDERER=venice-uncensored

Venice is used only for in-world rendering (speech, action text).

⸻

DeepSeek (Logic / Seeds / Validation)

DEEPSEEK_API_KEY=<your-deepseek-key>
DEEPSEEK_BASE_URL=https://api.deepseek.com

DEEPSEEK_MODEL_CHAT=deepseek-chat
DEEPSEEK_MODEL_REASONER=deepseek-reasoner

	•	deepseek-reasoner is used for:
	•	world-level seed proposals
	•	legality validation
	•	deepseek-chat is used for:
	•	non-critical reasoning
	•	support tasks
	•	Do not assume function calling on the reasoner.

⸻

Optional Security

ADMIN_API_KEY=<random-long-secret>

Used to protect admin endpoints (seed injection, debugging).

⸻

Save variables. Railway will redeploy automatically.

⸻

6. Create Postgres Schema (Mandatory)

Your app must create these tables via migrations.

public_evidence_blocks
	•	id (bigint, auto-increment)
	•	source (text)
	•	context (text)
	•	location_token (text)
	•	surface_tokens (text[] nullable)
	•	evidence_text (text)
	•	created_at (timestamp, ops only)

Append-only. Never update or delete.

⸻

private_ledger_entries
	•	id (bigint)
	•	agent_id (text)
	•	location_token (text nullable)
	•	entry_text (text)
	•	created_at (timestamp)

Append-only. Never summarised.

⸻

identity_constitutions
	•	agent_id (text, primary key)
	•	identity_text (text, immutable)

⸻

7. Create Qdrant Collection (Mandatory)

Your app must create at least one collection on startup or via admin task.

You must decide:
	•	embedding model
	•	vector size (must match model output)
	•	distance metric (usually Cosine)

Example (illustrative):

{
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  }
}

Payload fields (minimum):
	•	block_id
	•	block_type (public | private)
	•	location_token
	•	surface_tokens
	•	agent_id (if applicable)

Payload is used for filtering, not truth.

⸻

8. Embeddings Pipeline (Required)

Your app must:
	1.	Generate embeddings for:
	•	Public Evidence Blocks
	•	Private Ledger Entries (optional but recommended)
	2.	Upsert them into Qdrant with payload.

Qdrant never decides reality.
Postgres remains authoritative.

⸻

9. Context Assembly Rule (NON-NEGOTIABLE)

Never give agents global awareness.

Implementation rule:
	•	Agents only see:
	•	Evidence from the same semantic location
	•	Evidence encountered through an explicit channel:
	•	public surface interaction
	•	communication
	•	direct mention
	•	World-Level Fact Seeds:
	•	exist globally
	•	are NOT auto-included in agent context
	•	appear only when discovered via a surface or interaction

If you violate this, you reintroduce telepathy.

⸻

10. Health Check & Verification
	1.	App logs must show:
	•	connected to Postgres
	•	connected to Qdrant
	2.	Generate a public domain for the App Service.
	3.	Hit /health or equivalent.
	4.	Confirm 200 OK.

⸻

11. What This System Does NOT Include (By Design)
	•	No background jobs
	•	No schedulers
	•	No cron
	•	No world loop
	•	No auto-escalation
	•	No narrative engine

Everything happens only when invoked.

⸻

End of Checklist