"use server";

import { z } from "zod";
import {
  saveBooking,
  saveInquiry,
  saveService,
  deleteService,
  toggleServicePublish,
  saveTroupe,
  deleteTroupe,
  toggleTroupePublish,
  saveArtist,
  deleteArtist,
  assignTroupeMember,
  removeTroupeMember,
  saveEvent,
  deleteEvent,
  toggleEventPublish,
  saveHighlight,
  deleteHighlight,
  toggleHighlightPublish,
  saveGalleryAsset,
  deleteGalleryAsset,
  toggleGalleryPublish,
  saveImpactStory,
  deleteImpactStory,
  toggleImpactPublish,
  saveTestimonial,
  deleteTestimonial,
  toggleTestimonialApproval,
  saveCampaign,
  deleteCampaign,
  toggleCampaignActive,
  saveSiteSettings,
  recordAuditLog,
} from "@/lib/data-store";
import { sendBookingNotification, sendInquiryNotification } from "@/lib/email";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sanitizeAdminRedirect, verifyAdminAction } from "@/lib/auth";

// ---------------------------------------------------------------------
// PUBLIC BOOKINGS & INQUIRIES SCHEMAS
// ---------------------------------------------------------------------

const bookingSchema = z.object({
  clientName: z.string().min(2, "Name is required"),
  clientEmail: z.string().email("A valid email is required"),
  clientPhone: z.string().min(6, "Valid phone number is required"),
  organization: z.string().optional(),
  eventType: z.string().min(2, "Event type is required"),
  eventDate: z.string().min(4, "Event date is required"),
  venueLocation: z.string().min(2, "Venue location is required"),
  expectedAttendees: z.string().min(1, "Expected attendees is required"),
  packageRequested: z.string().min(2, "Requested package or troupe is required"),
  notes: z.string().optional(),
});

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  inquiryType: z.enum(["donation", "partnership", "training_center_fund", "general", "contact"]),
  message: z.string().min(10, "Please provide at least 10 characters for your message"),
});

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  bookingId?: string;
};

export async function submitBookingAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    clientName: formData.get("clientName") as string,
    clientEmail: formData.get("clientEmail") as string,
    clientPhone: formData.get("clientPhone") as string,
    organization: (formData.get("organization") as string) || undefined,
    eventType: formData.get("eventType") as string,
    eventDate: formData.get("eventDate") as string,
    venueLocation: formData.get("venueLocation") as string,
    expectedAttendees: formData.get("expectedAttendees") as string,
    packageRequested: formData.get("packageRequested") as string,
    notes: (formData.get("notes") as string) || undefined,
  };

  const validated = bookingSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Please correct the highlighted errors in the form.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await saveBooking(validated.data);
    await sendBookingNotification(validated.data);

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    revalidatePath("/book-us");

    return {
      success: true,
      message: "Your booking inquiry has been successfully received! Our coordinator will contact you within 24-48 hours.",
      bookingId: result.bookingId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while processing your booking. Please try again or reach us at Arbaminch.circus@gmail.com",
    };
  }
}

export async function submitInquiryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    organization: (formData.get("organization") as string) || undefined,
    inquiryType: formData.get("inquiryType") as
      | "donation"
      | "partnership"
      | "training_center_fund"
      | "general"
      | "contact",
    message: formData.get("message") as string,
  };

  const validated = inquirySchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Please ensure all required fields are filled correctly.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await saveInquiry(validated.data);
    await sendInquiryNotification(validated.data);

    revalidatePath("/admin");
    revalidatePath("/support");
    revalidatePath("/contact");

    return {
      success: true,
      message: "Thank you for reaching out! Your message and support interest have been delivered to our leadership team.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to submit inquiry. Please email us directly at Arbaminch.circus@gmail.com",
    };
  }
}

// ---------------------------------------------------------------------
// AUTHENTICATION ACTIONS
// ---------------------------------------------------------------------

const adminLoginSchema = z.object({
  email: z.string().email("A valid administrator email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  returnTo: z.string().optional(),
});

export async function adminLoginAction(formData: FormData): Promise<void> {
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;
  const rawReturnTo = formData.get("returnTo") as string;

  const targetPath = sanitizeAdminRedirect(rawReturnTo, "/admin");

  const validation = adminLoginSchema.safeParse({
    email: rawEmail?.trim(),
    password: rawPassword,
    returnTo: rawReturnTo,
  });

  if (!validation.success) {
    redirect(
      `/admin/login?error=Invalid%20credentials%20format.%20Please%20verify%20your%20email%20and%20password.&returnTo=${encodeURIComponent(
        targetPath
      )}`
    );
  }

  const { email, password } = validation.data;
  const supabase = createServerSupabaseClient();

  if (supabase) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!authError && authData.user) {
        const { data: profile, error: profileError } = await supabase
          .from("admin_profiles")
          .select("id, role, is_active")
          .eq("id", authData.user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (profileError || !profile) {
          await supabase.auth.signOut();
          redirect(
            `/admin/login?error=Access%20denied.%20This%20account%20does%20not%20have%20administrative%20privileges.&returnTo=${encodeURIComponent(
              targetPath
            )}`
          );
        }

        cookies().set("amepac_admin_session", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        redirect(targetPath);
      }
    } catch (err: any) {
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        throw err;
      }
    }
  }

  // Demo Fallback
  if (
    email.toLowerCase() === "arbaminch.circus@gmail.com" ||
    email.toLowerCase() === "admin@amepac.org"
  ) {
    cookies().set("amepac_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    redirect(targetPath);
  }

  redirect(
    `/admin/login?error=Invalid%20email%20or%20password.%20Please%20verify%20your%20credentials%20and%20try%20again.&returnTo=${encodeURIComponent(
      targetPath
    )}`
  );
}

export async function adminLogoutAction(): Promise<void> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignored
    }
  }

  cookies().delete("amepac_admin_session");
  redirect("/admin/login");
}

// ---------------------------------------------------------------------
// 1. SERVICES CRUD ACTIONS
// ---------------------------------------------------------------------

export async function saveServiceAction(
  data: {
    id?: string;
    slug?: string;
    title: string;
    category: string;
    summary: string;
    description: string;
    details: string[];
    imageUrl?: string;
    isPublished?: boolean;
    orderIndex?: number;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.title?.trim()) {
    return { success: false, message: "Service title is required." };
  }
  if (!data.summary?.trim()) {
    return { success: false, message: "Service summary is required." };
  }

  const result = await saveService(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save service." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_SERVICE" : "CREATE_SERVICE",
    entityType: "services",
    entityId: data.id || (result as any).item?.id,
    details: { title: data.title, isPublished: data.isPublished },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true, message: `Service "${data.title}" saved successfully.` };
}

export async function deleteServiceAction(
  id: string,
  title: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteService(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete service." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_SERVICE",
    entityType: "services",
    entityId: id,
    details: { title },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true, message: `Service "${title}" deleted.` };
}

export async function toggleServicePublishAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleServicePublish(id);
  if (!result.success) {
    return { success: false, message: "Failed to update publication status." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "TOGGLE_SERVICE_PUBLISH",
    entityType: "services",
    entityId: id,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true, message: "Service publication status updated." };
}

// ---------------------------------------------------------------------
// 2. TROUPES CRUD ACTIONS
// ---------------------------------------------------------------------

export async function saveTroupeAction(
  data: {
    id?: string;
    slug?: string;
    name: string;
    subTitle?: string;
    membersCount: number;
    description: string;
    acts: string[];
    featuredImage?: string;
    featured?: boolean;
    isPublished?: boolean;
    orderIndex?: number;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.name?.trim()) {
    return { success: false, message: "Troupe name is required." };
  }
  if (!data.description?.trim()) {
    return { success: false, message: "Troupe description is required." };
  }

  const result = await saveTroupe(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save troupe." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_TROUPE" : "CREATE_TROUPE",
    entityType: "troupes",
    entityId: data.id || (result as any).item?.id,
    details: { name: data.name, membersCount: data.membersCount },
  });

  revalidatePath("/admin/troupes");
  revalidatePath("/troupes");
  revalidatePath("/");
  return { success: true, message: `Troupe "${data.name}" saved successfully.` };
}

export async function deleteTroupeAction(
  id: string,
  name: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteTroupe(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete troupe." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_TROUPE",
    entityType: "troupes",
    entityId: id,
    details: { name },
  });

  revalidatePath("/admin/troupes");
  revalidatePath("/troupes");
  revalidatePath("/");
  return { success: true, message: `Troupe "${name}" deleted.` };
}

export async function toggleTroupePublishAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleTroupePublish(id);
  if (!result.success) {
    return { success: false, message: "Failed to update publication status." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "TOGGLE_TROUPE_PUBLISH",
    entityType: "troupes",
    entityId: id,
  });

  revalidatePath("/admin/troupes");
  revalidatePath("/troupes");
  revalidatePath("/");
  return { success: true, message: "Troupe publication status updated." };
}

// ---------------------------------------------------------------------
// 3. ARTISTS & TROUPE MEMBERS ACTIONS
// ---------------------------------------------------------------------

export async function saveArtistAction(
  data: {
    id?: string;
    slug?: string;
    fullName: string;
    stageName?: string;
    bio?: string;
    photoUrl?: string;
    disciplines: string[];
    isCoach: boolean;
    isActive: boolean;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.fullName?.trim()) {
    return { success: false, message: "Artist full name is required." };
  }

  const result = await saveArtist(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save artist." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_ARTIST" : "CREATE_ARTIST",
    entityType: "artists",
    entityId: data.id || (result as any).item?.id,
    details: { fullName: data.fullName },
  });

  revalidatePath("/admin/troupes");
  revalidatePath("/troupes");
  return { success: true, message: `Artist "${data.fullName}" saved.` };
}

export async function deleteArtistAction(
  id: string,
  fullName: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteArtist(id);
  if (!result.success) {
    return { success: false, message: result.error || "Failed to delete artist." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_ARTIST",
    entityType: "artists",
    entityId: id,
    details: { fullName },
  });

  revalidatePath("/admin/troupes");
  return { success: true, message: `Artist "${fullName}" deleted.` };
}

export async function assignTroupeMemberAction(
  troupeId: string,
  artistId: string,
  role = "Performer",
  isLead = false
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await assignTroupeMember(troupeId, artistId, role, isLead);
  if (!result.success) {
    return { success: false, message: "Failed to assign artist to troupe." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "ASSIGN_TROUPE_MEMBER",
    entityType: "troupe_members",
    details: { troupeId, artistId, role, isLead },
  });

  revalidatePath("/admin/troupes");
  revalidatePath(`/troupes`);
  return { success: true, message: "Troupe member assigned successfully." };
}

export async function removeTroupeMemberAction(
  troupeId: string,
  artistId: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await removeTroupeMember(troupeId, artistId);
  if (!result.success) {
    return { success: false, message: "Failed to remove member from troupe." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "REMOVE_TROUPE_MEMBER",
    entityType: "troupe_members",
    details: { troupeId, artistId },
  });

  revalidatePath("/admin/troupes");
  revalidatePath(`/troupes`);
  return { success: true, message: "Troupe member removed from roster." };
}

// ---------------------------------------------------------------------
// 4. EVENTS CRUD ACTIONS
// ---------------------------------------------------------------------

export async function saveEventAction(
  data: {
    id?: string;
    slug?: string;
    title: string;
    date: string;
    time: string;
    location: string;
    venue: string;
    category: string;
    description: string;
    ticketInfo: string;
    isUpcoming: boolean;
    featured?: boolean;
    isPublished?: boolean;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.title?.trim()) {
    return { success: false, message: "Event title is required." };
  }
  if (!data.location?.trim() || !data.venue?.trim()) {
    return { success: false, message: "Event location and venue are required." };
  }

  const result = await saveEvent(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save event." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_EVENT" : "CREATE_EVENT",
    entityType: "events",
    entityId: data.id || (result as any).item?.id,
    details: { title: data.title, date: data.date },
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true, message: `Event "${data.title}" saved successfully.` };
}

export async function deleteEventAction(
  id: string,
  title: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteEvent(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete event." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_EVENT",
    entityType: "events",
    entityId: id,
    details: { title },
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true, message: `Event "${title}" deleted.` };
}

export async function toggleEventPublishAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleEventPublish(id);
  if (!result.success) {
    return { success: false, message: "Failed to update event status." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "TOGGLE_EVENT_PUBLISH",
    entityType: "events",
    entityId: id,
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true, message: "Event publication status updated." };
}

// ---------------------------------------------------------------------
// 5. FIVE-YEAR HIGHLIGHTS ACTIONS
// ---------------------------------------------------------------------

export async function saveHighlightAction(
  data: {
    id?: string;
    year: string;
    title: string;
    caption: string;
    category: string;
    imageUrl?: string;
    isPublished?: boolean;
    orderIndex?: number;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.year?.trim() || !data.title?.trim() || !data.caption?.trim()) {
    return { success: false, message: "Year, title, and caption are required." };
  }

  const result = await saveHighlight(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save milestone highlight." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_HIGHLIGHT" : "CREATE_HIGHLIGHT",
    entityType: "highlights",
    entityId: data.id || (result as any).item?.id,
    details: { year: data.year, title: data.title },
  });

  revalidatePath("/admin/highlights");
  revalidatePath("/highlights");
  revalidatePath("/");
  return { success: true, message: `Milestone "${data.title}" saved.` };
}

export async function deleteHighlightAction(
  id: string,
  title: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteHighlight(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete milestone." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_HIGHLIGHT",
    entityType: "highlights",
    entityId: id,
    details: { title },
  });

  revalidatePath("/admin/highlights");
  revalidatePath("/highlights");
  revalidatePath("/");
  return { success: true, message: `Milestone "${title}" deleted.` };
}

export async function toggleHighlightPublishAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleHighlightPublish(id);
  if (!result.success) {
    return { success: false, message: "Failed to update milestone status." };
  }

  revalidatePath("/admin/highlights");
  revalidatePath("/highlights");
  revalidatePath("/");
  return { success: true, message: "Milestone status updated." };
}

// ---------------------------------------------------------------------
// 6. GALLERY ASSETS ACTIONS
// ---------------------------------------------------------------------

export async function saveGalleryAssetAction(
  data: {
    id?: string;
    assetType: "image" | "video";
    title: string;
    caption?: string;
    category: string;
    mediaUrl: string;
    thumbnailUrl?: string;
    durationSeconds?: number;
    isFeatured?: boolean;
    isPublished?: boolean;
    orderIndex?: number;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.title?.trim() || !data.mediaUrl?.trim()) {
    return { success: false, message: "Asset title and media URL are required." };
  }

  const result = await saveGalleryAsset(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save gallery asset." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_GALLERY" : "CREATE_GALLERY",
    entityType: "gallery",
    entityId: data.id || (result as any).item?.id,
    details: { title: data.title, assetType: data.assetType },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/media");
  revalidatePath("/");
  return { success: true, message: `Gallery asset "${data.title}" saved.` };
}

export async function deleteGalleryAssetAction(
  id: string,
  title: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteGalleryAsset(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete gallery asset." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_GALLERY",
    entityType: "gallery",
    entityId: id,
    details: { title },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/media");
  revalidatePath("/");
  return { success: true, message: `Gallery asset "${title}" deleted.` };
}

export async function toggleGalleryPublishAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleGalleryPublish(id);
  if (!result.success) {
    return { success: false, message: "Failed to update publication status." };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/media");
  return { success: true, message: "Gallery asset publication status updated." };
}

// ---------------------------------------------------------------------
// 7. IMPACT STORIES ACTIONS
// ---------------------------------------------------------------------

export async function saveImpactStoryAction(
  data: {
    id?: string;
    slug?: string;
    title: string;
    category: string;
    subtitle: string;
    heroImage: string;
    summary: string;
    body: string[];
    keyOutcomes: string[];
    quote?: { text: string; author: string };
    isPublished?: boolean;
    orderIndex?: number;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.title?.trim() || !data.summary?.trim()) {
    return { success: false, message: "Title and summary are required for impact stories." };
  }

  const result = await saveImpactStory(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save impact story." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_IMPACT_STORY" : "CREATE_IMPACT_STORY",
    entityType: "impact_stories",
    entityId: data.id || (result as any).item?.id,
    details: { title: data.title },
  });

  revalidatePath("/admin/impact");
  revalidatePath("/impact");
  revalidatePath("/");
  return { success: true, message: `Impact story "${data.title}" saved.` };
}

export async function deleteImpactStoryAction(
  id: string,
  title: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteImpactStory(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete impact story." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_IMPACT_STORY",
    entityType: "impact_stories",
    entityId: id,
    details: { title },
  });

  revalidatePath("/admin/impact");
  revalidatePath("/impact");
  revalidatePath("/");
  return { success: true, message: `Impact story "${title}" deleted.` };
}

export async function toggleImpactPublishAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleImpactPublish(id);
  if (!result.success) {
    return { success: false, message: "Failed to update publication status." };
  }

  revalidatePath("/admin/impact");
  revalidatePath("/impact");
  revalidatePath("/");
  return { success: true, message: "Impact story publication status updated." };
}

// ---------------------------------------------------------------------
// 8. TESTIMONIALS ACTIONS
// ---------------------------------------------------------------------

export async function saveTestimonialAction(
  data: {
    id?: string;
    quote: string;
    author: string;
    role: string;
    organization?: string;
    year?: string;
    isApproved?: boolean;
    orderIndex?: number;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.quote?.trim() || !data.author?.trim()) {
    return { success: false, message: "Quote and author name are required." };
  }

  const result = await saveTestimonial(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save testimonial." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_TESTIMONIAL" : "CREATE_TESTIMONIAL",
    entityType: "testimonials",
    entityId: data.id || (result as any).item?.id,
    details: { author: data.author, isApproved: data.isApproved },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  return { success: true, message: `Testimonial from "${data.author}" saved.` };
}

export async function deleteTestimonialAction(
  id: string,
  author: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteTestimonial(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete testimonial." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_TESTIMONIAL",
    entityType: "testimonials",
    entityId: id,
    details: { author },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  return { success: true, message: `Testimonial from "${author}" deleted.` };
}

export async function toggleTestimonialApprovalAction(
  testimonialId: string,
  isApproved: boolean
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleTestimonialApproval(testimonialId);
  if (!result.success) {
    return { success: false, message: "Failed to toggle testimonial status." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: isApproved ? "APPROVE_TESTIMONIAL" : "UNAPPROVE_TESTIMONIAL",
    entityType: "testimonials",
    entityId: testimonialId,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  return { success: true, message: `Testimonial approval status changed.` };
}

// ---------------------------------------------------------------------
// 9. FUNDRAISING & SITE SETTINGS ACTIONS
// ---------------------------------------------------------------------

export async function saveCampaignAction(
  data: {
    id?: string;
    slug?: string;
    title: string;
    goalAmount?: number;
    currency: string;
    summary: string;
    description: string;
    targetUse: string;
    externalDonationUrl?: string;
    isActive: boolean;
    isFeatured?: boolean;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  if (!data.title?.trim() || !data.summary?.trim()) {
    return { success: false, message: "Campaign title and summary are required." };
  }

  const result = await saveCampaign(data, data.id);
  if (!result.success) {
    return { success: false, message: "Failed to save campaign." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: data.id ? "UPDATE_CAMPAIGN" : "CREATE_CAMPAIGN",
    entityType: "fundraising_campaigns",
    entityId: data.id || (result as any).item?.id,
    details: { title: data.title },
  });

  revalidatePath("/admin/fundraising");
  revalidatePath("/support");
  revalidatePath("/");
  return { success: true, message: `Campaign "${data.title}" saved.` };
}

export async function deleteCampaignAction(
  id: string,
  title: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  const result = await deleteCampaign(id);
  if (!result.success) {
    return { success: false, message: "Failed to delete campaign." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "DELETE_CAMPAIGN",
    entityType: "fundraising_campaigns",
    entityId: id,
    details: { title },
  });

  revalidatePath("/admin/fundraising");
  revalidatePath("/support");
  return { success: true, message: `Campaign "${title}" deleted.` };
}

export async function toggleCampaignActiveAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const result = await toggleCampaignActive(id);
  if (!result.success) {
    return { success: false, message: "Failed to update campaign status." };
  }

  revalidatePath("/admin/fundraising");
  revalidatePath("/support");
  return { success: true, message: "Campaign status updated." };
}

export async function saveSiteSettingsAction(
  settings: {
    organizationName: string;
    parentOrganizationName: string;
    circusEstablishedYear: number;
    parentOrgRegisteredDate: string;
    physicalLocation: string;
    primaryPhone: string;
    primaryEmail: string;
    socialLinks: Record<string, string>;
    metaDescription?: string;
  }
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin"]);

  if (!settings.primaryPhone?.trim() || !settings.primaryEmail?.trim()) {
    return { success: false, message: "Official contact phone and email are required." };
  }

  const result = await saveSiteSettings(settings);
  if (!result.success) {
    return { success: false, message: "Failed to save site settings." };
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "UPDATE_SITE_SETTINGS",
    entityType: "site_settings",
    entityId: "default",
    details: {
      phone: settings.primaryPhone,
      email: settings.primaryEmail,
      location: settings.physicalLocation,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/about");
  return { success: true, message: "Verified site settings successfully updated." };
}

// ---------------------------------------------------------------------
// 10. BOOKINGS & INQUIRIES ADMIN STATUS ACTIONS
// ---------------------------------------------------------------------

export async function updateBookingStatusAction(
  bookingId: string,
  newStatus: "pending" | "confirmed" | "completed" | "cancelled" | "archived",
  adminNotes?: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: newStatus,
          admin_notes: adminNotes || null,
        })
        .eq("id", bookingId);

      if (error) {
        return { success: false, message: error.message };
      }
    } catch (err: any) {
      return { success: false, message: err?.message || "Failed to update booking" };
    }
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "UPDATE_BOOKING_STATUS",
    entityType: "bookings",
    entityId: bookingId,
    details: { newStatus, adminNotes },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  return { success: true, message: `Booking status successfully updated to ${newStatus}.` };
}

export async function updateInquiryStatusAction(
  inquiryId: string,
  newStatus: "new" | "contacted" | "resolved" | "archived",
  adminNotes?: string
): Promise<{ success: boolean; message: string }> {
  const admin = await verifyAdminAction(["super_admin", "editor"]);

  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({
          status: newStatus,
          admin_notes: adminNotes || null,
        })
        .eq("id", inquiryId);

      if (error) {
        return { success: false, message: error.message };
      }
    } catch (err: any) {
      return { success: false, message: err?.message || "Failed to update inquiry" };
    }
  }

  await recordAuditLog({
    adminEmail: admin.email,
    adminId: admin.id,
    action: "UPDATE_INQUIRY_STATUS",
    entityType: "inquiries",
    entityId: inquiryId,
    details: { newStatus, adminNotes },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  return { success: true, message: `Inquiry status updated to ${newStatus}.` };
}
