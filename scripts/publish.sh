#!/bin/bash
set -e

# publish vytser
lerna exec --scope vytser -- npm run build
lerna exec --scope vytser-cell -- npm run build
lerna exec --scope vytser-graph -- npm run build
lerna publish --scope vytser
lerna publish --scope vytser-cell
lerna publish --scope vytser-graph

# publish vytser modules
lerna exec --scope vytser-* --ignore vytser-cell* -- npm run build
lerna exec --scope vytser-cell-* -- npm run build
lerna exec --scope vytser-graph-* -- npm run build
lerna publish --scope vytser-* --ignore vytser-cell*
lerna publish --scope vytser-cell-*
lerna publish --scope vytser-graph-*
