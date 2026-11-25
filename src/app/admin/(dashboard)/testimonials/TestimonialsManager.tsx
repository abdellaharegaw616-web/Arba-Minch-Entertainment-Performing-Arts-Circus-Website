"use client";

import React, { useState } from "react";
import { TestimonialItem } from "@/types";
import {
  saveTestimonialAction,
  deleteTestimonialAction,
  toggleTestimonialApprovalAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  MessageSquare,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Calendar,
} from "lucide-react";

interface TestimonialsManagerProps {
  initialTestimonials: TestimonialItem[];
}

export function TestimonialsManager({ initialTestimonials }: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState<TestimonialItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form Fields
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [year, setYear] = useState("2026");
  const [quote, setQuote] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [orderIndex, setOrderIndex] = useState(1);

  const approvedCount = testimonials.filter((t) => t.isApproved !== false).length;
  const pendingCount = testimonials.filter((t) => t.isApproved === false).length;

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch =
      t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.organization && t.organization.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "approved" && t.isApproved !== false) ||
      (filterStatus === "pending" && t.isApproved === false);
    return matchesSearch && matchesStatus;
  });

  function openCreateModal() {
    setEditingTestimonial(null);
    setAuthor("");
    setRole("");
    setOrganization("");
    setYear(new Date().getFullYear().toString());
    setQuote("");
    setIsApproved(true);
    setOrderIndex(testimonials.length + 1);
    setIsFormOpen(true);
  }

  function openEditModal(t: TestimonialItem) {
    setEditingTestimonial(t);
    setAuthor(t.author);
    setRole(t.role);
    setOrganization(t.organization || "");
    setYear(t.year || "2026");
    setQuote(t.quote);
    setIsApproved(t.isApproved !== false);
    setOrderIndex(t.orderIndex ?? 1);
    setIsFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await saveTestimonialAction({
        id: editingTestimonial?.id,
        author,
        role,
        organization: organization || undefined,
        year,
        quote,
        isApproved,
        orderIndex,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsFormOpen(false);

        if (editingTestimonial) {
          setTestimonials((prev) =>
            prev.map((item) =>
              item.id === editingTestimonial.id
                ? { ...item, author, role, organization, year, quote, isApproved, orderIndex }
                : item
            )
          );
        } else {
          setTestimonials((prev) => [
            ...prev,
            {
              id: `testimonial-${Date.now()}`,
              author,
              role,
              organization,
              year,
              quote,
              isApproved,
              orderIndex,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save testimonial." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingTestimonial) return;
    const res = await deleteTestimonialAction(deletingTestimonial.id, deletingTestimonial.author);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setTestimonials((prev) => prev.filter((item) => item.id !== deletingTestimonial.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleToggleApproval(t: TestimonialItem) {
    const nextApproved = !t.isApproved;
    const res = await toggleTestimonialApprovalAction(t.id, nextApproved);
    if (res.success) {
      setTestimonials((prev) =>
        prev.map((item) =>
          item.id === t.id ? { ...item, isApproved: nextApproved } : item
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
        badge="Stakeholder Reflections"
        title="Testimonials & Endorsements"
        description="Review, verify, approve, and curate feedback from cultural directors, festival organizers, and community elders."
        icon={<MessageSquare className="w-6 h-6 text-[#C64B24]" />}
        totalCount={testimonials.length}
        publishedCount={approvedCount}
        draftCount={pendingCount}
        createLabel="Add Testimonial"
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
            placeholder="Search by author, quote, or organization..."
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
            All ({testimonials.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("approved")}
            className={`px-3 py-2 font-medium ${
              filterStatus === "approved" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("pending")}
            className={`px-3 py-2 font-medium ${
              filterStatus === "pending" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
            }`}
          >
            Pending Review ({pendingCount})
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className={`p-5 rounded-2xl bg-[#EBE5D6] border shadow-xs flex flex-col justify-between space-y-4 ${
              t.isApproved === false
                ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                : "border-[#D6A84F]/40 hover:border-[#C64B24]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <AdminStatusBadge status={t.isApproved === false ? "pending" : "approved"} />
                <span className="text-[11px] text-[#17251F]/60 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {t.year || "2026"}
                </span>
              </div>

              <blockquote className="text-xs text-[#17251F]/85 italic leading-relaxed mt-3">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-4 pt-3 border-t border-[#D6A84F]/30">
                <h4 className="font-extrabold text-sm text-[#17251F]">
                  {t.author}
                </h4>
                <p className="text-xs text-[#C64B24] font-medium">
                  {t.role}
                </p>
                {t.organization && (
                  <p className="text-[11px] text-[#17251F]/65 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" /> {t.organization}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleToggleApproval(t)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                  t.isApproved
                    ? "bg-[#C64B24]/10 text-[#C64B24] hover:bg-[#C64B24]/20"
                    : "bg-emerald-600/10 text-emerald-800 hover:bg-emerald-600/20"
                }`}
              >
                {t.isApproved ? "Revoke Approval" : "Approve for Public"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(t)}
                  className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingTestimonial(t)}
                  className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Form Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingTestimonial ? `Edit Testimonial: ${editingTestimonial.author}` : "Add Approved Testimonial"}
        subtitle="Record authentic reflections and partner statements"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Author Full Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Dr. Almaz Bekele"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Role / Title *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Director of Cultural Programs"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Organization / Institution
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. South Ethiopia Tourism Bureau"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Endorsement Quote *
            </label>
            <textarea
              required
              rows={4}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Direct approved quotation from the partner or client..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
              <input
                type="checkbox"
                checked={isApproved}
                onChange={(e) => setIsApproved(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24]"
              />
              Approved for public display on website
            </label>
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
              {isSubmitting ? "Saving..." : "Save Testimonial"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminDeleteDialog
        isOpen={!!deletingTestimonial}
        onClose={() => setDeletingTestimonial(null)}
        onConfirm={handleDeleteConfirm}
        title={`Testimonial from ${deletingTestimonial?.author}`}
        itemType="testimonial"
      />
    </div>
  );
}
