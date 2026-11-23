import Image from "next/image";
import Link from "next/link";
import { getHighlights } from "@/lib/data-store";
import { Award, Trophy, Globe, GraduationCap, Building2, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "5-Year Highlights & Milestones — AMEPAC Arba Minch",
  description:
    "A dedicated chronological record of AMEPAC's major milestones from 2020 through 2024, complete with photographs and captions.",
};

export default async function HighlightsPage() {
  const highlights = await getHighlights();

  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Chronological Record
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              5-Year Highlights & Milestones
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              Explore the documented milestones of AMEPAC—from our registration under Building Tomorrow to our acrobats representing Ethiopia in the All-African Games and international tours.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {highlights.map((hl, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={hl.id}
                className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 overflow-hidden shadow-sm hover:border-[#C64B24] transition-all"
              >
                <div className={`grid grid-cols-1 md:grid-cols-12 ${isReversed ? "md:flex-row-reverse" : ""}`}>
                  {/* Photo Side */}
                  <div className={`md:col-span-5 relative min-h-[220px] md:min-h-full bg-[#17251F] ${isReversed ? "md:order-2" : ""}`}>
                    <Image
                      src={hl.imageUrl || "/images/circus_performance_1.png"}
                      alt={hl.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#0E1814]/90 text-[#D6A84F] text-xs font-extrabold border border-[#D6A84F]/30">
                      {hl.year}
                    </div>
                  </div>

                  {/* Caption Side */}
                  <div className={`md:col-span-7 p-6 sm:p-8 flex flex-col justify-between ${isReversed ? "md:order-1" : ""}`}>
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold text-[#C64B24] uppercase tracking-wider">
                        {hl.category}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#17251F]">
                        {hl.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
                        {hl.caption}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs text-[#17251F]/60">
                      <span>Documented Milestone &check;</span>
                      <span className="font-semibold text-[#C64B24]">Arba Minch PAC</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Link to Troupes / Booking */}
          <div className="pt-8 text-center space-y-4">
            <p className="text-xs text-[#17251F]/70">
              Want to see our award-winning performers in action?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/troupes"
                className="px-6 py-2.5 rounded bg-[#17251F] text-[#F7F3EA] text-xs font-semibold hover:bg-[#23382F] transition-colors"
              >
                Meet the Troupes
              </Link>
              <Link
                href="/book"
                className="px-6 py-2.5 rounded bg-[#C64B24] text-[#F7F3EA] text-xs font-semibold hover:bg-[#A83C1A] transition-colors"
              >
                Book a Performance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
