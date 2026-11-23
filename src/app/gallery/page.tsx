import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GalleryGrid, GalleryPhoto } from "@/components/media/GalleryGrid";
import { CallToAction } from "@/components/ui/CallToAction";

export const metadata = {
  title: "Photo & Production Gallery — AMEPAC Arba Minch",
  description:
    "Explore high-resolution approved photography of AMEPAC acrobatics, contortion, rehearsals, and training grounds in Arba Minch, Ethiopia.",
};

const PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/circus_performance_1.png",
    title: "Troupe African Pride Banquine Formation",
    caption: "Senior acrobats executing synchronized banquine launches and multi-tier pyramids.",
    category: "Main Stage Performance",
  },
  {
    src: "/images/circus_performance_2.png",
    title: "Troupe Gamo Bayira Chinese Pole & Balance",
    caption: "Acrobatic human flags and synchronized cube manipulation.",
    category: "Festival Showcase",
  },
  {
    src: "/images/troupe_yoga_brothers.png",
    title: "Arba Minch Yoga Brothers Ensemble Portrait",
    caption: "Official portrait of the celebrated extreme contortion duo from Arba Minch.",
    category: "Artist Portraits",
  },
  {
    src: "/images/troupe_gamo_bayira.png",
    title: "Troupe Gamo Bayira Artist Portrait",
    caption: "Official portrait of Troupe Gamo Bayira professional acrobat.",
    category: "Artist Portraits",
  },
  {
    src: "/images/troupe_black_lioness.png",
    title: "Troupe Black Lioness Artist Portrait",
    caption: "Official portrait of Troupe Black Lioness all-female balance and antipode artist.",
    category: "Artist Portraits",
  },
  {
    src: "/images/circus_facility_3.png",
    title: "Arba Minch Training Ground & Hall",
    caption: "Daily rehearsal hall in central Arba Minch where more than 80 youth practice on soil floors.",
    category: "Grassroots Training",
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Gallery" }]} />

      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Visual Archives
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Photo & Performance Gallery
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              Click on any photograph to view in high resolution with keyboard navigation. All photographs represent real, approved AMEPAC artists and facility grounds.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid photos={PHOTOS} />
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
