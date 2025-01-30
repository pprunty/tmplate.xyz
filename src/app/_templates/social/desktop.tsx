// app/_templates/basic/desktop.tsx
import Header from "./header";
import BottomBar from "@/app/_layout/bottom-bar";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
          <body className="dark:text-gray-100 max-w-2xl m-auto">
              <main className="p-6 pt-3 md:pt-6 min-h-screen">
                <Header />
                {children}
                <BottomBar/>
              </main>
              </body>
  );
}