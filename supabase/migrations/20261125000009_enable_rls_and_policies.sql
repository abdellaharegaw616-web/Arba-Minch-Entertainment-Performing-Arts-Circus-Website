-- Migration 000009: Row Level Security (RLS) & Access Control Policies
-- Description: Enforces strict data access rules ensuring private inquiries are never readable publicly,
-- published content is read-only for public, and only verified admins can modify content.

-- 1. Enable RLS on all public tables
alter table public.admin_profiles enable row level security;
alter table public.troupes enable row level security;
alter table public.artists enable row level security;
alter table public.troupe_members enable row level security;
alter table public.services enable row level security;
alter table public.events enable row level security;
alter table public.gallery_assets enable row level security;
alter table public.highlights enable row level security;
alter table public.impact_stories enable row level security;
alter table public.testimonials enable row level security;
alter table public.bookings enable row level security;
alter table public.inquiries enable row level security;
alter table public.fundraising_campaigns enable row level security;
alter table public.site_settings enable row level security;

-- -------------------------------------------------------------
-- 2. Admin Profiles Policies (Privilege Escalation Prevention)
-- -------------------------------------------------------------
-- Users can view their own profile; admins can view all profiles
create policy "admin_profiles_read_own_or_admin"
    on public.admin_profiles for select
    to authenticated
    using (id = auth.uid() or public.is_admin());

-- Only super_admins can insert new admin profiles
create policy "admin_profiles_insert_super_admin"
    on public.admin_profiles for insert
    to authenticated
    with check (public.is_super_admin());

-- Only super_admins can update admin roles/profiles
create policy "admin_profiles_update_super_admin"
    on public.admin_profiles for update
    to authenticated
    using (public.is_super_admin())
    with check (public.is_super_admin());

-- Only super_admins can delete admin profiles
create policy "admin_profiles_delete_super_admin"
    on public.admin_profiles for delete
    to authenticated
    using (public.is_super_admin());

-- -------------------------------------------------------------
-- 3. Public Content Tables (Published read for all, Admin write)
-- -------------------------------------------------------------

-- Troupes
create policy "troupes_select_published"
    on public.troupes for select
    using (is_published = true or public.is_admin());

create policy "troupes_admin_all"
    on public.troupes for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Artists
create policy "artists_select_active"
    on public.artists for select
    using (is_active = true or public.is_admin());

create policy "artists_admin_all"
    on public.artists for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Troupe Members
create policy "troupe_members_select_all"
    on public.troupe_members for select
    using (true);

create policy "troupe_members_admin_all"
    on public.troupe_members for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Services
create policy "services_select_published"
    on public.services for select
    using (is_published = true or public.is_admin());

create policy "services_admin_all"
    on public.services for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Events
create policy "events_select_published"
    on public.events for select
    using (is_published = true or public.is_admin());

create policy "events_admin_all"
    on public.events for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Gallery Assets
create policy "gallery_select_published"
    on public.gallery_assets for select
    using (is_published = true or public.is_admin());

create policy "gallery_admin_all"
    on public.gallery_assets for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Highlights
create policy "highlights_select_published"
    on public.highlights for select
    using (is_published = true or public.is_admin());

create policy "highlights_admin_all"
    on public.highlights for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Impact Stories
create policy "impact_select_published"
    on public.impact_stories for select
    using (is_published = true or public.is_admin());

create policy "impact_admin_all"
    on public.impact_stories for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Testimonials (Only approved quotes are public)
create policy "testimonials_select_approved"
    on public.testimonials for select
    using (is_approved = true or public.is_admin());

create policy "testimonials_admin_all"
    on public.testimonials for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Site Settings
create policy "site_settings_select_public"
    on public.site_settings for select
    using (true);

create policy "site_settings_admin_all"
    on public.site_settings for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Fundraising Campaigns
create policy "campaigns_select_active"
    on public.fundraising_campaigns for select
    using (is_active = true or public.is_admin());

create policy "campaigns_admin_all"
    on public.fundraising_campaigns for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- -------------------------------------------------------------
-- 4. Private Inquiries & Bookings (Strict Isolation)
-- -------------------------------------------------------------

-- Bookings: Public can ONLY INSERT; NEVER read or update anonymously
create policy "bookings_public_insert"
    on public.bookings for insert
    with check (
        client_name is not null and
        client_email is not null and
        client_phone is not null and
        event_type is not null and
        event_date is not null and
        package_requested is not null
    );

create policy "bookings_admin_select"
    on public.bookings for select
    to authenticated
    using (public.is_admin());

create policy "bookings_admin_update"
    on public.bookings for update
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "bookings_admin_delete"
    on public.bookings for delete
    to authenticated
    using (public.is_admin());

-- Inquiries: Public can ONLY INSERT; NEVER read or update anonymously
create policy "inquiries_public_insert"
    on public.inquiries for insert
    with check (
        full_name is not null and
        email is not null and
        message is not null and
        inquiry_type in ('donation', 'partnership', 'training_center_fund', 'general', 'contact')
    );

create policy "inquiries_admin_select"
    on public.inquiries for select
    to authenticated
    using (public.is_admin());

create policy "inquiries_admin_update"
    on public.inquiries for update
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "inquiries_admin_delete"
    on public.inquiries for delete
    to authenticated
    using (public.is_admin());
