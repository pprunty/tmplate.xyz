'use client';

import React, { useRef, useState, useEffect } from 'react';

interface CarouselProps {
  items: React.ReactNode[];
  itemClassName?: string;
  containerClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  itemClassName = '',
  containerClassName = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const checkScrollPosition = () => {
    const element = scrollRef.current;
    if (!element) return;

    // Check if scrolled from start
    setShowLeftGradient(element.scrollLeft > 0);

    // Check if can scroll more to the right
    const canScrollMore =
      element.scrollWidth - element.scrollLeft - element.clientWidth > 1;
    setShowRightGradient(canScrollMore);
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      checkScrollPosition();
      element.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        element.removeEventListener('scroll', checkScrollPosition);
        window.addEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return (
    <div className={`relative w-full ${containerClassName}`}>
      {/* Blur gradients */}
      {showLeftGradient && (
        <div
          className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-[#0D0D0D] to-transparent z-10"
          style={{
            opacity: 1,
            filter: 'blur(0px)',
            transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
          }}
        />
      )}
      {showRightGradient && (
        <div
          className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-[#0D0D0D] to-transparent z-10"
          style={{
            opacity: 1,
            filter: 'blur(0px)',
            transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
          }}
        />
      )}

      {/* Carousel container */}
      <div className="w-full overflow-hidden py-4">
        <div
          ref={scrollRef}
          className="
            flex overflow-x-auto snap-x snap-mandatory scroll-smooth
            scrollbar-hide
            // remove space-x-4 here
            // space-x-4
            scroll-px-[50%]  // This helps center each item ignoring external spacing
          "
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              // Each child must have snap-center
              // so it will center in the viewport ignoring gaps
              className={`snap-center flex-shrink-0 ${itemClassName}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Carousel);
