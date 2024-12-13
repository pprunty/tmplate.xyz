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
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-[#000] to-transparent z-10" />
      )}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-[#000] to-transparent z-10" />
      )}

      {/* Carousel container */}
      <div className="w-full overflow-hidden py-4">
        <div
          ref={scrollRef}
          className="
            flex overflow-x-auto snap-x snap-mandatory scroll-smooth
            space-x-4 scrollbar-hide
          "
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`min-w-[80%] snap-center flex-shrink-0 p-4 rounded-lg ${itemClassName}`}
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
