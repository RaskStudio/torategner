#!/usr/bin/env bash
#
# Laver to versioner af hver .mp4 i src/assets/:
#
#   thumbs/  720px, CRF 30, INGEN lyd  -> lille autoplay-preview (muted)
#   full/    original video kopieres 1:1 (nul kvalitetstab) + mono lyd -> lightbox
#
# Originalerne i src/assets/ røres IKKE.
#
# Brug:  bash scripts/compress-videos.sh
#
set -euo pipefail

SRC_DIR="src/assets"
THUMB_DIR="src/assets/thumbs"
FULL_DIR="src/assets/full"

mkdir -p "$THUMB_DIR" "$FULL_DIR"

printf "%-32s %10s %10s %10s\n" "FIL" "ORIGINAL" "THUMB" "FULL"
printf -- "----------------------------------------------------------------\n"

shopt -s nullglob
for input in "$SRC_DIR"/*.mp4; do
  name="$(basename "$input")"

  # Lille preview uden lyd
  ffmpeg -y -loglevel error -i "$input" \
    -vf "scale=w=720:h=720:force_original_aspect_ratio=decrease:force_divisible_by=2" \
    -c:v libx264 -crf 30 -preset slow -movflags +faststart \
    -an \
    "$THUMB_DIR/$name"

  # Fuld kvalitet: kopier original video uændret, læg kun mono lyd på
  ffmpeg -y -loglevel error -i "$input" \
    -c:v copy -movflags +faststart \
    -c:a aac -b:a 128k -ac 1 \
    "$FULL_DIR/$name"

  printf "%-32s %10s %10s %10s\n" "$name" \
    "$(du -h "$input" | cut -f1)" \
    "$(du -h "$THUMB_DIR/$name" | cut -f1)" \
    "$(du -h "$FULL_DIR/$name" | cut -f1)"
done

printf -- "----------------------------------------------------------------\n"
echo "Færdig."
echo "  Thumbs (preview): $THUMB_DIR/"
echo "  Full (lightbox):  $FULL_DIR/"
