import { Phone, Mail, MapPin, ExternalLink, Calendar, HeartHandshake } from "lucide-react";
import { DonateInquiryForm } from "@/components/forms/DonateInquiryForm";
import Link from "next/link";

export const metadata = {
  title: "Contact Us — AMEPAC Arba Minch",
  description:
    "Get in touch with Arba Minch Entertainment Performing Arts & Circus. Phone: +251-913-949-209, Email: Arbaminch.circus@gmail.com, Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, Ethiopia.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Reach Our Team
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              Contact AMEPAC
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              We welcome inquiries from festival organizers, cultural institutions, prospective donors, and visiting international artists.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-xl border border-[#D6A84F]/40 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-[#17251F]">
                  Official Contact Information
                </h2>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F] block">Physical Location:</strong>
                      <span className="text-[#17251F]/80">
                        Mehal Ketema Kebele, Nech Sar Sub-city,
                        <br />
                        Arba Minch, Gamo Zone,
                        <br />
                        South Ethiopia Regional State, Ethiopia
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F] block">Direct Telephone:</strong>
                      <a
                        href="tel:+251913949209"
                        className="text-[#C64B24] font-semibold hover:underline"
                      >
                        +251-913-949-209
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F] block">Official Email:</strong>
                      <a
                        href="mailto:Arbaminch.circus@gmail.com"
                        className="text-[#C64B24] font-semibold hover:underline"
                      >
                        Arbaminch.circus@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ExternalLink className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F] block">Social Media:</strong>
                      <a
                        href="https://web.facebook.com/profile.php?id=100063595935774"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C64B24] font-semibold hover:underline"
                      >
                        Official Facebook Page
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D6A84F]/30 text-xs text-[#17251F]/70">
                  <strong className="text-[#17251F] block mb-1">Parent Entity:</strong>
                  Building Tomorrow Integrated Youth & Community Development Organization (Registered November 2022).
                </div>
              </div>

              {/* Quick Action Box */}
              <div className="p-6 rounded-xl bg-[#17251F] text-[#F7F3EA] border border-[#23382F] space-y-3">
                <h3 className="font-bold text-sm text-[#D6A84F]">Looking to Book a Performance?</h3>
                <p className="text-xs text-[#F7F3EA]/70">
                  Use our specialized booking request form to submit date, venue, and requested troupe details.
                </p>
                <Link
                  href="/book"
                  className="inline-block py-2 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A]"
                >
                  Go to Booking Form &rarr;
                </Link>
              </div>
            </div>

            {/* General Inquiry / Message Form */}
            <div className="lg:col-span-7 bg-[#EBE5D6] p-6 sm:p-10 rounded-2xl border border-[#D6A84F]/40 shadow-sm">
              <div className="mb-6 pb-4 border-b border-[#D6A84F]/30">
                <h2 className="text-xl font-bold text-[#17251F]">
                  Send a Message to Leadership
                </h2>
                <p className="text-xs text-[#17251F]/70 mt-1">
                  Leave a note regarding donations, media interviews, volunteer coaching, or cultural partnerships.
                </p>
              </div>
              <DonateInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
