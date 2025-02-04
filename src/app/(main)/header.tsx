"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cross as Hamburger } from 'hamburger-react';
import clsx from 'clsx';
import Logo from '../logo';
import CTA from '../_layout/cta';
import { routes } from "./routes";

interface HeaderProps {
  scrollResponsive?: boolean;
  mobileResponsive?: boolean;
}

export default function Header({
  scrollResponsive = false,
  mobileResponsive = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Disable scroll when the mobile dropdown menu is open.
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // If responsiveness isn't enabled, exit.
    if (!scrollResponsive) return;

    // If responsiveness should only be on mobile, check the window width.
    if (mobileResponsive && window.innerWidth >= 768) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollResponsive, mobileResponsive, lastScrollY]);

  return (
    <header
      className={clsx(
        "z-50 top-0",
        "backdrop-blur-lg bg-primary-background-light/85 dark:bg-primary-background-dark/85",
        "border-b border-primary-border-light dark:border-primary-border-dark",
        "transition-transform duration-300 ease-in-out",
        scrollResponsive ? 'fixed left-0 right-0' : 'sticky',
        !isVisible && scrollResponsive && '-translate-y-full'
      )}
    >
      {/* Constrain header inner content with a max-width */}
      <div className="mx-auto max-w-screen-2xl sm:px-4 px-2">
        <div className="flex items-center justify-between py-0 xl:py-3">
          {/* Left section with logo and desktop navigation */}
          <div className="flex items-center gap-8">
            <Logo className="h-8 w-8" />

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="
                    text-secondary-text-light hover:text-contrast-light
                    dark:text-secondary-text-dark dark:hover:text-contrast-dark
                    transition-colors text-sm
                  "
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right section with CTA and mobile menu */}
          <div className="flex items-center gap-4">
            {/* Desktop view: show both search and auth CTAs */}
            <div className="hidden xl:block">
              <CTA options={['search', 'auth']} />
            </div>

            {/* Mobile view: show search CTA and hamburger menu */}
            <div className="flex xl:hidden items-center">
              {/* Render search option first */}
              <CTA options={['search']} />
              <div className="py-2">
                <Hamburger
                  toggled={isMenuOpen}
                  toggle={setIsMenuOpen}
                  size={18}
                  label="Toggle menu"
                  color="currentColor"
                  distance="md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-16 left-0 right-0
            bg-primary-background-light dark:bg-primary-background-dark
          ">
            <nav className="flex flex-col p-4 gap-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    p-3 text-secondary-text-light hover:text-contrast-light
                    dark:text-secondary-text-dark dark:hover:text-contrast-dark
                    hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark
                    rounded-lg transition-colors
                  "
                >
                  {route.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-primary-border-light dark:border-primary-border-dark">
                <CTA options={['auth']} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
