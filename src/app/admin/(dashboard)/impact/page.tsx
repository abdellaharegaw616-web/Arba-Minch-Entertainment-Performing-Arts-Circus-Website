import { getAllImpactStoriesForAdmin } from "@/lib/data-store";
import { ImpactManager } from "./ImpactManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Impact Stories — AMEPAC Admin",
  description: "Manage authentic case studies of youth and community transformation.",
};

export default async function AdminImpactPage() {
  const stories = await getAllImpactStoriesForAdmin();

  return <ImpactManager initialStories={stories} />;
}
