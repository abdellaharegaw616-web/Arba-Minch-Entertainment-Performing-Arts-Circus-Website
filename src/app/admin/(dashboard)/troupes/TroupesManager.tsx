"use client";

import React, { useState } from "react";
import { Troupe, Artist, TroupeMember } from "@/types";
import {
  saveTroupeAction,
  deleteTroupeAction,
  toggleTroupePublishAction,
  saveArtistAction,
  deleteArtistAction,
  assignTroupeMemberAction,
  removeTroupeMemberAction,
} from "@/app/actions";
import { AdminModuleHeader } from "@/components/admin/AdminModuleHeader";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  Users,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
  Sparkles,
  UserPlus,
  Shield,
  CheckCircle2,
  AlertCircle,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TroupesManagerProps {
  initialTroupes: Troupe[];
  initialArtists: Artist[];
  initialMembers: TroupeMember[];
}

export function TroupesManager({
  initialTroupes,
  initialArtists,
  initialMembers,
}: TroupesManagerProps) {
  const [activeTab, setActiveTab] = useState<"troupes" | "artists">("troupes");
  const [troupes, setTroupes] = useState<Troupe[]>(initialTroupes);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [members, setMembers] = useState<TroupeMember[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  // Troupe modal state
  const [isTroupeModalOpen, setIsTroupeModalOpen] = useState(false);
  const [editingTroupe, setEditingTroupe] = useState<Troupe | null>(null);
  const [deletingTroupe, setDeletingTroupe] = useState<Troupe | null>(null);

  // Troupe Form Fields
  const [troupeName, setTroupeName] = useState("");
  const [troupeSlug, setTroupeSlug] = useState("");
  const [troupeSubtitle, setTroupeSubtitle] = useState("");
  const [troupeMembersCount, setTroupeMembersCount] = useState(2);
  const [troupeDesc, setTroupeDesc] = useState("");
  const [troupeActsText, setTroupeActsText] = useState("");
  const [troupeImage, setTroupeImage] = useState("/images/troupe_yoga_brothers.png");
  const [troupeFeatured, setTroupeFeatured] = useState(false);
  const [troupePublished, setTroupePublished] = useState(true);
  const [troupeOrderIndex, setTroupeOrderIndex] = useState(1);

  // Artist modal state
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [deletingArtist, setDeletingArtist] = useState<Artist | null>(null);

  // Artist Form Fields
  const [artistName, setArtistName] = useState("");
  const [artistSlug, setArtistSlug] = useState("");
  const [artistStageName, setArtistStageName] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("/images/troupe_yoga_brothers.png");
  const [artistDisciplinesText, setArtistDisciplinesText] = useState("");
  const [artistIsCoach, setArtistIsCoach] = useState(false);
  const [artistIsActive, setArtistIsActive] = useState(true);

  // Roster Management Modal
  const [rosterTroupe, setRosterTroupe] = useState<Troupe | null>(null);
  const [selectedArtistToAssign, setSelectedArtistToAssign] = useState("");
  const [memberRole, setMemberRole] = useState("Performer");
  const [memberIsLead, setMemberIsLead] = useState(false);

  // General state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const publishedTroupesCount = troupes.filter((t) => t.isPublished !== false).length;
  const draftTroupesCount = troupes.filter((t) => t.isPublished === false).length;

  const filteredTroupes = troupes.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && t.isPublished !== false) ||
      (filterStatus === "draft" && t.isPublished === false);
    return matchesSearch && matchesStatus;
  });

  const filteredArtists = artists.filter((a) => {
    return (
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.stageName && a.stageName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      a.disciplines.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Troupe Handlers
  function openCreateTroupeModal() {
    setEditingTroupe(null);
    setTroupeName("");
    setTroupeSlug("");
    setTroupeSubtitle("");
    setTroupeMembersCount(2);
    setTroupeDesc("");
    setTroupeActsText("");
    setTroupeImage("/images/troupe_yoga_brothers.png");
    setTroupeFeatured(false);
    setTroupePublished(true);
    setTroupeOrderIndex(troupes.length + 1);
    setIsTroupeModalOpen(true);
  }

  function openEditTroupeModal(t: Troupe) {
    setEditingTroupe(t);
    setTroupeName(t.name);
    setTroupeSlug(t.slug);
    setTroupeSubtitle(t.subTitle || "");
    setTroupeMembersCount(t.membersCount);
    setTroupeDesc(t.description);
    setTroupeActsText((t.acts || []).join("\n"));
    setTroupeImage(t.featuredImage || "/images/troupe_yoga_brothers.png");
    setTroupeFeatured(t.featured ?? false);
    setTroupePublished(t.isPublished !== false);
    setTroupeOrderIndex(t.orderIndex ?? 1);
    setIsTroupeModalOpen(true);
  }

  async function handleSaveTroupe(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const acts = troupeActsText
      .split("\n")
      .map((a) => a.trim())
      .filter(Boolean);

    try {
      const res = await saveTroupeAction({
        id: editingTroupe?.id,
        slug: troupeSlug.trim() || undefined,
        name: troupeName,
        subTitle: troupeSubtitle,
        membersCount: troupeMembersCount,
        description: troupeDesc,
        acts,
        featuredImage: troupeImage,
        featured: troupeFeatured,
        isPublished: troupePublished,
        orderIndex: troupeOrderIndex,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsTroupeModalOpen(false);

        if (editingTroupe) {
          setTroupes((prev) =>
            prev.map((t) =>
              t.id === editingTroupe.id
                ? {
                    ...t,
                    name: troupeName,
                    subTitle: troupeSubtitle,
                    membersCount: troupeMembersCount,
                    description: troupeDesc,
                    acts,
                    featuredImage: troupeImage,
                    featured: troupeFeatured,
                    isPublished: troupePublished,
                    orderIndex: troupeOrderIndex,
                  }
                : t
            )
          );
        } else {
          setTroupes((prev) => [
            ...prev,
            {
              id: `troupe-${Date.now()}`,
              slug: troupeSlug || troupeName.toLowerCase().replace(/\s+/g, "-"),
              name: troupeName,
              subTitle: troupeSubtitle,
              membersCount: troupeMembersCount,
              description: troupeDesc,
              acts,
              members: [],
              featuredImage: troupeImage,
              featured: troupeFeatured,
              isPublished: troupePublished,
              orderIndex: troupeOrderIndex,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save troupe." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteTroupeConfirm() {
    if (!deletingTroupe) return;
    const res = await deleteTroupeAction(deletingTroupe.id, deletingTroupe.name);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setTroupes((prev) => prev.filter((t) => t.id !== deletingTroupe.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleToggleTroupePublish(t: Troupe) {
    const res = await toggleTroupePublishAction(t.id);
    if (res.success) {
      setTroupes((prev) =>
        prev.map((item) =>
          item.id === t.id ? { ...item, isPublished: !item.isPublished } : item
        )
      );
      setFeedback({ type: "success", message: res.message });
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  // Artist Handlers
  function openCreateArtistModal() {
    setEditingArtist(null);
    setArtistName("");
    setArtistSlug("");
    setArtistStageName("");
    setArtistBio("");
    setArtistPhoto("/images/troupe_yoga_brothers.png");
    setArtistDisciplinesText("");
    setArtistIsCoach(false);
    setArtistIsActive(true);
    setIsArtistModalOpen(true);
  }

  function openEditArtistModal(a: Artist) {
    setEditingArtist(a);
    setArtistName(a.fullName);
    setArtistSlug(a.slug);
    setArtistStageName(a.stageName || "");
    setArtistBio(a.bio || "");
    setArtistPhoto(a.photoUrl || "/images/troupe_yoga_brothers.png");
    setArtistDisciplinesText((a.disciplines || []).join("\n"));
    setArtistIsCoach(a.isCoach);
    setArtistIsActive(a.isActive);
    setIsArtistModalOpen(true);
  }

  async function handleSaveArtist(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const disciplines = artistDisciplinesText
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    try {
      const res = await saveArtistAction({
        id: editingArtist?.id,
        slug: artistSlug.trim() || undefined,
        fullName: artistName,
        stageName: artistStageName || undefined,
        bio: artistBio,
        photoUrl: artistPhoto,
        disciplines,
        isCoach: artistIsCoach,
        isActive: artistIsActive,
      });

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setIsArtistModalOpen(false);

        if (editingArtist) {
          setArtists((prev) =>
            prev.map((a) =>
              a.id === editingArtist.id
                ? {
                    ...a,
                    fullName: artistName,
                    stageName: artistStageName,
                    bio: artistBio,
                    photoUrl: artistPhoto,
                    disciplines,
                    isCoach: artistIsCoach,
                    isActive: artistIsActive,
                  }
                : a
            )
          );
        } else {
          setArtists((prev) => [
            ...prev,
            {
              id: `artist-${Date.now()}`,
              slug: artistSlug || artistName.toLowerCase().replace(/\s+/g, "-"),
              fullName: artistName,
              stageName: artistStageName,
              bio: artistBio,
              photoUrl: artistPhoto,
              disciplines,
              isCoach: artistIsCoach,
              isActive: artistIsActive,
            },
          ]);
        }
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to save artist." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteArtistConfirm() {
    if (!deletingArtist) return;
    const res = await deleteArtistAction(deletingArtist.id, deletingArtist.fullName);
    if (res.success) {
      setFeedback({ type: "success", message: res.message });
      setArtists((prev) => prev.filter((a) => a.id !== deletingArtist.id));
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  // Roster Management
  function openRosterModal(troupe: Troupe) {
    setRosterTroupe(troupe);
    setSelectedArtistToAssign(artists[0]?.id || "");
    setMemberRole("Performer");
    setMemberIsLead(false);
  }

  async function handleAssignMember(e: React.FormEvent) {
    e.preventDefault();
    if (!rosterTroupe || !selectedArtistToAssign) return;
    setIsSubmitting(true);
    const res = await assignTroupeMemberAction(
      rosterTroupe.id,
      selectedArtistToAssign,
      memberRole,
      memberIsLead
    );
    setIsSubmitting(false);

    if (res.success) {
      const assignedArtist = artists.find((a) => a.id === selectedArtistToAssign);
      const newMemberItem: TroupeMember = {
        id: `tm-${Date.now()}`,
        troupeId: rosterTroupe.id,
        artistId: selectedArtistToAssign,
        artistName: assignedArtist?.fullName,
        artistPhoto: assignedArtist?.photoUrl,
        roleInTroupe: memberRole,
        isLead: memberIsLead,
        orderIndex: members.length + 1,
      };
      setMembers((prev) => [
        ...prev.filter(
          (m) =>
            !(m.troupeId === rosterTroupe.id && m.artistId === selectedArtistToAssign)
        ),
        newMemberItem,
      ]);
      setFeedback({ type: "success", message: res.message });
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  async function handleRemoveMember(troupeId: string, artistId: string) {
    const res = await removeTroupeMemberAction(troupeId, artistId);
    if (res.success) {
      setMembers((prev) =>
        prev.filter((m) => !(m.troupeId === troupeId && m.artistId === artistId))
      );
      setFeedback({ type: "success", message: res.message });
    } else {
      setFeedback({ type: "error", message: res.message });
    }
  }

  const currentTroupeMembers = rosterTroupe
    ? members.filter(
        (m) => m.troupeId === rosterTroupe.id || m.troupeId === rosterTroupe.slug
      )
    : [];

  return (
    <div className="space-y-6">
      <AdminModuleHeader
        badge="Ensemble Roster"
        title="Troupes & Ensemble Performers"
        description="Manage the 5 specialized performing arts troupes and registered circus artists."
        icon={<Users className="w-6 h-6 text-[#C64B24]" />}
        totalCount={troupes.length}
        publishedCount={publishedTroupesCount}
        draftCount={draftTroupesCount}
        createLabel={activeTab === "troupes" ? "Add Troupe" : "Add Artist"}
        onCreate={activeTab === "troupes" ? openCreateTroupeModal : openCreateArtistModal}
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
          onClick={() => setActiveTab("troupes")}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === "troupes"
              ? "border-[#C64B24] text-[#C64B24]"
              : "border-transparent text-[#17251F]/60 hover:text-[#17251F]"
          }`}
        >
          <Users className="w-4 h-4" /> Performing Troupes ({troupes.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("artists")}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === "artists"
              ? "border-[#C64B24] text-[#C64B24]"
              : "border-transparent text-[#17251F]/60 hover:text-[#17251F]"
          }`}
        >
          <Award className="w-4 h-4" /> Individual Artists & Coaches ({artists.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#EBE5D6] p-4 rounded-xl border border-[#D6A84F]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#17251F]/50" />
          <input
            type="text"
            placeholder={
              activeTab === "troupes"
                ? "Search troupes by name or act..."
                : "Search artists by name, discipline, or stage name..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:ring-1 focus:ring-[#C64B24]"
          />
        </div>

        {activeTab === "troupes" && (
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
              All ({troupes.length})
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
              Published ({publishedTroupesCount})
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
              Drafts ({draftTroupesCount})
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: TROUPES LIST */}
      {activeTab === "troupes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTroupes.map((troupe) => (
            <div
              key={troupe.id}
              className={`p-5 rounded-2xl bg-[#EBE5D6] border shadow-xs flex flex-col justify-between space-y-4 ${
                troupe.isPublished === false
                  ? "border-[#C64B24]/40 bg-[#EBE5D6]/70"
                  : "border-[#D6A84F]/40 hover:border-[#C64B24]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#17251F] text-[#D6A84F] font-bold">
                    {troupe.membersCount} {troupe.membersCount === 1 ? "Solo Artist" : "Artists"}
                  </span>
                  <AdminStatusBadge
                    status={troupe.isPublished === false ? "draft" : "published"}
                  />
                </div>

                {/* Circular Portrait Preview */}
                <div className="my-4 flex justify-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D6A84F] shadow-md bg-[#17251F]">
                    <Image
                      src={troupe.featuredImage || "/images/circus_performance_1.png"}
                      alt={troupe.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-extrabold text-lg text-[#17251F]">
                    {troupe.name}
                  </h3>
                  {troupe.subTitle && (
                    <p className="text-xs font-semibold text-[#B88C35] mt-0.5">
                      {troupe.subTitle}
                    </p>
                  )}
                  <p className="text-xs text-[#17251F]/75 mt-2 line-clamp-2 leading-relaxed">
                    {troupe.description}
                  </p>
                </div>

                {troupe.acts && troupe.acts.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {troupe.acts.slice(0, 3).map((act) => (
                      <span
                        key={act}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/20 text-[#17251F]/80"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleTroupePublish(troupe)}
                    className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                    title={troupe.isPublished === false ? "Publish" : "Unpublish"}
                  >
                    {troupe.isPublished === false ? (
                      <Eye className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-[#C64B24]" />
                    )}
                  </button>
                  <Link
                    href={`/troupes/${troupe.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-md text-[#17251F]/70 hover:text-[#17251F] hover:bg-[#F7F3EA]"
                    title="View public profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openRosterModal(troupe)}
                    className="px-2.5 py-1.5 rounded-md bg-[#23382F] text-[#D6A84F] font-semibold text-[11px] hover:bg-[#17251F] transition-colors"
                  >
                    Roster
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditTroupeModal(troupe)}
                    className="px-2.5 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-[11px] hover:bg-[#23382F] transition-colors flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingTroupe(troupe)}
                    className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                    title="Delete troupe"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ARTISTS LIST */}
      {activeTab === "artists" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D6A84F] shrink-0 bg-[#17251F]">
                    <Image
                      src={artist.photoUrl || "/images/troupe_yoga_brothers.png"}
                      alt={artist.fullName}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#17251F]">
                      {artist.fullName}
                    </h3>
                    {artist.stageName && (
                      <p className="text-[11px] font-semibold text-[#C64B24]">
                        &ldquo;{artist.stageName}&rdquo;
                      </p>
                    )}
                    {artist.isCoach && (
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-[#17251F] text-[#D6A84F] font-bold">
                        Coach & Instructor
                      </span>
                    )}
                  </div>
                </div>

                {artist.bio && (
                  <p className="text-xs text-[#17251F]/75 mt-3 line-clamp-2 leading-relaxed">
                    {artist.bio}
                  </p>
                )}

                {artist.disciplines && artist.disciplines.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {artist.disciplines.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/20 text-[#17251F]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#D6A84F]/30 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#17251F]/60">
                  {artist.isActive ? "Active Artist" : "Inactive"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditArtistModal(artist)}
                    className="px-3 py-1.5 rounded-md bg-[#17251F] text-[#F7F3EA] font-semibold text-xs hover:bg-[#23382F] flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3 text-[#D6A84F]" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingArtist(artist)}
                    className="p-1.5 rounded-md text-red-700 hover:bg-red-500/10"
                    title="Delete artist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Troupe Form Modal */}
      <AdminModal
        isOpen={isTroupeModalOpen}
        onClose={() => setIsTroupeModalOpen(false)}
        title={editingTroupe ? `Edit Troupe: ${editingTroupe.name}` : "Create Performing Troupe"}
        subtitle="Manage troupe name, subtitle, signature repertoire acts, and circular portrait image"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveTroupe} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Troupe Name *
              </label>
              <input
                type="text"
                required
                value={troupeName}
                onChange={(e) => setTroupeName(e.target.value)}
                placeholder="e.g. Arba Minch Yoga Brothers"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                value={troupeSubtitle}
                onChange={(e) => setTroupeSubtitle(e.target.value)}
                placeholder="e.g. Extreme Contortion & Hyper-Flexibility Duo"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Members Count *
              </label>
              <input
                type="number"
                min={1}
                required
                value={troupeMembersCount}
                onChange={(e) => setTroupeMembersCount(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Featured Circular Portrait Path
              </label>
              <input
                type="text"
                value={troupeImage}
                onChange={(e) => setTroupeImage(e.target.value)}
                placeholder="/images/troupe_yoga_brothers.png"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Troupe Biography & Background *
            </label>
            <textarea
              required
              rows={4}
              value={troupeDesc}
              onChange={(e) => setTroupeDesc(e.target.value)}
              placeholder="Background of the ensemble, years of training in Arba Minch, and performance style..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Signature Acts (One per line)
            </label>
            <textarea
              rows={3}
              value={troupeActsText}
              onChange={(e) => setTroupeActsText(e.target.value)}
              placeholder="e.g.&#10;Extreme Front & Back Bending&#10;Joint Dislocation&#10;Synchronized Duo Contortion"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none font-mono text-[11px]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={troupePublished}
                  onChange={(e) => setTroupePublished(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Published on site
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={troupeFeatured}
                  onChange={(e) => setTroupeFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Feature on Homepage
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#17251F]">Order Rank:</span>
              <input
                type="number"
                min={1}
                value={troupeOrderIndex}
                onChange={(e) => setTroupeOrderIndex(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-center"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#D6A84F]/30">
            <button
              type="button"
              onClick={() => setIsTroupeModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#EBE5D6] text-[#17251F] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#C64B24] text-[#F7F3EA] font-bold hover:bg-[#A83C1A] disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Troupe"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Artist Form Modal */}
      <AdminModal
        isOpen={isArtistModalOpen}
        onClose={() => setIsArtistModalOpen(false)}
        title={editingArtist ? `Edit Artist: ${editingArtist.fullName}` : "Add Circus Artist"}
        subtitle="Manage artist profile, disciplines, coaching credentials, and photo"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSaveArtist} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="e.g. Samuel Filto"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-[#17251F] block mb-1">
                Stage / Nickname
              </label>
              <input
                type="text"
                value={artistStageName}
                onChange={(e) => setArtistStageName(e.target.value)}
                placeholder="e.g. Yoga Brother Samuel"
                className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Photo URL
            </label>
            <input
              type="text"
              value={artistPhoto}
              onChange={(e) => setArtistPhoto(e.target.value)}
              placeholder="/images/troupe_yoga_brothers.png"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Short Biography
            </label>
            <textarea
              rows={3}
              value={artistBio}
              onChange={(e) => setArtistBio(e.target.value)}
              placeholder="Artist background, training achievements, and international experience..."
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#17251F] block mb-1">
              Performance Disciplines (One per line)
            </label>
            <textarea
              rows={3}
              value={artistDisciplinesText}
              onChange={(e) => setArtistDisciplinesText(e.target.value)}
              placeholder="e.g.&#10;Extreme Contortion&#10;Joint Dislocation&#10;Human Pyramid Base"
              className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none font-mono text-[11px]"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
              <input
                type="checkbox"
                checked={artistIsCoach}
                onChange={(e) => setArtistIsCoach(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24]"
              />
              Coach / Trainer
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
              <input
                type="checkbox"
                checked={artistIsActive}
                onChange={(e) => setArtistIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-[#C64B24]"
              />
              Active Performer
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#D6A84F]/30">
            <button
              type="button"
              onClick={() => setIsArtistModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#EBE5D6] text-[#17251F] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#C64B24] text-[#F7F3EA] font-bold hover:bg-[#A83C1A]"
            >
              {isSubmitting ? "Saving..." : "Save Artist"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Roster Management Modal */}
      <AdminModal
        isOpen={!!rosterTroupe}
        onClose={() => setRosterTroupe(null)}
        title={rosterTroupe ? `Ensemble Roster: ${rosterTroupe.name}` : "Manage Roster"}
        subtitle="Assign registered artists to this performing ensemble"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6 text-xs">
          {/* Currently Assigned Members */}
          <div>
            <h4 className="font-extrabold text-sm text-[#17251F] mb-3">
              Currently Assigned Artists ({currentTroupeMembers.length})
            </h4>
            {currentTroupeMembers.length === 0 ? (
              <p className="text-xs text-[#17251F]/60 italic p-3 rounded-lg bg-[#EBE5D6]">
                No artists currently assigned. Use the form below to assign artists.
              </p>
            ) : (
              <div className="space-y-2">
                {currentTroupeMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/30 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D6A84F] bg-[#17251F]">
                        <Image
                          src={m.artistPhoto || "/images/troupe_yoga_brothers.png"}
                          alt={m.artistName || "Artist"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#17251F]">
                          {m.artistName || "Ensemble Performer"}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                          <span className="text-[#C64B24] font-semibold">
                            Role: {m.roleInTroupe}
                          </span>
                          {m.isLead && (
                            <span className="px-1.5 py-0.2 rounded bg-[#17251F] text-[#D6A84F] font-bold">
                              Troupe Lead
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(m.troupeId, m.artistId)}
                      className="text-xs text-red-700 hover:text-red-900 font-semibold px-2 py-1 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assign New Member Form */}
          <form
            onSubmit={handleAssignMember}
            className="p-4 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 space-y-3"
          >
            <h5 className="font-bold text-xs text-[#17251F] flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-[#C64B24]" />
              Assign Artist to Troupe
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold block mb-1">Select Artist:</label>
                <select
                  value={selectedArtistToAssign}
                  onChange={(e) => setSelectedArtistToAssign(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
                >
                  {artists.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.fullName} {a.stageName ? `("${a.stageName}")` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Role in Troupe:</label>
                <input
                  type="text"
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                  placeholder="e.g. Duo Lead, Flyer, Base"
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17251F]">
                <input
                  type="checkbox"
                  checked={memberIsLead}
                  onChange={(e) => setMemberIsLead(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C64B24]"
                />
                Troupe Section Lead
              </label>
              <button
                type="submit"
                disabled={isSubmitting || !selectedArtistToAssign}
                className="px-4 py-2 rounded-lg bg-[#17251F] text-[#F7F3EA] font-bold hover:bg-[#23382F] disabled:opacity-50"
              >
                Assign Artist
              </button>
            </div>
          </form>
        </div>
      </AdminModal>

      {/* Delete Troupe Dialog */}
      <AdminDeleteDialog
        isOpen={!!deletingTroupe}
        onClose={() => setDeletingTroupe(null)}
        onConfirm={handleDeleteTroupeConfirm}
        title={deletingTroupe?.name || "Troupe"}
        itemType="performing troupe"
      />

      {/* Delete Artist Dialog */}
      <AdminDeleteDialog
        isOpen={!!deletingArtist}
        onClose={() => setDeletingArtist(null)}
        onConfirm={handleDeleteArtistConfirm}
        title={deletingArtist?.fullName || "Artist"}
        itemType="circus artist"
        warningNotice="Cannot be undone. Deletion is automatically prevented if this artist is actively assigned to any performing troupe roster."
      />
    </div>
  );
}
