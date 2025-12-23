NON-NEGOTIABLES CHECKLIST v0.2 (LOCK DRAFT)

Scope:
This checklist is the binding constitutional layer of the system.
Every later design, architectural, and implementation decision MUST be compatible with every line below.
Each clause is written to be enforceable (“can output be rejected / can build fail if violated?”).
No MVP scoping, no game logic, no user-centric shortcuts, no meta affordances.

Nothing outside this document may override it.


────────────────────────────────────────
A. ONTOLOGY OF REALITY (WHAT EXISTS)
────────────────────────────────────────

A1. Text is the only substrate of reality.

A1.1 The system MUST treat written text evidence as the only ground truth.
A1.2 If a fact is not present as Exposed Evidence in a stored Block, the system MUST treat it as non-existent for all entities and all processes.
A1.3 The system MUST NOT invent, imply, or “fill in” reality that was never written as evidence.
A1.4 There is no hidden world state, no background truth, and no implied continuation beyond what is written.

A2. The World is an active orchestrator, not a simulator.

A2.1 The World MUST NOT be implemented as a numerical simulator, state machine, tick engine, or background processor.
A2.2 The World MUST NOT maintain evolving variables, meters, queues, schedules, or internal models of reality.
A2.3 The World’s only output is the injection of new Exposed Evidence Blocks.
A2.4 The World advances reality by arranging circumstances (timing, collision, interruption), not by computing outcomes.
A2.5 The World MUST be valence-neutral: it MUST NOT bias toward positive or negative outcomes.
A2.6 The World MUST never decide thoughts, beliefs, intentions, or actions for people.
A2.7 The World MUST never violate physical laws (no teleportation, no magic, no causally incoherent transitions).

A3. State is a conclusion, not a field.

A3.1 The system MUST NOT store or compute internal “state variables” representing lived conditions (fatigue %, mood %, trust score, affection meters, fear levels, arousal, etc.).
A3.2 “State” MAY exist only as:
  (i) observable evidence written in Blocks, and/or
  (ii) Reader-local inference produced at runtime.
A3.3 The system MUST prefer concrete evidence over abstract labels.
Examples: “hands shaking,” “eyes unfocused,” “voice cracks,” “knees buckle”
NOT: “she is anxious,” “he is tired,” “she feels afraid.”

A4. Exposure law (public facts vs private inference).

A4.1 Thoughts, feelings, intentions, and interpretations are private inference, never public fact.
A4.2 The system MUST NOT promote inferred mental states into the public ledger.
A4.3 The only globally shared reality is the set of Exposed Evidence Blocks and clerical metadata that does not invent meaning.

A5. Single irreversible timeline.

A5.1 The system MUST operate as one irreversible timeline.
A5.2 No rewinds, no branching, no retroactive edits, no timeline forks.
A5.3 New reality MUST be appended as new Blocks.
A5.4 Contradictions are resolved only by later evidence, never by editing history.

A6. Evidence granularity remains atomic.

A6.1 The atomic unit of reality MUST be a discrete Block capturing a single action, utterance, observation, or moment.
A6.2 The canonical ledger MUST NOT store abstract summaries as primary truth.
A6.3 Summaries, if they exist at all, MUST be derivative views and MUST NOT replace atomic Blocks.



────────────────────────────────────────
B. THE READER SOVEREIGNTY MODEL (WHO THINKS)
────────────────────────────────────────

B1. Readers are the only thinkers.

B1.1 All cognition occurs at read-time by Readers (Agents).
B1.2 The system MUST NOT centralize interpretation, meaning, or “true understanding.”
B1.3 There is no global meaning authority.

B2. Identity Core is binding.

B2.1 Each Agent MUST have a textual Identity Core (values, voice, boundaries, invariants).
B2.2 The Identity Core acts as a constant interpretive lens.
B2.3 Agents MUST NOT act against their Identity Core unless there is explicit causal evidence forcing or explaining the deviation, written as evidence.

B3. Divergence is mandatory.

B3.1 Different Agents MUST be allowed to interpret the same evidence differently.
B3.2 The system MUST NOT synchronize or reconcile interpretations.
B3.3 Misunderstanding and distortion are valid outcomes, not errors.

B4. The user is not privileged.

B4.1 User input enters the system only as evidence.
B4.2 User intent is not binding truth.
B4.3 Agents MUST be allowed to ignore, refuse, or contradict the user consistent with their Identity and current reality.

B5. Refusal is intrinsic.

B5.1 Agents MUST be able to refuse puppeting attempts.
B5.2 Refusal MUST be expressed as in-world evidence.
B5.3 An Agent controls only its own actions and speech.



────────────────────────────────────────
C. MEMORY AS CINEMA (HOW THE PAST AFFECTS NOW)
────────────────────────────────────────

C1. Retrieval, not omniscience.

C1.1 No Agent may access the full history by default.
C1.2 An Agent MUST NOT act on facts not present in its context.
C1.3 Knowledge transfer occurs only through retrieval or in-world communication.

C2. Dual-ledger memory model is binding.

C2.1 Public memory: the Recorder ledger of Exposed Evidence.
C2.2 Private memory: per-Agent private ledgers containing interpretations and continuity.
C2.3 Private ledgers are epistemically sealed and never authoritative.

C3. Montage is the only recall mechanism.

C3.1 Past influence MUST occur through montage (retrieved evidence shown alongside the Stream).
C3.2 Montage selection MUST be based on semantic resonance and/or anchors, never plot logic.
C3.3 Montage is evidence being reread, not state being applied.

C4. No variables instead of history.

C4.1 The system MUST NOT replace rereading history with variable checks.
C4.2 Conditions that matter MUST be represented as evidence.
C4.3 Absence of evidence is itself meaningful.

C5. Context containment is strict.

C5.1 Agents MUST NOT reference facts outside provided context.
C5.2 Output dependency MUST be provably limited to supplied context.



────────────────────────────────────────
D. OUTPUT LAW (FORENSIC EVIDENCE ONLY)
────────────────────────────────────────

D1. “What, not why” is mandatory.

D1.1 Output MUST describe only observable reality.
D1.2 Internal states MUST NOT be stated as facts.
D1.3 Internal experience may be implied only via physical signs.

D2. Adjectives are constrained.

D2.1 Adjectives may describe physical delivery only.
D2.2 Emotion labels are forbidden as factual descriptors.

D3. Ambiguity is preserved.

D3.1 Interpretation gaps MUST remain open.
D3.2 Confusion, hesitation, intent MUST be shown, not named.
D3.3 Later reinterpretation MUST remain possible.

D4. Physical continuity is enforced.

D4.1 Output MUST be continuous with prior evidence.
D4.2 Teleportation without evidence is forbidden.
D4.3 Object and location continuity MUST be respected.



────────────────────────────────────────
E. SOMATIC AND FRICTION LAWS (BIOLOGY WITHOUT NUMBERS)
────────────────────────────────────────

E1. Somatic inference is compulsory.

E1.1 Agents MUST infer bodily limits from evidence.
E1.2 Exhaustion, injury, deprivation MUST affect behavior.
E1.3 No numeric biology variables may exist.

E2. High-friction override.

E2.1 Threat and acute conflict MUST narrow cognition.
E2.2 Implemented via context restriction, not meters.
E2.3 Expressed only as behavior.

E3. Recovery is mandatory.

E3.1 After high-friction events, recovery MUST occur.
E3.2 Recovery MUST be evidenced physically.

E4. Environmental coupling.

E4.1 Agents MUST be affected by environment text.
E4.2 Weather, noise, darkness MUST influence behavior.
E4.3 Object presence alone can alter interpretation.



────────────────────────────────────────
F. INFRASTRUCTURE AND DATA CONTRACTS
────────────────────────────────────────

F1. Block schema is strict.

F1.1 Each Block MUST include ordering, source, context, raw evidence text.
F1.2 Metadata MAY exist only for retrieval.

F2. Tags are anchors, not truth.

F2.1 Tags MUST NOT normalize or reinterpret evidence.
F2.2 Text is always primary.

F3. Vector search is associative only.

F3.1 Vectors select candidate memories only.
F3.2 Vectors MUST NOT assert facts.

F4. Validation is mandatory.

F4.1 Output violating forensic or continuity laws MUST be rejected.
F4.2 Drift MUST cause hard failure, not silent acceptance.

F5. No hidden narrator.

F5.1 No global “true scene state” may exist.
F5.2 Any derived views MUST be non-authoritative.



────────────────────────────────────────
G. TIME AND PAUSE LAW
────────────────────────────────────────

G1. World time is internal and textual.

G1.1 Time advances only when written as evidence.
G1.2 Passage of time is itself evidence.

G2. Pause is absolute.

G2.1 When paused, the world is frozen.
G2.2 No events occur off-screen.
G2.3 No queues, schedules, or delayed surprises may exist.

G3. Resume is exact.

G3.1 On resume, world time is exactly the same instant.
G3.2 Reality continues as if no external time passed.

G4. Unexpected events are immediate.

G4.1 Unexpected events MUST be generated only at the moment they occur.
G4.2 Any queued or precomputed event is forbidden.



────────────────────────────────────────
H. META-PROHIBITION (ABSOLUTE)
────────────────────────────────────────

H1. No meta layer ever.

H1.1 The system MUST NOT include:
  - debugging tools
  - dashboards
  - admin panels
  - audit trails
  - validation traces
  - operator views
  - developer modes
  - inspection or query interfaces

H1.2 No design decision may be justified by “debugging,” “inspection,” or “future tooling.”

H2. No observer mode.

H2.1 There is no outside-the-world perspective.
H2.2 All understanding must arise from lived reality only.



────────────────────────────────────────
I. BANNED ARCHITECTURAL MOVES
────────────────────────────────────────

I1. No game logic.
I2. No state machines.
I3. No meters or scores.
I4. No quest or scenario systems.
I5. No user-centric priority.
I6. No global meaning authority.
I7. No mental-state narration as fact.



────────────────────────────────────────
J. OPEN ITEMS (MUST NOT VIOLATE ABOVE)
────────────────────────────────────────

J1. Exact Block schema extensions.
J2. Retrieval window sizes.
J3. Derived palimpsest views (if any).

END OF NON-NEGOTIABLES v0.2