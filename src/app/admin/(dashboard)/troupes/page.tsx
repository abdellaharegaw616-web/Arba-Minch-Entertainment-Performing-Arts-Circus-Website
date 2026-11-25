import { getTroupes } from "@/lib/data-store";
import { Users, Sparkles, ExternalLink, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Troupes & Ensemble Management — AMEPAC Admin",
};

export default async function AdminTroupesPage() {
  const troupes = await getTroupes();

  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Artist Ensembles
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#C64B24]" />
            Performing Arts Troupes ({troupes.length})
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Five specialized circus troupes trained in Arba Minch under FIG-certified gymnastics ethics.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {troupes.map((troupe) => (
          <div
            key={troupe.id}
            className="p-5 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#D6A84F] bg-[#17251F] shrink-0">
                <Image
                  src={troupe.featuredImage || "/images/circus_performance_1.png"}
                  alt={troupe.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-[#17251F]">{troupe.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#17251F] text-[#D6A84F] font-bold">
                    {troupe.membersCount} {troupe.membersCount === 1 ? "artist" : "artists"}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#B88C35]">{troupe.subTitle}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {troupe.members.map((member) => (
                    <span
                      key={member}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#F7F3EA] text-[#17251F] font-medium border border-[#D6A84F]/30"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-[#D6A84F]/30 pt-3 md:pt-0 md:pl-4">
              <Link
                href={`/troupes/${troupe.slug}`}
                target="_blank"
                className="px-3.5 py-1.5 rounded-lg bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A] transition-colors flex items-center gap-1"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
