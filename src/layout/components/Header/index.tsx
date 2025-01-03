'use client';

import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import Logo from '@/layout/components/Logo';
import { usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import CTA from '@/layout/components/CTA';
import SearchBar from '@/layout/components/SearchBar';
import { LAYOUT } from '@/config';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isTopRowVisible, setIsTopRowVisible] = useState(true);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const desktopCtaOptions = LAYOUT.desktop?.header?.cta?.options || [];
  const mobileCtaOptions = LAYOUT.mobile?.cta?.options || [];

  // Scroll to active item logic
  useEffect(() => {
    const activeItem = carouselRef.current?.querySelector(
      `a[href="${pathname}"]`
    );
    if (activeItem && carouselRef.current) {
      const carouselRect = carouselRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const offset =
        itemRect.left - carouselRect.left - carouselRect.width / 2 + itemRect.width / 2;

      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  }, [pathname]);

  // Determine device type
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, []);

  // Sticky header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isScrollingDown) {
      setIsTopRowVisible(false);
    } else {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      showTimeoutRef.current = setTimeout(() => setIsTopRowVisible(true), 300);
    }
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, [isScrollingDown]);

  // Recursive rendering of nested routes
  const renderRoutes = (routesToRender: typeof routes, isMobile = false) => (
    <ul className={isMobile ? 'flex space-x-2 py-2' : 'flex space-x-2'}>
      {routesToRender.map(({ href, label, children }) => {
        const isActive = pathname === href;

        const desktopClasses = isActive
          ? 'text-primary-text-light dark:text-primary-text-dark font-semibold text-sm'
          : 'text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark font-medium text-sm';

        const mobileClasses = isActive
          ? 'bg-highlight-light dark:bg-highlight-dark text-contrast-dark dark:text-contrast-light text-xs font-light'
          : 'bg-secondary-background-light dark:bg-secondary-background-dark text-primary-text-light dark:text-primary-text-dark hover:bg-primary-active-light dark:hover:bg-primary-active-dark text-xs font-light';

        return (
          <li key={href} className={isMobile ? '' : 'relative group ml-6'}>
            <Link
              href={href}
              className={`px-3 py-2 rounded-full transition-colors duration-300 ${
                isMobile ? mobileClasses : desktopClasses
              }`}
            >
              {label}
            </Link>
            {!isMobile && children && children.length > 0 && (
              <ul className="absolute left-0 top-full mt-2 bg-primary-background-light dark:bg-primary-background-dark shadow-md rounded-md hidden group-hover:block">
                {children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block px-4 py-2 text-sm hover:bg-secondary-active-light dark:hover:bg-secondary-active-dark"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="bg-transparent bg-opacity-40 backdrop-blur-sm text-white dark:text-[#888] fixed top-0 left-0 w-full z-50 border-b dark:border-[#333] border-[#EAEAEA]">
      <div className="max-w-screen-2xl mx-auto sm:px-2">
        <div
          className={`overflow-hidden ${
            isTopRowVisible ? 'h-12 opacity-100' : 'h-0 opacity-0'
          } transition-all px-2 duration-300 sm:h-16 md:opacity-100 md:transition-none`}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav Links */}
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-bold text-primary-text-light dark:text-primary-text-dark flex-shrink-0">
                <Logo className="h-8 w-auto sm:h-12" />
              </div>
              <div className="hidden md:flex items-center space-x-2">
                {renderRoutes(routes)}
              </div>
            </div>

            {/* Right side: Search + CTA */}
            <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
              <CTA options={desktopCtaOptions} />
            </div>

            {/* Mobile CTA */}
            <div className="flex md:hidden flex-shrink-0">
              <CTA options={mobileCtaOptions} />
            </div>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <div className="md:hidden py-2">
          <div
            ref={carouselRef}
            className="overflow-x-auto px-1 whitespace-nowrap scrollbar-hide"
          >
            {renderRoutes(routes, true)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;