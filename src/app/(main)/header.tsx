// src/app/(basic)/header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Logo from '../logo';
import CTA from '../_layout/cta';
import { X, Menu } from 'lucide-react';
import { routes } from "./routes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="
      sticky top-0 z-50
      bg-primary-background-light dark:bg-primary-background-dark
      border-b border-primary-border-light dark:border-primary-border-dark
      backdrop-blur-sm

    ">
      <div className="mx-auto sm:px-6 lg:px-12 px-2">
        <div className="flex items-center justify-between h-16">
          {/* Left section with logo and desktop nav */}
          <div className="flex items-center gap-8">
            <Logo className="h-8 w-8" />

            {/* Desktop Navigation - now on left */}
            <nav className="hidden md:flex items-center gap-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="
                    text-secondary-text-light hover:text-contrast-light
                    dark:text-secondary-text-dark dark:hover:text-contrast-dark
                    transition-colors
                  "
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right section with CTA and mobile menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <CTA options={['auth']} />
            </div>

            {/* Mobile menu toggle - shows on md breakpoint and below */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                p-2
                text-contrast-light dark:text-contrast-dark
                hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark
                rounded-lg
                md:hidden
              "
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - activates at md breakpoint */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0
            bg-primary-background-light dark:bg-primary-background-dark
            border-b border-primary-border-light dark:border-primary-border-dark
            shadow-lg
          ">
            <nav className="flex flex-col p-4 gap-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    p-3
                    text-secondary-text-light hover:text-contrast-light
                    dark:text-secondary-text-dark dark:hover:text-contrast-dark
                    hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark
                    rounded-lg
                    transition-colors
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