import Image from "next/image";
import Link from "next/link";
import { Troupe } from "@/types";
import { ArrowRight, Users, Sparkles } from "lucide-react";

export function TroupeCard({ troupe }: { troupe: Troupe }) {
  return (
    <div className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 overflow-hidden flex flex-col justify-between hover:border-[#C64B24] hover:shadow-lg transition-all group">
      <div className="relative h-48 bg-[#17251F] overflow-hidden">
        <Image
          src={troupe.featuredImage || "/images/circus_performance_1.png"}
          alt={`${troupe.name} performing live`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-[#17251F]/90 text-[11px] text-[#D6A84F] border border-[#D6A84F]/30 font-semibold flex items-center gap-1">
          <Users className="w-3 h-3" />
          {troupe.membersCount} {troupe.membersCount === 1 ? "Artist" : "Artists"}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-lg text-[#17251F] group-hover:text-[#C64B24] transition-colors">
            <Link href={`/troupes/${troupe.slug}`} className="focus:outline-none">
              {troupe.name}
            </Link>
          </h3>
          {troupe.subTitle && (
            <p className="text-xs font-semibold text-[#B88C35] mt-0.5">
              {troupe.subTitle}
            </p>
          )}
          <p className="text-xs text-[#17251F]/80 mt-2 line-clamp-3 leading-relaxed">
            {troupe.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
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

        <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
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
