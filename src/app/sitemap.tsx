import { MetadataRoute } from 'next';
import config from './config'; // Adjust the path based on your project structure

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: config.productionUrl,
      lastModified: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
  ];

  // Combine all sitemap entries
  const sitemap = [...staticPages];

  return sitemap;
}
