-- Migration 000006: Impact Stories and Testimonials
-- Description: Social impact metrics (Street-to-stage, schooling, girls in circus) and client approved testimonials.

-- 1. Impact Stories Table
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

-- 2. Testimonials Table
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
