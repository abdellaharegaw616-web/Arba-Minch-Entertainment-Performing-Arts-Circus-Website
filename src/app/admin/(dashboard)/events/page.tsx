import { getEvents } from "@/lib/data-store";
import { Calendar, MapPin, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events Management — AMEPAC Admin",
};

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Public Schedule
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#C64B24]" />
            Cultural Events & Festivals ({events.length})
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Manage stage productions, youth showcases, and regional cultural exchange performances.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-bold uppercase">
                  {event.category}
                </span>
                <h3 className="font-extrabold text-base text-[#17251F]">{event.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#17251F]/70">
                <span className="font-semibold text-[#17251F] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C64B24]" />
                  {event.date} • {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {event.venue}, {event.location}
                </span>
              </div>

              <p className="text-[#17251F]/80 text-xs mt-1 line-clamp-2">
                {event.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Link
                href={`/events/${event.slug}`}
                target="_blank"
                className="px-3 py-1.5 rounded-lg bg-[#17251F] text-[#F7F3EA] text-xs font-semibold hover:bg-[#23382F] transition-colors flex items-center gap-1"
              >
                <span>Live View</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
