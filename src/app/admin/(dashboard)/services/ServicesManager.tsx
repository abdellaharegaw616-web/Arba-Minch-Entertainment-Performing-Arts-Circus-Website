"use client";

import React, { useState } from "react";
import { ServicePackage } from "@/types";
import {
  saveServiceAction,
  deleteServiceAction,
  toggleServicePublishAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  Briefcase,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface ServicesManagerProps {
  initialServices: ServicePackage[];
}

export function ServicesManager({ initialServices }: ServicesManagerProps) {
  const [services, setServices] = useState<ServicePackage[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServicePackage | null>(null);
  const [deletingService, setDeletingService] = useState<ServicePackage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Circus Arts");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/circus_performance_1.png");
  const [isPublished, setIsPublished] = useState(true);
  const [orderIndex, setOrderIndex] = useState(1);

  const categories = Array.from(new Set(services.map((s) => s.category)));
  const publishedCount = services.filter((s) => s.isPublished !== false).length;
  const draftCount = services.filter((s) => s.isPublished === false).length;

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "all" || s.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && s.isPublished !== false) ||
      (filterStatus === "draft" && s.isPublished === false);
    return matchesSearch && matchesCat && matchesStatus;
  });

  function openCreateModal() {
    setEditingService(null);
    setTitle("");
    setSlug("");
    setCategory("Circus Arts");
    setSummary("");
    setDescription("");
    setDetailsText("");
    setImageUrl("/images/circus_performance_1.png");
    setIsPublished(true);
    setOrderIndex(services.length + 1);
    setIsFormOpen(true);
  }

  function openEditModal(service: ServicePackage) {
    setEditingService(service);
    setTitle(service.title);
    setSlug(service.slug);
    setCategory(service.category);
    setSummary(service.summary);
    setDescription(service.description);
    setDetailsText((service.details || []).join("\n"));
    setImageUrl(service.imageUrl || "/images/circus_performance_1.png");
    setIsPublished(service.isPublished !== false);
    setOrderIndex(service.orderIndex ?? 1);
    setIsFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const details = detailsText
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    try {
      const res = await saveServiceAction({
        id: editingService?.id,
        slug: slug.trim() || undefined,
        title,
        category,
        summary,
        description,
        details,
        imageUrl,
        isPublished,
        orderIndex,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsFormOpen(false);

        // Update local state
        if (editingService) {
          setServices((prev) =>
            prev.map((s) =>
              s.id === editingService.id
                ? {
                    ...s,
                    title,
                    category,
                    summary,
                    description,
                    details,
                    imageUrl,
                    isPublished,
                    orderIndex,
                  }
                : s
            )
          );
        } else {
          setServices((prev) => [
            ...prev,
            {
              id: `service-${Date.now()}`,
              slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
              title,
              category,
              summary,
              description,
              details,
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
      setFeedback({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingService) return;
    const res = await deleteServiceAction(deletingService.id, deletingService.title);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setServices((prev) => prev.filter((s) => s.id !== deletingService.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleTogglePublish(service: ServicePackage) {
    const res = await toggleServicePublishAction(service.id);
    if (res.success) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, isPublished: !s.isPublished } : s
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
        badge="Repertoire & Workshops"
        title="Entertainment Packages"
        description="Manage public performance packages, youth workshops, traditional dance fusions, and cultural spectacles."
        icon={<Briefcase className="w-6 h-6 text-[#C64B24]" />}
        totalCount={services.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
        createLabel="Add Package"
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
            placeholder="Search packages by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:ring-1 focus:ring-[#C64B24]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="inline-flex rounded-lg border border-[#D6A84F]/40 overflow-hidden bg-[#F7F3EA]">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-2 font-medium ${
                filterStatus === "all"
                  ? "bg-[#17251F] text-[#D6A84F]"
                  : "text-[#17251F]/70 hover:bg-[#EBE5D6]"
              }`}
            >
              All ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("published")}
              className={`px-3 py-2 font-medium ${
                filterStatus === "published"
                  ? "bg-[#17251F] text-[#D6A84F]"
                  : "text-[#17251F]/70 hover:bg-[#EBE5D6]"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("draft")}
              className={`px-3 py-2 font-medium ${
                filterStatus === "draft"
                  ? "bg-[#17251F] text-[#D6A84F]"
                  : "text-[#17251F]/70 hover:bg-[#EBE5D6]"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/30 text-[#17251F]/70 space-y-3">
          <Briefcase className="w-8 h-8 text-[#D6A84F] mx-auto" />
          <h3 className="font-bold text-base text-[#17251F]">No entertainment packages found</h3>
          <p className="text-xs max-w-sm mx-auto">
            {searchQuery || filterCategory !== "all" || filterStatus !== "all"
              ? "Try adjusting your search criteria or filters."
              : "Create your first package to display on the public website."}
          </p>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-4 py-2 rounded-lg bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A]"
          >
            Add First Package
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`p-5 rounded-2xl bg-[#EBE5D6] border shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                service.isPublished === false
                  ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                  : "border-[#D6A84F]/40 hover:border-[#C64B24]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#17251F] text-[#D6A84F] font-bold uppercase tracking-wider">
                    {service.category}
                  </span>
                  <AdminStatusBadge
                    status={service.isPublished === false ? "draft" : "published"}
                  />
                </div>

                <h3 className="font-extrabold text-base text-[#17251F] mt-3">
                  {service.title}
                </h3>
                <p className="text-xs text-[#17251F]/75 mt-1.5 line-clamp-2 leading-relaxed">
                  {service.summary}
                </p>

                {service.details && service.details.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {service.details.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/20 text-[#17251F]/80 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                    {service.details.length > 3 && (
                      <span className="text-[10px] text-[#17251F]/50 px-1 py-0.5">
                        +{service.details.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(service)}
                    className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA] transition-colors"
                    title={service.isPublished === false ? "Publish to Website" : "Unpublish to Draft"}
                  >
                    {service.isPublished === false ? (
                      <Eye className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-[#C64B24]" />
                    )}
                  </button>
                  <Link
                    href={`/services/${service.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA] transition-colors"
                    title="View public page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(service)}
                    className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingService(service)}
                    className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10 transition-colors"
                    title="Delete package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingService ? `Edit Package: ${editingService.title}` : "Create New Entertainment Package"}
        subtitle="Manage public repertoire, category, and signature performance details"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Package Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Traditional & Contemporary Dance Fusion"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:ring-1 focus:ring-[#C64B24]"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
              >
                <option value="Circus Arts">Circus Arts</option>
                <option value="Dance & Movement">Dance & Movement</option>
                <option value="Giant Puppets & Masking">Giant Puppets & Masking</option>
                <option value="Community & Education">Community & Education</option>
                <option value="Special Events">Special Events</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                URL Slug (Optional, auto-generated if blank)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. dance-fusion"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] font-mono text-[11px] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Image URL (Cloudinary or local /images/)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/circus_performance_1.png"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] text-[11px] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Short Summary * (Displays on cards and teasers)
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="1-2 sentences highlighting this performance package..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Full Repertoire Description * (Displays on dedicated service page)
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Comprehensive details on choreography, technical requirements, troupe makeup, and duration..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Key Features & Acts (One per line)
            </label>
            <textarea
              rows={3}
              value={detailsText}
              onChange={(e) => setDetailsText(e.target.value)}
              placeholder="e.g.&#10;Synchronized 8-performer banquine&#10;Traditional live flute & drum fusion&#10;Chinese pole acrobatic displays"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24] focus:ring-[#C64B24]"
              />
              <label htmlFor="isPublished" className="font-semibold text-[#17251F] cursor-pointer">
                Publish immediately to website
              </label>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <label className="font-semibold text-[#17251F]">Order Rank:</label>
              <input
                type="number"
                min={1}
                value={orderIndex}
                onChange={(e) => setOrderIndex(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] text-center"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#D6A84F]/30">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-[#EBE5D6] text-[#17251F] font-semibold hover:bg-[#DDD6C5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#C64B24] text-[#F7F3EA] font-bold hover:bg-[#A83C1A] flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </>
              ) : (
                "Save Package"
              )}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Dialog */}
      <AdminDeleteDialog
        isOpen={!!deletingService}
        onClose={() => setDeletingService(null)}
        onConfirm={handleDeleteConfirm}
        title={deletingService?.title || "Service Package"}
        itemType="entertainment package"
      />
    </div>
  );
}
