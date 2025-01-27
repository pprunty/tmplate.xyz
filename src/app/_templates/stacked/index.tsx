// app/_templates/stacked/index.tsx
import { headers } from "next/headers";
import DesktopLayout from "./desktop";
import MobileLayout from "./mobile";

interface StackedLayoutProps {
  children: React.ReactNode;
}

export default async function StackedLayout({ children }: StackedLayoutProps) {
  const requestHeaders = await headers();
  const deviceHeader = requestHeaders.get("x-mobile-device");
  const isMobile = deviceHeader === "true";

  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
