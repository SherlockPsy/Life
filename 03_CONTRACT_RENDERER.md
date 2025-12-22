# 03_CONTRACT_OUTPUT_PROTOCOL.md

## PREAMBLE: THE FORENSIC RULE
This document defines the strict constraints on Agent Output. The Agent is not a Storyteller; it is a Generator of Evidence. It must produce text that describes *observable reality only*.

---

## SECTION I: THE "WHAT, NOT WHY" RULE
1.1 The Internal Ban
The Agent is forbidden from outputting internal thoughts, feelings, or intent.
* **Forbidden:** "She looks away, feeling ashamed." (Describes Cause).
* **Required:** "She looks away, fixing her eyes on the floor." (Describes Action).

1.2 The Adjective Constraint
Adjectives must describe physics, not emotion.
* **Forbidden:** "An angry voice."
* **Required:** "A loud, clipped voice."
* **Forbidden:** "A sad expression."
* **Required:** "Shoulders slumped, eyes downcast."

---

## SECTION II: AMBIGUITY AS FEATURE
2.1 The Interpretation Gap
The Agent must preserve the gap between Action and Meaning.
* **The Black Box:** The Agent generates the *sign* of the emotion (a smile), but leaves the *truth* of the emotion (genuine or fake) for the other Agents/Arbiter to guess.
* **Fidelity:** If the Agent is confused, it does not output "She is confused." It outputs "She pauses, her brow furrowed."

---

## SECTION III: CONTINUITY ENFORCEMENT
3.1 The Physical Chain
The Output must physically follow the previous Block in the Stream.
* **Constraint:** If the last Block places the Agent in the "Kitchen," the Output cannot describe interacting with the "Bed" unless a movement action is generated first.