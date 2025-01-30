// app/_templates/master/index.tsx
import React from "react";
import config from "@/app/config";
import AdminLayout from "@/app/_templates/admin";
import BasicLayout from "@/app/_templates/basic";
import StackedLayout from "@/app/_templates/stacked"; // <-- import stacked layout
import SocialLayout from "@/app/_templates/social";

interface MasterLayoutProps {
  children: React.ReactNode;
}

export default function MasterLayout({ children }: MasterLayoutProps) {
  const { layout } = config;

  switch (layout) {
    case "basic":
    default:
      return <BasicLayout>{children}</BasicLayout>;
  }
}
