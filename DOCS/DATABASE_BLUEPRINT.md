# VIRLIFE TECHNICAL BLUEPRINT (Final Build)

**Version:** 3.1 (Master - Smart Time Edition)
**Status:** LOCKED 🔒
**Alignment:** 100% Match with Ontology v3.0

-----

## PART 1: POSTGRESQL (The Semantic Ledger)

*Technology: PostgreSQL 16+ with `JSONB`.*
*Role:* The Permanent Truth & Objective History.

### 1.1 Table: `entities` (Bucket 1: The Person & Groups)

Stores People, The World (Entity \#0), and Abstract Groups.

  * **Crucial Logic:** "Groups" (e.g., *The Survivors*) are stored here with `simulation_depth = 'Abstract_Group'`. This allows `stances` to target them naturally.

```sql
CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- IDENTITY
    first_name TEXT NOT NULL,
    last_name TEXT, 
    
    -- SIMULATION TIER
    -- Values: "Inner Circle", "Cast", "World_Zero", "Abstract_Group"
    simulation_depth TEXT NOT NULL DEFAULT 'Cast', 

    -- THE BIOLOGICAL CORE (Hardware)
    -- ex: { "height": "165cm", "scent": "Vanilla", "tells": ["Picks nails"] }
    -- For Groups: { "symbol": "Red Flag", "motto": "Survival at all costs" }
    biological_core JSONB NOT NULL DEFAULT '{}',

    -- THE PSYCHOLOGICAL ENGINE (Software)
    -- ex: { "drives": ["Craves control"], "triggers": ["Loud noises"] }
    psychological_engine JSONB NOT NULL DEFAULT '{}',

    -- THE GOAL STACK (Motivation)
    -- ex: [ { "goal": "Leave room", "type": "short_term", "conflict": true } ]
    active_goals JSONB NOT NULL DEFAULT '[]',

    -- THE NARRATIVE SELF (Subjective Story)
    -- ex: { "current_arc": "Redemption", "theme": "Struggle against authority" }
    narrative_self JSONB NOT NULL DEFAULT '{}',

    -- THE GLASS BOX (Secret Self)
    inner_monologue TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
````

### 1.2 Table: `stances` (Bucket 2: The Directed Web)

Enforces **Asymmetry** and **Polyphony**.

```sql
CREATE TABLE stances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- DIRECTIONALITY (A->B is not B->A)
    source_entity_id UUID REFERENCES entities(id),
    target_entity_id UUID REFERENCES entities(id), -- Can target a Person OR a Group
    
    -- THE ROLE CLUSTER (Polyphony)
    -- ex: ["Neighbor", "Rival", "Confidant"]
    active_roles TEXT[] DEFAULT '{}',

    -- SEMANTIC TEXTURE (The Vibe)
    -- ex: { "trust": "Fragile", "power": "Submissive", "tension": "Simmering" }
    texture JSONB NOT NULL DEFAULT '{}',

    UNIQUE(source_entity_id, target_entity_id)
);
```

### 1.3 Table: `promises` (Bucket 2 Extension)

The Social Contract ledger.

```sql
CREATE TABLE promises (
    id UUID PRIMARY KEY,
    source_id UUID REFERENCES entities(id),
    target_id UUID REFERENCES entities(id),
    
    -- THE CONTRACT
    description TEXT NOT NULL, -- ex: "Cook dinner for George"
    due_date TIMESTAMP WITH TIME ZONE,
    
    -- STATE (Semantic)
    fulfillment_state TEXT DEFAULT 'Active' -- "Active", "Broken", "Fulfilled"
);
```

### 1.4 Table: `world_locations` (Bucket 3: The Map)

Supports **Nesting** for physical hierarchy.

```sql
CREATE TABLE world_locations (
    id UUID PRIMARY KEY,
    parent_id UUID REFERENCES world_locations(id), -- Nesting (Room -> House)
    
    -- SEMANTIC DESCRIPTION
    name TEXT NOT NULL,
    atmosphere TEXT NOT NULL, -- ex: "Smoky, loud, smells of stale beer."
    
    -- SNAPSHOT STATE
    current_state JSONB DEFAULT '{}'
);
```

### 1.5 Table: `global_timeline` (Bucket 3: The Future)

The Calendar system for scheduled events.

```sql
CREATE TABLE global_timeline (
    id UUID PRIMARY KEY,
    scheduled_time TIMESTAMP WITH TIME ZONE,
    participant_ids UUID[],
    location_id UUID REFERENCES world_locations(id),
    
    title TEXT NOT NULL, -- ex: "The Divorce Hearing"
    context_notes TEXT
);
```

### 1.6 Table: `system_state` (The Time Keeper) [NEW]

This table is a **Singleton** (only one row ever exists). It allows the "Ticker" to handle Pausing correctly.

```sql
CREATE TABLE system_state (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Enforce Singleton
    
    -- THE PAUSE BUTTON
    is_paused BOOLEAN DEFAULT FALSE,
    
    -- THE SCHEDULER
    -- Instead of running cron every 10m, we run cron every 1m and check this timestamp.
    next_chaos_check_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- STATE PRESERVATION
    -- When paused, we calculate how much time was left and store it here (e.g., 180 seconds).
    -- When resumed, we set next_chaos_check_at = NOW() + paused_remaining_seconds.
    paused_remaining_seconds INTEGER DEFAULT 0
);
```

### 1.7 Table: `event_log` (The Objective History)

The immutable record of "What Actually Happened." This is the **Anchor** for QDrant.

```sql
CREATE TABLE event_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- WHEN & WHERE
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    location_id UUID REFERENCES world_locations(id),
    
    -- WHO
    participant_ids UUID[],
    
    -- WHAT (The Ground Truth)
    -- ex: "George and Rebecca discussed the rent. George raised his voice."
    objective_summary TEXT NOT NULL,
    
    -- METADATA
    -- ex: { "weather": "Stormy", "duration_sec": 300 }
    context_data JSONB DEFAULT '{}'
);
```

-----

## PART 2: REDIS (The Nervous System)

*Technology: Redis Stack.*
*Role:* The "Now" (Context Injection).

### 2.1 The "Now" Buffer

  * **Key:** `buffer:{location_id}:transcript`
  * **Value:** List of recent JSON objects (dialogue, action, leakage).

### 2.2 The Presence Map

  * **Key:** `entity:{id}:presence`
  * **Value:** `{ "location_id": "uuid", "last_active": "timestamp" }`

### 2.3 The Metabolism Queue

  * **Key:** `queue:memory_metabolism`
  * **Role:** Buffers filled here are sent to **Brain 4** for processing into Wisdom.

-----

## PART 3: QDRANT (The Memory Matrix)

*Technology: QDrant.*
*Role:* The "Meaning" (Subjective & Objective).

### 3.1 Collection: `episodic_traces` (Subjective Experience)

Implements **Rashomon Effect**.

  * **Payload:**
      * `owner_id`: Who remembers this? (Subjectivity).
      * `event_id`: **UUID Reference to `event_log.id`** (The Anchor).
      * `mood_at_encoding`: Contextual filter for recall.
      * `summary_text`: The distorted memory.

### 3.2 Collection: `semantic_knowledge` (The Fact Ledger)

Implements **Perfect Recall**.

  * **Payload:**
      * `subject`: "Rebecca"
      * `predicate`: "loves"
      * `object`: "Pizza"
      * `nuance`: "Only thin crust"

-----

## PART 4: SYSTEM LOGIC (The Glue)

### 4.1 The "Graduation" Logic (Population Circles)

  * **Trigger:** If George asks an Extra for a name.
  * **Action:** The system generates a `biological_core` and `psychological_engine` and INSERTs into `entities`.

### 4.2 The "Promise" Loop

  * **Trigger:** Nightly Cron Job.
  * **Action:** Scan `promises` table. If `due_date` passed and state is not `Fulfilled`, invoke Brain 1 to update the `texture` field in `stances` (e.g., add "Resentment").

### 4.3 The "Ticker" Logic (Smart Time) [NEW]

  * **Trigger:** 1-Minute Cron Job (`npm run tick`).
  * **Action:** 1. Read `system_state`.
    2\. If `is_paused = true`, abort.
    3\. If `NOW() >= next_chaos_check_at`, execute Chaos Engine.
    4\. Calculate new random interval (e.g., 8-15 mins) and update `next_chaos_check_at`.

-----

**Status:** The blueprint is finalized. Every abstract concept (Narrative, Groups, Time, Memory) now has a concrete physical location in the database schema. You are ready to build.