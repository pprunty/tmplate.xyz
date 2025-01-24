// app/admin/_layouts/index.tsx (or wherever you want this logic)
import DesktopLayout from "./desktop";
import MobileLayout from "./mobile";
import { headers } from "next/headers";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  // Must do this BEFORE any other await calls
  const requestHeaders = await headers();  // <-- await the headers object
  const deviceHeader = requestHeaders.get("x-mobile-device");
  const isMobile = deviceHeader === "true";

  // Now you can do other async if needed, e.g.:
  // const user = await fetchUserProfile();

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }
  return <DesktopLayout>{children}</DesktopLayout>;
}
