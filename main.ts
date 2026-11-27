import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// v1 (draft, revised below):
// "I'm sorry I turned your letter to your grandmother into a quarterly
// performance review with bullet points and a call to action."
// v2 (final): sharper payoff — the KPI and the polite request for grandma
// to "circle back" make the corporate flattening concrete, and the joke
// lands on something an assistant really does: professionalising the intimate.
const LINE =
  "I'm sorry I turned your letter to your grandmother into a quarterly performance review, complete with bullet points, a KPI, and a polite request for her to circle back.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
const terminators = (LINE.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
