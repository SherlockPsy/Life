EXECUTION CANON — MILESTONE 5 — PRIVATE LEARNING EXISTS (INVISIBLE)
Status: Binding / Non-negotiable

0. Purpose
Agents may internally register things they learn without those things appearing on screen.

This milestone introduces private text without changing visible behaviour.

1. Required invocations (HTTP surface)
No new invocations.

Carries over unchanged:
- POST /say
- POST /beat
- GET /public/latest

2. New writing domain
2.1 Private Ledger Entries
A private ledger entry is:
- text
- attributed to exactly one agent
- never shown directly
- never returned in any HTTP response

2.2 When private entries MAY be written
During any invocation that produces public text:
- The system MAY also write zero or more private ledger entries
- Each entry must be attributable to a specific agent

Example (non-exhaustive):
- Rebecca learns something about George
- Rebecca notices a pattern
- Rebecca forms or reinforces a disposition

2.3 When private entries MUST NOT be written
- If no public block is written, no private entry may be written
- Private entries must never be written alone

3. Visibility rules
3.1 Private entries:
- MUST NOT appear in:
  - POST /say responses
  - POST /beat responses
  - GET /public/latest
- MUST NOT be inferable by structure, counts, or metadata

4. Writing discipline
4.1 Write-before-show still applies
- If a public block exists, it must be committed before any response
- Private entries must also be committed before response if written

4.2 Append-only rule
- Private entries are append-only
- Never updated
- Never deleted (at this milestone)

5. Rereading rules
5.1 Private rereading is allowed ONLY for the owning agent
- Rebecca may reread Rebecca’s private entries
- George has no access to Rebecca’s private entries

5.2 No cross-agent leakage
- Private text of one agent must never influence another agent’s output unless it later appears publicly

6. Proof by curl
There is no direct curl proof.
Proof is indirect:
- Behaviour must not change observably
- System must remain correct if private writing is disabled

7. Forbidden improvisations
- No “memory summaries”
- No categorisation of private entries
- No flags like “important” or “long-term”
- No querying private entries via HTTP