import React, { useState, useEffect, useRef } from 'react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
}

export const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, children, side = 'left' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
           style={{ opacity: isOpen ? 1 : 0 }}>
        <div
          ref={sheetRef}
          className={`fixed inset-y-0 max-w-full flex outline-none ${
            side === 'left' ? 'left-0' : 'right-0'
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <div
            className={`w-screen max-w-md transform transition ease-in-out duration-300 ${
              isOpen
                ? side === 'left'
                  ? 'translate-x-0'
                  : '-translate-x-0'
                : side === 'left'
                ? '-translate-x-full'
                : 'translate-x-full'
            }`}
          >
            <div className="h-full bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
