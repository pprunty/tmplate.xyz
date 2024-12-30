// config.ts
import config from '../app.config.json';

export const PRODUCTION_URL = config.productionUrl;

export const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : PRODUCTION_URL;

export const layout = config.layout;

export const GA_MEASUREMENT_ID = config.analytics.gaMeasurementId;
export const VERCEL_ANALYTICS = config.analytics.useVercelAnalytics;
export const SEO = config.seo;
export const LAYOUT = config.layout;
export const BRANDING = config.layout.branding.logo_svg_path;
