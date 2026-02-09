/**
 * Update post-surgical massage image
 */

const { applyBrandGrading } = require('./process-images');
const path = require('path');

async function main() {
  const sourceImage = 'C:\\Users\\nicho\\Downloads\\368DA501-B649-407A-85E1-106706863602.jpeg';
  const outputImage = path.join(__dirname, '../public/images/generated/service-post-surgical.png');

  console.log('Updating post-surgical massage image...\n');
  console.log('Source: Professional post-surgical massage with gloves');

  await applyBrandGrading(sourceImage, outputImage);

  console.log('✓ Post-surgical image updated successfully!\n');
}

main().catch(console.error);
