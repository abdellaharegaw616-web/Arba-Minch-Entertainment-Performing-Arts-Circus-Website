-- Migration 000003: Troupes, Artists, and Troupe Members (Many-to-Many)
-- Description: Models the 5 ensembles, 16 unique artists, and many-to-many relationships (e.g. Melat Muluken performing in both African Pride & Black Lioness).

-- 1. Troupes Table
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

-- 2. Artists Table (Unique individual performer profiles)
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

-- 3. Troupe Members Table (Junction Table: Troupe <-> Artist)
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
