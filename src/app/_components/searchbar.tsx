'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Modal from './modal';
import Input from './input-string';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variation?: 'input' | 'full'; // "input" or "full" width variations
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '⌘ K  Search anything...',
  className = '',
  variation = 'input', // default to "input"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal callback
  const onClose = () => setIsOpen(false);

  // Listen for ⌘+K or Ctrl+K key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        className={`relative flex items-center  ${
          variation === 'full' ? ' w-full p-0' : ''
        } ${className}`}
      >
        {/* Desktop: Input displayed with variation logic */}
        {variation === 'input' && (
          <Input
            placeholder={placeholder}
            className="hidden sm:flex min-w-[300px] text-secondary-text-light dark:text-secondary-text-dark"
            icon={
              <Search className="h-4 w-4 text-secondary-text-light dark:text-secondary-text-dark" />
            }
          />
        )}
        {variation === 'full' && (
          <input
            type="text"
            placeholder={placeholder}
            onFocus={() => setIsOpen(true)} // Trigger modal on focus
            className={`
              hidden sm:flex flex-1
              bg-transparent z-15 border-none text-secondary-text-light dark:text-secondary-text-dark
              placeholder-secondary-text-light dark:placeholder-secondary-text-dark
              text-base ml-3
            `}
            style={{
              outline: 'none',
              boxShadow: 'none',
            }}
          />
        )}

        {/* Mobile: Search button only */}
        <button
          className="flex sm:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open Search"
        >
          <Search className="h-5 w-5 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-300" />
        </button>
      </div>

      {/* Modal triggered by pressing ⌘+K, Ctrl+K, or clicking the mobile icon */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={'Search'}
        size="lg"
        variation={'mobileSlide'}
      >
        <div className="p-4 text-secondary-text-light dark:text-secondary-text-dark">
          {/* Enhanced search or command palette content goes here */}
          <p>
            This is where your enhanced search or command palette content goes.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default SearchBar;
