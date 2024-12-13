'use client';

import React, { useState } from 'react';
import Modal from '@/containers/templates/Modal';
import LoginForm from '@/modules/auth/templates/LoginForm';

interface LoginButtonProps {
  className?: string; // Add className as an optional prop
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`px-3 py-2 text-sm rounded bg-transparent hover:bg-gray-800 dark:hover:bg-neutral-800 transition-colors ${className}`}
      >
        Log In
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Log in" size="full">
        <LoginForm />
      </Modal>
    </>
  );
};

export default LoginButton;
