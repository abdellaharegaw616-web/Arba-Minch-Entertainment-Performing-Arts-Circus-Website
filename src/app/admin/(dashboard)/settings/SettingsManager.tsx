"use client";

import React, { useState } from "react";
import { SiteSettings, AuditLogEntry } from "@/types";
import { saveSiteSettingsAction } from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import {
  Settings,
  Shield,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  History,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";

interface SettingsManagerProps {
  initialSettings: SiteSettings;
  initialAuditLogs: AuditLogEntry[];
}

export function SettingsManager({
  initialSettings,
  initialAuditLogs,
}: SettingsManagerProps) {
  const [activeTab, setActiveTab] = useState<"settings" | "audit">("settings");
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);

  // Form Fields
  const [organizationName, setOrganizationName] = useState(settings.organizationName);
  const [parentOrganizationName, setParentOrganizationName] = useState(settings.parentOrganizationName);
  const [circusEstablishedYear, setCircusEstablishedYear] = useState(settings.circusEstablishedYear);
  const [parentOrgRegisteredDate, setParentOrgRegisteredDate] = useState(settings.parentOrgRegisteredDate);
  const [physicalLocation, setPhysicalLocation] = useState(settings.physicalLocation);
  const [primaryPhone, setPrimaryPhone] = useState(settings.primaryPhone);
  const [primaryEmail, setPrimaryEmail] = useState(settings.primaryEmail);
  const [facebookLink, setFacebookLink] = useState(settings.socialLinks?.facebook || "");
  const [youtubeLink, setYoutubeLink] = useState(settings.socialLinks?.youtube || "");
  const [telegramLink, setTelegramLink] = useState(settings.socialLinks?.telegram || "");
  const [metaDescription, setMetaDescription] = useState(settings.metaDescription || "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await saveSiteSettingsAction({
        organizationName,
        parentOrganizationName,
        circusEstablishedYear,
        parentOrgRegisteredDate,
        physicalLocation,
        primaryPhone,
        primaryEmail,
        socialLinks: {
          facebook: facebookLink,
          youtube: youtubeLink,
          telegram: telegramLink,
        },
        metaDescription,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setSettings((prev) => ({
          ...prev,
          organizationName,
          parentOrganizationName,
          circusEstablishedYear,
          parentOrgRegisteredDate,
          physicalLocation,
          primaryPhone,
          primaryEmail,
          socialLinks: {
            facebook: facebookLink,
            youtube: youtubeLink,
            telegram: telegramLink,
          },
          metaDescription,
          updatedAt: new Date().toISOString(),
        }));
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to update site settings." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminModuleHeader
        badge="System Configuration"
        title="Site Settings & Audit Logs"
        description="Maintain verified public contact information, legal registration entities, and view administrative audit records."
        icon={<Settings className="w-6 h-6 text-[#C64B24]" />}
        totalCount={auditLogs.length}
        createLabel=""
      />

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
              : "bg-red-50 text-red-900 border-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] underline ml-4 hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#D6A84F]/30 gap-6 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === "settings"
              ? "border-[#C64B24] text-[#C64B24]"
              : "border-transparent text-[#17251F]/60 hover:text-[#17251F]"
          }`}
        >
          <Building2 className="w-4 h-4" /> Organization & Contact Settings
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === "audit"
              ? "border-[#C64B24] text-[#C64B24]"
              : "border-transparent text-[#17251F]/60 hover:text-[#17251F]"
          }`}
        >
          <History className="w-4 h-4" /> Administrative Audit Trail ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: SETTINGS FORM */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
          {/* Organizational Distinction Panel */}
          <div className="p-6 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#C64B24] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-extrabold text-sm text-[#17251F]">
                  Official Organizational Identity
                </h3>
                <p className="text-xs text-[#17251F]/70 mt-0.5">
                  Distinction between the circus group established in 2011 and its parent registered entity (November 2022).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Circus Group Name *
                </label>
                <input
                  type="text"
                  required
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F]"
                />
              </div>
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Circus Established Year *
                </label>
                <input
                  type="number"
                  required
                  value={circusEstablishedYear}
                  onChange={(e) => setCircusEstablishedYear(parseInt(e.target.value) || 2011)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Parent Non-Profit Organization *
                </label>
                <input
                  type="text"
                  required
                  value={parentOrganizationName}
                  onChange={(e) => setParentOrganizationName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F]"
                />
              </div>
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Parent Non-Profit Registration Date *
                </label>
                <input
                  type="text"
                  required
                  value={parentOrgRegisteredDate}
                  onChange={(e) => setParentOrgRegisteredDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F]"
                />
              </div>
            </div>
          </div>

          {/* Official Contact Details */}
          <div className="p-6 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#17251F] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C64B24]" />
              Approved Public Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Primary Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F]"
                />
              </div>
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Primary Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Physical Office & Training Location *
              </label>
              <input
                type="text"
                required
                value={physicalLocation}
                onChange={(e) => setPhysicalLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F]"
              />
            </div>
          </div>

          {/* Social Channels & SEO */}
          <div className="p-6 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#17251F]">
              Social Media Channels & Search Optimization
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Facebook URL
                </label>
                <input
                  type="text"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[11px]"
                />
              </div>
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  YouTube URL
                </label>
                <input
                  type="text"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[11px]"
                />
              </div>
              <div>
                <label className="font-bold text-[#17251F] block mb-1">
                  Telegram Channel URL
                </label>
                <input
                  type="text"
                  value={telegramLink}
                  onChange={(e) => setTelegramLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[11px]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Global Meta Description (Search Engines)
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#C64B24] text-[#F7F3EA] font-bold text-xs hover:bg-[#A83C1A] flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving Changes...
                </>
              ) : (
                "Save Official Site Settings"
              )}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30 text-xs text-[#17251F]/80">
            <p>
              This immutable administrative log records every creation, modification, deletion, and publication action taken across the AMEPAC content-management dashboard.
            </p>
          </div>

          <div className="bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#17251F] text-[#D6A84F] text-[11px] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Administrator</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Module</th>
                    <th className="px-4 py-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6A84F]/20 text-[#17251F]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F7F3EA]/60 transition-colors">
                      <td className="px-4 py-3 font-mono text-[11px] text-[#17251F]/70 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#17251F]">
                        {log.adminEmail}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#17251F] text-[#D6A84F] uppercase">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#C64B24]">
                        {log.entityType}
                      </td>
                      <td className="px-4 py-3 text-[#17251F]/75 max-w-xs truncate">
                        {log.details ? JSON.stringify(log.details) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
