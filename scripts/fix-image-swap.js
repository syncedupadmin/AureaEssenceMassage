/**
 * Fix image swap - Image 3 for Swedish, Image 4 for Deep Tissue
 */

const { applyBrandGrading } = require('./process-images');
const path = require('path');

async function main() {
  const downloadsDir = 'C:\\Users\\nicho\\Downloads\\aurea pics';
  const outputDir = path.join(__dirname, '../public/images/generated');

  const mappings = [
    {
      source: path.join(downloadsDir, 'pexels-olia-danilevich-9335980.jpg'),
      output: path.join(outputDir, 'service-swedish.png'),
      description: 'Swedish Massage (Image 3 - therapist in black)',
    },
    {
      source: path.join(downloadsDir, 'pexels-anntarazevich-6560304.jpg'),
      output: path.join(outputDir, 'service-deep-tissue.png'),
      description: 'Deep Tissue Massage (Image 4 - overhead back massage)',
    },
  ];

  console.log('Swapping Swedish and Deep Tissue images...\n');

  for (const mapping of mappings) {
    console.log(`Processing: ${mapping.description}`);
    await applyBrandGrading(mapping.source, mapping.output);
    console.log(`✓ Saved: ${path.basename(mapping.output)}\n`);
  }

  console.log('✅ Images swapped successfully!');
}

main().catch(console.error);
