"use client";

import React from "react";
import AuthButton from "@/app/_components/auth-button";

// Define the CTAOption type
export type CTAOption = "auth" | "notifications" | "shopping_cart";

interface CTAProps {
  options?: CTAOption[];
}

export default function CTA({ options = [] }: CTAProps) {
  return (
    <div className="flex items-center space-x-2">
      {options.includes("auth") && (
        <>
          <AuthButton type="login" />
          <AuthButton type="signup" />
        </>
      )}

      {options.includes("notifications") && (
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
          aria-label="Notifications"
        >
          🔔
        </button>
      )}

      {options.includes("shopping_cart") && (
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
          aria-label="Shopping Cart"
        >
          🛒
        </button>
      )}
    </div>
  );
}
