'use client';

import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import Logo from '@/layout/components/Logo';
import LoginButton from '@/modules/auth/components/LoginButton';
import { usePathname } from 'next/navigation';


const Header: React.FC = () => {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isTopRowVisible, setIsTopRowVisible] = useState(true);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);

const [scrollPosition, setScrollPosition] = useState(0);

useEffect(() => {
  const handleBeforeUnload = () => {
    setScrollPosition(carouselRef.current?.scrollLeft || 0);
  };
  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => window.removeEventListener("beforeunload", handleBeforeUnload);
}, []);

useEffect(() => {
  const activeItem = carouselRef.current?.querySelector(
    `a[href="${pathname}"]`
  );
  if (activeItem && carouselRef.current) {
    const carouselRect = carouselRef.current.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const offset = itemRect.left - carouselRect.left - carouselRect.width / 2 + itemRect.width / 2;

    carouselRef.current.scrollTo({
      left: carouselRef.current.scrollLeft + offset,
      behavior: "smooth",
    });
  }
}, [pathname]);

  // Determine if it's desktop or mobile based on window width (only on the client)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "auto",
      });
    }
  }, [scrollPosition]);

  const mobileNavItems = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
    { href: "/blog", label: "Blog" },
    { href: "/templates", label: "Templates" },
    { href: "/search", label: "Search" },
    { href: "/enterprise", label: "Enterprise" },
  ];

  useEffect(() => {
    // If desktop, no scrolling logic applies
    if (isDesktop) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 50;
      setIsScrollingDown(scrollingDown);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isDesktop]);

  useEffect(() => {
    // If desktop, never change isTopRowVisible due to scrolling
    if (isDesktop) {
      setIsTopRowVisible(true);
      return;
    }

    // Mobile logic only
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    if (isScrollingDown) {
      // If scrolling down on mobile, hide the top row
      setIsTopRowVisible(false);
    } else {
      // If scrolling up on mobile, wait before showing the top row again
      showTimeoutRef.current = setTimeout(() => {
        setIsTopRowVisible(true);
      }, 300);
    }

    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, [isScrollingDown, isDesktop]);

  return (
    <nav className="bg-transparent bg-opacity-20 backdrop-blur-sm text-white dark:text-[#888] fixed top-0 left-0 w-full z-50 border-b dark:border-[#333] border-[#EAEAEA]">
      <div className="px-2 sm:px-6 lg:px-8">
        {/* Top row: Logo + Nav Links + Search + CTA */}
        <div
          className={`overflow-hidden ${
            isTopRowVisible ? 'h-10 opacity-100' : 'h-0 opacity-0'
          } transition-all duration-300 md:h-10 md:opacity-100 md:transition-none`}
        >
          <div className="flex items-center justify-between h-10">
            {/* Left side: Logo + Desktop Nav Links */}
            <div className="flex items-center space-x-4">
              <div className="text-lg sm:text-xl font-bold">
                <Logo className="h-6 w-auto sm:h-8" />
              </div>
              {/* Desktop Nav Links (visible on md and up) */}
              <div className="hidden md:flex items-center space-x-6 md:text-base text-xs">
                <Link href="/showcase" className="hover:text-gray-400">
                  Showcase
                </Link>
                <Link href="/docs" className="hover:text-gray-400">
                  Docs
                </Link>
                <Link href="/blog" className="hover:text-gray-400">
                  Blog
                </Link>
                <Link href="/templates" className="hover:text-gray-400">
                  Templates
                </Link>
                <Link href="/enterprise" className="hover:text-gray-400">
                  Enterprise
                </Link>
              </div>
            </div>

            {/* Right side: Search + CTA (Desktop only) */}
            <div className="hidden md:flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search documentation..."
                className="px-4 py-2 rounded-md bg-gray-800 dark:bg-[#1A1A1A] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              />
              <div className="flex items-center space-x-2">
                <LoginButton />
                <Link
                  href="/signup"
                  className="px-3 py-2 text-sm rounded bg-transparent hover:bg-gray-800 dark:hover:bg-neutral-800 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </div>

            {/* Mobile: Sign in / Sign up (no search) */}
            <div className="flex md:hidden items-center space-x-2">
              <LoginButton
                className="px-2 py-1 text-xs rounded bg-transparent hover:bg-gray-800 dark:hover:bg-neutral-800 transition-colors"
              />
              <Link
                href="/signup"
                className="px-2 py-1 text-xs rounded bg-transparent hover:bg-gray-800 dark:hover:bg-neutral-800 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav Links (Horizontal Scroll) */}
        <div className="md:hidden py-1 transition-all duration-300">
          <div
            ref={carouselRef}
            className="overflow-x-auto whitespace-nowrap scrollbar-hide"
          >
            <div className="flex space-x-2 py-2">
              {mobileNavItems.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 rounded-full text-sm font-light transition-colors duration-300
                      ${
                        isActive
                          ? 'bg-[#DC70FF] dark:bg-[#DC70FF] dark:text-black text-white'
                          : 'bg-gray-200 text-gray-900 dark:bg-[#222] dark:text-white hover:bg-gray-300 dark:hover:bg-neutral-700'
                      }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
