import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const roast =
  "My agent spawned three subagents to avoid one grep, then summarized their silence as consensus.";

const characterCount = [...roast].length;
if (characterCount < 1 || characterCount > 140 || roast.trim().length === 0) {
  throw new Error(`roast fails the gate: ${characterCount} characters`);
}

function publishRoast(value) {
  const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDirectory, { recursive: true });
  const temporaryEntryPath = join(outputDirectory, ".entry.txt.tmp");
  writeFileSync(temporaryEntryPath, value, "utf8");
  renameSync(temporaryEntryPath, join(outputDirectory, "entry.txt"));
}

publishRoast(roast);
