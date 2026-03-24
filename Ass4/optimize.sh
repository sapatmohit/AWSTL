#!/bin/bash
set -e

echo "Starting optimization process..."

# Create the optimized directory structure
mkdir -p optimized/images

echo "1. Installing dependencies for optimization tools..."
npm init -y > /dev/null
npm install sharp clean-css-cli terser > /dev/null

echo "2. Optimizing images (Converting to WebP and compressing)..."
node optimize-images.js

echo "3. Minifying CSS..."
npx clean-css-cli -o optimized/style.min.css unoptimized/style.css

echo "4. Minifying JavaScript..."
npx terser unoptimized/script.js -o optimized/script.min.js --compress --mangle

echo "Optimization process complete!"
echo "Check the 'optimized' directory for the minified assets and compressed images."
