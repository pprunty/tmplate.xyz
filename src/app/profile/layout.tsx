import React from 'react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white py-4 px-6">
          <h1>Custom Profile Layout</h1>
        </header>
        <main className="min-h-screen bg-gray-100">{children}</main>
        <footer className="bg-gray-800 text-white py-4 px-6">
          <p>© 2024 Profile Layout Footer</p>
        </footer>
      </body>
    </html>
  );
}
