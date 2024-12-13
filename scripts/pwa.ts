import { generatePwaIcons } from '../src/utils/generateIcons'; // Adjust the path as needed
import { updateManifest } from '../src/utils/updateManifest'; // Adjust the path to match your project structure

(async () => {
  try {
    // Call the generatePwaIcons function
    await generatePwaIcons('public/icon.webp');
    console.log('✅ PWA icons generated successfully!');

    // Call the updateManifest function
    await updateManifest();
    console.log('✅ Manifest updated successfully!');
  } catch (error) {
    console.error('❌ Error in the script:', error);
  }
})();
