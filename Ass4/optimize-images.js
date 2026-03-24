const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: 60 })
            .toFile(outputPath);
        console.log(`Optimized ${inputPath} -> ${outputPath}`);
    } catch (err) {
        console.error(`Error processing ${inputPath}:`, err.message);
    }
}

async function run() {
    const images = ['image1', 'image2', 'image3'];
    for (const img of images) {
        const inputPath = path.join(__dirname, `unoptimized/images/${img}.jpg`);
        const outputPath = path.join(__dirname, `optimized/images/${img}.webp`);

        // Check if input exists
        if (!fs.existsSync(inputPath)) {
            console.error(`Input file not found: ${inputPath}`);
            continue;
        }

        await processImage(inputPath, outputPath);
    }
}

run();
