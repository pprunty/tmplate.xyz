import { MetadataRoute } from 'next';
import config from './config'; // Adjust the path based on your project structure

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${config.productionUrl}/sitemap.xml`,
  };
}
