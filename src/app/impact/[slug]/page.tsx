import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getImpactStories, getImpactStoryBySlug } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckCircle2, ShieldCheck, HeartHandshake, ArrowRight, Shield } from "lucide-react";
import { CallToAction } from "@/components/ui/CallToAction";

interface ImpactDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const stories = await getImpactStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ImpactDetailPageProps) {
  const story = await getImpactStoryBySlug(params.slug);
  if (!story) return { title: "Impact Story Not Found — AMEPAC" };
  return {
    title: `${story.title} — AMEPAC Social Impact`,
    description: story.summary,
  };
}

export default async function ImpactDetailPage({ params }: ImpactDetailPageProps) {
  const story = await getImpactStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  const allStories = await getImpactStories();
  const otherStories = allStories.filter((s) => s.slug !== story.slug);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Social Impact", href: "/impact" },
          { label: story.title },
        ]}
      />

      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 uppercase inline-block">
              {story.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              {story.title}
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              {story.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              {/* Hero Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#D6A84F]/40 bg-[#17251F] shadow-md">
                <Image
                  src={story.heroImage}
                  alt={story.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Main Narrative */}
              <div className="bg-[#EBE5D6] p-6 sm:p-10 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-6">
                <p className="text-sm sm:text-base font-semibold text-[#17251F] leading-relaxed">
                  {story.summary}
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
                  {story.body.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {story.quote && (
                  <blockquote className="p-5 rounded-xl bg-[#F7F3EA] border-l-4 border-[#C64B24] italic text-xs sm:text-sm text-[#17251F]/90 space-y-2">
                    <p>&ldquo;{story.quote.text}&rdquo;</p>
                    <footer className="not-italic font-bold text-xs text-[#C64B24]">
                      — {story.quote.author}
                    </footer>
                  </blockquote>
                )}

                {/* Measurable Outcomes */}
                <div className="pt-4 border-t border-[#D6A84F]/30 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#17251F]">
                    Demonstrated Key Outcomes
                  </h3>
                  <div className="space-y-2 text-xs">
                    {story.keyOutcomes.map((outcome: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                        <span className="text-[#17251F]/85 font-medium">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Child Safeguarding Note */}
                <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30 flex items-start gap-3 text-xs">
                  <Shield className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                  <p className="text-[#17251F]/80 leading-relaxed">
                    <strong>Safeguarding & Identity Protection:</strong> This story documents our youth development program managed under Building Tomorrow Integrated Youth & Community Development Organization (registered Nov 2022). All child participant identities and images are protected according to formal guardian consent protocols.
                  </p>
                </div>
              </div>

              {/* Other Stories */}
              {otherStories.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#17251F]">
                    Explore Other Impact Case Studies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherStories.map((os) => (
                      <Link
                        key={os.id}
                        href={`/impact/${os.slug}`}
                        className="p-5 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30 hover:border-[#C64B24] transition-all group flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#C64B24] uppercase block">
                            {os.category}
                          </span>
                          <h4 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24]">
                            {os.title}
                          </h4>
                          <p className="text-xs text-[#17251F]/70 line-clamp-2">
                            {os.summary}
                          </p>
                        </div>
                        <span className="text-xs text-[#C64B24] font-semibold mt-3 flex items-center gap-1">
                          Read Story &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Support & Reinvestment Action */}
            <div className="lg:col-span-4 bg-[#17251F] text-[#F7F3EA] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-xl space-y-6 sticky top-28">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#D6A84F] tracking-wider block mb-1">
                  Community Partnership
                </span>
                <h3 className="text-xl font-bold text-[#F7F3EA]">
                  Support Our Mission
                </h3>
                <p className="text-xs text-[#F7F3EA]/75 mt-1 leading-relaxed">
                  Your performance bookings and contributions directly fund scholastic supplies, training safety mattresses, and daily nutrition for street youth in Arba Minch.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Link
                  href="/support"
                  className="w-full text-center block py-3 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors shadow"
                >
                  Contribute to Facility Fund
                </Link>
                <Link
                  href="/book-us"
                  className="w-full text-center block py-2.5 px-4 rounded border border-[#D6A84F] text-[#D6A84F] font-semibold text-xs hover:bg-[#D6A84F] hover:text-[#17251F] transition-colors"
                >
                  Book a Benefit Performance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
