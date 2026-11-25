"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "max-w-lg" | "max-w-xl" | "max-w-2xl" | "max-w-3xl" | "max-w-4xl";
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-2xl",
}: AdminModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className={`bg-[#F7F3EA] rounded-2xl border border-[#D6A84F]/50 shadow-2xl w-full ${maxWidth} overflow-hidden max-h-[90vh] flex flex-col my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#17251F] text-[#F7F3EA] px-6 py-4.5 border-b border-[#23382F] flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-extrabold text-lg text-[#F7F3EA]">{title}</h3>
            {subtitle && (
              <p className="text-xs text-[#D6A84F] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#F7F3EA]/70 hover:text-[#F7F3EA] hover:bg-[#23382F] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
