// components/Input/Input.tsx
import React from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => (
  <input
    {...props}
    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default Input;
