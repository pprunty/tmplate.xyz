"use client";

import React from 'react';
import { layout } from '@/config';
import { useIsMobile } from '@/hooks/useIsMobile';

// Import all layout variations
import HeaderAndFooter from '@/layout/templates/HeaderAndFooter';
import Narrow from '@/layout/templates/Narrow';
import SidebarMenu from '@/layout/templates/SidebarMenu';
import BottomBar from '@/layout/templates/BottomBar';

// Define a placeholder component for layouts not yet implemented
const PlaceholderLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

type LayoutType = "HeaderAndFooter" | "StickyHeader" | "Narrow" | "SidebarMenu";
type MobileLayoutType = "HamburgerMenu" | "StickyHeader" | "HeaderAndFooter" | "BottomBar";

interface LayoutProps {
  children: React.ReactNode;
  type?: LayoutType;
  mobile?: MobileLayoutType;
}

// Create hash maps for desktop and mobile layouts
const desktopLayouts: Record<LayoutType, React.ComponentType<{ children: React.ReactNode }>> = {
  HeaderAndFooter,
  StickyHeader: PlaceholderLayout, // Use placeholder for now
  Narrow,
  SidebarMenu,
};

const mobileLayouts: Record<MobileLayoutType, React.ComponentType<{ children: React.ReactNode }>> = {
  HamburgerMenu: PlaceholderLayout, // Use placeholder for now
  StickyHeader: PlaceholderLayout,  // Use placeholder for now
  HeaderAndFooter: HeaderAndFooter,
  BottomBar,
};

export default function Layout({ children, type, mobile }: LayoutProps) {
  const SelectedDesktopLayout =
    desktopLayouts[type || (layout.desktop as LayoutType)] ||
    desktopLayouts[layout.desktop as LayoutType];

  const SelectedMobileLayout =
    mobileLayouts[mobile || (layout.mobile as MobileLayoutType)] ||
    mobileLayouts[layout.mobile as MobileLayoutType];

  const isMobile = useIsMobile(640); // Checks if screen width < 640px (Tailwind 'sm' breakpoint)

  return (
    <>
      {isMobile ? (
        <SelectedMobileLayout>{children}</SelectedMobileLayout>
      ) : (
        <SelectedDesktopLayout>{children}</SelectedDesktopLayout>
      )}
    </>
  );
}
