/**
 * Process user's downloaded images with brand color grading
 */

const { applyBrandGrading } = require('./process-images');
const path = require('path');
const fs = require('fs');

async function main() {
  const downloadsDir = 'C:\\Users\\nicho\\Downloads\\aurea pics';
  const outputDir = path.join(__dirname, '../public/images/generated');

  // Image mappings: source file -> output name
  const mappings = [
    {
      source: path.join(downloadsDir, 'pexels-anete-lusina-5240677.jpg'),
      output: path.join(outputDir, 'service-reflexology.png'),
      description: 'Reflexology foot massage',
    },
    {
      source: path.join(downloadsDir, 'pexels-anntarazevich-6560304.jpg'),
      output: path.join(outputDir, 'service-swedish.png'),
      description: 'Swedish back massage',
    },
    {
      source: path.join(downloadsDir, 'pexels-olia-danilevich-9335980.jpg'),
      output: path.join(outputDir, 'service-post-surgical.png'),
      description: 'Post-surgical massage therapy',
    },
    {
      source: path.join(downloadsDir, 'hands-massaging-female-abdomen-therapist-applying-pressure-belly.jpg'),
      output: path.join(outputDir, 'service-lymphatic-drainage.png'),
      description: 'Lymphatic drainage abdominal massage',
    },
    {
      source: path.join(downloadsDir, 'Gemini_Generated_Image_a2vllqa2vllqa2vl.png'),
      output: path.join(outputDir, 'service-couples.png'),
      description: 'Couples massage',
    },
    {
      source: path.join(downloadsDir, 'Gemini_Generated_Image_jd3hkwjd3hkwjd3h.png'),
      output: path.join(outputDir, 'service-prenatal.png'),
      description: 'Prenatal massage',
    },
  ];

  console.log('=====================================');
  console.log('PROCESSING USER IMAGES');
  console.log('Applying brand color grading');
  console.log('=====================================\n');

  let successCount = 0;
  let failCount = 0;

  for (const mapping of mappings) {
    try {
      console.log(`Processing: ${mapping.description}`);

      if (!fs.existsSync(mapping.source)) {
        throw new Error(`Source file not found: ${mapping.source}`);
      }

      await applyBrandGrading(mapping.source, mapping.output);
      console.log(`✓ Saved: ${path.basename(mapping.output)}\n`);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed: ${mapping.description}`);
      console.error(`  Error: ${error.message}\n`);
      failCount++;
    }
  }

  console.log('=====================================');
  console.log('PROCESSING COMPLETE');
  console.log('=====================================');
  console.log(`Success: ${successCount} / ${mappings.length}`);
  if (failCount > 0) {
    console.log(`Failed: ${failCount}`);
  }
  console.log('\n✨ Images processed with rose-gold champagne aesthetic!');
}

main().catch(console.error);
