import Link from "next/link";
import { Calendar, HeartHandshake, Phone } from "lucide-react";

interface CallToActionProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CallToAction({
  title = "Ready to Bring Ethiopian Performing Arts to Your Event?",
  description = "Book our circus acrobats, traditional-contemporary dancers, and giant puppets for festivals, galas, and cultural showcases.",
  primaryHref = "/book-us",
  primaryLabel = "Book a Performance",
  secondaryHref = "/support",
  secondaryLabel = "Support Our Facility Fund",
}: CallToActionProps) {
  return (
    <section className="bg-[#17251F] text-[#F7F3EA] py-14 border-t border-[#23382F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3EA] max-w-2xl mx-auto">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[#F7F3EA]/80 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href={primaryHref}
            className="px-6 py-3 rounded-md bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs sm:text-sm hover:bg-[#A83C1A] transition-all shadow flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="px-6 py-3 rounded-md border border-[#D6A84F] text-[#D6A84F] font-semibold text-xs sm:text-sm hover:bg-[#D6A84F] hover:text-[#17251F] transition-all flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            {secondaryLabel}
          </Link>
          <a
            href="tel:+251913949209"
            className="px-4 py-3 text-xs text-[#F7F3EA]/70 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#D6A84F]" /> +251-913-949-209
          </a>
        </div>
      </div>
    </section>
  );
}
