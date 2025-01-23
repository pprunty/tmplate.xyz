'use client';

import { SocialPlatform } from '@/types/SocialPlatform';
import { urlMapping, SocialIcon } from '@/lib/widgets/common/components/SocialIcon';
import Subscribe from '@/lib/widgets/cta/components/Subscribe';
import { getResponsiveClasses } from '@/utils/layoutConfig';
import { LAYOUT } from '@/config';
import Image from 'next/image';

export default function Footer() {
  const footerConfig = LAYOUT.footer || {};
  const brandingConfig = LAYOUT.branding || {};
  const mobileAppConfig = footerConfig.mobile_app || {};
  const showSocialIcons = footerConfig.show_social_icons;
  const showNewsletter = footerConfig.newsletter;
  const logo = footerConfig.logo;
  const brandName = brandingConfig.brand_name?.name || '';
  const companyType = brandingConfig?.company_type || '';

  const showFooterClasses = getResponsiveClasses(['layout', 'show_footer', 'show_footer']);

  return (
    <footer
      className={`text-secondary-text-light dark:text-secondary-text-dark border-t
        mx-auto
        sm:px-8 py-2
        justify-center
        border-primary-border-light dark:border-primary-border-dark ${showFooterClasses}`}
      style={{
        marginTop: '5vw',
      }}
    >
      <div className="max-w-screen-xl w-full px-8 sm:px-6 xl:px-0 py-10 mx-auto">
        <div
          className="
            grid
            gap-y-6
            gap-x-12
            sm:gap-x-8
            lg:gap-x-6
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {/* Column 1: Logo and Social Links */}
          <div className="flex flex-col">
            {logo ? (
              <Image
                src={logo}
                alt="Vercel Logo"
                width={120}
                height={30}
                className="mb-4"
                priority
              />
            ) : (
              <span className="text-lg font-bold mb-4 text-primary-text-light dark:text-primary-text-dark">
                Vercel
              </span>
            )}
            <p className="text-sm mb-4 text-secondary-text-light dark:text-secondary-text-dark">
              © 2024 {`${brandName}${companyType ? ` ${companyType}` : ''}`}
            </p>
            {showSocialIcons && (
              <div className="flex items-center space-x-4">
                {(['github', 'twitter', 'youtube', 'linkedin', 'instagram', 'tiktok'] as SocialPlatform[]).map((platform) =>
                  urlMapping[platform] ? (
                    <a
                      key={platform}
                      href={urlMapping[platform]}
                      className="hover:opacity-75 transition-opacity"
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary-text-light dark:text-primary-text-dark">
              Resources
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/docs"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="/learn"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Learn
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary-text-light dark:text-primary-text-dark">
              More
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/commerce"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Next.js Commerce
                </a>
              </li>
              <li>
                <a
                  href="/github"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/releases"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Releases
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary-text-light dark:text-primary-text-dark">
              About Vercel
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Next.js + Vercel
                </a>
              </li>
              <li>
                <a
                  href="/opensource"
                  className="text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          {showNewsletter && <Subscribe title={"Newsletter"} />}

          {/* Mobile App Download Links */}
          {(mobileAppConfig.show_ios || mobileAppConfig.show_android) && (
            <div className="mt-2 ml-[-10px]">
              <div className="flex flex-col space-y-1">
                {mobileAppConfig.show_ios && (
                  <a
                    href={mobileAppConfig.ios_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      width={148}
                      height={50}
                      className="p-2"
                    />
                  </a>
                )}
                {mobileAppConfig.show_android && (
                  <a
                    href={mobileAppConfig.android_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      alt="Get it on Google Play"
                      width={150}
                      height={53}
                      className="ml-[-1px]"
                    />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
