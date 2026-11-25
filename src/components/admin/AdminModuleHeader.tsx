import React from "react";
import { Plus } from "lucide-react";

interface AdminModuleHeaderProps {
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  totalCount: number;
  publishedCount?: number;
  draftCount?: number;
  createLabel?: string;
  onCreate?: () => void;
}

export function AdminModuleHeader({
  badge,
  title,
  description,
  icon,
  totalCount,
  publishedCount,
  draftCount,
  createLabel = "Create New",
  onCreate,
}: AdminModuleHeaderProps) {
  return (
    <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
          {badge}
        </span>
        <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2.5">
          {icon}
          {title} ({totalCount})
        </h1>
        <p className="text-xs text-[#17251F]/70 mt-1 max-w-2xl leading-relaxed">
          {description}
        </p>

        {(publishedCount !== undefined || draftCount !== undefined) && (
          <div className="flex items-center gap-2 mt-3 text-[11px] font-semibold">
            {publishedCount !== undefined && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#17251F] text-[#D6A84F] border border-[#D6A84F]/30">
                {publishedCount} Published
              </span>
            )}
            {draftCount !== undefined && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#C64B24]/10 text-[#C64B24] border border-[#C64B24]/30">
                {draftCount} Drafts
              </span>
            )}
          </div>
        )}
      </div>

      {onCreate && (
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A] transition-all shadow-md shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          {createLabel}
        </button>
      )}
    </div>
  );
}
