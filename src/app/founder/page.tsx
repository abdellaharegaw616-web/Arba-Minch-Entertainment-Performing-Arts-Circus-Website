import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GraduationCap, Shield, Award, Users, HeartHandshake, Calendar, Phone, Mail, ArrowRight } from "lucide-react";
import { CallToAction } from "@/components/ui/CallToAction";

export const metadata = {
  title: "Founder & Director — Tesfahun Mergia | AMEPAC",
  description:
    "Biography, credentials, and vision of Tesfahun Mergia, Founder & Executive Director of AMEPAC and Building Tomorrow Integrated Youth & Community Development Organization.",
};

export default function FounderPage() {
  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Founder & Leadership" }]} />

      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Founder & Executive Director
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Tesfahun Mergia
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              Gymnastics coach, social circus pioneer, international development project leader, and champion for street children in Arba Minch, South Ethiopia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Visual Portrait */}
            <div className="lg:col-span-5 bg-[#17251F] text-[#F7F3EA] rounded-2xl overflow-hidden border border-[#D6A84F]/40 shadow-xl sticky top-28">
              <div className="relative h-96 w-full bg-[#0E1814]">
                <Image
                  src="/images/tesfahun_director.jpg"
                  alt="Tesfahun Mergia, Founder & Director of AMEPAC"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#F7F3EA]">Tesfahun Mergia</h3>
                  <p className="text-xs font-semibold text-[#D6A84F] mt-0.5">
                    Founder & Executive Director, AMEPAC
                  </p>
                  <p className="text-xs text-[#F7F3EA]/70 mt-1">
                    Head Coach, South Ethiopia Regional State / Gamo Zone Gymnastics Team
                  </p>
                </div>

                <div className="pt-3 border-t border-[#23382F] space-y-2 text-xs text-[#F7F3EA]/80">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#D6A84F] shrink-0" />
                    <span>MSc in Environment & Sustainable Development (Arba Minch University)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#D6A84F] shrink-0" />
                    <span>BSc in Rural Development & Family Science (Hawassa University)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#D6A84F] shrink-0" />
                    <span>FIG-Certified Coach Safeguarding Credential (Nov 2024)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#23382F] flex flex-col gap-2">
                  <Link
                    href="/book-us"
                    className="w-full text-center py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors"
                  >
                    Direct Booking Inquiries
                  </Link>
                  <a
                    href="mailto:Arbaminch.circus@gmail.com"
                    className="w-full text-center py-2 px-4 rounded border border-[#D6A84F]/40 text-[#D6A84F] font-semibold text-xs hover:bg-[#D6A84F] hover:text-[#17251F] transition-colors"
                  >
                    Arbaminch.circus@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Narrative Story */}
            <div className="lg:col-span-7 space-y-8 text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
                <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                  Artistic & Humanitarian Journey
                </span>
                <h2 className="text-2xl font-bold text-[#17251F]">
                  From Hawassa Circus Trainee to Regional Catalyst
                </h2>
                <p>
                  Tesfahun Mergia entered the world of circus arts at age 14, joining the Debub Nigat circus in Hawassa before performing with Molier Theatre. As a young adult, he completed his BSc in Rural Development and Family Science at Hawassa University, followed by a Master of Science in Environment and Sustainable Development from Arba Minch University.
                </p>
                <p>
                  Between 2009 and 2022, Tesfahun served as Project Manager for CIAI (Centro Italiano Aiuti all’Infanzia), directing international development initiatives in community empowerment, child protection, and quality education.
                </p>
              </div>

              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-[#17251F]">
                  Founding AMEPAC & Building Tomorrow
                </h3>
                <p>
                  In October 2011, witnessing the growing hardship of street children in Arba Minch, Tesfahun launched the circus as a healing sanctuary. When Arba Minch University was discarding old student mattresses, Tesfahun negotiated with campus authorities to repurpose them into tumbling mats.
                </p>
                <p>
                  In <strong>November 2022</strong>, Tesfahun officially registered the parent organization, <strong>Building Tomorrow Integrated Youth & Community Development Organization</strong>, formalizing child safeguarding, scholastic support, and health monitoring programs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#17251F] text-[#F7F3EA] border border-[#23382F] space-y-3">
                <h3 className="font-bold text-base text-[#D6A84F]">
                  Coaching Credentials & Public Appointments
                </h3>
                <ul className="space-y-2 text-xs text-[#F7F3EA]/80">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C64B24]"></span>
                    Federal Level Instructor in gymnastics coaching for South Ethiopia (SNNPR)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C64B24]"></span>
                    President & Chair, South Ethiopia Circus Association
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C64B24]"></span>
                    Organizing Committee, First Ethiopian Circus Festival in Addis Ababa (2023)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C64B24]"></span>
                    International Federation of Gymnastics (FIG) Safeguarding Certified Coach
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
