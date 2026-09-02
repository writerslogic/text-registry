<!-- repo-header:start -->
<img src="https://github.com/writerslogic.png?size=160" alt="WritersLogic Text Registry logo" width="120" align="left">

<h1>WritersLogic Text Registry</h1>

<p><strong>Project documentation and resources for Text Registry.</strong></p>

<br clear="left">

[![CI](https://img.shields.io/github/actions/workflow/status/writerslogic/text-registry/aggregate.yml?style=flat-square&labelColor=20232a&branch=main&label=CI)](https://github.com/writerslogic/text-registry/actions/workflows/aggregate.yml) [![Best Practices Evidence](https://img.shields.io/badge/best%20practices-evidence%20reviewed-6a4c93?style=flat-square&labelColor=20232a)](.bestpractices.json) [![License](https://img.shields.io/github/license/writerslogic/text-registry?style=flat-square&labelColor=20232a&color=007ec6&label=license)](https://github.com/writerslogic/text-registry/blob/main/LICENSE) [![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Sponsor-EA4AAA?style=flat-square&labelColor=20232a)](https://github.com/sponsors/dcondrey)
<!-- repo-header:end -->

This registry is a plain git repository, not a database. Publishing and verifying provenance records here costs nothing to run at any scale: every manifest is a file, every update is a commit, and the discovery index is derived data anyone can regenerate from the manifests alone.

## How it works

1. A manifest (`*.c2pa`) is committed under `manifests/`. Each one carries a content ID (`cid`), a signer identity (`did`), an optional discovery `pointer`, and a set of locality-sensitive `bands` for near-duplicate matching — no source text.
2. A GitHub Action (`.github/workflows/aggregate.yml`) runs `scripts/aggregate.mjs` on every push to `manifests/**`, rebuilding `aggregator.json`: `bands` (band-hash → content IDs), `pointers` (pointer → content IDs), and `manifests` (content ID → signer identity).
3. `aggregator.json` is pure derived data — delete it and rerun the script against `manifests/` and you get the same file back. Nothing here depends on a server staying up.

## Verifying a record

Clone or fetch this repo and look up a content ID directly in `aggregator.json`, or walk `manifests/` for the raw `.c2pa` file. There is no API to trust — the registry is the same files you're reading.

## License

AGPL-3.0. Fork it, self-host it, rebuild the aggregator yourself — that's the point of publishing it this way.
