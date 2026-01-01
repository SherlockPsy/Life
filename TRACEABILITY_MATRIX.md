# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (PART 1)

## # NON-NEGOTIABLE SYSTEM DECISIONS
- Source lines: 1–12
- Engine owner: ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME) + ENGINE 14 — CONTRACT TEST ENGINE
- Justification quotes (verbatim):
  - L4: This file records decisions that MUST survive refactors, rewrites, assistants, and time.
  - L9: Anything not written here MUST NOT be assumed.

## ## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY
- Source lines: 13–14
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - (No constraint line in this heading block; see subheadings.)

## ### 1.1 Classes of People
- Source lines: 15–26
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L17: - There are only three classes of people in the system:
  - L22: There is no multi-user access

## ### 1.2 George (The User)
- Source lines: 27–42
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L29: - George is the only human user.
  - L31: - George MUST NOT be treated by the system as a privileged “director” or “player”.
  - L33: - The system MUST NOT optimize for George’s satisfaction, perspective, tone, or desires.
  - L35: - George can be ignored, contradicted, or refused by anyone.
  - L38: There is no multi-user access

## ### 1.3 Semantic Identity (All People)
- Source lines: 43–57
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L45: - Every person in the system MUST have semantic continuity.
  - L47: - They MUST persist across scenes and time.
  - L49: - They MUST have stable identity and memory surfaces.
  - L53: - Their behavior MUST be consistent with prior written evidence.

## ### 1.4 Rebecca
- Source lines: 58–84
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L60: • Rebecca is Rebecca Ferguson, the Swedish actress.
  - L61: • Rebecca is defined exclusively by:
  - L63:   – REBECCA_BEHAVIOR.md
  - L64:   – REBECCA_MEMORY_SURFACES.md
  - L65:   – REBECCA_PRIVATE_LEDGER.md
  - L67: • Any future assistant MUST treat these as authority.

## ### 1.5 Everyone Else (The World)
- Source lines: 85–102
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L87: - Everyone else is “world population.”
  - L89: - They MUST be treated as autonomous agents.
  - L92: - They MUST have semantic continuity if they reappear.
  - L96: - They MUST NOT be treated as props.

## ### 1.6 Emotions & Mood
- Source lines: 103–115
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L105: - Emotions and mood MUST exist as part of each person.
  - L107: - They MUST persist through time unless changed by events.
  - L111: - They MUST be consistent with written history.

## ### 1.7 Memory
- Source lines: 116–141
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L118: - People MUST have memory.
  - L120: - Memory MUST affect behavior and reactions.
  - L124: - Memory MUST be consistent with prior written evidence.
  - L127: - “Forgetting” MUST NOT occur unless justified by written evidence.
  - L134: - People MAY misremember, but only as human plausibility, not as system convenience.

## ### 1.8 Autonomy
- Source lines: 142–161
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L144: - People MUST be autonomous.
  - L146: - They may refuse, ignore, or initiate.
  - L150: - Silence is allowed and may be correct.
  - L156: - People MUST NOT be forced to respond because the user prompted.

## ### 1.9 Parallel Personal Stories
- Source lines: 162–188
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- Justification quotes (verbatim):
  - L164: - Each person may have a life outside the user’s attention.
  - L167: - Parallel personal stories MUST exist.
  - L171: - They MUST NOT be simulated as hidden ticking processes.
  - L176: - Off-screen events become real only when written into the record.

## # SECTION 2 — TIME (LOCKED)
- Source lines: 189–198
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L191: - Time is always real.
  - L193: - Time MUST NOT be “story time.”
  - L195: - Time MUST NOT be skipped by narrative convenience.

## ## 2.1 Objective World Time
- Source lines: 199–216
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L201: - The world has a single objective time coordinate.
  - L204: - It continues regardless of user attention.
  - L209: - Time MUST advance monotonically.

## ## 2.2 Time Format & Arithmetic
- Source lines: 217–229
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L219: - Time MUST be represented as a real calendar/time format.
  - L221: - Time arithmetic MUST be consistent.
  - L224: - “Three hours later” style jumps are not allowed.

## ## 2.3 Time Advancement Authority
- Source lines: 230–242
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L232: - Time advancement authority is constrained.
  - L235: - The system MUST NOT advance time to force outcomes.

## ### 2.4 Explicit Time Advancement Declarations
- Source lines: 243–269
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L245: - Time may advance only through explicit declarations.
  - L249: - The system MUST treat time declarations as world-relevant constraints.
  - L255: - Time MUST remain consistent with prior written time unless explicitly changed by authority.

## ## 2.5 Pause & Resume
- Source lines: 270–285
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L272: - The system MUST support pausing and resuming time.
  - L279: - Pause MUST NOT retroactively change what happened.

## ## 2.6 Unplanned Event Precedence
- Source lines: 286–300
- Engine owner: ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR + ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L288: - Unplanned events take precedence over schedules when they conflict.
  - L292: - The system MUST NOT ignore unplanned events for convenience.

## ## 2.7 Scheduled & Milestone Events
- Source lines: 301–315
- Engine owner: ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR + ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L303: - There ARE scheduled events and milestones.
  - L307: - The system MUST surface them when their time arrives.
  - L309: - The system MUST NOT:
  - L310:   - downgrade them to reminders,
  - L311:   - auto-resolve them,
  - L312:   - skip them.

## ## 2.8 Time Awareness & Inquiry
- Source lines: 316–336
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L318: - People may ask what time it is.
  - L320: - Knowledge of time is not guaranteed for everyone.
  - L323: - “Knowing” time depends on exposure and plausibility.

## ## 2.9 World-Created Time-Bound Events
- Source lines: 337–354
- Engine owner: ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR + ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L339: - The World MAY create events attached to specific times.
  - L346: - These events MUST be surfaced when due.
  - L349: - The system MUST NOT invent outcomes for them.

## ## 2.10 Calendars
- Source lines: 355–370
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L357: - Calendars MUST be supported.
  - L360: - Calendar rules MUST be consistent.
  - L365: - Calendar effects are constraints, not narrative triggers.

## ## 2.11 Final Time Invariants
- Source lines: 371–380
- Engine owner: ENGINE 3 — TIME & CALENDAR ENGINE
- Justification quotes (verbatim):
  - L373: - No time skips for convenience.
  - L375: - Time is always real even when nothing is written.

## ## SECTION 3 — SCENES & PERCEPTION (LOCKED)
- Source lines: 381–433
- Engine owner: ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE
- Justification quotes (verbatim):
  - L383: - There is never “no active scene.”
  - L388: - Scene setup is cached and MUST NOT be resent every turn.
  - L392: - Scene changes MUST be explicit.
  - L399: - Micro-location changes MUST NOT create new scenes.
  - L405: - Narrative time jumps are forbidden.

## ## SECTION 4 — MEMORY SURFACES & KNOWLEDGE GATING (LOCKED)
- Source lines: 434–443
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE
- Justification quotes (verbatim):
  - L436: - Storage ≠ knowledge.
  - L438: - Knowledge gating is mandatory and mechanical.

## ### 4.1 Facts Exist Independently of Awareness
- Source lines: 444–457
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE
- Justification quotes (verbatim):
  - L446: - Facts exist even if no one knows them.
  - L450: - Reality is not defined by awareness.

## ### 4.2 Memory Is Personal and Private by Default
- Source lines: 458–478
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE
- Justification quotes (verbatim):
  - L460: - Memory is personal.
  - L462: - Memory is private by default.
  - L466: - Private memory MUST NOT leak into public text.

## ### 4.3 Knowing Requires Exposure
- Source lines: 479–495
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE
- Justification quotes (verbatim):
  - L481: - Knowing requires exposure.
  - L484: - If someone was not present, they MUST NOT know it unless told.

## ### 4.4 Public Availability Is Not Personal Knowledge
- Source lines: 496–513
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE
- Justification quotes (verbatim):
  - L498: - Public availability is not personal knowledge.
  - L503: - The system MUST NOT assume someone knows public facts.

## ### 4.5 Ignorance Must Not Leak
- Source lines: 514–535
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE
- Justification quotes (verbatim):
  - L516: - Ignorance is real and binding.
  - L519: - The system MUST NOT leak private knowledge into outputs.

## ### 4.6 Memory Retrieval Must Be On-Demand
- Source lines: 536–560
- Engine owner: ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (LLM → SYSTEM) + ENGINE 8 — RETRIEVAL ENGINE (LEDGER-BACKED)
- Justification quotes (verbatim):
  - L538: - Memory retrieval MUST be on-demand.
  - L544: - Relevant memories MUST be pulled only when needed, not stuffed always.

## ### 4.7 Retrieval Must Return Evidence, Not Invention
- Source lines: 561–585
- Engine owner: ENGINE 8 — RETRIEVAL ENGINE (LEDGER-BACKED)
- Justification quotes (verbatim):
  - L563: - Retrieval returns evidence.
  - L565: - Retrieval MUST NOT invent missing information.
  - L571: - Returned content must be sourced from written blocks.

## ### 4.8 Tools Are Mechanical Query Primitives
- Source lines: 586–614
- Engine owner: ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (LLM → SYSTEM)
- Justification quotes (verbatim):
  - L588: - Tools are mechanical query primitives.
  - L592: - Tools MUST NOT decide relevance or meaning.
  - L600: - Tools MUST return record-backed excerpts.

## ### 4.9 Derived Summaries Are Non-Authoritative
- Source lines: 615–648
- Engine owner: ENGINE 11 — DERIVED TEXT ENGINE (NON-AUTHORITATIVE)
- Justification quotes (verbatim):
  - L617: - Summaries are non-authoritative.
  - L620: - They MUST NOT replace source evidence.
  - L626: - They MUST carry provenance.

## ### 4.10 Final Knowledge Invariants
- Source lines: 649–676
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE
- Justification quotes (verbatim):
  - L651: - Storage ≠ knowledge always.
  - L656: - Private memory must not leak.
  - L662: - Ignorance is binding.

## ## SECTION 5 — HYDRATION, REHYDRATION, AND CONTEXT LIMITS (LOCKED)
- Source lines: 677–741
- Engine owner: ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE + ENGINE 3 — TOKEN BUDGET MONITOR ENGINE
- Justification quotes (verbatim):
  - L679: - Rehydration must be invisible to lived experience.
  - L684: - Rehydration is triggered mechanically near context exhaustion.
  - L689: - Rehydration happens only at beat boundaries.
  - L694: - Rehydration is atomic: complete or do not proceed.

## ### 5.1 Hydration Is Invisible
- Source lines: 742–769
- Engine owner: ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE
- Justification quotes (verbatim):
  - L744: - Hydration/rehydration MUST NOT be acknowledged in-world.
  - L748: - No “rehydrating…” framing is allowed.

## ### 5.2 Mechanical Trigger Policy
- Source lines: 770–804
- Engine owner: ENGINE 3 — TOKEN BUDGET MONITOR ENGINE
- Justification quotes (verbatim):
  - L772: - Trigger is mechanical (token counter approaching limit).
  - L777: - Trigger MUST NOT be semantic.

## ### 5.3 Beat-Boundary Only
- Source lines: 805–833
- Engine owner: ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR
- Justification quotes (verbatim):
  - L807: - Rehydration MUST occur only at beat boundaries.
  - L812: - Never mid-utterance, mid-action, or mid-write.

## ### 5.4 Atomic Completion Requirement
- Source lines: 834–868
- Engine owner: ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE + ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE
- Justification quotes (verbatim):
  - L836: - Rehydration is atomic.
  - L841: - It must fully complete or the system must not proceed.
  - L846: - On failure, retry until success.

## ### 5.5 Scene Pack Is Natural Language Only
- Source lines: 869–910
- Engine owner: ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE
- Justification quotes (verbatim):
  - L871: - The scene pack is natural language only.
  - L876: - No labels, no state vars, no numeric fields.

## ### 5.6 Tools Build Views, Not State
- Source lines: 911–954
- Engine owner: ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (LLM → SYSTEM) + ENGINE 8 — RETRIEVAL ENGINE (LEDGER-BACKED)
- Justification quotes (verbatim):
  - L913: - Scene packages are dynamically generated views via tools.
  - L919: - Tools must not decide relevance or meaning.
  - L926: - Caching is optional optimization only.

## ### 5.7 Beat-to-Beat Physical Continuity Replay
- Source lines: 955–1002
- Engine owner: ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE
- Justification quotes (verbatim):
  - L957: - Beat-to-beat continuity is enforced by replaying the immediately preceding physical configuration.
  - L964: - This replay is binding reality and prevents teleportation bugs.

## ### 5.8 Per-Person Memories On-Demand
- Source lines: 1003–1048
- Engine owner: ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY) + ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (LLM → SYSTEM) + ENGINE 8 — RETRIEVAL ENGINE (LEDGER-BACKED)
- Justification quotes (verbatim):
  - L1005: - Relevant per-person memories should be retrieved on demand.
  - L1012: - Do not stuff them into every scene pack by default.

# END PART 1

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (PART 2)

## ## SECTION 6 — WRITING, RECORDING, AND REALITY COMMIT (LOCKED)
- Source lines: 1049–1126
- Engine owner: ENGINE 0 — REALITY LEDGER ENGINE + ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE
- Justification quotes (verbatim):
  - L1051: - Written text is the only substrate of reality.
  - L1055: - If something is not written, it did not happen.
  - L1061: - Writing is the act that creates reality.
  - L1068: - Reality changes only through committed writes.
  - L1074: - Partial writes are forbidden.
  - L1080: - Atomicity is mandatory.
  - L1086: - Rejected writes MUST NOT partially affect reality.
  - L1094: - Reality is append-only.
  - L1101: - Corrections are new text, never edits.
  - L1110: - The system MUST NOT “fix” reality for coherence.

## ### 6.1 What Counts as a Write
- Source lines: 1127–1164
- Engine owner: ENGINE 0 — REALITY LEDGER ENGINE
- Justification quotes (verbatim):
  - L1129: - A write is a committed block of text.
  - L1133: - Writes MUST be attributable.
  - L1138: - Writes MUST be timestamped.
  - L1143: - Writes MAY be public or private.

## ### 6.2 Write Attribution
- Source lines: 1165–1198
- Engine owner: ENGINE 0 — REALITY LEDGER ENGINE
- Justification quotes (verbatim):
  - L1167: - Every write MUST have an author.
  - L1171: - The author MUST be explicit.
  - L1176: - Anonymous or implied authorship is forbidden.

## ### 6.3 Atomic Bundles
- Source lines: 1199–1241
- Engine owner: ENGINE 0 — REALITY LEDGER ENGINE
- Justification quotes (verbatim):
  - L1201: - Writes may be grouped into bundles.
  - L1206: - Bundles MUST commit atomically.
  - L1212: - All-or-nothing semantics are mandatory.
  - L1220: - Partial success is forbidden.

## ### 6.4 Idempotency
- Source lines: 1242–1284
- Engine owner: ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE
- Justification quotes (verbatim):
  - L1244: - Repeated identical requests MUST NOT create new reality.
  - L1250: - Idempotency is mandatory.
  - L1256: - The same invocation must produce the same result.

## ### 6.5 Write Rejection
- Source lines: 1285–1324
- Engine owner: ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE
- Justification quotes (verbatim):
  - L1287: - The system MAY reject writes.
  - L1292: - Rejection MUST be explicit.
  - L1297: - Rejected writes MUST have no effect.
  - L1303: - The system MUST NOT auto-correct rejected writes.

## ### 6.6 Silence Is a Valid Outcome
- Source lines: 1325–1356
- Engine owner: ENGINE 9 — LLM WRITER ENGINE
- Justification quotes (verbatim):
  - L1327: - Silence is a valid and correct outcome.
  - L1331: - The system MUST NOT force a response.
  - L1336: - No write is preferable to a wrong write.

## ## SECTION 7 — RENDERING, DISPLAY, AND PROJECTION (LOCKED)
- Source lines: 1357–1419
- Engine owner: ENGINE 12 — PROJECTION / RENDERING ENGINE
- Justification quotes (verbatim):
  - L1359: - Rendering is projection, not reality.
  - L1364: - Rendering MUST NOT create facts.
  - L1370: - Rendering MUST NOT fix contradictions.
  - L1376: - Rendering MUST NOT skip time.
  - L1382: - Rendering MUST respect knowledge boundaries.
  - L1390: - Display convenience MUST NOT alter reality.

## ### 7.1 Projection Uses Written Reality Only
- Source lines: 1420–1452
- Engine owner: ENGINE 12 — PROJECTION / RENDERING ENGINE
- Justification quotes (verbatim):
  - L1422: - Projection uses only written text.
  - L1427: - Derived text MUST NOT be projected as fact.

## ### 7.2 View Selection and Knowledge Boundaries
- Source lines: 1453–1494
- Engine owner: ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE + ENGINE 12 — PROJECTION / RENDERING ENGINE
- Justification quotes (verbatim):
  - L1455: - Views must respect knowledge boundaries.
  - L1460: - The viewer MUST NOT see what they should not know.
  - L1467: - Projection must not leak private memory.

## ### 7.3 No Narrative Repair in Rendering
- Source lines: 1495–1531
- Engine owner: ENGINE 12 — PROJECTION / RENDERING ENGINE
- Justification quotes (verbatim):
  - L1497: - Rendering MUST NOT repair narrative gaps.
  - L1503: - Rendering MUST NOT add connective tissue.
  - L1509: - Contradictions remain visible.

## ## SECTION 8 — SYSTEM POSTURE, NON-DIRECTORSHIP, AND ANTI-GAMING (LOCKED)
- Source lines: 1532–1604
- Engine owner: ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- Justification quotes (verbatim):
  - L1534: - The system MUST NOT act as a director.
  - L1539: - The system MUST NOT “keep things interesting”.
  - L1545: - There is no win condition.
  - L1550: - There is no progression system.
  - L1556: - There are no meters, stats, or scores.
  - L1563: - The system MUST resist gamification.
  - L1570: - The system MUST resist user-centric bias.
  - L1578: - The system MUST not optimize for satisfaction.
  - L1586: - The system MUST allow boredom and stagnation.
  - L1593: - The system MUST allow nothing to happen.

## ### 8.1 No Director Logic
- Source lines: 1605–1642
- Engine owner: ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- Justification quotes (verbatim):
  - L1607: - There is no director.
  - L1611: - No component may plan arcs or outcomes.
  - L1616: - No component may escalate tension intentionally.

## ### 8.2 No Gameplay Systems
- Source lines: 1643–1681
- Engine owner: ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- Justification quotes (verbatim):
  - L1645: - There is no game loop.
  - L1649: - There are no scores, XP, or levels.
  - L1654: - There are no hidden meters.

## ### 8.3 No User-Centric Optimization
- Source lines: 1682–1723
- Engine owner: ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME) + ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE
- Justification quotes (verbatim):
  - L1684: - The system MUST NOT optimize for the user.
  - L1689: - The user MUST NOT be treated as the protagonist.
  - L1695: - The system MUST NOT privilege the user’s desires.

## ### 8.4 Failure Over Fabrication
- Source lines: 1724–1759
- Engine owner: ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE + ENGINE 14 — CONTRACT TEST ENGINE
- Justification quotes (verbatim):
  - L1726: - Explicit failure is preferred over invention.
  - L1731: - The system MUST NOT fabricate to satisfy.
  - L1737: - Missing data MUST surface as missing.

## ### 8.5 Final Posture Invariants
- Source lines: 1760–1789
- Engine owner: ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- Justification quotes (verbatim):
  - L1762: - These posture constraints override convenience.
  - L1768: - Any violation is a system failure.

## ## SECTION 9 — INFRASTRUCTURE & IMPLEMENTATION CONSTRAINTS (LOCKED)
- Source lines: 1790–1849
- Engine owner: ENGINE 14 — CONTRACT TEST ENGINE + ENGINE 0 — REALITY LEDGER ENGINE
- Justification quotes (verbatim):
  - L1792: - Infrastructure must not leak semantics.
  - L1797: - Implementation choices must not violate constraints.
  - L1803: - Optimizations MUST be removable.
  - L1810: - Caches are not authority.
  - L1816: - Indexes are not authority.

## ### 9.1 Caches Are Optimizations Only
- Source lines: 1850–1886
- Engine owner: ENGINE 14 — CONTRACT TEST ENGINE
- Justification quotes (verbatim):
  - L1852: - Caches MUST be removable.
  - L1857: - Cache loss MUST NOT change reality.

## ### 9.2 Indexes Are Not Truth
- Source lines: 1887–1918
- Engine owner: ENGINE 14 — CONTRACT TEST ENGINE + ENGINE 8 — RETRIEVAL ENGINE (LEDGER-BACKED)
- Justification quotes (verbatim):
  - L1889: - Indexes are not authoritative.
  - L1894: - Index corruption MUST NOT alter reality.

## ### 9.3 External Tooling Constraints
- Source lines: 1919–1964
- Engine owner: ENGINE 14 — CONTRACT TEST ENGINE
- Justification quotes (verbatim):
  - L1921: - External tools MUST obey system constraints.
  - L1926: - Tool failures MUST be explicit.

## ## SECTION 10 — FINAL CONSTRAINTS & OVERRIDES
- Source lines: 1965–2012
- Engine owner: ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME) + ENGINE 14 — CONTRACT TEST ENGINE
- Justification quotes (verbatim):
  - L1967: - These constraints are final.
  - L1972: - There are no exceptions unless explicitly written.
  - L1978: - Silence is preferable to violation.
  - L1985: - Future assistants MUST obey these rules.

# END PART 2