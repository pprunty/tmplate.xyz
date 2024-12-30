import React from 'react';
import Header from '@/layout/components/Header';
import Footer from '@/layout/components/Footer';

interface StandardHeaderProps {
  children: React.ReactNode; // Explicitly type the children prop
}

export default function StandardHeader({ children }: StandardHeaderProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
