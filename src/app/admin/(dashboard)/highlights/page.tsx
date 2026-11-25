import { getHighlights } from "@/lib/data-store";
import { Trophy, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "5-Year Highlights Management — AMEPAC Admin",
};

export default async function AdminHighlightsPage() {
  const highlights = await getHighlights();

  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm">
        <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
          Milestones & History
        </span>
        <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#C64B24]" />
          Five-Year Verified Highlights ({highlights.length})
        </h1>
        <p className="text-xs text-[#17251F]/70 mt-1">
          Historical record from 2020 through 2024 honoring national representation, China scholarships, and parent NGO registration.
        </p>
      </div>

      <div className="space-y-3">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm flex items-start gap-4 text-xs"
          >
            <div className="w-14 h-14 rounded-lg bg-[#17251F] text-[#D6A84F] flex flex-col items-center justify-center font-black shrink-0 border border-[#D6A84F]/30">
              <span className="text-sm">{item.year}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-bold uppercase">
                  {item.category}
                </span>
                <strong className="text-sm font-extrabold text-[#17251F]">{item.title}</strong>
              </div>
              <p className="text-xs text-[#17251F]/80 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
