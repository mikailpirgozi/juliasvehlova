#!/bin/bash
# Compress Instagram videos for web usage
# Target: 540px short side, CRF 28, no audio, ~1-3MB per video
# Also generates WebP poster thumbnails

set -euo pipefail

SOURCE_DIR="/Users/mikailpirgozi/Downloads/Videá na web "
OUTPUT_DIR="/Users/mikailpirgozi/Projects/Juliasvehlova/public/videos/instagram"

mkdir -p "$OUTPUT_DIR"

i=1
total=0

# Count total files first
for file in "$SOURCE_DIR"/*.MP4 "$SOURCE_DIR"/*.MOV "$SOURCE_DIR"/*.mov; do
  [ -f "$file" ] || continue
  total=$((total + 1))
done

echo "Starting video compression ($total videos)..."
echo "Source: $SOURCE_DIR"
echo "Output: $OUTPUT_DIR"
echo ""

for file in "$SOURCE_DIR"/*.MP4 "$SOURCE_DIR"/*.MOV "$SOURCE_DIR"/*.mov; do
  [ -f "$file" ] || continue
  
  filename=$(basename "$file")
  output_name="reel-${i}"
  
  # Skip if already compressed
  if [ -f "$OUTPUT_DIR/${output_name}.mp4" ]; then
    echo "[$i/$total] SKIP (exists): $output_name.mp4"
    i=$((i + 1))
    continue
  fi
  
  original_size=$(du -h "$file" | cut -f1)
  echo "[$i/$total] $filename ($original_size)"
  
  # Get video dimensions
  width=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=width -of csv=p=0 "$file")
  height=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=height -of csv=p=0 "$file")
  
  # Scale: 540px on short side
  if [ "$width" -gt "$height" ]; then
    scale_filter="scale=-2:540"
  else
    scale_filter="scale=540:-2"
  fi
  
  # Compress MP4
  ffmpeg -y -i "$file" \
    -vf "$scale_filter" \
    -c:v libx264 \
    -crf 28 \
    -preset slow \
    -profile:v main \
    -level 3.1 \
    -pix_fmt yuv420p \
    -an \
    -movflags +faststart \
    -threads 0 \
    "$OUTPUT_DIR/${output_name}.mp4" \
    2>/dev/null
  
  # Generate WebP poster thumbnail (frame at 2 seconds)
  ffmpeg -y -i "$file" \
    -ss 2 \
    -vframes 1 \
    -vf "$scale_filter" \
    -c:v libwebp \
    -quality 75 \
    "$OUTPUT_DIR/${output_name}-poster.webp" \
    2>/dev/null || \
  ffmpeg -y -i "$file" \
    -ss 0 \
    -vframes 1 \
    -vf "$scale_filter" \
    -c:v libwebp \
    -quality 75 \
    "$OUTPUT_DIR/${output_name}-poster.webp" \
    2>/dev/null
  
  compressed_size=$(du -h "$OUTPUT_DIR/${output_name}.mp4" | cut -f1)
  poster_size=$(du -h "$OUTPUT_DIR/${output_name}-poster.webp" | cut -f1)
  echo "  -> MP4: $compressed_size | Poster: $poster_size"
  
  i=$((i + 1))
done

echo ""
echo "=== SUMMARY ==="
echo "Compressed files:"
ls -lh "$OUTPUT_DIR"/
echo ""
total_size=$(du -sh "$OUTPUT_DIR" | cut -f1)
echo "Total output size: $total_size"
echo "Done!"
