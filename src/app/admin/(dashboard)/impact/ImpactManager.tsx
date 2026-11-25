"use client";

import React, { useState } from "react";
import { ImpactStory } from "@/data/impact";
import {
  saveImpactStoryAction,
  deleteImpactStoryAction,
  toggleImpactPublishAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  Heart,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Quote,
} from "lucide-react";
import Link from "next/link";

interface ImpactManagerProps {
  initialStories: ImpactStory[];
}

export function ImpactManager({ initialStories }: ImpactManagerProps) {
  const [stories, setStories] = useState<ImpactStory[]>(initialStories);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null);
  const [deletingStory, setDeletingStory] = useState<ImpactStory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Youth Empowerment");
  const [subtitle, setSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("/images/circus_performance_1.png");
  const [summary, setSummary] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [outcomesText, setOutcomesText] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("Tesfahun Mergia, Founder & Director");
  const [isPublished, setIsPublished] = useState(true);
  const [orderIndex, setOrderIndex] = useState(1);

  const publishedCount = stories.filter((s) => s.isPublished !== false).length;
  const draftCount = stories.filter((s) => s.isPublished === false).length;

  const filteredStories = stories.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && s.isPublished !== false) ||
      (filterStatus === "draft" && s.isPublished === false);
    return matchesSearch && matchesStatus;
  });

  function openCreateModal() {
    setEditingStory(null);
    setTitle("");
    setSlug("");
    setCategory("Youth Empowerment");
    setSubtitle("");
    setHeroImage("/images/circus_performance_1.png");
    setSummary("");
    setBodyText("");
    setOutcomesText("");
    setQuoteText("");
    setQuoteAuthor("Tesfahun Mergia, Founder & Director");
    setIsPublished(true);
    setOrderIndex(stories.length + 1);
    setIsFormOpen(true);
  }

  function openEditModal(story: ImpactStory) {
    setEditingStory(story);
    setTitle(story.title);
    setSlug(story.slug);
    setCategory(story.category);
    setSubtitle(story.subtitle);
    setHeroImage(story.heroImage);
    setSummary(story.summary);
    setBodyText((story.body || []).join("\n\n"));
    setOutcomesText((story.keyOutcomes || []).join("\n"));
    setQuoteText(story.quote?.text || "");
    setQuoteAuthor(story.quote?.author || "");
    setIsPublished(story.isPublished !== false);
    setOrderIndex(story.orderIndex ?? 1);
    setIsFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const body = bodyText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const keyOutcomes = outcomesText
      .split("\n")
      .map((o) => o.trim())
      .filter(Boolean);

    try {
      const res = await saveImpactStoryAction({
        id: editingStory?.id,
        slug: slug.trim() || undefined,
        title,
        category,
        subtitle,
        heroImage,
        summary,
        body,
        keyOutcomes,
        quote: quoteText ? { text: quoteText, author: quoteAuthor } : undefined,
        isPublished,
        orderIndex,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsFormOpen(false);

        if (editingStory) {
          setStories((prev) =>
            prev.map((item) =>
              item.id === editingStory.id
                ? {
                    ...item,
                    title,
                    category,
                    subtitle,
                    heroImage,
                    summary,
                    body,
                    keyOutcomes,
                    quote: quoteText ? { text: quoteText, author: quoteAuthor } : undefined,
                    isPublished,
                    orderIndex,
                  }
                : item
            )
          );
        } else {
          setStories((prev) => [
            ...prev,
            {
              id: `story-${Date.now()}`,
              slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
              title,
              category,
              subtitle,
              heroImage,
              summary,
              body,
              keyOutcomes,
              quote: quoteText ? { text: quoteText, author: quoteAuthor } : undefined,
              isPublished,
              orderIndex,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save impact story." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingStory) return;
    const res = await deleteImpactStoryAction(deletingStory.id, deletingStory.title);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setStories((prev) => prev.filter((item) => item.id !== deletingStory.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleTogglePublish(s: ImpactStory) {
    const res = await toggleImpactPublishAction(s.id);
    if (res.success) {
      setStories((prev) =>
        prev.map((item) =>
          item.id === s.id ? { ...item, isPublished: !item.isPublished } : item
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
        badge="Community Evidence"
        title="Impact Stories & Case Studies"
        description="Document authentic life transformation narratives, educational achievements, and community development."
        icon={<Heart className="w-6 h-6 text-[#C64B24]" />}
        totalCount={stories.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
        createLabel="New Case Study"
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

      {/* Filter and Search */}
      <div className="bg-[#EBE5D6] p-4 rounded-xl border border-[#D6A84F]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#17251F]/50" />
          <input
            type="text"
            placeholder="Search stories by title or summary..."
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
            All Stories ({stories.length})
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

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className={`p-5 rounded-2xl bg-[#EBE5D6] border shadow-xs flex flex-col justify-between space-y-4 ${
              story.isPublished === false
                ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                : "border-[#D6A84F]/40 hover:border-[#C64B24]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#17251F] text-[#D6A84F] font-bold uppercase">
                  {story.category}
                </span>
                <AdminStatusBadge status={story.isPublished === false ? "draft" : "published"} />
              </div>

              <h3 className="font-extrabold text-base text-[#17251F] mt-3">
                {story.title}
              </h3>
              <p className="text-xs text-[#B88C35] font-semibold mt-0.5">
                {story.subtitle}
              </p>
              <p className="text-xs text-[#17251F]/75 mt-2 line-clamp-3 leading-relaxed">
                {story.summary}
              </p>

              {story.quote && (
                <div className="mt-3 p-2.5 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/20 text-[11px] text-[#17251F]/80 italic">
                  &ldquo;{story.quote.text.slice(0, 90)}...&rdquo;
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(story)}
                  className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                  title={story.isPublished === false ? "Publish" : "Unpublish"}
                >
                  {story.isPublished === false ? (
                    <Eye className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-[#C64B24]" />
                  )}
                </button>
                <Link
                  href={`/impact/${story.slug}`}
                  target="_blank"
                  className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                  title="View public case study"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(story)}
                  className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingStory(story)}
                  className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                  title="Delete case study"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Form Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingStory ? `Edit Case Study: ${editingStory.title}` : "New Impact Case Study"}
        subtitle="Record transformative stories, educational outcomes, and social metrics"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Case Study Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. From Street Vulnerability to World Circus Stages"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Impact Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              >
                <option value="Youth Empowerment">Youth Empowerment</option>
                <option value="Education First">Education First</option>
                <option value="Girls in Circus">Girls in Circus</option>
                <option value="Livelihood & Touring">Livelihood & Touring</option>
                <option value="Community Cohesion">Community Cohesion</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. 13-Year Longitudinal Trajectory of Arba Minch Trainees"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Hero Image URL
              </label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/images/circus_performance_1.png"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Executive Summary * (Card teaser)
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Concise overview of the community challenge, intervention, and results..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Full Narrative (Separate paragraphs with blank lines)
            </label>
            <textarea
              rows={5}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="In-depth story detailing background, artistic mentoring, scholastic follow-ups, and life milestones..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 leading-relaxed"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Documented Key Outcomes (One per line)
            </label>
            <textarea
              rows={3}
              value={outcomesText}
              onChange={(e) => setOutcomesText(e.target.value)}
              placeholder="e.g.&#10;Over 80 youth provided with daily structured gymnastics training&#10;Zero school dropouts recorded over consecutive academic cycles"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Featured Quote
              </label>
              <input
                type="text"
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="A quote from the performer or instructor..."
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Quote Author
              </label>
              <input
                type="text"
                value={quoteAuthor}
                onChange={(e) => setQuoteAuthor(e.target.value)}
                placeholder="e.g. Tesfahun Mergia, Founder & Director"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24]"
              />
              Publish immediately on public website
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
              {isSubmitting ? "Saving..." : "Save Case Study"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminDeleteDialog
        isOpen={!!deletingStory}
        onClose={() => setDeletingStory(null)}
        onConfirm={handleDeleteConfirm}
        title={deletingStory?.title || "Case Study"}
        itemType="impact case study"
      />
    </div>
  );
}
