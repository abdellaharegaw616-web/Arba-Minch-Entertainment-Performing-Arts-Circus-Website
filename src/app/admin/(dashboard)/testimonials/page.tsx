import { getTestimonials } from "@/lib/data-store";
import { MessageSquareQuote, CheckCircle2, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Testimonials Management — AMEPAC Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Approved Endorsements
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-[#C64B24]" />
            Testimonials & Partner Reviews ({testimonials.length})
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Moderated public endorsements. Only quotes marked approved are visible on the live site.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="p-5 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm flex flex-col justify-between space-y-3 text-xs"
          >
            <blockquote className="text-xs text-[#17251F]/85 italic leading-relaxed">
              &ldquo;{test.quote}&rdquo;
            </blockquote>

            <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between">
              <div>
                <strong className="text-[#17251F] block">{test.author}</strong>
                <span className="text-[11px] text-[#17251F]/60">
                  {test.role} {test.organization ? `• ${test.organization}` : ""}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
