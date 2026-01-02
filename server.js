const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const Engine2 = require('./engines/ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/core');
const Engine3 = require('./engines/ENGINE_3_TIME_AND_CALENDAR_ENGINE/core');
const Engine5 = require('./engines/ENGINE_5_SCENE_ANCHOR_AND_REHYDRATION_ENGINE/core');
const Engine6 = require('./engines/ENGINE_6_CAPSULE_ENGINE/core');
const Engine7 = require('./engines/ENGINE_7_TOOL_REQUEST_ENGINE/core');
const Engine8 = require('./engines/ENGINE_8_RETRIEVAL_ENGINE/core');
const Engine9 = require('./engines/ENGINE_9_LLM_WRITER_ENGINE/core');
const Engine10 = require('./engines/ENGINE_10_WRITE_ACCEPTANCE_AND_INTEGRITY_ENGINE/core');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ENGINE 0: REALITY LEDGER & ENGINE 1: INVOCATION
app.post('/invocations', async (req, res) => {
  const envelope = req.body;
  const requestId = envelope.request_id;

  if (!requestId) {
    return res.status(400).json({ error: "Missing request_id" });
  }

  // CONTRACT ENFORCEMENT: Operator ID must be GEORGE
  if (envelope.operator?.operator_id !== 'GEORGE') {
    return res.status(400).json({ error: "Invalid operator_id", details: "Must be GEORGE" });
  }

  // CONTRACT ENFORCEMENT: Invoker ID cannot be GEORGE
  if (envelope.invoker?.invoker_id === 'GEORGE') {
    return res.status(400).json({ error: "Invalid invoker_id", details: "Cannot be GEORGE" });
  }

  const client = await pool.connect();

  let debugPayload = null;
  try {
    // 1. IDEMPOTENCY CHECK
    const existingInv = await client.query('SELECT * FROM invocations WHERE request_id = $1', [requestId]);
    
    if (existingInv.rows.length > 0) {
      // Replay: Fetch committed bundle and entries
      const bundleRes = await client.query('SELECT * FROM bundles WHERE request_id = $1', [requestId]);
      const bundle = bundleRes.rows[0];
      
      let entries = [];
      if (bundle && bundle.wrote) {
        const entriesRes = await client.query('SELECT * FROM entries WHERE bundle_id = $1 ORDER BY sequence_id ASC', [bundle.bundle_id]);
        entries = entriesRes.rows;
      }

      return res.json(constructProjection(requestId, bundle, entries));
    }

    // 2. NEW WRITE (ATOMIC TRANSACTION)
    await client.query('BEGIN');

    // A. Record Invocation
    await client.query('INSERT INTO invocations (request_id, envelope) VALUES ($1, $2)', [requestId, envelope]);

    // B. Resolve Time (Engine 3) - EXPLICIT ONLY
    let worldTime;
    const overrides = envelope.declared_overrides || {};
    
    const declaredTime = overrides.time?.declared_world_time;
    const advanceBy = overrides.time?.advance_by;
    let timeDeclared = false;

    if (declaredTime !== undefined && declaredTime !== null) {
      if (!Number.isInteger(declaredTime) || declaredTime < 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: "Invalid declared_world_time", details: "Must be a non-negative integer" });
      }
      worldTime = await Engine3.setTime(client, declaredTime);
      timeDeclared = true;
    } else if (advanceBy !== undefined && advanceBy !== null) {
      if (!Number.isInteger(advanceBy) || advanceBy < 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: "Invalid advance_by", details: "Must be a non-negative integer" });
      }
      worldTime = await Engine3.advanceTime(client, advanceBy);
      timeDeclared = true;
    } else {
      // No change, just read for the beat record
      worldTime = await Engine3.getWorldTime(client);
    }

    // C. Coordinate Beat (Engine 2)
    // We pass the resolved time, Engine 2 does NOT coordinate it.
    const beatContext = await Engine2.handleBeat(client, envelope, worldTime);

    // PHASE 7: Engine 5 Rehydration Check
    // Check if we need to rehydrate context at this beat boundary.
    await Engine5.handleBeatBoundary(client, requestId, worldTime);

    // D. Construct Write Bundle (Phase 4: Echo Operator Input)
    const bundleId = uuidv4();
    const entryId = uuidv4();
    
    // Use the authoritative world time from the beat context
    const inputText = envelope.operator?.input_text || "";
    
    const shouldWrite = inputText.length > 0; 

    const bundle = {
      bundle_id: shouldWrite ? bundleId : null,
      request_id: requestId,
      proposed_by: { engine: "ENGINE_1_INVOCATION", actor: "SYSTEM_INVOKER" },
      wrote: shouldWrite,
      rejection: { rejected: false, reason: null }
    };

    await client.query(
      'INSERT INTO bundles (request_id, bundle_id, proposed_by, wrote, rejection) VALUES ($1, $2, $3, $4, $5)',
      [bundle.request_id, bundle.bundle_id, bundle.proposed_by, bundle.wrote, bundle.rejection]
    );

    let entries = [];
    if (shouldWrite) {
      const entry = {
        entry_id: entryId,
        bundle_id: bundleId,
        request_id: requestId,
        created_at_world: worldTime,
        // CORRECTION: Do not infer author identity.
        author: null,
        visibility: { scope: "PUBLIC", visible_to: [] },
        channel: "USER",
        text: inputText
      };

      await client.query(
        'INSERT INTO entries (entry_id, bundle_id, request_id, created_at_world, author, visibility, channel, text) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [entry.entry_id, entry.bundle_id, entry.request_id, entry.created_at_world, entry.author, entry.visibility, entry.channel, entry.text]
      );
      entries.push(entry);
    }

    await client.query('COMMIT');

    // PHASE 8: ENGINE 9 (LLM WRITER)
    // 1. Construct Context
    const llmContext = {
      requestId: requestId,
      beat: beatContext,
      input: {
        text: inputText,
        channel: "USER"
      },
      // TODO: Add history/anchors when available
    };

    // 2. Generate Proposal
    const proposal = await Engine9.generateProposal(llmContext);
    let aiBundle = null;

    let extraDebug = {};

    if (proposal && proposal.type === 'proposed_write_bundle') {
      // 3. Validate (Engine 10)
      const validation = Engine10.validateWriteBundle(proposal.payload, llmContext);
      
      if (validation.status === 'ACCEPTED') {
        // 4. Commit AI Write
        const aiBundlePayload = validation.payload;
        debugPayload = aiBundlePayload;
        // Assign IDs if not present (Engine 9 might propose null IDs)
        if (!aiBundlePayload.bundle_id) aiBundlePayload.bundle_id = uuidv4();
        
        // Start new transaction
        await client.query('BEGIN');
        
        await client.query(
          'INSERT INTO bundles (request_id, bundle_id, proposed_by, wrote, rejection) VALUES ($1, $2, $3, $4, $5)',
          [
            aiBundlePayload.request_id, 
            aiBundlePayload.bundle_id, 
            JSON.stringify(aiBundlePayload.proposed_by || { engine: "UNKNOWN", actor: "UNKNOWN" }), 
            aiBundlePayload.wrote, 
            aiBundlePayload.rejection ? JSON.stringify(aiBundlePayload.rejection) : null
          ]
        );

        if (aiBundlePayload.wrote && aiBundlePayload.entries) {
          for (const entry of aiBundlePayload.entries) {
            if (!entry.entry_id) entry.entry_id = uuidv4();
            entry.bundle_id = aiBundlePayload.bundle_id;
            entry.request_id = requestId;
            entry.created_at_world = worldTime; // Use same time as beat
            
            // Map content to text/channel for legacy schema
            const text = entry.content.text || "";
            const channel = "PEOPLE"; 
            const authorObj = { author_id: entry.source.actor };

            await client.query(
              'INSERT INTO entries (entry_id, bundle_id, request_id, created_at_world, author, visibility, channel, text) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
              [
                entry.entry_id, 
                entry.bundle_id, 
                entry.request_id, 
                entry.created_at_world, 
                JSON.stringify(authorObj), 
                JSON.stringify(entry.visibility), 
                channel, 
                text
              ]
            );
            
            // Add to projection entries
            entries.push({
              entry_id: entry.entry_id,
              created_at_world: entry.created_at_world,
              channel: channel,
              author: { author_id: entry.source.actor }, // Keep object for projection
              text: text
            });
          }
        }
        
        await client.query('COMMIT');
        aiBundle = aiBundlePayload;
      } else {
        console.log("ENGINE 10: Rejected AI Bundle", validation);
      }
    } else if (proposal && proposal.type === 'tool_request') {
      // 3. Validate Tool (Engine 7)
      const validation = Engine7.validateToolRequest(proposal.payload);
      
      if (validation.valid) {
        // 4. Execute Tool (Engine 8 or 6)
        const toolRequest = proposal.payload;
        let toolResult = null;

        if (toolRequest.tool.name === 'LEDGER_SEARCH' || toolRequest.tool.name === 'LEDGER_GET') {
          toolResult = await Engine8.executeRetrieval(client, toolRequest);
        } else if (toolRequest.tool.name === 'CAPSULE_GET') {
          toolResult = await Engine6.executeCapsule(client, toolRequest);
        } else {
          toolResult = { error: "Tool execution not implemented for this tool type" };
        }

        extraDebug = { tool_execution: { tool: toolRequest.tool.name, status: "EXECUTED", result: toolResult } };
      } else {
        console.log("ENGINE 7: Rejected Tool Request", validation);
        extraDebug = { error: `Tool Request Rejected: ${validation.error}` };
      }
    } else {
      // Failure or No-Write
      console.log("ENGINE 9: No Action (Silence or Failure)");
    }

    // 3. RETURN PROJECTION
    // Only expose time if explicitly declared/modified
    res.json(constructProjection(requestId, bundle, entries, beatContext, timeDeclared, extraDebug));

  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    res.status(500).json({ error: "Internal Server Error", details: e.message });
  } finally {
    client.release();
  }
});

function constructProjection(requestId, bundle, entries, beatContext = null, timeDeclared = false, extraDebug = {}) {
  return {
    request_id: requestId,
    stream: {
      cursor_before: null,
      cursor_after: null,
      entries: entries.map(e => ({
        entry_id: e.entry_id,
        created_at_world: e.created_at_world,
        channel: e.channel,
        author_label: (e.channel === 'PEOPLE' && e.author) ? e.author.author_id : null,
        text: e.text
      }))
    },
    pocket: {
      is_available: false,
      clock: { 
        world_time: (beatContext && timeDeclared) ? beatContext.world_time : null, 
        timezone: null 
      },
      calendar: { items: [] },
      messages: { items: [] }
    },
    debug: {
      wrote: bundle ? bundle.wrote : false,
      bundle_id: bundle ? bundle.bundle_id : null,
      beat_id: beatContext ? beatContext.beat_id : null,
      ...extraDebug
    }
  };
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
