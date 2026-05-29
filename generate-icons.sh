#!/bin/bash
# Regenerate PWA icons as real PNG files (required for install — JPEG-as-.png breaks Chrome).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC="${1:-$ROOT/public/icon-source.png}"
PUBLIC="$ROOT/public"

if [[ ! -f "$SRC" ]]; then
  echo "Source image not found: $SRC"
  echo "Place a square PNG/JPEG at public/icon-source.png or pass a path argument."
  exit 1
fi

sips -s format png "$SRC" --out "$PUBLIC/icon-512.png" >/dev/null
sips -z 512 512 "$PUBLIC/icon-512.png" --out "$PUBLIC/icon-512.png" >/dev/null
sips -z 192 192 "$PUBLIC/icon-512.png" --out "$PUBLIC/icon-192.png" >/dev/null
sips -z 180 180 "$PUBLIC/icon-512.png" --out "$PUBLIC/icon-180.png" >/dev/null
sips -z 32 32 "$PUBLIC/icon-512.png" --out "$PUBLIC/favicon-32.png" >/dev/null

echo "Wrote real PNG icons to $PUBLIC/"
file "$PUBLIC"/icon-*.png "$PUBLIC"/favicon-32.png
