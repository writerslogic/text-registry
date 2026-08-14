# WritersLogic Text Registry

Public, rebuildable C2PA text soft-binding manifests. Fingerprints and signatures only — never user text.

This registry is a plain git repository, not a database. Publishing and verifying provenance records here costs nothing to run at any scale: every manifest is a file, every update is a commit, and the discovery index is derived data anyone can regenerate from the manifests alone.

## How it works

1. A manifest (`*.c2pa`) is committed under `manifests/`. Each one carries a content ID (`cid`), a signer identity (`did`), an optional discovery `pointer`, and a set of locality-sensitive `bands` for near-duplicate matching — no source text.
2. A GitHub Action (`.github/workflows/aggregate.yml`) runs `scripts/aggregate.mjs` on every push to `manifests/**`, rebuilding `aggregator.json`: `bands` (band-hash → content IDs), `pointers` (pointer → content IDs), and `manifests` (content ID → signer identity).
3. `aggregator.json` is pure derived data — delete it and rerun the script against `manifests/` and you get the same file back. Nothing here depends on a server staying up.

## Verifying a record

Clone or fetch this repo and look up a content ID directly in `aggregator.json`, or walk `manifests/` for the raw `.c2pa` file. There is no API to trust — the registry is the same files you're reading.

## License

AGPL-3.0. Fork it, self-host it, rebuild the aggregator yourself — that's the point of publishing it this way.
