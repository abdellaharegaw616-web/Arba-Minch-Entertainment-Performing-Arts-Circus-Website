-- ---------------------------------------------------------------------
-- AMEPAC Migration 11: Administrative Audit Logs
-- Tracks administrative actions for sensitive CRUD operations
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

alter table public.audit_logs enable row level security;

create policy "audit_logs_select_admin" on public.audit_logs
    for select to authenticated
    using (public.is_admin());

create policy "audit_logs_insert_admin" on public.audit_logs
    for insert to authenticated
    with check (public.is_admin());
