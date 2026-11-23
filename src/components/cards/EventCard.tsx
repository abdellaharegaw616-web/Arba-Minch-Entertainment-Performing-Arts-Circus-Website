import Link from "next/link";
import { EventItem } from "@/types";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 p-6 flex flex-col justify-between hover:border-[#C64B24] transition-all">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#C64B24] px-2.5 py-0.5 rounded bg-[#C64B24]/10">
            {event.category}
          </span>
          <span className="font-semibold text-[#17251F]/70 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C64B24]" />
            {event.date}
          </span>
        </div>

        <h3 className="font-bold text-lg text-[#17251F] hover:text-[#C64B24] transition-colors">
          <Link href={`/events/${event.slug}`}>
            {event.title}
          </Link>
        </h3>

        <div className="space-y-1 text-xs text-[#17251F]/75">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C64B24] shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C64B24] shrink-0" />
            <span>{event.venue}, {event.location}</span>
          </div>
        </div>

        <p className="text-xs text-[#17251F]/80 leading-relaxed line-clamp-3">
          {event.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#17251F]/60 truncate max-w-[150px]">
          {event.ticketInfo}
        </span>
        <Link
          href={`/events/${event.slug}`}
          className="font-bold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1"
        >
          Event Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
