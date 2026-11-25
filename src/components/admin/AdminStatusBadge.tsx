import React from "react";
import { CheckCircle2, Clock, AlertTriangle, Eye, EyeOff } from "lucide-react";

interface AdminStatusBadgeProps {
  status: "published" | "draft" | "approved" | "pending" | "active" | "inactive" | string;
  className?: string;
}

export function AdminStatusBadge({ status, className = "" }: AdminStatusBadgeProps) {
  const normalized = status?.toLowerCase();

  if (normalized === "published" || normalized === "approved" || normalized === "active") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#17251F] text-[#D6A84F] border border-[#D6A84F]/40 shadow-xs ${className}`}
      >
        <CheckCircle2 className="w-3 h-3 text-[#D6A84F]" />
        {normalized === "published" ? "Published" : normalized === "approved" ? "Approved" : "Active"}
      </span>
    );
  }

  if (normalized === "draft" || normalized === "pending") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBE5D6] text-[#C64B24] border border-[#C64B24]/40 shadow-xs ${className}`}
      >
        <Clock className="w-3 h-3 text-[#C64B24]" />
        {normalized === "draft" ? "Draft" : "Pending Review"}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#17251F]/10 text-[#17251F]/60 border border-[#17251F]/20 ${className}`}
    >
      <EyeOff className="w-3 h-3" />
      Inactive
    </span>
  );
}
