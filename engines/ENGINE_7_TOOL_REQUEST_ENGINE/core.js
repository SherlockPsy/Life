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
