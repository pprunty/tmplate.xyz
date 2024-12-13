import React from 'react';

type TooltipProps = {
  message: string;
  children: React.ReactNode;
};

const TooltipWrapper: React.FC<TooltipProps> = ({ message, children }) => (
  <div className="relative group">
    {children}
    <div
      className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 pointer-events-none
      mb-2 z-[1000] max-w-[200px] min-w-[150px] bg-black text-white dark:bg-white dark:text-black text-xs rounded py-1 px-2 shadow-lg
      group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200"
    >
      {message}
    </div>
  </div>
);

export default TooltipWrapper;
