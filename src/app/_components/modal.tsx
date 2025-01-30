'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  mobileSize?: 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  variation?: 'blur' | 'backdrop';
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

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full',
  };

  const modalSizeClass = mobileSize
    ? `${sizeClasses[size]}`
    : sizeClasses[size];

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] p-1 sm:p-2 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 ${
          variation === 'blur'
            ? 'bg-[#fff] dark:bg-[#131313] bg-opacity-30 dark:bg-opacity-50 backdrop-blur-sm'
            : 'bg-black bg-opacity-50'
        }`}
        aria-hidden="true"
      ></div>
      <div
        className={`w-full ${modalSizeClass} px-6 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-primary-background-light dark:bg-primary-background-dark rounded-lg shadow-xl border border-primary-border-light dark:border-primary-border-dark transition-transform duration-300 ${
            isOpen ? 'animate-modalShow' : ''
          }`}
        >
          {title && (
            <div className="p-4 border-b border-primary-border-light dark:border-primary-border-dark flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-primary-text-light dark:text-primary-text-dark">
                {title}
              </h2>
              <button
                className="p-2 rounded-lg bg-primary-background-light dark:bg-primary-background-dark hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark active:bg-primary-background-active-light dark:active:bg-primary-background-active-dark transition-opacity"
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
      </div>
    </div>
  );

  if (typeof window === 'undefined') {
    return null;
  } else {
    return createPortal(modalContent, document.body);
  }
};

export default Modal;
