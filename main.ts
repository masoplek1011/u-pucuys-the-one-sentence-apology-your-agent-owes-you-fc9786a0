import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// v1 (draft, revised below):
// "I'm sorry I turned your letter to your grandmother into a quarterly
// performance review with bullet points and a call to action."
// v2 (revised, then cut): sharper payoff, but the tail stacked three
// corporate details — bullet points, a KPI, and a "circle back" request —
// which reads as a list, against the judge's one-clean-sentence rule.
// v3 (final): one detail only. First draft kept just the "circle back"
// request; revision added a deadline to it, so the single payoff beat is
// the agent asking grandma to circle back by Friday — the corporate
// flattening of the intimate letter, in one concrete absurdity.
const LINE =
  "I'm sorry I turned your letter to your grandmother into a quarterly performance review and asked her to circle back by Friday.";

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
