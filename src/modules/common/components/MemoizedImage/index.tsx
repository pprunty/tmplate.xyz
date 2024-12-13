'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';

interface MemoizedImageProps extends Omit<ImageProps, 'onClick'> {
  focusable?: boolean;
  className?: string;
}

export const MemoizedImage = React.memo(function MemoizedImage({
  src,
  alt = 'Image',
  width,
  height,
  priority,
  loading = 'lazy',
  focusable = true,
  fill,
  sizes,
  className = '',
  ...rest
}: MemoizedImageProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const scrollPositionRef = useRef(0);
  const imageRef = useRef<HTMLSpanElement>(null); // Changed to HTMLSpanElement
  const hasIntersectedRef = useRef(false);

  const openModal = useCallback(() => {
    if (focusable) {
      scrollPositionRef.current = window.scrollY || window.pageYOffset;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';

      setModalOpen(true);
    }
  }, [focusable]);

  const closeModal = useCallback(() => {
    setModalOpen(false);

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';

    window.scrollTo({
      top: scrollPositionRef.current,
      behavior: 'instant',
    });
  }, []);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasIntersectedRef.current) {
          setImageLoaded(true);
          hasIntersectedRef.current = true;
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <span // Changed from <div> to <span>
        ref={imageRef}
        data-animate-image
        className={`${focusable ? 'cursor-pointer' : ''}`}
        onClick={openModal}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`image-animate ${isImageLoaded ? 'animate-once' : ''} ${className}`}
          data-animate={isImageLoaded ? 'zoom-fade-small' : ''}
          priority={priority}
          loading={loading}
          fill={fill}
          sizes={sizes}
          {...rest}
        />
      </span>

      {isModalOpen && (
        <span
          className="fixed inset-0 bg-white bg-opacity-45 backdrop-blur-lg dark:bg-black dark:bg-opacity-50 flex justify-center items-center z-50 p-4 transition-colors duration-300"
          onClick={closeModal}
          data-animate-image
        >
          <span className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="cursor-pointer p-4 image-click-animate"
              onClick={closeModal}
              priority={true}
              {...rest}
            />
          </span>
        </span>
      )}
    </>
  );
});
