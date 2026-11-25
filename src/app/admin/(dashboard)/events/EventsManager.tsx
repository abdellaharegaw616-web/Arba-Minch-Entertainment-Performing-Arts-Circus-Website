"use client";

import React, { useState } from "react";
import { EventItem } from "@/types";
import {
  saveEventAction,
  deleteEventAction,
  toggleEventPublishAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  Calendar,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  MapPin,
  Clock,
  Ticket,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface EventsManagerProps {
  initialEvents: EventItem[];
}

export function EventsManager({ initialEvents }: EventsManagerProps) {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTiming, setFilterTiming] = useState<"all" | "upcoming" | "past">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<EventItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("4:00 PM");
  const [location, setLocation] = useState("Arba Minch, South Ethiopia");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("Festival");
  const [description, setDescription] = useState("");
  const [ticketInfo, setTicketInfo] = useState("Open to Public / Free Admission");
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const publishedCount = events.filter((e) => e.isPublished !== false).length;
  const draftCount = events.filter((e) => e.isPublished === false).length;

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTiming =
      filterTiming === "all" ||
      (filterTiming === "upcoming" && e.isUpcoming) ||
      (filterTiming === "past" && !e.isUpcoming);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && e.isPublished !== false) ||
      (filterStatus === "draft" && e.isPublished === false);
    return matchesSearch && matchesTiming && matchesStatus;
  });

  function openCreateModal() {
    setEditingEvent(null);
    setTitle("");
    setSlug("");
    setDate(new Date().toISOString().split("T")[0]);
    setTime("4:00 PM");
    setLocation("Arba Minch, South Ethiopia");
    setVenue("");
    setCategory("Festival");
    setDescription("");
    setTicketInfo("Open to Public / Free Admission");
    setIsUpcoming(true);
    setFeatured(false);
    setIsPublished(true);
    setIsFormOpen(true);
  }

  function openEditModal(e: EventItem) {
    setEditingEvent(e);
    setTitle(e.title);
    setSlug(e.slug);
    setDate(e.date);
    setTime(e.time);
    setLocation(e.location);
    setVenue(e.venue);
    setCategory(e.category);
    setDescription(e.description);
    setTicketInfo(e.ticketInfo);
    setIsUpcoming(e.isUpcoming);
    setFeatured(e.featured ?? false);
    setIsPublished(e.isPublished !== false);
    setIsFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await saveEventAction({
        id: editingEvent?.id,
        slug: slug.trim() || undefined,
        title,
        date,
        time,
        location,
        venue,
        category,
        description,
        ticketInfo,
        isUpcoming,
        featured,
        isPublished,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsFormOpen(false);

        if (editingEvent) {
          setEvents((prev) =>
            prev.map((item) =>
              item.id === editingEvent.id
                ? {
                    ...item,
                    title,
                    date,
                    time,
                    location,
                    venue,
                    category,
                    description,
                    ticketInfo,
                    isUpcoming,
                    featured,
                    isPublished,
                  }
                : item
            )
          );
        } else {
          setEvents((prev) => [
            ...prev,
            {
              id: `event-${Date.now()}`,
              slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
              title,
              date,
              time,
              location,
              venue,
              category,
              description,
              ticketInfo,
              isUpcoming,
              featured,
              isPublished,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save event." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingEvent) return;
    const res = await deleteEventAction(deletingEvent.id, deletingEvent.title);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setEvents((prev) => prev.filter((item) => item.id !== deletingEvent.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleTogglePublish(e: EventItem) {
    const res = await toggleEventPublishAction(e.id);
    if (res.success) {
      setEvents((prev) =>
        prev.map((item) =>
          item.id === e.id ? { ...item, isPublished: !item.isPublished } : item
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
        badge="Performances & Festivals"
        title="Events & Show Schedule"
        description="Schedule regional showcases, festival appearances, and community circus days."
        icon={<Calendar className="w-6 h-6 text-[#C64B24]" />}
        totalCount={events.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
        createLabel="Schedule Event"
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

      {/* Filter Bar */}
      <div className="bg-[#EBE5D6] p-4 rounded-xl border border-[#D6A84F]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#17251F]/50" />
          <input
            type="text"
            placeholder="Search events by title, venue, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-[#D6A84F]/40 overflow-hidden bg-[#F7F3EA]">
            <button
              type="button"
              onClick={() => setFilterTiming("all")}
              className={`px-3 py-2 font-medium ${
                filterTiming === "all" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              All Shows
            </button>
            <button
              type="button"
              onClick={() => setFilterTiming("upcoming")}
              className={`px-3 py-2 font-medium ${
                filterTiming === "upcoming" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setFilterTiming("past")}
              className={`px-3 py-2 font-medium ${
                filterTiming === "past" ? "bg-[#17251F] text-[#D6A84F]" : "text-[#17251F]/70"
              }`}
            >
              Past
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
              All Status
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

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/30 text-[#17251F]/70 space-y-3">
          <Calendar className="w-8 h-8 text-[#D6A84F] mx-auto" />
          <h3 className="font-bold text-base text-[#17251F]">No events found</h3>
          <p className="text-xs max-w-sm mx-auto">
            Schedule a new event to publish it on the public calendar.
          </p>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-4 py-2 rounded-lg bg-[#C64B24] text-[#F7F3EA] text-xs font-bold"
          >
            Schedule Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`p-5 rounded-2xl bg-[#EBE5D6] border shadow-xs flex flex-col justify-between space-y-4 ${
                evt.isPublished === false
                  ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                  : "border-[#D6A84F]/40 hover:border-[#C64B24]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#17251F] text-[#D6A84F] font-bold">
                    {evt.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {evt.isUpcoming ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600/10 text-emerald-700 font-bold">
                        Upcoming
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-bold">
                        Completed
                      </span>
                    )}
                    <AdminStatusBadge
                      status={evt.isPublished === false ? "draft" : "published"}
                    />
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-[#17251F] mt-3">
                  {evt.title}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-[#17251F]/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C64B24]" />
                    <span className="font-semibold">{evt.date}</span> at {evt.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C64B24]" />
                    <span>
                      {evt.venue}, {evt.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span className="text-[11px] text-[#17251F]/70">{evt.ticketInfo}</span>
                  </div>
                </div>

                <p className="text-xs text-[#17251F]/75 mt-3 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(evt)}
                    className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                    title={evt.isPublished === false ? "Publish" : "Unpublish"}
                  >
                    {evt.isPublished === false ? (
                      <Eye className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-[#C64B24]" />
                    )}
                  </button>
                  <Link
                    href={`/events/${evt.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                    title="View public page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(evt)}
                    className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingEvent(evt)}
                    className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Form Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingEvent ? `Edit Event: ${editingEvent.title}` : "Schedule New Event"}
        subtitle="Manage show dates, venues, admission details, and publication"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 2027 Gamo Highlands Cultural Circus Festival"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
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
                <option value="Festival">Festival</option>
                <option value="Community Showcase">Community Showcase</option>
                <option value="National Tour">National Tour</option>
                <option value="International Tour">International Tour</option>
                <option value="Charity Showcase">Charity Showcase</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Time Label
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 4:00 PM - 7:30 PM"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Venue Name *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Arba Minch Paradise Stadium Grounds"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                City / Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Arba Minch, South Ethiopia"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Ticket / Entry Information
            </label>
            <input
              type="text"
              value={ticketInfo}
              onChange={(e) => setTicketInfo(e.target.value)}
              placeholder="e.g. Free Community Entry / VIP Reserved at Gate"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Event Description & Program Details *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the performing troupes appearing, featured stunts, and community context..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={isUpcoming}
                  onChange={(e) => setIsUpcoming(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Upcoming Event
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Published on Site
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Featured
              </label>
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
              {isSubmitting ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Dialog */}
      <AdminDeleteDialog
        isOpen={!!deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDeleteConfirm}
        title={deletingEvent?.title || "Event"}
        itemType="event"
      />
    </div>
  );
}
