'use client';

import React from 'react';
import AuthButton from '@/modules/auth/components/AuthButton';
import SearchBar from '@/layout/components/SearchBar';
import ShoppingCart from '@/layout/components/ShoppingCart';
import Notification from '@/layout/components/Notification';
import ThemeSwitcher from '@/modules/common/templates/ThemeSwitcher'; // Import the ThemeSwitcher component

interface CTAProps {
  className?: string;
  options?: string[]; // List of options for the CTA
}

const CTA: React.FC<CTAProps> = ({
  className = '',
  options = ['search', 'auth'], // Default options
}) => {
  const authClasses = {
    login: `
      px-3 py-2 text-xs sm:text-sm rounded transition-colors
      bg-transparent border border-[#E0E0E0] text-[#444]
      hover:bg-[#F0F0F0] active:bg-[#EAEAEA]
      dark:border-[#333] dark:text-[#AAA]
      dark:hover:bg-[#444] dark:active:bg-[#555]
    `,
    signup: `
      px-3 py-2 text-xs sm:text-sm rounded transition-colors
      bg-black text-white
      hover:bg-gray-900 active:bg-gray-800
      dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:active:bg-gray-300
    `,
  };

  const renderOption = (option: string) => {
    switch (option) {
      case 'shopping_cart':
        return <ShoppingCart />;
      case 'notifications':
        return <Notification />;
      case 'auth':
        return (
          <div className="flex items-center space-x-3">
            <AuthButton type="login" className={authClasses.login} />
            <AuthButton type="signup" className={authClasses.signup} />
          </div>
        );
      case 'search':
        return <SearchBar placeholder="Search..." variation="input" />;
      case 'theme':
        return <ThemeSwitcher />; // Render the ThemeSwitcher component
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-end space-x-3 sm:space-x-3 ${className}`}>
      {/* Render options in the order provided */}
        {options.slice().reverse().map((option, index) => (
              <div key={index}>{renderOption(option)}</div>
            ))}
    </div>
  );
};

export default CTA;
