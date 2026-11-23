import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices, getServiceBySlug } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Check, Calendar, ArrowRight, ShieldCheck, Sparkles, MapPin } from "lucide-react";
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
  if (!service) return { title: "Package Not Found" };
  return {
    title: `${service.title} — AMEPAC Entertainment Package`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const allServices = await getServices();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Packages & Offerings", href: "/services" },
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
            {/* Left Column: Narrative & Technical Breakdown */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#EBE5D6] p-6 sm:p-10 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#17251F]">
                    Production Overview & Artistic Scope
                  </h2>
                  <p className="text-xs sm:text-sm text-[#17251F]/85 mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features & Deliverables */}
                <div className="pt-4 border-t border-[#D6A84F]/30 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#17251F] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C64B24]" />
                    Key Deliverables & Capabilities
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

                {/* Social Impact Reinvestment Notice */}
                <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30 flex items-start gap-3 text-xs">
                  <ShieldCheck className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                  <p className="text-[#17251F]/80 leading-relaxed">
                    <strong>Social Enterprise Model:</strong> Revenue from all performance packages directly subsidizes scholastic uniforms, training hall repairs, and daily nutritious meals for street youth training under Building Tomorrow Integrated Youth.
                  </p>
                </div>
              </div>

              {/* Related Packages */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#17251F]">
                  Explore Other Entertainment Packages
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
                        View &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Direct Booking Card */}
            <div className="lg:col-span-4 bg-[#17251F] text-[#F7F3EA] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-xl space-y-6 sticky top-28">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#D6A84F] tracking-wider block mb-1">
                  Ready to Stage?
                </span>
                <h3 className="text-xl font-bold text-[#F7F3EA]">
                  Book This Package
                </h3>
                <p className="text-xs text-[#F7F3EA]/75 mt-1 leading-relaxed">
                  Available for festivals, public ceremonies, school assemblies, and international tours.
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#F7F3EA]/80 pt-4 border-t border-[#23382F]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>Staged in Arba Minch, Addis Ababa & Abroad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>Flexible duration (20m - 90m)</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/book-us?package=${encodeURIComponent(service.title)}`}
                  className="w-full text-center block py-3 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs sm:text-sm hover:bg-[#A83C1A] transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Start Booking Request
                </Link>
              </div>

              <div className="text-center pt-2">
                <a
                  href="tel:+251913949209"
                  className="text-xs text-[#D6A84F] hover:underline"
                >
                  Direct Inquiry Desk: +251-913-949-209
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
