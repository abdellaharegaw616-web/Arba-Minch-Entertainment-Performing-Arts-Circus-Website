import { getAllHighlightsForAdmin } from "@/lib/data-store";
import { HighlightsManager } from "./HighlightsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Milestones & Highlights — AMEPAC Admin",
  description: "Chronicle organization growth, awards, and historical milestones.",
};

export default async function AdminHighlightsPage() {
  const highlights = await getAllHighlightsForAdmin();

  return <HighlightsManager initialHighlights={highlights} />;
}
