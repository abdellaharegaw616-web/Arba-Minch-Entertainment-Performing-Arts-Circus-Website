-- Migration 000004: Services Packages and Events
-- Description: Models client entertainment packages and public/community events with explicit time zone handling.

-- 1. Services / Packages Table
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

-- 2. Events & Performances Table
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
