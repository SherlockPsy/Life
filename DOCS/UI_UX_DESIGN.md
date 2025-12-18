# VIRLIFE UI/UX SPECIFICATION (Master v3.0)
**Role:** The Interface between George and the World.
**Core Philosophy:** "The Collision of Wills."
**Design Language:** "Porcelain, Glass, & Living Typography."
**Status:** LOCKED 🔒

---

## PART 1: THE CONTENT & INTERACTION (The Soul)
*How the system functions, behaves, and generates reality.*

### 1.1 The Metaphor: "The Perceptual Stream"
The interface is not a chat app, a game HUD, or a book. It is a **Direct Feed of Perception**.
* **The Stream:** A continuous, scrolling flow of text representing reality as experienced by George.
* **No Meta-Data:** There are no HP bars, no "Scene Headers," no "You are here" maps, and no system notifications visible in the main view. If George doesn't see it, the screen doesn't show it.
* **The Cursor:** Your position in the stream is saved down to the pixel. Switching devices (Desktop ↔ Mobile) is seamless; you land exactly where your eyes left off.

### 1.2 The "Three Sources" of Text
The stream is composed of three distinct text sources, each with a strict formatting and logic rule:

#### **A. THE USER (George)**
* **Source:** Direct Input.
* **Label:** **NONE.** (Unlabeled).
* **Formatting:** **Verbatim.** The text appears exactly as typed.
* **Logic:** It is the "Expression of Will." It merges instantly into the stream upon entry. The system *never* modifies, formats, or narrates over it.

#### **B. THE VOICE (The World Descriptor)**
* **Source:** Brain 3 (The Renderer).
* **Label:** **NONE.** (Unlabeled).
* **Formatting:** Standard Prose.
* **Tone:** Consistent, Unemotional, Objective (The Camera Lens).
* **Perspective:** Strict Second-Person (*"You see," "You hear"*).
* **Constraints:** No Mind Reading. It describes the sweat, the shaking hand, and the scream, but it never *screams* itself.

#### **C. THE PEOPLE (The Characters)**
* **Source:** Brain 1 (The People Engine).
* **Label:** **LABELED** (Small Caps name above text, e.g., **REBECCA**).
* **Formatting:** Dialogue & Action.
* **Tone:** **Infinite Variance (Subjective).**
    * It is entirely up to the character's internal state.
    * Can range from professional (*"The lighting was technical hell"*) to raw/explicit (*"Lick my pussy"*) to rude/chaotic.
* **Logic:** The system **NEVER** sanitizes, softens, or tone-polices The People.

### 1.3 The "Pocket" (Digital Anchor)
To satisfy the need for digital tools (Calendar, Messages) without breaking immersion, we treat the UI as a physical object.
* **The Trigger:** A subtle icon (bottom corner) or Semantic Intent (typing `I check my phone`).
* **The Content:**
    * **Messages:** Texts from **any** agent (Lucy, Marcus, etc.).
    * **Calendar:** Real-world appointments and scheduled events.
    * **Clock:** The World Time (synced to Real Time).
* **The Notification Logic:** New messages appear as a subtle indicator on the Pocket icon (e.g., a small red dot), **never** as a pop-up in the world stream.

### 1.4 Event Handling (The "Doorbell" Logic)
* **No Blocking:** User activity (e.g., Intimacy, Deep Work) never blocks world events. If the Chaos Engine triggers a doorbell, it appears in the stream immediately.
* **The Collision:** The system does not decide the outcome.
    1.  **Stimulus:** The World renders the event (*"The doorbell rings"*).
    2.  **Agency:** The Initiator (Person X) persists based on their goal.
    3.  **Result:** The outcome emerges from the collision of **Your Will**, **Rebecca's Reaction**, and the **Initiator's Persistence**.

---

## PART 2: THE VISUALS & AESTHETICS (The Looks)
*How the system looks, feels, and animates.*

### 2.1 Visual Language: "Porcelain & Glass"
* **Theme:** **Ultra-Modern Light Mode**. No dark terminals; no cream book pages.
* **Background:** `#F5F5F7` (Porcelain / Off-White). A sterile, high-end gallery feel.
* **Text Color:** `#1D1D1F` (Deep Charcoal). High contrast, sharp, ink-like.
* **Accent Color:** `#0071E3` (Electric Blue), used extremely sparingly for "Pocket" cues or focus states.

### 2.2 Typography: "Living Text"
* **Font Family:** Crisp, optical-sized Sans-Serif (e.g., *Helvetica Now Display*, *Inter*, or *San Francisco*).
* **Variable Weights (The "Acoustic" Effect):**
    * **Whisper/Soft:** Light/Thin weight (300). Airy letter-spacing.
    * **Normal:** Regular weight (400).
    * **Impact/Loud:** Bold/Heavy weight (700-800). Tight letter-spacing.
* **Semantic Focus (The "Sherlock" Effect):**
    * Key details (Objects, Names, Clues) feature a subtle visual "pop"—a slight crispness or faint glow—that guides the eye without breaking reading flow.

### 2.3 The "Sherlock" Animation Suite
Text does not just appear; it **resolves**.
* **Entry Animation:** New text lines entering the stream utilize a **Blur-to-Focus** transition (0.3s). They start translucent and blurry, snapping into sharp focus as if your eyes are adjusting to the reality.
* **Event Pulse:** Sudden interruptions (Chaos Events) enter with a **Kinetic Pulse**—a micro-scale bump that visually disrupts the flow, commanding attention.
* **Historical Fade:** As text scrolls up into the past, it fades slightly (to ~60% opacity), keeping visual focus strictly on the *Now*.

### 2.4 The Pocket Visuals: "Frosted Glass"
* **The Transition:** When the Pocket is opened, the entire World Stream behind it undergoes a heavy **Gaussian Blur** (Glassmorphism).
* **The Metaphor:** Your eyes have shifted focus from the room (blurred background) to the phone (sharp foreground).
* **The UI:** Floating cards on top of the glass layer. Clean, minimal, OS-native aesthetics.

---

## PART 3: PLATFORM ARCHITECTURE (The Delivery)
*How the system reaches the user.*

### 3.1 The Progressive Web App (PWA) Standard
* **Requirement:** The system MUST be built as a PWA (Progressive Web App).
* **Compatibility:** It must run on any modern browser engine (Webkit, Blink, Gecko), ensuring 100% compatibility with **iOS 26+**, Android, and Desktop.
* **Installability:** It must include a `manifest.json` and Service Workers to allow "Add to Home Screen," removing the browser chrome (URL bar) to look and feel like a Native App.

### 3.2 Responsive Fluidity
* **Logic:** The interface is purely fluid.
* **Desktop:** Single centered column with wide margins ("The Page").
* **Mobile:** Full-width column with touch-optimized tap targets for the "Pocket."
* **State Sync:** The backend (`REDIS`) acts as the single source of truth for UI state. If you scroll up on Desktop, the Mobile view does not change; but the *Content* history is identical.

---

### **SUMMARY OF THE UX CONTRACT**
1.  **You Type:** Natural intent.
2.  **You See:** A crisp, living stream of text that behaves like thought (focusing, blurring, weighing).
3.  **You Feel:** Presence. No game mechanics. No "Chat" chrome. Just the room, **The People**, and the device in your pocket.
4.  **You Access:** Anywhere, on any device, as a seamless living app.

***
**END OF DOCUMENT**