// components/Button/Button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon, children, ...props }) => (
  <button
    {...props}
    className="flex text-sm font-light dark:border-[#333] items-center justify-center w-full pt-3 pb-3 border rounded-md hover:bg-gray-100"
  >
    {icon && <span className="mr-2 flex items-center">{icon}</span>}
    {children}
  </button>
);

export default Button;
