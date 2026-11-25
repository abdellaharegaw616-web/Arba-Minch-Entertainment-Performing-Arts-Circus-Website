-- Migration 000002: Admin User Profiles and Security Functions
-- Description: Implements role-based access control (RBAC) linked to auth.users with security definer functions.

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

-- Index for role lookup
create index if not exists idx_admin_profiles_role on public.admin_profiles(role);
create index if not exists idx_admin_profiles_email on public.admin_profiles(email);

-- Trigger for updated_at
drop trigger if exists set_admin_profiles_updated_at on public.admin_profiles;
create trigger set_admin_profiles_updated_at
    before update on public.admin_profiles
    for each row execute function public.handle_updated_at();

-- Security Definer Functions for Row Level Security (RLS)
-- These functions run with elevated privileges to check user roles without table access recursion

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
