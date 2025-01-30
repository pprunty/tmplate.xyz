// app/_templates/basic/header.tsx
import { Home, User, Settings } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-primary-border-light dark:border-primary-border-dark bg-primary-background-light dark:bg-primary-background-dark">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-contrast-light dark:text-contrast-dark hover:text-highlight-light dark:hover:text-highlight-dark transition-colors">
          <Home size={24} />
          <span className="font-semibold">MyApp</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/profile" className="flex items-center gap-2 text-secondary-text-light dark:text-secondary-text-dark hover:text-contrast-light dark:hover:text-contrast-dark">
            <User size={20} />
            Profile
          </Link>
          <Link href="/settings" className="flex items-center gap-2 text-secondary-text-light dark:text-secondary-text-dark hover:text-contrast-light dark:hover:text-contrast-dark">
            <Settings size={20} />
            Settings
          </Link>
        </div>
      </nav>
    </header>
  );
}