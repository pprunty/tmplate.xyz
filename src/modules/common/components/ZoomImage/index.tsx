'use client';

import React, { useRef, useState, useEffect } from 'react';
import OptimizedImage from '@/modules/common/components/OptimizedImage';

interface ZoomImageProps {
  src: string;
  alt?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  className?: string;
  sizes?: string; // Add sizes prop
}

const ZoomImage: React.FC<ZoomImageProps> = ({
  src,
  alt = 'Image',
  priority = false,
  loading = 'lazy',
  className = '',
  sizes,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Update isVisible based on intersection status
      },
      { threshold: 0.1 },
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imageRef}
      className={`relative w-full h-[200px] sm:h-[300px] overflow-hidden mb-4
                  transition-transform duration-[2000ms] ease-in-out
                  ${isVisible ? 'scale-100' : 'scale-110'}`}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        priority={priority}
        loading={loading}
        sizes={sizes}
        className={`object-cover w-full h-full ${className}`}
      />
    </div>
  );
};

export default ZoomImage;
