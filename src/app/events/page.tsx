import Link from "next/link";
import Image from "next/image";
import { getEvents } from "@/lib/data-store";
import { Calendar, MapPin, Clock, Ticket, ArrowRight, Sparkles, CheckCircle2, History } from "lucide-react";
import { CallToAction } from "@/components/ui/CallToAction";

export const metadata = {
  title: "Events Calendar & Tour Schedule — AMEPAC Arba Minch",
  description:
    "Official performance schedule, upcoming appearances, and historical tour archives for Arba Minch Entertainment Performing Arts & Circus.",
};

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = events.filter((e) => e.isUpcoming !== false);
  const pastEvents = events.filter((e) => e.isUpcoming === false);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Performance Calendar & Archives
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              Events & Appearances Schedule
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              Experience the energy of our acrobats, dancers, and contortionists live. Check confirmed upcoming public appearances or review our historical performance milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Main Events Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Upcoming Events Section */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D6A84F]/30 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#17251F] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#C64B24]" />
                  Upcoming Appearances & Festivals
                </h2>
                <p className="text-xs text-[#17251F]/70 mt-1">
                  All event times are listed in official East Africa Time (EAT / UTC+3).
                </p>
              </div>
              <Link
                href="/book-us"
                className="px-4 py-2 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors shrink-0 self-start sm:self-auto"
              >
                Book an Event Date
              </Link>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    id={evt.slug}
                    className="scroll-mt-28 bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#C64B24] transition-all group"
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

                      <h3 className="text-xl font-extrabold text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                        <Link href={`/events/${evt.slug}`}>
                          {evt.title}
                        </Link>
                      </h3>

                      <div className="space-y-2 text-xs text-[#17251F]/80">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#C64B24] shrink-0" />
                          <span>
                            {evt.time} {evt.timezone ? `(${evt.timezone})` : "(EAT / UTC+3)"}
                          </span>
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
                      <Link
                        href={`/events/${evt.slug}`}
                        className="text-xs font-semibold text-[#17251F] hover:text-[#C64B24] underline underline-offset-4"
                      >
                        Event Details &rarr;
                      </Link>
                      <Link
                        href={`/book-us?event=${encodeURIComponent(evt.title)}`}
                        className="text-xs font-bold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1"
                      >
                        Booking / VIP Passes <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/30 space-y-3">
                <Calendar className="w-12 h-12 text-[#D6A84F] mx-auto" />
                <h3 className="text-lg font-bold text-[#17251F]">
                  No Upcoming Public Events Currently Scheduled
                </h3>
                <p className="text-xs text-[#17251F]/75 max-w-md mx-auto leading-relaxed">
                  Our troupes are actively rehearsing in Arba Minch. New festival appearances and tour dates will be published once officially confirmed by organizers.
                </p>
                <div className="pt-2">
                  <Link
                    href="/book-us"
                    className="inline-block px-5 py-2.5 rounded bg-[#C64B24] text-[#F7F3EA] text-xs font-semibold hover:bg-[#A83C1A]"
                  >
                    Submit Custom Booking Request
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Past Events / Documented Milestones Section */}
          {pastEvents.length > 0 && (
            <div className="space-y-8 pt-8 border-t border-[#D6A84F]/30">
              <div>
                <h2 className="text-2xl font-extrabold text-[#17251F] flex items-center gap-2">
                  <History className="w-5 h-5 text-[#C64B24]" />
                  Completed Performance Tours & Historical Appearances
                </h2>
                <p className="text-xs text-[#17251F]/70 mt-1">
                  Archived performance records and historical national delegations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pastEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-[#EBE5D6]/70 rounded-2xl border border-[#D6A84F]/30 p-6 sm:p-8 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-[#23382F] text-[#D6A84F] text-[11px] font-bold">
                          {evt.date} (Archived)
                        </span>
                        <span className="text-[11px] font-semibold text-[#17251F]/70">
                          {evt.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#17251F]">
                        {evt.title}
                      </h3>

                      <div className="space-y-1.5 text-xs text-[#17251F]/75">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C64B24] shrink-0" />
                          <span>{evt.venue}, {evt.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#D6A84F] shrink-0" />
                          <span>{evt.ticketInfo}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#17251F]/80 leading-relaxed pt-1">
                        {evt.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#D6A84F]/20">
                      <Link
                        href={`/events/${evt.slug}`}
                        className="text-xs font-semibold text-[#C64B24] hover:underline"
                      >
                        View Full Event Archive &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Banner */}
          <div className="p-8 rounded-2xl bg-[#17251F] text-[#F7F3EA] border border-[#23382F] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-extrabold text-lg text-[#F7F3EA]">
                Planning a Public Festival or Corporate Event?
              </h3>
              <p className="text-xs text-[#F7F3EA]/75 max-w-xl leading-relaxed">
                AMEPAC accepts invitations for national and international cultural exchanges. Contact our administrative desk in Arba Minch for staging inquiries and technical rider requirements.
              </p>
            </div>
            <Link
              href="/book-us"
              className="px-6 py-3 rounded bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A] transition-colors shrink-0 shadow"
            >
              Request Booking Details
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
