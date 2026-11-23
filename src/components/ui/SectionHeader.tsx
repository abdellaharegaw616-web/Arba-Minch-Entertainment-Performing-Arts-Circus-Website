import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  linkHref,
  linkLabel,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 ${
        centered
          ? "text-center max-w-2xl mx-auto"
          : "flex flex-col md:flex-row md:items-end justify-between gap-4"
      }`}
    >
      <div>
        {badge && (
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider block mb-1">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17251F]">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-[#17251F]/70 mt-1 max-w-xl">
            {description}
          </p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C64B24] hover:text-[#A83C1A] shrink-0 transition-colors"
        >
          {linkLabel} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
