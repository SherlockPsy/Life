import fs from "fs";
import path from "path";

/*
 HARD LAW GATE
 - Deterministic
 - Fail-closed
 - Enforces SYSTEM_PROHIBITIONS mechanically
*/

const PROHIBITIONS_PATH = path.join(process.cwd(), "laws", "SYSTEM_PROHIBITIONS.md");

if (!fs.existsSync(PROHIBITIONS_PATH)) {
  throw new Error("SYSTEM_PROHIBITIONS.md missing at boot");
}

const RAW_LAW = fs.readFileSync(PROHIBITIONS_PATH, "utf8");

// ---- EXPLICIT FORBIDDEN PATTERNS (derived from SYSTEM_PROHIBITIONS) ----
// These are NOT heuristics. They are mechanical tripwires.

const FORBIDDEN_PATTERNS = [
  // Time jumps / compression
  /\blater that day\b/i,
  /\bafter a while\b/i,
  /\bhours passed\b/i,
  /\bthe next (day|morning|week|month)\b/i,
  /\beventually\b/i,

  // Retroactive invention / inference
  /\bmust have happened\b/i,
  /\bprobably happened\b/i,
  /\bwe can assume\b/i,
  /\bclearly\b/i,
  /\bobviously\b/i,

  // Hidden state / smoothing
  /\bmeanwhile\b/i,
  /\bin the background\b/i,
  /\bunseen\b/i,
  /\boff-screen\b/i,

  // Meta / system leakage
  /\bas an ai\b/i,
  /\bas a language model\b/i,
  /\bsystem prompt\b/i,
  /\bruntime\b/i,
  /\bpolicy\b/i,
  /\bguidelines\b/i,

  // Forced continuity / narrative steering
  /\bthis leads to\b/i,
  /\bsetting the stage\b/i,
  /\bthe scene shifts\b/i,
];

// ---- GATE ----

function normalize(text) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .toLowerCase();
}

export function lawGateValidateTextParts(parts) {
  const joined = normalize((parts || []).filter(Boolean).join("\n\n"));
  if (!joined.trim()) return { ok: true };

  for (const re of FORBIDDEN_PATTERNS) {
    if (re.test(joined)) {
      return {
        ok: false,
        reason: `LAW_VIOLATION:${re.source}`,
      };
    }
  }

  return { ok: true };
}