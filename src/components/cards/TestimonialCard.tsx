import { TestimonialItem } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-xl border border-[#D6A84F]/40 shadow-sm flex flex-col justify-between">
      <blockquote className="text-xs sm:text-sm text-[#17251F]/85 italic leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-6 pt-4 border-t border-[#D6A84F]/30 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm text-[#17251F]">{testimonial.author}</h4>
          <p className="text-xs text-[#C64B24] font-medium">{testimonial.role}</p>
        </div>
        {testimonial.organization && (
          <span className="text-[11px] text-[#17251F]/60 text-right">
            {testimonial.organization}
            {testimonial.year && <span className="block text-[10px]">({testimonial.year})</span>}
          </span>
        )}
      </div>
    </div>
  );
}
