'use client';

import React from 'react';
import AuthButton from '@/app/_components/auth-button';
import SearchBar from '@/app/_components/searchbar'; // Adjust the import path as needed

// Define the CTAOption type with only "auth" and "search"
export type CTAOption = 'auth' | 'search';

interface CTAProps {
  options?: CTAOption[];
}

export default function CTA({ options = [] }: CTAProps) {
  return (
    <div className="flex items-center space-x-2">
      {options.map((option, index) => {
        switch (option) {
          case 'auth':
            return (
              <React.Fragment key={`auth-${index}`}>
                <AuthButton type="login" />
                <AuthButton type="signup" />
              </React.Fragment>
            );
          case 'search':
            return <SearchBar key={`search-${index}`} variation="input" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
