-- Migration 000008: Site Settings & Approved Public Contact Information
-- Description: Global organization information, preserving established (2011) and registration (Nov 2022) distinctions.

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
