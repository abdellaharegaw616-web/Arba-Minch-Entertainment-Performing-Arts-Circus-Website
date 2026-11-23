import { BookingForm } from "@/components/forms/BookingForm";
import { Phone, Mail, MapPin, Calendar, Clock, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Book a Performance — AMEPAC Arba Minch",
  description:
    "Book AMEPAC's professional Ethiopian circus troupes, contemporary dancers, and giant puppets for your event, festival, or tour.",
};

export default function BookPage({
  searchParams,
}: {
  searchParams: { troupe?: string; package?: string; event?: string };
}) {
  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Performance Bookings & Inquiries
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              Book an AMEPAC Performance
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              Elevate your event with Ethiopia’s finest circus artists, acrobats, and dancers. Complete the request form below to check availability and technical specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Booking Form Card */}
            <div className="lg:col-span-8 bg-[#EBE5D6] p-6 sm:p-10 rounded-2xl border border-[#D6A84F]/40 shadow-sm">
              <div className="mb-6 pb-4 border-b border-[#D6A84F]/30">
                <h2 className="text-xl font-bold text-[#17251F] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#C64B24]" />
                  Event & Performance Details
                </h2>
                <p className="text-xs text-[#17251F]/70 mt-1">
                  Our booking manager will review your technical requirements and respond within 24-48 hours.
                </p>
              </div>

              <BookingForm
                initialTroupe={searchParams.troupe}
                initialPackage={searchParams.package}
                initialEvent={searchParams.event}
              />
            </div>

            {/* Sidebar Information */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Booking Desk */}
              <div className="bg-[#17251F] text-[#F7F3EA] p-6 rounded-xl border border-[#D6A84F]/30 space-y-4">
                <h3 className="font-bold text-base text-[#D6A84F] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C64B24]" />
                  Direct Booking Desk
                </h3>
                <div className="space-y-2 text-xs text-[#F7F3EA]/80">
                  <p>
                    For urgent bookings, custom international touring inquiries, or direct coordination:
                  </p>
                  <p className="text-sm font-semibold text-[#F7F3EA]">
                    <a href="tel:+251913949209" className="hover:text-[#D6A84F]">
                      +251-913-949-209
                    </a>
                  </p>
                  <p className="text-xs text-[#D6A84F]">
                    <a href="mailto:Arbaminch.circus@gmail.com" className="hover:underline">
                      Arbaminch.circus@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* The 4-Step Booking Process */}
              <div className="bg-[#EBE5D6] p-6 rounded-xl border border-[#D6A84F]/30 space-y-4">
                <h4 className="font-bold text-sm text-[#17251F] uppercase tracking-wider">
                  How Booking Works
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C64B24] text-[#F7F3EA] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-[#17251F]">Inquiry & Scope:</strong>
                      <p className="text-[#17251F]/70 mt-0.5">Submit date, venue, troupe preference, and expected audience.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C64B24] text-[#F7F3EA] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-[#17251F]">Technical Review:</strong>
                      <p className="text-[#17251F]/70 mt-0.5">We check stage clearance, sound/lighting, and troupe schedule.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C64B24] text-[#F7F3EA] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-[#17251F]">Contract & Staging:</strong>
                      <p className="text-[#17251F]/70 mt-0.5">Official agreement confirmation and logistical rehearsal prep.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C64B24] text-[#F7F3EA] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-[#17251F]">Live Spectacular:</strong>
                      <p className="text-[#17251F]/70 mt-0.5">Unforgettable, world-class Ethiopian circus experience!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ethics and Social Impact Guarantee */}
              <div className="p-4 rounded-lg bg-[#0E1814] text-[#F7F3EA] border border-[#23382F] text-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D6A84F] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#F7F3EA]/75">
                  Every booking directly supports our artists with living wages, educational funds, and training hall upkeep in Arba Minch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
