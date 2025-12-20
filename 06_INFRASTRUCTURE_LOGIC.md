# 06_INFRASTRUCTURE_LOGIC (V4.0)

**Status:** CANONICAL | **Version:** 4.0 (The World Heartbeat)
**Definition:** The Autonomous Processes.
**Authority:** This document defines the "Engine Room" that runs 24/7, regardless of Human presence.

---

## 1. THE AUTONOMOUS DRIVER (The Heartbeat)

The System acts as the **Prime Mover** when entities are passive.

**The Schedule:**
* **Tick Rate:** 1 Minute (Real Time).
* **Logic:**
    1.  **Update Pulse:** `Current_Time + 1 min`.
    2.  **Check Triggers:** Are there scheduled events? (e.g., "Train arrives at 09:15").
    3.  **Execute Event:** If yes, update `[Location: Station]` state.

---

## 2. THE ENTROPY ENGINE (The Decay Loop)

*Objective: To erode order without input.*

**The Hourly Pass:**
Every 60 minutes, the System runs a script on the Palimpsest:
1.  **Reduce Energy:** All biological entities (Agent & Protagonist) `-5 Energy`.
2.  **Increase Hunger:** All biological entities `+10 Hunger`.
3.  **Environmental Decay:**
    * `[Hot]` objects become `[Warm]`.
    * `[Warm]` objects become `[Cold]`.
4.  **Relational Decay:**
    * If `[Last_Interaction] > 7 Days`: Degrade `[Intimacy]` by 1 Step.

**The Consequence:**
If the Human Player leaves the game for a week, they return to a Protagonist who is starving, weak, and estranged from their partner. The World has punished their absence.

---

## 3. THE PHYSICS OF PRESENCE (Camera Logic)

**State: Camera ON (The Render Loop)**
* The System prioritizes the **Sensory Montage**.
* It serves text to the Human Player.
* Latency is minimized.

**State: Camera OFF (The Ghost Loop)**
* The System stops rendering text.
* **BUT:** The Protagonist entity remains in the world.
* **Behavior:** The System assigns a "Default Behavior" to the Protagonist (e.g., "Sleeping" or "Sitting Staring").
* **Vulnerability:** Agents can still interact with the Protagonist.
    * *Agent Action:* "Helen yells at the sleeping Protagonist."
    * *Log:* Recorded.
    * *Return:* When Human returns, they see the log/memory: *"You remember vague shouting while you slept."*

---

## 4. THE SEDIMENTATION OF HISTORY

History is not just a log file; it is a **Physical Transformation**.

**The Hardening Process:**
1.  **Soft Layer:** Recent logs (Last 1 hour). High detail.
2.  **Hard Layer:** Older logs are compressed into **Traits**.
    * *Event:* Protagonist lied 5 times.
    * *Sediment:* Protagonist gains Trait `[Reputation: Liar]`.
    * *Effect:* Agents now possess a permanent bias against the Protagonist's speech.

**The Permanence:**
This sediment cannot be erased by "being nice" once. It requires geological time (sustained effort) to erode the `[Liar]` trait.