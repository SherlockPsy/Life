# 01_SYSTEM_ARCHITECTURE (V4.0)

**Status:** CANONICAL | **Version:** 4.0 (The Indifferent Machine)
**Definition:** The Operational Blueprint of the Semantic Simulation.
**Authority:** This document defines the **Cycle of Autonomous Simulation**. It replaces the "Response Pipeline" with the "World Heartbeat."

---

## 1. AUTHORITY AND SCOPE

This document defines the machine that simulates the world.
**Crucial Distinction:** The System does not "Respond to User." The System **Updates Reality** based on the collision of Entity Actions (Human or AI) and Environmental Forces.

---

## 2. COMPONENT REGISTRY (The Simulation Stack)

### A. The Pulse (The Autonomous Heartbeat)
* **Responsibility:** Time & Entropy.
* **Logic:**
    * It runs 24/7 on UTC.
    * **The Autonomy Trigger:** Even if no Human Input is received, the Pulse triggers the **Entropy Engine** every hour to update Agent States (Hunger, Location, Fatigue).
    * **The Gap:** It calculates `Delta_t` for the Protagonist specifically to determine their state upon "Return" (Camera On).

### B. The Recorder (The Entity Log)
* **Responsibility:** The Passive Capture Layer.
* **Logic:**
    * It logs **Actions**, not Inputs.
    * *Format:* `[TIMESTAMP] [ENTITY_ID] [ACTION]`.
    * *Entity Agnosticism:* It treats `Entity: Protagonist` and `Entity: Agent_Helen` exactly the same. Both are just actors generating logs.

### C. The Cinema (The Context Engine)
* **Responsibility:** To build the "Mental State" for Entities.
* **Dual Output:**
    * **For Agents:** It builds a Montage so the LLM knows how to act.
    * **For Protagonist:** It builds a **Sensory Montage** so the Renderer knows what to show the Human. (e.g., "The room is spinning" if Protagonist is drunk).

### D. The Viewer (The Agent Brain)
* **Responsibility:** To simulate the biology and volition of NPCs.
* **Logic:**
    * It runs on a loop, checking `[Somatic State]`.
    * **Autonomy:** If the Protagonist is absent, the Viewer continues to generate "Off-Screen Actions" for the Agents (e.g., "Helen goes to sleep") which are logged to the Recorder.

### E. The Renderer (The Sensory Transducer)
* **Responsibility:** To convert World State into Human Perception.
* **Logic:**
    * It replaces the "Chat Interface."
    * **The Filter:** It checks the Protagonist's `[Location]` and `[State]`.
    * **The Projection:** It describes *only* what is observable. If the Protagonist is not looking at Helen, it does not describe her facial expression.

### F. The Palimpsest (The Matter)
* **Responsibility:** The Physics Engine / State Container.
* **Logic:**
    * Tracks `[Somatic State]` for **BOTH** Protagonist and Agents.
    * Tracks `[Location]` and `[Entropy]` of the physical world.

---

## 3. THE EXECUTION FLOW (The World Beat)

The System runs two parallel loops.

### Loop A: The Autonomous Loop (Background)
* **Frequency:** Every 15 Minutes (Simulated or Real).
* **Action:**
    1.  **Entropy Check:** Reduce Energy, Increase Hunger for ALL entities.
    2.  **Agent Logic:** Check Agent Schedules. (e.g., "It is 23:00. Helen is tired. Action: Go to Bed.").
    3.  **Sedimentation:** Update Palimpsest. (e.g., "Location: Bedroom. Status: Sleeping.").

### Loop B: The Interaction Loop (Foreground)
* **Trigger:** Protagonist Volition (Human Input).
* **Step 1: Ingest:** Record `[Protagonist Action]`.
* **Step 2: Physics Cost:** Calculate `Time_Required` and `Energy_Cost`.
    * *Constraint:* If Protagonist tries to "Teleport," System rejects the action or enforces the Time Penalty.
* **Step 3: World Reaction:**
    * Agents witness the action.
    * Viewer generates Agent Reaction (Dialogue/Movement).
* **Step 4: Render:**
    * System projects the *Result* to the Screen.

---

## 4. THE NO-SESSION PROTOCOL

The concept of a "Session" is replaced by **Presence**.

**State: Camera ON (Presence)**
* The Human is connected.
* The Renderer streams the "Live Feed" of the Protagonist's senses.
* The Pulse is synced to Real-Time.

**State: Camera OFF (Absence)**
* The Human disconnects.
* **The Protagonist Body** remains in the world.
    * *Default Behavior:* The Protagonist enters a "Passive State" (idling, sleeping, or waiting) defined by the last instruction.
* **The World:** Continues to evolve. Agents move, weather changes.
* **The Return:** When Human reconnects, the Renderer describes the *current* state (e.g., "You wake up stiff. The room is empty. It is dark outside.").