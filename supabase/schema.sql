-- AMEPAC: Arba Minch Entertainment Performing Arts & Circus
-- Supabase PostgreSQL Schema & Initial Seed Data

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Troupes Table
create table if not exists public.troupes (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    name text not null,
    sub_title text,
    members_count integer not null default 1,
    description text not null,
    acts text[] default '{}',
    image_url text,
    featured boolean default false,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Performers & Artists Table
create table if not exists public.artists (
    id uuid primary key default uuid_generate_v4(),
    troupe_id uuid references public.troupes(id) on delete set null,
    name text not null,
    stage_name text,
    specialty text not null,
    bio text,
    is_senior boolean default true,
    photo_url text,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Services / Entertainment Packages Table
create table if not exists public.services (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    title text not null,
    category text not null,
    summary text not null,
    description text not null,
    bullet_points text[] default '{}',
    image_url text,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Upcoming Events & Performances Table
create table if not exists public.events (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    title text not null,
    event_date date not null,
    event_time text,
    location text not null,
    venue text not null,
    description text not null,
    category text not null default 'Festival',
    ticket_info text default 'Open to Public / Community Show',
    is_upcoming boolean default true,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Bookings Table
create table if not exists public.bookings (
    id uuid primary key default uuid_generate_v4(),
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
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. 5-Year Highlights & Milestones Table
create table if not exists public.highlights (
    id uuid primary key default uuid_generate_v4(),
    year text not null,
    title text not null,
    caption text not null,
    category text not null,
    image_url text,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Testimonials Table
create table if not exists public.testimonials (
    id uuid primary key default uuid_generate_v4(),
    author_name text not null,
    role_or_title text not null,
    quote text not null,
    organization text,
    year text default '2023',
    is_approved boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Donations & Partnership Inquiries Table
create table if not exists public.inquiries (
    id uuid primary key default uuid_generate_v4(),
    inquiry_type text not null check (inquiry_type in ('donation', 'partnership', 'training_center_fund', 'general')),
    full_name text not null,
    email text not null,
    phone text,
    organization text,
    interest_area text,
    message text not null,
    status text not null default 'new' check (status in ('new', 'contacted', 'resolved', 'archived')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies
alter table public.troupes enable row level security;
alter table public.artists enable row level security;
alter table public.services enable row level security;
alter table public.events enable row level security;
alter table public.bookings enable row level security;
alter table public.highlights enable row level security;
alter table public.testimonials enable row level security;
alter table public.inquiries enable row level security;

-- Public read policies
create policy "Allow public read troupes" on public.troupes for select using (true);
create policy "Allow public read artists" on public.artists for select using (true);
create policy "Allow public read services" on public.services for select using (true);
create policy "Allow public read events" on public.events for select using (true);
create policy "Allow public read highlights" on public.highlights for select using (true);
create policy "Allow public read approved testimonials" on public.testimonials for select using (is_approved = true);

-- Public insert for bookings and inquiries
create policy "Allow public insert bookings" on public.bookings for insert with check (true);
create policy "Allow public insert inquiries" on public.inquiries for insert with check (true);

-- Authenticated admin full access policies
create policy "Allow auth admin full access troupes" on public.troupes for all to authenticated using (true);
create policy "Allow auth admin full access artists" on public.artists for all to authenticated using (true);
create policy "Allow auth admin full access services" on public.services for all to authenticated using (true);
create policy "Allow auth admin full access events" on public.events for all to authenticated using (true);
create policy "Allow auth admin full access bookings" on public.bookings for all to authenticated using (true);
create policy "Allow auth admin full access highlights" on public.highlights for all to authenticated using (true);
create policy "Allow auth admin full access testimonials" on public.testimonials for all to authenticated using (true);
create policy "Allow auth admin full access inquiries" on public.inquiries for all to authenticated using (true);
