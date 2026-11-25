export interface Troupe {
  id: string;
  slug: string;
  name: string;
  subTitle?: string;
  membersCount: number;
  description: string;
  acts: string[];
  members: string[];
  featuredImage?: string;
  featured?: boolean;
  isPublished?: boolean;
  orderIndex?: number;
  relatedServiceIds?: string[];
  reviewNotice?: string;
  unconfirmedNotice?: string;
}

export interface Artist {
  id: string;
  slug: string;
  fullName: string;
  stageName?: string;
  bio?: string;
  photoUrl?: string;
  disciplines: string[];
  isCoach: boolean;
  isActive: boolean;
  createdAt?: string;
}

export interface TroupeMember {
  id: string;
  troupeId: string;
  artistId: string;
  artistName?: string;
  artistPhoto?: string;
  roleInTroupe: string;
  isLead: boolean;
  orderIndex: number;
}

export interface ServicePackage {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  details: string[];
  imageUrl?: string;
  isPublished?: boolean;
  orderIndex?: number;
  suitableFormats?: string[];
  relatedTroupeIds?: string[];
  aliases?: string[];
  isPlaceholderImage?: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  timezone?: string;
  location: string;
  venue: string;
  category: string;
  description: string;
  ticketInfo: string;
  isUpcoming: boolean;
  featured?: boolean;
  isPublished?: boolean;
  imageUrl?: string;
  isProvisional?: boolean;
}

export interface HighlightItem {
  id: string;
  year: string;
  title: string;
  caption: string;
  category: string;
  imageUrl?: string;
  isPublished?: boolean;
  orderIndex?: number;
}

export interface GalleryAsset {
  id: string;
  assetType: 'image' | 'video';
  title: string;
  caption?: string;
  category: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  orderIndex: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization?: string;
  year?: string;
  isApproved?: boolean;
  orderIndex?: number;
}

export interface FundraisingCampaign {
  id: string;
  slug: string;
  title: string;
  goalAmount?: number;
  currency: string;
  summary: string;
  description: string;
  targetUse: string;
  externalDonationUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: string;
}

export interface SiteSettings {
  key: string;
  organizationName: string;
  parentOrganizationName: string;
  circusEstablishedYear: number;
  parentOrgRegisteredDate: string;
  physicalLocation: string;
  primaryPhone: string;
  primaryEmail: string;
  socialLinks: Record<string, string>;
  metaDescription?: string;
  updatedAt?: string;
}

export interface AuditLogEntry {
  id: string;
  adminId?: string;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
}

export interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  organization?: string;
  eventType: string;
  eventDate: string;
  venueLocation: string;
  expectedAttendees: string;
  packageRequested: string;
  notes?: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: 'donation' | 'partnership' | 'training_center_fund' | 'general' | 'contact';
  message: string;
}
