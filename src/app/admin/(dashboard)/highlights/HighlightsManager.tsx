"use client";

import React, { useState } from "react";
import { HighlightItem } from "@/types";
import {
  saveHighlightAction,
  deleteHighlightAction,
  toggleHighlightPublishAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  Trophy,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from "lucide-react";
import Image from "next/image";

interface HighlightsManagerProps {
  initialHighlights: HighlightItem[];
}

export function HighlightsManager({ initialHighlights }: HighlightsManagerProps) {
  const [highlights, setHighlights] = useState<HighlightItem[]>(initialHighlights);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<HighlightItem | null>(null);
  const [deletingHighlight, setDeletingHighlight] = useState<HighlightItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form Fields
  const [year, setYear] = useState("2026");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("National Representation");
  const [imageUrl, setImageUrl] = useState("/images/circus_performance_1.png");
  const [isPublished, setIsPublished] = useState(true);
  const [orderIndex, setOrderIndex] = useState(1);

  const publishedCount = highlights.filter((h) => h.isPublished !== false).length;
  const draftCount = highlights.filter((h) => h.isPublished === false).length;

  const filteredHighlights = highlights.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.year.includes(searchQuery);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && h.isPublished !== false) ||
      (filterStatus === "draft" && h.isPublished === false);
    return matchesSearch && matchesStatus;
  });

  function openCreateModal() {
    setEditingHighlight(null);
    setYear(new Date().getFullYear().toString());
    setTitle("");
    setCaption("");
    setCategory("National Representation");
    setImageUrl("/images/circus_performance_1.png");
    setIsPublished(true);
    setOrderIndex(highlights.length + 1);
    setIsFormOpen(true);
  }

  function openEditModal(h: HighlightItem) {
    setEditingHighlight(h);
    setYear(h.year);
    setTitle(h.title);
    setCaption(h.caption);
    setCategory(h.category);
    setImageUrl(h.imageUrl || "/images/circus_performance_1.png");
    setIsPublished(h.isPublished !== false);
    setOrderIndex(h.orderIndex ?? 1);
    setIsFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await saveHighlightAction({
        id: editingHighlight?.id,
        year,
        title,
        caption,
        category,
        imageUrl,
        isPublished,
        orderIndex,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsFormOpen(false);

        if (editingHighlight) {
          setHighlights((prev) =>
            prev.map((item) =>
              item.id === editingHighlight.id
                ? { ...item, year, title, caption, category, imageUrl, isPublished, orderIndex }
                : item
            )
          );
        } else {
          setHighlights((prev) => [
            ...prev,
            {
              id: `highlight-${Date.now()}`,
              year,
              title,
              caption,
              category,
              imageUrl,
              isPublished,
              orderIndex,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save highlight milestone." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingHighlight) return;
    const res = await deleteHighlightAction(deletingHighlight.id, deletingHighlight.title);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setHighlights((prev) => prev.filter((item) => item.id !== deletingHighlight.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleTogglePublish(h: HighlightItem) {
    const res = await toggleHighlightPublishAction(h.id);
    if (res.success) {
      setHighlights((prev) =>
        prev.map((item) =>
          item.id === h.id ? { ...item, isPublished: !item.isPublished } : item
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
        badge="Five-Year Retrospective"
        title="Achievements & Milestones"
        description="Chronicle the organization's growth, international tours, festival awards, and government registrations."
        icon={<Trophy className="w-6 h-6 text-[#C64B24]" />}
        totalCount={highlights.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
        createLabel="Add Milestone"
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
      <div className="bg-[#EBE5D6] p-4 rounded-xl border border-[#D6A84F]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#17251F]/50" />
          <input
            type="text"
            placeholder="Search milestones by title, year, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
          />
        </div>

        <div className="inline-flex rounded-lg border border-[#D6A84F]/40 overflow-hidden bg-[#F7F3EA]">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-2 font-medium ${
              filterStatus === "all" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
            }`}
          >
            All Milestones ({highlights.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("published")}
            className={`px-3 py-2 font-medium ${
              filterStatus === "published" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("draft")}
            className={`px-3 py-2 font-medium ${
              filterStatus === "draft" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>
      </div>

      {/* Highlights List */}
      <div className="space-y-4">
        {filteredHighlights.map((h) => (
          <div
            key={h.id}
            className={`p-5 rounded-2xl bg-[#EBE5D6] border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              h.isPublished === false
                ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                : "border-[#D6A84F]/40 hover:border-[#C64B24]"
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 rounded-xl bg-[#17251F] text-[#D6A84F] border border-[#D6A84F]/30 flex flex-col items-center justify-center shrink-0 shadow-sm font-black text-lg">
                <span>{h.year}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-bold uppercase">
                    {h.category}
                  </span>
                  <AdminStatusBadge status={h.isPublished === false ? "draft" : "published"} />
                </div>
                <h3 className="font-extrabold text-base text-[#17251F] mt-1.5">
                  {h.title}
                </h3>
                <p className="text-xs text-[#17251F]/75 mt-1 leading-relaxed">
                  {h.caption}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D6A84F]/30 w-full sm:w-auto justify-end text-xs">
              <button
                type="button"
                onClick={() => handleTogglePublish(h)}
                className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                title={h.isPublished === false ? "Publish" : "Unpublish"}
              >
                {h.isPublished === false ? (
                  <Eye className="w-4 h-4 text-emerald-700" />
                ) : (
                  <EyeOff className="w-4 h-4 text-[#C64B24]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => openEditModal(h)}
                className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
              </button>
              <button
                type="button"
                onClick={() => setDeletingHighlight(h)}
                className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                title="Delete milestone"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingHighlight ? `Edit Milestone: ${editingHighlight.title}` : "Record Five-Year Milestone"}
        subtitle="Chronicle organization awards, international tours, and institutional milestones"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Year *
              </label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2026"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              >
                <option value="National Representation">National Representation</option>
                <option value="International Touring">International Touring</option>
                <option value="Institutional Growth">Institutional Growth</option>
                <option value="Artistic Excellence">Artistic Excellence</option>
                <option value="Community Impact">Community Impact</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Milestone Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ethiopian National Gymnastics Team Selection"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Descriptive Caption & Context *
            </label>
            <textarea
              required
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Explain the significance, performers involved, and verified impact..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24]"
              />
              Publish immediately on Highlights page
            </label>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#17251F]">Order Rank:</span>
              <input
                type="number"
                min={1}
                value={orderIndex}
                onChange={(e) => setOrderIndex(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-center"
              />
            </div>
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
              {isSubmitting ? "Saving..." : "Save Milestone"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminDeleteDialog
        isOpen={!!deletingHighlight}
        onClose={() => setDeletingHighlight(null)}
        onConfirm={handleDeleteConfirm}
        title={deletingHighlight?.title || "Milestone"}
        itemType="achievement milestone"
      />
    </div>
  );
}
