import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Heart,
  Award,
  Users,
  GraduationCap,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle,
  Building2,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Us & Social Impact — AMEPAC Arba Minch",
  description:
    "Learn about AMEPAC (est. 2011) and its parent organization Building Tomorrow Integrated Youth & Community Development Organization (registered Nov 2022). Founder Tesfahun Mergia's journey, core values, and community impact in Arba Minch, South Ethiopia.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Creativity & Innovation",
      desc: "Fostering an environment of imagination and artistic experimentation, infusing traditional Ethiopian motifs into high-level circus arts.",
    },
    {
      title: "Collaboration & Teamwork",
      desc: "Building deep trust through partner acrobatics and partnering with local and international cultural organizations.",
    },
    {
      title: "Self-Sufficiency & Empowerment",
      desc: "Empowering former street youth and underprivileged children with professional skills that guarantee economic independence and dignity.",
    },
    {
      title: "Inclusivity & Access",
      desc: "Making performing arts accessible to all regardless of economic status, background, gender, or physical vulnerability.",
    },
    {
      title: "Cultural Heritage",
      desc: "Celebrating and preserving the rich ethnic dances, rhythms, and handwoven textiles of Gamo and Southern Ethiopia.",
    },
    {
      title: "Community Engagement",
      desc: "Engaging directly with schools, neighborhood youth, elders, and families to foster civic unity and joy.",
    },
    {
      title: "Education & Development",
      desc: "Enforcing mandatory school attendance for all circus members and providing scholastic tutoring and materials.",
    },
    {
      title: "Joy & Celebration",
      desc: "Uplifting the spirit of our community and igniting imagination through the wonder of live human performance.",
    },
  ];

  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* 1. Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Our Heritage & Purpose
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              Transforming Lives in Arba Minch Through Circus Arts
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              From barefoot rehearsals on bare soil to international stages across Africa, Europe, and Asia.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Institutional Framework & Core Distinction */}
      <section className="py-12 border-b border-[#EBE5D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm">
            <div className="flex items-start gap-4">
              <Building2 className="w-8 h-8 text-[#C64B24] shrink-0 mt-1" />
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#17251F]">
                  Organizational Context & Registration Distinction
                </h2>
                <p className="text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
                  The circus and performing arts group, <strong>AMEPAC (Arba Minch Entertainment Performing Arts & Circus)</strong>, was established on the ground in <strong>2011</strong>.
                  Its formal non-profit parent entity, <strong>Building Tomorrow Integrated Youth & Community Development Organization</strong>, was officially registered in <strong>November 2022</strong>.
                </p>
                <p className="text-xs text-[#17251F]/70">
                  This structure allows our performing arts ensembles to maintain their artistic touring identity while operating under a certified NGO umbrella that administers child protection, educational sponsorships, and community health interventions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Story & Founder Bio */}
      <section id="director" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Director Bio Card */}
            <div className="lg:col-span-5 bg-[#17251F] text-[#F7F3EA] rounded-xl overflow-hidden shadow-xl border border-[#D6A84F]/30 sticky top-28">
              <div className="relative h-80 w-full bg-[#0E1814]">
                <Image
                  src="/images/tesfahun_director.jpg"
                  alt="Tesfahun Mergia, Founder & Executive Director of AMEPAC"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#F7F3EA]">Tesfahun Mergia</h3>
                  <p className="text-xs font-semibold text-[#D6A84F] mt-0.5">
                    Founder & Executive Director, AMEPAC & Building Tomorrow
                  </p>
                  <p className="text-xs text-[#F7F3EA]/70 mt-1">
                    South Ethiopia Regional State / Gamo Zone Gymnastics Head Coach
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#F7F3EA]/80 pt-2 border-t border-[#23382F]">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#D6A84F]" />
                    <span>MSc in Environment & Sustainable Development (Arba Minch University)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#D6A84F]" />
                    <span>BSc in Rural Development & Family Science (Hawassa University)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#D6A84F]" />
                    <span>FIG-Certified Coach Safeguarding Credential (Nov 2024)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#D6A84F]" />
                    <span>Organizing Committee, First Ethiopian Circus Festival (2023)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#D6A84F]" />
                    <span>President & Chair, South Ethiopia Circus Association</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#23382F]">
                  <Link
                    href="/book"
                    className="w-full text-center block py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors"
                  >
                    Contact Director & Booking Office
                  </Link>
                </div>
              </div>
            </div>

            {/* Narrative Story */}
            <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                  The Genesis (2011)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F]">
                  From Discarded Mattresses to National Stage
                </h2>
                <p>
                  Tesfahun Mergia discovered the power of the circus at age 14, joining the Debub Nigat circus in Hawassa. Later, while teaching and working as an international project manager with CIAI (Centro Italiano Aiuti all’Infanzia), he witnessed the intense vulnerability of children living on the streets of Arba Minch.
                </p>
                <p>
                  In October 2011, Tesfahun gathered a handful of street youth in central Arba Minch. When the local university campus discarded old student sleeping mattresses, Tesfahun petitioned administrators to repurpose them as acrobatic tumbling mats instead of discarding them. That marked the humble beginning of Arba Minch Circus.
                </p>
              </div>

              <div className="bg-[#EBE5D6] p-5 rounded-lg border-l-4 border-[#C64B24] space-y-2">
                <h4 className="font-bold text-sm text-[#17251F]">The Core Educational Principle:</h4>
                <p className="italic text-xs text-[#17251F]/80">
                  &ldquo;The non-negotiable condition to attend our circus classes is that the children must also attend regular formal school. Education is the ultimate target. Some initially arrive with aggressive street survival habits, but within weeks in the circus family, they learn discipline, peer respect, and self-worth.&rdquo;
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#17251F]">
                  Our Mission & Vision
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#EBE5D6]/70 border border-[#D6A84F]/30">
                    <strong className="text-[#C64B24] block mb-1">Our Mission:</strong>
                    <p className="text-xs text-[#17251F]/80">
                      To create a healing sanctuary for street and vulnerable children through an empowering environment where every child explores their unique talent, entertains audiences, and secures a dignified future without regard to past adversity.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#EBE5D6]/70 border border-[#D6A84F]/30">
                    <strong className="text-[#17251F] block mb-1">Our Vision:</strong>
                    <p className="text-xs text-[#17251F]/80">
                      To be a premier performing arts hub in Ethiopia and East Africa, fostering artistic innovation, cultural preservation, and sustained economic self-sufficiency for underprivileged youth.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Reality of our Facility */}
              <div className="space-y-3 pt-4 border-t border-[#EBE5D6]">
                <h3 className="text-xl font-bold text-[#17251F]">
                  The Reality of our Training Hall
                </h3>
                <p>
                  Today, over 80 youth train across Senior, Junior, and Beginner tiers. Yet our training hall remains a fragile shed constructed from wooden twigs, wattle, and light tin sheets. During the rainy season, precipitation pours through gaps in the roof onto the dirt floor, forcing training sessions onto damp cardboard and causing frequent respiratory flu.
                </p>
                <p>
                  Despite these severe constraints, our artists have reached the world stage. We are currently actively fundraising to construct an all-weather youth performing arts center in Arba Minch.
                </p>
                <div className="pt-2">
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A]"
                  >
                    Learn about the Training Center Building Fund &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="py-16 bg-[#17251F] text-[#F7F3EA] border-t border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Guiding Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3EA] mt-1">
              Our Core Values
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F3EA]/70 mt-1">
              Eight foundational principles that govern our artistic productions, coaching methods, and community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={val.title}
                className="p-5 rounded-lg bg-[#0E1814] border border-[#23382F] hover:border-[#D6A84F]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#C64B24] uppercase tracking-wider mb-1">
                    Value 0{idx + 1}
                  </div>
                  <h3 className="font-bold text-sm text-[#F7F3EA] mb-2">{val.title}</h3>
                  <p className="text-xs text-[#F7F3EA]/75 leading-relaxed">{val.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#23382F] text-[10px] text-[#D6A84F]">
                  AMEPAC Standard
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Proven Achievements Summary */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                Demonstrated Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1">
                Major Institutional Achievements
              </h2>
            </div>

            <div className="space-y-3">
              {[
                "Senior performing artists completed professional contracts in Turkey, India, and Algeria.",
                "Four members selected for the Ethiopian Gymnastics Federation National Team to represent Ethiopia in the All-African Games.",
                "Two female acrobats secured scholarships for advanced artistic gymnastics training in the People's Republic of China.",
                "Leadership and high-profile ensemble showcase at the First Ethiopian Circus Festival in Addis Ababa.",
                "Participation at the 2nd Annual African Circus Arts Festival in Addis Ababa.",
                "Continuous appearances across Gamo Zone, Wolaita, Hawassa, and Addis Ababa festivals.",
                "Over 10 former street children completely self-sufficient with independent rental housing and sustainable careers.",
                "Tesfahun Mergia serving as Federal-Level Instructor in gymnastics coaching for the Southern Ethiopia region.",
              ].map((achievement: string, i: number) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-[#EBE5D6] border border-[#D6A84F]/30 flex items-start gap-3 text-xs sm:text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                  <span className="text-[#17251F]/90 font-medium">{achievement}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 text-center">
              <Link
                href="/highlights"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C64B24] hover:text-[#A83C1A]"
              >
                Explore our full 5-Year timeline with photos and captions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
