import Link from "next/link";
import { getEvents } from "@/lib/data-store";
import { Calendar, MapPin, Clock, Ticket, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Events Calendar — AMEPAC Arba Minch",
  description:
    "Official performance schedule and upcoming events calendar for Arba Minch Entertainment Performing Arts & Circus.",
};

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = events.filter((e) => e.isUpcoming);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Performance Schedule
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              Events & Appearances Calendar
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              Experience the energy of our acrobats, dancers, and contortionists live. Check our upcoming public appearances or book our troupes for your own event.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-[#D6A84F]/30 pb-4">
            <h2 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C64B24]" />
              Scheduled Appearances & Festivals
            </h2>
            <Link
              href="/book"
              className="px-4 py-2 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors"
            >
              Book an Event Date
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                id={evt.slug}
                className="scroll-mt-28 bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#C64B24] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded bg-[#17251F] text-[#D6A84F] text-xs font-bold">
                      {evt.date}
                    </span>
                    <span className="text-xs font-semibold text-[#C64B24] px-2 py-0.5 rounded bg-[#C64B24]/10">
                      {evt.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#17251F]">{evt.title}</h3>

                  <div className="space-y-1.5 text-xs text-[#17251F]/80">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C64B24] shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C64B24] shrink-0" />
                      <span>{evt.venue}, {evt.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-[#C64B24] shrink-0" />
                      <span>{evt.ticketInfo}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#17251F]/85 leading-relaxed pt-2">
                    {evt.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D6A84F]/30 flex items-center justify-between">
                  <span className="text-[11px] text-[#17251F]/60">Live Performance</span>
                  <Link
                    href={`/book?event=${encodeURIComponent(evt.title)}`}
                    className="text-xs font-bold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1"
                  >
                    Inquire for Attendance or VIP <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Notice */}
          <div className="p-6 rounded-xl bg-[#17251F] text-[#F7F3EA] border border-[#23382F] mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-[#D6A84F]">Planning a Festival or Private Celebration?</h3>
              <p className="text-xs text-[#F7F3EA]/70 mt-0.5">
                AMEPAC accepts booking requests for local, regional, and international stages throughout the year.
              </p>
            </div>
            <Link
              href="/book"
              className="px-6 py-2.5 rounded bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A] transition-colors shrink-0"
            >
              Submit Booking Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
