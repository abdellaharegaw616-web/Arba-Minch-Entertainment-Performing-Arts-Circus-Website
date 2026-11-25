-- Migration 000005: Gallery Assets and 5-Year Highlights
-- Description: Media assets (images, videos, duration, metadata) and historical verified milestones.

-- 1. Gallery Assets Table
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

-- 2. 5-Year Highlights & Milestones Table
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
