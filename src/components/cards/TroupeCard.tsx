import Image from "next/image";
import Link from "next/link";
import { Troupe } from "@/types";
import { ArrowRight, Users, Sparkles } from "lucide-react";

export function TroupeCard({ troupe }: { troupe: Troupe }) {
  return (
    <div className="bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 overflow-hidden flex flex-col justify-between hover:border-[#C64B24] hover:shadow-xl transition-all duration-300 group">
      {/* Circular Portrait Presentation */}
      <div className="pt-6 pb-2 px-6 flex flex-col items-center bg-gradient-to-b from-[#17251F]/5 to-transparent">
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#D6A84F] shadow-lg bg-[#17251F] group-hover:scale-105 group-hover:border-[#C64B24] transition-all duration-300">
          <Image
            src={troupe.featuredImage || "/images/circus_performance_1.png"}
            alt={`${troupe.name} portrait`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 144px, 144px"
          />
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#17251F] text-[11px] font-semibold text-[#D6A84F] border border-[#D6A84F]/30 shadow-xs">
          <Users className="w-3 h-3 text-[#D6A84F]" />
          {troupe.membersCount} {troupe.membersCount === 1 ? "Solo Artist" : "Artists"}
        </div>
      </div>

      <div className="p-5 pt-2 flex-1 flex flex-col justify-between space-y-4 text-center">
        <div>
          <h3 className="font-extrabold text-lg text-[#17251F] group-hover:text-[#C64B24] transition-colors">
            <Link href={`/troupes/${troupe.slug}`} className="focus:outline-none">
              {troupe.name}
            </Link>
          </h3>
          {troupe.subTitle && (
            <p className="text-xs font-semibold text-[#B88C35] mt-1">
              {troupe.subTitle}
            </p>
          )}
          <p className="text-xs text-[#17251F]/80 mt-2.5 line-clamp-3 leading-relaxed">
            {troupe.description}
          </p>

          <div className="mt-3.5 flex flex-wrap justify-center gap-1.5">
            {troupe.acts.slice(0, 3).map((act) => (
              <span
                key={act}
                className="text-[10px] px-2 py-0.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/30 text-[#17251F] font-medium"
              >
                {act}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3.5 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
          <Link
            href={`/book-us?troupe=${encodeURIComponent(troupe.name)}`}
            className="text-[11px] font-semibold text-[#17251F] hover:text-[#C64B24]"
          >
            Book Troupe
          </Link>
          <Link
            href={`/troupes/${troupe.slug}`}
            className="font-bold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1"
          >
            Troupe Profile <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
