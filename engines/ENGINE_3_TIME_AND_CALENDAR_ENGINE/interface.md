# /engines/ENGINE_3_TIME_AND_CALENDAR_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 3
ENGINE NAME: TIME & CALENDAR ENGINE

This file defines the ONLY permitted boundary for Engine 3.
Engine 3 defines what time *is* in the system, and nothing else.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 3 exists to define, advance, and expose **objective world time**.

Time in the system:
- is singular,
- is monotonic,
- is mechanically advanced,
- is not narrative,
- does not imply events.

Engine 3 enforces the rule:
**time passing does not cause things to happen**.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 3 exclusively owns:

1. World clock definition
- Canonical world time representation.
- Timezone handling rules.
- Formatting rules for created_at_world.

2. Time advancement mechanics
- When time advances.
- By how much time advances.
- Explicit pauses and resumes.

3. Calendar mapping
- Mapping world time to calendar representations (day/date/hour/minute).
- Mechanical calendar objects (days, dates), not narrative meaning.

4. Explicit operator time declarations
- Accepting declared world time overrides from invocation envelopes.
- Recording them as binding constraints (not “corrections”).

Engine 3 is the ONLY engine allowed to change world time.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 3 does NOT own:

- Reality creation (Engine 0).
- Beat boundaries (Engine 2).
- Narrative pacing or “later that day” shortcuts.
- Scene transitions (Engine 5).
- Event causality.
- Knowledge, memory, or recall.
- Rendering or UI formatting.
- Interpretation of “what time feels like.”

Engine 3 knows time, not story.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 3 accepts ONLY:

A) Beat boundary notifications
- Internal mechanical signal from Engine 2 indicating a beat boundary.

B) Explicit time declarations
- From `/contracts/invocation_envelope.md`
- Specifically: declared_overrides.time.*

No other inputs are permitted.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 3 emits ONLY:

A) Canonical world time string
- Used as created_at_world in WriteEntry.

B) Calendar view objects (mechanical)
- Used by Projection Engine for pocket display.
- Not authoritative world facts by themselves.

Engine 3 MUST NOT emit:
- WriteEntry
- WriteBundle
- Narrative text
- ProjectionOutput

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `get_current_time() -> iso_string`
- Returns current world time.

### 5.2 `advance_time(delta) -> new_time`
- Mechanically advances time.

### 5.3 `set_time_override(time_declaration) -> new_time`
- Sets time based on operator declaration.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 3 may call:
- Engine 11 (Infrastructure) - for persisting clock state.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 3 must NEVER call:
- Engine 9 (LLM Writer).
- Engine 0 (Reality Ledger).
- Engine 12 (Projection).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 3 may read:
- Its own clock state.
- Time overrides in Invocation Envelope.

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 3 must NEVER read:
- Ledger content.
- Narrative context.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Invalid Time Format**: Error.
- **Negative Time Delta**: Error (time moves forward).

