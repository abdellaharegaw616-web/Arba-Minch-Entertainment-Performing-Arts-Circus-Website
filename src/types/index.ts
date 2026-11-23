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
}

export interface EventItem {
  id: string;
  slug: string;
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
}

export interface HighlightItem {
  id: string;
  year: string;
  title: string;
  caption: string;
  category: string;
  imageUrl?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization?: string;
  year?: string;
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
  inquiryType: 'donation' | 'partnership' | 'training_center_fund' | 'general';
  message: string;
}
