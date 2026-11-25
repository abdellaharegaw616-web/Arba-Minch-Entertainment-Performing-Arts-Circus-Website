import { getImpactStories } from "@/lib/data-store";
import { HeartHandshake, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Impact Stories Management — AMEPAC Admin",
};

export default async function AdminImpactPage() {
  const stories = await getImpactStories();

  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Social Impact CMS
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-[#C64B24]" />
            Community Impact Stories ({stories.length})
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Transformational narratives documenting street youth rehabilitation, mandatory schooling, and girls in circus arts.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="p-5 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-bold uppercase">
                {story.category}
              </span>
              <h3 className="font-extrabold text-base text-[#17251F]">{story.title}</h3>
              <p className="text-xs font-semibold text-[#B88C35]">{story.subtitle}</p>
              <p className="text-xs text-[#17251F]/80 line-clamp-2">{story.summary}</p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Link
                href={`/impact/${story.slug}`}
                target="_blank"
                className="px-3.5 py-1.5 rounded-lg bg-[#C64B24] text-[#F7F3EA] text-xs font-semibold hover:bg-[#A83C1A] transition-colors flex items-center gap-1"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
