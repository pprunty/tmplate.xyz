// utils/layoutConfig.ts
import { LAYOUT } from '@/config';

/**
 * Utility function to generate Tailwind CSS classes for 'show_branding'.
 * It returns a string that combines mobile and desktop visibility classes.
 *
 * - Mobile: 'flex' if shown, 'hidden' if hidden
 * - Desktop: 'sm:flex' if shown, 'sm:hidden' if hidden
 *
 * Falls back to the global 'show_branding' if device-specific settings are not provided.
 *
 * @returns {string} Tailwind CSS class string
 */
export function getShowBrandingClasses(): string {
  // Get the global default value
  const defaultShow = LAYOUT.show_branding;

  // Get device-specific overrides, falling back to the default
  const mobileShow = LAYOUT.mobile?.show_branding ?? defaultShow;
  const desktopShow = LAYOUT.desktop?.show_branding ?? defaultShow;

  // Determine the Tailwind classes based on the boolean values
  const mobileClass = mobileShow ? 'flex' : 'hidden';
  const desktopClass = desktopShow ? 'sm:flex' : 'sm:hidden';

  // Combine and return the classes
  return `${mobileClass} ${desktopClass}`;
}

/**
 * Generic utility function to get layout values for other keys if needed.
 * Currently tailored for 'show_branding', but can be extended.
 *
 * @param keyPath - Array representing the path to the key in the layout config
 * @returns {string} Tailwind CSS class string
 */
export function getResponsiveClasses(keyPath: string[]): string {
  // Get global default value if no device-specific overrides exist
  const globalDefault = LAYOUT[keyPath[1]]?.[keyPath[2]] ?? false;

  // Determine device-specific values
  const mobileValue = LAYOUT.mobile?.[keyPath[2]] ?? globalDefault;
  const desktopValue = LAYOUT.desktop?.[keyPath[2]] ?? globalDefault;

  // Generate Tailwind classes based on boolean values
  const mobileClass = mobileValue ? 'flex' : 'hidden';
  const desktopClass = desktopValue ? 'sm:flex' : 'sm:hidden';

  return `${mobileClass} ${desktopClass}`;
}

