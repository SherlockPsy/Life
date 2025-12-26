EXECUTION CANON — MILESTONE 13 — PRUNING WITHOUT COMPRESSION
Status: Binding / Non-negotiable

0. Purpose
Old text may be removed without summarising or distorting reality.

1. Pruning definition (binding)
Pruning is deletion of obsolete text.
Pruning is NOT summarisation.

2. Eligible pruning targets
2.1 Public blocks MAY be pruned if:
- They refer to completed, non-recurrent matters
- Their absence does not create contradictions

Example:
"Assignment deadline is Jan 5th" may be removed after submission.

2.2 Replacement rule
If a public block is pruned:
- A new public block MAY exist stating:
  "The assignment was submitted."

No automatic replacement is required.

3. Private pruning
3.1 Private entries MAY be pruned if:
- They refer exclusively to pruned public events
- They are no longer behaviourally relevant

4. Invocation
4.1 POST /admin/prune
- Body schema:
  - scope: "public" | "private" | "both"
  - request_id: string

5. Forbidden improvisations
- No summarisation text
- No embedding of removed meaning into surviving text