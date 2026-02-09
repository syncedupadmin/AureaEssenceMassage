/**
 * Download curated Pexels stock photos and apply brand color grading
 *
 * This script:
 * 1. Downloads high-quality massage therapy photos from Pexels
 * 2. Applies Áurea Essence brand color grading (rose-gold, champagne, warm tones)
 * 3. Outputs processed images ready for the website
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { applyBrandGrading } = require('./process-images');

// Curated Pexels photos - hand-selected for quality and appropriateness
const CURATED_IMAGES = [
  {
    name: 'service-swedish.png',
    url: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Professional Swedish massage session',
  },
  {
    name: 'service-deep-tissue.png',
    url: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Deep tissue massage therapy',
  },
  {
    name: 'service-reflexology.png',
    url: 'https://images.pexels.com/photos/6663461/pexels-photo-6663461.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Reflexology foot massage',
  },
  {
    name: 'service-lymphatic-drainage.png',
    url: 'https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Gentle lymphatic drainage massage',
  },
  {
    name: 'service-post-surgical.png',
    url: 'https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Post-surgical massage therapy',
  },
  {
    name: 'service-couples.png',
    url: 'https://images.pexels.com/photos/3865675/pexels-photo-3865675.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Couples massage experience',
  },
  {
    name: 'service-prenatal.png',
    url: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Prenatal massage therapy',
  },
  {
    name: 'addon-hot-stones.png',
    url: 'https://images.pexels.com/photos/6663447/pexels-photo-6663447.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Hot stone massage therapy',
  },
  {
    name: 'addon-cbd-oil.png',
    url: 'https://images.pexels.com/photos/7262860/pexels-photo-7262860.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'CBD oil wellness product',
  },
  {
    name: 'addon-aromatherapy.png',
    url: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Aromatherapy essential oils',
  },
  {
    name: 'hero-main.png',
    url: 'https://images.pexels.com/photos/6663443/pexels-photo-6663443.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Luxury spa treatment room',
  },
  {
    name: 'hero-about.png',
    url: 'https://images.pexels.com/photos/4506110/pexels-photo-4506110.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Professional massage therapist portrait',
  },
  {
    name: 'hero-events.png',
    url: 'https://images.pexels.com/photos/3865512/pexels-photo-3865512.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Spa event space setup',
  },
  {
    name: 'hero-gift-cards.png',
    url: 'https://images.pexels.com/photos/7525190/pexels-photo-7525190.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Elegant gift presentation',
  },
  {
    name: 'bg-testimonials.png',
    url: 'https://images.pexels.com/photos/6663486/pexels-photo-6663486.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Soft spa background',
  },
];

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${path.basename(filepath)}`);
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Main execution
 */
async function main() {
  const tempDir = path.join(__dirname, '../temp-downloads');
  const outputDir = path.join(__dirname, '../public/images/generated');

  // Create directories
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('=====================================');
  console.log('ÁUREA ESSENCE IMAGE PROCESSOR');
  console.log('Downloading & Processing Stock Photos');
  console.log('=====================================\n');

  let successCount = 0;
  let failCount = 0;

  for (const image of CURATED_IMAGES) {
    try {
      console.log(`\n[${CURATED_IMAGES.indexOf(image) + 1}/${CURATED_IMAGES.length}] ${image.name}`);
      console.log(`  ${image.description}`);

      // Download
      const tempPath = path.join(tempDir, image.name.replace('.png', '.jpg'));
      await downloadImage(image.url, tempPath);
      console.log(`  ✓ Downloaded`);

      // Process with brand color grading
      const outputPath = path.join(outputDir, image.name);
      await applyBrandGrading(tempPath, outputPath);
      console.log(`  ✓ Processed with brand color grading`);

      // Clean up temp file
      fs.unlinkSync(tempPath);

      successCount++;
    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}`);
      failCount++;
    }

    // Small delay to be respectful to Pexels
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Clean up temp directory
  try {
    fs.rmdirSync(tempDir);
  } catch (e) {
    // Ignore errors
  }

  console.log('\n=====================================');
  console.log('PROCESSING COMPLETE');
  console.log('=====================================');
  console.log(`✓ Success: ${successCount} / ${CURATED_IMAGES.length}`);
  if (failCount > 0) {
    console.log(`✗ Failed: ${failCount}`);
  }
  console.log(`\nImages saved to: ${outputDir}`);
  console.log('\n✨ All images have been processed with your brand\'s');
  console.log('   rose-gold, champagne aesthetic!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, CURATED_IMAGES };
