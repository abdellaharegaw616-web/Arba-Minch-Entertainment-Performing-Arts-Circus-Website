import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/data-store";
import { Check, Calendar, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Packages & Offerings — AMEPAC Arba Minch",
  description:
    "Explore our complete performing arts packages: Professional Circus, Contemporary Dance Fusion, Giant Puppets, Theater, Traditional Music, Youth Workshops, and Costume Production.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Comprehensive Entertainment Packages
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              What We Offer
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              AMEPAC provides complete entertainment packages, masterclasses, and production services. Every offering is designed to captivate audiences while supporting our social youth mission.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation Anchor Bar (Per client instruction: "Live links to each bullet point of What we offer") */}
      <section className="sticky top-20 z-40 bg-[#0E1814] text-[#F7F3EA] border-b border-[#23382F] py-3 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap text-xs">
            <span className="text-[#D6A84F] font-bold shrink-0">Quick Jump:</span>
            {services.map((svc) => (
              <a
                key={svc.slug}
                href={`#${svc.slug}`}
                className="px-2.5 py-1 rounded bg-[#17251F] hover:bg-[#23382F] hover:text-[#D6A84F] transition-colors border border-[#23382F]"
              >
                {svc.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.slug}
              className="scroll-mt-36 p-6 sm:p-10 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#C64B24] uppercase tracking-wider px-2 py-0.5 rounded bg-[#C64B24]/10">
                      {svc.category}
                    </span>
                    <span className="text-xs text-[#17251F]/60">Package #{i + 1}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F]">
                    {svc.title}
                  </h2>

                  <p className="text-sm text-[#17251F]/85 leading-relaxed font-medium">
                    {svc.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-[#17251F]/75 leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Bullet points */}
                  <div className="pt-2 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#17251F] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C64B24]" />
                      Package Features & Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {svc.details.map((detail: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 bg-[#F7F3EA] p-2.5 rounded border border-[#D6A84F]/20">
                          <Check className="w-3.5 h-3.5 text-[#C64B24] shrink-0 mt-0.5" />
                          <span className="text-[#17251F]/85">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formats where available */}
                  {svc.suitableFormats && svc.suitableFormats.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-[#17251F] uppercase tracking-wider block mb-1">
                        Suitable Formats:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {svc.suitableFormats.map((fmt, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-2 py-0.5 rounded bg-[#F7F3EA] text-[11px] text-[#17251F] border border-[#D6A84F]/30"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side booking card */}
                <div className="lg:col-span-4 bg-[#17251F] text-[#F7F3EA] p-6 rounded-xl border border-[#D6A84F]/30 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#D6A84F] tracking-wider">
                      Booking Information
                    </span>
                    <h3 className="font-bold text-base text-[#F7F3EA] mt-1">
                      Inquire for this Package
                    </h3>
                    <p className="text-xs text-[#F7F3EA]/70 mt-1">
                      Tailored options for festivals, non-profit events, school assemblies, or private corporate functions.
                    </p>
                  </div>

                  <div className="p-3 rounded bg-[#0E1814] text-xs text-[#F7F3EA]/80 space-y-1">
                    <p><strong className="text-[#D6A84F]">Location:</strong> Available regionally & internationally</p>
                    <p><strong className="text-[#D6A84F]">Notice:</strong> 2-4 weeks advance booking recommended</p>
                    <p><strong className="text-[#D6A84F]">Customization:</strong> Tailored show length and troupe size</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="w-full text-center block py-2 px-4 rounded border border-[#D6A84F] text-[#D6A84F] font-semibold text-xs hover:bg-[#D6A84F] hover:text-[#17251F] transition-colors"
                    >
                      View Full Package Page &rarr;
                    </Link>
                    <Link
                      href={`/book-us?package=${encodeURIComponent(svc.title)}`}
                      className="w-full text-center block py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors shadow flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" /> Book This Package
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
