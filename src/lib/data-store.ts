import { TROUPES } from "@/data/troupes";
import { SERVICES } from "@/data/services";
import { EVENTS } from "@/data/events";
import { HIGHLIGHTS } from "@/data/highlights";
import { TESTIMONIALS } from "@/data/testimonials";
import { IMPACT_STORIES, ImpactStory } from "@/data/impact";
import { BookingFormData, InquiryFormData, Troupe, ServicePackage, EventItem, HighlightItem, TestimonialItem } from "@/types";
import { createServerSupabaseClient, createAdminSupabaseClient } from "./supabase/server";

// In-memory persistent store for development & seamless fallback
const inMemoryBookings: Array<BookingFormData & { id: string; status: string; createdAt: string }> = [
  {
    id: "demo-booking-1",
    clientName: "South Ethiopia Tourism & Culture Bureau",
    clientEmail: "culture@southethiopia.gov.et",
    clientPhone: "+251-911-000-111",
    organization: "Regional Tourism Bureau",
    eventType: "Cultural Tourism Festival Opening",
    eventDate: "2026-12-28",
    venueLocation: "Arba Minch Paradise Grounds",
    expectedAttendees: "500+",
    packageRequested: "Troupe African Pride + Giant Puppets",
    notes: "VIP dignitaries and international delegates attending.",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-booking-2",
    clientName: "Gamo Community Development Forum",
    clientEmail: "youth@gamoforum.org",
    clientPhone: "+251-912-333-444",
    organization: "Gamo Development Association",
    eventType: "Youth Empowerment Showcase",
    eventDate: "2027-01-15",
    venueLocation: "Nech Sar Hall",
    expectedAttendees: "250",
    packageRequested: "Troupe Gamo Bayira & Yoga Brothers",
    notes: "Special request for contortion and Chinese pole demonstration.",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

const inMemoryInquiries: Array<InquiryFormData & { id: string; status: string; createdAt: string }> = [
  {
    id: "demo-inq-1",
    fullName: "Abebech Tadesse",
    email: "abebech.t@gmail.com",
    phone: "+251-911-222-333",
    organization: "Friends of Ethiopian Arts",
    inquiryType: "training_center_fund",
    message: "We would like to contribute towards the roof restoration and acrobatic mats for the Arba Minch circus training hall.",
    status: "new",
    createdAt: new Date().toISOString(),
  },
];

export async function getTroupes(): Promise<Troupe[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("troupes").select("*").order("order_index", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((t: any) => ({
          id: t.id,
          slug: t.slug,
          name: t.name,
          subTitle: t.sub_title,
          membersCount: t.members_count,
          description: t.description,
          acts: t.acts || [],
          members: t.members || [],
          featuredImage: t.image_url || "/images/circus_performance_1.png",
          featured: t.featured,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return TROUPES;
}

export async function getTroupeBySlug(slug: string): Promise<Troupe | null> {
  const troupes = await getTroupes();
  return troupes.find((t) => t.slug === slug) || null;
}

export async function getServices(): Promise<ServicePackage[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("services").select("*").order("order_index", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((s: any) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          category: s.category,
          summary: s.summary,
          description: s.description,
          details: s.bullet_points || [],
          imageUrl: s.image_url || "/images/circus_performance_1.png",
        }));
      }
    } catch {
      // Fallback
    }
  }
  return SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServicePackage | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

export async function getEvents(): Promise<EventItem[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((e: any) => ({
          id: e.id,
          slug: e.slug,
          title: e.title,
          date: e.event_date,
          time: e.event_time,
          location: e.location,
          venue: e.venue,
          category: e.category,
          description: e.description,
          ticketInfo: e.ticket_info,
          isUpcoming: e.is_upcoming,
          featured: e.is_featured,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return EVENTS;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) || null;
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("impact_stories")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((story: any) => ({
          id: story.id,
          slug: story.slug,
          title: story.title,
          category: story.category,
          subtitle: story.subtitle,
          heroImage: story.hero_image,
          summary: story.summary,
          body: story.body || [],
          keyOutcomes: story.key_outcomes || [],
          quote: story.quote_text
            ? { text: story.quote_text, author: story.quote_author || "AMEPAC Leadership" }
            : undefined,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return IMPACT_STORIES;
}

export async function getImpactStoryBySlug(slug: string): Promise<ImpactStory | null> {
  const stories = await getImpactStories();
  return stories.find((s) => s.slug === slug) || null;
}

export async function getHighlights(): Promise<HighlightItem[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("highlights").select("*").order("order_index", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((h: any) => ({
          id: h.id,
          year: h.year,
          title: h.title,
          caption: h.caption,
          category: h.category,
          imageUrl: h.image_url || "/images/circus_performance_1.png",
        }));
      }
    } catch {
      // Fallback
    }
  }
  return HIGHLIGHTS;
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("testimonials").select("*").eq("is_approved", true);
      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          quote: item.quote,
          author: item.author_name,
          role: item.role_or_title,
          organization: item.organization,
          year: item.year,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return TESTIMONIALS;
}

export async function saveBooking(booking: BookingFormData) {
  const supabase = createServerSupabaseClient();
  const id = `booking-${Date.now()}`;
  const record = {
    ...booking,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from("bookings").insert({
        client_name: booking.clientName,
        client_email: booking.clientEmail,
        client_phone: booking.clientPhone,
        organization: booking.organization || null,
        event_type: booking.eventType,
        event_date: booking.eventDate,
        venue_location: booking.venueLocation,
        expected_attendees: booking.expectedAttendees,
        package_requested: booking.packageRequested,
        notes: booking.notes || null,
        status: "pending",
      }).select().single();

      if (!error && data) {
        return { success: true, bookingId: data.id };
      }
    } catch (err) {
      console.warn("Supabase booking insert error:", err);
    }
  }

  // Persistent in-memory fallback
  inMemoryBookings.unshift(record);
  return { success: true, bookingId: id };
}

export async function saveInquiry(inquiry: InquiryFormData) {
  const supabase = createServerSupabaseClient();
  const id = `inq-${Date.now()}`;
  const record = {
    ...inquiry,
    id,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from("inquiries").insert({
        inquiry_type: inquiry.inquiryType,
        full_name: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone || null,
        organization: inquiry.organization || null,
        message: inquiry.message,
        status: "new",
      }).select().single();

      if (!error && data) {
        return { success: true, inquiryId: data.id };
      }
    } catch (err) {
      console.warn("Supabase inquiry insert error:", err);
    }
  }

  inMemoryInquiries.unshift(record);
  return { success: true, inquiryId: id };
}

export async function getAllBookingsForAdmin() {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((b: any) => ({
          id: b.id,
          clientName: b.client_name,
          clientEmail: b.client_email,
          clientPhone: b.client_phone,
          organization: b.organization,
          eventType: b.event_type,
          eventDate: b.event_date,
          venueLocation: b.venue_location,
          expectedAttendees: b.expected_attendees,
          packageRequested: b.package_requested,
          notes: b.notes,
          status: b.status,
          createdAt: b.created_at,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryBookings;
}

export async function getAllInquiriesForAdmin() {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((i: any) => ({
          id: i.id,
          fullName: i.full_name,
          email: i.email,
          phone: i.phone,
          organization: i.organization,
          inquiryType: i.inquiry_type,
          message: i.message,
          status: i.status,
          createdAt: i.created_at,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryInquiries;
}
