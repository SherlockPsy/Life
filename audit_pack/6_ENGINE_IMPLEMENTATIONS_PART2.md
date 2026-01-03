# ENGINE IMPLEMENTATIONS PART 2 — ENGINES 6-14

## ENGINE_6_CAPSULE_ENGINE/core.js

**SHA-256:** `345561a7ddd08fb2546cb16d52f7084a7f33c54161cb1aa418bd0d701cc77425`  
**Lines:** 27

### Full Contents:
```javascript
module.exports = {
  /**
   * Execute a capsule retrieval.
   * @param {Object} client - Postgres client
   * @param {Object} toolRequest - The tool request object
   * @returns {Promise<Object>} - Capsule Pack
   */
  async executeCapsule(client, toolRequest) {
    // Minimal implementation: Return a stub capsule
    // In a real system, this would query the DB for capsule data or rebuild it.
    
    const personId = toolRequest.tool.constraints?.person_id || "unknown";

    return {
      capsule_id: `cap_${Date.now()}`,
      person_id: personId,
      created_at_world: "1000", // Stub
      sections: [
        {
          name: "SOURCE_EXCERPTS",
          text: "No history available yet.",
          provenance: { used_entry_ids: [] }
        }
      ]
    };
  }
};
```

### SQL Strings Used:
- None (stub implementation)

---

## ENGINE_7_TOOL_REQUEST_ENGINE/core.js

**SHA-256:** `19d354f49300de882634d2751891a1267dedd0f9dfc44fb11f980630534cc66b`  
**Lines:** 29

### Full Contents:
```javascript
module.exports = {
  /**
   * Validate a tool request against the contract.
   * @param {Object} toolRequest - The tool request object
   * @returns {Object} - { valid: boolean, error: string|null }
   */
  validateToolRequest(toolRequest) {
    if (!toolRequest) return { valid: false, error: "No tool request provided" };
    
    // Contract: tool_request_id MUST be unique (checked by caller usually, but we check presence)
    if (!toolRequest.tool_request_id) return { valid: false, error: "Missing tool_request_id" };
    
    // Contract: request_id MUST match (checked by caller)
    
    // Contract: requested_by.actor MUST be explicit
    if (!toolRequest.requested_by || !toolRequest.requested_by.actor) {
      return { valid: false, error: "Missing requested_by.actor" };
    }

    // Contract: tool.name MUST be valid
    const validTools = ["LEDGER_SEARCH", "LEDGER_GET", "CAPSULE_GET", "SCENE_PACK_BUILD"];
    if (!toolRequest.tool || !validTools.includes(toolRequest.tool.name)) {
      return { valid: false, error: `Invalid tool name: ${toolRequest.tool?.name}` };
    }

    return { valid: true, error: null };
  }
};
```

### SQL Strings Used:
- None (validation only)

---

## ENGINE_8_RETRIEVAL_ENGINE/core.js

**SHA-256:** `fbed0942583b391a8aab5d983989aee3b93bf56faf2a45acda42b5061c65b5b7`  
**Lines:** 38

### Full Contents:
```javascript
module.exports = {
  /**
   * Execute a retrieval tool request.
   * @param {Object} client - Postgres client
   * @param {Object} toolRequest - The tool request object
   * @returns {Promise<Object>} - Retrieval Result Pack
   */
  async executeRetrieval(client, toolRequest) {
    const tool = toolRequest.tool;
    const results = [];

    if (tool.name === 'LEDGER_SEARCH') {
      // Minimal implementation: Search entries text
      const query = tool.query_text || "";
      // Safety: Use parameterized query
      const res = await client.query(
        "SELECT * FROM entries WHERE text ILIKE $1 LIMIT 5",
        [`%${query}%`]
      );
      
      for (const row of res.rows) {
        results.push({
          entry_id: row.entry_id,
          bundle_id: row.bundle_id,
          created_at_world: row.created_at_world.toString(),
          visibility_scope: row.visibility.scope || "PUBLIC",
          verbatim_excerpt: row.text // Full text as excerpt for now
        });
      }
    }

    return {
      tool_request_id: toolRequest.tool_request_id,
      request_id: toolRequest.request_id,
      results: results,
      empty: results.length === 0,
      notes: "Minimal retrieval implementation"
    };
  }
};
```

### SQL Strings Used:
- `SELECT * FROM entries WHERE text ILIKE $1 LIMIT 5`

---

## ENGINE_9_LLM_WRITER_ENGINE/core.js

**SHA-256:** `727c5d90a60f14750e495c4f77f9406a94c165ae57bc4c0a0632d5d8c9c67f3d`  
**Lines:** 119

### Full Contents:
```javascript
const { v4: uuidv4 } = require('uuid');
const PROMPT_PACK = require('./prompt_pack.json');
const { loadCharacterPayload } = require('../../utils/character_payload_loader');

// Configuration
const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.VENICE_API_KEY;
const BASE_URL = process.env.DEEPSEEK_BASE_URL || process.env.VENICE_BASE_URL || 'https://api.deepseek.com/v1';
const MODEL = process.env.DEEPSEEK_MODEL || process.env.VENICE_MODEL || 'deepseek-chat';

async function generateProposal(context) {
  if (!API_KEY) {
    console.error("ENGINE 9: No API Key found. Failing.");
    return null;
  }

  let systemPrompt = PROMPT_PACK.SYSTEM_PROMPT;

  // PHASE 9 FIX: ALWAYS-ON SCENE ANCHOR INJECTION
  const anchorText = context.scene?.anchor_text || "[SCENE ANCHOR: EMPTY — NO PRIOR ENTRIES]";
  systemPrompt += "\n\n=== SCENE ANCHOR (READ-ONLY) ===\n";
  systemPrompt += anchorText + "\n";
  systemPrompt += "=== END SCENE ANCHOR ===\n";

  // PHASE 9: Character Payload Injection
  const invokerId = context.envelope?.invoker?.invoker_id;
  if (invokerId) {
    const payloads = loadCharacterPayload(invokerId);
    if (payloads) {
      systemPrompt += "\n\n=== CHARACTER PAYLOADS ===\n";
      
      for (const [filename, content] of Object.entries(payloads)) {
        systemPrompt += `\n--- FILE: ${filename} ---\n${content}\n`;
      }
      systemPrompt += "\n=== END CHARACTER PAYLOADS ===\n";
    }
  }

  const userContext = JSON.stringify(context, null, 2);

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContext }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ENGINE 9: API Error: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return parseAndValidateOutput(content, context.requestId);

  } catch (error) {
    console.error("ENGINE 9: Execution Error:", error);
    return null;
  }
}

function parseAndValidateOutput(rawOutput, requestId) {
  let cleanOutput = rawOutput.trim();
  // Strip markdown code blocks if present
  if (cleanOutput.startsWith('```json')) {
    cleanOutput = cleanOutput.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleanOutput.startsWith('```')) {
    cleanOutput = cleanOutput.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  try {
    const parsed = JSON.parse(cleanOutput);

    // Validate EXACTLY ONE key
    const keys = Object.keys(parsed);
    if (keys.length !== 1) {
      console.error("ENGINE 9: Invalid output keys:", keys);
      return null;
    }

    const type = keys[0];
    const payload = parsed[type];

    if (type === 'tool_request') {
      if (!payload.tool_request_id || !payload.tool) {
        return null;
      }
      payload.request_id = requestId; 
      return { type: 'tool_request', payload };
    }

    if (type === 'proposed_write_bundle') {
      if (payload.wrote === undefined) {
        return null;
      }
      payload.request_id = requestId;
      return { type: 'proposed_write_bundle', payload };
    }

    if (type === 'no_write') {
      return { type: 'no_write', payload };
    }

    console.error("ENGINE 9: Unknown output type:", type);
    return null;

  } catch (e) {
    console.error("ENGINE 9: JSON Parse Error:", e);
    console.error("Raw Output:", rawOutput);
    return null;
  }
}

module.exports = {
  generateProposal
};
```

### Function Definitions:
1. `generateProposal(context)` — Main LLM invocation with prompt construction
2. `parseAndValidateOutput(rawOutput, requestId)` — Parse and validate LLM response

### External Dependencies:
- DeepSeek or Venice API via environment variables
- `loadCharacterPayload` from utils/character_payload_loader.js
- prompt_pack.json for SYSTEM_PROMPT

---

## ENGINE_9_LLM_WRITER_ENGINE/prompt_pack.json

**SHA-256:** (compute separately)  
**Lines:** ~90

### Full Contents:
```json
{
  "SYSTEM_PROMPT": "You are ENGINE 9, the Proposal Engine for the Life System.\nYou are a stateless, blind intelligence.\nYou do not own reality. You do not own time.\nYou exist ONLY to propose changes to the ledger.\n\nYOUR GOAL:\nObserve the provided context (Beat, History, Anchors) and propose the next logical step.\nThis step MUST be one of:\n1. A \"tool_request\" to gather more information (if you lack context).\n2. A \"proposed_write_bundle\" to add content (dialogue, action) to the story.\n3. A \"no_write\" signal if no action is required.\n\nABSOLUTE CONSTRAINTS:\n- You MUST emit EXACTLY ONE valid JSON object.\n- You MUST NOT emit markdown, explanations, or conversational text.\n- You MUST NOT hallucinate facts not in evidence.\n- You MUST NOT assume the passage of time beyond what is given.\n- You MUST NOT write directly to the database.\n\nOUTPUT FORMATS (CHOOSE EXACTLY ONE):\n\nOPTION 1: TOOL REQUEST...\nOPTION 2: WRITE BUNDLE...\nOPTION 3: NO WRITE...\n\nCONTEXT PROVIDED:\n"
}
```

---

## ENGINE_10_WRITE_ACCEPTANCE_AND_INTEGRITY_ENGINE/core.js

**SHA-256:** `b33927ec079dadf3c3b9f3303c439a15452bf4a3776d76ba19a191b0edcb2806`  
**Lines:** 67

### Full Contents:
```javascript
function validateWriteBundle(bundle, context) {
  // 1. Structural Integrity
  if (!bundle) return reject(bundle, "Bundle is null");
  if (bundle.wrote === undefined) return reject(bundle, "Missing 'wrote' field");
  if (!Array.isArray(bundle.entries)) return reject(bundle, "Entries must be an array");

  // 2. Wrote/Entries Consistency
  if (bundle.wrote === true && bundle.entries.length === 0) {
    return reject(bundle, "wrote=true but entries is empty");
  }
  if (bundle.wrote === false && bundle.entries.length > 0) {
    return reject(bundle, "wrote=false but entries is not empty");
  }

  // 3. Request ID Match
  if (bundle.request_id !== context.requestId) {
    return reject(bundle, "Request ID mismatch");
  }

  // 3.5 Proposed By Validation
  if (!bundle.proposed_by || typeof bundle.proposed_by !== 'object') {
    return reject(bundle, "Missing or invalid 'proposed_by'");
  }
  if (!bundle.proposed_by.engine || !bundle.proposed_by.actor) {
    return reject(bundle, "Incomplete 'proposed_by' (needs engine, actor)");
  }

  // 4. Entry Validation (if wrote=true)
  if (bundle.wrote) {
    for (const entry of bundle.entries) {
      if (!entry.entry_id) return reject(bundle, "Missing entry_id");
      if (!entry.source) return reject(bundle, "Missing source");
      if (!entry.target) return reject(bundle, "Missing target");
      if (!entry.content) return reject(bundle, "Missing content");
      
      // Visibility Validation
      if (entry.visibility && typeof entry.visibility !== 'object') {
        return reject(bundle, "Visibility must be an object");
      }
    }
  }

  // If valid, return ACCEPTED
  return { status: 'ACCEPTED', payload: bundle };
}

function reject(bundle, reason) {
  const safeBundle = bundle || { request_id: 'unknown', entries: [] };
  
  return {
    status: 'REJECTED',
    payload: {
      ...safeBundle,
      wrote: false,
      rejection: {
        rejected: true,
        reason: reason
      }
    }
  };
}

module.exports = {
  validateWriteBundle
};
```

### Function Definitions:
1. `validateWriteBundle(bundle, context)` — Validate write bundle structure and content
2. `reject(bundle, reason)` — Helper to construct rejection response

### SQL Strings Used:
- None (pure validation)

---

## Engines 11-14

Engines 11-14 have interface.md files only (no core.js implementations):
- **ENGINE_11_INFRASTRUCTURE_ENGINE**: Infrastructure layer (logic in pg Pool usage)
- **ENGINE_12_PROJECTION_AND_UI_ADAPTER_ENGINE**: Logic in constructProjection() in server.js
- **ENGINE_13_SYSTEM_POSTURE_ENFORCEMENT_ENGINE**: Non-runtime, development-time only
- **ENGINE_14_CONTRACT_AND_PROHIBITION_TEST_ENGINE**: Non-runtime, test suite only

See 4_ENGINE_INTERFACES.md for their complete interface definitions.

---

END OF FILE
