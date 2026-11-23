import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTroupes, getTroupeBySlug } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Users, Sparkles, Calendar, ArrowRight, Shield, Award } from "lucide-react";
import { CallToAction } from "@/components/ui/CallToAction";

interface TroupeDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const troupes = await getTroupes();
  return troupes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TroupeDetailPageProps) {
  const troupe = await getTroupeBySlug(params.slug);
  if (!troupe) return { title: "Troupe Not Found" };
  return {
    title: `${troupe.name} — AMEPAC Performing Ensemble`,
    description: troupe.description,
  };
}

export default async function TroupeDetailPage({ params }: TroupeDetailPageProps) {
  const troupe = await getTroupeBySlug(params.slug);

  if (!troupe) {
    notFound();
  }

  const allTroupes = await getTroupes();
  const otherTroupes = allTroupes.filter((t) => t.slug !== troupe.slug);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Troupes", href: "/troupes" },
          { label: troupe.name },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#23382F] text-[#D6A84F] text-xs font-bold uppercase border border-[#D6A84F]/30">
                <Users className="w-3.5 h-3.5" />
                {troupe.membersCount} {troupe.membersCount === 1 ? "Solo Performer" : "Artists in Ensemble"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
                {troupe.name}
              </h1>
              {troupe.subTitle && (
                <p className="text-base sm:text-lg text-[#D6A84F] font-medium">
                  {troupe.subTitle}
                </p>
              )}
              <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
                {troupe.description}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="p-6 rounded-2xl bg-[#0E1814] border border-[#D6A84F]/30 space-y-4">
                <h3 className="font-bold text-sm text-[#D6A84F] uppercase tracking-wider">
                  Quick Troupe Facts
                </h3>
                <div className="space-y-2 text-xs text-[#F7F3EA]/80">
                  <p><strong className="text-[#F7F3EA]">Home Base:</strong> Arba Minch, South Ethiopia</p>
                  <p><strong className="text-[#F7F3EA]">Disciplines:</strong> {troupe.acts.slice(0, 3).join(", ")}</p>
                  <p><strong className="text-[#F7F3EA]">Touring Status:</strong> Available Regionally & Internationally</p>
                </div>
                <Link
                  href={`/book-us?troupe=${encodeURIComponent(troupe.name)}`}
                  className="w-full text-center block py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors"
                >
                  Book {troupe.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Visual and Roster Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-8">
              {/* Acts List */}
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C64B24]" />
                  Acts & Technical Repertoire
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {troupe.acts.map((act: string) => (
                    <div
                      key={act}
                      className="p-3 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/20 font-medium text-[#17251F]"
                    >
                      {act}
                    </div>
                  ))}
                </div>
              </div>

              {/* Roster of Artists */}
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C64B24]" />
                  Artists in Ensemble
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {troupe.members.map((member: string) => (
                    <div
                      key={member}
                      className="p-3.5 rounded-lg bg-[#17251F] text-[#F7F3EA] text-xs font-semibold flex items-center justify-between"
                    >
                      <span>{member}</span>
                      <span className="text-[10px] text-[#D6A84F]">Professional Artist</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Photo */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D6A84F]/40 shadow-xl bg-[#17251F]">
                <Image
                  src={troupe.featuredImage || "/images/circus_performance_1.png"}
                  alt={troupe.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30 text-xs text-[#17251F]/80">
                <strong className="text-[#C64B24] block mb-1">Grassroots Athletic Pathway:</strong>
                Every artist in {troupe.name} was coached from fundamental gymnastics in Arba Minch under the guidance of FIG-certified coach Tesfahun Mergia.
              </div>
            </div>
          </div>

          {/* Other Troupes Showcase */}
          <div className="space-y-4 pt-8 border-t border-[#EBE5D6]">
            <h3 className="text-lg font-bold text-[#17251F]">
              Explore Other AMEPAC Troupes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherTroupes.map((ot) => (
                <Link
                  key={ot.id}
                  href={`/troupes/${ot.slug}`}
                  className="p-4 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30 hover:border-[#C64B24] transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#C64B24] uppercase block mb-1">
                      {ot.membersCount} {ot.membersCount === 1 ? "Artist" : "Artists"}
                    </span>
                    <h4 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                      {ot.name}
                    </h4>
                    <p className="text-xs text-[#17251F]/70 mt-1 line-clamp-2">
                      {ot.description}
                    </p>
                  </div>
                  <span className="text-xs text-[#C64B24] font-semibold mt-3 flex items-center gap-1">
                    Profile &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
