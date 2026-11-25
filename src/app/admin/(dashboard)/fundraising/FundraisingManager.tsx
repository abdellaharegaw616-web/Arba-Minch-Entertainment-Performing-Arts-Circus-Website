"use client";

import React, { useState } from "react";
import { FundraisingCampaign } from "@/types";
import {
  saveCampaignAction,
  deleteCampaignAction,
  toggleCampaignActiveAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  HeartHandshake,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  DollarSign,
  Target,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface FundraisingManagerProps {
  initialCampaigns: FundraisingCampaign[];
}

export function FundraisingManager({ initialCampaigns }: FundraisingManagerProps) {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<FundraisingCampaign | null>(null);
  const [deletingCampaign, setDeletingCampaign] = useState<FundraisingCampaign | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [goalAmount, setGoalAmount] = useState<number | undefined>(35000);
  const [currency, setCurrency] = useState("USD");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [targetUse, setTargetUse] = useState("");
  const [externalDonationUrl, setExternalDonationUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const activeCount = campaigns.filter((c) => c.isActive).length;

  const filteredCampaigns = campaigns.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.targetUse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function openCreateModal() {
    setEditingCampaign(null);
    setTitle("");
    setSlug("");
    setGoalAmount(25000);
    setCurrency("USD");
    setSummary("");
    setDescription("");
    setTargetUse("");
    setExternalDonationUrl("");
    setIsActive(true);
    setIsFeatured(false);
    setIsFormOpen(true);
  }

  function openEditModal(c: FundraisingCampaign) {
    setEditingCampaign(c);
    setTitle(c.title);
    setSlug(c.slug);
    setGoalAmount(c.goalAmount);
    setCurrency(c.currency || "USD");
    setSummary(c.summary);
    setDescription(c.description);
    setTargetUse(c.targetUse);
    setExternalDonationUrl(c.externalDonationUrl || "");
    setIsActive(c.isActive);
    setIsFeatured(c.isFeatured);
    setIsFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await saveCampaignAction({
        id: editingCampaign?.id,
        slug: slug.trim() || undefined,
        title,
        goalAmount,
        currency,
        summary,
        description,
        targetUse,
        externalDonationUrl: externalDonationUrl.trim() || undefined,
        isActive,
        isFeatured,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsFormOpen(false);

        if (editingCampaign) {
          setCampaigns((prev) =>
            prev.map((c) =>
              c.id === editingCampaign.id
                ? {
                    ...c,
                    title,
                    goalAmount,
                    currency,
                    summary,
                    description,
                    targetUse,
                    externalDonationUrl,
                    isActive,
                    isFeatured,
                  }
                : c
            )
          );
        } else {
          setCampaigns((prev) => [
            ...prev,
            {
              id: `camp-${Date.now()}`,
              slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
              title,
              goalAmount,
              currency,
              summary,
              description,
              targetUse,
              externalDonationUrl,
              isActive,
              isFeatured,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save campaign." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingCampaign) return;
    const res = await deleteCampaignAction(deletingCampaign.id, deletingCampaign.title);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setCampaigns((prev) => prev.filter((c) => c.id !== deletingCampaign.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleToggleActive(c: FundraisingCampaign) {
    const res = await toggleCampaignActiveAction(c.id);
    if (res.success) {
      setCampaigns((prev) =>
        prev.map((item) =>
          item.id === c.id ? { ...item, isActive: !item.isActive } : item
        )
      );
      setFeedback({ type: "success", message: res.message });
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  return (
    <div className="space-y-6">
      <AdminModuleHeader
        badge="Resource Mobilization"
        title="Fundraising Campaigns & Training Funds"
        description="Manage capital campaigns, training hall renovation goals, and verified partner contribution channels."
        icon={<HeartHandshake className="w-6 h-6 text-[#C64B24]" />}
        totalCount={campaigns.length}
        publishedCount={activeCount}
        draftCount={campaigns.length - activeCount}
        createLabel="New Campaign"
        onCreate={openCreateModal}
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

      {/* Filter and Search Bar */}
      <div className="bg-[#EBE5D6] p-4 rounded-xl border border-[#D6A84F]/30 shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#17251F]/50" />
          <input
            type="text"
            placeholder="Search campaigns by title or equipment target..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
          />
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((camp) => (
          <div
            key={camp.id}
            className={`p-6 rounded-2xl bg-[#EBE5D6] border shadow-xs flex flex-col justify-between space-y-4 ${
              !camp.isActive
                ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                : "border-[#D6A84F]/40 hover:border-[#C64B24]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <AdminStatusBadge status={camp.isActive ? "active" : "inactive"} />
                {camp.isFeatured && (
                  <span className="px-2 py-0.5 rounded-full bg-[#17251F] text-[#D6A84F] text-[10px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D6A84F]" /> Top Priority
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-base text-[#17251F] mt-3">
                {camp.title}
              </h3>
              <p className="text-xs text-[#17251F]/75 mt-1.5 leading-relaxed">
                {camp.summary}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/20 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[#17251F]/70">Target Capital Goal:</span>
                  <span className="text-[#C64B24] font-extrabold text-sm">
                    {camp.currency} {camp.goalAmount?.toLocaleString() || "Open Support"}
                  </span>
                </div>
                <div className="text-[11px] text-[#17251F]/80 flex items-start gap-1.5 pt-1 border-t border-[#D6A84F]/20">
                  <Target className="w-3.5 h-3.5 text-[#D6A84F] shrink-0 mt-0.5" />
                  <span>
                    <strong>Designated Use:</strong> {camp.targetUse}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleToggleActive(camp)}
                className={`px-3 py-1 rounded text-[11px] font-bold ${
                  camp.isActive
                    ? "bg-[#C64B24]/10 text-[#C64B24] hover:bg-[#C64B24]/20"
                    : "bg-emerald-600/10 text-emerald-800 hover:bg-emerald-600/20"
                }`}
              >
                {camp.isActive ? "Pause Campaign" : "Activate Campaign"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(camp)}
                  className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingCampaign(camp)}
                  className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                  title="Delete campaign"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Form Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCampaign ? `Edit Campaign: ${editingCampaign.title}` : "Create Fundraising Campaign"}
        subtitle="Specify capital targets, designated facility equipment, and approved giving details"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Campaign Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Training Center Renovation & Weatherproofing Fund"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Goal Amount
              </label>
              <input
                type="number"
                value={goalAmount || ""}
                onChange={(e) => setGoalAmount(parseInt(e.target.value) || undefined)}
                placeholder="35000"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              >
                <option value="USD">USD ($)</option>
                <option value="ETB">ETB (Birr)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 font-mono text-[11px]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Brief Summary * (Displays on cards)
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="1-2 sentences highlighting what this campaign will accomplish..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Designated Use of Funds * (Specific equipment / building materials)
            </label>
            <input
              type="text"
              required
              value={targetUse}
              onChange={(e) => setTargetUse(e.target.value)}
              placeholder="e.g. Steel trusses, crash mats, safety rigging, concrete flooring"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Comprehensive Campaign Narrative
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Background of current makeshift facility and urgency of the need..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 leading-relaxed"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              External Donation URL (If approved by leadership)
            </label>
            <input
              type="text"
              value={externalDonationUrl}
              onChange={(e) => setExternalDonationUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[11px]"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24]"
              />
              Active on public website
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24]"
              />
              Feature as Homepage Emergency Need
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#D6A84F]/30">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#EBE5D6] text-[#17251F] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#C64B24] text-[#F7F3EA] font-bold hover:bg-[#A83C1A] disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Campaign"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminDeleteDialog
        isOpen={!!deletingCampaign}
        onClose={() => setDeletingCampaign(null)}
        onConfirm={handleDeleteConfirm}
        title={deletingCampaign?.title || "Campaign"}
        itemType="fundraising campaign"
      />
    </div>
  );
}
