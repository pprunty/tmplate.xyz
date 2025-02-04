'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  mobileSize?: 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  variation?: 'blur' | 'backdrop' | 'mobileSlide';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'full',
  mobileSize,
  title,
  variation = 'blur',
}) => {
  // State to determine if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine the effective variation:
  // If the passed variation is "mobileSlide" and we're not on mobile, then default to "blur".
  const effectiveVariation =
    variation === 'mobileSlide' ? (isMobile ? 'mobileSlide' : 'blur') : variation;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full',
  };

  // For non-mobileSlide variants, use sizeClasses for the modal width.
  const modalSizeClass = mobileSize ? `${sizeClasses[size]}` : sizeClasses[size];

  // For mobileSlide and blur, we want a blurred overlay.
  const overlayClass =
    effectiveVariation === 'blur' || effectiveVariation === 'mobileSlide'
      ? 'bg-[#fff] dark:bg-[#131313] bg-opacity-30 dark:bg-opacity-50 backdrop-blur-sm'
      : effectiveVariation === 'backdrop'
      ? 'bg-black bg-opacity-50'
      : '';

  // For mobileSlide, we want full width with no horizontal margins.
  // Otherwise, add side margins (so that on desktop it isn't full width).
  const containerClass =
    effectiveVariation === 'mobileSlide'
      ? 'w-full h-[60vh] rounded-t-lg animate-slideUp'
      : `${modalSizeClass} mx-4 animate-modalShow rounded-lg`;

return createPortal(
  <div
    className={clsx(
      'fixed inset-0 z-[9999] p-1 sm:p-2 flex justify-center',
      effectiveVariation === 'mobileSlide' ? 'items-end' : 'items-center'
    )}
  >
    {/* Overlay with onClick for closing */}
    <div
      className={clsx('absolute inset-0 z-0', overlayClass)}
      onClick={onClose}
      aria-hidden="true"
    />

    {/* Modal container with explicit z-index */}
    <div
      className={clsx(
        'relative z-10 bg-primary-background-light dark:bg-primary-background-dark shadow-xl border border-primary-border-light dark:border-primary-border-dark transition-transform duration-300',
        containerClass
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {title && (
        <div
          className={clsx(
            'p-4 border-b border-primary-border-light dark:border-primary-border-dark flex items-center justify-between'
          )}
        >
          <h2 className="text-2xl font-semibold text-primary-text-light dark:text-primary-text-dark">
            {title}
          </h2>
          <button
            className={clsx(
              'p-2 rounded-lg bg-primary-background-light dark:bg-primary-background-dark',
              'hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark',
              'active:bg-primary-background-active-light dark:active:bg-primary-background-active-dark',
              'transition-opacity'
            )}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      <div>{children}</div>
    </div>
  </div>,
  document.body
);
};

export default Modal;
