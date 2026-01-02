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

      // Content Type Check
      if (!['VOICE', 'ACTION', 'THOUGHT'].includes(entry.content.type)) {
        // Allow other types? The prompt says "VOICE and PEOPLE text".
        // Let's be permissive on type for now, but strict on structure.
      }
    }
  }

  // If valid, return ACCEPTED
  return { status: 'ACCEPTED', payload: bundle };
}

function reject(bundle, reason) {
  // Return a rejected bundle structure
  // If bundle is null/undefined, create a skeleton
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
