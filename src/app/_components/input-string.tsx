// components/Input/Input.tsx
import React, { ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode; // Optional icon prop
  className?: string; // Optional className prop
}

const Input: React.FC<InputProps> = ({ icon, className = '', ...props }) => (
  <div className={`relative flex items-center ${className}`}>
    {icon && (
      <span
        className={`absolute left-3 text-secondary-text-light dark:text-secondary-text-dark
          hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark`}
      >
        {icon}
      </span>
    )}
    <input
      {...props}
      className={`w-full py-1.5 sm:py-2 ${
        icon ? 'pl-10' : 'pl-1.5'
      } px-1.5 border rounded-md border-primary-border-light dark:border-primary-border-dark
        placeholder-secondary-text-light dark:placeholder-secondary-text-dark
        focus:outline-none focus:ring-1 focus:ring-contrast-light dark:focus:ring-contrast-dark md:text-sm`}
    />
  </div>
);

export default Input;
