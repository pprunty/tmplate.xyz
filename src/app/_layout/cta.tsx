"use client";

import React from "react";
import AuthButton from "@/app/_components/auth-button";

// We define what “options” might be. For example,
// ["auth", "notifications", "shopping_cart"].
type CTAOption = "auth" | "notifications" | "shopping_cart";

interface CTAProps {
  options?: CTAOption[];
}

export default function CTA({ options = [] }: CTAProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* Example: If the `auth` option is present, render login/signup buttons */}
      {options.includes("auth") && (
        <>
          <AuthButton type="login" />
          <AuthButton type="signup" />
        </>
      )}

      {/* Example: If the `notifications` option is present */}
      {options.includes("notifications") && (
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
          aria-label="Notifications"
        >
          🔔
        </button>
      )}

      {/* Example: If the `shopping_cart` option is present */}
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
