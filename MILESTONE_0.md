EXECUTION CANON — MILESTONE 0 — THE WORLD CAN EXIST
Status: Binding / Non-negotiable

0. Purpose
A deployed place exists where invocations are possible and nothing about life is implied.

1. Allowed invocations (HTTP surface)
1.1 GET /health
- Purpose: confirm reachability only.

2. Response truth
2.1 GET /health
- Must return: HTTP 200
- Must return JSON body with exactly these keys:
  - ok: true
  - service_time_utc: string (ISO 8601)
  - version: string (git commit hash or tag)
- Must NOT include:
  - any secrets
  - any connection strings
  - any internal file paths
  - any stack traces

3. Writing rules (ledger discipline)
3.1 Milestone 0 writes NOTHING
- No public text is written.
- No private text is written.
- No identity text is written.
- No world seed text is written.

4. Rereading rules
4.1 Milestone 0 rereads NOTHING
- /health must not access or require past text.

5. Failure posture
5.1 If /health cannot respond cleanly:
- Must return HTTP 500
- Must return JSON with:
  - ok: false
  - error: "unavailable"
- Must NOT leak any internal error details.

6. Proof by curl (only acceptable verification)
Assume:
- BASE=https://<your-deployed-domain>

6.1 Reachability proof
curl -i "$BASE/health"

Expected:
- HTTP/1.1 200
- JSON contains: ok:true, service_time_utc, version

7. Forbidden improvisations
- No “welcome” text.
- No automatic seed data.
- No “test message” written anywhere.
- No background activity of any kind.