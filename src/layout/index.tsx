"use client";

import React from "react";
import { layout } from "@/config";
import { useIsMobile } from "@/hooks/useIsMobile";
import { LAYOUT } from '@/config';

// Import all layout variations
import StandardHeader from "@/layout/templates/StandardHeader";
import Narrow from "@/layout/templates/Narrow";
import SidebarMenu from "@/layout/templates/SidebarMenu";
import BottomBar from "@/layout/templates/BottomBar";

// Define a placeholder component for layouts not yet implemented
const PlaceholderLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div>{children}</div>;

type LayoutType = "StandardHeader" | "StickyHeader" | "Narrow" | "SidebarMenu";
type MobileLayoutType =
  | "HamburgerMenu"
  | "StickyHeader"
  | "StandardHeader"
  | "BottomBar";

interface LayoutProps {
  children: React.ReactNode;
  desktop?: LayoutType; // Desktop layout type
  mobile?: MobileLayoutType; // Mobile layout type
  userRole?: string; // Pass user role for dynamic route handling
}

// Create hash maps for desktop and mobile layouts
const desktopLayouts: Record<
  LayoutType,
  React.ComponentType<{ children: React.ReactNode; userRole?: string }>
> = {
  StandardHeader,
  StickyHeader: PlaceholderLayout, // Use placeholder for now
  Narrow,
  SidebarMenu,
};

const mobileLayouts: Record<
  MobileLayoutType,
  React.ComponentType<{ children: React.ReactNode; userRole?: string }>
> = {
  HamburgerMenu: PlaceholderLayout, // Use placeholder for now
  StickyHeader: PlaceholderLayout, // Use placeholder for now
  StandardHeader,
  BottomBar,
};

// Default mapping between desktop and mobile layouts
const defaultMobileMapping: Record<LayoutType, MobileLayoutType> = {
  StandardHeader: "HamburgerMenu",
  StickyHeader: "StickyHeader",
  Narrow: "StandardHeader",
  SidebarMenu: "BottomBar",
};

// Default mapping between mobile and desktop layouts
const defaultDesktopMapping: Record<MobileLayoutType, LayoutType> = {
  HamburgerMenu: "StandardHeader",
  StickyHeader: "StickyHeader",
  StandardHeader: "Narrow",
  BottomBar: "SidebarMenu",
};

export default function Layout({
  children,
  desktop,
  mobile,
  userRole,
}: LayoutProps) {
  const desktopLayout = desktop || layout.desktop || "StandardHeader"; // Fallback to default desktop layout
  const mobileLayout =
    mobile ||
    layout.mobile ||
    defaultMobileMapping[desktopLayout as LayoutType] || // Map to a default mobile layout if not provided
    "HamburgerMenu"; // Final fallback for mobile layout

  const SelectedDesktopLayout =
    desktopLayouts[desktopLayout as LayoutType] || StandardHeader; // Fallback to StandardHeader

  const SelectedMobileLayout =
    mobileLayouts[mobileLayout as MobileLayoutType] || BottomBar; // Fallback to BottomBar

  console.log(`Selected Desktop Layout: ${desktopLayout}`);
  console.log(`Selected Mobile Layout: ${mobileLayout}`);

  const isMobile = useIsMobile(1000); // Checks if screen width < 640px (Tailwind 'sm' breakpoint)

  return (
    <>
      {isMobile ? (
        <SelectedMobileLayout userRole={userRole} layout={mobile} variation={LAYOUT.mobile.header.variation}>
          {children}
        </SelectedMobileLayout>
      ) : (
        <SelectedDesktopLayout userRole={userRole} layout={desktop} variation={LAYOUT.desktop.header.variation}>
          {children}
        </SelectedDesktopLayout>
      )}
    </>
  );
}
