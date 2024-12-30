'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Modal from '@/containers/templates/Modal';
import Input from '@/modules/common/components/Input';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variation?: 'input' | 'full'; // Add variation prop
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "⌘ K  Search anything...",
  className = "",
  variation = 'input', // Default to "input"
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
        className={`relative flex items-center ${
          variation === 'full' ? 'bg-inherit w-full p-0' : ''
        } ${className}`}
      >
        {variation === 'input' ? (
          <>
            {/* Input visible on desktop */}
            <Input
              placeholder={placeholder}
              onFocus={() => setIsOpen(true)}
              className="hidden sm:flex min-w-[300px] text-secondary-text-light dark:text-secondary-text-dark"
              icon={<Search className="h-5 w-5 text-secondary-text-light dark:text-secondary-text-dark" />}
            />

            {/* Search icon visible on mobile */}
            <button
              className="flex"
              onClick={() => setIsOpen(true)}
              aria-label="Open Search"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800 dark:text-gray-300" />
            </button>
          </>
        ) : (
          // Default input styling for "full" variation
          <input
            type="text"
            placeholder={placeholder}
            className={`${
              variation === 'full' ? 'flex-1' : 'hidden sm:block text-sm flex-1'
            } bg-transparent border-none text-secondary-text-light dark:text-secondary-text-dark
            placeholder-secondary-text-light dark:placeholder-secondary-text-dark
            text-base ml-3`}
            onFocus={() => setIsOpen(true)}
            style={{
              outline: 'none',
              boxShadow: 'none',
            }}
          />
        )}
      </div>

      {/* Modal triggered by focusing input (desktop), pressing ⌘+K, or clicking icon (mobile) */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" variation="blur">
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
