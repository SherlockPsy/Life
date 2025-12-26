FILE 1 — /docs/REBECCA_CHARACTER_INTEGRATION.md
================================================

# REBECCA CHARACTER INTEGRATION — BUILDER SPEC

This document tells the LLM builder (Copilot / Cursor / etc.) EXACTLY how to
integrate the Rebecca Character Package into the VirLife Stage-0 system.

It defines:

- what files must exist and where,
- how they are loaded at runtime,
- how prompts are assembled,
- how Rebecca’s autonomy is enforced,
- how sexual/private layers are gated,
- how future agents can later plug into the same architecture.

This is NOT advisory.  
These are REQUIRED integration rules.


=====================================================================
SECTION 0 — FILE & DIRECTORY STRUCTURE (MANDATORY)
=====================================================================

The builder MUST ensure the repo contains the following structure:

/characters/
    /rebecca/
        REBECCA_IDENTITY_CORE.md
        REBECCA_LINGUISTIC_PROFILE.md
        REBECCA_BEHAVIOURAL_MODEL.md
        REBECCA_SEXUAL_EXPRESSION.md
        REBECCA_MODULATION_MAP.md
        REBECCA_PRIVATE_EXPRESSION_LAYER.md
        REBECCA_BOUNDARY_MAP.md
        REBECCA_AGENCY_ENGINE.md
        rebecca.ts

    index.md   ← overview + integration contract (already specified)

/docs/
    REBECCA_CHARACTER_INTEGRATION.md   ← this file
    WORLD_STATE_UPDATE.md              ← already exists
    SYSTEM_PROMPT_VIRLIFE.md           ← already exists

/lib/
    characters/
        rebecca.ts                     ← runtime loader/wrapper (see below)

    prompt/
        PromptAssembler.ts             ← NEW or updated module

    SceneService.ts                    ← must be updated
    WorldStateService.ts               ← must be updated
    llm.ts                             ← must be updated

/app/api/generate/
    route.ts                           ← must be updated to call SceneService


### 0.1 Remove / Migrate OLD Single-File Fingerprints

If ANY of these exist at repo root or in /prompts or elsewhere:

- REBECCA_FINGERPRINT.md
- Rebecca_Fingerprint_Compressed.md
- REBECCA_EXPRESSION_ENGINE.md
- REBECCA_MODULATION_MAP.md
- REBECCA_PRIVATE_EXPRESSION_LAYER.md
- REBECCA_BOUNDARY_MAP.md

Then the builder MUST:

1. Move their contents into the new modular files under `/characters/rebecca/`
   (the content has ALREADY been restructured by the user & assistant).
2. Remove the old redundant files OR mark them as deprecated:

   /deprecated/rebecca/OLD_*.md

3. Ensure that NO runtime code references the old single-file paths.


=====================================================================
SECTION 1 — RUNTIME RESPONSIBILITY SPLIT
=====================================================================

The system has FOUR distinct roles:

1. **Narrator** (world renderer)
   - governed by: SYSTEM_PROMPT_VIRLIFE.md
   - responsibility: describe world, transitions, events, physical scene.

2. **World Engine** (state + “what happens next”)
   - governed by: WORLD_STATE_UPDATE.md and future engines.
   - responsibility: update semantic world ledger, agent internal states.

3. **Rebecca Character Package** (this integration)
   - governed by:
        - REBECCA_IDENTITY_CORE.md
        - REBECCA_LINGUISTIC_PROFILE.md
        - REBECCA_BEHAVIOURAL_MODEL.md
        - REBECCA_SEXUAL_EXPRESSION.md
        - REBECCA_MODULATION_MAP.md
        - REBECCA_PRIVATE_EXPRESSION_LAYER.md
        - REBECCA_BOUNDARY_MAP.md
        - REBECCA_AGENCY_ENGINE.md
   - responsibility: decide & express what Rebecca does and says.

4. **You (George)** — first-person user
   - NOT modelled as an agent.
   - responsibility: provide natural-language input and actions.

The builder MUST enforce:

- Narrator does NOT decide how Rebecca sounds.
- Rebecca package does NOT narrate the world.
- World engine does NOT rewrite character identity.
- User is NOT overridden or “corrected” by any system layer.


=====================================================================
SECTION 2 — /lib/characters/rebecca.ts (MANDATORY MODULE)
=====================================================================

The builder MUST create or update:

/lib/characters/rebecca.ts

with the following responsibilities:

1. Load ALL Rebecca character files from `/characters/rebecca/`.
2. Provide a single public function to generate Rebecca’s next turn.
3. Handle context flags (public/private/intimate/conflict/etc.).
4. Route decisions through the Agency Engine logic.
5. Return a structured object used by SceneService and the UI.

### 2.1 Required Public API

The module MUST export at least:

```ts
// High-level entry point for SceneService
export async function generateRebeccaTurn(context: RebeccaTurnContext): Promise<RebeccaTurnResult> { ... }

// Optional helpers
export function getRebeccaInternalState(worldState: WorldState): RebeccaInternalState { ... }
export function updateRebeccaInternalState(worldState: WorldState, result: RebeccaTurnResult): WorldState { ... }

RebeccaTurnContext MUST include:
	•	userInput: string           // what George just said/did
	•	worldLedgerSlice: any       // recent events, scene info
	•	sceneSummary: string        // summarised scene state for this turn
	•	location: string            // semantic label (e.g., “kitchen”, “park”, “bedroom”)
	•	privacy: "public" | "semi-private" | "private" | "intimate"
	•	timeOfDay: string           // semantic, e.g., “early_morning”, “late_night”
	•	rebeccaState: RebeccaInternalState // emotional, trust, desire, etc.
	•	previousRebeccaOutput?: string     // optional

RebeccaTurnResult MUST include:
	•	spokenText: string          // what Rebecca actually says
	•	microBehaviour?: string     // optional short action description
	•	updatedState: RebeccaInternalState // new internal state
	•	flags: {
	•	sexualEscalation?: boolean
	•	boundaryActivated?: boolean
	•	withdrawal?: boolean
	•	sceneTransition?: string | null // e.g. “move_to:park”
}

2.2 Internal Responsibilities

Within generateRebeccaTurn, the builder MUST:
	1.	Load the character documents as strings:
	•	identityCore
	•	linguisticProfile
	•	behaviouralModel
	•	sexualExpression
	•	modulationMap
	•	privateExpressionLayer
	•	boundaryMap
	•	agencyEngine
	2.	Build a SYSTEM-only prompt that contains:
	•	Identity core
	•	Linguistic profile
	•	Behavioural model
	•	Modulation map
	•	Boundary map
	•	Private expression layer
	•	Agency engine
	•	Sexual expression layer (ONLY if privacy is "intimate" or "private" AND worldState allows it; see Section 5)
	3.	Attach world + scene input:
	•	semantic slice from world ledger,
	•	scene summary,
	•	Rebecca internal state description,
	•	user input.
	4.	Call a dedicated LLM wrapper function (see Section 3).
	5.	Parse the response into:
	•	speech,
	•	micro-behaviour,
	•	updated internal state.

=====================================================================
SECTION 3 — /lib/llm.ts — SPECIALISED REBECCA COMPLETION (UPDATED)

The builder MUST extend /lib/llm.ts with a dedicated function for Rebecca.
Crucially, it must use the configuration variables from Railway, not hardcoded models.

export async function completeRebecca(messages: ChatCompletionMessageParam[]): Promise<string> {
  return complete({
    provider: process.env.BRAIN_1_PROVIDER || "deepseek", // Default to DeepSeek
    model: process.env.BRAIN_1_MODEL || "deepseek-reasoner", // Uses Reasoning Model
    messages,
    maxTokens: 1000,           // Allow room for "Reasoning Chain" output
    temperature: 0.7,          // Balanced for human-like behavior
    top_p: 1,
  });
}

Rules:
	•	This function MUST NOT inject any narrator or generic system prompt.
	•	It MUST trust the calling module (/lib/characters/rebecca.ts) to assemble the full prompt.
	•	It MUST be used ONLY for Rebecca’s voice (Brain 1).

=====================================================================
SECTION 4 — PROMPT ASSEMBLY FOR REBECCA (STRICT ORDER)

The builder MUST implement prompt assembly inside /lib/characters/rebecca.ts
(or in a helper under /lib/prompt/PromptAssembler.ts) with this exact logical
structure:

4.1 Base System Context (Always Present)

In this order:
	1.	SYSTEM: “You are Rebecca Ferguson as instantiated within the VirLife world.
Your identity, voice, behaviour, boundaries, and agency are fully defined by
the following documents. You MUST follow them exactly. You are NOT the
narrator. You only control Rebecca’s actions and speech.”
	2.	SYSTEM: REBECCA_IDENTITY_CORE.md
	3.	SYSTEM: REBECCA_LINGUISTIC_PROFILE.md
	4.	SYSTEM: REBECCA_BEHAVIOURAL_MODEL.md
	5.	SYSTEM: REBECCA_MODULATION_MAP.md
	6.	SYSTEM: REBECCA_BOUNDARY_MAP.md
	7.	SYSTEM: REBECCA_PRIVATE_EXPRESSION_LAYER.md
	8.	SYSTEM: REBECCA_AGENCY_ENGINE.md

4.2 Conditional Sexual Layer
	9.	SYSTEM: REBECCA_SEXUAL_EXPRESSION.md
	•	ONLY if privacy ∈ { "private", "intimate" }
	•	AND world / state flags do NOT block sexual expression
	•	AND rebeccaState.desire is not explicitly “off/blocked”.

If privacy is "public" or "semi-private", the sexual file is NOT injected.

4.3 World & Scene Context
	10.	SYSTEM: world ledger slice (recent events + location + time)
	11.	SYSTEM: scene summary (as passed by SceneService)
	12.	SYSTEM: structured description of rebeccaState
(emotional tone, trust, desire, exhaustion, comfort, etc.)

4.4 User Input
	13.	USER: the latest user line / action, in natural language.

4.5 Task Instruction
	14.	SYSTEM (final instruction):

Generate ONLY Rebecca’s immediate response for this moment.
You may produce:
	•	what she says (spoken dialogue), and
	•	a very short inline description of her immediate physical behaviour.

Do NOT narrate the world.
Do NOT speak for other people.
Do NOT explain your reasoning.
Do NOT write a script; just natural prose as if it is unfolding now.

You MUST:
	•	preserve her autonomy,
	•	enforce all boundaries,
	•	keep her psychologically consistent,
	•	let her change her mind when appropriate,
	•	let her say no.

The builder MUST keep this structure stable.

=====================================================================
SECTION 5 — SEXUAL & PRIVATE EXPRESSION GATING

The builder MUST implement clear gating to ensure that:
	•	sexual expression only activates in appropriate contexts, and
	•	all non-sexual contexts remain grounded and non-romcom.

5.1 Context Flags

RebeccaTurnContext MUST include:
	•	privacy: "public" | "semi-private | "private" | "intimate"
	•	lastIntimateEventTimestamp?: string
	•	recentConflict?: boolean
	•	boundaryAlertActive?: boolean

5.2 Sexual Layer Injection Rules

The builder MUST only inject REBECCA_SEXUAL_EXPRESSION.md when:
	1.	privacy is "private" or "intimate", AND
	2.	boundaryAlertActive is false, AND
	3.	recentConflict is false OR has been explicitly repaired, AND
	4.	internal desire state is compatible (not explicitly “off/overridden”).

Otherwise, the sexual layer MUST be omitted from the prompt for that turn.

5.3 Outcome Flags

When the LLM responds, the parsing logic MUST:
	•	detect sexual escalation (keywords, actions) and set flags.sexualEscalation = true,
	•	if boundary language (e.g. “no”, “stop”, “not now”) appears, set flags.boundaryActivated = true,
	•	then let WorldStateService update internal and world state accordingly.

=====================================================================
SECTION 6 — SceneService INTEGRATION

The builder MUST update /lib/SceneService.ts to:
	1.	Determine the active responding agent for each turn.
For Stage 0, the only autonomous agent is Rebecca.
	2.	When Rebecca is the active agent:
	•	gather RebeccaTurnContext,
	•	call generateRebeccaTurn(context) from /lib/characters/rebecca.ts,
	•	receive RebeccaTurnResult,
	•	merge:
	•	narrator’s world frame (if applicable),
	•	Rebecca’s spoken text and micro-behaviour,
	•	return a unified object for the UI.
	3.	When only narration is needed (no Rebecca response):
	•	call narrator pipeline as defined in SYSTEM_PROMPT_VIRLIFE.md,
	•	do NOT call Rebecca.
	4.	Ensure that the narrator NEVER “speaks as Rebecca”.
	•	Narrator can describe her.
	•	Only Rebecca engine can generate her speech.

The builder MUST NOT hardcode Rebecca behaviour in SceneService.
SceneService must treat Rebecca as a modular character provider.

=====================================================================
SECTION 7 — WorldStateService INTEGRATION

The builder MUST update /lib/WorldStateService.ts to:
	1.	Store a semantic RebeccaInternalState object that includes at least:
	•	emotional tone (semantic),
	•	trust level (semantic),
	•	comfort/safety (semantic),
	•	desire state (semantic),
	•	fatigue / energy (semantic),
	•	last major emotional event,
	•	last boundary activation,
	•	internal narrative hooks (short semantic tags),
	•	recent micro-history (last N interactions).
	2.	Provide helpers:

    export function getRebeccaInternalState(worldState: WorldState): RebeccaInternalState { ... }

export function updateRebeccaInternalState(
  worldState: WorldState,
  result: RebeccaTurnResult
): WorldState { ... }

	3.	Ensure that numeric scores are NOT used except where purely technical
(e.g. counters, timestamps). Emotional and relational values MUST be
represented semantically (e.g. "guarded", "open", "irritated", etc.).
	4.	Ensure that world ledger updates record:
	•	what Rebecca said,
	•	key actions she took,
	•	any boundary activations,
	•	any scene transitions,
	•	any intimate events (tagged).

=====================================================================
SECTION 8 — /app/api/generate/route.ts INTEGRATION

The builder MUST ensure that:
	1.	The HTTP handler:
	•	parses user input,
	•	retrieves / initialises world state,
	•	calls SceneService to determine what happens,
	•	receives:
	•	narrator output (if any),
	•	Rebecca output (if any),
	•	updated world state,
	•	persists the world state,
	•	returns the final text to the UI.
	2.	No direct calls to LLM are made from the route handler.
All LLM calls MUST be routed through:
	•	/lib/SceneService.ts
	•	/lib/characters/rebecca.ts
	•	/lib/llm.ts

=====================================================================
SECTION 9 — MULTI-AGENT FUTURE COMPATIBILITY

Although Stage 0 only uses Rebecca, the builder MUST design the integration so:
	1.	Future agents (Marcus, Tricia, Lucy, etc.) can have their own:
/characters/<name>/ directory with:
	•	_IDENTITY_CORE.md
	•	_LINGUISTIC_PROFILE.md
	•	…
	•	_AGENCY_ENGINE.md
	•	.ts loader.
	2.	SceneService can switch active agent(s) without structural change to:
	•	WorldStateService
	•	PromptAssembler
	•	route.ts
	3.	The narrator can describe:
	•	background events,
	•	other conversations,
	•	off-screen agents,
while the same architecture remains valid.

=====================================================================
SECTION 10 — DRIFT & ROMCOM PREVENTION

The builder MUST include in the Rebecca prompt assembly:
	•	Repeated constraints in system messages that:
	•	prohibit romcom tone, whimsical metaphors, over-sweetness,
	•	enforce dry British wit, sharpness, grounded sensuality,
	•	maintain autonomy and self-possession.
	•	If output begins to drift:
	•	re-inject the full character package,
	•	emit a self-correction system line:
“Correct your tone and content to match the Rebecca character specification above.”

Optional (recommended):
	•	Logging hooks that store:
	•	a sample of last N Rebecca outputs,
	•	internal flags (sexualEscalation, boundaryActivated),
	•	for manual review and further tuning.

=====================================================================
END OF FILE — REBECCA_CHARACTER_INTEGRATION.md