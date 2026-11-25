import { getAllServicesForAdmin } from "@/lib/data-store";
import { ServicesManager } from "./ServicesManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services Management — AMEPAC Admin",
  description: "Manage public performance packages, youth workshops, and cultural spectacles.",
};

export default async function AdminServicesPage() {
  const services = await getAllServicesForAdmin();

  return <ServicesManager initialServices={services} />;
}
