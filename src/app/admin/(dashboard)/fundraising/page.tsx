import { getAllCampaignsForAdmin } from "@/lib/data-store";
import { FundraisingManager } from "./FundraisingManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fundraising & Training Facility — AMEPAC Admin",
  description: "Manage capital campaigns and community equipment support.",
};

export default async function AdminFundraisingPage() {
  const campaigns = await getAllCampaignsForAdmin();

  return <FundraisingManager initialCampaigns={campaigns} />;
}
