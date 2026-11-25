import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { getGalleryAssets } from "@/lib/data-store";
import { CallToAction } from "@/components/ui/CallToAction";
import { ShieldCheck, Camera, Sparkles } from "lucide-react";

export const metadata = {
  title: "Photo & Video Gallery — AMEPAC Arba Minch",
  description:
    "Explore categorized, approved photography and video footage of AMEPAC acrobatics, contortion, rehearsals, and training grounds in Arba Minch, Ethiopia.",
};

export default async function GalleryPage() {
  const assets = await getGalleryAssets();

  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Gallery" }]} />

      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Visual Archives & Video Repertoire
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Photo & Video Gallery
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              Explore documented moments across performances, daily training, festival events, facilities, and troupe profiles. All media represents real, verified AMEPAC activities in Arba Minch, Ethiopia.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <GalleryGrid assets={assets} />

          {/* Child Safeguarding & Photo Consent Policy Notice */}
          <div className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/30 text-xs text-[#17251F]/80 flex items-start gap-3 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#17251F] block font-bold">
                Media Integrity & Minor Safeguarding Assurance:
              </strong>
              <p className="leading-relaxed">
                All photographs and videos published on this portal are authorized records of AMEPAC and Building Tomorrow Integrated Youth & Community Development Organization. Media featuring youth artists is captured with guardian or institutional consent, and published in adherence to ethical, non-exploitative child protection guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
