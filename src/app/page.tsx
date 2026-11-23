import Link from "next/link";
import Image from "next/image";
import {
  getTroupes,
  getServices,
  getEvents,
  getHighlights,
  getTestimonials,
  getImpactStories,
} from "@/lib/data-store";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { TroupeCard } from "@/components/cards/TroupeCard";
import { EventCard } from "@/components/cards/EventCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { CallToAction } from "@/components/ui/CallToAction";
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
  Shield,
  Building2,
  Camera,
} from "lucide-react";

export default async function HomePage() {
  const [troupes, services, events, highlights, testimonials, impactStories] =
    await Promise.all([
      getTroupes(),
      getServices(),
      getEvents(),
      getHighlights(),
      getTestimonials(),
      getImpactStories(),
    ]);

  const upcomingEvents = events.filter((e) => e.isUpcoming).slice(0, 3);
  const featuredTroupes = troupes;
  const featuredServices = services.slice(0, 6);
  const keyHighlights = highlights.slice(0, 4);
  const keyStories = impactStories.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EA] text-[#17251F]">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#17251F] text-[#F7F3EA] overflow-hidden py-16 lg:py-24 border-b border-[#23382F]">
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
                  href="/book-us"
                  className="px-6 py-3.5 rounded-md bg-[#C64B24] text-[#F7F3EA] font-semibold text-sm hover:bg-[#A83C1A] transition-all shadow-md flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book a Performance
                </Link>
                <Link
                  href="/support"
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

                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0E1814] border border-[#D6A84F]/40 p-3 rounded-lg shadow-xl flex items-center gap-3 max-w-[280px]">
                  <div className="w-12 h-12 rounded-full bg-[#C64B24] text-[#F7F3EA] flex items-center justify-center font-bold text-sm shrink-0 border border-[#D6A84F] shadow">
                    TM
                  </div>
                  <div className="text-xs">
                    <Link href="/founder" className="font-semibold text-[#D6A84F] hover:underline">
                      Tesfahun Mergia
                    </Link>
                    <p className="text-[11px] text-[#F7F3EA]/70">Founder & FIG Certified Coach</p>
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
                &ldquo;We started as the Arba Minch Circus by bringing together children living in the streets of Arba Minch as well as children living in the community with their parents. This approach was very successful because the children learn from each other by sharing their values, smiles, love, and affection...&rdquo;
                <footer className="mt-2 text-xs font-semibold not-italic text-[#C64B24]">
                  — Tesfahun Mergia, Founder & Director
                </footer>
              </blockquote>
              <p className="text-sm text-[#17251F]/85 leading-relaxed">
                Rather than treating children on the street as outcasts, AMEPAC offers rigorous discipline, artistic expression, and life-saving child protection. A non-negotiable rule is that{" "}
                <strong>every participating child must regularly attend formal school</strong>.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#C64B24] hover:text-[#A83C1A]"
                >
                  Our story & mission <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/impact"
                  className="text-sm font-semibold text-[#17251F] hover:text-[#C64B24]"
                >
                  Impact Case Studies &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-xl border border-[#D6A84F]/30 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17251F] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C64B24]" />
                  Demonstrated Milestones
                </h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C64B24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17251F]">Street to Global Stages:</strong>
                      <p className="text-[#17251F]/75 mt-0.5">Senior alumni now tour professionally in Turkey, India, and Algeria, securing sustainable livelihoods.</p>
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
                      <strong className="text-[#17251F]">Zero School Dropouts:</strong>
                      <p className="text-[#17251F]/75 mt-0.5">Backed by mandatory education tracking and scholastic exercise books provided to all 80+ trainees.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED TROUPES (With Reusable TroupeCard linking to /troupes/[slug]) */}
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
                Five specialized ensembles trained in high-voltage acrobatics, extreme contortion, Chinese pole, and object manipulation.
              </p>
            </div>
            <Link
              href="/troupes"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#D6A84F] hover:text-[#F7F3EA] transition-colors"
            >
              View All Troupes & Rosters <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredTroupes.map((troupe) => (
              <TroupeCard key={troupe.id} troupe={troupe} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PACKAGES & SERVICES (With Reusable ServiceCard linking to /services/[slug]) */}
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
              From full stage circus spectacles to giant street puppets, live Ethiopian music fusion, and youth masterclasses. Every card leads directly to its dedicated package detail page:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
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

      {/* 6. IMPACT CASE STUDIES */}
      <section className="py-16 bg-[#EBE5D6] border-t border-b border-[#D6A84F]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                Real Stories
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1">
                Life Transformation Stories
              </h2>
              <p className="text-xs sm:text-sm text-[#17251F]/70 mt-1">
                Verified case studies from our 13+ years of community performing arts work in Arba Minch.
              </p>
            </div>
            <Link
              href="/impact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C64B24] hover:text-[#A83C1A]"
            >
              Read All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyStories.map((story) => (
              <div
                key={story.id}
                className="bg-[#F7F3EA] rounded-xl border border-[#D6A84F]/30 p-5 flex flex-col justify-between hover:border-[#C64B24] transition-all group"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#C64B24] uppercase block mb-1">
                    {story.category}
                  </span>
                  <h3 className="font-bold text-base text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                    <Link href={`/impact/${story.slug}`}>{story.title}</Link>
                  </h3>
                  <p className="text-xs text-[#17251F]/75 mt-2 line-clamp-3 leading-relaxed">
                    {story.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#17251F]/60">Documented Impact</span>
                  <Link
                    href={`/impact/${story.slug}`}
                    className="font-bold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1"
                  >
                    Read Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. URGENT NEED: TRAINING CENTER FACILITY FUND */}
      <section className="py-16 bg-[#0E1814] text-[#F7F3EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#17251F] rounded-xl border border-[#D6A84F]/40 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C64B24]/20 border border-[#C64B24]/40 text-[#E06840] text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Urgent Priority: Training Center Renovation
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3EA]">
                  Help Build a Safe, Weather-Proof Training Hall
                </h2>
                <p className="text-xs sm:text-sm text-[#F7F3EA]/85 leading-relaxed">
                  Our current training facility in central Arba Minch is a makeshift shed built of light wattle, wooden poles, and tin with open holes. During the rainy season, water pours through the roof onto the bare soil floor. Aerial training is impossible because the fragile roof cannot support safety rigging.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/support"
                    className="px-6 py-3 rounded-md bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs sm:text-sm hover:bg-[#A83C1A] transition-all flex items-center gap-2 shadow"
                  >
                    <HeartHandshake className="w-4 h-4" /> Contribute to Facility Fund
                  </Link>
                  <Link
                    href="/support#facility"
                    className="text-xs text-[#D6A84F] hover:text-[#F7F3EA] transition-colors underline underline-offset-4"
                  >
                    View Facility Photographs & Bank Info &rarr;
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

      {/* 8. UPCOMING EVENTS (With Reusable EventCard linking to /events/[slug]) */}
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
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (With Reusable TestimonialCard) */}
      <section className="py-16 bg-[#17251F] text-[#F7F3EA] border-t border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
                Authentic Voices
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3EA] mt-1">
                Reflections of our Performers & Partners
              </h2>
            </div>
            <Link
              href="/testimonials"
              className="text-xs sm:text-sm font-semibold text-[#D6A84F] hover:text-[#F7F3EA] transition-colors flex items-center gap-1"
            >
              Read All Testimonials <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. GALLERY PREVIEW */}
      <section className="py-16 bg-[#F7F3EA] text-[#17251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                Photo Gallery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1 flex items-center gap-2">
                <Camera className="w-6 h-6 text-[#C64B24]" />
                Capturing the Movement
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs sm:text-sm font-semibold text-[#C64B24] hover:text-[#A83C1A] flex items-center gap-1"
            >
              Open Full High-Res Gallery <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: "/images/circus_performance_1.png", title: "Banquine Tosses", cat: "Troupe African Pride" },
              { src: "/images/circus_performance_2.png", title: "Chinese Pole", cat: "Troupe Gamo Bayira" },
              { src: "/images/circus_facility_3.png", title: "Training Ground", cat: "Arba Minch Hall" },
              { src: "/images/tesfahun_director.jpg", title: "Director Coaching", cat: "Tesfahun Mergia" },
            ].map((img, i) => (
              <Link
                key={i}
                href="/gallery"
                className="group relative h-48 rounded-xl overflow-hidden bg-[#17251F] border border-[#D6A84F]/30 block shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] text-[#D6A84F] font-bold uppercase">{img.cat}</span>
                  <span className="text-xs font-semibold">{img.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BOTTOM CTA */}
      <CallToAction />
    </div>
  );
}
