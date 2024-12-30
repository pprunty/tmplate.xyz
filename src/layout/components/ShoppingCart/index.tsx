// components/ShoppingCart.tsx
import React from 'react';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';

interface ShoppingCartProps {
  className?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800 dark:text-gray-300" />
  </div>
);

export default ShoppingCart;
