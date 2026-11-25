import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTroupes, getTroupeBySlug, getServices } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Users,
  Sparkles,
  Calendar,
  ArrowRight,
  Shield,
  Award,
  AlertTriangle,
  Info,
  CheckCircle2,
  Briefcase,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
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
  if (!troupe) return { title: "Troupe Not Found — AMEPAC" };
  return {
    title: `${troupe.name} — AMEPAC Performing Ensemble`,
    description: troupe.description,
    openGraph: {
      title: `${troupe.name} | AMEPAC Circus & Performing Arts`,
      description: troupe.description,
      images: [troupe.featuredImage || "/images/circus_performance_1.png"],
    },
  };
}

export default async function TroupeDetailPage({ params }: TroupeDetailPageProps) {
  const troupe = await getTroupeBySlug(params.slug);

  if (!troupe) {
    notFound();
  }

  const allTroupes = await getTroupes();
  const allServices = await getServices();
  const otherTroupes = allTroupes.filter((t) => t.slug !== troupe.slug);

  // Find related services for this troupe
  const relatedServices = (troupe.relatedServiceIds || [])
    .map((sid) => allServices.find((s) => s.id === sid || s.slug === sid))
    .filter(Boolean);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Performing Troupes", href: "/troupes" },
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
              <div className="p-6 rounded-2xl bg-[#0E1814] border border-[#D6A84F]/30 space-y-4 shadow-xl">
                <h3 className="font-bold text-sm text-[#D6A84F] uppercase tracking-wider">
                  Troupe Summary
                </h3>
                <div className="space-y-2 text-xs text-[#F7F3EA]/80">
                  <p>
                    <strong className="text-[#F7F3EA]">Home Base:</strong> Arba Minch, South Ethiopia
                  </p>
                  <p>
                    <strong className="text-[#F7F3EA]">Disciplines:</strong>{" "}
                    {troupe.acts.slice(0, 3).join(", ")}
                  </p>
                  <p>
                    <strong className="text-[#F7F3EA]">Organization:</strong> AMEPAC (Est. 2011) / Building Tomorrow
                  </p>
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

      {/* Unconfirmed / Review Notices If Applicable */}
      {troupe.reviewNotice && (
        <section className="bg-[#D6A84F]/10 border-b border-[#D6A84F]/30 py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3 text-xs text-[#17251F]">
              <AlertTriangle className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-[#C64B24]">Client Review Note: </strong>
                <span>{troupe.reviewNotice}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Visual and Roster Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-8">
              {/* Acts & Disciplines List */}
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C64B24]" />
                  Supplied Disciplines & Technical Repertoire
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {troupe.acts.map((act: string) => (
                    <div
                      key={act}
                      className="p-3 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/20 font-medium text-[#17251F] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C64B24] shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roster of Artists */}
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#C64B24]" />
                    Artists in Ensemble ({troupe.members.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {troupe.members.map((member: string) => {
                    const isMelat = member === "Melat Muluken";
                    return (
                      <div
                        key={member}
                        className="p-3.5 rounded-lg bg-[#17251F] text-[#F7F3EA] text-xs font-semibold flex flex-col justify-between gap-1 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#F7F3EA]">{member}</span>
                          <span className="text-[10px] text-[#D6A84F] font-bold">
                            Professional Artist
                          </span>
                        </div>
                        {isMelat && (
                          <div className="mt-1 pt-1 border-t border-[#23382F] text-[10px] text-[#D6A84F]/90 leading-tight">
                            Dual Ensemble: Registered in Troupe African Pride & Troupe Black Lioness
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
                  <h2 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#C64B24]" />
                    Related Services & Performance Formats
                  </h2>
                  <p className="text-xs text-[#17251F]/75">
                    This ensemble actively performs across the following AMEPAC service departments:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedServices.map((svc) => {
                      if (!svc) return null;
                      return (
                        <Link
                          key={svc.id}
                          href={`/services/${svc.slug}`}
                          className="p-3 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/20 hover:border-[#C64B24] transition-all group flex items-center justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-[#C64B24] block uppercase">
                              {svc.category}
                            </span>
                            <span className="text-xs font-bold text-[#17251F] group-hover:text-[#C64B24]">
                              {svc.title}
                            </span>
                          </div>
                          <span className="text-xs text-[#C64B24] font-bold">&rarr;</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Performance Photo & Safeguarding Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative py-12 px-6 rounded-2xl overflow-hidden border border-[#D6A84F]/40 shadow-xl bg-[#17251F] flex flex-col items-center justify-center">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#D6A84F] shadow-2xl bg-[#0E1814]">
                  <Image
                    src={troupe.featuredImage || "/images/circus_performance_1.png"}
                    alt={`${troupe.name} performing in Arba Minch`}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 640px) 224px, 256px"
                  />
                </div>
                <span className="mt-4 text-xs font-bold text-[#D6A84F] uppercase tracking-wider text-center">
                  Approved Action Photograph — Arba Minch
                </span>
                <span className="text-[11px] text-[#F7F3EA]/70 mt-1">
                  {troupe.name}
                </span>
              </div>

              {/* Minor Protection & Ethical Safeguarding */}
              <div className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/30 text-xs text-[#17251F]/85 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-[#C64B24] font-bold uppercase text-[11px] tracking-wider">
                  <Shield className="w-4 h-4" />
                  Child Safeguarding & Minor Protection
                </div>
                <p className="leading-relaxed">
                  All youth acrobats who began training as minors in Arba Minch are safeguarded under AMEPAC and Building Tomorrow Integrated Youth & Community Development Organization policies. Photographic publications and member listings adhere strictly to parental, guardian, and organizational consent protocols.
                </p>
              </div>

              {/* Direct Booking Card */}
              <div className="p-6 rounded-2xl bg-[#17251F] text-[#F7F3EA] border border-[#D6A84F]/40 shadow-xl space-y-4">
                <h3 className="font-bold text-sm text-[#D6A84F] uppercase tracking-wider">
                  Ready to Book {troupe.name}?
                </h3>
                <p className="text-xs text-[#F7F3EA]/80 leading-relaxed">
                  Contact our administrative office in Arba Minch to request performance dates, festival availability, or technical riders.
                </p>
                <div className="space-y-1.5 text-xs text-[#F7F3EA]/80 pt-2 border-t border-[#23382F]">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>+251-913-949-209</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Arbaminch.circus@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch</span>
                  </p>
                </div>
                <Link
                  href={`/book-us?troupe=${encodeURIComponent(troupe.name)}`}
                  className="w-full text-center block py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors"
                >
                  Start Booking Request
                </Link>
              </div>
            </div>
          </div>

          {/* Other Troupes Showcase */}
          <div className="space-y-4 pt-8 border-t border-[#D6A84F]/30">
            <h3 className="text-lg font-bold text-[#17251F]">
              Explore Other AMEPAC Performing Ensembles
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
                      {ot.membersCount} {ot.membersCount === 1 ? "Solo Artist" : "Ensemble Members"}
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
