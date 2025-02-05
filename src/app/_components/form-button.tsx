// components/Button/Button.tsx

import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  variation?: 'submit' | 'cancel' | 'default';
}

const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  variation = 'default',
  ...props
}) => {
  const buttonClasses = classNames(
    'flex text-sm font-light items-center justify-center w-full py-2 cursor-pointer rounded-md transition-all duration-200 ease-in-out',
    {
      // Default button styles with hover
      'border border-primary-border-light dark:border-primary-border-dark bg-primary-background-light dark:bg-primary-background-dark hover:bg-primary-background-hover-light dark:hover:bg-primary-background-hover-dark active:bg-primary-background-active-light dark:active:bg-primary-background-active-dark':
        variation === 'default',
      // Submit button styles using contrasting colors
      'border bg-contrast-light dark:bg-contrast-dark text-primary-background-light dark:text-primary-background-dark hover:bg-contrast-hover-light dark:hover:bg-contrast-hover-dark active:bg-contrast-active-light dark:active:bg-contrast-active-dark':
        variation === 'submit',
      // Cancel/Delete button styles (no border)
      'bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 active:bg-red-700 dark:active:bg-red-900':
        variation === 'cancel',
    },
  );

  return (
    <button {...props} className={buttonClasses}>
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
