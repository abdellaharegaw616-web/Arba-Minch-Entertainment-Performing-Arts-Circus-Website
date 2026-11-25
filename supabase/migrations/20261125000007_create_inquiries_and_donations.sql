-- Migration 000007: Bookings, Inquiries, and Fundraising Campaigns
-- Description: Private inquiries with explicit data retention rules, and public fundraising campaigns.

-- 1. Bookings Table (Private Inquiry Records)
create table if not exists public.bookings (
    id uuid primary key default gen_random_uuid(),
    client_name text not null,
    client_email text not null,
    client_phone text not null,
    organization text,
    event_type text not null,
    event_date date not null,
    venue_location text not null,
    expected_attendees text,
    package_requested text not null,
    notes text,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'archived')),
    admin_notes text,
    retention_consent boolean not null default true,
    retention_expires_at timestamptz not null default (timezone('utc'::text, now()) + interval '2 years'),
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_bookings_event_date on public.bookings(event_date);
create index if not exists idx_bookings_created on public.bookings(created_at);

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at
    before update on public.bookings
    for each row execute function public.handle_updated_at();

-- 2. Contact & General Inquiries Table (Private Records)
create table if not exists public.inquiries (
    id uuid primary key default gen_random_uuid(),
    inquiry_type text not null check (inquiry_type in ('donation', 'partnership', 'training_center_fund', 'general', 'contact')),
    full_name text not null,
    email text not null,
    phone text,
    organization text,
    interest_area text,
    message text not null,
    status text not null default 'new' check (status in ('new', 'contacted', 'resolved', 'archived')),
    admin_notes text,
    retention_consent boolean not null default true,
    retention_expires_at timestamptz not null default (timezone('utc'::text, now()) + interval '2 years'),
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_inquiries_type on public.inquiries(inquiry_type);
create index if not exists idx_inquiries_status on public.inquiries(status);
create index if not exists idx_inquiries_created on public.inquiries(created_at);

drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
    before update on public.inquiries
    for each row execute function public.handle_updated_at();

-- 3. Fundraising Campaigns & Approved Donation URLs Table
create table if not exists public.fundraising_campaigns (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    title text not null,
    goal_amount numeric(12, 2),
    currency text not null default 'USD',
    summary text not null,
    description text not null,
    target_use text not null,
    external_donation_url text,
    is_active boolean not null default true,
    is_featured boolean not null default false,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_campaigns_slug on public.fundraising_campaigns(slug);
create index if not exists idx_campaigns_active on public.fundraising_campaigns(is_active);

drop trigger if exists set_campaigns_updated_at on public.fundraising_campaigns;
create trigger set_campaigns_updated_at
    before update on public.fundraising_campaigns
    for each row execute function public.handle_updated_at();
