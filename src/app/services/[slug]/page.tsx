import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices, getServiceBySlug, getTroupes } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Check,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Users,
  Phone,
  Mail,
  Camera,
  Layers,
  Clock,
} from "lucide-react";
import { CallToAction } from "@/components/ui/CallToAction";

interface ServiceDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Service Offering Not Found — AMEPAC" };
  return {
    title: `${service.title} — AMEPAC Arba Minch`,
    description: service.summary,
    openGraph: {
      title: `${service.title} | Arba Minch Performing Arts & Circus`,
      description: service.summary,
      images: [service.imageUrl || "/images/circus_performance_1.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const allServices = await getServices();
  const allTroupes = await getTroupes();

  // Find confirmed related troupes
  const relatedTroupes = (service.relatedTroupeIds || [])
    .map((tid) => allTroupes.find((t) => t.id === tid || t.slug === tid))
    .filter(Boolean);

  const relatedServices = allServices
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Services & Offerings", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Hero Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              {service.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Narrative, Offerings, Formats, and Troupes */}
            <div className="lg:col-span-8 space-y-10">
              {/* Media Visual / Approved Photo or Labelled Placeholder */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D6A84F]/40 bg-[#17251F] shadow-md">
                <div className="relative h-64 sm:h-80 w-full">
                  <Image
                    src={service.imageUrl || "/images/circus_performance_1.png"}
                    alt={`${service.title} - AMEPAC Arba Minch`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="p-4 sm:p-5 bg-[#17251F] border-t border-[#23382F] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#D6A84F]" />
                    {service.isPlaceholderImage ? (
                      <span className="font-semibold text-[#D6A84F]">
                        Official Media Placeholder — AMEPAC Documentation Studio
                      </span>
                    ) : (
                      <span className="font-semibold text-[#F7F3EA]">
                        Approved Performance Photography — Arba Minch, South Ethiopia
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#F7F3EA]/70">
                    Real, unmanipulated organization photography
                  </span>
                </div>
              </div>

              {/* What the Organization Offers */}
              <div className="bg-[#EBE5D6] p-6 sm:p-10 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#17251F]">
                    What We Offer & Scope of Service
                  </h2>
                  <p className="text-xs sm:text-sm text-[#17251F]/85 mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features & Deliverables */}
                <div className="pt-4 border-t border-[#D6A84F]/30 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#17251F] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C64B24]" />
                    Confirmed Inclusions & Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {service.details.map((detail: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 bg-[#F7F3EA] p-3 rounded-lg border border-[#D6A84F]/20"
                      >
                        <Check className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                        <span className="text-[#17251F]/85 leading-relaxed font-medium">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suitable Formats */}
                {service.suitableFormats && service.suitableFormats.length > 0 && (
                  <div className="pt-4 border-t border-[#D6A84F]/30 space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#17251F] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C64B24]" />
                      Suitable Formats & Venue Adaptations
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {service.suitableFormats.map((fmt: string, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/20 flex flex-col justify-between"
                        >
                          <span className="font-semibold text-[#17251F]">{fmt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Impact Model */}
                <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30 flex items-start gap-3 text-xs">
                  <ShieldCheck className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                  <p className="text-[#17251F]/80 leading-relaxed">
                    <strong>Social Enterprise Reinvestment:</strong> Booking proceeds directly support scholastic uniforms, nutrition, and safe gymnasium facilities for street youth trained under Building Tomorrow Integrated Youth & Community Development Organization (registered Nov 2022). Circus established 2011.
                  </p>
                </div>
              </div>

              {/* Related Troupes Where Confirmed */}
              {relatedTroupes.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#C64B24]" />
                        Performing Troupes Offering This Service
                      </h3>
                      <p className="text-xs text-[#17251F]/70 mt-1">
                        Select a troupe to inspect specific member rosters and acrobatic disciplines.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedTroupes.map((troupe) => {
                      if (!troupe) return null;
                      return (
                        <Link
                          key={troupe.id}
                          href={`/troupes/${troupe.slug}`}
                          className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all group flex flex-col justify-between shadow-sm"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#C64B24] uppercase">
                                {troupe.membersCount} {troupe.membersCount === 1 ? "Solo Artist" : "Ensemble Members"}
                              </span>
                              <span className="text-[11px] text-[#D6A84F] group-hover:translate-x-1 transition-transform">
                                View Profile &rarr;
                              </span>
                            </div>
                            <h4 className="font-extrabold text-base text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                              {troupe.name}
                            </h4>
                            <p className="text-xs text-[#17251F]/75 line-clamp-2">
                              {troupe.subTitle || troupe.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {troupe.acts.slice(0, 3).map((act: string) => (
                                <span
                                  key={act}
                                  className="text-[10px] px-2 py-0.5 rounded bg-[#F7F3EA] text-[#17251F] border border-[#D6A84F]/30"
                                >
                                  {act}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#17251F]">
                  Explore Other Offerings & Departments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/services/${rel.slug}`}
                      className="p-4 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30 hover:border-[#C64B24] transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#C64B24] uppercase block mb-1">
                          {rel.category}
                        </span>
                        <h4 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="text-xs text-[#C64B24] font-semibold mt-3 flex items-center gap-1">
                        Details &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Direct Booking Card & Official Contacts */}
            <div className="lg:col-span-4 bg-[#17251F] text-[#F7F3EA] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-xl space-y-6 sticky top-28">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#D6A84F] tracking-wider block mb-1">
                  Performance & Engagement Request
                </span>
                <h3 className="text-xl font-bold text-[#F7F3EA]">
                  Book {service.title}
                </h3>
                <p className="text-xs text-[#F7F3EA]/75 mt-1 leading-relaxed">
                  Submit your dates and event requirements. Our administration will confirm troupe availability and technical rider requirements.
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#F7F3EA]/80 pt-4 border-t border-[#23382F]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F7F3EA] block">Home Base & Location:</strong>
                    <span>Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <div>
                    <strong className="text-[#F7F3EA] block">Client Telephone:</strong>
                    <a href="tel:+251913949209" className="hover:text-[#D6A84F] transition-colors">
                      +251-913-949-209
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <div>
                    <strong className="text-[#F7F3EA] block">Official Email:</strong>
                    <a href="mailto:Arbaminch.circus@gmail.com" className="hover:text-[#D6A84F] transition-colors">
                      Arbaminch.circus@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/book-us?service=${encodeURIComponent(service.slug)}`}
                  className="w-full text-center block py-3 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs sm:text-sm hover:bg-[#A83C1A] transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book This Service
                </Link>
              </div>

              <div className="p-3 rounded-lg bg-[#23382F]/70 border border-[#D6A84F]/20 text-[11px] text-[#F7F3EA]/70 leading-relaxed">
                <strong>Transparent Inquiries:</strong> We do not publish speculative fees. Every booking is scoped to event duration, staging requirements, and travel logistics.
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
