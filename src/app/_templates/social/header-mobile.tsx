// app/_templates/basic/header-mobile.tsx
"use client";

import { Menu, X, Home, User, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-primary-border-light dark:border-primary-border-dark bg-primary-background-light dark:bg-primary-background-dark">
      <nav className="px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 text-contrast-light dark:text-contrast-dark">
          <Home size={24} />
          <span className="font-semibold">MyApp</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-secondary-background-light dark:hover:bg-secondary-background-dark rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={clsx(
          "absolute top-14 left-0 right-0 bg-primary-background-light dark:bg-primary-background-dark border-b border-primary-border-light dark:border-primary-border-dark",
          "transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="flex flex-col p-4 gap-4">
            <Link href="/profile" className="flex items-center gap-3 text-secondary-text-light dark:text-secondary-text-dark hover:text-contrast-light dark:hover:text-contrast-dark">
              <User size={20} />
              Profile
            </Link>
            <Link href="/settings" className="flex items-center gap-3 text-secondary-text-light dark:text-secondary-text-dark hover:text-contrast-light dark:hover:text-contrast-dark">
              <Settings size={20} />
              Settings
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}