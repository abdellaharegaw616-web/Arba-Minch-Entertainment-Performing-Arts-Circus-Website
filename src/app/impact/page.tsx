import Link from "next/link";
import Image from "next/image";
import { getImpactStories } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake, Shield } from "lucide-react";
import { CallToAction } from "@/components/ui/CallToAction";

export const metadata = {
  title: "Social Impact & Youth Empowerment — AMEPAC Arba Minch",
  description:
    "Explore how AMEPAC and Building Tomorrow Integrated Youth transform the lives of street children, enforce regular schooling, and empower female acrobats in Arba Minch, Ethiopia.",
};

export default async function ImpactPage() {
  const stories = await getImpactStories();

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Social Impact" }]} />

      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Measurable Change & Community Healing
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Social Impact & Youth Empowerment
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              AMEPAC is more than a stage spectacle—it is an engine of social healing and economic resilience for street youth and vulnerable families in Arba Minch.
            </p>
          </div>
        </div>
      </section>

      {/* Ethical Safeguarding Declaration Banner */}
      <section className="bg-[#D6A84F]/10 border-b border-[#D6A84F]/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs text-[#17251F]">
            <Shield className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#C64B24]">
                Ethical Safeguarding & Minor Protection Charter:{" "}
              </strong>
              <span>
                All social impact accounts document genuine community transformation while honoring participant dignity and agency. Narratives and photographs of youth and former street children are published exclusively under verified parental, guardian, or institutional consent, strictly avoiding exploitative or humiliating framing.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 overflow-hidden flex flex-col justify-between hover:border-[#C64B24] transition-all group shadow-sm"
              >
                <div>
                  <div className="relative h-56 bg-[#17251F]">
                    <Image
                      src={story.heroImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#17251F]/90 text-[10px] text-[#D6A84F] font-bold border border-[#D6A84F]/30">
                      {story.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-extrabold text-lg text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                      <Link href={`/impact/${story.slug}`}>
                        {story.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#17251F]/80 leading-relaxed font-semibold">
                      {story.subtitle}
                    </p>
                    <p className="text-xs text-[#17251F]/70 line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#17251F]/60">Documented Impact</span>
                    <Link
                      href={`/impact/${story.slug}`}
                      className="font-bold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1"
                    >
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
