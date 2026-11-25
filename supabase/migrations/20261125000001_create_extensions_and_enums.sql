-- Migration 000001: Extensions, Enums, and Helper Functions
-- Description: Sets up pgcrypto, timestamp triggers, and system enum types.

-- 1. Enable pgcrypto for UUID and hashing functions
create extension if not exists "pgcrypto";

-- 2. Generic function to update updated_at timestamp on row modification
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;
