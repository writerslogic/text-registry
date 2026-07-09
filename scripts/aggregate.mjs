// Rebuild the discovery aggregator from all published manifests.
// band-hash -> [cid], pointer -> [cid], cid -> did. Pure derived data.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const bands = {}, pointers = {}, manifests = {};
function walk(dir) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".c2pa")) {
      try {
        const r = JSON.parse(readFileSync(p, "utf8"));
        if (!r.cid) continue;
        manifests[r.cid] = r.did ?? null;
        for (const b of r.bands ?? []) (bands[b] ??= []).push(r.cid);
        if (r.pointer) (pointers[r.pointer] ??= []).push(r.cid);
      } catch {}
    }
  }
}
walk("manifests");
writeFileSync("aggregator.json", JSON.stringify({ version: 1, bands, pointers, manifests }));
console.log(`aggregated ${Object.keys(manifests).length} manifests, ${Object.keys(bands).length} band keys`);
