// app/_templates/master/index.tsx
import React from "react";
import config from "@/app/config";
import AdminLayout from "@/app/_templates/admin";
import BasicLayout from "@/app/_templates/basic";
import StackedLayout from "@/app/_templates/stacked"; // <-- import stacked layout

interface MasterLayoutProps {
  children: React.ReactNode;
}

export default function MasterLayout({ children }: MasterLayoutProps) {
  const { layout } = config;

  switch (layout) {
    case "admin":
      return <AdminLayout>{children}</AdminLayout>;
    case "stacked": // <-- new case for 'stacked'
      return <StackedLayout>{children}</StackedLayout>;
    case "basic":
    default:
      return <BasicLayout>{children}</BasicLayout>;
  }
}
