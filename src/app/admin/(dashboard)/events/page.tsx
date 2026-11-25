import { getAllEventsForAdmin } from "@/lib/data-store";
import { EventsManager } from "./EventsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events Schedule — AMEPAC Admin",
  description: "Schedule regional showcases, festival appearances, and community circus days.",
};

export default async function AdminEventsPage() {
  const events = await getAllEventsForAdmin();

  return <EventsManager initialEvents={events} />;
}
