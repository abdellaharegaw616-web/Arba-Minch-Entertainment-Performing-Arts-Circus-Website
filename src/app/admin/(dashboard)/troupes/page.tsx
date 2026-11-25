import {
  getAllTroupesForAdmin,
  getAllArtistsForAdmin,
  getTroupeMembersForAdmin,
} from "@/lib/data-store";
import { TroupesManager } from "./TroupesManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Troupes & Artists — AMEPAC Admin",
  description: "Manage performing troupes, ensemble rosters, and individual artists.",
};

export default async function AdminTroupesPage() {
  const [troupes, artists] = await Promise.all([
    getAllTroupesForAdmin(),
    getAllArtistsForAdmin(),
  ]);

  // Aggregate troupe members across troupes
  const membersPromises = troupes.map((t) => getTroupeMembersForAdmin(t.id));
  const memberLists = await Promise.all(membersPromises);
  const allMembers = memberLists.flat();

  return (
    <TroupesManager
      initialTroupes={troupes}
      initialArtists={artists}
      initialMembers={allMembers}
    />
  );
}
