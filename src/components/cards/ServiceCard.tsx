import Link from "next/link";
import { ServicePackage } from "@/types";
import { ArrowRight, Check } from "lucide-react";

export function ServiceCard({ service }: { service: ServicePackage }) {
  return (
    <div className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/30 p-6 flex flex-col justify-between hover:border-[#C64B24] hover:shadow-md transition-all group">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-[#C64B24] uppercase tracking-wider px-2 py-0.5 rounded bg-[#C64B24]/10">
            {service.category}
          </span>
        </div>
        <h3 className="font-bold text-lg text-[#17251F] group-hover:text-[#C64B24] transition-colors">
          <Link href={`/services/${service.slug}`} className="focus:outline-none">
            {service.title}
          </Link>
        </h3>
        <p className="text-xs text-[#17251F]/80 mt-2 leading-relaxed font-medium">
          {service.summary}
        </p>

        {service.details && service.details.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-xs text-[#17251F]/75">
            {service.details.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C64B24] shrink-0 mt-0.5" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs">
        <Link
          href={`/book-us?package=${encodeURIComponent(service.title)}`}
          className="text-[11px] font-semibold text-[#17251F] hover:text-[#C64B24] transition-colors"
        >
          Book Package
        </Link>
        <Link
          href={`/services/${service.slug}`}
          className="font-bold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          Full Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
