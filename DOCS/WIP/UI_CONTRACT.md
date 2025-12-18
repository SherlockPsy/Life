UI_CONTRACT.md

Single-Participant · Single-World · Irreversible · No-Auth
Frontend ↔ Renderer (Venice) Boundary Contract

⸻

0. Scope and Authority

This document defines experience-time truth.

It is authoritative over:
	•	what is shown on screen
	•	how rendered content is structured
	•	how interaction is offered
	•	how participation occurs
	•	how continuity is preserved across devices
	•	what the UI is allowed and forbidden to do

If this document conflicts with:
	•	LIFE_LAWS.md
	•	STATE_SPEC.md
	•	COMPONENTS_REGISTRY.md
	•	Map Schema and Full Map.md
	•	INFRASTRUCTURE_AND_RUNTIME_CONTRACT.md

then those documents win.

This document must not reinterpret backend meaning.
It exists to faithfully present it.

⸻

1. Fundamental UI Principles (Hard)
	1.	The UI is not a narrator.
	2.	The UI is not a guide.
	3.	The UI is not an explainer.
	4.	The UI is not a reward system.
	5.	The UI does not optimize for comfort, reassurance, or positivity.
	6.	The UI presents what is happening, not what “should be felt”.

The UI is a window, not a voice.

⸻

2. Canonical UI Unit: Rendered Block

2.1 Definition

A Rendered Block is the smallest atomic unit of narrative output.

A block:
	•	is produced by Venice
	•	is immutable once committed
	•	is ordered relative to other blocks
	•	may contain text and minimal metadata

2.2 Block Properties

Each block contains:
	•	block_id (stable, unique)
	•	tick_id (originating tick)
	•	text (rendered prose)
	•	speaker_ref (optional; agent id or null)
	•	perceptual_scope (audible/visible/internal)
	•	continuity_tags (array; used for anchoring)

The UI must not modify any of these fields.

⸻

3. Block Ordering and Presentation

3.1 Ordering
	•	Blocks are displayed strictly in the order received.
	•	No reordering, grouping, summarising, or collapsing is allowed.
	•	No “scene headers”, “beats”, or UI-generated structure.

3.2 Persistence
	•	Once a block is displayed, it never disappears.
	•	Past blocks may scroll out of view, but remain part of the canonical transcript.

3.3 No Retroactive Changes
	•	The UI must never:
	•	rewrite text
	•	merge blocks
	•	insert clarifications
	•	annotate meaning

⸻

4. Holds (Participation Gates)

4.1 What a Hold Is

A Hold is an explicit pause produced by the backend, indicating:

“The system cannot proceed until the participant acts.”

4.2 Hold Representation

When a hold exists:
	•	input is enabled
	•	a visual indicator may be shown (minimal, non-directive)
	•	no system-generated text explains the hold

4.3 Forbidden UI Behavior

The UI must not:
	•	suggest what to say
	•	auto-fill responses
	•	explain “why” a hold exists
	•	frame the hold emotionally

A hold is felt, not explained.

⸻

5. Input Model (Participant Agency)

5.1 Input Is Verbatim

What you type is:
	•	sent exactly as typed
	•	preserved exactly as typed
	•	rendered downstream without paraphrase

The UI must not:
	•	auto-correct meaning
	•	rephrase for clarity
	•	infer action details

5.2 Input Types

The UI supports:
	•	free text input
	•	submission timing (send/enter)
	•	draft persistence

The UI does not support:
	•	buttons for “actions”
	•	menus of choices
	•	suggested replies

If you want to whisper, stand up, interrupt, or stay silent, you type it.

⸻

6. Silence Is Valid

6.1 No Forced Progress

If:
	•	no hold exists
	•	no new blocks arrive

Then:
	•	the UI remains idle
	•	nothing nudges you
	•	nothing blinks or prompts

Silence is not an error state.

⸻

7. Multi-Device Continuity

7.1 Canonical Truth

The canonical UI state is:
	•	stored in Postgres
	•	broadcast by Sync Service
	•	identical across devices

7.2 Device Switching

When you open another device:
	•	you see exactly the same blocks
	•	at the same point in time
	•	with preserved scroll/focus anchors

7.3 Draft Behavior
	•	Input drafts are local until submitted.
	•	Drafts may optionally sync, but are never authoritative.

⸻

8. Scroll, Focus, and Anchors

8.1 Anchors
	•	Anchors are generated from block metadata.
	•	Anchors allow the UI to restore position accurately.

8.2 UI Responsibility

The UI may:
	•	restore approximate scroll
	•	restore focus position

The UI must not:
	•	jump to “important moments”
	•	auto-scroll to dramatic content

⸻

9. Renderer (Venice) Boundary Rules

9.1 Renderer Input

The UI never calls Venice directly.

Venice receives:
	•	a SCHEMA_RENDERER_ENVELOPE_1
	•	assembled entirely by backend services

9.2 Renderer Output

Venice returns:
	•	rendered blocks only
	•	no instructions
	•	no UI hints
	•	no meta commentary

9.3 Forbidden Renderer Content (UI-enforced)

If Venice outputs:
	•	instructions to the participant
	•	meta explanations
	•	references to system behavior

The UI must:
	•	reject the output
	•	not display it
	•	not substitute or repair it

⸻

10. Scriptwriter, Not Novelist (Key Constraint)

The UI must support script-like rhythm, not novel exposition.

This means:
	•	dialogue can occur without addressing you
	•	scenes can unfold without your participation
	•	other characters may talk at length
	•	you may observe silently

The UI must not:
	•	center you artificially
	•	insert “you notice” framing
	•	force turn-taking

You are a participant, not the camera.

⸻

11. Emotional Neutrality of the UI

The UI must not:
	•	validate
	•	reassure
	•	reward
	•	scold
	•	soften

Emotional meaning must come only from:
	•	character behavior
	•	dialogue
	•	consequences

Not UI tone.

⸻

12. Forbidden UI Patterns (Explicit)

The following are forbidden:
	•	“Nothing waits for you”
	•	“You can respond when ready”
	•	“The moment hangs”
	•	“The system pauses”
	•	“You feel that…”

The UI never narrates your internal state.

⸻

13. Error Handling (Invisible)

13.1 User-Visible Errors

There are none.

13.2 If Something Fails

If the system cannot proceed:
	•	no placeholder content is shown
	•	no apology is shown
	•	no explanation is shown

The UI remains unchanged until a valid update arrives.

⸻

14. Accessibility (Non-Semantic)

Accessibility may be handled via:
	•	screen readers
	•	font scaling
	•	contrast

Accessibility layers must not alter semantic content.

⸻

15. UI Is Replaceable

Any frontend implementation that:
	•	obeys this contract
	•	renders blocks faithfully
	•	preserves continuity
	•	respects holds and silence

is valid.

This document does not prescribe:
	•	frameworks
	•	design systems
	•	visual style

Only behavior.

⸻

END OF UI_CONTRACT.md
