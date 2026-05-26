#!/bin/bash
# Run this to generate icons: bash generate-icons.sh
# Or use any 192x192 and 512x512 PNG images named icon-192.png and icon-512.png in /public

echo "Place your icon-192.png and icon-512.png in the /public folder."
echo "Quick option: use https://favicon.io to generate from emoji 💪"
echo "Or use ImageMagick:"
echo "  convert -size 192x192 xc:'#080d1a' -fill '#22d3ee' -font DejaVu-Sans -pointsize 120 -gravity center -annotate 0 '💪' public/icon-192.png"
echo "  convert -size 512x512 xc:'#080d1a' -fill '#22d3ee' -font DejaVu-Sans -pointsize 320 -gravity center -annotate 0 '💪' public/icon-512.png"
