import { getTestimonials } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { CallToAction } from "@/components/ui/CallToAction";

export const metadata = {
  title: "Approved Testimonials & Reflections — AMEPAC Arba Minch",
  description:
    "Read verified testimonials from AMEPAC performers, founder Tesfahun Mergia, and international cultural exchange partners.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Testimonials" }]} />

      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Authentic Voices
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Testimonials & Reflections
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              Unfiltered reflections from our founder, acrobats, and cultural partners documenting the resilience, talent, and transformative discipline of Arba Minch circus artists.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
