// components/Notification.tsx
import React from 'react';
import { Bell as NotificationIcon } from 'lucide-react';

interface NotificationProps {
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <NotificationIcon className="h-5 w-5 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-300" />
  </div>
);

export default Notification;
