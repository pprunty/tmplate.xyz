'use client';

import React from 'react';
import Image from 'next/image';
import { ThemeSwitcher } from "@/app/_components/theme-switcher";

// Assuming you have these two in the same file or as separate modules
// import { SocialPlatform } from '@/types/SocialPlatform';
import { urlMapping, SocialIcon } from '@/app/_components/social-icon';
import config from '@/app/config'; // <— import your config here
// If you have a "Subscribe" component, import that, too
// import Subscribe from '@/app/_components/subscribe';

export default function Footer() {
  // 1) Destructure the footer config
  const {
    show_social_icons,
    newsletter,
    logo,
    mobile_app,
    show_footer
  } = config.footer;

  if (!show_footer) {
  return null;
  }

  // 2) Grab brand name & company type from branding config
  const brandName = config.branding.brand_name.name;
  const companyType = config.branding.company_type;

  return (
    <footer
      className={`
        text-secondary-text-light dark:text-secondary-text-dark
        border-t
        justify-center
        border-primary-border-light dark:border-primary-border-dark
        pt-6 pb-12
      `}
      style={{
        marginTop: '5vw',
      }}
    >
      <div className="max-w-screen-xl p-6 sm:px-8 w-full sm:px-6 py-10">
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
                alt="Brand Logo"
                width={120}
                height={30}
                className="mb-4 rounded-md"
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

            {/* Social Icons */}
            {show_social_icons && (
              <div className="flex items-center space-x-4">
                {(
                  [
                    'github',
                    'twitter',
                    'youtube',
                    'linkedin',
                    'instagram',
                    'tiktok',
                  ] as const
                ).map((platform) =>
                  urlMapping[platform] ? (
                    <a
                      key={platform}
                      href={urlMapping[platform]}
                      className="hover:opacity-75 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary-text-light dark:text-primary-text-dark">
              Resources
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/docs"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="/learn"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Learn
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: More */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary-text-light dark:text-primary-text-dark">
              More
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/commerce"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Next.js Commerce
                </a>
              </li>
              <li>
                <a
                  href="/github"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/releases"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Releases
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary-text-light dark:text-primary-text-dark">
              About Vercel
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Next.js + Vercel
                </a>
              </li>
              <li>
                <a
                  href="/opensource"
                  className="hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter (Subscribe form?) */}
          {newsletter && (
            <div>
              <h3 className="font-semibold mb-2 text-sm text-primary-text-light dark:text-primary-text-dark">
                Newsletter
              </h3>
              {/* Example: <Subscribe title="Newsletter" /> */}
              {/* If you have your own subscribe form, place it here. */}
            </div>
          )}

          {/* Column 6: Mobile App Download Links */}
          {(mobile_app.show_ios || mobile_app.show_android) && (
            <div className="mt-2 ml-[-10px]">
              <div className="flex flex-col space-y-1">
                {mobile_app.show_ios && (
                  <a
                    href={mobile_app.ios_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      width={120}
                      height={30}
                      className="p-2"
                    />
                  </a>
                )}
                {mobile_app.show_android && (
                  <a
                    href={mobile_app.android_url}
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
      <ThemeSwitcher/>
      </div>
    </footer>
  );
}
