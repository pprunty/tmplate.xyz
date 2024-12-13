import { SocialPlatform } from '@/types/SocialPlatform';
import { urlMapping, SocialIcon } from '@/modules/common/components/SocialIcon';
import ThemeSwitcher from '@/modules/common/templates/ThemeSwitcher';

export default function Footer() {
  return (
    <footer className="bg-transparent text-gray-700 dark:text-gray-400 border-t dark:border-gray-700 border-gray-300">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo and Social Links */}
          <div className="flex flex-col">
            <span className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-300">
              Vercel
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-500 mb-4">
              © 2024 Vercel, Inc.
            </p>
            <div className="flex items-center space-x-4">
              {(['github', 'twitter'] as SocialPlatform[]).map((platform) =>
                urlMapping[platform] ? (
                  <a
                    key={platform}
                    href={urlMapping[platform]}
                    className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-gray-800 dark:text-gray-300">
              Resources
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-500">
              <li>
                <a href="/docs" className="hover:text-gray-500 dark:hover:text-gray-300">
                  Docs
                </a>
              </li>
              <li>
                <a href="/learn" className="hover:text-gray-500 dark:hover:text-gray-300">
                  Learn
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-gray-500 dark:hover:text-gray-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: More */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-gray-800 dark:text-gray-300">
              More
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-500">
              <li>
                <a href="/commerce" className="hover:text-gray-500 dark:hover:text-gray-300">
                  Next.js Commerce
                </a>
              </li>
              <li>
                <a href="/github" className="hover:text-gray-500 dark:hover:text-gray-300">
                  GitHub
                </a>
              </li>
              <li>
                <a href="/releases" className="hover:text-gray-500 dark:hover:text-gray-300">
                  Releases
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-gray-800 dark:text-gray-300">
              About Vercel
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-500">
              <li>
                <a href="/about" className="hover:text-gray-500 dark:hover:text-gray-300">
                  Next.js + Vercel
                </a>
              </li>
              <li>
                <a href="/opensource" className="hover:text-gray-500 dark:hover:text-gray-300">
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Subscribe */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-gray-800 dark:text-gray-300">
              Subscribe to our newsletter
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-500 mb-4">
              Stay updated on new releases and features.
            </p>
            <form className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="you@domain.com"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Subscribe
              </button>
            </form>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
