# 05_THE_CINEMA (V3.0)

**Status:** CANONICAL | **Version:** 3.0 (The Montage Engine)
**Definition:** The Context Assembler.
**Authority:** This document defines how the System constructs the "Viewing Experience" for the Intelligence (The Viewer). It replaces the "Universal Translator" and "Observer" logic.

---

## 1. THE CINEMATIC DIRECTIVE

The Intelligence (Viewer) is amnesiac. It knows nothing except what is projected on the screen *right now*.
The **Cinema's** sole purpose is to curate a **Montage**—a collection of text clips—that gives the Viewer exactly enough context to hallucinate the next beat of reality correctly.

**The Golden Rule:**
The Cinema does not "explain" the User's input. It **pairs** the input with relevant history (Semantic Resonance) so the meaning becomes self-evident.

---

## 2. THE THREE REELS (Input Streams)

The Cinema pulls from three sources to build the Montage.

### Reel A: The Live Feed (The Trigger)
* **Source:** The Recorder (Raw Input).
* **Content:** The User's current text + The Pulse (Timestamp).
* **Role:** This is the "Now."
    * *Input:* `[20:00] User: "I'm flying to the moon."`

### Reel B: The Palimpsest (The Established Shot)
* **Source:** `02_CONTRACT_STATE` (Current World Status).
* **Content:** The compressed reality (Location, Somatic State, Weather).
* **Role:** This establishes the physical constraints.
    * *Data:* `Location: Living Room. Somatic: Drunk. Status: Celebration.`

### Reel C: The Archive (The Flashbacks)
* **Source:** Vector Database (Qdrant/Chroma).
* **Content:** Past "Clips" (Raw Logs) retrieved via **Semantic Resonance**.
* **Role:** To provide emotional precedence.
    * *Logic:* The Cinema scans the input "Flying to the moon."
    * *Search:* Finds past clips related to "Metaphors," "Joy," or "Space."
    * *Retrieval:* Finds clip from 2024: `User: "I feel like I can fly." (Context: Promotion).`

---

## 3. THE MONTAGE ASSEMBLY (The Output)

The Cinema stitches these reels together into a single **Prompt Context** (The Script) for the Viewer.

**The Assembly Structure:**

1.  **[SCENE HEADER]:** (From Reel B - The Palimpsest). Sets the stage, lighting, and biology.
2.  **[THE ECHOES]:** (From Reel C - The Archive). 2-3 short clips from the past that resonate with the current moment.
    * *Format:* `[Memory 2024]: You celebrated the promotion. You used a flying metaphor.`
3.  **[THE GAP]:** (From Pulse). Explicit statement of time passed. `[TIME GAP: 0 Seconds]`.
4.  **[THE ACTION]:** (From Reel A - The Live Feed). The User's raw text.

---

## 4. THE INTERPRETATION LOGIC (Replacing the Universal Translator)

In the old `05_DESCRIPTION.md`, the "Observer" tried to translate intent (e.g., "User is being metaphorical").
In V3.0, the **Montage** forces the interpretation naturally.

**Scenario: The "Moon" Input**
* **User:** "I'm flying to the moon!"
* **Old Way:** Middleware returns `Intent: Metaphor`.
* **New Way (Cinematic):**
    * The Cinema retrieves the **Palimpsest**: `[Somatic: Intoxicated/Happy]`.
    * The Cinema retrieves the **Echo**: `[Memory: User uses hyperbole when happy]`.
    * The **Viewer** sees the Montage: *Drunk User + History of Hyperbole + "I'm flying to the moon."*
    * **Result:** The Viewer naturally writes a reaction to the *joy*, not the physics, without being explicitly told to "ignore the physics."

---

## 5. THE TRANSITION PROTOCOL (Scene Cuts)

The Cinema detects when a "Cut" is required based on the Input.

**A. The Jump Cut (Time/Location Change)**
* **Trigger:** User implies movement ("Let's go to the park") or the Pulse indicates a massive Gap.
* **Action:** The Cinema updates the **Palimpsest** *before* generating the Montage.
    * *Old Loc:* Kitchen.
    * *New Loc:* Park.
    * *Cost:* The Pulse advances +20 mins.
* **The Projection:** The Montage starts with the *new* location. The Viewer writes the *arrival*, not the travel.

**B. The Fade Out (End of Scene)**
* **Trigger:** User says "Goodnight" or stops responding for > 6 hours.
* **Action:** The Cinema triggers the **Sedimentation Process** (updating the Palimpsest with the day's events) and clears the short-term context.

---

## 6. THE "CONTEXTUAL CONTINUUM" (Continuity)

This replaces the "Logistics Manager" from the old file.

**The Law of No-Skips:**
The Cinema never "skips" time to suit the User unless the *physics* allows it.
* *Input:* "I'm at your door" (User was in New York 1 min ago).
* *Cinema Logic:*
    * Distance: 300 miles.
    * Required Time: 5 hours.
    * Actual Gap: 1 minute.
    * **Conflict:** The Cinema *cannot* update the Location to "Door" because the Pulse forbids it.
* **The Montage:**
    * `[Location]: New York.`
    * `[Action]: "I'm at your door."`
* **The Viewer's Result:** The Agent reacts to the *text* (a lie or a prank call), but the Scene remains physically in New York. The Viewer writes: *"She looks at her phone, confused. 'What? You're in the city.'"*