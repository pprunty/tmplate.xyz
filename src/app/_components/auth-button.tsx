'use client';

import React, { useState } from 'react';
import Modal from './modal';
import LoginForm from './auth-form';

interface AuthButtonProps {
  className?: string;
  type?: 'login' | 'signup';
}

const AuthButton: React.FC<AuthButtonProps> = ({ className = '', type = 'login' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSignup = type === 'signup';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const modalTitle = isSignup ? 'Sign up' : 'Log in';

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`px-3 py-1.5 sm:py-2 text-[12px] rounded-lg transition-colors w-full whitespace-nowrap ${
          isSignup
            ? `bg-contrast-light dark:bg-contrast-dark text-primary-background-light dark:text-primary-background-dark hover:bg-contrast-hover-light dark:hover:bg-contrast-hover-dark active:bg-contrast-active-light dark:active:bg-contrast-active-dark`
            : `bg-primary-background-light dark:bg-primary-background-dark border border-primary-border-light text-primary-text-light
               hover:bg-primary-active-light hover:text-contrast-light
                active:text-contrast-light
               dark:border-primary-border-dark dark:text-primary-text-dark
               dark:hover:bg-primary-active-dark dark:hover:text-contrast-dark
               active:bg-primary-background-active-light dark:active:bg-primary-background-active-dark dark:active:text-contrast-dark`
        } ${className}`}
      >
        {isSignup ? 'Sign up' : 'Log in'}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle} size="md" variation="blur">
        <LoginForm />
      </Modal>
    </>
  );
};

export default AuthButton;
