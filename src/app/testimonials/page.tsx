import { getTestimonials } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { MessageSquareQuote, ShieldCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Approved Testimonials & Reflections — AMEPAC Arba Minch",
  description:
    "Read verified, approved reflections and testimonials from AMEPAC performers, founder Tesfahun Mergia, and cultural partners in Arba Minch, Ethiopia.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Testimonials" }]} />

      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Authentic Voices & Reflections
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Testimonials & Cultural Reflections
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              Unfiltered reflections from our founder, acrobats, and cultural partners documenting the resilience, talent, and transformative discipline of Arba Minch circus artists.
            </p>
          </div>
        </div>
      </section>

      {/* Consent & Ethics Policy Banner */}
      <section className="bg-[#D6A84F]/10 border-b border-[#D6A84F]/30 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs text-[#17251F]">
            <ShieldCheck className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#C64B24]">Consent & Attribution Policy: </strong>
              <span>
                All published testimonials are verified, authorized quotations provided with explicit consent. AMEPAC does not publish unverified reviews or attribute statements without editorial confirmation.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid or Empty State */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((item) => (
                <TestimonialCard key={item.id} testimonial={item} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/30 space-y-3">
              <MessageSquareQuote className="w-12 h-12 text-[#D6A84F] mx-auto" />
              <h3 className="text-lg font-bold text-[#17251F]">
                No Approved Testimonials Published
              </h3>
              <p className="text-xs text-[#17251F]/70 max-w-md mx-auto leading-relaxed">
                Testimonials are undergoing authorized editorial and consent review before publication.
              </p>
            </div>
          )}

          {/* Booking or Feedback CTA */}
          <div className="p-8 rounded-2xl bg-[#17251F] text-[#F7F3EA] border border-[#23382F] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-extrabold text-lg text-[#F7F3EA]">
                Have You Experienced an AMEPAC Performance?
              </h3>
              <p className="text-xs text-[#F7F3EA]/75 max-w-xl leading-relaxed">
                Festival directors, audience members, and partner organizations are invited to share their verified feedback with our administrative office.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A] transition-colors shrink-0 shadow"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
