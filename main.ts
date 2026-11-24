import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line: a date-night text where autocorrect swaps one letter and
// turns a bottle of wine into a farm animal.
const PARTS = [
  "Texted my date 'Can't wait for tonight, I'll bring the wine'",
  "— autocorrect sent 'I'll bring the swine' and now she's asking",
  "whether the pig needs a chair.",
];

const ENTRY = PARTS.join(" ");

const chars = [...ENTRY].length;
if (chars < 1 || chars > 199) {
  throw new Error(`entry must be 1-199 characters, got ${chars}`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be only white space");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(import.meta.dirname, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`ok: entry.txt ${chars} chars`);
