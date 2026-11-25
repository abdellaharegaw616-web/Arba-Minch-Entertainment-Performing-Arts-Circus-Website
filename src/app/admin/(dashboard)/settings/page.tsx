import { getSiteSettings, getAuditLogsForAdmin } from "@/lib/data-store";
import { SettingsManager } from "./SettingsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Site Settings & Audit Logs — AMEPAC Admin",
  description: "Manage official contact information and administrative audit trails.",
};

export default async function AdminSettingsPage() {
  const [settings, auditLogs] = await Promise.all([
    getSiteSettings(),
    getAuditLogsForAdmin(),
  ]);

  return <SettingsManager initialSettings={settings} initialAuditLogs={auditLogs} />;
}
