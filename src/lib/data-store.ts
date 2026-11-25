import { TROUPES } from "@/data/troupes";
import { SERVICES } from "@/data/services";
import { EVENTS } from "@/data/events";
import { HIGHLIGHTS } from "@/data/highlights";
import { TESTIMONIALS } from "@/data/testimonials";
import { IMPACT_STORIES, ImpactStory } from "@/data/impact";
import {
  BookingFormData,
  InquiryFormData,
  Troupe,
  ServicePackage,
  EventItem,
  HighlightItem,
  TestimonialItem,
  Artist,
  TroupeMember,
  GalleryAsset,
  FundraisingCampaign,
  SiteSettings,
  AuditLogEntry,
} from "@/types";
import { createServerSupabaseClient, createAdminSupabaseClient } from "./supabase/server";

// ---------------------------------------------------------------------
// In-Memory Persistent Store (Development, Tests & Supabase Fallback)
// ---------------------------------------------------------------------

let inMemoryServices: ServicePackage[] = SERVICES.map((s, idx) => ({
  ...s,
  isPublished: true,
  orderIndex: idx + 1,
}));

let inMemoryTroupes: Troupe[] = TROUPES.map((t, idx) => ({
  ...t,
  isPublished: true,
  orderIndex: idx + 1,
}));

let inMemoryArtists: Artist[] = [
  {
    id: "artist-1",
    slug: "samuel-filto",
    fullName: "Samuel Filto",
    stageName: "Yoga Brother Samuel",
    bio: "Professional extreme contortionist and founding duo member of Arba Minch Yoga Brothers.",
    disciplines: ["Contortion and flexibility acts", "Extreme Front & Back Bending", "Joint Dislocation"],
    photoUrl: "/images/troupe_yoga_brothers.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-2",
    slug: "dagmawi-babena",
    fullName: "Dagmawi Babena",
    stageName: "Yoga Brother Dagmawi",
    bio: "Professional extreme contortionist and hyper-flexibility performer.",
    disciplines: ["Contortion and flexibility acts", "Torso & Neck Twisting", "Synchronized Contortion"],
    photoUrl: "/images/troupe_yoga_brothers.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-3",
    slug: "kefeni-teshome",
    fullName: "Kefeni Teshome",
    stageName: "Queen of Gamo",
    bio: "Celebrated solo contortionist from Arba Minch performing pedestal balance and emotive flexibility solos.",
    disciplines: ["Solo contortion", "Pedestal Architecture", "Scorpion Backbend"],
    photoUrl: "/images/circus_performance_2.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-4",
    slug: "rehobot-abreham",
    fullName: "Rehobot Abreham",
    stageName: "Rehobot",
    bio: "Professional acrobat and Chinese pole specialist in Troupe Gamo Bayira.",
    disciplines: ["Hoop diving", "Chinese pole", "Pyramids"],
    photoUrl: "/images/troupe_gamo_bayira.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-5",
    slug: "temesgen-daniel",
    fullName: "Temesgen Daniel",
    stageName: "Temesgen",
    bio: "Acrobat and aerial specialist in Troupe Gamo Bayira.",
    disciplines: ["Chinese pole", "Pyramids", "Cube manipulation"],
    photoUrl: "/images/troupe_gamo_bayira.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-6",
    slug: "fasika-shewa",
    fullName: "Fasika Shewa",
    stageName: "Fasika",
    bio: "Dynamic ensemble acrobat and pyramid specialist in Troupe Gamo Bayira.",
    disciplines: ["Pyramids", "Cube manipulation", "Hoop diving"],
    photoUrl: "/images/troupe_gamo_bayira.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-7",
    slug: "mintesinot-geremew",
    fullName: "Mintesinot Geremew",
    stageName: "Mintesinot",
    bio: "Precision object manipulation and juggling artist in Troupe Gamo Bayira.",
    disciplines: ["Club juggling", "Hat juggling", "Pyramids"],
    photoUrl: "/images/troupe_gamo_bayira.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-8",
    slug: "biniam-degu",
    fullName: "Biniam Degu",
    stageName: "Biniam",
    bio: "Versatile juggler and acrobatic performer in Troupe Gamo Bayira.",
    disciplines: ["Hat juggling", "Club juggling", "Cube manipulation"],
    photoUrl: "/images/troupe_gamo_bayira.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-9",
    slug: "sintayehu-adimasu",
    fullName: "Sintayehu Adimasu",
    stageName: "Sintayehu",
    bio: "Lead acrobat and hand balancing specialist in Troupe African Pride.",
    disciplines: ["Hand balancing", "Pyramid", "Hand-to-hand"],
    photoUrl: "/images/circus_performance_1.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-10",
    slug: "cherinet-tomas",
    fullName: "Cherinet Tomas",
    stageName: "Cherinet",
    bio: "Dynamic Cyr wheel artist and ensemble acrobat in Troupe African Pride.",
    disciplines: ["Cyr wheel", "Pyramid", "Acrobatics"],
    photoUrl: "/images/circus_performance_1.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-11",
    slug: "desta-teshome",
    fullName: "Desta Teshome",
    stageName: "Desta",
    bio: "High-voltage pyramid and equilibrium artist in Troupe African Pride.",
    disciplines: ["Pyramid", "Free ladder", "Hand-to-hand"],
    photoUrl: "/images/circus_performance_1.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-12",
    slug: "abiot-ayele",
    fullName: "Abiot Ayele",
    stageName: "Abiot",
    bio: "Free ladder balance and acrobatic pyramid performer in Troupe African Pride.",
    disciplines: ["Free ladder", "Rola bola", "Pyramid"],
    photoUrl: "/images/circus_performance_1.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-13",
    slug: "ashenafi-ayele",
    fullName: "Ashenafi Ayele",
    stageName: "Ashenafi",
    bio: "Balance and rola bola specialist in Troupe African Pride.",
    disciplines: ["Rola bola", "Hand-to-hand", "Pyramid"],
    photoUrl: "/images/circus_performance_1.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-14",
    slug: "daniel-eyassu",
    fullName: "Daniel Eyassu",
    stageName: "Daniel",
    bio: "Hand-to-hand and physical balance artist in Troupe African Pride.",
    disciplines: ["Hand-to-hand", "Pyramid", "Hand balancing"],
    photoUrl: "/images/circus_performance_1.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-15",
    slug: "tamirat-hamesa",
    fullName: "Tamirat Hamesa",
    stageName: "Tamirat",
    bio: "Powerful acrobatic base and pyramid artist in Troupe African Pride.",
    disciplines: ["Pyramid", "Hand-to-hand", "Acrobatics"],
    photoUrl: "/images/circus_performance_1.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-16",
    slug: "melat-muluken",
    fullName: "Melat Muluken",
    stageName: "Melat",
    bio: "Versatile female artist performing in both Troupe African Pride and Troupe Black Lioness. Information preserved accurately per client records.",
    disciplines: ["Hand-to-hand", "Trio balance", "Hula hoop", "Acrobatics", "Antipode"],
    photoUrl: "/images/troupe_black_lioness.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-17",
    slug: "bilen-mala",
    fullName: "Bilen Mala",
    stageName: "Bilen",
    bio: "Senior all-female troupe performer specializing in trio balance and hula hoop.",
    disciplines: ["Trio balance", "Hula hoop", "Acrobatics"],
    photoUrl: "/images/troupe_black_lioness.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-18",
    slug: "lemlem-hareru",
    fullName: "Lemlem Hareru",
    stageName: "Lemlem",
    bio: "Acrobatic flyer and equilibrium artist in Troupe Black Lioness.",
    disciplines: ["Trio balance", "Acrobatics", "Hula hoop"],
    photoUrl: "/images/troupe_black_lioness.png",
    isCoach: false,
    isActive: true,
  },
  {
    id: "artist-19",
    slug: "dibora-getachew",
    fullName: "Dibora Getachew",
    stageName: "Dibora",
    bio: "Antipode foot-juggling and acrobatic balance performer in Troupe Black Lioness.",
    disciplines: ["Trio balance", "Antipode", "Acrobatics"],
    photoUrl: "/images/troupe_black_lioness.png",
    isCoach: false,
    isActive: true,
  },
];

let inMemoryTroupeMembers: TroupeMember[] = [
  // Arba Minch Yoga Brothers (2 members)
  { id: "tm-1", troupeId: "yoga-brothers", artistId: "artist-1", roleInTroupe: "Duo Lead", isLead: true, orderIndex: 1 },
  { id: "tm-2", troupeId: "yoga-brothers", artistId: "artist-2", roleInTroupe: "Duo Lead", isLead: true, orderIndex: 2 },

  // Kefeni Teshome (Solo)
  { id: "tm-3", troupeId: "kefeni-queen-of-gamo", artistId: "artist-3", roleInTroupe: "Solo Virtuoso", isLead: true, orderIndex: 1 },

  // Troupe Gamo Bayira (5 members)
  { id: "tm-4", troupeId: "troupe-gamo-bayira", artistId: "artist-4", roleInTroupe: "Chinese Pole Lead", isLead: true, orderIndex: 1 },
  { id: "tm-5", troupeId: "troupe-gamo-bayira", artistId: "artist-5", roleInTroupe: "Acrobat & Pyramids", isLead: false, orderIndex: 2 },
  { id: "tm-6", troupeId: "troupe-gamo-bayira", artistId: "artist-6", roleInTroupe: "Hoop & Pyramids", isLead: false, orderIndex: 3 },
  { id: "tm-7", troupeId: "troupe-gamo-bayira", artistId: "artist-7", roleInTroupe: "Club & Hat Juggling", isLead: false, orderIndex: 4 },
  { id: "tm-8", troupeId: "troupe-gamo-bayira", artistId: "artist-8", roleInTroupe: "Hat & Cube Manipulation", isLead: false, orderIndex: 5 },

  // Troupe African Pride (8 members)
  { id: "tm-9", troupeId: "troupe-african-pride", artistId: "artist-9", roleInTroupe: "Hand Balancing Lead", isLead: true, orderIndex: 1 },
  { id: "tm-10", troupeId: "troupe-african-pride", artistId: "artist-10", roleInTroupe: "Cyr Wheel Specialist", isLead: false, orderIndex: 2 },
  { id: "tm-11", troupeId: "troupe-african-pride", artistId: "artist-11", roleInTroupe: "Free Ladder Acrobat", isLead: false, orderIndex: 3 },
  { id: "tm-12", troupeId: "troupe-african-pride", artistId: "artist-12", roleInTroupe: "Rola Bola Artist", isLead: false, orderIndex: 4 },
  { id: "tm-13", troupeId: "troupe-african-pride", artistId: "artist-13", roleInTroupe: "Rola Bola & Hand-to-Hand", isLead: false, orderIndex: 5 },
  { id: "tm-14", troupeId: "troupe-african-pride", artistId: "artist-14", roleInTroupe: "Hand-to-Hand Specialist", isLead: false, orderIndex: 6 },
  { id: "tm-15", troupeId: "troupe-african-pride", artistId: "artist-15", roleInTroupe: "Pyramid Base", isLead: false, orderIndex: 7 },
  { id: "tm-16", troupeId: "troupe-african-pride", artistId: "artist-16", roleInTroupe: "Hand-to-Hand Flyer (Dual Registered)", isLead: false, orderIndex: 8 },

  // Troupe Black Lioness (4 members)
  { id: "tm-17", troupeId: "troupe-black-lioness", artistId: "artist-17", roleInTroupe: "Trio Balance Lead", isLead: true, orderIndex: 1 },
  { id: "tm-18", troupeId: "troupe-black-lioness", artistId: "artist-18", roleInTroupe: "Acrobatics & Balance", isLead: false, orderIndex: 2 },
  { id: "tm-19", troupeId: "troupe-black-lioness", artistId: "artist-19", roleInTroupe: "Antipode Foot Juggling", isLead: false, orderIndex: 3 },
  { id: "tm-20", troupeId: "troupe-black-lioness", artistId: "artist-16", roleInTroupe: "Trio Balance & Antipode Flyer (Dual Registered)", isLead: false, orderIndex: 4 },
];

let inMemoryEvents: EventItem[] = EVENTS.map((e) => ({
  ...e,
  isPublished: true,
}));

let inMemoryHighlights: HighlightItem[] = HIGHLIGHTS.map((h, idx) => ({
  ...h,
  isPublished: true,
  orderIndex: idx + 1,
}));

let inMemoryGallery: GalleryAsset[] = [
  {
    id: "gal-1",
    assetType: "image",
    title: "Troupe African Pride Banquine Formation",
    caption: "Senior acrobats executing synchronized banquine launches and multi-tier pyramids.",
    category: "Main Stage Performance",
    mediaUrl: "/images/circus_performance_1.png",
    orderIndex: 1,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "gal-2",
    assetType: "image",
    title: "Troupe Gamo Bayira Chinese Pole & Balance",
    caption: "Acrobatic human flags and synchronized cube manipulation.",
    category: "Festival Showcase",
    mediaUrl: "/images/circus_performance_2.png",
    orderIndex: 2,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "gal-3",
    assetType: "image",
    title: "Arba Minch Training Ground & Hall",
    caption: "Daily rehearsal hall in central Arba Minch where more than 80 youth practice on soil floors.",
    category: "Grassroots Training",
    mediaUrl: "/images/circus_facility_3.png",
    orderIndex: 3,
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "gal-4",
    assetType: "image",
    title: "Troupe Black Lioness Antipode Artistry",
    caption: "All-female powerhouse balance and antipode performance.",
    category: "Artist Portraits",
    mediaUrl: "/images/troupe_black_lioness.png",
    orderIndex: 4,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "gal-5",
    assetType: "image",
    title: "Arba Minch Yoga Brothers Official Portrait",
    caption: "Official portrait of the extreme contortion duo.",
    category: "Artist Portraits",
    mediaUrl: "/images/troupe_yoga_brothers.png",
    orderIndex: 5,
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "gal-6",
    assetType: "image",
    title: "Troupe Gamo Bayira Artist Portrait",
    caption: "Official portrait of Troupe Gamo Bayira acrobat.",
    category: "Artist Portraits",
    mediaUrl: "/images/troupe_gamo_bayira.png",
    orderIndex: 6,
    isFeatured: true,
    isPublished: true,
  },
];

let inMemoryImpactStories: ImpactStory[] = IMPACT_STORIES.map((s, idx) => ({
  ...s,
  isPublished: true,
  orderIndex: idx + 1,
}));

let inMemoryTestimonials: TestimonialItem[] = TESTIMONIALS.map((t, idx) => ({
  ...t,
  isApproved: true,
  orderIndex: idx + 1,
}));

let inMemoryCampaigns: FundraisingCampaign[] = [
  {
    id: "camp-facility",
    slug: "training-center-renovation-fund",
    title: "Training Center Renovation & Weatherproofing Fund",
    goalAmount: 35000,
    currency: "USD",
    summary: "Rebuilding our makeshift training shed into a permanent, weather-proof circus sports training hall.",
    description: "Our current facility has a leaking roof and bare soil floor. Funds will erect reinforced steel trusses, safety overhead crash rigging, and professional tumbling mats.",
    targetUse: "Steel trusses, safety rigging, crash mats, concrete moisture-barrier flooring",
    externalDonationUrl: "",
    isActive: true,
    isFeatured: true,
  },
  {
    id: "camp-education",
    slug: "education-and-nutrition-support",
    title: "Trainee Education Tracking & Nutritional Meals Fund",
    goalAmount: 12000,
    currency: "USD",
    summary: "Providing daily post-training protein meals and school materials for all 80+ trainees.",
    description: "Every circus trainee is monitored to prevent school dropouts. We supply exercise books, uniforms, and hot nutritious meals after daily 4-hour workouts.",
    targetUse: "Daily post-workout meals, school exercise books, tutoring support",
    externalDonationUrl: "",
    isActive: true,
    isFeatured: false,
  },
];

let inMemorySiteSettings: SiteSettings = {
  key: "default",
  organizationName: "Arba Minch Entertainment Performing Arts & Circus (AMEPAC)",
  parentOrganizationName: "Building Tomorrow Integrated Youth & Community Development Organization",
  circusEstablishedYear: 2011,
  parentOrgRegisteredDate: "November 2022",
  physicalLocation: "Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia, Ethiopia",
  primaryPhone: "+251-913-949-209",
  primaryEmail: "Arbaminch.circus@gmail.com",
  socialLinks: {
    facebook: "https://facebook.com/ArbaMinchCircus",
    youtube: "https://youtube.com/ArbaMinchCircus",
    telegram: "https://t.me/ArbaMinchCircus",
  },
  metaDescription: "Official website of AMEPAC — world-class Ethiopian acrobatics, contortion, and community transformation based in Arba Minch.",
  updatedAt: new Date().toISOString(),
};

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

const inMemoryAuditLogs: AuditLogEntry[] = [
  {
    id: "audit-1",
    adminEmail: "Arbaminch.circus@gmail.com",
    action: "SYSTEM_INITIALIZATION",
    entityType: "system",
    entityId: "system",
    details: { message: "Initial database seed and RLS verification completed." },
    createdAt: new Date().toISOString(),
  },
];

// Helper: Ensure Unique Stable Slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------
// 1. SERVICES CRUD
// ---------------------------------------------------------------------

export async function getServices(): Promise<ServicePackage[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true });
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
          isPublished: s.is_published,
          orderIndex: s.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryServices.filter((s) => s.isPublished !== false);
}

export async function getServiceBySlug(slug: string): Promise<ServicePackage | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug || s.aliases?.includes(slug)) || null;
}

export async function getAllServicesForAdmin(): Promise<ServicePackage[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) {
        return data.map((s: any) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          category: s.category,
          summary: s.summary,
          description: s.description,
          details: s.bullet_points || [],
          imageUrl: s.image_url || "/images/circus_performance_1.png",
          isPublished: s.is_published,
          orderIndex: s.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryServices;
}

export async function saveService(data: Partial<ServicePackage>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  const slug = data.slug ? slugify(data.slug) : slugify(data.title || "service");

  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("services")
          .update({
            slug,
            title: data.title,
            category: data.category,
            summary: data.summary,
            description: data.description,
            bullet_points: data.details || [],
            image_url: data.imageUrl,
            is_published: data.isPublished !== false,
            order_index: data.orderIndex ?? 0,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("services")
          .insert({
            slug,
            title: data.title,
            category: data.category,
            summary: data.summary,
            description: data.description,
            bullet_points: data.details || [],
            image_url: data.imageUrl || "/images/circus_performance_1.png",
            is_published: data.isPublished !== false,
            order_index: data.orderIndex ?? inMemoryServices.length + 1,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveService error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryServices.findIndex((s) => s.id === id);
    if (idx !== -1) {
      inMemoryServices[idx] = {
        ...inMemoryServices[idx],
        ...data,
        slug,
      } as ServicePackage;
      return { success: true, item: inMemoryServices[idx] };
    }
  }
  const newId = `service-${Date.now()}`;
  const newService: ServicePackage = {
    id: newId,
    slug,
    title: data.title || "New Service",
    category: data.category || "Circus Arts",
    summary: data.summary || "",
    description: data.description || "",
    details: data.details || [],
    imageUrl: data.imageUrl || "/images/circus_performance_1.png",
    isPublished: data.isPublished !== false,
    orderIndex: data.orderIndex ?? inMemoryServices.length + 1,
  };
  inMemoryServices.push(newService);
  return { success: true, item: newService };
}

export async function deleteService(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteService error:", err);
    }
  }
  inMemoryServices = inMemoryServices.filter((s) => s.id !== id);
  return { success: true };
}

export async function toggleServicePublish(id: string) {
  const all = await getAllServicesForAdmin();
  const current = all.find((s) => s.id === id);
  if (!current) return { success: false, error: "Service not found" };
  return saveService({ ...current, isPublished: !current.isPublished }, id);
}

// ---------------------------------------------------------------------
// 2. TROUPES CRUD
// ---------------------------------------------------------------------

export async function getTroupes(): Promise<Troupe[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("troupes")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true });
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
          featuredImage: t.featured_image || t.image_url || "/images/circus_performance_1.png",
          featured: t.is_featured ?? t.featured,
          isPublished: t.is_published,
          orderIndex: t.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryTroupes.filter((t) => t.isPublished !== false);
}

export async function getTroupeBySlug(slug: string): Promise<Troupe | null> {
  const troupes = await getTroupes();
  return troupes.find((t) => t.slug === slug) || null;
}

export async function getAllTroupesForAdmin(): Promise<Troupe[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("troupes")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) {
        return data.map((t: any) => ({
          id: t.id,
          slug: t.slug,
          name: t.name,
          subTitle: t.sub_title,
          membersCount: t.members_count,
          description: t.description,
          acts: t.acts || [],
          members: t.members || [],
          featuredImage: t.featured_image || t.image_url || "/images/circus_performance_1.png",
          featured: t.is_featured ?? t.featured,
          isPublished: t.is_published,
          orderIndex: t.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryTroupes;
}

export async function saveTroupe(data: Partial<Troupe>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  const slug = data.slug ? slugify(data.slug) : slugify(data.name || "troupe");

  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("troupes")
          .update({
            slug,
            name: data.name,
            sub_title: data.subTitle,
            members_count: data.membersCount ?? 1,
            description: data.description,
            acts: data.acts || [],
            featured_image: data.featuredImage,
            is_featured: data.featured ?? false,
            is_published: data.isPublished !== false,
            order_index: data.orderIndex ?? 0,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("troupes")
          .insert({
            slug,
            name: data.name,
            sub_title: data.subTitle,
            members_count: data.membersCount ?? 1,
            description: data.description,
            acts: data.acts || [],
            featured_image: data.featuredImage || "/images/circus_performance_1.png",
            is_featured: data.featured ?? false,
            is_published: data.isPublished !== false,
            order_index: data.orderIndex ?? inMemoryTroupes.length + 1,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveTroupe error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryTroupes.findIndex((t) => t.id === id);
    if (idx !== -1) {
      inMemoryTroupes[idx] = {
        ...inMemoryTroupes[idx],
        ...data,
        slug,
      } as Troupe;
      return { success: true, item: inMemoryTroupes[idx] };
    }
  }
  const newId = `troupe-${Date.now()}`;
  const newTroupe: Troupe = {
    id: newId,
    slug,
    name: data.name || "New Troupe",
    subTitle: data.subTitle,
    membersCount: data.membersCount ?? 1,
    description: data.description || "",
    acts: data.acts || [],
    members: data.members || [],
    featuredImage: data.featuredImage || "/images/circus_performance_1.png",
    featured: data.featured ?? false,
    isPublished: data.isPublished !== false,
    orderIndex: data.orderIndex ?? inMemoryTroupes.length + 1,
  };
  inMemoryTroupes.push(newTroupe);
  return { success: true, item: newTroupe };
}

export async function deleteTroupe(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("troupes").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteTroupe error:", err);
    }
  }
  inMemoryTroupes = inMemoryTroupes.filter((t) => t.id !== id);
  inMemoryTroupeMembers = inMemoryTroupeMembers.filter((tm) => tm.troupeId !== id);
  return { success: true };
}

export async function toggleTroupePublish(id: string) {
  const all = await getAllTroupesForAdmin();
  const current = all.find((t) => t.id === id);
  if (!current) return { success: false, error: "Troupe not found" };
  return saveTroupe({ ...current, isPublished: !current.isPublished }, id);
}

// ---------------------------------------------------------------------
// 3. ARTISTS & TROUPE MEMBERS CRUD
// ---------------------------------------------------------------------

export async function getAllArtistsForAdmin(): Promise<Artist[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .order("full_name", { ascending: true });
      if (!error && data) {
        return data.map((a: any) => ({
          id: a.id,
          slug: a.slug,
          fullName: a.full_name,
          stageName: a.stage_name,
          bio: a.bio,
          photoUrl: a.photo_url,
          disciplines: a.disciplines || [],
          isCoach: a.is_coach,
          isActive: a.is_active,
          createdAt: a.created_at,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryArtists;
}

export async function saveArtist(data: Partial<Artist>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  const slug = data.slug ? slugify(data.slug) : slugify(data.fullName || "artist");

  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("artists")
          .update({
            slug,
            full_name: data.fullName,
            stage_name: data.stageName,
            bio: data.bio,
            photo_url: data.photoUrl,
            disciplines: data.disciplines || [],
            is_coach: data.isCoach ?? false,
            is_active: data.isActive !== false,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("artists")
          .insert({
            slug,
            full_name: data.fullName,
            stage_name: data.stageName,
            bio: data.bio,
            photo_url: data.photoUrl || "/images/circus_performance_1.png",
            disciplines: data.disciplines || [],
            is_coach: data.isCoach ?? false,
            is_active: data.isActive !== false,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveArtist error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryArtists.findIndex((a) => a.id === id);
    if (idx !== -1) {
      inMemoryArtists[idx] = { ...inMemoryArtists[idx], ...data, slug } as Artist;
      return { success: true, item: inMemoryArtists[idx] };
    }
  }
  const newId = `artist-${Date.now()}`;
  const newArtist: Artist = {
    id: newId,
    slug,
    fullName: data.fullName || "New Artist",
    stageName: data.stageName,
    bio: data.bio,
    photoUrl: data.photoUrl || "/images/circus_performance_1.png",
    disciplines: data.disciplines || [],
    isCoach: data.isCoach ?? false,
    isActive: data.isActive !== false,
  };
  inMemoryArtists.push(newArtist);
  return { success: true, item: newArtist };
}

export async function deleteArtist(id: string) {
  // Safety rule: do not delete an artist if they are assigned to an active troupe
  const activeMemberships = inMemoryTroupeMembers.filter((tm) => tm.artistId === id);
  if (activeMemberships.length > 0) {
    return {
      success: false,
      error: `Cannot delete artist: they are currently performing in ${activeMemberships.length} troupe(s). Remove them from troupe rosters first.`,
    };
  }

  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("artists").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteArtist error:", err);
    }
  }
  inMemoryArtists = inMemoryArtists.filter((a) => a.id !== id);
  return { success: true };
}

export async function getTroupeMembersForAdmin(troupeId: string): Promise<TroupeMember[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("troupe_members")
        .select("*, artists(full_name, photo_url)")
        .eq("troupe_id", troupeId)
        .order("order_index", { ascending: true });
      if (!error && data) {
        return data.map((tm: any) => ({
          id: tm.id,
          troupeId: tm.troupe_id,
          artistId: tm.artist_id,
          artistName: tm.artists?.full_name,
          artistPhoto: tm.artists?.photo_url,
          roleInTroupe: tm.role_in_troupe,
          isLead: tm.is_lead,
          orderIndex: tm.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryTroupeMembers
    .filter((tm) => tm.troupeId === troupeId)
    .map((tm) => {
      const artist = inMemoryArtists.find((a) => a.id === tm.artistId);
      return {
        ...tm,
        artistName: artist?.fullName || "Artist",
        artistPhoto: artist?.photoUrl,
      };
    });
}

export async function assignTroupeMember(troupeId: string, artistId: string, role = "Performer", isLead = false) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("troupe_members")
        .upsert(
          {
            troupe_id: troupeId,
            artist_id: artistId,
            role_in_troupe: role,
            is_lead: isLead,
          },
          { onConflict: "troupe_id, artist_id" }
        )
        .select()
        .single();
      if (!error && data) return { success: true, item: data };
    } catch (err) {
      console.warn("Supabase assignTroupeMember error:", err);
    }
  }
  const existing = inMemoryTroupeMembers.find((tm) => tm.troupeId === troupeId && tm.artistId === artistId);
  if (existing) {
    existing.roleInTroupe = role;
    existing.isLead = isLead;
    return { success: true, item: existing };
  }
  const newMember: TroupeMember = {
    id: `tm-${Date.now()}`,
    troupeId,
    artistId,
    roleInTroupe: role,
    isLead,
    orderIndex: inMemoryTroupeMembers.length + 1,
  };
  inMemoryTroupeMembers.push(newMember);
  return { success: true, item: newMember };
}

export async function removeTroupeMember(troupeId: string, artistId: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from("troupe_members")
        .delete()
        .match({ troupe_id: troupeId, artist_id: artistId });
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase removeTroupeMember error:", err);
    }
  }
  inMemoryTroupeMembers = inMemoryTroupeMembers.filter(
    (tm) => !(tm.troupeId === troupeId && tm.artistId === artistId)
  );
  return { success: true };
}

// ---------------------------------------------------------------------
// 4. EVENTS CRUD
// ---------------------------------------------------------------------

export async function getEvents(): Promise<EventItem[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("event_date", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((e: any) => ({
          id: e.id,
          slug: e.slug,
          title: e.title,
          date: e.event_date ? new Date(e.event_date).toISOString().split("T")[0] : e.event_date,
          time: e.event_time_label || e.event_time || "4:00 PM",
          location: e.location,
          venue: e.venue,
          category: e.category,
          description: e.description,
          ticketInfo: e.ticket_info,
          isUpcoming: e.is_upcoming,
          featured: e.is_featured,
          isPublished: e.is_published,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryEvents.filter((e) => e.isPublished !== false);
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) || null;
}

export async function getAllEventsForAdmin(): Promise<EventItem[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      if (!error && data) {
        return data.map((e: any) => ({
          id: e.id,
          slug: e.slug,
          title: e.title,
          date: e.event_date ? new Date(e.event_date).toISOString().split("T")[0] : e.event_date,
          time: e.event_time_label || e.event_time || "4:00 PM",
          location: e.location,
          venue: e.venue,
          category: e.category,
          description: e.description,
          ticketInfo: e.ticket_info,
          isUpcoming: e.is_upcoming,
          featured: e.is_featured,
          isPublished: e.is_published,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryEvents;
}

export async function saveEvent(data: Partial<EventItem>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  const slug = data.slug ? slugify(data.slug) : slugify(data.title || "event");

  if (supabase) {
    try {
      const isoDate = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
      if (id) {
        const { data: updated, error } = await supabase
          .from("events")
          .update({
            slug,
            title: data.title,
            event_date: isoDate,
            event_time_label: data.time,
            location: data.location,
            venue: data.venue,
            category: data.category || "Festival",
            description: data.description,
            ticket_info: data.ticketInfo || "Open to Public",
            is_upcoming: data.isUpcoming ?? true,
            is_featured: data.featured ?? false,
            is_published: data.isPublished !== false,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("events")
          .insert({
            slug,
            title: data.title,
            event_date: isoDate,
            event_time_label: data.time || "4:00 PM",
            location: data.location,
            venue: data.venue,
            category: data.category || "Festival",
            description: data.description,
            ticket_info: data.ticketInfo || "Open to Public",
            is_upcoming: data.isUpcoming ?? true,
            is_featured: data.featured ?? false,
            is_published: data.isPublished !== false,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveEvent error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryEvents.findIndex((e) => e.id === id);
    if (idx !== -1) {
      inMemoryEvents[idx] = { ...inMemoryEvents[idx], ...data, slug } as EventItem;
      return { success: true, item: inMemoryEvents[idx] };
    }
  }
  const newId = `event-${Date.now()}`;
  const newEvent: EventItem = {
    id: newId,
    slug,
    title: data.title || "New Event",
    date: data.date || new Date().toISOString().split("T")[0],
    time: data.time || "4:00 PM",
    location: data.location || "Arba Minch",
    venue: data.venue || "Community Stadium",
    category: data.category || "Festival",
    description: data.description || "",
    ticketInfo: data.ticketInfo || "Free Community Entry",
    isUpcoming: data.isUpcoming ?? true,
    featured: data.featured ?? false,
    isPublished: data.isPublished !== false,
  };
  inMemoryEvents.push(newEvent);
  return { success: true, item: newEvent };
}

export async function deleteEvent(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteEvent error:", err);
    }
  }
  inMemoryEvents = inMemoryEvents.filter((e) => e.id !== id);
  return { success: true };
}

export async function toggleEventPublish(id: string) {
  const all = await getAllEventsForAdmin();
  const current = all.find((e) => e.id === id);
  if (!current) return { success: false, error: "Event not found" };
  return saveEvent({ ...current, isPublished: !current.isPublished }, id);
}

// ---------------------------------------------------------------------
// 5. FIVE-YEAR HIGHLIGHTS CRUD
// ---------------------------------------------------------------------

export async function getHighlights(): Promise<HighlightItem[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("highlights")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((h: any) => ({
          id: h.id,
          year: h.year,
          title: h.title,
          caption: h.caption,
          category: h.category,
          imageUrl: h.image_url || "/images/circus_performance_1.png",
          isPublished: h.is_published,
          orderIndex: h.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryHighlights.filter((h) => h.isPublished !== false);
}

export async function getAllHighlightsForAdmin(): Promise<HighlightItem[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("highlights")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) {
        return data.map((h: any) => ({
          id: h.id,
          year: h.year,
          title: h.title,
          caption: h.caption,
          category: h.category,
          imageUrl: h.image_url || "/images/circus_performance_1.png",
          isPublished: h.is_published,
          orderIndex: h.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryHighlights;
}

export async function saveHighlight(data: Partial<HighlightItem>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("highlights")
          .update({
            year: data.year,
            title: data.title,
            caption: data.caption,
            category: data.category,
            image_url: data.imageUrl,
            is_published: data.isPublished !== false,
            order_index: data.orderIndex ?? 0,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("highlights")
          .insert({
            year: data.year,
            title: data.title,
            caption: data.caption,
            category: data.category,
            image_url: data.imageUrl || "/images/circus_performance_1.png",
            is_published: data.isPublished !== false,
            order_index: data.orderIndex ?? inMemoryHighlights.length + 1,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveHighlight error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryHighlights.findIndex((h) => h.id === id);
    if (idx !== -1) {
      inMemoryHighlights[idx] = { ...inMemoryHighlights[idx], ...data } as HighlightItem;
      return { success: true, item: inMemoryHighlights[idx] };
    }
  }
  const newId = `highlight-${Date.now()}`;
  const newHighlight: HighlightItem = {
    id: newId,
    year: data.year || "2026",
    title: data.title || "New Milestone",
    caption: data.caption || "",
    category: data.category || "Milestone",
    imageUrl: data.imageUrl || "/images/circus_performance_1.png",
    isPublished: data.isPublished !== false,
    orderIndex: data.orderIndex ?? inMemoryHighlights.length + 1,
  };
  inMemoryHighlights.push(newHighlight);
  return { success: true, item: newHighlight };
}

export async function deleteHighlight(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("highlights").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteHighlight error:", err);
    }
  }
  inMemoryHighlights = inMemoryHighlights.filter((h) => h.id !== id);
  return { success: true };
}

export async function toggleHighlightPublish(id: string) {
  const all = await getAllHighlightsForAdmin();
  const current = all.find((h) => h.id === id);
  if (!current) return { success: false, error: "Highlight not found" };
  return saveHighlight({ ...current, isPublished: !current.isPublished }, id);
}

// ---------------------------------------------------------------------
// 6. GALLERY ASSETS CRUD
// ---------------------------------------------------------------------

export async function getAllGalleryAssetsForAdmin(): Promise<GalleryAsset[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("gallery_assets")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) {
        return data.map((g: any) => ({
          id: g.id,
          assetType: g.asset_type,
          title: g.title,
          caption: g.caption,
          category: g.category,
          mediaUrl: g.media_url,
          thumbnailUrl: g.thumbnail_url,
          durationSeconds: g.duration_seconds,
          width: g.width,
          height: g.height,
          orderIndex: g.order_index,
          isFeatured: g.is_featured,
          isPublished: g.is_published,
          createdAt: g.created_at,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryGallery;
}

export async function saveGalleryAsset(data: Partial<GalleryAsset>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("gallery_assets")
          .update({
            asset_type: data.assetType || "image",
            title: data.title,
            caption: data.caption,
            category: data.category || "Stage Performance",
            media_url: data.mediaUrl,
            thumbnail_url: data.thumbnailUrl,
            duration_seconds: data.durationSeconds,
            order_index: data.orderIndex ?? 0,
            is_featured: data.isFeatured ?? false,
            is_published: data.isPublished !== false,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("gallery_assets")
          .insert({
            asset_type: data.assetType || "image",
            title: data.title,
            caption: data.caption,
            category: data.category || "Stage Performance",
            media_url: data.mediaUrl || "/images/circus_performance_1.png",
            thumbnail_url: data.thumbnailUrl,
            duration_seconds: data.durationSeconds,
            order_index: data.orderIndex ?? inMemoryGallery.length + 1,
            is_featured: data.isFeatured ?? false,
            is_published: data.isPublished !== false,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveGalleryAsset error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryGallery.findIndex((g) => g.id === id);
    if (idx !== -1) {
      inMemoryGallery[idx] = { ...inMemoryGallery[idx], ...data } as GalleryAsset;
      return { success: true, item: inMemoryGallery[idx] };
    }
  }
  const newId = `gal-${Date.now()}`;
  const newAsset: GalleryAsset = {
    id: newId,
    assetType: data.assetType || "image",
    title: data.title || "New Asset",
    caption: data.caption || "",
    category: data.category || "Stage Performance",
    mediaUrl: data.mediaUrl || "/images/circus_performance_1.png",
    thumbnailUrl: data.thumbnailUrl,
    durationSeconds: data.durationSeconds,
    orderIndex: data.orderIndex ?? inMemoryGallery.length + 1,
    isFeatured: data.isFeatured ?? false,
    isPublished: data.isPublished !== false,
  };
  inMemoryGallery.push(newAsset);
  return { success: true, item: newAsset };
}

export async function deleteGalleryAsset(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("gallery_assets").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteGalleryAsset error:", err);
    }
  }
  inMemoryGallery = inMemoryGallery.filter((g) => g.id !== id);
  return { success: true };
}

export async function toggleGalleryPublish(id: string) {
  const all = await getAllGalleryAssetsForAdmin();
  const current = all.find((g) => g.id === id);
  if (!current) return { success: false, error: "Gallery asset not found" };
  return saveGalleryAsset({ ...current, isPublished: !current.isPublished }, id);
}

// ---------------------------------------------------------------------
// 7. IMPACT STORIES CRUD
// ---------------------------------------------------------------------

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
          isPublished: story.is_published,
          orderIndex: story.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryImpactStories.filter((s) => s.isPublished !== false);
}

export async function getImpactStoryBySlug(slug: string): Promise<ImpactStory | null> {
  const stories = await getImpactStories();
  return stories.find((s) => s.slug === slug) || null;
}

export async function getAllImpactStoriesForAdmin(): Promise<ImpactStory[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("impact_stories")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) {
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
          isPublished: story.is_published,
          orderIndex: story.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryImpactStories;
}

export async function saveImpactStory(data: Partial<ImpactStory>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  const slug = data.slug ? slugify(data.slug) : slugify(data.title || "story");

  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("impact_stories")
          .update({
            slug,
            title: data.title,
            category: data.category,
            subtitle: data.subtitle,
            hero_image: data.heroImage,
            summary: data.summary,
            body: data.body || [],
            key_outcomes: data.keyOutcomes || [],
            quote_text: data.quote?.text,
            quote_author: data.quote?.author,
            order_index: data.orderIndex ?? 0,
            is_published: data.isPublished !== false,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("impact_stories")
          .insert({
            slug,
            title: data.title,
            category: data.category,
            subtitle: data.subtitle,
            hero_image: data.heroImage || "/images/circus_performance_1.png",
            summary: data.summary,
            body: data.body || [],
            key_outcomes: data.keyOutcomes || [],
            quote_text: data.quote?.text,
            quote_author: data.quote?.author,
            order_index: data.orderIndex ?? inMemoryImpactStories.length + 1,
            is_published: data.isPublished !== false,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveImpactStory error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryImpactStories.findIndex((s) => s.id === id);
    if (idx !== -1) {
      inMemoryImpactStories[idx] = { ...inMemoryImpactStories[idx], ...data, slug } as ImpactStory;
      return { success: true, item: inMemoryImpactStories[idx] };
    }
  }
  const newId = `story-${Date.now()}`;
  const newStory: ImpactStory = {
    id: newId,
    slug,
    title: data.title || "New Impact Story",
    category: data.category || "Social Impact",
    subtitle: data.subtitle || "",
    heroImage: data.heroImage || "/images/circus_performance_1.png",
    summary: data.summary || "",
    body: data.body || [],
    keyOutcomes: data.keyOutcomes || [],
    quote: data.quote,
    isPublished: data.isPublished !== false,
    orderIndex: data.orderIndex ?? inMemoryImpactStories.length + 1,
  };
  inMemoryImpactStories.push(newStory);
  return { success: true, item: newStory };
}

export async function deleteImpactStory(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("impact_stories").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteImpactStory error:", err);
    }
  }
  inMemoryImpactStories = inMemoryImpactStories.filter((s) => s.id !== id);
  return { success: true };
}

export async function toggleImpactPublish(id: string) {
  const all = await getAllImpactStoriesForAdmin();
  const current = all.find((s) => s.id === id);
  if (!current) return { success: false, error: "Impact story not found" };
  return saveImpactStory({ ...current, isPublished: !current.isPublished }, id);
}

// ---------------------------------------------------------------------
// 8. TESTIMONIALS CRUD
// ---------------------------------------------------------------------

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_approved", true)
        .order("order_index", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          quote: item.quote,
          author: item.author_name,
          role: item.role_or_title,
          organization: item.organization,
          year: item.year,
          isApproved: item.is_approved,
          orderIndex: item.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryTestimonials.filter((t) => t.isApproved !== false);
}

export async function getAllTestimonialsForAdmin(): Promise<TestimonialItem[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data) {
        return data.map((item: any) => ({
          id: item.id,
          quote: item.quote,
          author: item.author_name,
          role: item.role_or_title,
          organization: item.organization,
          year: item.year,
          isApproved: item.is_approved,
          orderIndex: item.order_index,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryTestimonials;
}

export async function saveTestimonial(data: Partial<TestimonialItem>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("testimonials")
          .update({
            author_name: data.author,
            role_or_title: data.role,
            quote: data.quote,
            organization: data.organization,
            year: data.year || "2026",
            is_approved: data.isApproved ?? true,
            order_index: data.orderIndex ?? 0,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("testimonials")
          .insert({
            author_name: data.author,
            role_or_title: data.role,
            quote: data.quote,
            organization: data.organization,
            year: data.year || "2026",
            is_approved: data.isApproved ?? true,
            order_index: data.orderIndex ?? inMemoryTestimonials.length + 1,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveTestimonial error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryTestimonials.findIndex((t) => t.id === id);
    if (idx !== -1) {
      inMemoryTestimonials[idx] = { ...inMemoryTestimonials[idx], ...data } as TestimonialItem;
      return { success: true, item: inMemoryTestimonials[idx] };
    }
  }
  const newId = `testimonial-${Date.now()}`;
  const newTestimonial: TestimonialItem = {
    id: newId,
    quote: data.quote || "",
    author: data.author || "Community Partner",
    role: data.role || "Supporter",
    organization: data.organization,
    year: data.year || "2026",
    isApproved: data.isApproved ?? true,
    orderIndex: data.orderIndex ?? inMemoryTestimonials.length + 1,
  };
  inMemoryTestimonials.push(newTestimonial);
  return { success: true, item: newTestimonial };
}

export async function deleteTestimonial(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteTestimonial error:", err);
    }
  }
  inMemoryTestimonials = inMemoryTestimonials.filter((t) => t.id !== id);
  return { success: true };
}

export async function toggleTestimonialApproval(id: string) {
  const all = await getAllTestimonialsForAdmin();
  const current = all.find((t) => t.id === id);
  if (!current) return { success: false, error: "Testimonial not found" };
  return saveTestimonial({ ...current, isApproved: !current.isApproved }, id);
}

// ---------------------------------------------------------------------
// 9. FUNDRAISING & SITE SETTINGS CRUD
// ---------------------------------------------------------------------

export async function getAllCampaignsForAdmin(): Promise<FundraisingCampaign[]> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("fundraising_campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((c: any) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          goalAmount: c.goal_amount,
          currency: c.currency,
          summary: c.summary,
          description: c.description,
          targetUse: c.target_use,
          externalDonationUrl: c.external_donation_url,
          isActive: c.is_active,
          isFeatured: c.is_featured,
          createdAt: c.created_at,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryCampaigns;
}

export async function saveCampaign(data: Partial<FundraisingCampaign>, id?: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  const slug = data.slug ? slugify(data.slug) : slugify(data.title || "campaign");

  if (supabase) {
    try {
      if (id) {
        const { data: updated, error } = await supabase
          .from("fundraising_campaigns")
          .update({
            slug,
            title: data.title,
            goal_amount: data.goalAmount,
            currency: data.currency || "USD",
            summary: data.summary,
            description: data.description,
            target_use: data.targetUse,
            external_donation_url: data.externalDonationUrl,
            is_active: data.isActive !== false,
            is_featured: data.isFeatured ?? false,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
        if (!error && updated) return { success: true, item: updated };
      } else {
        const { data: inserted, error } = await supabase
          .from("fundraising_campaigns")
          .insert({
            slug,
            title: data.title,
            goal_amount: data.goalAmount,
            currency: data.currency || "USD",
            summary: data.summary,
            description: data.description,
            target_use: data.targetUse,
            external_donation_url: data.externalDonationUrl,
            is_active: data.isActive !== false,
            is_featured: data.isFeatured ?? false,
          })
          .select()
          .single();
        if (!error && inserted) return { success: true, item: inserted };
      }
    } catch (err) {
      console.warn("Supabase saveCampaign error:", err);
    }
  }

  // Fallback in-memory
  if (id) {
    const idx = inMemoryCampaigns.findIndex((c) => c.id === id);
    if (idx !== -1) {
      inMemoryCampaigns[idx] = { ...inMemoryCampaigns[idx], ...data, slug } as FundraisingCampaign;
      return { success: true, item: inMemoryCampaigns[idx] };
    }
  }
  const newId = `camp-${Date.now()}`;
  const newCampaign: FundraisingCampaign = {
    id: newId,
    slug,
    title: data.title || "New Campaign",
    goalAmount: data.goalAmount,
    currency: data.currency || "USD",
    summary: data.summary || "",
    description: data.description || "",
    targetUse: data.targetUse || "",
    externalDonationUrl: data.externalDonationUrl,
    isActive: data.isActive !== false,
    isFeatured: data.isFeatured ?? false,
  };
  inMemoryCampaigns.push(newCampaign);
  return { success: true, item: newCampaign };
}

export async function deleteCampaign(id: string) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("fundraising_campaigns").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteCampaign error:", err);
    }
  }
  inMemoryCampaigns = inMemoryCampaigns.filter((c) => c.id !== id);
  return { success: true };
}

export async function toggleCampaignActive(id: string) {
  const all = await getAllCampaignsForAdmin();
  const current = all.find((c) => c.id === id);
  if (!current) return { success: false, error: "Campaign not found" };
  return saveCampaign({ ...current, isActive: !current.isActive }, id);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").eq("key", "default").single();
      if (!error && data) {
        return {
          key: data.key,
          organizationName: data.organization_name,
          parentOrganizationName: data.parent_organization_name,
          circusEstablishedYear: data.circus_established_year,
          parentOrgRegisteredDate: data.parent_org_registered_date,
          physicalLocation: data.physical_location,
          primaryPhone: data.primary_phone,
          primaryEmail: data.primary_email,
          socialLinks: data.social_links || {},
          metaDescription: data.meta_description,
          updatedAt: data.updated_at,
        };
      }
    } catch {
      // Fallback
    }
  }
  return inMemorySiteSettings;
}

export async function saveSiteSettings(settings: Partial<SiteSettings>) {
  const supabase = createAdminSupabaseClient() || createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .upsert({
          key: "default",
          organization_name: settings.organizationName || inMemorySiteSettings.organizationName,
          parent_organization_name: settings.parentOrganizationName || inMemorySiteSettings.parentOrganizationName,
          circus_established_year: settings.circusEstablishedYear || inMemorySiteSettings.circusEstablishedYear,
          parent_org_registered_date: settings.parentOrgRegisteredDate || inMemorySiteSettings.parentOrgRegisteredDate,
          physical_location: settings.physicalLocation || inMemorySiteSettings.physicalLocation,
          primary_phone: settings.primaryPhone || inMemorySiteSettings.primaryPhone,
          primary_email: settings.primaryEmail || inMemorySiteSettings.primaryEmail,
          social_links: settings.socialLinks || inMemorySiteSettings.socialLinks,
          meta_description: settings.metaDescription || inMemorySiteSettings.metaDescription,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (!error && data) return { success: true, item: data };
    } catch (err) {
      console.warn("Supabase saveSiteSettings error:", err);
    }
  }

  inMemorySiteSettings = {
    ...inMemorySiteSettings,
    ...settings,
    updatedAt: new Date().toISOString(),
  };
  return { success: true, item: inMemorySiteSettings };
}

// ---------------------------------------------------------------------
// 10. AUDIT LOGS
// ---------------------------------------------------------------------

export async function recordAuditLog(entry: {
  adminEmail: string;
  adminId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
}) {
  const supabase = createAdminSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("audit_logs").insert({
        admin_id: entry.adminId || null,
        admin_email: entry.adminEmail,
        action: entry.action,
        entity_type: entry.entityType,
        entity_id: entry.entityId,
        details: entry.details || {},
      });
    } catch (err) {
      console.warn("Supabase audit log insert error:", err);
    }
  }
  inMemoryAuditLogs.unshift({
    id: `audit-${Date.now()}`,
    ...entry,
    createdAt: new Date().toISOString(),
  });
}

export async function getAuditLogsForAdmin(): Promise<AuditLogEntry[]> {
  const supabase = createAdminSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (!error && data) {
        return data.map((l: any) => ({
          id: l.id,
          adminId: l.admin_id,
          adminEmail: l.admin_email,
          action: l.action,
          entityType: l.entity_type,
          entityId: l.entity_id,
          details: l.details,
          createdAt: l.created_at,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return inMemoryAuditLogs;
}

// ---------------------------------------------------------------------
// 11. INQUIRIES & BOOKINGS (EXISTING)
// ---------------------------------------------------------------------

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
      const { data, error } = await supabase
        .from("bookings")
        .insert({
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
        })
        .select()
        .single();

      if (!error && data) {
        return { success: true, bookingId: data.id };
      }
    } catch (err) {
      console.warn("Supabase booking insert error:", err);
    }
  }

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
      const { data, error } = await supabase
        .from("inquiries")
        .insert({
          inquiry_type: inquiry.inquiryType,
          full_name: inquiry.fullName,
          email: inquiry.email,
          phone: inquiry.phone || null,
          organization: inquiry.organization || null,
          message: inquiry.message,
          status: "new",
        })
        .select()
        .single();

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
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
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
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
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
