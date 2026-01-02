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
