-- =====================================================================
-- AMEPAC: Arba Minch Entertainment Performing Arts & Circus
-- Master Database Schema, Security (RLS) Policies & Initial Seed Data
-- Database Engine: PostgreSQL 14+ on Supabase
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. EXTENSIONS & TRIGGER FUNCTIONS
-- ---------------------------------------------------------------------
create extension if not exists "pgcrypto";

create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- ---------------------------------------------------------------------
-- 2. ADMIN USER PROFILES & RBAC SECURITY
-- ---------------------------------------------------------------------
create table if not exists public.admin_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null unique,
    role text not null check (role in ('super_admin', 'editor', 'moderator')) default 'editor',
    full_name text not null,
    is_active boolean not null default true,
    last_sign_in_at timestamptz,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_admin_profiles_role on public.admin_profiles(role);
create index if not exists idx_admin_profiles_email on public.admin_profiles(email);

drop trigger if exists set_admin_profiles_updated_at on public.admin_profiles;
create trigger set_admin_profiles_updated_at
    before update on public.admin_profiles
    for each row execute function public.handle_updated_at();

-- Security Definer Functions for Row Level Security (RLS)
create or replace function public.is_admin(user_id uuid default auth.uid())
returns boolean as $$
begin
    if user_id is null then
        return false;
    end if;
    return exists (
        select 1 from public.admin_profiles
        where id = user_id and is_active = true
    );
end;
$$ language plpgsql security definer set search_path = public;

create or replace function public.is_super_admin(user_id uuid default auth.uid())
returns boolean as $$
begin
    if user_id is null then
        return false;
    end if;
    return exists (
        select 1 from public.admin_profiles
        where id = user_id and role = 'super_admin' and is_active = true
    );
end;
$$ language plpgsql security definer set search_path = public;

create or replace function public.get_current_user_role()
returns text as $$
declare
    user_role text;
begin
    if auth.uid() is null then
        return 'anonymous';
    end if;
    select role into user_role
    from public.admin_profiles
    where id = auth.uid() and is_active = true;
    
    return coalesce(user_role, 'authenticated');
end;
$$ language plpgsql security definer set search_path = public;

-- ---------------------------------------------------------------------
-- 3. TROUPES, ARTISTS & ENSEMBLE ROSTERS (MANY-TO-MANY)
-- ---------------------------------------------------------------------
create table if not exists public.troupes (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    name text not null,
    sub_title text,
    members_count integer not null default 1 check (members_count >= 1),
    description text not null,
    acts text[] not null default '{}',
    featured_image text,
    is_featured boolean not null default false,
    order_index integer not null default 0,
    is_published boolean not null default true,
    published_at timestamptz default timezone('utc'::text, now()),
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_troupes_slug on public.troupes(slug);
create index if not exists idx_troupes_order on public.troupes(order_index);
create index if not exists idx_troupes_published on public.troupes(is_published);

drop trigger if exists set_troupes_updated_at on public.troupes;
create trigger set_troupes_updated_at
    before update on public.troupes
    for each row execute function public.handle_updated_at();

create table if not exists public.artists (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    full_name text not null,
    stage_name text,
    bio text,
    photo_url text,
    disciplines text[] not null default '{}',
    is_coach boolean not null default false,
    is_active boolean not null default true,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_artists_slug on public.artists(slug);
create index if not exists idx_artists_name on public.artists(full_name);

drop trigger if exists set_artists_updated_at on public.artists;
create trigger set_artists_updated_at
    before update on public.artists
    for each row execute function public.handle_updated_at();

-- Many-to-many junction: accounts for artists performing in multiple troupes (e.g. Melat Muluken)
create table if not exists public.troupe_members (
    id uuid primary key default gen_random_uuid(),
    troupe_id uuid not null references public.troupes(id) on delete cascade,
    artist_id uuid not null references public.artists(id) on delete cascade,
    role_in_troupe text not null default 'Performer',
    is_lead boolean not null default false,
    order_index integer not null default 0,
    created_at timestamptz not null default timezone('utc'::text, now()),
    unique (troupe_id, artist_id)
);

create index if not exists idx_troupe_members_troupe on public.troupe_members(troupe_id);
create index if not exists idx_troupe_members_artist on public.troupe_members(artist_id);

-- ---------------------------------------------------------------------
-- 4. SERVICES & PACKAGES
-- ---------------------------------------------------------------------
create table if not exists public.services (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    title text not null,
    category text not null,
    summary text not null,
    description text not null,
    bullet_points text[] not null default '{}',
    image_url text,
    order_index integer not null default 0,
    is_published boolean not null default true,
    published_at timestamptz default timezone('utc'::text, now()),
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_services_slug on public.services(slug);
create index if not exists idx_services_published on public.services(is_published);
create index if not exists idx_services_order on public.services(order_index);

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
    before update on public.services
    for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------
-- 5. EVENTS & PERFORMANCES (EXPLICIT TIMEZONE)
-- ---------------------------------------------------------------------
create table if not exists public.events (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    title text not null,
    event_date timestamptz not null,
    event_time_label text,
    location text not null,
    venue text not null,
    description text not null,
    category text not null default 'Festival',
    ticket_info text not null default 'Open to Public / Community Show',
    is_upcoming boolean not null default true,
    is_featured boolean not null default false,
    is_published boolean not null default true,
    published_at timestamptz default timezone('utc'::text, now()),
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_events_slug on public.events(slug);
create index if not exists idx_events_date on public.events(event_date);
create index if not exists idx_events_upcoming on public.events(is_upcoming);
create index if not exists idx_events_published on public.events(is_published);

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
    before update on public.events
    for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------
-- 6. GALLERY ASSETS & VIDEOS
-- ---------------------------------------------------------------------
create table if not exists public.gallery_assets (
    id uuid primary key default gen_random_uuid(),
    asset_type text not null check (asset_type in ('image', 'video')) default 'image',
    title text not null,
    caption text,
    category text not null default 'Stage Performance',
    media_url text not null,
    thumbnail_url text,
    duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
    width integer check (width is null or width > 0),
    height integer check (height is null or height > 0),
    order_index integer not null default 0,
    is_featured boolean not null default false,
    is_published boolean not null default true,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_gallery_type on public.gallery_assets(asset_type);
create index if not exists idx_gallery_published on public.gallery_assets(is_published);
create index if not exists idx_gallery_featured on public.gallery_assets(is_featured);

drop trigger if exists set_gallery_updated_at on public.gallery_assets;
create trigger set_gallery_updated_at
    before update on public.gallery_assets
    for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------
-- 7. FIVE-YEAR HIGHLIGHTS & MILESTONES
-- ---------------------------------------------------------------------
create table if not exists public.highlights (
    id uuid primary key default gen_random_uuid(),
    year text not null,
    title text not null,
    caption text not null,
    category text not null,
    image_url text,
    order_index integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_highlights_year on public.highlights(year);
create index if not exists idx_highlights_order on public.highlights(order_index);
create index if not exists idx_highlights_published on public.highlights(is_published);

drop trigger if exists set_highlights_updated_at on public.highlights;
create trigger set_highlights_updated_at
    before update on public.highlights
    for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------
-- 8. IMPACT STORIES & TESTIMONIALS
-- ---------------------------------------------------------------------
create table if not exists public.impact_stories (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    title text not null,
    category text not null,
    subtitle text not null,
    hero_image text not null,
    summary text not null,
    body text[] not null default '{}',
    key_outcomes text[] not null default '{}',
    quote_text text,
    quote_author text,
    order_index integer not null default 0,
    is_published boolean not null default true,
    published_at timestamptz default timezone('utc'::text, now()),
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_impact_slug on public.impact_stories(slug);
create index if not exists idx_impact_published on public.impact_stories(is_published);

drop trigger if exists set_impact_updated_at on public.impact_stories;
create trigger set_impact_updated_at
    before update on public.impact_stories
    for each row execute function public.handle_updated_at();

create table if not exists public.testimonials (
    id uuid primary key default gen_random_uuid(),
    author_name text not null,
    role_or_title text not null,
    quote text not null,
    organization text,
    year text not null default '2023',
    is_approved boolean not null default false,
    order_index integer not null default 0,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_testimonials_approved on public.testimonials(is_approved);
create index if not exists idx_testimonials_order on public.testimonials(order_index);

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
    before update on public.testimonials
    for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------
-- 9. PRIVATE INQUIRIES & BOOKINGS (WITH DATA RETENTION RULES)
-- ---------------------------------------------------------------------
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

-- ---------------------------------------------------------------------
-- 10. FUNDRAISING CAMPAIGNS & APPROVED DONATION URLS
-- ---------------------------------------------------------------------
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

-- ---------------------------------------------------------------------
-- 11. SITE SETTINGS & VERIFIED PUBLIC CONTACT INFO
-- ---------------------------------------------------------------------
create table if not exists public.site_settings (
    key text primary key,
    organization_name text not null,
    parent_organization_name text not null,
    circus_established_year integer not null default 2011,
    parent_org_registered_date text not null default 'November 2022',
    physical_location text not null default 'Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia, Ethiopia',
    primary_phone text not null default '+251-913-949-209',
    primary_email text not null default 'Arbaminch.circus@gmail.com',
    social_links jsonb not null default '{}'::jsonb,
    meta_description text,
    updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
    before update on public.site_settings
    for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------
-- 11.5. ADMINISTRATIVE AUDIT TRAIL
-- ---------------------------------------------------------------------
create table if not exists public.audit_logs (
    id uuid primary key default gen_random_uuid(),
    admin_id uuid references public.admin_profiles(id) on delete set null,
    admin_email text not null,
    action text not null,
    entity_type text not null,
    entity_id text,
    details jsonb default '{}'::jsonb,
    ip_address text,
    created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_audit_logs_action on public.audit_logs(action);
create index if not exists idx_audit_logs_entity on public.audit_logs(entity_type, entity_id);
create index if not exists idx_audit_logs_created on public.audit_logs(created_at desc);

-- ---------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ---------------------------------------------------------------------
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
alter table public.audit_logs enable row level security;

create policy "audit_logs_select_admin" on public.audit_logs
    for select to authenticated
    using (public.is_admin());

create policy "audit_logs_insert_admin" on public.audit_logs
    for insert to authenticated
    with check (public.is_admin());

-- Admin Profiles Policies
create policy "admin_profiles_read_own_or_admin"
    on public.admin_profiles for select
    to authenticated
    using (id = auth.uid() or public.is_admin());

create policy "admin_profiles_insert_super_admin"
    on public.admin_profiles for insert
    to authenticated
    with check (public.is_super_admin());

create policy "admin_profiles_update_super_admin"
    on public.admin_profiles for update
    to authenticated
    using (public.is_super_admin())
    with check (public.is_super_admin());

create policy "admin_profiles_delete_super_admin"
    on public.admin_profiles for delete
    to authenticated
    using (public.is_super_admin());

-- Public Content Tables: Read published for public, Admin full access
create policy "troupes_select_published" on public.troupes for select using (is_published = true or public.is_admin());
create policy "troupes_admin_all" on public.troupes for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "artists_select_active" on public.artists for select using (is_active = true or public.is_admin());
create policy "artists_admin_all" on public.artists for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "troupe_members_select_all" on public.troupe_members for select using (true);
create policy "troupe_members_admin_all" on public.troupe_members for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "services_select_published" on public.services for select using (is_published = true or public.is_admin());
create policy "services_admin_all" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "events_select_published" on public.events for select using (is_published = true or public.is_admin());
create policy "events_admin_all" on public.events for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "gallery_select_published" on public.gallery_assets for select using (is_published = true or public.is_admin());
create policy "gallery_admin_all" on public.gallery_assets for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "highlights_select_published" on public.highlights for select using (is_published = true or public.is_admin());
create policy "highlights_admin_all" on public.highlights for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "impact_select_published" on public.impact_stories for select using (is_published = true or public.is_admin());
create policy "impact_admin_all" on public.impact_stories for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "testimonials_select_approved" on public.testimonials for select using (is_approved = true or public.is_admin());
create policy "testimonials_admin_all" on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "site_settings_select_public" on public.site_settings for select using (true);
create policy "site_settings_admin_all" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "campaigns_select_active" on public.fundraising_campaigns for select using (is_active = true or public.is_admin());
create policy "campaigns_admin_all" on public.fundraising_campaigns for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Private Inquiries & Bookings (Anonymous users can INSERT, but NEVER read or update)
create policy "bookings_public_insert" on public.bookings for insert with check (
    client_name is not null and client_email is not null and client_phone is not null and
    event_type is not null and event_date is not null and package_requested is not null
);
create policy "bookings_admin_select" on public.bookings for select to authenticated using (public.is_admin());
create policy "bookings_admin_update" on public.bookings for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "bookings_admin_delete" on public.bookings for delete to authenticated using (public.is_admin());

create policy "inquiries_public_insert" on public.inquiries for insert with check (
    full_name is not null and email is not null and message is not null and
    inquiry_type in ('donation', 'partnership', 'training_center_fund', 'general', 'contact')
);
create policy "inquiries_admin_select" on public.inquiries for select to authenticated using (public.is_admin());
create policy "inquiries_admin_update" on public.inquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "inquiries_admin_delete" on public.inquiries for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------
-- 13. VERIFIED SEED DATA
-- ---------------------------------------------------------------------
insert into public.site_settings (
    key, organization_name, parent_organization_name, circus_established_year,
    parent_org_registered_date, physical_location, primary_phone, primary_email, social_links
) values (
    'general',
    'Arba Minch Entertainment Performing Arts & Circus (AMEPAC)',
    'Building Tomorrow Integrated Youth & Community Development Organization',
    2011,
    'November 2022',
    'Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia, Ethiopia',
    '+251-913-949-209',
    'Arbaminch.circus@gmail.com',
    '{"telegram": "@arbaminchcircus", "facebook": "ArbaMinchCircus"}'::jsonb
) on conflict (key) do nothing;

-- Seed Troupes
insert into public.troupes (id, slug, name, sub_title, members_count, description, acts, featured_image, is_featured, order_index, is_published)
values
('00000000-0000-0000-0000-000000000001', 'troupe-black-lioness', 'Troupe Black Lioness', 'All-Female Power, Balance & Antipode Artistry', 4, 'A dynamic all-female troupe defying convention through remarkable physical strength, poetic elegance, and fearless balance. Renowned for their trio equilibria, multi-ring hula hoop mastery, and rare antipode (foot-juggling) choreography.', array['Trio Balance Equilibrium', 'Hula Hoop Choreography', 'Dynamic Acrobatic Stacking', 'Antipode (Foot Juggling)', 'Expressive Dance Fusion'], '/images/troupe_black_lioness.png', true, 1, true),
('00000000-0000-0000-0000-000000000002', 'yoga-brothers', 'Arba Minch Yoga Brothers', 'Extreme Contortion & Hyper-Flexibility Duo', 2, 'Samuel Filto and Dagmawi Babena form this globally celebrated duo known as the ''Yoga Brothers''. Their acts feature extreme front and back bending, shoulder dislocations, and astonishing spinal flexibility that astound audiences and redefine human biomechanics.', array['Extreme Front & Back Bending', 'Joint Articulation & Dislocation', 'Neck & Torso Twisting', 'Synchronized Duo Contortion'], '/images/troupe_yoga_brothers.png', true, 2, true),
('00000000-0000-0000-0000-000000000003', 'troupe-gamo-bayira', 'Troupe Gamo Bayira', 'High-Energy Acrobatics, Chinese Pole & Object Manipulation', 5, 'Honoring the highland spirit of Gamo, this 5-artist ensemble delivers electrifying aerial hoop dives, precision hat and club juggling, Chinese pole ascents, and synchronized geometric cube routines.', array['Hoop Diving', 'Chinese Pole', 'Acrobatic Human Pyramid', 'Geometric Cube Manipulation', 'Club Juggling', 'Traditional Hat Juggling'], '/images/troupe_gamo_bayira.png', true, 3, true),
('00000000-0000-0000-0000-000000000004', 'troupe-african-pride', 'Troupe African Pride', 'Dynamic 8-Performer Acrobatics & Aerial Feats', 8, 'A flagship powerhouse troupe comprising 8 seasoned circus performers. Their signature spectacles blend breathtaking physical courage with rhythmic Ethiopian stage presence, executing high-voltage banquine tosses, Cyr wheel fluidity, and multi-tier human pyramids.', array['Hand Voltage / Banquine', 'Cyr Wheel', 'Acrobatic Human Pyramid', 'Free Ladder', 'Rola Bola Balancing', 'Hand to Hand Equilibrium'], '/images/circus_performance_1.png', true, 4, true),
('00000000-0000-0000-0000-000000000005', 'kefeni-queen-of-gamo', 'Kefeni — Queen of Gamo', 'World-Class Solo Contortionist', 1, 'Kefeni Teshome discovered circus arts at an early age in Arba Minch. Through relentless discipline, she has transformed into one of the country''s most celebrated solo contortionists, performing mesmerizing balance pedestals, scorpion backbends, and poignant emotive solos.', array['Solo Pedestal Contortion', 'Scorpion Backbend Architecture', 'Extreme Flexibility Equilibrium', 'Ethereal Storytelling Movement'], '/images/circus_performance_2.png', true, 5, true)
on conflict (slug) do nothing;

-- Seed Artists (All 16 unique artists)
insert into public.artists (id, slug, full_name, stage_name, bio, disciplines, photo_url)
values
('10000000-0000-0000-0000-000000000001', 'samuel-filto', 'Samuel Filto', 'Yoga Brother Samuel', 'Professional extreme contortionist and founding duo member of Arba Minch Yoga Brothers.', array['Extreme Front & Back Bending', 'Joint Dislocation'], '/images/troupe_yoga_brothers.png'),
('10000000-0000-0000-0000-000000000002', 'dagmawi-babena', 'Dagmawi Babena', 'Yoga Brother Dagmawi', 'Professional extreme contortionist and hyper-flexibility performer.', array['Extreme Front & Back Bending', 'Joint Dislocation'], '/images/troupe_yoga_brothers.png'),
('10000000-0000-0000-0000-000000000003', 'kefeni-teshome', 'Kefeni Teshome', 'Queen of Gamo', 'World-class solo contortionist trained in Arba Minch from early childhood.', array['Solo Pedestal Contortion', 'Scorpion Backbends'], '/images/circus_performance_2.png'),
('10000000-0000-0000-0000-000000000004', 'rehobot-abreham', 'Rehobot Abreham', null, 'Professional acrobat and Chinese pole specialist in Troupe Gamo Bayira.', array['Chinese Pole', 'Acrobatic Human Pyramid'], '/images/troupe_gamo_bayira.png'),
('10000000-0000-0000-0000-000000000005', 'temesgen-daniel', 'Temesgen Daniel', 'Skanche', 'Senior acrobat and precision hat juggler.', array['Traditional Hat Juggling', 'Hoop Diving'], '/images/troupe_gamo_bayira.png'),
('10000000-0000-0000-0000-000000000006', 'fasika-shewa', 'Fasika Shewa', null, 'Professional acrobat and geometric cube manipulator.', array['Geometric Cube Manipulation', 'Club Juggling'], '/images/troupe_gamo_bayira.png'),
('10000000-0000-0000-0000-000000000007', 'mintesinot-geremew', 'Mintesinot Geremew', null, 'High-energy hoop diver and tumbler in Troupe Gamo Bayira.', array['Hoop Diving', 'Acrobatic Stacking'], '/images/troupe_gamo_bayira.png'),
('10000000-0000-0000-0000-000000000008', 'biniam-degu', 'Biniam Degu', null, 'Precision club and object juggler.', array['Club Juggling', 'Chinese Pole Assist'], '/images/troupe_gamo_bayira.png'),
('10000000-0000-0000-0000-000000000009', 'sintayehu-adimasu', 'Sintayehu Adimasu', null, 'Lead base and banquine powerhouse in Troupe African Pride.', array['Hand Voltage / Banquine', 'Human Pyramid'], '/images/circus_performance_1.png'),
('10000000-0000-0000-0000-000000000010', 'cherinet-tomas', 'Cherinet Tomas', null, 'Senior acrobat and Cyr wheel specialist.', array['Cyr Wheel', 'Banquine Tosses'], '/images/circus_performance_1.png'),
('10000000-0000-0000-0000-000000000011', 'desta-teshome', 'Desta Teshome', null, 'Equilibrium and free ladder acrobat.', array['Free Ladder', 'Rola Bola Balancing'], '/images/circus_performance_1.png'),
('10000000-0000-0000-0000-000000000012', 'abiot-ayele', 'Abiot Ayele', null, 'Senior flyer and acrobat in high-voltage launches.', array['Hand Voltage Flyer'], '/images/circus_performance_1.png'),
('10000000-0000-0000-0000-000000000013', 'ashenafi-ayele', 'Ashenafi Ayele', null, 'Middle and base balancer in human pyramids.', array['Acrobatic Pyramid', 'Hand to Hand'], '/images/circus_performance_1.png'),
('10000000-0000-0000-0000-000000000014', 'daniel-eyassu', 'Daniel Eyassu', null, 'Rola bola and balance equilibrium artist.', array['Rola Bola Balancing'], '/images/circus_performance_1.png'),
('10000000-0000-0000-0000-000000000015', 'tamirat-hamesa', 'Tamirat Hamesa', null, 'Hand to hand equilibrium acrobat.', array['Hand to Hand Equilibrium'], '/images/circus_performance_1.png'),
('10000000-0000-0000-0000-000000000016', 'melat-muluken', 'Melat Muluken', null, 'Acrobat and antipode artist performing in both Troupe African Pride and Troupe Black Lioness.', array['Hand Voltage Flyer', 'Antipode (Foot Juggling)', 'Trio Balance'], '/images/troupe_black_lioness.png'),
('10000000-0000-0000-0000-000000000017', 'bilen-mala', 'Bilen Mala', null, 'All-female troupe lead and trio balance artist.', array['Trio Balance Equilibrium'], '/images/troupe_black_lioness.png'),
('10000000-0000-0000-0000-000000000018', 'lemlem-hareru', 'Lemlem Hareru', null, 'Multi-ring hula hoop soloist and acrobat.', array['Hula Hoop Choreography'], '/images/troupe_black_lioness.png'),
('10000000-0000-0000-0000-000000000019', 'dibora-getachew', 'Dibora Getachew', null, 'Antipode foot-juggling and balance artist.', array['Antipode (Foot Juggling)'], '/images/troupe_black_lioness.png')
on conflict (slug) do nothing;

-- Seed Troupe Member Links (Preserving Melat Muluken in both troupes)
insert into public.troupe_members (troupe_id, artist_id, role_in_troupe, is_lead, order_index)
values
('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Co-Founder / Contortionist', true, 1),
('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Co-Founder / Contortionist', false, 2),
('00000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'Solo Contortionist', true, 1),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', 'Lead Acrobat', true, 1),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000005', 'Senior Juggler', false, 2),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000006', 'Acrobat & Cube Manipulator', false, 3),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000007', 'Hoop Diver & Tumbler', false, 4),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000008', 'Juggler & Acrobat', false, 5),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000009', 'Lead Base / Banquine', true, 1),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000010', 'Cyr Wheel Specialist', false, 2),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000011', 'Equilibrium & Free Ladder', false, 3),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000012', 'Senior Flyer', false, 4),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000013', 'Middle Balancer', false, 5),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000014', 'Rola Bola Artist', false, 6),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000015', 'Hand to Hand Equilibrium', false, 7),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000016', 'Flyer & Acrobatic Artist', false, 8),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000017', 'Lead Artist / Trio Balance', true, 1),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000018', 'Hula Hoop Soloist', false, 2),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000019', 'Antipode Artist', false, 3),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000016', 'Antipode & Balance Acrobat', false, 4)
on conflict (troupe_id, artist_id) do nothing;
