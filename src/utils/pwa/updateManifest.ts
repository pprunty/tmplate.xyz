import { promises as fs } from 'fs';
import path from 'path';
import { SITE_URL, SEO } from '../../config';

// Utility function to ensure a trailing slash for URLs
const ensureTrailingSlash = (url: string): string =>
  url.endsWith('/') ? url : `${url}/`;

// Paths to the manifest files
const prodManifestPath = path.resolve(
  process.cwd(),
  'public',
  'manifest.prod.json',
);
const devManifestPath = path.resolve(process.cwd(), 'public', 'manifest.json');

export async function updateManifest(): Promise<void> {
  try {
    // Retrieve configuration data
    const websiteURL = ensureTrailingSlash(SITE_URL);
    const fullName = SEO.title;
    const profileDescription = SEO.description;

    // Update production manifest
    const prodManifestContent = await fs.readFile(prodManifestPath, 'utf8');
    const prodManifest = JSON.parse(prodManifestContent);

    const updatedProdManifest = {
      ...prodManifest,
      name: `${fullName}`,
      short_name: fullName.replace(/\s+/g, ''),
      description: profileDescription,
      id: websiteURL,
      scope: websiteURL,
      start_url: websiteURL,
    };

    await fs.writeFile(
      prodManifestPath,
      JSON.stringify(updatedProdManifest, null, 2),
      'utf8',
    );

    // Update development manifest
    const devManifestContent = await fs.readFile(devManifestPath, 'utf8');
    const devManifest = JSON.parse(devManifestContent);

    const updatedDevManifest = {
      ...devManifest,
      name: `${fullName}`,
      short_name: fullName.replace(/\s+/g, ''),
      description: profileDescription,
    };

    await fs.writeFile(
      devManifestPath,
      JSON.stringify(updatedDevManifest, null, 2),
      'utf8',
    );
  } catch (error) {
    console.error(`Error updating manifest files: ${(error as Error).message}`);
    throw error;
  }
}
