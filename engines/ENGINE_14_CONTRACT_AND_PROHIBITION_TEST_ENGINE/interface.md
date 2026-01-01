# /engines/ENGINE_14_CONTRACT_AND_PROHIBITION_TEST_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 14
ENGINE NAME: CONTRACT & PROHIBITION TEST ENGINE (NON-RUNTIME)

This file defines the ONLY permitted boundary for Engine 14.
Engine 14 enforces law mechanically.
It replaces trust with tests.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 14 exists to ensure:
- contracts are real,
- prohibitions are enforceable,
- violations are impossible to ignore.

Engine 14 is the constitutional court.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 14 exclusively owns:

1. Contract tests
- Validation of every contract shape.
- Rejection of invalid payloads.

2. Prohibition tests
- Tests that assert forbidden behavior cannot occur.
- Tests that assert silence, failure, and no-op are valid outcomes.

3. CI enforcement
- Blocking merges on any failure.
- Ensuring coverage remains complete.

Engine 14 is the ONLY engine allowed to declare the system “constitutionally compliant.”

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 14 does NOT own:

- Runtime logic.
- Storage.
- Content generation.
- Interpretation of intent.
- Posture definition (Engine 13).

Engine 14 enforces rules; it does not invent them.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 14 accepts ONLY:

A) Contract definitions
B) Engine interfaces
C) Runtime code artifacts
D) Test cases

Engine 14 does NOT accept runtime data.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 14 emits ONLY:

A) PASS / FAIL results
B) Detailed violation reports

Engine 14 MUST NOT emit:
- Runtime artifacts
- Suggestions
- Auto-corrections

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `run_contract_tests() -> PASS|FAIL`
- Validates all contract shapes.

### 5.2 `run_prohibition_tests() -> PASS|FAIL`
- Asserts forbidden behaviors are impossible.

### 5.3 `run_full_suite() -> PASS|FAIL`
- Runs all tests.
- Required before any deployment.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 14 may call:
- All engines (via test harness) to verify behavior.

----------------------------------------------------------------------

## 7) FORBIDDEN CALLS (EXPLICIT PROHIBITIONS)

Engine 14 must NEVER call:
- None (it is the test engine).

----------------------------------------------------------------------

## 8) ALLOWED DATA ACCESS (READ SCOPE)

Engine 14 may read:
- Everything (it is the auditor).

----------------------------------------------------------------------

## 9) FORBIDDEN DATA ACCESS (READ PROHIBITIONS)

Engine 14 must NEVER read:
- None.

----------------------------------------------------------------------

## 10) FAILURE MODES (MECHANICAL RESPONSE)

- **Test Failure**: Block everything.

