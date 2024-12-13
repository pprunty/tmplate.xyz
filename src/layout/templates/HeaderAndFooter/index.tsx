import React from 'react';
import Header from '@/layout/components/Header';
import Footer from '@/layout/components/Footer';

interface HeaderAndFooterProps {
  children: React.ReactNode; // Explicitly type the children prop
}

export default function HeaderAndFooter({ children }: HeaderAndFooterProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
