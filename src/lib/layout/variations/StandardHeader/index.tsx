import React from 'react';
import Header from '@/lib/layout/templates/Header';
import Footer from '@/lib/layout/templates/Footer';

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
