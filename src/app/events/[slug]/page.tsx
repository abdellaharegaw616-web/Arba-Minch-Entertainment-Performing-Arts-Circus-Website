import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getEvents, getEventBySlug } from "@/lib/data-store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { CallToAction } from "@/components/ui/CallToAction";

interface EventDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event Not Found — AMEPAC" };
  return {
    title: `${event.title} — AMEPAC Performance Schedule`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const allEvents = await getEvents();
  const otherEvents = allEvents.filter((e) => e.slug !== event.slug).slice(0, 2);

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Calendar", href: "/events" },
          { label: event.title },
        ]}
      />

      {/* Hero Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#D6A84F] px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 uppercase">
                {event.category}
              </span>
              <span className="text-xs font-semibold text-[#F7F3EA]/70">
                {event.date}
              </span>
              {event.isUpcoming ? (
                <span className="text-[10px] font-bold text-[#17251F] bg-[#D6A84F] px-2.5 py-0.5 rounded">
                  Upcoming Appearance
                </span>
              ) : (
                <span className="text-[10px] font-bold text-[#F7F3EA] bg-[#23382F] px-2.5 py-0.5 rounded border border-[#D6A84F]/30">
                  Completed Event Archive
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Event Synopsis & Image */}
            <div className="lg:col-span-8 space-y-8">
              {/* Event Image */}
              {event.imageUrl && (
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-[#D6A84F]/40 bg-[#17251F] shadow-md">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-[#F7F3EA] bg-black/60 px-3 py-1 rounded backdrop-blur-xs">
                    Approved Performance Photography
                  </span>
                </div>
              )}

              <div className="bg-[#EBE5D6] p-6 sm:p-10 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#17251F]">
                    Event Synopsis & Program Details
                  </h2>
                  <p className="text-xs sm:text-sm text-[#17251F]/85 mt-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D6A84F]/30 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#17251F]">
                    Logistical & Staging Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex items-start gap-3 bg-[#F7F3EA] p-3 rounded-lg border border-[#D6A84F]/20">
                      <Clock className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#17251F] block">Schedule & Time:</strong>
                        <span className="text-[#17251F]/75">
                          {event.time}
                        </span>
                        <span className="text-[10px] text-[#C64B24] block mt-0.5 font-semibold">
                          {event.timezone || "East Africa Time (EAT / UTC+3)"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-[#F7F3EA] p-3 rounded-lg border border-[#D6A84F]/20">
                      <MapPin className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#17251F] block">Venue & City:</strong>
                        <span className="text-[#17251F]/75">{event.venue}, {event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-[#F7F3EA] p-3 rounded-lg border border-[#D6A84F]/20 sm:col-span-2">
                      <Ticket className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#17251F] block">Ticketing & Entry:</strong>
                        <span className="text-[#17251F]/75">{event.ticketInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30 flex items-start gap-3 text-xs">
                  <ShieldCheck className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                  <p className="text-[#17251F]/80 leading-relaxed">
                    <strong>Organization Heritage:</strong> AMEPAC was established in 2011; its registered non-profit parent organization, Building Tomorrow Integrated Youth & Community Development Organization, was registered in November 2022. Event proceeds directly fund child nutrition and scholastic materials.
                  </p>
                </div>
              </div>

              {/* Other Events */}
              {otherEvents.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#17251F]">
                    Other Appearances on the Calendar
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherEvents.map((oe) => (
                      <Link
                        key={oe.id}
                        href={`/events/${oe.slug}`}
                        className="p-5 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30 hover:border-[#C64B24] transition-all group flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#C64B24] uppercase block">
                            {oe.date}
                          </span>
                          <h4 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24]">
                            {oe.title}
                          </h4>
                          <p className="text-xs text-[#17251F]/70 line-clamp-2">
                            {oe.venue}, {oe.location}
                          </p>
                        </div>
                        <span className="text-xs text-[#C64B24] font-semibold mt-3 flex items-center gap-1">
                          Details &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: VIP Inquiry Card & Contacts */}
            <div className="lg:col-span-4 bg-[#17251F] text-[#F7F3EA] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-xl space-y-6 sticky top-28">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#D6A84F] tracking-wider block mb-1">
                  Inquiries & Staging
                </span>
                <h3 className="text-xl font-bold text-[#F7F3EA]">
                  Attend or Book
                </h3>
                <p className="text-xs text-[#F7F3EA]/75 mt-1 leading-relaxed">
                  Have questions about this appearance or wish to book AMEPAC for your venue?
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#F7F3EA]/80 pt-4 border-t border-[#23382F]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <div>
                    <strong className="text-[#F7F3EA] block">Phone:</strong>
                    <a href="tel:+251913949209" className="hover:text-[#D6A84F]">
                      +251-913-949-209
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <div>
                    <strong className="text-[#F7F3EA] block">Email:</strong>
                    <a href="mailto:Arbaminch.circus@gmail.com" className="hover:text-[#D6A84F]">
                      Arbaminch.circus@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F7F3EA] block">Location:</strong>
                    <span>Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/book-us?event=${encodeURIComponent(event.title)}`}
                  className="w-full text-center block py-3 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> VIP / Booking Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
