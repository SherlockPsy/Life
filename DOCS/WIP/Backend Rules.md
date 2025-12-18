Backend Rules — Interaction, Reality, and Social Flow

This document defines backend-owned responsibilities that must be resolved before any rendering occurs.
The renderer (Venice) is explicitly forbidden from deciding or inferring any of the following.

⸻

1. Interaction Engine (Social Flow Authority)

Responsibility

Decide who acts next, who speaks, and who is addressed in any social situation.

Owns
	•	Speaker selection
	•	Target of speech (user, agent, group, private)
	•	Silence ownership (who is choosing not to speak)
	•	Interruptions and overlaps
	•	Initiation vs response
	•	Turn competition and conversational momentum

Forbidden
	•	Writing dialogue
	•	Explaining motives
	•	Optimising for engagement
	•	Deferring decisions to the renderer

⸻

2. Agent Action Resolution

Responsibility

Each agent decides what they do based on internal state and context.

Owns
	•	Speech acts (what is said)
	•	Physical actions
	•	Non-actions (choosing not to respond)
	•	Action attributes (tone, volume, urgency, privacy)
	•	Behavioural consistency with personality, mood, history

Forbidden
	•	Deciding social flow
	•	Deciding perceptual outcomes
	•	Writing prose

⸻

3. User Agency Boundaries

Responsibility

Protect moments where user choice is required.

Owns
	•	Detection of direct address to the user
	•	Detection of user-owned decisions (ordering, answering, choosing)
	•	Enforcement of pauses when user input is pending

Rules
	•	The system must not advance past a direct user address without user action or explicit rendering of silence.
	•	The system must not summarise across user-owned decision boundaries.

⸻

4. Attention & Salience Selection

Responsibility

Determine what enters the user’s perceptual slice.

Owns
	•	Selection based on proximity, loudness, motion, novelty, threat, relevance
	•	Foreground vs background activity
	•	Parallel thread visibility limits

Forbidden
	•	Selection based on “interest”
	•	Selection based on narrative payoff
	•	Selection based on user engagement optimisation

⸻

5. Visibility & Audibility Constraints

Responsibility

Enforce physical and environmental constraints on perception.

Owns
	•	What is visible from where
	•	What is audible from where
	•	Occlusion, distance, noise, walls, interference

Rules
	•	Perception is conservative by default.
	•	Nothing is assumed perceptible unless explicitly permitted.

⸻

6. Scene Continuity (Temporary State)

Responsibility

Maintain short-term continuity within a scene.

Owns
	•	What has been established
	•	What has not changed
	•	What must remain consistent
	•	When a scene boundary occurs

Rules
	•	Scenes persist while organising conditions remain intact.
	•	Scene transitions invalidate assumptions.

⸻

7. Temporal Constraints

Responsibility

Track and enforce time passage.

Owns
	•	Duration of silence
	•	Feasibility of state changes
	•	Whether time compression is allowed

Rules
	•	No implicit time skips across user-owned or agent-owned actions.
	•	Time compression requires explicit permission from scene logic.

⸻

8. Emotional Inertia

Responsibility

Prevent implausible emotional whiplash.

Owns
	•	Persistence of mood
	•	Accumulation of affect
	•	Conditions for emotional shifts

Rules
	•	Single utterances do not cause large mood flips unless volatility is a stable trait.
	•	Emotional change requires triggers, accumulation, or time.

⸻

9. Dialogue Channel Management

Responsibility

Determine communication channels.

Owns
	•	Public speech
	•	Side conversations
	•	Whispering
	•	Texting / phone calls
	•	Channel leakage rules

Rules
	•	Channel is explicit.
	•	Leakage occurs only through physical constraints, never narrative convenience.

⸻

10. Error, Noise, and Imperfection Allowance

Responsibility

Permit realistic human error.

Owns
	•	Misstatements
	•	Hesitations
	•	Interruptions
	•	Repairs and corrections
	•	Awkward timing

Rules
	•	Competence is not assumed.
	•	Smoothness is not default.

⸻

11. Topic Threading

Responsibility

Maintain conversational continuity.

Owns
	•	Active topics
	•	Dormant topics
	•	Resurfacing of unfinished threads

Rules
	•	Topics may be dropped and resumed.
	•	Conversations do not hard-reset each turn.

⸻

12. Boundary & Consent Dynamics (Non-Explicit)

Responsibility

Model social boundaries realistically.

Owns
	•	Appropriateness of teasing, proximity, disclosure
	•	Boundary testing and retreat
	•	Social repair after missteps

Rules
	•	Boundary violations are not normalised by default.
	•	Reactions depend on agent state and relationship history.

⸻

13. Parallel Activity Management

Responsibility

Support a busy, non-turn-based world.

Owns
	•	Multiple simultaneous micro-events
	•	Foreground/background rotation
	•	Attention contention

Rules
	•	No global pause waiting for the user.
	•	No summarising entire crowds.

⸻

Backend Checksum

Backend systems decide reality, social flow, perception constraints, and agency boundaries.
The renderer may only describe what these systems have already resolved.

If any of the above decisions are made during rendering, the system is incorrect.

⸻
