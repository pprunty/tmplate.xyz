'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full'; // Define optional size prop
  title?: string; // Optional title prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'full',
  title,
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

  // Determine modal width based on size prop
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full',
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] p-6 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>
      <div
        className={`w-full ${sizeClasses[size]} mx-auto px-6 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-white dark:bg-[#0D0D0D] rounded-lg shadow-xl border dark:border-[#252525] transition-transform duration-300 ${
            isOpen ? 'animate-modalShow' : ''
          }`}
        >
          {/* Conditionally render the title and close button if title is provided */}
          {title && (
            <div className="p-4 border-b border-gray-200 dark:border-[#252525] flex items-center justify-between">
              <h2 className="text-2xl font-semibold dark:text-white">
                {title}
              </h2>
              <button
                className="p-2 rounded-lg dark:border-[#313131] bg-[#fff] dark:bg-[#0D0D0D] hover:bg-gray-300 dark:hover:bg-[#313131] transition-opacity"
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

          {/* Modal content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );

  // Only render in the browser
  if (typeof window === 'undefined') {
    return null;
  } else {
    return createPortal(modalContent, document.body);
  }
};

export default Modal;
