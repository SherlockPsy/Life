# Roadmap for Rebecca Project

Milestone 0: Deployment Spine Exists
Exit conditions:
	•	One Railway service deploys automatically from main.
	•	curl GET /health returns 200 with a tiny JSON body.
	•	Service boots with env vars present (DB/Qdrant/model keys) without crashing.

Milestone 1: First Conversation With Rebecca
Exit conditions:
	•	curl POST /say with a message from you returns one small Rebecca beat (bounded output).
	•	The system writes your message and her beat to Postgres in order.
	•	curl GET /conversation/latest?n=10 returns the last N beats/messages in strict order.

Milestone 2: Rebecca Can Initiate
Exit conditions:
	•	curl POST /beat (no user message) can produce a Rebecca-initiated beat or “no beat written”.
	•	If a beat is produced, it is written to Postgres and returned verbatim.
	•	The beat is not framed as an “answer”; it’s just the next moment.

Milestone 3: Rebecca Does Not Wait For You
Exit conditions:
	•	curl POST /say does not guarantee a direct answer.
	•	Rebecca can plausibly ignore/deflect/redirect.
	•	The system can return “no beat written” even when you send a message.

Milestone 4: Continuity From Recent Reread
Exit conditions:
	•	Replies clearly reflect prior beats because the system rereads a bounded recent window from Postgres.
	•	No hidden continuity exists outside stored text.
	•	A repeated curl request produces consistent behaviour (no accidental duplication beyond whatever rule you explicitly adopt for duplicates).

Milestone 5: Identity Is Applied (Template-Referenced)
Exit conditions:
	•	Rebecca’s responses demonstrably reflect her archetype template(s).
	•	Identity is assembled by pointer/reference to stored template texts (plus optional per-person delta text if present), not hardcoded in code.
	•	You can update the referenced template or Rebecca’s pointer via direct DB change and see behaviour shift later.

Milestone 6: Selective Rereading (Older Recall)
Exit conditions:
	•	Qdrant stores embeddings for written blocks.
	•	When you mention an older topic, the system retrieves top-K relevant past blocks and Rebecca uses them in her reply.
	•	Retrieval is bounded (fixed K) and never mutates stored truth.

Milestone 7: World Fact Seeds Enter Life
Exit conditions:
	•	curl POST /world/seed appends a minimal Fact Seed as public evidence.
	•	Nothing else happens automatically after a seed.
	•	Rebecca can react only when that seed is included in her invocation context.

Milestone 8: Other People Enter (Without Telepathy)
Exit conditions:
	•	You can add another person (e.g. Marcus) by inserting identity pointers/templates via direct SQL.
	•	curl POST /say can target Marcus and yields a distinct voice.
	•	People only know what they encountered via written interaction (no global awareness).

Milestone 9: Growth and Learning Discipline (Add Later)
Exit conditions:
	•	On any beat-write, the system may also write 0–N private ledger lines for the involved agent(s).
	•	“Learning that matters later” can be written privately without appearing on screen.
	•	Dispositional statements can be recorded (quirks/preferences that persist) as private text, not as flags or counters.

Milestone 10: Reset-to-Day-0 Procedure
Exit conditions:
	•	You can wipe Postgres data with direct SQL and wipe Qdrant with curl.
	•	After wipe, the service boots and behaves identically.
	•	You can seed “final life” identities and baseline text and proceed cleanly.
