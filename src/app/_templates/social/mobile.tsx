// app/_templates/basic/mobile.tsx
import MobileHeader from "./header-mobile";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <MobileHeader />
      <main className="flex-1 overflow-y-auto p-4 bg-primary-background-light dark:bg-primary-background-dark">
        {children}
      </main>
    </div>
  );
}