// app/_components/sheet.tsx
"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  children: React.ReactNode;
}

export function Sheet({ isOpen, onClose, side = "left", children }: SheetProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-60">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 dark:bg-white/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={`
          fixed top-0 ${side === "left" ? "left-0" : "right-0"}
          h-full w-[280px] bg-white dark:bg-[#111]
          shadow-xl transition-transform duration-300
          border-r ${side === "left" ? "border-r" : "border-l"}
          border-gray-200 dark:border-[#252525]
        `}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

interface SheetTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function SheetTrigger({ children, onClick }: SheetTriggerProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className="focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 rounded-md"
    >
      {children}
    </button>
  );
}

interface SheetContentProps {
  children: React.ReactNode;
}

export function SheetContent({ children }: SheetContentProps) {
  return <div className="h-full flex flex-col">{children}</div>;
}