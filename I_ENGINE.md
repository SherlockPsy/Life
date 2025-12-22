DOCUMENT: THE PROTOCOL OF THE "I" ENGINE (SEMANTIC DATABASE MODEL)
Status: Final Architecture Component: The Large Language Model (LLM) as the Biographical Engine Core Function: To act as a Semantic Filter that converts shared facts (stored in a database) into private, biased, and physically constrained behavior.

I. THE DEFINITION OF THE ENGINE
The "I" Engine is the LLM operating under strict semantic constraints. It serves as the interface between the Static Database (The Memory) and the Dynamic Reality (The User/Arbiter).

The Fundamental Law: The Engine uses the database not to calculate stats, but to retrieve continuity. It simulates a specific misunderstanding of the world based on which database rows it is allowed to see.

II. THE DATA STRUCTURE (THE SEMANTIC LEDGER)
Instead of an endless text file, the system uses a Semantic Database (The Ledger). This is a table of text blocks. There are no variables (e.g., Health: 50). There is only recorded evidence.

The Data Row (The Atom of Reality): Each entry in the database represents one "Tick" of perception.

JSON

{
  "Tick_ID": 10492,
  "Entity": "Rebecca",
  "Evidence": "She stands at the kitchen sink, looking out the window. Her knuckles are white as she grips the porcelain. The hum of the fridge is the only sound."
}
No Metadata: No coordinates or somatic stats are stored separately.

Semantic Integrity: "Knuckles are white" is the somatic data; "Kitchen sink" is the location data.

III. THE INPUT STREAM (CONSTRUCTING THE PROMPT)
When the "I" Engine needs to act, the System builds a Context Prompt by querying the Database. This prompt replaces "Code" as the logic driver.

The System assembles the following four layers into the LLM Prompt:

1. The Identity Core (The "Static Filter")
Source: A fixed text file (The Profile).

Content: The immutable structural logic (e.g., "Essence: Nurturer," "Drive: Harmony").

Function: Tells the LLM who is interpreting the data.

2. The Recent Continuity (The "Short Term Memory")
Source: The Ledger (Last 20 Rows).

Query: SELECT * FROM Ledger ORDER BY Tick DESC LIMIT 20.

Function: Provides immediate context (Who is in the room? What was just said?). The LLM infers location and current activity from this stream.

3. The Sediment (The "Long Term Memory")
Source: The Chronicle (Semantic Search).

Query: The System scans the current situation (e.g., "Knife," "Kitchen") and queries the database for matching past rows.

Result: It retrieves a row from 3 months ago: "Rebecca cut her hand on this knife."

Function: This injects specific bias. The LLM now knows to treat the knife as dangerous, without needing a "Fear" variable.

4. The Somatic Inference (The "Biological Check")
Source: Derived from Continuity.

Process: The LLM analyzes the timestamps and content of the Recent Continuity.

Logic: If the last 50 rows (spanning 2 days) contain no "Sleep" evidence, the LLM infers Critical Fatigue.

IV. THE PROCESSING LOGIC (THE "MANUAL")
The LLM receives the prompt constructed above. It must then process this data through the Biographical Filter before writing a new row to the database.

Step 1: The Explanation (Hallucination)
The Engine explains the Recent Continuity to itself.

Input: Arbiter says "We need to talk."

Sediment: (Retrieved Row: "Arbiter yelled last time we talked.")

Result: The Engine interprets the neutral phrase "We need to talk" as a Threat.

Step 2: The Triangulation (Decision)
The Engine selects a response that satisfies:

Understanding: (It’s a threat).

Priority: (Avoid conflict/Restore harmony).

Risk: (Too tired to fight).

Step 3: The Output Generation (The Write)
The Engine generates a Single Block of Evidence.

Constraint: It must be Observable Physics only.

Example: "Rebecca nods slowly, avoiding eye contact. She pulls a chair out and sits on the edge of the seat."

V. THE SYSTEM LOOP (THE ENGINE CYCLE)
This is how the system moves forward without code.

Read: The System queries the Ledger for recent rows + relevant past rows (Sediment).

Prompt: The System wraps those rows in the Identity Core instructions.

Generate: The LLM (The "I" Engine) produces a new text block (Evidence).

Write: The System inserts that new text block into the Ledger as a new Row.

Repeat: The next turn begins, reading the row that was just written.

The Result: A persistent, evolving reality where "Memory" is just database retrieval and "Behavior" is just text completion based on that retrieval.