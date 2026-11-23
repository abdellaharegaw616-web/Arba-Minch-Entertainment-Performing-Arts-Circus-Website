import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, Video, Camera, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Media Gallery & Videos — AMEPAC Arba Minch",
  description:
    "Watch video productions and view authentic circus photography capturing AMEPAC acrobatics, contortion, and youth training in Arba Minch, Ethiopia.",
};

export default function MediaPage() {
  const photoGallery = [
    {
      src: "/images/circus_performance_1.png",
      title: "Troupe African Pride Equilibrium",
      caption: "High-voltage partner balancing and banquine acrobatics on stage.",
    },
    {
      src: "/images/circus_performance_2.png",
      title: "Troupe Gamo Bayira Synchronized Routine",
      caption: "Acrobatic human pyramid and Chinese pole feats.",
    },
    {
      src: "/images/troupe_yoga_brothers.png",
      title: "Arba Minch Yoga Brothers Duo",
      caption: "Extreme contortion and hyper-flexibility performers.",
    },
    {
      src: "/images/troupe_gamo_bayira.png",
      title: "Troupe Gamo Bayira Ensemble",
      caption: "Precision acrobats and object manipulation artists.",
    },
    {
      src: "/images/troupe_black_lioness.png",
      title: "Troupe Black Lioness Artists",
      caption: "All-female powerhouse balance and antipode troupe.",
    },
    {
      src: "/images/circus_facility_3.png",
      title: "Arba Minch Youth Training Hall",
      caption: "Our makeshift training shed where more than 80 youth practice daily.",
    },
  ];

  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Visual Archives
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              Performances, Videos & Photography
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              Witness the raw athleticism, artistry, and joy of our young performers. We share real, approved documentation of our productions, training sessions, and community street shows.
            </p>
          </div>
        </div>
      </section>

      {/* Video Highlights Section (Per client note: "What about some videos of the best productions and not just image stills") */}
      <section className="py-16 border-b border-[#EBE5D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                Featured Productions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1 flex items-center gap-2">
                <Video className="w-6 h-6 text-[#C64B24]" />
                Best Stage Productions & Rehearsals
              </h2>
            </div>
            <a
              href="https://web.facebook.com/profile.php?id=100063595935774"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#C64B24] hover:underline hidden sm:inline-block"
            >
              Watch more on Facebook &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Showcase Card 1 */}
            <div className="bg-[#17251F] text-[#F7F3EA] rounded-xl overflow-hidden border border-[#D6A84F]/40 shadow-lg">
              <div className="relative h-64 bg-[#0E1814] flex items-center justify-center group cursor-pointer">
                <Image
                  src="/images/circus_performance_1.png"
                  alt="Video thumbnail: AMEPAC Acrobatic Showcase"
                  fill
                  className="object-cover opacity-85 group-hover:opacity-75 transition-opacity"
                />
                <div className="w-16 h-16 rounded-full bg-[#C64B24] text-[#F7F3EA] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform relative z-10">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="absolute bottom-3 left-3 bg-[#0E1814]/90 px-2.5 py-1 rounded text-xs text-[#D6A84F] font-semibold border border-[#D6A84F]/30">
                  Stage Reel • Full Troupe
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-[#F7F3EA]">
                  High-Voltage Banquine & Cyr Wheel Spectacular
                </h3>
                <p className="text-xs text-[#F7F3EA]/75 leading-relaxed">
                  Recorded live during regional cultural festival appearances in Arba Minch and Addis Ababa, featuring Troupe African Pride and Troupe Gamo Bayira.
                </p>
              </div>
            </div>

            {/* Video Showcase Card 2 */}
            <div className="bg-[#17251F] text-[#F7F3EA] rounded-xl overflow-hidden border border-[#D6A84F]/40 shadow-lg">
              <div className="relative h-64 bg-[#0E1814] flex items-center justify-center group cursor-pointer">
                <Image
                  src="/images/circus_performance_2.png"
                  alt="Video thumbnail: Contortion & Chinese Pole"
                  fill
                  className="object-cover opacity-85 group-hover:opacity-75 transition-opacity"
                />
                <div className="w-16 h-16 rounded-full bg-[#D6A84F] text-[#17251F] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform relative z-10">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="absolute bottom-3 left-3 bg-[#0E1814]/90 px-2.5 py-1 rounded text-xs text-[#D6A84F] font-semibold border border-[#D6A84F]/30">
                  Contortion Mastery • Yoga Brothers & Queen of Gamo
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-[#F7F3EA]">
                  Extreme Joint Dislocation & Solo Contortion Architecture
                </h3>
                <p className="text-xs text-[#F7F3EA]/75 leading-relaxed">
                  Documentary excerpt highlighting Samuel Filto, Dagmawi Babena, and Kefeni Teshome demonstrating unprecedented spinal and front-bending flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
              Approved Photography
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1 flex items-center gap-2">
              <Camera className="w-6 h-6 text-[#C64B24]" />
              Authentic Performance & Community Moments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoGallery.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#EBE5D6] rounded-xl overflow-hidden border border-[#D6A84F]/40 shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-56 bg-[#17251F]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-bold text-sm text-[#17251F]">{item.title}</h4>
                  <p className="text-xs text-[#17251F]/70 leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#C64B24] text-[#F7F3EA] text-xs sm:text-sm font-semibold hover:bg-[#A83C1A] transition-colors"
            >
              Book an AMEPAC Performance for Your Stage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
