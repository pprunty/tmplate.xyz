// src/components/OptimizedImage/index.tsx
import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  width,
  height,
  loading = 'lazy',
}) => {
  // Decide whether to use `fill` or `width` and `height` based on the props
  const imageProps = width && height ? { width, height } : { fill: true };

  return (
    <Image
      src={src}
      alt={alt}
      {...imageProps}
      className={`object-cover ${className}`}
      priority={priority}
      sizes={sizes}
      loading={loading}
    />
  );
};

export default React.memo(OptimizedImage);
