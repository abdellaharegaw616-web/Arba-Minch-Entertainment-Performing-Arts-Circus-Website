import { Camera, Video, ExternalLink, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery & Videos Management — AMEPAC Admin",
};

export default function AdminGalleryPage() {
  const mediaItems = [
    {
      title: "Troupe African Pride Banquine Formation",
      type: "image",
      category: "Main Stage Performance",
      url: "/images/circus_performance_1.png",
    },
    {
      title: "Troupe Gamo Bayira Chinese Pole & Balance",
      type: "image",
      category: "Festival Showcase",
      url: "/images/circus_performance_2.png",
    },
    {
      title: "Arba Minch Yoga Brothers Ensemble Portrait",
      type: "image",
      category: "Artist Portraits",
      url: "/images/troupe_yoga_brothers.png",
    },
    {
      title: "Troupe Gamo Bayira Artist Portrait",
      type: "image",
      category: "Artist Portraits",
      url: "/images/troupe_gamo_bayira.png",
    },
    {
      title: "Troupe Black Lioness Artist Portrait",
      type: "image",
      category: "Artist Portraits",
      url: "/images/troupe_black_lioness.png",
    },
    {
      title: "Arba Minch Training Ground & Hall",
      type: "image",
      category: "Grassroots Training",
      url: "/images/circus_facility_3.png",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Visual Media CMS
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#C64B24]" />
            Gallery & Production Videos ({mediaItems.length})
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Store image pointers and video streaming embeds with high-performance CDN resolution.
          </p>
        </div>
        <Link
          href="/gallery"
          target="_blank"
          className="px-3.5 py-1.5 rounded-lg bg-[#17251F] text-[#F7F3EA] text-xs font-semibold hover:bg-[#23382F] transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Open Public Gallery</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-bold uppercase">
                {item.category}
              </span>
              <span className="text-[11px] text-[#17251F]/50 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> Image
              </span>
            </div>
            <strong className="block text-sm font-bold text-[#17251F]">{item.title}</strong>
            <p className="text-[11px] text-[#17251F]/60 font-mono truncate">{item.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
