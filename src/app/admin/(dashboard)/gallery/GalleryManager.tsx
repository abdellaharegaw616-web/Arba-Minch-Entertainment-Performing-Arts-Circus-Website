"use client";

import React, { useState } from "react";
import { GalleryAsset } from "@/types";
import {
  saveGalleryAssetAction,
  deleteGalleryAssetAction,
  toggleGalleryPublishAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  Camera,
  Video,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

interface GalleryManagerProps {
  initialAssets: GalleryAsset[];
}

export function GalleryManager({ initialAssets }: GalleryManagerProps) {
  const [assets, setAssets] = useState<GalleryAsset[]>(initialAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<GalleryAsset | null>(null);
  const [deletingAsset, setDeletingAsset] = useState<GalleryAsset | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form Fields
  const [assetType, setAssetType] = useState<"image" | "video">("image");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Stage Performance");
  const [mediaUrl, setMediaUrl] = useState("/images/circus_performance_1.png");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [durationSeconds, setDurationSeconds] = useState<number | undefined>(undefined);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [orderIndex, setOrderIndex] = useState(1);

  const publishedCount = assets.filter((a) => a.isPublished !== false).length;
  const draftCount = assets.filter((a) => a.isPublished === false).length;

  const filteredAssets = assets.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.caption && a.caption.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === "all" || a.assetType === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && a.isPublished !== false) ||
      (filterStatus === "draft" && a.isPublished === false);
    return matchesSearch && matchesType && matchesStatus;
  });

  function openCreateModal() {
    setEditingAsset(null);
    setAssetType("image");
    setTitle("");
    setCaption("");
    setCategory("Stage Performance");
    setMediaUrl("/images/circus_performance_1.png");
    setThumbnailUrl("");
    setDurationSeconds(undefined);
    setIsFeatured(false);
    setIsPublished(true);
    setOrderIndex(assets.length + 1);
    setIsFormOpen(true);
  }

  function openEditModal(a: GalleryAsset) {
    setEditingAsset(a);
    setAssetType(a.assetType);
    setTitle(a.title);
    setCaption(a.caption || "");
    setCategory(a.category);
    setMediaUrl(a.mediaUrl);
    setThumbnailUrl(a.thumbnailUrl || "");
    setDurationSeconds(a.durationSeconds);
    setIsFeatured(a.isFeatured);
    setIsPublished(a.isPublished);
    setOrderIndex(a.orderIndex);
    setIsFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await saveGalleryAssetAction({
        id: editingAsset?.id,
        assetType,
        title,
        caption,
        category,
        mediaUrl,
        thumbnailUrl: thumbnailUrl || undefined,
        durationSeconds,
        isFeatured,
        isPublished,
        orderIndex,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsFormOpen(false);

        if (editingAsset) {
          setAssets((prev) =>
            prev.map((item) =>
              item.id === editingAsset.id
                ? {
                    ...item,
                    assetType,
                    title,
                    caption,
                    category,
                    mediaUrl,
                    thumbnailUrl,
                    durationSeconds,
                    isFeatured,
                    isPublished,
                    orderIndex,
                  }
                : item
            )
          );
        } else {
          setAssets((prev) => [
            ...prev,
            {
              id: `gal-${Date.now()}`,
              assetType,
              title,
              caption,
              category,
              mediaUrl,
              thumbnailUrl,
              durationSeconds,
              isFeatured,
              isPublished,
              orderIndex,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save gallery asset." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingAsset) return;
    const res = await deleteGalleryAssetAction(deletingAsset.id, deletingAsset.title);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setAssets((prev) => prev.filter((item) => item.id !== deletingAsset.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleTogglePublish(a: GalleryAsset) {
    const res = await toggleGalleryPublishAction(a.id);
    if (res.success) {
      setAssets((prev) =>
        prev.map((item) =>
          item.id === a.id ? { ...item, isPublished: !item.isPublished } : item
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
        badge="Photography & Video Archive"
        title="Gallery & Video Assets"
        description="Curate high-resolution performance photos, rehearsal footage, and video documentaries."
        icon={<Camera className="w-6 h-6 text-[#C64B24]" />}
        totalCount={assets.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
        createLabel="Add Media Asset"
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
            placeholder="Search media by title or caption..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-[#D6A84F]/40 overflow-hidden bg-[#F7F3EA]">
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-3 py-2 font-medium ${
                filterType === "all" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setFilterType("image")}
              className={`px-3 py-2 font-medium ${
                filterType === "image" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              Photos
            </button>
            <button
              type="button"
              onClick={() => setFilterType("video")}
              className={`px-3 py-2 font-medium ${
                filterType === "video" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              Videos
            </button>
          </div>

          <div className="inline-flex rounded-lg border border-[#D6A84F]/40 overflow-hidden bg-[#F7F3EA]">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-2 font-medium ${
                filterStatus === "all" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("published")}
              className={`px-3 py-2 font-medium ${
                filterStatus === "published" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("draft")}
              className={`px-3 py-2 font-medium ${
                filterStatus === "draft" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className={`rounded-2xl bg-[#EBE5D6] border overflow-hidden shadow-xs flex flex-col justify-between ${
              asset.isPublished === false
                ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                : "border-[#D6A84F]/40 hover:border-[#C64B24]"
            }`}
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative h-44 bg-[#17251F] overflow-hidden">
                {asset.mediaUrl?.startsWith("/") || asset.mediaUrl?.startsWith("http") ? (
                  <Image
                    src={asset.thumbnailUrl || asset.mediaUrl}
                    alt={asset.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    <Camera className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-[#D6A84F] uppercase flex items-center gap-1">
                    {asset.assetType === "video" ? (
                      <Video className="w-3 h-3 text-[#C64B24]" />
                    ) : (
                      <Camera className="w-3 h-3 text-[#D6A84F]" />
                    )}
                    {asset.assetType}
                  </span>
                  {asset.isFeatured && (
                    <span className="px-1.5 py-0.5 rounded bg-[#C64B24] text-[9px] font-bold text-white uppercase flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <AdminStatusBadge status={asset.isPublished ? "published" : "draft"} />
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#C64B24] uppercase">
                  {asset.category}
                </span>
                <h3 className="font-extrabold text-sm text-[#17251F] line-clamp-1">
                  {asset.title}
                </h3>
                {asset.caption && (
                  <p className="text-xs text-[#17251F]/75 line-clamp-2 leading-relaxed">
                    {asset.caption}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-[#D6A84F]/20 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleTogglePublish(asset)}
                className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                title={asset.isPublished === false ? "Publish" : "Unpublish"}
              >
                {asset.isPublished === false ? (
                  <Eye className="w-4 h-4 text-emerald-700" />
                ) : (
                  <EyeOff className="w-4 h-4 text-[#C64B24]" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(asset)}
                  className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingAsset(asset)}
                  className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                  title="Delete asset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Form Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingAsset ? `Edit Asset: ${editingAsset.title}` : "Add Media Asset"}
        subtitle="Upload or link high-resolution performance photography and video streams"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Asset Type *
              </label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value as "image" | "video")}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              >
                <option value="image">Photography / Image</option>
                <option value="video">Video Production</option>
              </select>
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
                <option value="Stage Performance">Stage Performance</option>
                <option value="Artist Portraits">Artist Portraits</option>
                <option value="Grassroots Training">Grassroots Training</option>
                <option value="Festival Showcase">Festival Showcase</option>
                <option value="Community Impact">Community Impact</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Asset Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Troupe African Pride Banquine Launch"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Media URL * (Cloudinary, YouTube, or local /images/)
            </label>
            <input
              type="text"
              required
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="/images/circus_performance_1.png"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Caption & Context
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Context about the performers, location, and acrobatics featured..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Published
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Featured Asset
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#17251F]">Order:</span>
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
              {isSubmitting ? "Saving..." : "Save Asset"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminDeleteDialog
        isOpen={!!deletingAsset}
        onClose={() => setDeletingAsset(null)}
        onConfirm={handleDeleteConfirm}
        title={deletingAsset?.title || "Media Asset"}
        itemType="gallery asset"
      />
    </div>
  );
}
