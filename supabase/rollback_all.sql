-- Rollback All Migrations (Reversible Script)
-- WARNING: Running this script drops all AMEPAC database tables and functions.
-- Use with caution for clean development resets only.

begin;

-- 1. Drop RLS policies & Tables in reverse dependency order
drop table if exists public.site_settings cascade;
drop table if exists public.fundraising_campaigns cascade;
drop table if exists public.inquiries cascade;
drop table if exists public.bookings cascade;
drop table if exists public.testimonials cascade;
drop table if exists public.impact_stories cascade;
drop table if exists public.highlights cascade;
drop table if exists public.gallery_assets cascade;
drop table if exists public.events cascade;
drop table if exists public.services cascade;
drop table if exists public.troupe_members cascade;
drop table if exists public.artists cascade;
drop table if exists public.troupes cascade;
drop table if exists public.admin_profiles cascade;

-- 2. Drop Helper Functions
drop function if exists public.get_current_user_role() cascade;
drop function if exists public.is_super_admin(uuid) cascade;
drop function if exists public.is_admin(uuid) cascade;
drop function if exists public.handle_updated_at() cascade;

commit;
