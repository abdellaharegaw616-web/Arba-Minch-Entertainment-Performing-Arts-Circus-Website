import Image from "next/image";
import Link from "next/link";
import { getTroupes } from "@/lib/data-store";
import { Users, Sparkles, Calendar, ArrowRight, Shield, Check } from "lucide-react";

export const metadata = {
  title: "Performing Arts Troupes — AMEPAC Arba Minch",
  description:
    "Explore the 5 official performing arts troupes of AMEPAC: Troupe African Pride, Troupe Gamo Bayira, Troupe Black Lioness, Arba Minch Yoga Brothers, and Kefeni Queen of Gamo.",
};

export default async function TroupesPage() {
  const troupes = await getTroupes();

  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Ensemble Roster
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              AMEPAC Performing Arts Troupes
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              Meet our 5 specialized performing ensembles. Every member trains rigorously in Arba Minch, mastering high-level acrobatics, extreme contortion, Chinese pole, banquine tosses, and object manipulation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Troupes Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {troupes.map((troupe, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={troupe.id}
                id={troupe.slug}
                className="scroll-mt-28 bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 overflow-hidden shadow-sm"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  {/* Visual Side */}
                  <div className={`lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-[#17251F] ${isReversed ? "lg:order-2" : ""}`}>
                    <Image
                      src={troupe.featuredImage || "/images/circus_performance_1.png"}
                      alt={`${troupe.name} performing in Arba Minch`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#17251F]/90 text-xs font-bold text-[#D6A84F] border border-[#D6A84F]/30">
                      {troupe.membersCount} {troupe.membersCount === 1 ? "Solo Artist" : "Ensemble Members"}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between ${isReversed ? "lg:order-1" : ""}`}>
                    <div className="space-y-5">
                      <div>
                        <div className="text-xs font-bold text-[#C64B24] uppercase tracking-wider mb-1">
                          Troupe Profile 0{index + 1}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F]">
                          {troupe.name}
                        </h2>
                        {troupe.subTitle && (
                          <p className="text-sm font-semibold text-[#B88C35] mt-1">
                            {troupe.subTitle}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
                        {troupe.description}
                      </p>

                      {/* Featured Acts */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#17251F] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C64B24]" />
                          Signature Acts & Repertoire
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {troupe.acts.map((act: string) => (
                            <span
                              key={act}
                              className="px-2.5 py-1 rounded bg-[#F7F3EA] border border-[#D6A84F]/30 text-xs font-medium text-[#17251F]"
                            >
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Official Roster Members */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#17251F] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C64B24]" />
                          Artists in Troupe
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {troupe.members.map((member: string) => (
                            <span
                              key={member}
                              className="px-2.5 py-1 rounded bg-[#17251F] text-[#F7F3EA] text-xs font-medium flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Troupe CTA */}
                    <div className="mt-8 pt-6 border-t border-[#D6A84F]/30 flex flex-wrap items-center justify-between gap-4">
                      <Link
                        href={`/troupes/${troupe.slug}`}
                        className="text-xs font-bold text-[#17251F] hover:text-[#C64B24] flex items-center gap-1 underline underline-offset-4"
                      >
                        Full Troupe Profile & Repertoire &rarr;
                      </Link>
                      <Link
                        href={`/book-us?troupe=${encodeURIComponent(troupe.name)}`}
                        className="px-5 py-2.5 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs sm:text-sm hover:bg-[#A83C1A] transition-colors flex items-center gap-1.5 shadow"
                      >
                        <Calendar className="w-4 h-4" />
                        Book {troupe.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safety & Safeguarding Notice */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-12 border-t border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#D6A84F] shrink-0" />
              <div>
                <h3 className="font-bold text-sm text-[#F7F3EA]">FIG Safeguarding & Safety Certified</h3>
                <p className="text-xs text-[#F7F3EA]/70 mt-0.5">
                  All training protocols adhere to international gymnastics coaching ethics and child safeguarding guidelines.
                </p>
              </div>
            </div>
            <Link
              href="/book"
              className="px-6 py-2.5 rounded bg-[#D6A84F] text-[#17251F] font-bold text-xs hover:bg-[#E4BC6E] transition-colors shrink-0"
            >
              Request Custom Troupe Ensemble
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
