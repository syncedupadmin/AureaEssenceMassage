/**
 * Image Processing Script for Áurea Essence Massage
 *
 * Applies brand-specific color grading to stock photos:
 * - Warm rose-gold tint
 * - Champagne color cast
 * - Soft, elegant aesthetic
 * - Consistent luxury spa feel
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Brand color palette
const BRAND_COLORS = {
  roseGold: { r: 183, g: 110, b: 121 },      // #B76E79
  champagne: { r: 250, g: 246, b: 240 },     // #FAF6F0
  warmGold: { r: 201, g: 169, b: 110 },      // #C9A96E
};

/**
 * Apply brand-specific color grading to an image
 */
async function applyBrandGrading(inputPath, outputPath) {
  console.log(`Processing: ${path.basename(inputPath)}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Apply brand color grading pipeline
    await image
      // 1. Boost warmth and saturation for rose-gold aesthetic
      .modulate({
        brightness: 1.08,     // Slightly brighter
        saturation: 1.15,     // Boost saturation for rich colors
        hue: 10,              // Shift toward warm/rose tones
      })
      // 2. Apply subtle warm color overlay
      .composite([{
        input: await createWarmOverlay(metadata.width, metadata.height),
        blend: 'overlay',
      }])
      // 3. Soft vignette for luxury feel
      .composite([{
        input: await createVignette(metadata.width, metadata.height),
        blend: 'multiply',
      }])
      // 4. Enhance contrast for depth
      .linear(1.1, -3)
      // 5. Subtle sharpening
      .sharpen({ sigma: 0.5 })
      // 6. Convert to sRGB color space
      .toColorspace('srgb')
      // 7. Optimize and save
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ Saved: ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(2)} KB)`);

    return true;
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

/**
 * Create a soft vignette overlay
 */
async function createVignette(width, height) {
  const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="vignette">
          <stop offset="50%" stop-color="white" stop-opacity="0" />
          <stop offset="100%" stop-color="black" stop-opacity="0.12" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#vignette)" />
    </svg>
  `;
  return Buffer.from(svg);
}

/**
 * Create a warm rose-gold overlay
 */
async function createWarmOverlay(width, height) {
  // Rose-gold warm tint: #F5E6E8 (very subtle)
  const svg = `
    <svg width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="rgb(245, 230, 232)" opacity="0.08" />
    </svg>
  `;
  return Buffer.from(svg);
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Process all images in a directory
 */
async function processDirectory(inputDir, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`\nProcessing ${files.length} images...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|webp)$/i, '.png'));

    const success = await applyBrandGrading(inputPath, outputPath);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n✓ Processing complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
}

/**
 * Process curated stock images with URLs
 */
async function processCuratedImages() {
  const tempDir = path.join(__dirname, '../temp-downloads');
  const outputDir = path.join(__dirname, '../public/images/generated');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Curated Pexels image URLs (will be populated)
  const imageUrls = {
    'service-swedish.png': 'PLACEHOLDER_URL',
    'service-deep-tissue.png': 'PLACEHOLDER_URL',
    // ... more images
  };

  console.log('Manual processing mode - use processDirectory() instead');
  console.log('Download your stock photos to temp-downloads/ folder first');
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node process-images.js <input-dir> <output-dir>');
    console.log('  node process-images.js process-temp');
    console.log('\nExample:');
    console.log('  node process-images.js ./temp-downloads ./public/images/generated');
    process.exit(1);
  }

  if (args[0] === 'process-temp') {
    const inputDir = path.join(__dirname, '../temp-downloads');
    const outputDir = path.join(__dirname, '../public/images/generated');
    processDirectory(inputDir, outputDir);
  } else if (args.length >= 2) {
    const [inputDir, outputDir] = args;
    processDirectory(inputDir, outputDir);
  }
}

module.exports = {
  applyBrandGrading,
  processDirectory,
  downloadImage,
};
