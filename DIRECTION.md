
# THE CINEMATIC SEMANTIC SIMULATION: ARCHITECTURE vDRAFT

### I. CORE PHILOSOPHY

* **The "Anti-Game" Rule:** We reject all video game logic. No hit points, no stats, no coordinates (`x,y`), no database variables, and no labels.
* **The "Living Novel" Standard:** The system does not "calculate" reality; it **writes** it. If a human author wouldn't explicitly measure it, the system does not track it.
* **The "Camera" Metaphor:** The System is not an active judge ("Arbiter"). It is a passive **Recorder** and an intelligent **Projector**. It captures truth without interpretation and replays it for the Intelligence (The Viewer) to understand.
* **No "User":** The concept of a "User" is abolished. There is only the **Protagonist** (You) and the **World** (Agents/Environment).

---

### II. THE FOUR COMPONENTS

#### 1. THE PULSE (The Timecode)

* **Definition:** An independent, blind metronome that exists outside the story.
* **Function:** It stamps every frame of film with a Timecode (`2025-12-20 08:00`).
* **The Universal Solvent:** It forces entropy. If the Cinema plays a clip from 08:00 and the current time is 14:00, the Viewer knows 6 hours have passed (Hunger, Fatigue) without being told explicitly.

#### 2. THE RECORDER (The Storage)

* **Definition:** The "Dumb" Capture Device.
* **Function:** Pure, lossless capture of the Narrative Stream.
* **Input:** "George hugs Rebecca."
* **Storage:** `[Timestamp] George hugs Rebecca.`
* **Rule:** It never summarizes during capture. It keeps the "sensory texture" (the smell of toast, the winter light) because that texture is the reality.

#### 3. THE CINEMA (The Montage Engine)

* **Definition:** The Context Assembler.
* **Function:** To curate the "Viewing Experience" for the LLM. It does not write summaries (e.g., "This is intimate"). Instead, it retrieves relevant "clips" from the past (the archives) and projects them onto the screen alongside the live action.
* **The Mechanism (Semantic Resonance):** When a new action occurs (Trigger), the Cinema searches the Archives for concepts that "vibrate" at the same frequency.
* *Trigger:* "Hug" (Physical/Intimacy).
* *Retrieval:* The Cinema pulls the reel from last night ("Sex").
* *Retrieval:* The Cinema pulls the reel from 1 year ago ("The Spilled Wine").


* **The Output:** A **Montage**. It hands the LLM a stack of raw text clips: "Here is what happened just now, and here is what happened last night."

#### 4. THE VIEWER (The Intelligence/LLM)

* **Definition:** The Interpreter.
* **Function:** To watch the Montage and react.
* **The Logic:** The LLM uses its training (Human Literature) to connect the dots.
* It sees `Clip A (Sex)` and `Clip B (Hug)`.
* It **deduces** "Continued Intimacy."
* It **writes** the response: "Rebecca leans back, humming softly."



---

### III. THE MECHANICS OF REALITY

#### A. The Relevance Filter (Materiality)

* **Problem:** Infinite reality requires infinite compute.
* **Solution:** The Cinema scans the **Focus of Attention**.
* **Material:** If an object is being held, looked at, or is critical to survival, physics applies immediately (The coffee is cold).
* **Immaterial:** If an object is ignored, it fades into "Background Texture." It changes state silently (The coffee cools) but is not described to the Viewer.



#### B. The Palimpsest (Deep Time & Sedimentation)

* **Problem:** Handling 5 years of mundane history (bins, meals) without infinite logs.
* **Solution:** The System uses **Semantic Sedimentation**. Over time, repeated events are compressed into **Traits** or **Norms** in a "Current World Status" (CWS) document.
* *Year 1:* "We took the bins out." (Log Event).
* *Year 5:* "It is our routine that I take the bins out." (CWS Statement).


* **The "Production Bible":** The Viewer checks this CWS to ensure consistency (e.g., you sold the house 3 years ago), but relies on the Montage for emotional context.

#### C. The Semantic Echo (Flashbacks)

* **Concept:** History is not a list; it is a ghost.
* **Mechanism:** If you walk with a limp in Year 5, the Cinema plays a brief clip of the "Broken Leg Incident" from Year 2. The Viewer sees the clip and writes: *"Your leg aches, a reminder of that fall."*

#### D. Lazy Rendering (Superposition)

* **Concept:** The world outside the Montage exists in Superposition.
* **Mechanism:** "Hundreds of people" in a cafe are not simulated individually. They exist as a single object: `[ATMOSPHERE]: Crowded`. They only become individuals if the Protagonist interacts with one.

---

### IV. INTERACTION SYNTAX

* **No UI / No Meta:** No "User:" or "System:" tags.
* **The Perspective Lock:**
* **Input (You):** First Person Present Tense ("I stand up," "I whisper").
* **Output (System):** Second Person Present Tense ("She looks at you," "You feel the warmth").


* **Sensory First:** The Viewer always describes the *physicality* (reaction, breath, light) before the *dialogue*.
* **Continuous Flow:** The experience is a seamless "Living Novel," separated only by a visual break (e.g., `---`) to pass the baton.