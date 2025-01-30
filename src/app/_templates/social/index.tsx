// app/_templates/basic/index.tsx
import { headers } from "next/headers";
import DesktopLayout from "./desktop";
import MobileLayout from "./mobile";

// The "LayoutProps" interface
interface LayoutProps {
  children: React.ReactNode;
}

export default async function SocialLayout({ children }: LayoutProps) {
  const requestHeaders = await headers();
  const deviceHeader = requestHeaders.get("x-mobile-device");
  const isMobile = deviceHeader === "true";

  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}

