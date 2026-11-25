import { getServices } from "@/lib/data-store";
import { Briefcase, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services Management — AMEPAC Admin",
};

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Repertoire & Offerings
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#C64B24]" />
            Entertainment Packages ({services.length})
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Manage stage productions, youth masterclasses, traditional dance fusions, and street theatre packages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="p-5 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-bold uppercase">
                  {service.category}
                </span>
                <span className="text-[11px] text-[#17251F]/50 font-mono">
                  #0{index + 1}
                </span>
              </div>
              <h3 className="font-extrabold text-base text-[#17251F] mt-2">
                {service.title}
              </h3>
              <p className="text-xs text-[#17251F]/75 mt-1 line-clamp-2">
                {service.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {service.details.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/30 text-[#17251F]/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Published
              </span>
              <Link
                href={`/services/${service.slug}`}
                target="_blank"
                className="text-xs font-bold text-[#C64B24] hover:underline flex items-center gap-1"
              >
                View Live <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
