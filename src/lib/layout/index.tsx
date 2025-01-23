"use client";

import React from "react";
import { layout } from "@/config";
import { LAYOUT } from "@/config";

// Import all layout variations
import StandardHeader from "@/lib/layout/variations/StandardHeader";
import Narrow from "@/lib/layout/variations/Narrow";
import SidebarMenu from "@/lib/layout/variations/SidebarMenu";
import BottomBar from "@/lib/layout/variations/BottomBar";

// Placeholder layout
const PlaceholderLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

type LayoutType = "StandardHeader" | "StickyHeader" | "Narrow" | "SidebarMenu";
type MobileLayoutType = "HamburgerMenu" | "StickyHeader" | "StandardHeader" | "BottomBar";

interface LayoutProps {
  children: React.ReactNode;
  desktop?: LayoutType;
  mobile?: MobileLayoutType;
  userRole?: string;
  isMobile?: boolean;
}

// Create hash maps for desktop and mobile layouts
const desktopLayouts: Record<
  LayoutType,
  React.ComponentType<{
    children: React.ReactNode;
    userRole?: string;
    type?: LayoutType; // Add type prop
    variation?: string; // Add variation prop
  }>
> = {
  StandardHeader,
  StickyHeader: PlaceholderLayout,
  Narrow,
  SidebarMenu,
};

const mobileLayouts: Record<
  MobileLayoutType,
  React.ComponentType<{
    children: React.ReactNode;
    userRole?: string;
    type?: MobileLayoutType; // Add type prop
    variation?: string; // Add variation prop
  }>
> = {
  HamburgerMenu: PlaceholderLayout,
  StickyHeader: PlaceholderLayout,
  StandardHeader,
  BottomBar,
};

// Default mapping
const defaultMobileMapping: Record<LayoutType, MobileLayoutType> = {
  StandardHeader: "HamburgerMenu",
  StickyHeader: "StickyHeader",
  Narrow: "StandardHeader",
  SidebarMenu: "BottomBar",
};

export default function Layout({
  children,
  desktop,
  mobile,
  userRole,
  isMobile,
}: LayoutProps) {
  const desktopLayout = desktop || layout.desktop || "StandardHeader";
  const mobileLayout =
    mobile ||
    layout.mobile ||
    defaultMobileMapping[desktopLayout as LayoutType] ||
    "HamburgerMenu";

  const SelectedDesktopLayout =
    desktopLayouts[desktopLayout as LayoutType] || StandardHeader;

  const SelectedMobileLayout =
    mobileLayouts[mobileLayout as MobileLayoutType] || BottomBar;

  const finalIsMobile = isMobile ?? false;

  console.log(`Selected Desktop Layout: ${desktopLayout}`);
  console.log(`Selected Mobile Layout: ${mobileLayout}`);
  console.log(`isMobile (server-detected): ${finalIsMobile}`);

  return finalIsMobile ? (
    <SelectedMobileLayout
      userRole={userRole}
      type={mobileLayout} // Pass mobile layout type
      variation={LAYOUT.mobile.variation} // Pass mobile layout variation
    >
      {children}
    </SelectedMobileLayout>
  ) : (
    <SelectedDesktopLayout
      userRole={userRole}
      type={desktopLayout} // Pass desktop layout type
      variation={LAYOUT.desktop.variation} // Pass desktop layout variation
    >
      {children}
    </SelectedDesktopLayout>
  );
}

