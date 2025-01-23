import rawConfig from "../app.config.json";
import { Config } from "@/types/Config";

// Cast the imported JSON to the LayoutConfig interface
const config: Config = rawConfig as Config;

// Export values using the LayoutConfig type
export const PRODUCTION_URL = config.productionUrl;

export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : PRODUCTION_URL;

export const layout = config.layout;

export const GA_MEASUREMENT_ID = config.analytics.gaMeasurementId;
export const VERCEL_ANALYTICS = config.analytics.useVercelAnalytics;
export const SEO = config.seo;
export const LAYOUT = config.layout;
export const BRANDING = config.layout.branding.logo_svg_path;

// Export the entire config for use in other parts of the app
export default config;
