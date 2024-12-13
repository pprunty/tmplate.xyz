import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config'; // Adjust the path based on your project structure

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    // Add other static pages if necessary
  ];

  // Combine all sitemap entries
  const sitemap = [...staticPages];

  return sitemap;
}
