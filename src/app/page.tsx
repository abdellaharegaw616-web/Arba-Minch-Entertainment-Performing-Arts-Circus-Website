import Link from "next/link";
import Image from "next/image";
import { getTroupes, getServices, getEvents, getHighlights, getTestimonials } from "@/lib/data-store";
import {
  Sparkles,
  Calendar,
  HeartHandshake,
  Users,
  Trophy,
  Award,
  ArrowRight,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Shield,
  HelpCircle,
  Building2,
} from "lucide-react";

export default async function HomePage() {
  const [troupes, services, events, highlights, testimonials] = await Promise.all([
    getTroupes(),
    getServices(),
    getEvents(),
    getHighlights(),
    getTestimonials(),
  ]);

  const upcomingEvents = events.filter((e) => e.isUpcoming).slice(0, 3);
  const featuredTroupes = troupes.slice(0, 4);
  const keyHighlights = highlights.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#17251F] text-[#F7F3EA] overflow-hidden py-16 lg:py-24 border-b border-[#23382F]">
        {/* Subtle decorative Ethiopian aesthetic borders */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D6A84F_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#23382F] border border-[#D6A84F]/40 text-[#D6A84F] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Grassroots Circus & Performing Arts Since 2011
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F7F3EA] leading-tight">
                World-Class Circus Arts Born in the Heart of{" "}
                <span className="text-[#D6A84F]">Arba Minch</span>
              </h1>

              <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
                Arba Minch Entertainment Performing Arts & Circus (AMEPAC) combines breathtaking Ethiopian acrobatics, contortion, dance, and giant puppetry with an enduring social mission: transforming the lives of vulnerable street youth into proud, disciplined, world-touring artists.
              </p>

              {/* Organization Distinction Notice */}
              <div className="p-3.5 rounded-lg bg-[#0E1814] border border-[#D6A84F]/30 text-xs text-[#F7F3EA]/80 flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#D6A84F]">Organizational Framework: </strong>
                  Circus established in 2011. Registered under its official non-profit umbrella,{" "}
                  <span className="text-[#F7F3EA] font-medium">
                    Building Tomorrow Integrated Youth & Community Development Organization
                  </span>{" "}
                  (Reg. November 2022).
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/book"
                  className="px-6 py-3.5 rounded-md bg-[#C64B24] text-[#F7F3EA] font-semibold text-sm hover:bg-[#A83C1A] transition-all shadow-md flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book a Performance
                </Link>
                <Link
                  href="/donate"
                  className="px-6 py-3.5 rounded-md border border-[#D6A84F] text-[#D6A84F] font-semibold text-sm hover:bg-[#D6A84F] hover:text-[#17251F] transition-all flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4" /> Support Training Facility
                </Link>
                <Link
                  href="/troupes"
                  className="px-4 py-3.5 text-xs text-[#F7F3EA]/70 hover:text-[#D6A84F] transition-colors flex items-center gap-1"
                >
                  Meet the Troupes <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs text-[#F7F3EA]/60 pt-2">
                <MapPin className="w-4 h-4 text-[#C64B24]" />
                <span>Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia</span>
              </div>
            </div>

            {/* Right Column: Authentic Performance Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Authentic Performance Card */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-[#D6A84F]/30 bg-[#0E1814]">
                  <Image
                    src="/images/circus_performance_1.png"
                    alt="AMEPAC Acrobats Performing High-Energy Equilibrium Act"
                    width={600}
                    height={420}
                    className="w-full h-72 sm:h-80 object-cover"
                    priority
                  />
                  <div className="p-4 bg-[#17251F] border-t border-[#23382F]">
                    <div className="flex items-center justify-between text-xs text-[#D6A84F] font-semibold uppercase tracking-wider mb-1">
                      <span>Featured Troupe</span>
                      <span>Arba Minch, Ethiopia</span>
                    </div>
                    <p className="text-sm font-medium text-[#F7F3EA]">
                      Troupe African Pride performing synchronized banquine and human pyramid formations.
                    </p>
                  </div>
                </div>

                {/* Director Inset Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0E1814] border border-[#D6A84F]/40 p-3 rounded-lg shadow-xl flex items-center gap-3 max-w-[280px]">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#D6A84F]">
                    <Image
                      src="/images/tesfahun_director.jpg"
                      alt="Tesfahun Mergia, Founder & Director"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-[#D6A84F]">Tesfahun Mergia</p>
                    <p className="text-[11px] text-[#F7F3EA]/70">Founder & Director, FIG Certified Coach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPACT & VITAL METRICS COUNTER */}
      <section className="bg-[#0E1814] text-[#F7F3EA] py-10 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-lg bg-[#17251F]/60 border border-[#23382F]">
              <div className="text-3xl font-extrabold text-[#D6A84F]">80+</div>
              <p className="text-xs text-[#F7F3EA]/75 mt-1 font-medium">Youth Actively Training</p>
              <span className="text-[10px] text-[#F7F3EA]/50 block">Senior, Junior & Beginner</span>
            </div>
            <div className="p-4 rounded-lg bg-[#17251F]/60 border border-[#23382F]">
              <div className="text-3xl font-extrabold text-[#C64B24]">5</div>
              <p className="text-xs text-[#F7F3EA]/75 mt-1 font-medium">Specialized Troupes</p>
              <span className="text-[10px] text-[#F7F3EA]/50 block">Contortion to Banquine</span>
            </div>
            <div className="p-4 rounded-lg bg-[#17251F]/60 border border-[#23382F]">
              <div className="text-3xl font-extrabold text-[#D6A84F]">4</div>
              <p className="text-xs text-[#F7F3EA]/75 mt-1 font-medium">All-African Games</p>
              <span className="text-[10px] text-[#F7F3EA]/50 block">National Team Members</span>
            </div>
            <div className="p-4 rounded-lg bg-[#17251F]/60 border border-[#23382F]">
              <div className="text-3xl font-extrabold text-[#C64B24]">2</div>
              <p className="text-xs text-[#F7F3EA]/75 mt-1 font-medium">China Scholarships</p>
              <span className="text-[10px] text-[#F7F3EA]/50 block">International Training</span>
            </div>
            <div className="col-span-2 lg:col-span-1 p-4 rounded-lg bg-[#17251F]/60 border border-[#23382F]">
              <div className="text-3xl font-extrabold text-[#D6A84F]">13+</div>
              <p className="text-xs text-[#F7F3EA]/75 mt-1 font-medium">Years of Community Impact</p>
              <span className="text-[10px] text-[#F7F3EA]/50 block">Founded in 2011</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL IMPACT & MISSION SPOTLIGHT */}
      <section className="py-16 bg-[#F7F3EA] text-[#17251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C64B24]/10 text-[#C64B24] text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                Social Circus Mission
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17251F]">
                A Healing Center for Street and Vulnerable Children
              </h2>
              <blockquote className="border-l-4 border-[#C64B24] pl-4 italic text-sm text-[#17251F]/80 leading-relaxed bg-[#EBE5D6]/50 py-3 rounded-r">
                &ldquo;We started as the Arba Minch Circus by bringing together children living in the streets of Arba Minch as well as children living in the community with their parents. This approach was very successful because the children learn from each other by sharing their values, smiles, love, and affection, suspending any judgments about each other as they perform as a team.&rdquo;
                <footer className="mt-2 text-xs font-semibold not-italic text-[#C64B24]">
                  — Tesfahun Mergia, Founder & Director
                </footer>
              </blockquote>
              <p className="text-sm text-[#17251F]/85 leading-relaxed">
                Rather than treating children on the street as outcasts, AMEPAC offers rigorous discipline, artistic expression, and life-saving child protection. A non-negotiable rule is that{" "}
                <strong>every participating child must regularly attend formal school</strong>. We provide scholastic supplies, tutoring, and emotional belonging to break cycles of poverty.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#C64B24] hover:text-[#A83C1A]"
                >
                  Read our full background & organizational history <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-xl border border-[#D6A84F]/30 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17251F] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C64B24]" />
                  Proven Social Milestones
                </h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F]">From Street to Global Stages:</strong>
                      <p className="text-[#17251F]/75 mt-0.5">Senior alumni now tour professionally in Turkey, India, and Algeria, securing sustainable livelihoods for their families.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F]">National Gymnastics Championships:</strong>
                      <p className="text-[#17251F]/75 mt-0.5">Four members selected for the Ethiopian National Gymnastics Team for the All-African Games.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F]">Child Delinquency & Dropout Prevention:</strong>
                      <p className="text-[#17251F]/75 mt-0.5">Zero school dropouts among active participants, backed by mandatory education monitoring and scholastic material provision.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PERFORMING ARTS TROUPES PREVIEW */}
      <section className="py-16 bg-[#17251F] text-[#F7F3EA] border-t border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
                Elite Ensembles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3EA] mt-1">
                Our Performing Arts Troupes
              </h2>
              <p className="text-xs sm:text-sm text-[#F7F3EA]/70 mt-1 max-w-2xl">
                Five specialized ensembles trained in high-voltage acrobatics, extreme contortion, Chinese pole, and synchronized object manipulation.
              </p>
            </div>
            <Link
              href="/troupes"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#D6A84F] hover:text-[#F7F3EA] transition-colors"
            >
              View All Troupes & Rosters <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTroupes.map((troupe) => (
              <div
                key={troupe.id}
                className="bg-[#0E1814] rounded-lg border border-[#23382F] overflow-hidden flex flex-col hover:border-[#D6A84F]/50 transition-all group"
              >
                <div className="relative h-44 bg-[#23382F]">
                  <Image
                    src={troupe.featuredImage || "/images/circus_performance_1.png"}
                    alt={troupe.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#17251F]/90 text-[10px] text-[#D6A84F] border border-[#D6A84F]/30 font-semibold">
                    {troupe.membersCount} {troupe.membersCount === 1 ? "Artist" : "Artists"}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#F7F3EA] group-hover:text-[#D6A84F] transition-colors">
                      {troupe.name}
                    </h3>
                    <p className="text-[11px] text-[#D6A84F] font-medium mt-0.5">
                      {troupe.subTitle}
                    </p>
                    <p className="text-xs text-[#F7F3EA]/70 mt-2 line-clamp-3 leading-relaxed">
                      {troupe.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#23382F] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#F7F3EA]/50">{troupe.acts[0]}</span>
                    <Link
                      href={`/troupes#${troupe.slug}`}
                      className="text-[#C64B24] font-semibold hover:text-[#E06840] flex items-center gap-1"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PACKAGES & SERVICES WITH LIVE LINKS */}
      <section className="py-16 bg-[#F7F3EA] text-[#17251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
              Entertainment Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1">
              What We Offer
            </h2>
            <p className="text-xs sm:text-sm text-[#17251F]/70 mt-2">
              From full stage circus spectacles to giant street puppets, live Ethiopian music fusion, and youth masterclasses. Direct links to explore and book each offering:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.slug}`}
                className="p-5 rounded-lg bg-[#EBE5D6]/60 border border-[#D6A84F]/30 hover:border-[#C64B24] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-semibold text-[#C64B24] uppercase tracking-wider mb-1">
                    {service.category}
                  </div>
                  <h3 className="font-bold text-base text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#17251F]/80 mt-2 leading-relaxed">
                    {service.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs font-semibold text-[#C64B24]">
                  <span>Explore Package & Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#17251F] text-[#F7F3EA] text-xs sm:text-sm font-semibold hover:bg-[#23382F] transition-all"
            >
              Browse All 10 Entertainment Packages & Workshops <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. URGENT NEED: TRAINING CENTER FACILITY FUND (GoFundMe & Monetary Need) */}
      <section className="py-16 bg-[#0E1814] text-[#F7F3EA] border-t border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#17251F] rounded-xl border border-[#D6A84F]/40 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C64B24]/20 border border-[#C64B24]/40 text-[#E06840] text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Urgent Priority: Training Center Expansion
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3EA]">
                  Help Build a Safe, Weather-Proof Training Hall for 80+ Acrobats
                </h2>
                <p className="text-xs sm:text-sm text-[#F7F3EA]/85 leading-relaxed">
                  Our current training facility in central Arba Minch is a makeshift shed built of light wattle, wooden poles, and tin with open holes. During the rainy season, water pours through the roof onto the bare soil floor, turning training mats into mud and causing frequent illness. Aerial training is impossible because the fragile roof cannot support safety rigging.
                </p>
                <p className="text-xs sm:text-sm text-[#D6A84F] italic">
                  &ldquo;When the University campus discarded old student mattresses, we salvaged them for our tumbling mats. We have enough love and talent, but we urgently need a proper facility.&rdquo;
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/donate"
                    className="px-6 py-3 rounded-md bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs sm:text-sm hover:bg-[#A83C1A] transition-all flex items-center gap-2 shadow"
                  >
                    <HeartHandshake className="w-4 h-4" /> Contribute to Facility Fund
                  </Link>
                  <Link
                    href="/donate#facility"
                    className="text-xs text-[#D6A84F] hover:text-[#F7F3EA] transition-colors underline underline-offset-4"
                  >
                    View Facility Photographs & Cost Breakdown &rarr;
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-lg overflow-hidden border border-[#D6A84F]/30 bg-[#0E1814]">
                  <Image
                    src="/images/circus_facility_3.png"
                    alt="Current Arba Minch Circus Training Ground & Facility"
                    width={500}
                    height={320}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3 bg-[#0E1814] text-[11px] text-[#F7F3EA]/70">
                    <strong className="text-[#D6A84F]">Facility Reality: </strong>
                    Makeshift wattle construction & bare soil floor in Arba Minch. Phase 1 goal: secure concrete floor, rain-proof roof, and safety rigging.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. UPCOMING EVENTS CALENDAR PREVIEW */}
      <section className="py-16 bg-[#F7F3EA] text-[#17251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                Public Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1">
                Upcoming Events & Appearances
              </h2>
              <p className="text-xs sm:text-sm text-[#17251F]/70 mt-1">
                Catch our troupes live at regional festivals, community showcases, and cultural tours.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C64B24] hover:text-[#A83C1A] transition-colors"
            >
              Full Calendar & Dates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#EBE5D6] rounded-lg p-5 border border-[#D6A84F]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#C64B24] font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {evt.date}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10">
                      {evt.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#17251F]">{evt.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#17251F]/70 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C64B24]" />
                    <span>{evt.venue}, {evt.location}</span>
                  </div>
                  <p className="text-xs text-[#17251F]/80 mt-3 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#17251F]/60">{evt.ticketInfo}</span>
                  <Link
                    href={`/events#${evt.slug}`}
                    className="font-bold text-[#C64B24] hover:underline"
                  >
                    Event Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 5-YEAR HIGHLIGHTS PREVIEW */}
      <section className="py-16 bg-[#17251F] text-[#F7F3EA] border-t border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
                Trajectory of Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3EA] mt-1">
                5-Year Highlights & Milestones
              </h2>
              <p className="text-xs sm:text-sm text-[#F7F3EA]/70 mt-1">
                Key accomplishments documenting our national and international growth.
              </p>
            </div>
            <Link
              href="/highlights"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#D6A84F] hover:text-[#F7F3EA]"
            >
              See Detailed 5-Year History <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyHighlights.map((hl) => (
              <div
                key={hl.id}
                className="p-5 rounded-lg bg-[#0E1814] border border-[#23382F] hover:border-[#D6A84F]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xl font-extrabold text-[#D6A84F] mb-1">{hl.year}</div>
                  <span className="text-[10px] uppercase font-semibold text-[#C64B24] tracking-wider block mb-2">
                    {hl.category}
                  </span>
                  <h3 className="font-bold text-sm text-[#F7F3EA] mb-2">{hl.title}</h3>
                  <p className="text-xs text-[#F7F3EA]/70 leading-relaxed">{hl.caption}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#23382F] text-[11px] text-[#D6A84F]/80">
                  Documented Milestone &check;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS & VOICES */}
      <section className="py-16 bg-[#F7F3EA] text-[#17251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
              Authentic Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1">
              Voices of our Performers & Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((t) => (
              <div
                key={t.id}
                className="bg-[#EBE5D6] p-6 sm:p-8 rounded-xl border border-[#D6A84F]/40 shadow-sm flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-[#17251F]/85 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-[#D6A84F]/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#17251F]">{t.author}</h4>
                    <p className="text-xs text-[#C64B24]">{t.role}</p>
                  </div>
                  {t.organization && (
                    <span className="text-[11px] text-[#17251F]/60">{t.organization}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BOTTOM INVITATION / BOOKING CALLOUT */}
      <section className="bg-[#C64B24] text-[#F7F3EA] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Bring Ethiopian Circus Magic to Your Event?
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F3EA]/90 max-w-2xl mx-auto">
            Book our acrobats, dancers, and giant puppets for festivals, cultural ceremonies, international tours, and private celebrations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded bg-[#17251F] text-[#D6A84F] font-bold text-sm hover:bg-[#0E1814] transition-all shadow-lg"
            >
              Start Booking Inquiry
            </Link>
            <a
              href="tel:+251913949209"
              className="px-6 py-3.5 rounded border border-[#F7F3EA] text-[#F7F3EA] font-semibold text-sm hover:bg-[#F7F3EA] hover:text-[#C64B24] transition-all"
            >
              Call Us: +251-913-949-209
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
